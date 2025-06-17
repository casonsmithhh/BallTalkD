'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LeagueCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const leagues = [
    {
      name: 'NFL',
      href: '/nfl',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png',
      color: 'bg-white'
      outline: 
    },
    {
      name: 'NBA',
      href: '/nba',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/NBA-Logo.png',
      color: 'bg-red-600'
    },
    {
      name: 'MLB',
      href: '/mlb',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/MLB-Logo.png',
      color: 'bg-blue-800'
    },
    {
      name: 'NHL',
      href: '/nhl',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/NHL-Logo.png',
      color: 'bg-gray-800'
    },
    {
      name: 'MLS',
      href: '/mls',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/MLS-Logo.png',
      color: 'bg-green-600'
    },
    {
      name: 'Soccer',
      href: '/soccer',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/UEFA-Champions-League-Logo.png',
      color: 'bg-purple-600'
    },
    {
      name: 'Tennis',
      href: '/tennis',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/ATP-Logo.png',
      color: 'bg-yellow-600'
    },
    {
      name: 'F1',
      href: '/f1',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Formula-1-Logo.png',
      color: 'bg-red-700'
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
                  <div className={`${league.color} rounded-xl p-6 text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    <img
                      src={league.logo}
                      alt={`${league.name} Logo`}
                      className="w-12 h-12 mx-auto mb-3 object-contain filter brightness-0 invert"
                    />
                    <h3 className="font-bold text-lg">{league.name}</h3>
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