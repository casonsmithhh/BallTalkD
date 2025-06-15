'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from 'next/link'

interface SearchResult {
  id: string
  type: 'team' | 'player' | 'topic' | 'discussion'
  title: string
  description: string
  sport: string
  url: string
  relevance: number
  imageUrl?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  useEffect(() => {
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    
    try {
      // Simulate API call with realistic sports data
      setTimeout(() => {
        const mockResults: SearchResult[] = generateSearchResults(searchQuery)
        setResults(mockResults)
        setIsLoading(false)
      }, 800)
    } catch (error) {
      console.error('Search error:', error)
      setIsLoading(false)
    }
  }

  const generateSearchResults = (searchQuery: string): SearchResult[] => {
    const query = searchQuery.toLowerCase()
    const allResults: SearchResult[] = []

    // NBA Teams and Players
    const nbaData = [
      { name: 'Los Angeles Lakers', type: 'team', sport: 'NBA', url: '/team/nba/los-angeles-lakers' },
      { name: 'Boston Celtics', type: 'team', sport: 'NBA', url: '/team/nba/boston-celtics' },
      { name: 'Golden State Warriors', type: 'team', sport: 'NBA', url: '/team/nba/golden-state-warriors' },
      { name: 'LeBron James', type: 'player', sport: 'NBA', url: '/player/lebron-james' },
      { name: 'Stephen Curry', type: 'player', sport: 'NBA', url: '/player/stephen-curry' },
      { name: 'Jayson Tatum', type: 'player', sport: 'NBA', url: '/player/jayson-tatum' },
      { name: 'Nikola Jokic', type: 'player', sport: 'NBA', url: '/player/nikola-jokic' }
    ]

    // NFL Teams and Players
    const nflData = [
      { name: 'Kansas City Chiefs', type: 'team', sport: 'NFL', url: '/team/nfl/kansas-city-chiefs' },
      { name: 'Buffalo Bills', type: 'team', sport: 'NFL', url: '/team/nfl/buffalo-bills' },
      { name: 'Dallas Cowboys', type: 'team', sport: 'NFL', url: '/team/nfl/dallas-cowboys' },
      { name: 'Patrick Mahomes', type: 'player', sport: 'NFL', url: '/player/patrick-mahomes' },
      { name: 'Josh Allen', type: 'player', sport: 'NFL', url: '/player/josh-allen' },
      { name: 'Caleb Williams', type: 'player', sport: 'NFL', url: '/player/caleb-williams' }
    ]

    // MLB Teams and Players
    const mlbData = [
      { name: 'New York Yankees', type: 'team', sport: 'MLB', url: '/team/mlb/new-york-yankees' },
      { name: 'Los Angeles Dodgers', type: 'team', sport: 'MLB', url: '/team/mlb/los-angeles-dodgers' },
      { name: 'Aaron Judge', type: 'player', sport: 'MLB', url: '/player/aaron-judge' },
      { name: 'Shohei Ohtani', type: 'player', sport: 'MLB', url: '/player/shohei-ohtani' }
    ]

    // Combine all data
    const allData = [...nbaData, ...nflData, ...mlbData]

    // Filter based on search query
    allData.forEach(item => {
      if (item.name.toLowerCase().includes(query)) {
        const relevance = calculateRelevance(item.name, query)
        allResults.push({
          id: `${item.sport}-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
          type: item.type as 'team' | 'player',
          title: item.name,
          description: `${item.sport} ${item.type} - Join discussions and get latest updates`,
          sport: item.sport,
          url: item.url,
          relevance,
          imageUrl: getImageForSport(item.sport)
        })
      }
    })

    // Add discussion results
    if (query.includes('trade') || query.includes('mvp') || query.includes('finals')) {
      allResults.push({
        id: 'discussion-1',
        type: 'discussion',
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} Discussion`,
        description: 'Join the community discussion about this hot topic',
        sport: 'General',
        url: `/discussions/general/all/${query.replace(/\s+/g, '-')}`,
        relevance: 85,
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop'
      })
    }

    // Add topic results
    if (query.includes('nba') || query.includes('nfl') || query.includes('mlb')) {
      allResults.push({
        id: 'topic-1',
        type: 'topic',
        title: `${query.toUpperCase()} Latest News & Analysis`,
        description: 'Get the latest news, analysis, and discussions',
        sport: query.toUpperCase(),
        url: `/${query.toLowerCase()}`,
        relevance: 90,
        imageUrl: getImageForSport(query.toUpperCase())
      })
    }

    return allResults.sort((a, b) => b.relevance - a.relevance)
  }

  const calculateRelevance = (itemName: string, query: string): number => {
    const name = itemName.toLowerCase()
    const q = query.toLowerCase()
    
    if (name === q) return 100
    if (name.startsWith(q)) return 90
    if (name.includes(q)) return 80
    
    // Check for partial matches
    const words = q.split(' ')
    let score = 0
    words.forEach(word => {
      if (name.includes(word)) score += 20
    })
    
    return Math.max(score, 10)
  }

  const getImageForSport = (sport: string): string => {
    const images: { [key: string]: string } = {
      'NBA': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop',
      'NFL': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop',
      'MLB': 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=200&fit=crop',
      'NHL': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      'General': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop'
    }
    return images[sport] || images['General']
  }

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('ballTalkUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('ballTalkUser')
  }

  const filteredResults = results.filter(result => 
    selectedFilter === 'all' || result.type === selectedFilter
  )

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'team': return '🏆'
      case 'player': return '👤'
      case 'discussion': return '💬'
      case 'topic': return '📰'
      default: return '🔍'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Showing results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {[
              { id: 'all', label: 'All Results' },
              { id: 'team', label: 'Teams' },
              { id: 'player', label: 'Players' },
              { id: 'discussion', label: 'Discussions' },
              { id: 'topic', label: 'Topics' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Searching...</p>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-4">
            {filteredResults.map(result => (
              <Link
                key={result.id}
                href={result.url}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getResultIcon(result.type)}</div>
                  {result.imageUrl && (
                    <img
                      src={result.imageUrl}
                      alt={result.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {result.title}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {result.sport}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {result.type}
                      </span>
                    </div>
                    <p className="text-gray-600">{result.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {result.relevance}% match
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try searching for teams, players, or topics you're interested in.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600">
              Enter a search term to find teams, players, discussions, and more.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}