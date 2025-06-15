'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function NBAPage() {
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
      title: "NBA Finals Game 6 Tonight",
      description: "Celtics lead series 3-2 and can capture back-to-back championships with victory at TD Garden.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop"
    },
    {
      title: "Jokic Wins Third MVP",
      description: "Denver center becomes ninth player in NBA history to win three MVP awards after historic season.",
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=200&fit=crop"
    },
    {
      title: "Cooper Flagg Declares for Draft",
      description: "Duke freshman phenom officially enters 2025 NBA Draft, projected to go first overall.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop"
    },
    {
      title: "Trade Deadline Buzz",
      description: "February 6th deadline approaching with several stars potentially on the move.",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=200&fit=crop"
    }
  ]

  const currentNews = [
    {
      title: "Celtics Look to Close Out Finals",
      description: "Boston leads series 3-2 and can capture back-to-back championships with victory at home.",
      source: "ESPN NBA"
    },
    {
      title: "Jokic's Historic MVP Season",
      description: "Denver center becomes ninth player in NBA history to win three MVP awards.",
      source: "The Athletic"
    },
    {
      title: "Draft Lottery Results",
      description: "Cooper Flagg expected to go first overall in upcoming 2025 NBA Draft.",
      source: "NBA.com"
    },
    {
      title: "Summer League Preview",
      description: "Rookies and young players set to showcase skills in Las Vegas this summer.",
      source: "Bleacher Report"
    }
  ]

  const conferences = {
    eastern: [
      { name: "Celtics", logo: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png", record: "32-14", city: "Boston" },
      { name: "Cavaliers", logo: "https://a.espncdn.com/i/teamlogos/nba/500/cle.png", record: "31-15", city: "Cleveland" },
      { name: "Knicks", logo: "https://a.espncdn.com/i/teamlogos/nba/500/ny.png", record: "29-17", city: "New York" },
      { name: "Magic", logo: "https://a.espncdn.com/i/teamlogos/nba/500/orl.png", record: "28-18", city: "Orlando" },
      { name: "Pacers", logo: "https://a.espncdn.com/i/teamlogos/nba/500/ind.png", record: "26-20", city: "Indiana" },
      { name: "Heat", logo: "https://a.espncdn.com/i/teamlogos/nba/500/mia.png", record: "24-22", city: "Miami" },
      { name: "76ers", logo: "https://a.espncdn.com/i/teamlogos/nba/500/phi.png", record: "23-23", city: "Philadelphia" },
      { name: "Bucks", logo: "https://a.espncdn.com/i/teamlogos/nba/500/mil.png", record: "22-24", city: "Milwaukee" }
    ],
    western: [
      { name: "Thunder", logo: "https://a.espncdn.com/i/teamlogos/nba/500/okc.png", record: "34-6", city: "Oklahoma City" },
      { name: "Grizzlies", logo: "https://a.espncdn.com/i/teamlogos/nba/500/mem.png", record: "30-16", city: "Memphis" },
      { name: "Rockets", logo: "https://a.espncdn.com/i/teamlogos/nba/500/hou.png", record: "28-18", city: "Houston" },
      { name: "Nuggets", logo: "https://a.espncdn.com/i/teamlogos/nba/500/den.png", record: "27-19", city: "Denver" },
      { name: "Mavericks", logo: "https://a.espncdn.com/i/teamlogos/nba/500/dal.png", record: "26-20", city: "Dallas" },
      { name: "Lakers", logo: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png", record: "25-21", city: "Los Angeles" },
      { name: "Clippers", logo: "https://a.espncdn.com/i/teamlogos/nba/500/lac.png", record: "24-22", city: "LA Clippers" },
      { name: "Warriors", logo: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png", record: "23-23", city: "Golden State" }
    ]
  }

  const trendingPlayers = {
    up: [
      { 
        name: "Jayson Tatum", 
        team: "Boston Celtics", 
        logo: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        position: "SF"
      },
      { 
        name: "Nikola Jokic", 
        team: "Denver Nuggets", 
        logo: "https://a.espncdn.com/i/teamlogos/nba/500/den.png",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        position: "C"
      }
    ],
    down: [
      { 
        name: "Giannis Antetokounmpo", 
        team: "Milwaukee Bucks", 
        logo: "https://a.espncdn.com/i/teamlogos/nba/500/mil.png",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        position: "PF"
      },
      { 
        name: "Stephen Curry", 
        team: "Golden State Warriors", 
        logo: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        position: "PG"
      }
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
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/06/NBA-Logo.png"
              alt="NBA Logo"
              className="w-16 h-16 mr-4"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">NBA Hub</h1>
              <p className="text-gray-600 mt-2">Latest news, standings, and analysis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot NBA Topics</h2>
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

            {/* NBA Standings */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏀 NBA Standings</h2>
              
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
                            <span className="font-medium">{team.city}</span>
                            <span className="text-sm text-gray-500 ml-1">{team.name}</span>
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
                            <span className="font-medium">{team.city}</span>
                            <span className="text-sm text-gray-500 ml-1">{team.name}</span>
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
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest NBA News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop" 
                      alt="NBA News" 
                      className="w-full h-32 object-cover"
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
                  <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded">
                    <img 
                      src={player.photo} 
                      alt={player.name} 
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.position} • {player.team}</div>
                    </div>
                    <img src={player.logo} alt={player.team} className="w-6 h-6 object-contain" />
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
                  <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded">
                    <img 
                      src={player.photo} 
                      alt={player.name} 
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.position} • {player.team}</div>
                    </div>
                    <img src={player.logo} alt={player.team} className="w-6 h-6 object-contain" />
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