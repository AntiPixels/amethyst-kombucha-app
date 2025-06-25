// Machine Learning utilities untuk Chatbot
// Implementasi Neural Network sederhana untuk text classification
import { generateTrainingDataFromProducts } from '@/lib/data-integration'

export interface TrainingData {
  input: string
  output: {
    intent: string
    confidence: number
  }
}

export interface NeuralNetworkConfig {
  learningRate: number
  epochs: number
  hiddenLayers: number[]
}

// Dataset pelatihan untuk chatbot kombucha - Enhanced with product data
const baseTrainingDataset: TrainingData[] = [
  // Product inquiries
  { input: "apa saja produk kombucha yang ada", output: { intent: "product", confidence: 0.95 } },
  { input: "kombucha teh hijau seperti apa", output: { intent: "product", confidence: 0.92 } },
  { input: "ada kombucha rasa kopi tidak", output: { intent: "product", confidence: 0.90 } },
  { input: "perbedaan kombucha teh hitam dan hijau", output: { intent: "product", confidence: 0.88 } },
  { input: "kombucha bunga telang manfaatnya apa", output: { intent: "product", confidence: 0.85 } },
  
  // FAQ
  { input: "berapa harga kombucha per botol", output: { intent: "faq", confidence: 0.95 } },
  { input: "dimana bisa beli kombucha amethyst", output: { intent: "faq", confidence: 0.93 } },
  { input: "cara minum kombucha yang benar", output: { intent: "faq", confidence: 0.90 } },
  { input: "efek samping minum kombucha", output: { intent: "faq", confidence: 0.87 } },
  { input: "kombucha aman untuk ibu hamil", output: { intent: "faq", confidence: 0.85 } },
  
  // Benefits
  { input: "manfaat kombucha untuk kesehatan", output: { intent: "benefits", confidence: 0.95 } },
  { input: "kombucha bagus untuk pencernaan", output: { intent: "benefits", confidence: 0.92 } },
  { input: "probiotik dalam kombucha", output: { intent: "benefits", confidence: 0.90 } },
  { input: "kombucha bisa menurunkan berat badan", output: { intent: "benefits", confidence: 0.85 } },
  
  // Greetings
  { input: "halo", output: { intent: "greeting", confidence: 0.98 } },
  { input: "hai selamat pagi", output: { intent: "greeting", confidence: 0.95 } },
  { input: "hello", output: { intent: "greeting", confidence: 0.90 } },
  
  // General
  { input: "terima kasih", output: { intent: "general", confidence: 0.90 } },
  { input: "sampai jumpa", output: { intent: "general", confidence: 0.85 } },
  { input: "bagaimana cuaca hari ini", output: { intent: "general", confidence: 0.30 } }
]

// Combine base training data with product-specific data
export const trainingDataset: TrainingData[] = [
  ...baseTrainingDataset,
  ...generateTrainingDataFromProducts()
]

// Simple Bag of Words implementation
export class BagOfWords {
  private vocabulary: string[] = []
  
  fit(texts: string[]): void {
    const words = new Set<string>()
    
    texts.forEach(text => {
      const processed = this.preprocess(text)
      processed.forEach(word => words.add(word))
    })
    
    this.vocabulary = Array.from(words).sort()
  }
  
  transform(text: string): number[] {
    const processed = this.preprocess(text)
    const vector = new Array(this.vocabulary.length).fill(0)
    
    processed.forEach(word => {
      const index = this.vocabulary.indexOf(word)
      if (index !== -1) {
        vector[index] += 1
      }
    })
    
    return vector
  }
  
  private preprocess(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2)
  }
  
  getVocabularySize(): number {
    return this.vocabulary.length
  }
}

// Simple Neural Network implementation
export class SimpleNeuralNetwork {
  private weights1: number[][] = []
  private weights2: number[][] = []
  private bias1: number[] = []
  private bias2: number[] = []
  private learningRate: number
  
  constructor(inputSize: number, hiddenSize: number, outputSize: number, learningRate = 0.01) {
    this.learningRate = learningRate
    this.initializeWeights(inputSize, hiddenSize, outputSize)
  }
  
  private initializeWeights(inputSize: number, hiddenSize: number, outputSize: number): void {
    // Initialize weights with small random values
    this.weights1 = Array(hiddenSize).fill(0).map(() => 
      Array(inputSize).fill(0).map(() => (Math.random() - 0.5) * 0.1)
    )
    this.weights2 = Array(outputSize).fill(0).map(() => 
      Array(hiddenSize).fill(0).map(() => (Math.random() - 0.5) * 0.1)
    )
    
    this.bias1 = Array(hiddenSize).fill(0).map(() => (Math.random() - 0.5) * 0.1)
    this.bias2 = Array(outputSize).fill(0).map(() => (Math.random() - 0.5) * 0.1)
  }
  
  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x))
  }
  
  private sigmoidDerivative(x: number): number {
    return x * (1 - x)
  }
  
  predict(input: number[]): number[] {
    const { hidden, output } = this.forward(input)
    return output
  }
  
  private forward(input: number[]): { hidden: number[], output: number[] } {
    // Hidden layer
    const hidden = this.weights1.map((weights, i) => {
      const sum = weights.reduce((acc, w, j) => acc + w * input[j], 0) + this.bias1[i]
      return this.sigmoid(sum)
    })
    
    // Output layer
    const output = this.weights2.map((weights, i) => {
      const sum = weights.reduce((acc, w, j) => acc + w * hidden[j], 0) + this.bias2[i]
      return this.sigmoid(sum)
    })
    
    return { hidden, output }
  }
  
  train(inputs: number[][], targets: number[][], epochs: number): void {
    for (let epoch = 0; epoch < epochs; epoch++) {
      for (let i = 0; i < inputs.length; i++) {
        this.backpropagate(inputs[i], targets[i])
      }
    }
  }
  
  private backpropagate(input: number[], target: number[]): void {
    const { hidden, output } = this.forward(input)
    
    // Calculate output error
    const outputError = output.map((o, i) => target[i] - o)
    const outputDelta = outputError.map((error, i) => error * this.sigmoidDerivative(output[i]))
    
    // Calculate hidden error
    const hiddenError = hidden.map((_, i) => 
      this.weights2.reduce((sum, weights, j) => sum + weights[i] * outputDelta[j], 0)
    )
    const hiddenDelta = hiddenError.map((error, i) => error * this.sigmoidDerivative(hidden[i]))
    
    // Update weights and biases
    this.weights2.forEach((weights, i) => {
      weights.forEach((_, j) => {
        this.weights2[i][j] += this.learningRate * outputDelta[i] * hidden[j]
      })
      this.bias2[i] += this.learningRate * outputDelta[i]
    })
    
    this.weights1.forEach((weights, i) => {
      weights.forEach((_, j) => {
        this.weights1[i][j] += this.learningRate * hiddenDelta[i] * input[j]
      })
      this.bias1[i] += this.learningRate * hiddenDelta[i]
    })
  }
}

// Intent classifier using the neural network
export class IntentClassifier {
  private bagOfWords: BagOfWords
  private neuralNetwork: SimpleNeuralNetwork | null = null
  private intents: string[] = []
  private isTrained = false
  
  constructor() {
    this.bagOfWords = new BagOfWords()
  }
  
  train(trainingData: TrainingData[]): void {
    // Extract unique intents
    this.intents = Array.from(new Set(trainingData.map(data => data.output.intent)))
    
    // Prepare training texts
    const texts = trainingData.map(data => data.input)
    this.bagOfWords.fit(texts)
    
    // Convert training data to vectors
    const inputs = texts.map(text => this.bagOfWords.transform(text))
    const targets = trainingData.map(data => {
      const target = new Array(this.intents.length).fill(0)
      const intentIndex = this.intents.indexOf(data.output.intent)
      target[intentIndex] = data.output.confidence
      return target
    })
    
    // Initialize and train neural network
    const inputSize = this.bagOfWords.getVocabularySize()
    const hiddenSize = Math.floor(inputSize / 2)
    const outputSize = this.intents.length
    
    this.neuralNetwork = new SimpleNeuralNetwork(inputSize, hiddenSize, outputSize, 0.1)
    this.neuralNetwork.train(inputs, targets, 100)
    
    this.isTrained = true
  }
  
  classify(text: string): { intent: string, confidence: number } {
    if (!this.isTrained || !this.neuralNetwork) {
      return { intent: 'general', confidence: 0.5 }
    }
    
    const input = this.bagOfWords.transform(text)
    const output = this.neuralNetwork.predict(input)
    
    // Find the intent with highest confidence
    let maxIndex = 0
    let maxConfidence = output[0]
    
    for (let i = 1; i < output.length; i++) {
      if (output[i] > maxConfidence) {
        maxConfidence = output[i]
        maxIndex = i
      }
    }
    
    return {
      intent: this.intents[maxIndex],
      confidence: Math.min(maxConfidence, 1.0)
    }
  }
  
  getAccuracy(testData: TrainingData[]): number {
    if (!this.isTrained) return 0
    
    let correct = 0
    testData.forEach(data => {
      const result = this.classify(data.input)
      if (result.intent === data.output.intent) {
        correct++
      }
    })
    
    return correct / testData.length
  }
}

// Utility function to create and train the classifier
export function createTrainedClassifier(): IntentClassifier {
  const classifier = new IntentClassifier()
  classifier.train(trainingDataset)
  return classifier
}
