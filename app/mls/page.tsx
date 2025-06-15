'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function MLSPage() {
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
      title: "Messi's MLS Impact",
      description: "Lionel Messi continues to transform Inter Miami and elevate MLS globally.",
      image: "https://a.espncdn.com/i/teamlogos/soccer/500/inter-miami-cf.png"
    },
    {
      title: "MLS Cup Playoffs",
      description: "Exciting playoff format continues to deliver thrilling knockout matches.",
      image: "https://a.espncdn.com/i/teamlogos/soccer/500/mls.png"
    },
    {
      title: "USMNT Rising Stars",
      description: "Young American talents making their mark in MLS before European moves.",
      image: "https://a.espncdn.com/i/teamlogos/soccer/500/mls.png"
    },
    {
      title: "Expansion Teams",
      description: "San Diego FC set to join MLS in 2025, continuing league's growth.",
      image: "https://a.espncdn.com/i/teamlogos/soccer/500/mls.png"
    }
  ]

  const currentNews = [
    {
      title: "Inter Miami's Championship Push",
      description: "Messi and Miami looking to capture their first MLS Cup title.",
      source: "MLS Soccer"
    },
    {
      title: "LAFC Dynasty Continues",
      description: "Los Angeles FC remains a powerhouse in the Western Conference.",
      source: "ESPN MLS"
    },
    {
      title: "Young Stars Emerging",
      description: "Next generation of American soccer talent developing in MLS.",
      source: "The Athletic"
    },
    {
      title: "Apple TV Partnership",
      description: "MLS Season Pass continues to grow viewership and global reach.",
      source: "Sports Business Journal"
    }
  ]

  const conferences = {
    eastern: [
      { name: "Inter Miami CF", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/inter-miami-cf.png", record: "22-4-8", city: "Inter Miami" },
      { name: "FC Cincinnati", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/fc-cincinnati.png", record: "19-8-7", city: "FC Cincinnati" },
      { name: "Columbus Crew", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/columbus-crew.png", record: "18-6-10", city: "Columbus" },
      { name: "Orlando City", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/orlando-city-sc.png", record: "15-11-8", city: "Orlando" },
      { name: "Charlotte FC", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/charlotte-fc.png", record: "14-11-9", city: "Charlotte" },
      { name: "New York City FC", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/new-york-city-fc.png", record: "14-13-7", city: "NYCFC" },
      { name: "Atlanta United", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/atlanta-united-fc.png", record: "12-12-10", city: "Atlanta" },
      { name: "DC United", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/dc-united.png", record: "10-14-10", city: "DC United" }
    ],
    western: [
      { name: "LAFC", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/los-angeles-fc.png", record: "19-8-7", city: "LAFC" },
      { name: "LA Galaxy", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/la-galaxy.png", record: "19-9-6", city: "LA Galaxy" },
      { name: "Real Salt Lake", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/real-salt-lake.png", record: "16-9-9", city: "Real Salt Lake" },
      { name: "Seattle Sounders", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/seattle-sounders-fc.png", record: "16-10-8", city: "Seattle" },
      { name: "Minnesota United", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/minnesota-united-fc.png", record: "15-11-8", city: "Minnesota" },
      { name: "Vancouver Whitecaps", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/vancouver-whitecaps-fc.png", record: "13-13-8", city: "Vancouver" },
      { name: "Portland Timbers", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/portland-timbers.png", record: "12-12-10", city: "Portland" },
      { name: "Colorado Rapids", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/colorado-rapids.png", record: "11-13-10", city: "Colorado" }
    ]
  }

  const trendingPlayers = {
    up: [
      { name: "Lionel Messi", team: "Inter Miami CF", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/inter-miami-cf.png" },
      { name: "Denis Bouanga", team: "LAFC", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/los-angeles-fc.png" }
    ],
    down: [
      { name: "Lorenzo Insigne", team: "Toronto FC", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/toronto-fc.png" },
      { name: "Sebastian Giovinco", team: "Free Agent", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/mls.png" }
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">⚽ MLS Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, standings, and analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot MLS Topics</h2>
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

            {/* MLS Standings */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">⚽ MLS Standings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Eastern Conference */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">Eastern Conference</h3>
                  <div className="space-y-3">
                    {conferences.eastern.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mx-3" />
                          <div>
                            <span className="font-medium text-sm">{team.city}</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{team.record}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Western Conference */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">Western Conference</h3>
                  <div className="space-y-3">
                    {conferences.western.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mx-3" />
                          <div>
                            <span className="font-medium text-sm">{team.city}</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{team.record}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest MLS News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://a.espncdn.com/i/teamlogos/soccer/500/mls.png" 
                      alt="MLS News" 
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
                    <img src={player.logo} alt={player.team} className="w-8 h-8 object-contain mr-3" />
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.team}</div>
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
                    <img src={player.logo} alt={player.team} className="w-8 h-8 object-contain mr-3" />
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.team}</div>
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