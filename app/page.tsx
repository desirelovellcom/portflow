"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, Settings, Play, CheckCircle, AlertTriangle, Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function PortFlowApp() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [conversionStep, setConversionStep] = useState(0)
  const [compatibilityScore, setCompatibilityScore] = useState(85)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileUpload = (fileName: string) => {
    setUploadedFile(fileName)
    // Simulate conversion process
    setTimeout(() => setConversionStep(1), 1000)
    setTimeout(() => setConversionStep(2), 2500)
    setTimeout(() => setConversionStep(3), 4000)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0].name)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-[#e0d9ff]">
      {/* Header */}
      <header className="backdrop-blur-md bg-gradient-to-r from-[#302b63]/30 to-[#24243e]/30 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#8f78f5] to-[#6a5af9] rounded-lg flex items-center justify-center">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-thin tracking-wide">PortFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-[#e0d9ff] hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Upload Zone */}
        <Card className="bg-gradient-to-r from-[#302b63]/20 to-[#24243e]/20 backdrop-blur-md border border-white/10">
          <CardContent className="p-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                isDragOver
                  ? "border-[#8f78f5] bg-[#8f78f5]/10 shadow-lg shadow-[#8f78f5]/20"
                  : "border-white/20 hover:border-[#8f78f5]/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-[#8f78f5]" />
              <h3 className="text-xl font-medium mb-2">Drop iOS .ipa or Windows .exe here</h3>
              <p className="text-[#e0d9ff]/70 mb-6">Supports iOS apps, Windows executables, and .NET applications</p>
              <Button
                className="bg-gradient-to-r from-[#8f78f5] to-[#6a5af9] hover:from-[#9f88f5] hover:to-[#7a6af9] text-white shadow-lg shadow-[#8f78f5]/25"
                onClick={() => handleFileUpload("MyApp.ipa")}
              >
                Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {uploadedFile && (
          <>
            {/* Conversion Dashboard */}
            <Card className="bg-gradient-to-r from-[#302b63]/20 to-[#24243e]/20 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-[#00d2a8]" />
                  <span>Conversion Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1: Analysis */}
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full border-4 flex items-center justify-center ${
                        conversionStep >= 1 ? "border-[#00d2a8] bg-[#00d2a8]/20" : "border-white/20"
                      }`}
                    >
                      {conversionStep >= 1 ? (
                        <CheckCircle className="w-8 h-8 text-[#00d2a8]" />
                      ) : (
                        <span className="text-lg font-medium">1</span>
                      )}
                    </div>
                    <h4 className="font-medium mb-2">Analysis</h4>
                    <p className="text-sm text-[#e0d9ff]/70">Detecting frameworks and dependencies</p>
                  </div>

                  {/* Step 2: Translation */}
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full border-4 flex items-center justify-center ${
                        conversionStep >= 2
                          ? "border-[#00d2a8] bg-[#00d2a8]/20"
                          : conversionStep === 1
                            ? "border-[#8f78f5] bg-[#8f78f5]/20 animate-pulse"
                            : "border-white/20"
                      }`}
                    >
                      {conversionStep >= 2 ? (
                        <CheckCircle className="w-8 h-8 text-[#00d2a8]" />
                      ) : (
                        <span className="text-lg font-medium">2</span>
                      )}
                    </div>
                    <h4 className="font-medium mb-2">Translation</h4>
                    <p className="text-sm text-[#e0d9ff]/70">Converting UI components to GTK/Qt</p>
                  </div>

                  {/* Step 3: Packaging */}
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full border-4 flex items-center justify-center ${
                        conversionStep >= 3
                          ? "border-[#00d2a8] bg-[#00d2a8]/20"
                          : conversionStep === 2
                            ? "border-[#8f78f5] bg-[#8f78f5]/20 animate-pulse"
                            : "border-white/20"
                      }`}
                    >
                      {conversionStep >= 3 ? (
                        <CheckCircle className="w-8 h-8 text-[#00d2a8]" />
                      ) : (
                        <span className="text-lg font-medium">3</span>
                      )}
                    </div>
                    <h4 className="font-medium mb-2">Packaging</h4>
                    <p className="text-sm text-[#e0d9ff]/70">Building AppImage bundle</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility Report */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-r from-[#302b63]/20 to-[#24243e]/20 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle>Compatibility Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Linux Compatibility Score</span>
                      <span className="text-2xl font-bold text-[#00d2a8]">{compatibilityScore}%</span>
                    </div>
                    <Progress value={compatibilityScore} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#00d2a8]/10 rounded-lg border border-[#00d2a8]/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#00d2a8]" />
                        <span className="text-sm">UI Components</span>
                      </div>
                      <Badge variant="secondary" className="bg-[#00d2a8]/20 text-[#00d2a8]">
                        Compatible
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#00d2a8]/10 rounded-lg border border-[#00d2a8]/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#00d2a8]" />
                        <span className="text-sm">Core APIs</span>
                      </div>
                      <Badge variant="secondary" className="bg-[#00d2a8]/20 text-[#00d2a8]">
                        Compatible
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Platform-specific APIs</span>
                      </div>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-500">
                        Needs Layer
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Use Wine compatibility layer</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable sandboxing</span>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview Panel */}
              <Card className="bg-gradient-to-r from-[#302b63]/20 to-[#24243e]/20 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle>UI Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-3">
                        <Smartphone className="w-4 h-4" />
                        <span className="text-sm font-medium">Original iOS</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 aspect-[9/16] flex flex-col space-y-2">
                        <div className="bg-blue-500 rounded h-8 flex items-center justify-center text-xs">UIButton</div>
                        <div className="bg-gray-600 rounded h-6"></div>
                        <div className="bg-gray-600 rounded h-4"></div>
                        <div className="bg-green-500 rounded h-8 flex items-center justify-center text-xs">
                          UISlider
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-3">
                        <Monitor className="w-4 h-4" />
                        <span className="text-sm font-medium">Linux GTK</span>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4 aspect-[9/16] flex flex-col space-y-2">
                        <div className="bg-[#8f78f5] rounded h-8 flex items-center justify-center text-xs">
                          Gtk.Button
                        </div>
                        <div className="bg-gray-700 rounded h-6"></div>
                        <div className="bg-gray-700 rounded h-4"></div>
                        <div className="bg-[#00d2a8] rounded h-8 flex items-center justify-center text-xs">
                          Gtk.Scale
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Output Controls */}
            {conversionStep >= 3 && (
              <Card className="bg-gradient-to-r from-[#302b63]/20 to-[#24243e]/20 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bundle Dependencies</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Generate .deb Package</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable Sandboxing</span>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-[#8f78f5] to-[#6a5af9] hover:from-[#9f88f5] hover:to-[#7a6af9] text-white shadow-lg shadow-[#8f78f5]/25 transition-all duration-300 hover:scale-105"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Export AppImage
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-transparent border-[#8f78f5] text-[#8f78f5] hover:bg-[#8f78f5]/10"
                    >
                      Test on Linux VM
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
