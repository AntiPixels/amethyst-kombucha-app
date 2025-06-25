// Google Gemini AI integration for enhanced chatbot responses
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { generateGeminiPrompt, buildKombuchaKnowledgeBase } from '@/lib/data-integration';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  benefits: string[];
}

interface Benefit {
  title: string;
  description: string;
}

interface GeminiConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

interface GeminiResponse {
  text: string;
  confidence: number;
  finishReason: string;
}

export class GeminiAI {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: config.model,
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxTokens,
      },
    });
  }

  async generateResponse(
    prompt: string,
    context: string = "",
    systemInstruction: string = "",
    intent: string = "general"
  ): Promise<GeminiResponse> {
    try {
      // Use data-integrated prompt generation
      const fullPrompt = generateGeminiPrompt(prompt, intent)

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return {
        text: text.trim(),
        confidence: this.calculateConfidence(text, prompt),
        finishReason: response.candidates?.[0]?.finishReason || "STOP",
      };
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("Failed to generate response from Gemini AI");
    }
  }

  private buildPrompt(
    prompt: string,
    context: string,
    systemInstruction: string
  ): string {
    // Use data-integration utility for consistent context
    return generateGeminiPrompt(prompt, "general");
  }

  private calculateConfidence(response: string, prompt: string): number {
    // Simple confidence calculation based on response characteristics
    const knowledge = buildKombuchaKnowledgeBase();
    let confidence = 0.5;

    // Check if response contains actual product names from data
    const productNames = knowledge.products.map((p: Product) => p.name.toLowerCase());
    const hasProductMention = productNames.some((name: string) =>
      response.toLowerCase().includes(name)
    );
    if (hasProductMention) confidence += 0.2;

    // Check if response contains benefit information from data
    const benefitKeywords = knowledge.benefits.map((b: Benefit) => b.title.toLowerCase());
    const generalBenefits = ["probiotik", "antioksidan", "sistem imun", "pencernaan", "vitamin"];
    const allBenefits = [...benefitKeywords, ...generalBenefits];
    
    const hasBenefitMention = allBenefits.some((keyword) =>
      response.toLowerCase().includes(keyword)
    );
    if (hasBenefitMention) confidence += 0.15;

    // Check response length (not too short, not too long)
    if (response.length > 50 && response.length < 300) confidence += 0.1;

    // Check if response ends properly
    if (response.includes("?") || response.includes(".")) confidence += 0.05;

    return Math.min(confidence, 0.95); // Cap at 95%
  }

  async classifyIntent(
    text: string
  ): Promise<{ intent: string; confidence: number }> {
    try {
      const prompt = `
Klasifikasikan intent dari pesan berikut ke dalam salah satu kategori:
- product: Pertanyaan tentang produk kombucha spesifik
- faq: Pertanyaan umum (harga, cara beli, efek samping)
- benefits: Pertanyaan tentang manfaat kesehatan
- greeting: Sapaan atau percakapan pembuka
- general: Percakapan umum atau di luar topik

Pesan: "${text}"

Jawab dengan format: [INTENT]|[CONFIDENCE_0_TO_1]
Contoh: product|0.85`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text_response = response.text().trim();

      const [intent, confidenceStr] = text_response.split("|");
      const confidence = parseFloat(confidenceStr) || 0.5;

      return {
        intent: intent.toLowerCase().trim(),
        confidence: Math.min(Math.max(confidence, 0), 1),
      };
    } catch (error) {
      console.error("Intent classification error:", error);
      return { intent: "general", confidence: 0.5 };
    }
  }

  async generateProductRecommendation(
    userPreferences: string[]
  ): Promise<string> {
    const knowledge = buildKombuchaKnowledgeBase();
    const productList = knowledge.products.map((p: Product) => p.name).join(", ");
    
    const prompt = `
Berdasarkan preferensi pelanggan: ${userPreferences.join(", ")}

Rekomendasikan produk kombucha Amethyst yang paling sesuai dari pilihan:
${productList}

Berikan rekomendasi singkat dengan alasan yang jelas.`;

    try {
      const result = await this.generateResponse(prompt, "", "", "product");
      return result.text;
    } catch (error) {
      return "Maaf, saya tidak dapat memberikan rekomendasi saat ini. Silakan hubungi customer service kami.";
    }
  }
}

// Default configuration
export const defaultGeminiConfig: GeminiConfig = {
  apiKey: process.env.GEMINI_API_KEY || "",
  model: "gemini-2.5-flash",
  temperature: 0.7,
  maxTokens: 500,
};

// Create singleton instance
let geminiInstance: GeminiAI | null = null;

export function getGeminiAI(): GeminiAI {
  if (!geminiInstance && defaultGeminiConfig.apiKey) {
    geminiInstance = new GeminiAI(defaultGeminiConfig);
  }
  return geminiInstance!;
}

export function isGeminiAvailable(): boolean {
  return !!defaultGeminiConfig.apiKey;
}
