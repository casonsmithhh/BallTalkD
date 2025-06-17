'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function CelticsPage() {
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
      title: "Celtics Eyeing Back-to-Back Championships",
      summary: "Boston looking to repeat as NBA champions with core intact.",
      timestamp: "30 minutes ago",
      category: "Championship"
    },
    {
      title: "Jayson Tatum's MVP Campaign",
      summary: "All-Star forward putting up career numbers in title defense.",
      timestamp: "2 hours ago",
      category: "MVP Race"
    },
    {
      title: "Trade Deadline Approach",
      summary: "Celtics exploring options to bolster bench depth.",
      timestamp: "5 hours ago",
      category: "Trade Rumors"
    }
  ]

  const trendingTopics = [
    { title: "Banner 19 Predictions", replies: 456, trend: "hot" },
    { title: "Tatum vs Jokic MVP Race", replies: 389, trend: "up" },
    { title: "Bench Depth Concerns", replies: 234, trend: "up" }
  ]

  const playerUpdates = [
    {
      name: "Jayson Tatum",
      position: "SF",
      status: "Healthy",
      update: "Leading MVP race with 28.4 PPG, 8.1 RPG, 5.6 APG",
      trend: "up"
    },
    {
      name: "Jaylen Brown",
      position: "SG",
      status: "Healthy",
      update: "Consistent All-Star level play as second option",
      trend: "stable"
    },
    {
      name: "Kristaps Porzingis",
      position: "C",
      status: "Healthy",
      update: "Providing elite rim protection and spacing",
      trend: "up"
    }
  ]

  const tradeRumors = [
    {
      player: "Bench Scorer Target",
      likelihood: "Medium",
      source: "ESPN",
      details: "Celtics looking for reliable sixth man option"
    },
    {
      player: "Backup Center Interest",
      likelihood: "Low",
      source: "The Athletic",
      details: "Exploring depth behind Porzingis and Horford"
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
      <div className="bg-green-600 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://a.espncdn.com/i/teamlogos/nba/500/bos.png"
                alt="Boston Celtics"
                className="w-20 h-20 mr-4"
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Boston Celtics Fan Hub
                </h1>
                <p className="text-green-100">
                  Connect with Celtics Nation • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                NBA
              </span>
              <span className="bg-yellow-400 text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                Defending Champions
              </span>
              <span className="bg-white text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                32-14 Record
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
                    ? 'border-green-500 text-green-600'
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
                <h2 className="text-2xl font-bold mb-6 text-green-600">📰 Latest Celtics News</h2>
                <div className="space-y-4">
                  {teamNews.map((news, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{news.title}</h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
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
                <h2 className="text-2xl font-bold mb-6 text-green-600">🔥 Trending Topics</h2>
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
                <h2 className="text-2xl font-bold mb-6 text-green-600">🔄 Trade News & Rumors</h2>
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
                <h3 className="text-lg font-semibold mb-4 text-green-600">📊 Team Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">32-14</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conference:</span>
                    <span className="font-semibold">1st Eastern</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PPG:</span>
                    <span className="font-semibold">118.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Opp PPG:</span>
                    <span className="font-semibold">109.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Championships:</span>
                    <span className="font-semibold">18 (2024)</span>
                  </div>
                </div>
              </div>

              {/* Player Updates */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-600">⭐ Player Updates</h3>
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
                <h3 className="text-lg font-semibold mb-4 text-green-600">👥 Celtics Nation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discussions:</span>
                    <span className="font-semibold">3,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">789</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <DiscussionForum sport="nba" team="Boston Celtics" />
        )}

        {activeTab === 'qa' && (
          <QAComponent sport="nba" team="Boston Celtics" />
        )}

        {activeTab === 'quizzes' && (
          <QuizComponent sport="nba" team="Boston Celtics" />
        )}

        {activeTab === 'chat' && (
          <LiveChat sport="nba" team="Boston Celtics" />
        )}

        {activeTab === 'reputation' && currentUser && (
          <ReputationSystem userId={currentUser.id} sport="nba" team="Boston Celtics" />
        )}
      </div>

      <Footer />
    </div>
  )
}