'use client'

import { useState } from 'react'
import { getTeamLogoWithFallback } from '../utils/teamLogos'

interface TeamLogoProps {
  teamSlug: string
  teamName: string
  className?: string
  fallbackUrl?: string
}

export default function TeamLogo({ teamSlug, teamName, className = "w-8 h-8", fallbackUrl }: TeamLogoProps) {
  const [imageError, setImageError] = useState(false)
  
  const logoUrl = getTeamLogoWithFallback(teamSlug, fallbackUrl)
  
  const handleImageError = () => {
    setImageError(true)
  }
  
  if (imageError && fallbackUrl) {
    return (
      <img
        src={fallbackUrl}
        alt={`${teamName} Logo`}
        className={className}
        onError={() => setImageError(false)}
      />
    )
  }
  
  return (
    <img
      src={logoUrl}
      alt={`${teamName} Logo`}
      className={className}
      onError={handleImageError}
    />
  )
}