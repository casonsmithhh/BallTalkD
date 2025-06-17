'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function CardinalsPage() {
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
      title: "Cardinals Sign Key Free Agent",
      summary: "Arizona makes significant move to bolster their roster for 2025 season.",
      timestamp: "2 hours ago",
      category: "Signings"
    },
    {
      title: "Kyler Murray's Offseason Progress",
      summary: "QB showing improved leadership and arm strength in OTAs.",
      timestamp: "5 hours ago",
      category: "Player Development"
    },
    {
      title: "Draft Analysis: Cardinals' 2025 Class",
      summary: "Breaking down Arizona's draft picks and their potential impact.",
      timestamp: "1 day ago",
      category: "Draft"
    }
  ]

  const trendingTopics = [
    { title: "Murray's Contract Extension", replies: 234, trend: "up" },
    { title: "Defense Improvements", replies: 189, trend: "hot" },
    { title: "Coaching Staff Changes", replies: 156, trend: "up" }
  ]

  const playerUpdates = [
    {
      name: "Kyler Murray",
      position: "QB",
      status: "Healthy",
      update: "Leading team in OTAs with improved pocket presence",
      trend: "up"
    },
    {
      name: "Marvin Harrison Jr.",
      position: "WR",
      status: "Healthy", 
      update: "Building chemistry with Murray in practice",
      trend: "up"
    },
    {
      name: "Budda Baker",
      position: "S",
      status: "Healthy",
      update: "Mentoring young defensive backs",
      trend: "stable"
    }
  ]

  const tradeRumors = [
    {
      player: "Trade Target: Edge Rusher",
      likelihood: "Medium",
      source: "ESPN",
      details: "Cardinals exploring options to improve pass rush"
    },
    {
      player: "Potential Departure: Veteran LB",
      likelihood: "Low",
      source: "The Athletic",
      details: "Contract restructuring more likely than trade"
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
      <div className="bg-red-600 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://a.espncdn.com/i/teamlogos/nfl/500/ari.png"
                alt="Arizona Cardinals"
                className="w-20 h-20 mr-4"
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Arizona Cardinals Fan Hub
                </h1>
                <p className="text-red-100">
                  Connect with Red Sea Rising • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                NFL
              </span>
              <span className="bg-yellow-400 text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                NFC West
              </span>
              <span className="bg-white text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                4-12 Record
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
                    ? 'border-red-500 text-red-600'
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
                <h2 className="text-2xl font-bold mb-6 text-red-600">📰 Latest Cardinals News</h2>
                <div className="space-y-4">
                  {teamNews.map((news, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{news.title}</h3>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
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
                <h2 className="text-2xl font-bold mb-6 text-red-600">🔥 Trending Topics</h2>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`text-lg ${
                          topic.trend === 'hot' ? '🔥' : 
                          topic.trend === 'up' ? '📈' : '📊'
                        }`}>
                          {topic.trend === 'hot' ? '🔥' : 
                           topic.trend === 'up' ? '📈' : '📊'}
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
                <h2 className="text-2xl font-bold mb-6 text-red-600">🔄 Trade News & Rumors</h2>
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
                <h3 className="text-lg font-semibold mb-4 text-red-600">📊 Team Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">4-12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division:</span>
                    <span className="font-semibold">4th NFC West</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points For:</span>
                    <span className="font-semibold">298</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points Against:</span>
                    <span className="font-semibold">365</span>
                  </div>
                </div>
              </div>

              {/* Player Updates */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600">⭐ Player Updates</h3>
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
                          player.trend === 'down' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {player.trend === 'up' ? '📈' : player.trend === 'down' ? '📉' : '➡️'}
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
                <h3 className="text-lg font-semibold mb-4 text-red-600">👥 Red Sea Rising</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">3,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discussions:</span>
                    <span className="font-semibold">1,134</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">289</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-red-600">📰 Cardinals News Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamNews.concat([
                {
                  title: "Rookie Camp Standouts",
                  summary: "Several rookies making strong impressions in early practices.",
                  timestamp: "3 hours ago",
                  category: "Training Camp"
                },
                {
                  title: "Injury Report Update",
                  summary: "Latest updates on player health heading into season.",
                  timestamp: "6 hours ago",
                  category: "Injuries"
                }
              ]).map((news, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">{news.timestamp}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                  <p className="text-gray-600">{news.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <DiscussionForum sport="nfl" team="Arizona Cardinals" />
        )}

        {activeTab === 'qa' && (
          <QAComponent sport="nfl" team="Arizona Cardinals" />
        )}

        {activeTab === 'quizzes' && (
          <QuizComponent sport="nfl" team="Arizona Cardinals" />
        )}

        {activeTab === 'chat' && (
          <LiveChat sport="nfl" team="Arizona Cardinals" />
        )}

        {activeTab === 'reputation' && currentUser && (
          <ReputationSystem userId={currentUser.id} sport="nfl" team="Arizona Cardinals" />
        )}
      </div>

      <Footer />
    </div>
  )
}