'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LeagueCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const leagues = [
    {
      name: 'NFL',
      href: '/nfl',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'NBA',
      href: '/nba',
      logo: 'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'MLB',
      href: '/mlb',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Major_League_Baseball_logo.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'NHL',
      href: '/nhl',
      logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'MLS',
      href: '/mls',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/MLS_crest_logo_RGB_gradient.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'Premier League',
      href: '/premier-league',
      logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'Champions League',
      href: '/champions-league',
      logo: 'https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'ATP Tennis',
      href: '/tennis',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/ATP_Tour_logo.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'Formula 1',
      href: '/f1',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    },
    {
      name: 'UFC',
      href: '/ufc',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UFC_Logo.svg',
      color: 'bg-white',
      outline: 'border-2 border-gray-300'
    }
  ]

  const itemsPerPage = 4
  const maxIndex = Math.max(0, leagues.length - itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const visibleLeagues = leagues.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div className="bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-colors ${
              currentIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>

          {/* League Cards */}
          <div className="flex-1 mx-4">
            <div className="grid grid-cols-4 gap-4">
              {visibleLeagues.map((league) => (
                <Link
                  key={league.name}
                  href={league.href}
                  className="group"
                >
                  <div className={`${league.color} ${league.outline} rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    <img
                      src={league.logo}
                      alt={`${league.name} Official Logo`}
                      className="w-16 h-16 mx-auto mb-3 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://via.placeholder.com/64x64/cccccc/666666?text=' + encodeURIComponent(league.name)
                      }}
                    />
                    <h3 className="font-bold text-lg text-gray-900">{league.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`p-2 rounded-full transition-colors ${
              currentIndex >= maxIndex 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>
        </div>

        {/* Dots Indicator */}
        {leagues.length > itemsPerPage && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}