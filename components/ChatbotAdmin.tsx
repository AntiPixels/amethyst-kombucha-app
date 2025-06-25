'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import NeuralNetworkMonitor from '@/components/NeuralNetworkMonitor'
import GeminiAdminPanel from '@/components/GeminiAdminPanel'
import { 
  BarChart3, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Brain,
  Download,
  Filter
} from 'lucide-react'

interface ChatAnalytics {
  totalMessages: number
  totalSessions: number
  avgConfidence: number
  topIntents: { intent: string; count: number }[]
  dailyStats: { date: string; messages: number; sessions: number }[]
  commonQuestions: { question: string; count: number; avgConfidence: number }[]
}

interface ChatSession {
  id: string
  startTime: Date
  messages: Array<{
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
    confidence?: number
    intent?: string
  }>
  duration: number
  satisfaction?: number
}

export default function ChatbotAdmin() {
  const [analytics, setAnalytics] = useState<ChatAnalytics>({
    totalMessages: 0,
    totalSessions: 0,
    avgConfidence: 0,
    topIntents: [],
    dailyStats: [],
    commonQuestions: []
  })
  
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate loading analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      // In real implementation, this would fetch from API
      const mockAnalytics: ChatAnalytics = {
        totalMessages: 1247,
        totalSessions: 156,
        avgConfidence: 0.82,
        topIntents: [
          { intent: 'product', count: 65 },
          { intent: 'faq', count: 45 },
          { intent: 'general', count: 35 },
          { intent: 'pricing', count: 11 }
        ],
        dailyStats: [
          { date: '2024-01-15', messages: 89, sessions: 12 },
          { date: '2024-01-16', messages: 156, sessions: 18 },
          { date: '2024-01-17', messages: 203, sessions: 25 },
          { date: '2024-01-18', messages: 178, sessions: 22 },
          { date: '2024-01-19', messages: 234, sessions: 28 },
          { date: '2024-01-20', messages: 198, sessions: 24 },
          { date: '2024-01-21', messages: 189, sessions: 27 }
        ],
        commonQuestions: [
          { question: 'Apa manfaat kombucha?', count: 34, avgConfidence: 0.89 },
          { question: 'Berapa harga kombucha?', count: 28, avgConfidence: 0.92 },
          { question: 'Dimana bisa beli?', count: 22, avgConfidence: 0.85 },
          { question: 'Kombucha teh hijau bagaimana?', count: 19, avgConfidence: 0.88 },
          { question: 'Ada efek samping tidak?', count: 16, avgConfidence: 0.79 }
        ]
      }

      const mockSessions: ChatSession[] = [
        {
          id: '1',
          startTime: new Date('2024-01-21T10:30:00'),
          duration: 5.2,
          messages: [
            { text: 'Halo', sender: 'user', timestamp: new Date('2024-01-21T10:30:00') },
            { text: 'Halo! Ada yang bisa saya bantu?', sender: 'bot', timestamp: new Date('2024-01-21T10:30:05'), confidence: 0.95, intent: 'greeting' },
            { text: 'Apa manfaat kombucha?', sender: 'user', timestamp: new Date('2024-01-21T10:30:15') },
            { text: 'Kombucha memiliki banyak manfaat: Meningkatkan sistem imun, Melancarkan pencernaan, Kaya akan probiotik...', sender: 'bot', timestamp: new Date('2024-01-21T10:30:20'), confidence: 0.89, intent: 'faq' }
          ],
          satisfaction: 4
        },
        {
          id: '2',
          startTime: new Date('2024-01-21T11:15:00'),
          duration: 8.7,
          messages: [
            { text: 'Berapa harga kombucha teh hijau?', sender: 'user', timestamp: new Date('2024-01-21T11:15:00') },
            { text: 'Harga kombucha kami bervariasi mulai dari Rp 25.000 hingga Rp 45.000 per botol...', sender: 'bot', timestamp: new Date('2024-01-21T11:15:05'), confidence: 0.92, intent: 'faq' }
          ],
          satisfaction: 5
        }
      ]

      setTimeout(() => {
        setAnalytics(mockAnalytics)
        setSessions(mockSessions)
        setLoading(false)
      }, 1000)
    }

    loadAnalytics()
  }, [])

  const exportData = () => {
    const data = { analytics, sessions }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chatbot-analytics-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Chatbot Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSessions}</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(analytics.avgConfidence * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.3%</div>
            <p className="text-xs text-muted-foreground">Monthly growth</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sessions">Chat Sessions</TabsTrigger>
          <TabsTrigger value="intents">Intent Analysis</TabsTrigger>
          <TabsTrigger value="neural">Neural Network</TabsTrigger>
          <TabsTrigger value="gemini">Gemini AI</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Daily Stats Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.dailyStats.map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <span className="text-sm">{new Date(day.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-blue-600">{day.messages} msg</span>
                        <span className="text-sm text-green-600">{day.sessions} sessions</span>
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div 
                            className="h-2 bg-blue-500 rounded" 
                            style={{ width: `${(day.messages / 250) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Most Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.commonQuestions.map((question, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{question.question}</span>
                        <Badge variant="secondary">{question.count}x</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full h-1 bg-gray-200 rounded">
                          <div 
                            className="h-1 bg-green-500 rounded" 
                            style={{ width: `${question.avgConfidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {(question.avgConfidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sessions List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Chat Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sessions.map((session) => (
                    <div 
                      key={session.id}
                      className={`p-3 border rounded cursor-pointer transition-colors ${
                        selectedSession?.id === session.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          Session {session.id}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {session.duration.toFixed(1)}m
                          </Badge>
                          {session.satisfaction && (
                            <Badge variant="secondary">
                              ⭐ {session.satisfaction}/5
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.startTime.toLocaleString()} • {session.messages.length} messages
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Detail */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedSession ? `Session ${selectedSession.id} Details` : 'Select a Session'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSession ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      Started: {selectedSession.startTime.toLocaleString()}
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedSession.messages.map((message, index) => (
                        <div key={index} className={`p-2 rounded text-sm ${
                          message.sender === 'user' 
                            ? 'bg-blue-100 ml-4' 
                            : 'bg-gray-100 mr-4'
                        }`}>
                          <div className="font-medium">
                            {message.sender === 'user' ? 'User' : 'Bot'}
                            {message.confidence && (
                              <span className="ml-2 text-xs text-gray-500">
                                ({(message.confidence * 100).toFixed(0)}% confident)
                              </span>
                            )}
                          </div>
                          <div>{message.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Select a chat session to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="intents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intent Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topIntents.map((intent) => (
                  <div key={intent.intent} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{intent.intent}</span>
                      <span className="text-sm text-gray-500">{intent.count} times</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-blue-500 rounded transition-all duration-500" 
                        style={{ 
                          width: `${(intent.count / Math.max(...analytics.topIntents.map(i => i.count))) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neural" className="space-y-4">
          <NeuralNetworkMonitor />
        </TabsContent>

        <TabsContent value="gemini" className="space-y-4">
          <GeminiAdminPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
