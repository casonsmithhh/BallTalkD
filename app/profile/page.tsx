'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    } else {
      router.push('/auth')
    }
    setIsLoading(false)
  }, [router])

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('ballTalkUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('ballTalkUser')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation 
          currentUser={currentUser} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
        />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentUser.username}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {currentUser.reputation} Reputation
                </span>
                {currentUser.verified && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Activity Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts:</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments:</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upvotes Received:</span>
                  <span className="font-semibold">234</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Favorite Teams</h3>
              <div className="space-y-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Lakers
                </span>
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Chiefs
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Badges</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🏆</span>
                  <span className="text-sm">First Post</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💬</span>
                  <span className="text-sm">Active Commenter</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium">Commented on "NBA Finals Predictions"</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium">Created post "Trade Deadline Analysis"</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-medium">Earned "Active Commenter" badge</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}