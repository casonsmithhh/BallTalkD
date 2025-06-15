'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function JetsPage() {
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
      <div className="bg-green-600 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/images/nfl-logos/jets_logo.png"
                alt="New York Jets"
                className="w-20 h-20 mr-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png'
                }}
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  New York Jets Fan Hub
                </h1>
                <p className="text-green-100">
                  Connect with Gang Green • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                NFL
              </span>
              <span className="bg-white text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                AFC East
              </span>
              <span className="bg-white text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                7-9 Record
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'discussions' && (
              <DiscussionForum sport="nfl" team="New York Jets" />
            )}
            {activeTab === 'qa' && (
              <QAComponent sport="nfl" team="New York Jets" />
            )}
            {activeTab === 'quizzes' && (
              <QuizComponent sport="nfl" team="New York Jets" />
            )}
            {activeTab === 'chat' && (
              <LiveChat sport="nfl" team="New York Jets" />
            )}
            {activeTab === 'reputation' && currentUser && (
              <ReputationSystem userId={currentUser.id} sport="nfl" team="New York Jets" />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Team Stats Widget */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-600">🏆 Jets Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">7-9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division:</span>
                    <span className="font-semibold">3rd AFC East</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold">Offseason</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Playoff:</span>
                    <span className="font-semibold">2010</span>
                  </div>
                </div>
              </div>

              {/* Key Players */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-600">⭐ Key Players</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      8
                    </div>
                    <div>
                      <div className="font-medium">Aaron Rodgers</div>
                      <div className="text-sm text-gray-600">QB</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      17
                    </div>
                    <div>
                      <div className="font-medium">Garrett Wilson</div>
                      <div className="text-sm text-gray-600">WR</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-medium">Ahmad Gardner</div>
                      <div className="text-sm text-gray-600">CB</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-600">👥 Gang Green</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">4,247</span>
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

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-600">🔥 Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-green-500 pl-3">
                    <div className="font-medium">Rodgers Recovery</div>
                    <div className="text-gray-600">45 new comments</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <div className="font-medium">Draft Strategy</div>
                    <div className="text-gray-600">New mock drafts</div>
                  </div>
                  <div className="border-l-2 border-orange-500 pl-3">
                    <div className="font-medium">Jets History Quiz</div>
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