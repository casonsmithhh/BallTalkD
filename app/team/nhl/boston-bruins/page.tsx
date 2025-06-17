'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function BruinsPage() {
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
      title: "Bruins Playoff Push Continues",
      summary: "Boston fighting for playoff positioning in competitive Eastern Conference.",
      timestamp: "2 hours ago",
      category: "Playoffs"
    },
    {
      title: "Pastrnak's Scoring Streak",
      summary: "Star winger extending point streak to 8 games with elite play.",
      timestamp: "4 hours ago",
      category: "Player Performance"
    },
    {
      title: "Trade Deadline Approach",
      summary: "Bruins evaluating roster needs as March deadline nears.",
      timestamp: "1 day ago",
      category: "Trade Rumors"
    }
  ]

  const trendingTopics = [
    { title: "Playoff Race Intensity", replies: 345, trend: "hot" },
    { title: "Pastrnak's Elite Season", replies: 267, trend: "up" },
    { title: "Goaltending Situation", replies: 198, trend: "up" }
  ]

  const playerUpdates = [
    {
      name: "David Pastrnak",
      position: "RW",
      status: "Healthy",
      update: "Leading team with 35 goals, 28 assists in 52 games",
      trend: "up"
    },
    {
      name: "Brad Marchand",
      position: "LW",
      status: "Healthy",
      update: "Veteran leadership driving playoff push",
      trend: "stable"
    },
    {
      name: "Jeremy Swayman",
      position: "G",
      status: "Healthy",
      update: "Solid goaltending with .915 save percentage",
      trend: "up"
    }
  ]

  const tradeRumors = [
    {
      player: "Depth Forward Target",
      likelihood: "Medium",
      source: "ESPN",
      details: "Bruins seeking bottom-six forward depth"
    },
    {
      player: "Defenseman Interest",
      likelihood: "Low",
      source: "The Athletic",
      details: "Exploring blue line depth options"
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
      <div className="bg-yellow-500 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://a.espncdn.com/i/teamlogos/nhl/500/bos.png"
                alt="Boston Bruins"
                className="w-20 h-20 mr-4"
              />
              <div>
                <h1 className="text-4xl font-bold text-black mb-2">
                  Boston Bruins Fan Hub
                </h1>
                <p className="text-yellow-900">
                  Connect with Bruins Nation • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-black text-yellow-500 text-sm px-3 py-1 rounded-full font-semibold">
                NHL
              </span>
              <span className="bg-black text-yellow-500 text-sm px-3 py-1 rounded-full font-semibold">
                Atlantic Division
              </span>
              <span className="bg-black text-yellow-500 text-sm px-3 py-1 rounded-full font-semibold">
                26-20-6 Record
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
                    ? 'border-yellow-500 text-yellow-600'
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
                <h2 className="text-2xl font-bold mb-6 text-yellow-600">📰 Latest Bruins News</h2>
                <div className="space-y-4">
                  {teamNews.map((news, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{news.title}</h3>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
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
                <h2 className="text-2xl font-bold mb-6 text-yellow-600">🔥 Trending Topics</h2>
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
                <h2 className="text-2xl font-bold mb-6 text-yellow-600">🔄 Trade News & Rumors</h2>
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
                <h3 className="text-lg font-semibold mb-4 text-yellow-600">📊 Team Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">26-20-6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division:</span>
                    <span className="font-semibold">4th Atlantic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goals For:</span>
                    <span className="font-semibold">168</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goals Against:</span>
                    <span className="font-semibold">159</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stanley Cups:</span>
                    <span className="font-semibold">6 (2011)</span>
                  </div>
                </div>
              </div>

              {/* Player Updates */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-600">⭐ Player Updates</h3>
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
                      <span className="text-xs text-green-600">{player.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-600">👥 Bruins Nation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">8,947</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discussions:</span>
                    <span className="font-semibold">2,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <DiscussionForum sport="nhl" team="Boston Bruins" />
        )}

        {activeTab === 'qa' && (
          <QAComponent sport="nhl" team="Boston Bruins" />
        )}

        {activeTab === 'quizzes' && (
          <QuizComponent sport="nhl" team="Boston Bruins" />
        )}

        {activeTab === 'chat' && (
          <LiveChat sport="nhl" team="Boston Bruins" />
        )}

        {activeTab === 'reputation' && currentUser && (
          <ReputationSystem userId={currentUser.id} sport="nhl" team="Boston Bruins" />
        )}
      </div>

      <Footer />
    </div>
  )
}