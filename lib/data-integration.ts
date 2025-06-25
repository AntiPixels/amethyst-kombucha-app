// Data integration utility for AI context
import { products } from '@/data/products'
import { benefits } from '@/data/benefits'
import { testimonials } from '@/data/testimonials'

// Build comprehensive knowledge base from data files
export function buildKombuchaKnowledgeBase() {
  // Extract product information
  const productInfo = products.map(product => ({
    id: product.id,
    name: product.name.toLowerCase(),
    price: product.price,
    description: product.description,
    benefits: product.benefits
  }))

  // Extract benefits information
  const benefitsInfo = benefits.map(benefit => ({
    title: benefit.title,
    description: benefit.description
  }))

  // Extract testimonials
  const testimonialsInfo = testimonials.map(testimonial => ({
    name: testimonial.name,
    content: testimonial.content
  }))

  return {
    products: productInfo,
    benefits: benefitsInfo,
    testimonials: testimonialsInfo
  }
}

// Generate context-aware prompt for Gemini AI
export function generateGeminiPrompt(userMessage: string, intent: string = 'general') {
  const knowledge = buildKombuchaKnowledgeBase()
  
  let contextualInfo = ''
  
  // Add relevant product information based on user message
  const mentionedProducts = knowledge.products.filter(product => 
    userMessage.toLowerCase().includes(product.name) ||
    userMessage.toLowerCase().includes(product.name.replace(' ', ''))
  )
  
  if (mentionedProducts.length > 0) {
    contextualInfo += `\nPRODUK YANG DISEBUTKAN:\n`
    mentionedProducts.forEach(product => {
      contextualInfo += `- ${product.name}: ${product.description}\n`
      contextualInfo += `  Harga: Rp ${product.price.toLocaleString()}\n`
      contextualInfo += `  Manfaat: ${product.benefits.join(', ')}\n`
    })
  }
  
  // Add general product catalog if asking about products
  if (intent === 'product' && mentionedProducts.length === 0) {
    contextualInfo += `\nDAFTAR PRODUK KOMBUCHA AMETHYST:\n`
    knowledge.products.forEach(product => {
      contextualInfo += `- ${product.name}: Rp ${product.price.toLocaleString()}\n`
      contextualInfo += `  ${product.description}\n`
    })
  }
  
  // Add benefits information if relevant
  if (intent === 'benefits' || userMessage.toLowerCase().includes('manfaat')) {
    contextualInfo += `\nMANFAAT KOMBUCHA:\n`
    knowledge.benefits.forEach(benefit => {
      contextualInfo += `- ${benefit.title}: ${benefit.description}\n`
    })
  }
  
  // Add testimonials if asking about reviews or feedback
  if (userMessage.toLowerCase().includes('review') || 
      userMessage.toLowerCase().includes('testimoni') ||
      userMessage.toLowerCase().includes('pendapat')) {
    contextualInfo += `\nTESTIMONI PELANGGAN:\n`
    knowledge.testimonials.forEach(testimonial => {
      contextualInfo += `- ${testimonial.name}: "${testimonial.content}"\n`
    })
  }

  const basePrompt = `
Anda adalah asisten AI untuk Amethyst Kombucha, sebuah brand produk kombucha premium di Indonesia.

${contextualInfo}

INSTRUKSI KHUSUS:
1. Gunakan informasi produk, manfaat, dan testimoni di atas untuk memberikan jawaban yang akurat
2. Jika ditanya tentang produk spesifik, berikan detail lengkap termasuk harga dan manfaat
3. Jika ditanya tentang manfaat, kombinasikan manfaat umum kombucha dengan manfaat spesifik produk
4. Jika ditanya tentang review, gunakan testimoni pelanggan yang relevan
5. Jawab dalam bahasa Indonesia yang ramah dan informatif
6. Maksimal 200 kata per response
7. Jika tidak yakin, sarankan produk yang paling sesuai dengan kebutuhan pelanggan

PERTANYAAN PELANGGAN: ${userMessage}

JAWABAN:`

  return basePrompt
}

// Generate training data from product information
export function generateTrainingDataFromProducts() {
  const knowledge = buildKombuchaKnowledgeBase()
  const trainingData = []
  
  // Generate product-specific training data
  knowledge.products.forEach(product => {
    trainingData.push(
      {
        input: `apa itu ${product.name.toLowerCase()}`,
        output: { intent: 'product', confidence: 0.9 }
      },
      {
        input: `berapa harga ${product.name.toLowerCase()}`,
        output: { intent: 'faq', confidence: 0.95 }
      },
      {
        input: `manfaat ${product.name.toLowerCase()}`,
        output: { intent: 'benefits', confidence: 0.9 }
      },
      {
        input: `${product.name.toLowerCase()} bagus tidak`,
        output: { intent: 'product', confidence: 0.85 }
      }
    )
  })
  
  // Generate benefits training data
  knowledge.benefits.forEach(benefit => {
    trainingData.push({
      input: benefit.title.toLowerCase(),
      output: { intent: 'benefits', confidence: 0.9 }
    })
  })
  
  // Generate general training data
  trainingData.push(
    {
      input: 'produk apa saja yang tersedia',
      output: { intent: 'product', confidence: 0.95 }
    },
    {
      input: 'ada diskon tidak',
      output: { intent: 'faq', confidence: 0.9 }
    },
    {
      input: 'bagaimana cara pesan',
      output: { intent: 'faq', confidence: 0.95 }
    },
    {
      input: 'testimoni pelanggan',
      output: { intent: 'general', confidence: 0.8 }
    }
  )
  
  return trainingData
}

// Enhanced response generator using product data
export function generateResponseWithData(message: string, intent: string) {
  const knowledge = buildKombuchaKnowledgeBase()
  const lowerMessage = message.toLowerCase()
  
  // Check for specific product mentions
  const mentionedProduct = knowledge.products.find(product => 
    lowerMessage.includes(product.name.toLowerCase()) ||
    lowerMessage.includes(product.name.toLowerCase().replace(' ', ''))
  )
  
  if (mentionedProduct) {
    if (lowerMessage.includes('harga') || lowerMessage.includes('berapa')) {
      return `${mentionedProduct.name} dijual dengan harga Rp ${mentionedProduct.price.toLocaleString()}. ${mentionedProduct.description} Manfaat utamanya: ${mentionedProduct.benefits.slice(0, 2).join(' dan ')}. Apakah ada yang ingin Anda ketahui lebih lanjut?`
    }
    
    if (lowerMessage.includes('manfaat')) {
      return `Manfaat ${mentionedProduct.name}: ${mentionedProduct.benefits.join(', ')}. ${mentionedProduct.description} Harga: Rp ${mentionedProduct.price.toLocaleString()}. Tertarik untuk mencoba?`
    }
    
    return `${mentionedProduct.description} Harga ${mentionedProduct.name}: Rp ${mentionedProduct.price.toLocaleString()}. Manfaat utama: ${mentionedProduct.benefits.slice(0, 3).join(', ')}. Ada yang ingin ditanyakan lebih lanjut?`
  }
  
  // General product inquiry
  if (intent === 'product') {
    const productList = knowledge.products
      .sort((a, b) => a.price - b.price)
      .map(p => `${p.name} (Rp ${p.price.toLocaleString()})`)
      .join(', ')
    return `Kami memiliki 6 varian kombucha premium: ${productList}. Setiap varian memiliki manfaat kesehatan yang unik. Varian mana yang ingin Anda ketahui lebih detail?`
  }
  
  // Benefits inquiry
  if (intent === 'benefits') {
    const mainBenefits = knowledge.benefits.map(b => b.title).join(', ')
    return `Kombucha Amethyst memiliki manfaat: ${mainBenefits}. Setiap varian juga memiliki manfaat spesifik. Ingin tahu manfaat varian tertentu?`
  }
  
  // Testimonials
  if (lowerMessage.includes('testimoni') || lowerMessage.includes('review')) {
    const randomTestimonial = knowledge.testimonials[Math.floor(Math.random() * knowledge.testimonials.length)]
    return `Berikut salah satu testimoni pelanggan kami - ${randomTestimonial.name}: "${randomTestimonial.content}" Banyak pelanggan lain juga merasakan manfaat serupa. Ingin mencoba produk kami?`
  }
  
  return null // Return null if no specific response generated
}
