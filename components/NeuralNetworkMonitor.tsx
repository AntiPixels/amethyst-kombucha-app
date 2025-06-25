'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Brain, 
  Target, 
  TrendingUp, 
  Clock,
  Zap
} from 'lucide-react'

interface NetworkMetrics {
  accuracy: number
  avgResponseTime: number
  totalPredictions: number
  confidenceDistribution: { range: string; count: number }[]
  intentAccuracy: { intent: string; accuracy: number; count: number }[]
  recentPerformance: { timestamp: Date; accuracy: number; responseTime: number }[]
}

export default function NeuralNetworkMonitor() {
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    accuracy: 0.84,
    avgResponseTime: 45,
    totalPredictions: 1247,
    confidenceDistribution: [
      { range: '90-100%', count: 652 },
      { range: '80-89%', count: 324 },
      { range: '70-79%', count: 156 },
      { range: '60-69%', count: 78 },
      { range: '<60%', count: 37 }
    ],
    intentAccuracy: [
      { intent: 'product', accuracy: 0.92, count: 456 },
      { intent: 'faq', accuracy: 0.88, count: 334 },
      { intent: 'benefits', accuracy: 0.85, count: 201 },
      { intent: 'greeting', accuracy: 0.96, count: 178 },
      { intent: 'general', accuracy: 0.73, count: 78 }
    ],
    recentPerformance: []
  })

  const [isMonitoring, setIsMonitoring] = useState(false)

  useEffect(() => {
    // Generate initial performance data
    const generateRecentPerformance = () => {
      const data = []
      for (let i = 23; i >= 0; i--) {
        const timestamp = new Date()
        timestamp.setHours(timestamp.getHours() - i)
        data.push({
          timestamp,
          accuracy: 0.75 + Math.random() * 0.2, // Random accuracy between 75-95%
          responseTime: 30 + Math.random() * 40 // Random response time 30-70ms
        })
      }
      return data
    }

    setMetrics(prev => ({
      ...prev,
      recentPerformance: generateRecentPerformance()
    }))

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isMonitoring) {
        setMetrics(prev => {
          const newDataPoint = {
            timestamp: new Date(),
            accuracy: 0.75 + Math.random() * 0.2,
            responseTime: 30 + Math.random() * 40
          }

          const updatedPerformance = [...prev.recentPerformance.slice(1), newDataPoint]

          return {
            ...prev,
            totalPredictions: prev.totalPredictions + Math.floor(Math.random() * 3),
            avgResponseTime: Math.round(updatedPerformance.reduce((sum, item) => sum + item.responseTime, 0) / updatedPerformance.length),
            accuracy: updatedPerformance.reduce((sum, item) => sum + item.accuracy, 0) / updatedPerformance.length,
            recentPerformance: updatedPerformance
          }
        })
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.9) return 'text-green-600'
    if (accuracy >= 0.8) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceColor = (range: string) => {
    if (range.startsWith('90')) return 'bg-green-100 text-green-800'
    if (range.startsWith('80')) return 'bg-blue-100 text-blue-800'
    if (range.startsWith('70')) return 'bg-yellow-100 text-yellow-800'
    if (range.startsWith('60')) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-600" />
          Neural Network Monitor
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-600">
            {isMonitoring ? 'Live' : 'Paused'}
          </span>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className="ml-2 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {isMonitoring ? 'Pause' : 'Start'} Monitoring
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getAccuracyColor(metrics.accuracy)}`}>
              {(metrics.accuracy * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              -5ms from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPredictions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +24 in the last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">A+</div>
            <p className="text-xs text-muted-foreground">
              Excellent performance
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Confidence Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.confidenceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getConfidenceColor(item.range)}>
                      {item.range}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{item.count}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-blue-500 rounded transition-all duration-500" 
                        style={{ 
                          width: `${(item.count / Math.max(...metrics.confidenceDistribution.map(i => i.count))) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Intent Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Intent Classification Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.intentAccuracy.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{item.intent}</span>
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                    <span className={`font-mono text-sm ${getAccuracyColor(item.accuracy)}`}>
                      {(item.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div 
                      className={`h-2 rounded transition-all duration-500 ${
                        item.accuracy >= 0.9 ? 'bg-green-500' : 
                        item.accuracy >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.accuracy * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>24-Hour Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Accuracy Trend */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Accuracy Trend</span>
                <span className="text-sm text-gray-500">Last 24 hours</span>
              </div>
              <div className="flex items-end gap-1 h-20">
                {metrics.recentPerformance.map((point, index) => (
                  <div 
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t transition-all duration-300 min-w-0"
                    style={{ 
                      height: `${point.accuracy * 100}%`,
                      opacity: 0.7 + (index / metrics.recentPerformance.length) * 0.3
                    }}
                    title={`${point.timestamp.toLocaleTimeString()}: ${(point.accuracy * 100).toFixed(1)}%`}
                  />
                ))}
              </div>
            </div>

            {/* Response Time Trend */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Response Time Trend</span>
                <span className="text-sm text-gray-500">Average: {metrics.avgResponseTime}ms</span>
              </div>
              <div className="flex items-end gap-1 h-16">
                {metrics.recentPerformance.map((point, index) => (
                  <div 
                    key={index}
                    className="flex-1 bg-green-500 rounded-t transition-all duration-300 min-w-0"
                    style={{ 
                      height: `${(point.responseTime / 100) * 100}%`,
                      opacity: 0.7 + (index / metrics.recentPerformance.length) * 0.3
                    }}
                    title={`${point.timestamp.toLocaleTimeString()}: ${point.responseTime.toFixed(0)}ms`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
