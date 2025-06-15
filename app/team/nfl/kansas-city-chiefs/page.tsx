'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function ChiefsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'discussions' | 'qa' | 'quizzes' | 'chat' | 'reputation'>('discussions')

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
                src="https://a.espncdn.com/i/teamlogos/nfl/500/kc.png"
                alt="Kansas City Chiefs"
                className="w-20 h-20 mr-4"
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Kansas City Chiefs Fan Hub
                </h1>
                <p className="text-red-100">
                  Connect with fellow Chiefs Kingdom • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                NFL
              </span>
              <span className="bg-yellow-400 text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                AFC West Champions
              </span>
              <span className="bg-white text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                15-1 Record
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
              { id: 'discussions', label: '💬 Discussions', icon: '💬' },
              { id: 'qa', label: '❓ Q&A', icon: '❓' },
              { id: 'quizzes', label: '🧠 Quizzes', icon: '🧠' },
              { id: 'chat', label: '🔴 Live Chat', icon: '🔴' },
              { id: 'reputation', label: '🏆 Reputation', icon: '🏆' }
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'discussions' && (
              <DiscussionForum sport="nfl" team="Kansas City Chiefs" />
            )}
            {activeTab === 'qa' && (
              <QAComponent sport="nfl" team="Kansas City Chiefs" />
            )}
            {activeTab === 'quizzes' && (
              <QuizComponent sport="nfl" team="Kansas City Chiefs" />
            )}
            {activeTab === 'chat' && (
              <LiveChat sport="nfl" team="Kansas City Chiefs" />
            )}
            {activeTab === 'reputation' && currentUser && (
              <ReputationSystem userId={currentUser.id} sport="nfl" team="Kansas City Chiefs" />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Team Stats Widget */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600">🏆 Chiefs Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">15-1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division:</span>
                    <span className="font-semibold">1st AFC West</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Game:</span>
                    <span className="font-semibold">Playoffs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Super Bowls:</span>
                    <span className="font-semibold">3 (2019, 2022, 2024)</span>
                  </div>
                </div>
              </div>

              {/* Key Players */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600">⭐ Key Players</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      15
                    </div>
                    <div>
                      <div className="font-medium">Patrick Mahomes</div>
                      <div className="text-sm text-gray-600">QB</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      87
                    </div>
                    <div>
                      <div className="font-medium">Travis Kelce</div>
                      <div className="text-sm text-gray-600">TE</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      95
                    </div>
                    <div>
                      <div className="font-medium">Chris Jones</div>
                      <div className="text-sm text-gray-600">DT</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600">👥 Chiefs Kingdom</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">8,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discussions:</span>
                    <span className="font-semibold">2,134</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">567</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600">🔥 Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-red-500 pl-3">
                    <div className="font-medium">Playoff Predictions</div>
                    <div className="text-gray-600">89 new comments</div>
                  </div>
                  <div className="border-l-2 border-yellow-500 pl-3">
                    <div className="font-medium">Mahomes MVP Talk</div>
                    <div className="text-gray-600">New expert analysis</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <div className="font-medium">Chiefs Quiz</div>
                    <div className="text-gray-600">Weekly team quiz live</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}