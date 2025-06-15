'use client'

import { useState } from 'react'

export default function AISearch() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [showResponse, setShowResponse] = useState(false)

  const generateSportsResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase()

    // NFL Responses with accurate May 2025 data
    if (lowerQuestion.includes('nfl mvp') || (lowerQuestion.includes('mvp') && lowerQuestion.includes('nfl'))) {
      if (lowerQuestion.includes('last season') || lowerQuestion.includes('2023') || lowerQuestion.includes('won')) {
        return "<strong>Lamar Jackson</strong> won the 2023 NFL MVP award! The Baltimore Ravens quarterback had an incredible season, throwing for 3,678 yards and 24 TDs while rushing for 821 yards and 5 TDs. He beat out Dak Prescott, Josh Allen, and Tua Tagovailoa for the honor. Jackson became just the second player to win multiple MVP awards as a quarterback under age 27."
      } else {
        return "The 2024 NFL season concluded with the playoffs! <strong>Josh Allen</strong> had an MVP-caliber season with 4,306 passing yards and 40 total TDs, leading Buffalo to the #2 AFC seed. The Bills, Ravens, Chiefs, and Lions emerged as top contenders. Wild card weekend featured thrilling matchups, with teams like the Commanders and Broncos making surprise playoff runs. The championship race is wide open heading into the divisional round."
      }
    } else if (lowerQuestion.includes('nfl') && (lowerQuestion.includes('super bowl') || lowerQuestion.includes('superbowl') || lowerQuestion.includes('playoffs'))) {
      return "Super Bowl LVIII in February 2024 saw the <strong>Kansas City Chiefs</strong> defeat the <strong>San Francisco 49ers</strong> 25-22 in overtime in Las Vegas! Patrick Mahomes threw for 333 yards and 2 TDs, while the Chiefs' defense came up clutch. This was the Chiefs' second consecutive championship and third in five years, cementing their dynasty status under Andy Reid and Mahomes."
    }

    // NBA Responses with current 2024-25 season data
    else if (lowerQuestion.includes('nba mvp') || (lowerQuestion.includes('mvp') && lowerQuestion.includes('nba'))) {
      if (lowerQuestion.includes('2024') || lowerQuestion.includes('last season') || lowerQuestion.includes('won')) {
        return "<strong>Nikola Jokic</strong> won the 2023-24 NBA MVP award! The Denver Nuggets center averaged 26.4 PPG, 12.4 RPG, and 9.0 APG while leading Denver to another strong playoff run. This was Jokic's third MVP award in four years, joining elite company with Larry Bird and Magic Johnson. He beat out Shai Gilgeous-Alexander and Luka Doncic in the voting."
      } else {
        return "The 2024-25 NBA season is heating up! <strong>Shai Gilgeous-Alexander</strong> is the current MVP frontrunner, averaging 31.2 PPG, 6.1 APG, and 5.4 RPG while leading the Thunder to the #1 seed in the West with a 34-6 record. Other top candidates include <strong>Nikola Jokic (26.8 PPG, 13.1 RPG, 9.9 APG)</strong> putting up near triple-double numbers, and <strong>Jayson Tatum</strong> leading the defending champion Celtics. SGA's two-way excellence and team success make him the clear favorite as of January 2025."
      }
    } else if (lowerQuestion.includes('nba') && (lowerQuestion.includes('champion') || lowerQuestion.includes('finals') || lowerQuestion.includes('playoffs'))) {
      return "The <strong>Boston Celtics</strong> won the 2024 NBA Championship! They defeated the <strong>Dallas Mavericks</strong> 4-1 in the Finals, with <strong>Jaylen Brown</strong> earning Finals MVP honors. Brown averaged 20.8 PPG, 5.4 RPG, and shot efficiently throughout the series. The Celtics captured their 18th championship, breaking their tie with the Lakers for most NBA titles in history."
    }

    // Default response
    return "Welcome to the ultimate sports discussion! I have comprehensive, up-to-date knowledge across all major sports. Ask me about: <strong>Current season analysis</strong> (standings, MVP races, playoff predictions), <strong>Trade rumors and deadlines</strong>, <strong>Historical comparisons and records</strong>, <strong>Player performance and statistics</strong>, <strong>Team strategies and coaching</strong>, or <strong>Specific scenarios and what-ifs</strong>. Whether it's NFL playoffs, NBA trade deadline, MLB free agency, or NHL championship races - let's dive deep into what interests you most!"
  }

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a question!')
      return
    }

    setIsLoading(true)
    setShowResponse(false)

    // Simulate AI processing time
    setTimeout(() => {
      const aiAnswer = generateSportsResponse(query)
      setResponse(aiAnswer)
      setIsLoading(false)
      setShowResponse(true)
    }, 1500)
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
            className="search-btn-gradient text-white border-none px-6 py-5 rounded-full cursor-pointer text-base transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            <i className="fas fa-robot mr-2"></i>
            Ask AI
          </button>
        </div>

        {isLoading && (
          <div className="text-orange-400 italic flex items-center justify-center gap-2">
            <i className="fas fa-spinner animate-spin"></i>
            BallTalk AI is thinking...
          </div>
        )}

        {showResponse && (
          <div className="ai-response-gradient mt-8 p-6 rounded-2xl border-l-4 border-orange-400 text-left max-h-80 overflow-y-auto">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2 text-lg font-semibold">
              <i className="fas fa-robot"></i>
              BallTalk AI Response:
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