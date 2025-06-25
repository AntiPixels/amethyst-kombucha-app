# Amethyst Kombucha - AI-Powered Chatbot

Implementasi chatbot berbasis **jaringan syaraf tiruan (neural network)** dan **Google Gemini AI** untuk aplikasi Amethyst Kombucha menggunakan Next.js dan TypeScript.

## � AI Integration

### **Hybrid AI System**
Sistem ini menggunakan pendekatan hybrid yang menggabungkan:
1. **Google Gemini AI**: Untuk response yang natural dan kontekstual
2. **Local Neural Network**: Sebagai fallback dan untuk klasifikasi intent
3. **Smart Routing**: Otomatis memilih AI terbaik berdasarkan situasi

### **AI Provider Indicators**
- ✨ **Gemini**: Response dari Google Gemini AI
- �🧠 **Neural**: Response dari local neural network  
- 🔄 **Hybrid**: Kombinasi kedua AI

## 🧠 Neural Network Features

### 1. **Intelligent Chatbot**
- **Text Classification**: Menggunakan neural network untuk mengklasifikasi intent percakapan
- **Intent Recognition**: Mengenali kategori pertanyaan (produk, FAQ, manfaat, greeting)
- **Confidence Scoring**: Memberikan skor kepercayaan untuk setiap prediksi
- **Real-time Learning**: Dapat dilatih ulang dengan data percakapan baru

### 2. **Machine Learning Components**

#### **Bag of Words (BoW)**
```typescript
class BagOfWords {
  // Implementasi text preprocessing dan vectorization
  fit(texts: string[]): void
  transform(text: string): number[]
}
```

#### **Simple Neural Network**
```typescript
class SimpleNeuralNetwork {
  // Implementasi neural network dengan backpropagation
  train(inputs: number[][], targets: number[][], epochs: number): void
  predict(input: number[]): number[]
}
```

#### **Intent Classifier**
```typescript
class IntentClassifier {
  // Wrapper untuk text classification
  classify(text: string): { intent: string, confidence: number }
  getAccuracy(testData: TrainingData[]): number
}
```

### 3. **Training Dataset**
Dataset pelatihan mencakup:
- **Product inquiries**: Pertanyaan tentang produk kombucha
- **FAQ**: Pertanyaan umum (harga, cara beli, efek samping)
- **Benefits**: Pertanyaan tentang manfaat kesehatan
- **Greetings**: Sapaan dan percakapan umum

## 🚀 Cara Menggunakan

### **1. Chatbot Interface**
- Ikon chat floating di pojok kanan bawah
- UI yang responsive dan user-friendly
- Quick suggestions untuk pertanyaan umum
- Real-time typing indicators

### **2. Admin Dashboard**
Akses: `/admin`
- **Analytics**: Statistik percakapan dan performa
- **Chat Sessions**: Detail percakapan pelanggan
- **Intent Analysis**: Distribusi klasifikasi intent
- **Neural Network**: Monitor performa model ML

### **3. ML Testing Lab**
Akses: `/ml-testing`
- **Quick Test**: Uji model dengan input manual
- **Batch Testing**: Uji multiple input sekaligus
- **Training Data Management**: Kelola dataset pelatihan
- **Model Retraining**: Latih ulang model dengan data baru
- **Performance Analysis**: Analisis akurasi dan distribusi

## 📊 Neural Network Architecture

### **Input Layer**
- Bag of Words vectors dari text input
- Vocabulary size: ~100-500 unique words
- Preprocessing: lowercase, tokenization, stopword removal

### **Hidden Layer**
- Fully connected layer dengan aktivasi sigmoid
- Hidden units: 50% dari input size
- Learning rate: 0.1

### **Output Layer**
- Softmax activation untuk multi-class classification
- 5 output neurons untuk 5 intent classes:
  - `product`: Pertanyaan produk
  - `faq`: Pertanyaan umum
  - `benefits`: Manfaat kesehatan
  - `greeting`: Sapaan
  - `general`: Percakapan umum

### **Training Process**
1. **Data Preprocessing**: Tokenisasi dan vectorisasi
2. **Forward Propagation**: Hitung prediksi
3. **Backpropagation**: Update weights berdasarkan error
4. **Evaluation**: Hitung akurasi pada test set

### **Environment Variables**
```env
# Required: Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Gemini Configuration
GEMINI_MODEL=gemini-1.5-flash
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_TOKENS=500
GEMINI_FALLBACK_ENABLED=true

# Optional: Other AI services
OPENAI_API_KEY=your_openai_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### **Getting Gemini API Key**
1. Buka [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Login dengan akun Google
3. Buat API key baru
4. Copy API key ke file `.env.local`

## 🔧 Configuration

### **API Endpoints**

#### **Chatbot API**
```
POST /api/chatbot
{
  "message": "string",
  "sessionId": "string"
}
```

#### **Gemini AI Endpoints**
```
GET /api/gemini/status
POST /api/gemini/compare
POST /api/gemini/settings
```
```
GET /api/chatbot/analytics?type=analytics|sessions|logs
POST /api/chatbot/analytics
{
  "type": "log_conversation",
  "sessionId": "string",
  "message": "string",
  "response": "string",
  "intent": "string",
  "confidence": number
}
```

### **Environment Variables**
```env
# Add if using external ML services
OPENAI_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here
```

## 📈 Performance Monitoring

### **Real-time Metrics**
- **Overall Accuracy**: Persentase prediksi yang benar
- **Response Time**: Waktu rata-rata inferensi model
- **Confidence Distribution**: Distribusi skor kepercayaan
- **Intent Performance**: Akurasi per kategori intent

### **Analytics Dashboard**
- Grafik performa 24 jam
- Distribusi intent classification
- Common questions analysis
- Session analytics dan duration

## 🛠️ Development

### **Menambah Training Data**
```typescript
const newTrainingData: TrainingData[] = [
  {
    input: "apakah kombucha halal?",
    output: { intent: "faq", confidence: 0.9 }
  }
]
```

### **Custom Intent Classes**
```typescript
// Tambahkan intent baru di ml-utils.ts
const intents = ['product', 'faq', 'benefits', 'greeting', 'general', 'custom']
```

### **Model Improvement**
1. Tambah data training di `/ml-testing`
2. Retrain model dengan data baru
3. Monitor performa di `/admin`
4. Export/Import training data untuk backup

## 🔬 Advanced Features

### **Potential Enhancements**
1. **LSTM/Transformer Models**: Untuk pemahaman konteks yang lebih baik
2. **Multilingual Support**: Mendukung bahasa Indonesia dan Inggris
3. **Voice Input**: Integrasi speech-to-text
4. **Sentiment Analysis**: Analisis emosi pelanggan
5. **Product Recommendation**: ML untuk rekomendasi produk
6. **Image Recognition**: Klasifikasi gambar produk

### **Integration Options**
- **OpenAI GPT**: Untuk response yang lebih natural
- **Hugging Face**: Pre-trained language models
- **TensorFlow.js**: Browser-based inference
- **Google Dialogflow**: Enterprise conversation AI

## 📚 Technical Stack

- **Framework**: Next.js 15 + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **ML Library**: Custom implementation (vanilla JS/TS)
- **State Management**: React hooks
- **API**: Next.js API routes
- **Analytics**: Custom analytics system

## 🎯 Use Cases

1. **Customer Support**: Jawab pertanyaan umum 24/7
2. **Product Information**: Detail spesifikasi produk
3. **Sales Assistant**: Bantu proses pembelian
4. **Health Education**: Informasi manfaat kombucha
5. **Lead Generation**: Kumpulkan data prospek
6. **Market Research**: Analisis pertanyaan pelanggan

---

## 🔮 Future Roadmap

- [ ] Integration dengan WhatsApp Business API
- [ ] Voice chatbot dengan speech recognition
- [ ] Multilingual support (English, Indonesian)
- [ ] Advanced analytics dengan machine learning insights
- [ ] A/B testing untuk response optimization
- [ ] Integration dengan CRM system
- [ ] Mobile app dengan offline capabilities
- [ ] Advanced NLP dengan transformer models

---

**Dikembangkan dengan ❤️ untuk Amethyst Kombucha**
