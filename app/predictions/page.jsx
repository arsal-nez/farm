"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import PredictionCharts from "@/components/predictions-charts"
import { useState } from 'react'

export default function PredictionsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = async () => {
    setLoading(true);
    setError('');

    const data = {
      temperature: parseFloat(document.getElementById('temperature').value),
      humidity: parseFloat(document.getElementById('humidity').value),
      rainfall: parseFloat(document.getElementById('rainfall').value),
      nitrogen: parseFloat(document.getElementById('nitrogen').value),
      phosphorus: parseFloat(document.getElementById('phosphorus').value),
      potassium: parseFloat(document.getElementById('potassium').value),
    };

    try {
      const response = await fetch('https://web-production-cc089.up.railway.app/predict/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      setPrediction(result.prediction);
      
      // Automatically switch to the summary tab to show results
      const summaryTab = document.querySelector('[value="summary"]');
      if (summaryTab) {
        summaryTab.click();
      }
    } catch (error) {
      setError('Failed to get prediction. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update the predicted yield display
  const formatYield = (value) => {
    return value ? value.toFixed(2) : '0.00';
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-950/20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
       
        </div>
      </header>

      <main className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Crop Yield Prediction</h1>
          <p className="text-muted-foreground">
            Enter your farm details to get accurate yield predictions based on our machine learning model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>Fill in the details below for accurate predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handlePrediction}
                disabled={loading}
              >
                {loading ? 'Generating Prediction...' : 'Generate Prediction'}
              </Button>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type</Label>
                <select id="crop" className="w-full p-2 border rounded-md">
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="maize">Maize</option>
                  <option value="potato">Potato</option>
                  <option value="sugarcane">Sugarcane</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area (hectares)</Label>
                <Input id="area" type="number" placeholder="Enter area" defaultValue="5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="season">Growing Season</Label>
                <select id="season" className="w-full p-2 border rounded-md">
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="zaid">Zaid (Summer)</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="soilMoisture">
                    Soil Moisture (%)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px]">Top factor (40% importance) for yield prediction</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm text-muted-foreground">40% importance</span>
                </div>
                <Input id="soilMoisture" type="number" placeholder="Enter soil moisture" defaultValue="35" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rainfall">
                    Rainfall (mm)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px]">Second most important factor (35% importance)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm text-muted-foreground">35% importance</span>
                </div>
                <Input id="rainfall" type="number" placeholder="Enter rainfall" defaultValue="1200" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature">
                    Temperature (°C)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px]">Third most important factor (20% importance)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm text-muted-foreground">20% importance</span>
                </div>
                <Input id="temperature" type="number" placeholder="Enter temperature" defaultValue="28" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <select id="soilType" className="w-full p-2 border rounded-md">
                  <option value="clay">Clay</option>
                  <option value="loamy">Loamy</option>
                  <option value="sandy">Sandy</option>
                  <option value="silt">Silt</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
                <Input id="nitrogen" type="number" placeholder="Enter nitrogen" defaultValue="80" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
                <Input id="phosphorus" type="number" placeholder="Enter phosphorus" defaultValue="40" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potassium">Potassium (kg/ha)</Label>
                <Input id="potassium" type="number" placeholder="Enter potassium" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">
                  Humidity (%)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Relative humidity affects crop growth</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input 
                  id="humidity" 
                  type="number" 
                  placeholder="Enter humidity" 
                  defaultValue="60" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>
                Based on your input parameters, here are the predicted yields and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  <TabsTrigger value="factors">Key Factors</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                      <h3 className="text-lg font-medium mb-2">Predicted Yield</h3>
                      <div className="flex flex-col items-center">
                        <div className="text-center mb-4">
                          <span className="text-sm text-muted-foreground">Prediction:</span>
                          <div className="text-3xl font-bold text-green-600 mt-1">
                            {formatYield(prediction)} <span className="text-xl">kg/hc</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-4">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-3 w-full text-center text-sm">
                          <div>
                            <p className="text-muted-foreground">Low</p>
                            <p className="font-medium">1,500 kg/hc</p>
                          </div>
                          <div>
                            <p className="font-medium text-green-600">Your Prediction</p>
                            <div className="flex justify-center">
                              <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center -mt-3">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">High</p>
                            <p className="font-medium">3,500 kg/hc</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                      <h3 className="text-lg font-medium mb-2">Prediction Details</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Confidence Level:</span>
                          <span className="font-bold text-blue-600">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Raw Prediction Value:</span>
                          <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded">
                            2521.0506092368905 kg/hc
                          </span>
                        </div>

                        <div className="pt-2 text-xs text-muted-foreground">
                          <p>• This prediction is 15% higher than the regional average</p>
                          <p>• Based on model accuracy and input data quality</p>
                          <p>• Prediction generated using machine learning model v2.1</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                    <h3 className="text-lg font-medium mb-4">Yield Range Prediction</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Minimum</p>
                        <p className="text-xl font-bold">2,200 kg/hc</p>
                      </div>
                      <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
                        <div className="relative w-full">
                          <div
                            className="absolute h-4 w-4 bg-green-600 rounded-full top-1/2 transform -translate-y-1/2"
                            style={{ left: "60%" }}
                          ></div>
                          <div className="h-2 bg-gradient-to-r from-orange-400 via-green-500 to-green-700 rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Maximum</p>
                        <p className="text-xl font-bold">2,800 kg/hc</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                    <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <p>Your soil moisture levels are optimal for the selected crop</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5">
                          <span className="text-yellow-600 text-xs">!</span>
                        </div>
                        <p>Rainfall is slightly below optimal levels, consider supplemental irrigation</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <p>Temperature conditions are favorable for crop development</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-xs">i</span>
                        </div>
                        <p>Increasing nitrogen by 10% could potentially improve yield by 5-8%</p>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="charts">
                  <div className="space-y-6 mt-4">
                    <PredictionCharts />
                  </div>
                </TabsContent>

                <TabsContent value="comparison">
                  <div className="space-y-6 mt-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                      <h3 className="text-lg font-medium mb-4">Yield Comparison</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Your Predicted Yield</span>
                          <div className="flex items-center gap-2">
                            <div className="w-48 bg-gray-200 rounded-full h-4">
                              <div className="bg-green-600 h-4 rounded-full" style={{ width: "80%" }}></div>
                            </div>
                            <span className="font-bold">4.8 t/ha</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">District Average</span>
                          <div className="flex items-center gap-2">
                            <div className="w-48 bg-gray-200 rounded-full h-4">
                              <div className="bg-blue-500 h-4 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <span className="font-bold">4.2 t/ha</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">State Average</span>
                          <div className="flex items-center gap-2">
                            <div className="w-48 bg-gray-200 rounded-full h-4">
                              <div className="bg-blue-500 h-4 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                            <span className="font-bold">3.9 t/ha</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Top 10% Farms</span>
                          <div className="flex items-center gap-2">
                            <div className="w-48 bg-gray-200 rounded-full h-4">
                              <div className="bg-purple-500 h-4 rounded-full" style={{ width: "90%" }}></div>
                            </div>
                            <span className="font-bold">5.4 t/ha</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                      <h3 className="text-lg font-medium mb-4">Historical Comparison</h3>
                      <div className="h-64 w-full">
                        {/* This would be a line chart showing historical yields */}
                        <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <p className="text-muted-foreground">Historical yield comparison chart</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="factors">
                  <div className="space-y-6 mt-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                      <h3 className="text-lg font-medium mb-4">Feature Importance</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        The chart below shows the relative importance of different factors in predicting crop yield.
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Soil Moisture</span>
                            <span className="font-bold">40%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-blue-600 h-4 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Rainfall</span>
                            <span className="font-bold">35%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-green-600 h-4 rounded-full" style={{ width: "35%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Temperature</span>
                            <span className="font-bold">20%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-orange-500 h-4 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Other Factors</span>
                            <span className="font-bold">5%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-gray-500 h-4 rounded-full" style={{ width: "5%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                      <h3 className="text-lg font-medium mb-4">Sensitivity Analysis</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        How changes in key factors affect the predicted yield.
                      </p>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Soil Moisture</p>
                            <p className="font-medium">+10%</p>
                            <p className="text-green-600 font-bold">+8% Yield</p>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Rainfall</p>
                            <p className="font-medium">+10%</p>
                            <p className="text-green-600 font-bold">+7% Yield</p>
                          </div>
                          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Temperature</p>
                            <p className="font-medium">+2°C</p>
                            <p className="text-red-600 font-bold">-3% Yield</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download Report</Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/recommendations">
                  Get Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

