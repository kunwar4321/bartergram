'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function ScrollAnimation() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [targetFrame, setTargetFrame] = useState(0) // Target frame for lerp interpolation
  const containerRef = useRef(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [imageSources, setImageSources] = useState([])

  const totalFrames = 1404
  const batchSize = 100
  const imageWidth = 1920
  const imageHeight = 1080
  const startingFrame = 51
  const preloadOffset = 5
  const lerpSpeed = 0.1 // Lerp interpolation speed

  // Load image batch
  const loadImageBatch = async (start, end) => {
    const loadedSources = []
    for (let i = start; i <= end; i++) {
      const src = `/images/services/Servicepage_final_${(i + startingFrame - 1).toString().padStart(5, '0')}.jpg`
      loadedSources.push(src)
    }
    return loadedSources
  }

  // Batch load images and preload them ahead of time
  useEffect(() => {
    const loadAllImages = async () => {
      const allSources = []
      for (let i = 0; i < totalFrames; i += batchSize) {
        const end = Math.min(i + batchSize - 1, totalFrames - 1)
        const batch = await loadImageBatch(i + 1, end + 1)
        allSources.push(...batch)
      }
      setImageSources(allSources)
      setImagesLoaded(true)
    }

    loadAllImages()
  }, [totalFrames])

  // Smooth frame interpolation using lerp
  useEffect(() => {
    if (!imagesLoaded) return

    let animationFrameId = null

    const lerp = (start, end, t) => {
      return start * (1 - t) + end * t
    }

    const animate = () => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = lerp(prevFrame, targetFrame, lerpSpeed)
        if (Math.abs(nextFrame - targetFrame) < 0.01) {
          return targetFrame
        }
        return nextFrame
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollFraction = scrollTop / maxScroll
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.ceil(scrollFraction * totalFrames)
      )

      // Set target frame for smooth interpolation
      setTargetFrame(frameIndex)

      // Preload next frames for smoother transitions
      if (frameIndex >= currentFrame + preloadOffset) {
        setImageSources((currentSources) => [
          ...currentSources,
          ...imageSources.slice(currentFrame, currentFrame + preloadOffset),
        ])
      }
    }

    window.addEventListener('scroll', handleScroll)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [imagesLoaded, targetFrame, totalFrames])

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        {imagesLoaded ? (
          <Image
            src={imageSources[Math.floor(currentFrame)]} // Use floored value to prevent fractional indexing
            alt={`Animation frame ${Math.floor(currentFrame) + 1}`}
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            className="max-w-full max-h-full object-cover"
            style={{ willChange: 'transform, opacity' }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4">Loading images...</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(imageSources.length / totalFrames) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
