'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Brain, 
  Zap, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Sparkles,
  MessageSquare
} from 'lucide-react'

interface GeminiSettings {
  isEnabled: boolean
  model: string
  temperature: number
  maxTokens: number
  fallbackEnabled: boolean
}

interface TestResult {
  input: string
  geminiResponse: string
  localResponse: string
  geminiTime: number
  localTime: number
  geminiConfidence: number
  localConfidence: number
}

export default function GeminiAdminPanel() {
  const [settings, setSettings] = useState<GeminiSettings>({
    isEnabled: false,
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    maxTokens: 500,
    fallbackEnabled: true
  })

  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testInput, setTestInput] = useState('Apa manfaat kombucha teh hijau?')
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    checkGeminiConnection()
  }, [])

  const checkGeminiConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/gemini/status')
      const data = await response.json()
      setIsConnected(data.isConnected)
      if (data.settings) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Failed to check Gemini connection:', error)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  const testGeminiVsLocal = async () => {
    if (!testInput.trim()) return
    
    setIsTesting(true)
    try {
      const response = await fetch('/api/gemini/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: testInput })
      })
      
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      console.error('Failed to test responses:', error)
    } finally {
      setIsTesting(false)
    }
  }

  const updateSettings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/gemini/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      if (response.ok) {
        await checkGeminiConnection()
      }
    } catch (error) {
      console.error('Failed to update settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          Gemini AI Configuration
        </h2>
        <div className="flex items-center gap-2">
          {isConnected === null ? (
            <Badge variant="secondary">Checking...</Badge>
          ) : isConnected ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          ) : (
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 mr-1" />
              Disconnected
            </Badge>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={checkGeminiConnection}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="testing">A/B Testing</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Basic Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Enable Gemini AI</label>
                    <p className="text-xs text-gray-500">Use Gemini for enhanced responses</p>
                  </div>
                  <Switch
                    checked={settings.isEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, isEnabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Fallback to Local Model</label>
                    <p className="text-xs text-gray-500">Use local neural network if Gemini fails</p>
                  </div>
                  <Switch
                    checked={settings.fallbackEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, fallbackEnabled: checked })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Model</label>
                  <select
                    value={settings.model}
                    onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                    <option value="gemini-pro">Gemini Pro</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Temperature: {settings.temperature}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                    className="w-full mt-1"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Conservative</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Max Tokens</label>
                  <Input
                    type="number"
                    min="100"
                    max="2000"
                    value={settings.maxTokens}
                    onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <Button onClick={updateSettings} disabled={isLoading} className="w-full">
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </Button>
              </CardContent>
            </Card>

            {/* Status & Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gemini API Status:</span>
                    {isConnected ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="destructive">Inactive</Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Local Neural Network:</span>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Model:</span>
                    <Badge variant="outline">{settings.model}</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Mode:</span>
                    <Badge variant="secondary">
                      {settings.isEnabled ? 'Hybrid' : 'Local Only'}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">API Key Status</h4>
                  <div className="text-xs text-gray-600">
                    {isConnected ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        API key is valid and working
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600">
                        <XCircle className="h-3 w-3" />
                        API key missing or invalid. Set GEMINI_API_KEY in environment variables.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Response Comparison Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter test message..."
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={testGeminiVsLocal}
                  disabled={isTesting || !testInput.trim()}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isTesting ? 'Testing...' : 'Test'}
                </Button>
              </div>

              {testResult && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                  {/* Gemini Response */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        Gemini AI Response
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm bg-purple-50 p-3 rounded border">
                          {testResult.geminiResponse}
                        </p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Time: {testResult.geminiTime}ms</span>
                          <span>Confidence: {(testResult.geminiConfidence * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Local Response */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        Local Neural Network
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm bg-blue-50 p-3 rounded border">
                          {testResult.localResponse}
                        </p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Time: {testResult.localTime}ms</span>
                          <span>Confidence: {(testResult.localConfidence * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                <strong>Test Purpose:</strong> Compare response quality and performance between Gemini AI and local neural network.
                This helps optimize the hybrid approach and fallback strategy.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <p className="text-xs text-gray-500">Gemini API calls successful</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Avg Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">245ms</div>
                <p className="text-xs text-gray-500">Including network latency</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Fallback Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">1.5%</div>
                <p className="text-xs text-gray-500">Requests using local model</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {[
                  { time: '14:23', status: 'success', message: 'Gemini API call successful - Product inquiry' },
                  { time: '14:22', status: 'success', message: 'Gemini API call successful - FAQ response' },
                  { time: '14:21', status: 'fallback', message: 'Fallback to local model - API timeout' },
                  { time: '14:20', status: 'success', message: 'Gemini API call successful - Benefits inquiry' },
                  { time: '14:19', status: 'success', message: 'Gemini API call successful - Greeting' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded border">
                    <span className="text-xs text-gray-500 w-12">{item.time}</span>
                    <Badge 
                      variant={item.status === 'success' ? 'default' : 'secondary'}
                      className="w-16 text-xs"
                    >
                      {item.status}
                    </Badge>
                    <span className="text-xs">{item.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
