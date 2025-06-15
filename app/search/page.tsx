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
    
    // Simulate API call - replace with real search implementation
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'team',
          title: 'Los Angeles Lakers',
          description: 'NBA team based in Los Angeles, California',
          sport: 'NBA',
          url: '/team/nba/los-angeles-lakers',
          relevance: 95
        },
        {
          id: '2',
          type: 'player',
          title: 'LeBron James',
          description: 'NBA superstar, 4-time champion, Lakers forward',
          sport: 'NBA',
          url: '/player/lebron-james',
          relevance: 90
        },
        {
          id: '3',
          type: 'discussion',
          title: 'Lakers Trade Rumors Discussion',
          description: 'Community discussion about potential Lakers trades',
          sport: 'NBA',
          url: '/discussions/lakers-trade-rumors',
          relevance: 85
        },
        {
          id: '4',
          type: 'topic',
          title: 'NBA MVP Race 2025',
          description: 'Analysis and discussion of MVP candidates',
          sport: 'NBA',
          url: '/topics/nba-mvp-race-2025',
          relevance: 80
        }
      ].filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setResults(mockResults)
      setIsLoading(false)
    }, 1000)
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
            <i className="fas fa-spinner animate-spin text-2xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">Searching...</p>
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