'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, Play, RotateCcw, Download, Upload } from 'lucide-react'
import { 
  IntentClassifier, 
  trainingDataset, 
  TrainingData,
  createTrainedClassifier 
} from '@/lib/ml-utils'

export default function MLTestingPage() {
  const [classifier, setClassifier] = useState<IntentClassifier | null>(null)
  const [testInput, setTestInput] = useState('')
  const [testResult, setTestResult] = useState<{ intent: string, confidence: number } | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [customTrainingData, setCustomTrainingData] = useState<TrainingData[]>([])
  const [newTrainingInput, setNewTrainingInput] = useState('')
  const [newTrainingIntent, setNewTrainingIntent] = useState('')
  const [newTrainingConfidence, setNewTrainingConfidence] = useState(0.9)

  useEffect(() => {
    // Initialize with pre-trained classifier
    const trained = createTrainedClassifier()
    setClassifier(trained)
    calculateAccuracy(trained)
  }, [])

  const calculateAccuracy = (classifierToTest: IntentClassifier) => {
    // Use a subset of training data for testing
    const testData = trainingDataset.slice(-5) // Last 5 items as test data
    const acc = classifierToTest.getAccuracy(testData)
    setAccuracy(acc)
  }

  const testClassifier = () => {
    if (!classifier || !testInput.trim()) return

    const result = classifier.classify(testInput)
    setTestResult(result)
  }

  const retrainClassifier = async () => {
    setIsTraining(true)
    setTrainingProgress(0)

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 2200))

    // Combine original training data with custom data
    const fullTrainingData = [...trainingDataset, ...customTrainingData]
    
    const newClassifier = new IntentClassifier()
    newClassifier.train(fullTrainingData)
    
    setClassifier(newClassifier)
    calculateAccuracy(newClassifier)
    setIsTraining(false)
    setTrainingProgress(0)
  }

  const addCustomTrainingData = () => {
    if (!newTrainingInput.trim() || !newTrainingIntent.trim()) return

    const newData: TrainingData = {
      input: newTrainingInput,
      output: {
        intent: newTrainingIntent,
        confidence: newTrainingConfidence
      }
    }

    setCustomTrainingData([...customTrainingData, newData])
    setNewTrainingInput('')
    setNewTrainingIntent('')
    setNewTrainingConfidence(0.9)
  }

  const removeCustomTrainingData = (index: number) => {
    const updated = customTrainingData.filter((_, i) => i !== index)
    setCustomTrainingData(updated)
  }

  const exportTrainingData = () => {
    const data = {
      originalData: trainingDataset,
      customData: customTrainingData,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neural-network-training-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const importTrainingData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.customData && Array.isArray(data.customData)) {
          setCustomTrainingData(data.customData)
        }
      } catch (error) {
        console.error('Error importing training data:', error)
        alert('Error importing training data. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  const intents = ['product', 'faq', 'benefits', 'greeting', 'general']

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8 text-purple-600" />
          Neural Network Testing Lab
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportTrainingData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importTrainingData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Model Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Model Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant={classifier ? "default" : "secondary"}>
                  {classifier ? "Trained" : "Not Trained"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Accuracy:</span>
                <span className="text-sm font-mono">
                  {accuracy ? `${(accuracy * 100).toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Training Data:</span>
                <span className="text-sm">
                  {trainingDataset.length + customTrainingData.length} samples
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                placeholder="Type a message to test..."
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && testClassifier()}
              />
              <Button 
                onClick={testClassifier} 
                disabled={!classifier || !testInput.trim()}
                size="sm"
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                Test
              </Button>
              {testResult && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                  <div className="flex justify-between">
                    <span>Intent:</span>
                    <Badge variant="outline">{testResult.intent}</Badge>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Confidence:</span>
                    <span className="font-mono">
                      {(testResult.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Training Control */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Training Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                onClick={retrainClassifier}
                disabled={isTraining}
                size="sm"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {isTraining ? 'Training...' : 'Retrain Model'}
              </Button>
              {isTraining && (
                <div className="space-y-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${trainingProgress}%` }}
                    />
                  </div>
                  <div className="text-xs text-center text-gray-500">
                    {trainingProgress}% complete
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="test" className="space-y-4">
        <TabsList>
          <TabsTrigger value="test">Testing</TabsTrigger>
          <TabsTrigger value="training">Training Data</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trainingDataset.slice(0, 6).map((data, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="text-sm mb-2">{data.input}</div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{data.output.intent}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setTestInput(data.input)
                            setTestResult(classifier?.classify(data.input) || null)
                          }}
                        >
                          Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Custom Training Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Input Text</label>
                    <Input
                      placeholder="Enter training input..."
                      value={newTrainingInput}
                      onChange={(e) => setNewTrainingInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Intent</label>
                    <select
                      value={newTrainingIntent}
                      onChange={(e) => setNewTrainingIntent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select intent...</option>
                      {intents.map(intent => (
                        <option key={intent} value={intent}>{intent}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Confidence</label>
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={newTrainingConfidence}
                      onChange={(e) => setNewTrainingConfidence(parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addCustomTrainingData} className="w-full">
                      Add Training Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Training Data ({customTrainingData.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {customTrainingData.map((data, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <div className="flex-1">
                      <div className="text-sm">{data.input}</div>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{data.output.intent}</Badge>
                        <span className="text-xs text-gray-500">
                          {(data.output.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCustomTrainingData(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                {customTrainingData.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    No custom training data yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Intent Distribution</h4>
                  <div className="space-y-2">
                    {intents.map(intent => {
                      const count = trainingDataset.filter(d => d.output.intent === intent).length
                      const percentage = (count / trainingDataset.length) * 100
                      return (
                        <div key={intent} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{intent}</span>
                            <span>{count} samples</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Training Samples:</span>
                      <span>{trainingDataset.length + customTrainingData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Samples:</span>
                      <span>{trainingDataset.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Custom Samples:</span>
                      <span>{customTrainingData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Model Accuracy:</span>
                      <span>{accuracy ? `${(accuracy * 100).toFixed(1)}%` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
