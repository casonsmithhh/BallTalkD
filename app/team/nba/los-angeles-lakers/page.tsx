'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function LakersPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'discussions' | 'qa' | 'quizzes' | 'chat' | 'reputation'>('overview')

  useEffect(() => {
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('ballTalkUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('ballTalkUser')
  }

  const teamNews = [
    {
      title: "LeBron James Defying Father Time",
      summary: "King James continues elite play in Year 22, averaging 25+ PPG.",
      timestamp: "45 minutes ago",
      category: "Player Performance"
    },
    {
      title: "Anthony Davis Injury Update",
      summary: "AD expected to return from minor injury within week.",
      timestamp: "2 hours ago",
      category: "Injury Report"
    },
    {
      title: "Lakers Trade Deadline Strategy",
      summary: "Front office exploring moves to improve playoff positioning.",
      timestamp: "4 hours ago",
      category: "Trade Rumors"
    }
  ]

  const trendingTopics = [
    { title: "LeBron's Longevity Secrets", replies: 567, trend: "hot" },
    { title: "Playoff Push Strategy", replies: 423, trend: "up" },
    { title: "Young Core Development", replies: 298, trend: "up" }
  ]

  const playerUpdates = [
    {
      name: "LeBron James",
      position: "SF",
      status: "Healthy",
      update: "Averaging 25.2 PPG, 7.8 RPG, 8.1 APG at age 40",
      trend: "up"
    },
    {
      name: "Anthony Davis",
      position: "PF/C",
      status: "Day-to-Day",
      update: "Minor ankle sprain, expected back soon",
      trend: "stable"
    },
    {
      name: "Austin Reaves",
      position: "SG",
      status: "Healthy",
      update: "Emerging as reliable third option",
      trend: "up"
    }
  ]

  const tradeRumors = [
    {
      player: "Wing Defender Target",
      likelihood: "High",
      source: "ESPN",
      details: "Lakers prioritizing perimeter defense upgrade"
    },
    {
      player: "Backup Center Interest",
      likelihood: "Medium",
      source: "The Athletic",
      details: "Exploring depth behind Anthony Davis"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      {/* Team Header */}
      <div className="bg-purple-600 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://a.espncdn.com/i/teamlogos/nba/500/lal.png"
                alt="Los Angeles Lakers"
                className="w-20 h-20 mr-4"
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Los Angeles Lakers Fan Hub
                </h1>
                <p className="text-purple-100">
                  Connect with Laker Nation • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-purple-600 text-sm px-3 py-1 rounded-full font-semibold">
                NBA
              </span>
              <span className="bg-yellow-400 text-purple-600 text-sm px-3 py-1 rounded-full font-semibold">
                Western Conference
              </span>
              <span className="bg-white text-purple-600 text-sm px-3 py-1 rounded-full font-semibold">
                25-21 Record
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: '🏠 Overview' },
              { id: 'news', label: '📰 News' },
              { id: 'discussions', label: '💬 Discussions' },
              { id: 'qa', label: '❓ Q&A' },
              { id: 'quizzes', label: '🧠 Quizzes' },
              { id: 'chat', label: '🔴 Live Chat' },
              { id: 'reputation', label: '🏆 Reputation' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Latest News */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-purple-600">📰 Latest Lakers News</h2>
                <div className="space-y-4">
                  {teamNews.map((news, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{news.title}</h3>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {news.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{news.summary}</p>
                      <span className="text-sm text-gray-500">{news.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-purple-600">🔥 Trending Topics</h2>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {topic.trend === 'hot' ? '🔥' : '📈'}
                        </span>
                        <span className="font-medium">{topic.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">{topic.replies} replies</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trade News & Rumors */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-purple-600">🔄 Trade News & Rumors</h2>
                <div className="space-y-4">
                  {tradeRumors.map((rumor, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{rumor.player}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          rumor.likelihood === 'High' ? 'bg-red-100 text-red-800' :
                          rumor.likelihood === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rumor.likelihood} Likelihood
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{rumor.details}</p>
                      <span className="text-sm text-gray-500">Source: {rumor.source}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Team Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">📊 Team Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">25-21</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conference:</span>
                    <span className="font-semibold">6th Western</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PPG:</span>
                    <span className="font-semibold">115.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Opp PPG:</span>
                    <span className="font-semibold">114.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Championships:</span>
                    <span className="font-semibold">17 (2020)</span>
                  </div>
                </div>
              </div>

              {/* Player Updates */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">⭐ Player Updates</h3>
                <div className="space-y-4">
                  {playerUpdates.map((player, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="font-medium">{player.name}</span>
                          <span className="text-sm text-gray-500 ml-2">{player.position}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          player.trend === 'up' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {player.trend === 'up' ? '📈' : '➡️'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{player.update}</p>
                      <span className={`text-xs ${
                        player.status === 'Healthy' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {player.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">👥 Laker Nation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">18,947</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discussions:</span>
                    <span className="font-semibold">4,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">1,089</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <DiscussionForum sport="nba" team="Los Angeles Lakers" />
        )}

        {activeTab === 'qa' && (
          <QAComponent sport="nba" team="Los Angeles Lakers" />
        )}

        {activeTab === 'quizzes' && (
          <QuizComponent sport="nba" team="Los Angeles Lakers" />
        )}

        {activeTab === 'chat' && (
          <LiveChat sport="nba" team="Los Angeles Lakers" />
        )}

        {activeTab === 'reputation' && currentUser && (
          <ReputationSystem userId={currentUser.id} sport="nba" team="Los Angeles Lakers" />
        )}
      </div>

      <Footer />
    </div>
  )
}