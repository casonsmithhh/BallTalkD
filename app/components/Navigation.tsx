'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavigationProps {
  currentUser: any
  onLogin: (user: any) => void
  onLogout: () => void
}

export default function Navigation({ currentUser, onLogin, onLogout }: NavigationProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const sportsLinks = [
    { name: 'NBA', href: '/nba' },
    { name: 'NFL', href: '/nfl' },
    { name: 'NHL', href: '/nhl' },
    { name: 'MLB', href: '/mlb' },
    { name: 'MLS', href: '/mls' },
    { name: 'Soccer', href: '/soccer' },
    { name: 'Tennis', href: '/tennis' },
    { name: 'F1', href: '/f1' },
    { name: 'NCAA Football', href: '/ncaa-fb' },
    { name: 'NCAA Basketball', href: '/ncaa-bb' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleProfileClick = () => {
    if (currentUser) {
      router.push('/profile')
    }
    setShowUserDropdown(false)
  }

  const handleSettingsClick = () => {
    if (currentUser) {
      router.push('/settings')
    }
    setShowUserDropdown(false)
  }

  return (
    <nav className="flex justify-between items-center bg-gray-900 px-8 py-3 text-white">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-white hover:text-orange-400 font-bold transition-colors flex items-center">
          <i className="fas fa-home text-lg"></i>
        </Link>
        <div 
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="text-white hover:text-orange-400 font-bold transition-colors flex items-center">
            League <i className="fas fa-caret-down ml-1"></i>
          </button>
          {showDropdown && (
            <div className="absolute top-full left-0 bg-white min-w-56 shadow-lg z-50 rounded-md overflow-hidden">
              {sportsLinks.map((sport) => (
                <Link
                  key={sport.name}
                  href={sport.href}
                  className="block px-4 py-3 text-black hover:bg-gray-100 transition-colors"
                >
                  {sport.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-3xl font-bold hover:text-orange-400 transition-colors">
          BallTalk
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/feed" className="text-white hover:text-orange-400 font-bold transition-colors">
          Feed
        </Link>
        
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search teams, players, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 rounded-l text-black w-48 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-r transition-colors"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
        
        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="text-white hover:text-orange-400 transition-colors p-2"
              title="Profile"
            >
              <i className="fas fa-user text-lg"></i>
            </button>
            {showUserDropdown && (
              <div className="absolute right-0 top-full bg-white min-w-48 shadow-lg z-50 rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <img
                      src={currentUser.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-800 font-medium">{currentUser.username}</span>
                  </div>
                </div>
                <button
                  onClick={handleProfileClick}
                  className="block w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-user mr-2"></i>
                  Profile
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="block w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-cog mr-2"></i>
                  Settings
                </button>
                <button
                  onClick={onLogout}
                  className="block w-full px-4 py-3 text-left text-red-600 hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth"
            className="text-white hover:text-orange-400 transition-colors p-2"
            title="Sign In"
          >
            <i className="fas fa-user text-lg"></i>
          </Link>
        )}
      </div>
    </nav>
  )
}