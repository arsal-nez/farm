import Link from "next/link"
import { ArrowLeft, Check, AlertTriangle, Droplets, Thermometer, Cloud, Leaf, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-950/20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/predictions" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Predictions</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Personalized Recommendations</h1>
          <p className="text-muted-foreground">
            Based on your prediction results, here are tailored recommendations to optimize your crop yield.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Prediction Summary</CardTitle>
              <CardDescription>Your current prediction results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Predicted Yield</span>
                  <span className="font-bold text-green-600">2,521.05 kg/hc</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Potential Yield</span>
                  <span className="font-bold text-blue-600">3,025.26 kg/hc</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Yield Gap</span>
                  <span className="font-bold text-orange-500">504.21 kg/hc</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Key Factors Status</h3>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span>Soil Moisture</span>
                    </div>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Check className="h-4 w-4" /> Optimal
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4 text-blue-500" />
                      <span>Rainfall</span>
                    </div>
                    <span className="text-orange-500 font-medium flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Below Optimal
                    </span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <span>Temperature</span>
                    </div>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Check className="h-4 w-4" /> Optimal
                    </span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Crop Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Crop Type</span>
                    <span className="font-medium">Rice</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Variety</span>
                    <span className="font-medium">IR-36</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Growing Season</span>
                    <span className="font-medium">Kharif</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-medium">5 hectares</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/predictions">Update Prediction</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Recommendations */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Actionable Recommendations</CardTitle>
              <CardDescription>Based on the top factors affecting your crop yield</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="irrigation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                  <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                  <TabsTrigger value="planning">Crop Planning</TabsTrigger>
                </TabsList>

                <TabsContent value="irrigation" className="space-y-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                        <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Irrigation Recommendations</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on soil moisture (40% importance) and rainfall (35% importance)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Current Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Soil moisture level is at 35% (optimal range: 30-40%)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-orange-600" />
                            </div>
                            <span>Rainfall is 1200mm (below optimal 1400mm for rice)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                              <Cloud className="h-3 w-3 text-blue-600" />
                            </div>
                            <span>Current irrigation schedule: Once every 5 days</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recommended Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                              <span className="text-blue-600 text-xs">1</span>
                            </div>
                            <span>Increase irrigation frequency to once every 3 days</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                              <span className="text-blue-600 text-xs">2</span>
                            </div>
                            <span>Implement drip irrigation to maintain consistent soil moisture</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                              <span className="text-blue-600 text-xs">3</span>
                            </div>
                            <span>Add mulch to reduce evaporation and maintain soil moisture</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Expected Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Implementing these irrigation recommendations could increase your yield by:
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-blue-600 h-4 rounded-full" style={{ width: "12%" }}></div>
                          </div>
                          <span className="font-bold text-blue-600">+12%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This would increase your predicted yield from 4.8 tonnes/ha to approximately 5.4 tonnes/ha.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Irrigation Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Growth Stage</th>
                                <th className="text-left py-2">Water Requirement</th>
                                <th className="text-left py-2">Frequency</th>
                                <th className="text-left py-2">Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2">Seedling</td>
                                <td className="py-2">Low</td>
                                <td className="py-2">Every 5 days</td>
                                <td className="py-2">15-20 minutes</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2">Vegetative</td>
                                <td className="py-2">Medium</td>
                                <td className="py-2">Every 3 days</td>
                                <td className="py-2">25-30 minutes</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2">Reproductive</td>
                                <td className="py-2">High</td>
                                <td className="py-2">Every 2 days</td>
                                <td className="py-2">30-35 minutes</td>
                              </tr>
                              <tr>
                                <td className="py-2">Ripening</td>
                                <td className="py-2">Medium</td>
                                <td className="py-2">Every 4 days</td>
                                <td className="py-2">20-25 minutes</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fertilizer" className="space-y-4 mt-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Fertilizer Recommendations</h3>
                        <p className="text-sm text-muted-foreground">Based on soil analysis and crop requirements</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Current Nutrient Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Nitrogen (N): 80 kg/ha (optimal range: 80-100 kg/ha)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-orange-600" />
                            </div>
                            <span>Phosphorus (P): 40 kg/ha (below optimal 50-60 kg/ha)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-orange-600" />
                            </div>
                            <span>Potassium (K): 30 kg/ha (below optimal 40-50 kg/ha)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recommended Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <span className="text-green-600 text-xs">1</span>
                            </div>
                            <span>Apply additional 15 kg/ha of phosphorus (P) fertilizer</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <span className="text-green-600 text-xs">2</span>
                            </div>
                            <span>Apply additional 15 kg/ha of potassium (K) fertilizer</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <span className="text-green-600 text-xs">3</span>
                            </div>
                            <span>
                              Use split application: 50% at planting, 25% at tillering, 25% at panicle initiation
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Expected Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Implementing these fertilizer recommendations could increase your yield by:
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-green-600 h-4 rounded-full" style={{ width: "8%" }}></div>
                          </div>
                          <span className="font-bold text-green-600">+8%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This would increase your predicted yield from 4.8 tonnes/ha to approximately 5.2 tonnes/ha.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Fertilizer Application Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Growth Stage</th>
                                <th className="text-left py-2">Nitrogen (N)</th>
                                <th className="text-left py-2">Phosphorus (P)</th>
                                <th className="text-left py-2">Potassium (K)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2">Planting</td>
                                <td className="py-2">40 kg/ha</td>
                                <td className="py-2">30 kg/ha</td>
                                <td className="py-2">25 kg/ha</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2">Tillering</td>
                                <td className="py-2">20 kg/ha</td>
                                <td className="py-2">15 kg/ha</td>
                                <td className="py-2">10 kg/ha</td>
                              </tr>
                              <tr>
                                <td className="py-2">Panicle Initiation</td>
                                <td className="py-2">20 kg/ha</td>
                                <td className="py-2">10 kg/ha</td>
                                <td className="py-2">10 kg/ha</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="planning" className="space-y-4 mt-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Crop Planning Recommendations</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on climate conditions, soil health, and market trends
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Current Planning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Rice variety: IR-36 (good choice for your region)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-orange-600" />
                            </div>
                            <span>Planting date: June 15 (slightly late for optimal growth)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-orange-600" />
                            </div>
                            <span>No crop rotation plan implemented</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recommended Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <span className="text-orange-600 text-xs">1</span>
                            </div>
                            <span>Adjust planting date to June 1 for optimal growing season</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <span className="text-orange-600 text-xs">2</span>
                            </div>
                            <span>Implement crop rotation: Rice → Legumes → Vegetables</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                              <span className="text-orange-600 text-xs">3</span>
                            </div>
                            <span>Consider drought-resistant rice varieties like Sahbhagi Dhan</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Expected Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Implementing these crop planning recommendations could increase your yield by:
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-orange-600 h-4 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                          <span className="font-bold text-orange-600">+10%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This would increase your predicted yield from 4.8 tonnes/ha to approximately 5.3 tonnes/ha.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Seasonal Planning Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Month</th>
                                <th className="text-left py-2">Activity</th>
                                <th className="text-left py-2">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2">May</td>
                                <td className="py-2">Land preparation</td>
                                <td className="py-2">Incorporate organic matter</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2">June 1-7</td>
                                <td className="py-2">Planting</td>
                                <td className="py-2">Optimal planting window</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2">July-August</td>
                                <td className="py-2">Growth monitoring</td>
                                <td className="py-2">Regular pest and disease checks</td>
                              </tr>
                              <tr>
                                <td className="py-2">October</td>
                                <td className="py-2">Harvesting</td>
                                <td className="py-2">Optimal moisture content: 20-22%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download Recommendations</Button>
              <Button className="bg-green-600 hover:bg-green-700">Implement Recommendations</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Combined Impact Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Combined Impact Analysis</CardTitle>
              <CardDescription>Implementing all recommendations could significantly improve your yield</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border text-center">
                    <h3 className="text-lg font-medium mb-2">Current Predicted Yield</h3>
                    <div className="text-4xl font-bold text-gray-700 dark:text-gray-300">2,521.05</div>
                    <p className="text-sm text-muted-foreground">kg/hc</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border text-center">
                    <h3 className="text-lg font-medium mb-2">Potential Yield Increase</h3>
                    <div className="text-4xl font-bold text-green-600">+30%</div>
                    <p className="text-sm text-muted-foreground">with all recommendations</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border text-center">
                    <h3 className="text-lg font-medium mb-2">Optimized Yield</h3>
                    <div className="text-4xl font-bold text-blue-600">3,277.37</div>
                    <p className="text-sm text-muted-foreground">kg/hc</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                  <h3 className="text-lg font-medium mb-4">Recommendation Impact Breakdown</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Irrigation Optimization</span>
                        </div>
                        <span className="font-bold text-blue-600">+12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Fertilizer Management</span>
                        </div>
                        <span className="font-bold text-green-600">+8%</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">Crop Planning</span>
                        </div>
                        <span className="font-bold text-orange-600">+10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border">
                  <h3 className="text-lg font-medium mb-4">Economic Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Revenue Projection</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Scenario</th>
                            <th className="text-right py-2">Yield (kg/hc)</th>
                            <th className="text-right py-2">Revenue (₹/hc)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Current</td>
                            <td className="text-right py-2">2,521.05</td>
                            <td className="text-right py-2">50,421</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">With Irrigation</td>
                            <td className="text-right py-2">2,823.58</td>
                            <td className="text-right py-2">56,472</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">With Fertilizer</td>
                            <td className="text-right py-2">2,722.73</td>
                            <td className="text-right py-2">54,455</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">All Recommendations</td>
                            <td className="text-right py-2 font-medium">3,277.37</td>
                            <td className="text-right py-2 font-medium">65,547</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-muted-foreground mt-2">*Assuming market price of ₹20 per kg</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Implementation Costs</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Recommendation</th>
                            <th className="text-right py-2">Cost (₹/ha)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Irrigation Optimization</td>
                            <td className="text-right py-2">5,000</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Fertilizer Management</td>
                            <td className="text-right py-2">3,000</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Crop Planning</td>
                            <td className="text-right py-2">2,000</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Total Investment</td>
                            <td className="text-right py-2 font-medium">10,000</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="font-medium">Net Profit Increase: ₹15,547 per hectare</p>
                        <p className="text-xs text-muted-foreground">
                          ROI: 155% (₹15,547 additional profit / ₹10,000 investment)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Generate Comprehensive Implementation Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

