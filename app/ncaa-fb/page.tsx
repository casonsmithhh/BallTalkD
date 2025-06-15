'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function NCAAFBPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)

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

  const hotTopics = [
    {
      title: "College Football Playoff",
      description: "12-team playoff format creates new excitement and opportunities for more schools.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Transfer Portal Impact",
      description: "How the transfer portal continues to reshape college football rosters.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "NIL Developments",
      description: "Name, Image, Likeness deals changing the landscape of college athletics.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Conference Realignment",
      description: "Major conference moves continue to reshape college football geography.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    }
  ]

  const currentNews = [
    {
      title: "National Championship Recap",
      description: "Michigan defeats Washington 34-13 to claim the 2024 College Football National Championship.",
      source: "ESPN College Football"
    },
    {
      title: "Spring Practice Updates",
      description: "Teams across the country begin spring practice with new coaches and players.",
      source: "The Athletic"
    },
    {
      title: "Recruiting Class Rankings",
      description: "2025 recruiting class takes shape with early commitments and official visits.",
      source: "247Sports"
    },
    {
      title: "Heisman Trophy Watch",
      description: "Early favorites emerge for the 2024 Heisman Trophy race.",
      source: "College Football News"
    }
  ]

  const conferences = [
    {
      name: "SEC",
      teams: [
        { name: "Georgia", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "13-1" },
        { name: "Alabama", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "12-2" },
        { name: "Texas", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "12-2" },
        { name: "LSU", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "10-4" }
      ]
    },
    {
      name: "Big Ten",
      teams: [
        { name: "Michigan", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "15-0" },
        { name: "Ohio State", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "11-2" },
        { name: "Penn State", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "10-3" },
        { name: "Iowa", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "10-4" }
      ]
    },
    {
      name: "Big 12",
      teams: [
        { name: "Texas", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "12-2" },
        { name: "Oklahoma State", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "10-4" },
        { name: "Kansas State", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "9-4" },
        { name: "Oklahoma", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "10-3" }
      ]
    },
    {
      name: "ACC",
      teams: [
        { name: "Florida State", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "13-1" },
        { name: "Clemson", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "9-4" },
        { name: "North Carolina", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "9-4" },
        { name: "Miami", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "7-6" }
      ]
    }
  ]

  const trendingPlayers = {
    up: [
      { name: "Caleb Williams", team: "USC Trojans", position: "QB" },
      { name: "Marvin Harrison Jr.", team: "Ohio State", position: "WR" }
    ],
    down: [
      { name: "Bo Nix", team: "Oregon Ducks", position: "QB" },
      { name: "Michael Penix Jr.", team: "Washington", position: "QB" }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <div className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">🏈 NCAA Football Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, rankings, and college football updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot NCAA Football Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotTopics.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <img src={topic.image} alt={topic.title} className="w-12 h-12 object-contain mr-4" />
                      <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <Link href="#" className="text-orange-500 font-medium hover:text-orange-600">
                      Join Discussion →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Conference Standings */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏈 Conference Leaders</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {conferences.map((conference, confIndex) => (
                  <div key={confIndex} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">{conference.name}</h3>
                    <div className="space-y-3">
                      {conference.teams.map((team, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                            <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mx-3" />
                            <span className="font-medium">{team.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">{team.record}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest NCAA Football News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                      alt="NCAA Football News" 
                      className="w-full h-32 object-contain bg-gray-100"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 text-gray-900">{article.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                      <p className="text-xs text-orange-500 font-medium">{article.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-900">📈 Player Trends</h3>
              
              {/* Trending Up */}
              <div className="mb-6">
                <h4 className="text-green-600 font-semibold mb-3 flex items-center">
                  <i className="fas fa-arrow-up mr-2"></i>
                  Trending Up
                </h4>
                {trendingPlayers.up.map((player, index) => (
                  <div key={index} className="flex items-center p-2 border-b border-gray-100 last:border-b-0">
                    <img src="https://cdn-icons-png.flaticon.com/512/53/53283.png" alt={player.team} className="w-8 h-8 object-contain mr-3" />
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.team} - {player.position}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trending Down */}
              <div>
                <h4 className="text-red-600 font-semibold mb-3 flex items-center">
                  <i className="fas fa-arrow-down mr-2"></i>
                  Trending Down
                </h4>
                {trendingPlayers.down.map((player, index) => (
                  <div key={index} className="flex items-center p-2 border-b border-gray-100 last:border-b-0">
                    <img src="https://cdn-icons-png.flaticon.com/512/53/53283.png" alt={player.team} className="w-8 h-8 object-contain mr-3" />
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.team} - {player.position}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}