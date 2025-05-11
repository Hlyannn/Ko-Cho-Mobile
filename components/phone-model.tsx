"use client"

import { useState, useEffect } from "react"

export default function PhoneModel() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading the 3D model
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading 3D model...</p>
        </div>
      </div>
    )
  }

  // Instead of using Spline, we'll use a simple phone mockup image
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="relative w-[280px] h-[560px] bg-black rounded-[36px] border-4 border-gray-800 overflow-hidden">
        {/* Phone screen */}
        <div className="absolute inset-0 m-1 rounded-[32px] bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
          {/* Phone content: Show the image filling the screen */}
          <img
            src="/images/Kocho.jpg"
            alt="Ko Cho Mobile Shop"
            className="absolute inset-0 w-full h-full object-contain rounded-[32px] bg-white"
          />
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-10"></div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/80 rounded-full z-10"></div>
      </div>
    </div>
  )
}
