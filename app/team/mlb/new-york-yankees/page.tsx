'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function YankeesPage() {
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
      title: "Aaron Judge's Historic Pace Continues",
      summary: "Captain on track for another 60+ home run season with 32 before All-Star break.",
      timestamp: "1 hour ago",
      category: "Player Performance"
    },
    {
      title: "Yankees Rotation Concerns",
      summary: "Pitching staff dealing with injuries as trade deadline approaches.",
      timestamp: "3 hours ago",
      category: "Injury Report"
    },
    {
      title: "Bronx Bombers Trade Targets",
      summary: "Front office exploring starting pitcher options for playoff push.",
      timestamp: "6 hours ago",
      category: "Trade Rumors"
    }
  ]

  const trendingTopics = [
    { title: "Judge's 60 HR Chase", replies: 789, trend: "hot" },
    { title: "Pitching Staff Health", replies: 456, trend: "up" },
    { title: "AL East Race", replies: 334, trend: "up" }
  ]

  const playerUpdates = [
    {
      name: "Aaron Judge",
      position: "OF",
      status: "Healthy",
      update: "Leading AL with 32 HRs, 89 RBIs at All-Star break",
      trend: "up"
    },
    {
      name: "Gerrit Cole",
      position: "SP",
      status: "Healthy",
      update: "Ace pitcher anchoring rotation with 2.87 ERA",
      trend: "stable"
    },
    {
      name: "Gleyber Torres",
      position: "2B",
      status: "Healthy",
      update: "Bounce-back season with improved defense",
      trend: "up"
    }
  ]

  const tradeRumors = [
    {
      player: "Starting Pitcher Target",
      likelihood: "High",
      source: "ESPN",
      details: "Yankees aggressively pursuing rotation help"
    },
    {
      player: "Relief Pitcher Interest",
      likelihood: "Medium",
      source: "The Athletic",
      details: "Bullpen depth remains priority"
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
      <div className="bg-blue-800 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png"
                alt="New York Yankees"
                className="w-20 h-20 mr-4"
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  New York Yankees Fan Hub
                </h1>
                <p className="text-blue-100">
                  Connect with Yankees Universe • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                MLB
              </span>
              <span className="bg-yellow-400 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                AL East
              </span>
              <span className="bg-white text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                58-35 Record
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
                    ? 'border-blue-500 text-blue-600'
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
                <h2 className="text-2xl font-bold mb-6 text-blue-800">📰 Latest Yankees News</h2>
                <div className="space-y-4">
                  {teamNews.map((news, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{news.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
                <h2 className="text-2xl font-bold mb-6 text-blue-800">🔥 Trending Topics</h2>
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
                <h2 className="text-2xl font-bold mb-6 text-blue-800">🔄 Trade News & Rumors</h2>
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
                <h3 className="text-lg font-semibold mb-4 text-blue-800">📊 Team Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">58-35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division:</span>
                    <span className="font-semibold">2nd AL East</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Runs Scored:</span>
                    <span className="font-semibold">512</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Runs Allowed:</span>
                    <span className="font-semibold">398</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Championships:</span>
                    <span className="font-semibold">27 (2009)</span>
                  </div>
                </div>
              </div>

              {/* Player Updates */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">⭐ Player Updates</h3>
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
                <h3 className="text-lg font-semibold mb-4 text-blue-800">👥 Yankees Universe</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">15,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discussions:</span>
                    <span className="font-semibold">3,834</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">967</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <DiscussionForum sport="mlb" team="New York Yankees" />
        )}

        {activeTab === 'qa' && (
          <QAComponent sport="mlb" team="New York Yankees" />
        )}

        {activeTab === 'quizzes' && (
          <QuizComponent sport="mlb" team="New York Yankees" />
        )}

        {activeTab === 'chat' && (
          <LiveChat sport="mlb" team="New York Yankees" />
        )}

        {activeTab === 'reputation' && currentUser && (
          <ReputationSystem userId={currentUser.id} sport="mlb" team="New York Yankees" />
        )}
      </div>

      <Footer />
    </div>
  )
}