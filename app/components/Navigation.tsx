'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavigationProps {
  currentUser: any
  onLogin: (user: any) => void
  onLogout: () => void
}

export default function Navigation({ currentUser, onLogin, onLogout }: NavigationProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

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

  return (
    <nav className="flex justify-between items-center bg-gray-900 px-8 py-3 text-white">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-white hover:text-orange-400 font-bold transition-colors">
          Home
        </Link>
        <div 
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="text-white hover:text-orange-400 font-bold transition-colors flex items-center">
            Topics <i className="fas fa-caret-down ml-1"></i>
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
        <span className="text-3xl font-bold">BallTalk</span>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded text-black"
        />
        
        {currentUser ? (
          <div className="relative">
            <div className="flex items-center space-x-2">
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">{currentUser.username}</span>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="text-white hover:text-orange-400 transition-colors"
              >
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
            {showUserDropdown && (
              <div className="absolute right-0 top-full bg-white min-w-32 shadow-lg z-50 rounded-md overflow-hidden">
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
            <i className="fas fa-sign-in-alt text-lg"></i>
          </Link>
        )}
      </div>
    </nav>
  )
}