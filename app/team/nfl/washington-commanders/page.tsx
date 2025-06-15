'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function CommandersPage() {
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
      <div className="bg-yellow-600 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/images/nfl-logos/commanders_logo.png"
                alt="Washington Commanders"
                className="w-20 h-20 mr-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png'
                }}
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Washington Commanders Fan Hub
                </h1>
                <p className="text-yellow-100">
                  Connect with Commanders Nation • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-yellow-600 text-sm px-3 py-1 rounded-full font-semibold">
                NFL
              </span>
              <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                NFC East
              </span>
              <span className="bg-white text-yellow-600 text-sm px-3 py-1 rounded-full font-semibold">
                11-5 Record
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'discussions' && (
              <DiscussionForum sport="nfl" team="Washington Commanders" />
            )}
            {activeTab === 'qa' && (
              <QAComponent sport="nfl" team="Washington Commanders" />
            )}
            {activeTab === 'quizzes' && (
              <QuizComponent sport="nfl" team="Washington Commanders" />
            )}
            {activeTab === 'chat' && (
              <LiveChat sport="nfl" team="Washington Commanders" />
            )}
            {activeTab === 'reputation' && currentUser && (
              <ReputationSystem userId={currentUser.id} sport="nfl" team="Washington Commanders" />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Team Stats Widget */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-600">🏆 Commanders Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">11-5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division:</span>
                    <span className="font-semibold">2nd NFC East</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold">Playoffs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Super Bowls:</span>
                    <span className="font-semibold">3 (1982, 1987, 1991)</span>
                  </div>
                </div>
              </div>

              {/* Key Players */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-600">⭐ Key Players</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <div>
                      <div className="font-medium">Jayden Daniels</div>
                      <div className="text-sm text-gray-600">QB</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-medium">Terry McLaurin</div>
                      <div className="text-sm text-gray-600">WR</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                      94
                    </div>
                    <div>
                      <div className="font-medium">Daron Payne</div>
                      <div className="text-sm text-gray-600">DT</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-600">👥 Commanders Nation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">5,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discussions:</span>
                    <span className="font-semibold">1,534</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">367</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-600">🔥 Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-yellow-500 pl-3">
                    <div className="font-medium">Daniels Development</div>
                    <div className="text-gray-600">78 new comments</div>
                  </div>
                  <div className="border-l-2 border-red-500 pl-3">
                    <div className="font-medium">Playoff Hopes</div>
                    <div className="text-gray-600">New predictions</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <div className="font-medium">Team History Quiz</div>
                    <div className="text-gray-600">Test your knowledge</div>
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