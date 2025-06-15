'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import DiscussionForum from '../../../components/DiscussionForum'
import QAComponent from '../../../components/QAComponent'
import QuizComponent from '../../../components/QuizComponent'
import LiveChat from '../../../components/LiveChat'
import ReputationSystem from '../../../components/ReputationSystem'

export default function PatriotsPage() {
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
      <div className="bg-blue-800 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/images/nfl-logos/patriots_logo.png"
                alt="New England Patriots"
                className="w-20 h-20 mr-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png'
                }}
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  New England Patriots Fan Hub
                </h1>
                <p className="text-blue-100">
                  Connect with Patriots Nation • Share insights • Build your reputation
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="bg-white text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                NFL
              </span>
              <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                AFC East
              </span>
              <span className="bg-white text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'discussions' && (
              <DiscussionForum sport="nfl" team="New England Patriots" />
            )}
            {activeTab === 'qa' && (
              <QAComponent sport="nfl" team="New England Patriots" />
            )}
            {activeTab === 'quizzes' && (
              <QuizComponent sport="nfl" team="New England Patriots" />
            )}
            {activeTab === 'chat' && (
              <LiveChat sport="nfl" team="New England Patriots" />
            )}
            {activeTab === 'reputation' && currentUser && (
              <ReputationSystem userId={currentUser.id} sport="nfl" team="New England Patriots" />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Team Stats Widget */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">🏆 Patriots Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Record:</span>
                    <span className="font-semibold">4-12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division:</span>
                    <span className="font-semibold">4th AFC East</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold">Rebuilding</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Super Bowls:</span>
                    <span className="font-semibold">6 (2001, 2003, 2004, 2014, 2016, 2018)</span>
                  </div>
                </div>
              </div>

              {/* Key Players */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">⭐ Key Players</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-medium">Drake Maye</div>
                      <div className="text-sm text-gray-600">QB</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                      38
                    </div>
                    <div>
                      <div className="font-medium">Rhamondre Stevenson</div>
                      <div className="text-sm text-gray-600">RB</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                      9
                    </div>
                    <div>
                      <div className="font-medium">Matthew Judon</div>
                      <div className="text-sm text-gray-600">LB</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">👥 Patriots Nation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Fans:</span>
                    <span className="font-semibold">9,847</span>
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

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">🔥 Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-blue-500 pl-3">
                    <div className="font-medium">Drake Maye Development</div>
                    <div className="text-gray-600">134 new comments</div>
                  </div>
                  <div className="border-l-2 border-red-500 pl-3">
                    <div className="font-medium">Rebuild Strategy</div>
                    <div className="text-gray-600">New analysis</div>
                  </div>
                  <div className="border-l-2 border-silver pl-3">
                    <div className="font-medium">Dynasty Quiz</div>
                    <div className="text-gray-600">Test your Pats knowledge</div>
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