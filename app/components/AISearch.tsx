'use client'

import { useState } from 'react'

export default function AISearch() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [showResponse, setShowResponse] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a question!')
      return
    }

    setIsLoading(true)
    setShowResponse(false)

    try {
      // Call our API endpoint for real-time sports data
      const response = await fetch(`/api/ai-sports-analysis?query=${encodeURIComponent(query)}`)
      const data = await response.json()
      
      setResponse(data.analysis || 'Unable to generate analysis at this time.')
      setIsLoading(false)
      setShowResponse(true)
    } catch (error) {
      console.error('AI Search Error:', error)
      setResponse('Sorry, there was an error processing your request. Please try again.')
      setIsLoading(false)
      setShowResponse(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="bg-white py-8 px-10 text-center shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about trades, stats, predictions, or any sports question..."
            className="flex-1 px-5 py-5 text-lg border-3 border-gray-900 rounded-full outline-none transition-all duration-300 focus:border-orange-400 focus:shadow-lg focus:shadow-orange-200"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="search-btn-gradient text-white border-none px-6 py-5 rounded-full cursor-pointer text-base transition-all duration-300 hover:scale-105 whitespace-nowrap disabled:opacity-50"
          >
            <i className={`fas ${isLoading ? 'fa-spinner animate-spin' : 'fa-robot'} mr-2`}></i>
            {isLoading ? 'Analyzing...' : 'Ask AI'}
          </button>
        </div>

        {isLoading && (
          <div className="text-orange-400 italic flex items-center justify-center gap-2">
            <i className="fas fa-spinner animate-spin"></i>
            BallTalk AI is analyzing current sports data...
          </div>
        )}

        {showResponse && (
          <div className="ai-response-gradient mt-8 p-6 rounded-2xl border-l-4 border-orange-400 text-left max-h-80 overflow-y-auto">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2 text-lg font-semibold">
              <i className="fas fa-robot"></i>
              BallTalk AI Analysis:
            </h3>
            <div 
              className="text-gray-600 leading-relaxed text-base"
              dangerouslySetInnerHTML={{ __html: response }}
            />
          </div>
        )}
      </div>
    </div>
  )
}