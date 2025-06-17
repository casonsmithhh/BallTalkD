'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Headline {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  sport: string
  imageUrl: string
  url: string
  importance: number
}

export default function SportsFeed() {
  const [headlines, setHeadlines] = useState<Headline[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadHeadlines()
  }, [])

  const loadHeadlines = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      setTimeout(() => {
        setHeadlines(generateMockHeadlines())
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load headlines:', error)
      setIsLoading(false)
    }
  }

  const generateMockHeadlines = (): Headline[] => {
    return [
      {
        id: '1',
        title: 'NBA Finals Game 6 Tonight: Celtics Look to Close Out Nuggets',
        summary: 'Boston leads series 3-2 and can capture back-to-back championships with victory at TD Garden tonight.',
        source: 'ESPN',
        publishedAt: '2 hours ago',
        sport: 'NBA',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop',
        url: '/news/nba-finals-game-6',
        importance: 98
      },
      {
        id: '2',
        title: 'Chiefs Begin Quest for Fourth Straight Super Bowl Title',
        summary: 'Kansas City opens training camp as heavy favorites to make NFL history with unprecedented four-peat.',
        source: 'NFL Network',
        publishedAt: '4 hours ago',
        sport: 'NFL',
        imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=400&fit=crop',
        url: '/news/chiefs-fourth-title',
        importance: 95
      },
      {
        id: '3',
        title: 'Aaron Judge Chasing 60 Home Runs Again',
        summary: 'Yankees captain sits at 32 homers before All-Star break, on pace for another historic season.',
        source: 'MLB Network',
        publishedAt: '6 hours ago',
        sport: 'MLB',
        imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=400&fit=crop',
        url: '/news/judge-60-homers',
        importance: 89
      },
      {
        id: '4',
        title: 'Messi\'s MLS Impact Continues to Grow',
        summary: 'Inter Miami superstar transforms league\'s global profile with every match.',
        source: 'MLS Soccer',
        publishedAt: '8 hours ago',
        sport: 'MLS',
        imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop',
        url: '/news/messi-mls-impact',
        importance: 92
      },
      {
        id: '5',
        title: 'Ovechkin Closes in on Gretzky\'s Record',
        summary: 'Washington captain needs just 41 more goals to break the all-time NHL scoring record.',
        source: 'NHL Network',
        publishedAt: '10 hours ago',
        sport: 'NHL',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        url: '/news/ovechkin-record-chase',
        importance: 87
      },
      {
        id: '6',
        title: 'Australian Open Draw Released',
        summary: 'First Grand Slam of 2025 features exciting matchups and potential early clashes.',
        source: 'Tennis.com',
        publishedAt: '12 hours ago',
        sport: 'Tennis',
        imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop',
        url: '/news/australian-open-draw',
        importance: 84
      }
    ]
  }

  const getSportColor = (sport: string) => {
    const colors: { [key: string]: string } = {
      'NBA': 'bg-red-600',
      'NFL': 'bg-blue-600',
      'MLB': 'bg-blue-800',
      'NHL': 'bg-gray-800',
      'MLS': 'bg-green-600',
      'Tennis': 'bg-yellow-600'
    }
    return colors[sport] || 'bg-gray-600'
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Sports Headlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Latest Sports Headlines
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {headlines.map((headline) => (
            <Link
              key={headline.id}
              href={headline.url}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={headline.imageUrl}
                    alt={headline.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`${getSportColor(headline.sport)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                      {headline.sport}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {headline.publishedAt}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {headline.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {headline.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-medium text-sm">
                      {headline.source}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">
                        {headline.importance}% relevance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Load More Headlines
          </button>
        </div>
      </div>
    </div>
  )
}