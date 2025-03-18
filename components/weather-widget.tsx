"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"

interface WeatherData {
  location: string
  temperature: number
  condition: "sunny" | "cloudy" | "rainy" | "stormy"
  humidity: number
  windSpeed: number
}

// Mock weather data for demonstration
const mockWeatherData: WeatherData[] = [
  { location: "New Delhi", temperature: 32, condition: "sunny", humidity: 45, windSpeed: 8 },
  { location: "Mumbai", temperature: 29, condition: "rainy", humidity: 80, windSpeed: 12 },
  { location: "Bangalore", temperature: 24, condition: "cloudy", humidity: 65, windSpeed: 6 },
  { location: "Kolkata", temperature: 30, condition: "cloudy", humidity: 70, windSpeed: 10 },
  { location: "Chennai", temperature: 31, condition: "sunny", humidity: 60, windSpeed: 9 },
]

export default function WeatherWidget() {
  const [location, setLocation] = useState("New Delhi")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const isMobile = useMobile()

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-12 w-12 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-12 w-12 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-12 w-12 text-blue-500" />
      case "stormy":
        return <CloudRain className="h-12 w-12 text-purple-500" />
      default:
        return <Sun className="h-12 w-12 text-yellow-500" />
    }
  }

  // Simulate fetching weather data
  const fetchWeather = () => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const foundWeather = mockWeatherData.find((w) => w.location.toLowerCase() === location.toLowerCase())
      setWeather(foundWeather || mockWeatherData[0])
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
        />
        <Button onClick={fetchWeather} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>

      {weather && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-shrink-0">{getWeatherIcon(weather.condition)}</div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold">{weather.location}</h3>
              <p className="text-3xl font-bold">{weather.temperature}°C</p>
              <p className="text-muted-foreground capitalize">{weather.condition}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-medium">{weather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="font-medium">{weather.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-center">
          <p className="text-sm text-muted-foreground">Rainfall</p>
          <p className="font-medium">12 mm</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-md text-center">
          <p className="text-sm text-muted-foreground">Soil Temp</p>
          <p className="font-medium">26°C</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md text-center">
          <p className="text-sm text-muted-foreground">Soil Moisture</p>
          <p className="font-medium">42%</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md text-center">
          <p className="text-sm text-muted-foreground">UV Index</p>
          <p className="font-medium">High</p>
        </div>
      </div>
    </div>
  )
}

