'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function NCAABBPage() {
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
      title: "March Madness 2025",
      description: "68-team tournament bracket predictions and Cinderella story potential.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Blue Blood Rivalries",
      description: "Duke, UNC, Kentucky, and Kansas continue their historic rivalries.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Transfer Portal Impact",
      description: "How player movement is reshaping college basketball rosters.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "One-and-Done Era",
      description: "Top recruits preparing for NBA Draft after one college season.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    }
  ]

  const currentNews = [
    {
      title: "UConn Repeats as Champions",
      description: "Huskies capture back-to-back national championships with dominant tournament run.",
      source: "ESPN College Basketball"
    },
    {
      title: "Conference Tournament Week",
      description: "Automatic bids on the line as conference tournaments determine March Madness field.",
      source: "CBS Sports"
    },
    {
      title: "Player of the Year Race",
      description: "Top candidates emerge for Naismith Player of the Year award.",
      source: "The Athletic"
    },
    {
      title: "Coaching Carousel",
      description: "Major coaching changes across Division I basketball programs.",
      source: "Stadium"
    }
  ]

  const conferences = [
    {
      name: "ACC",
      teams: [
        { name: "Duke", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "24-7" },
        { name: "North Carolina", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "23-8" },
        { name: "Virginia", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "22-9" },
        { name: "Wake Forest", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "21-10" }
      ]
    },
    {
      name: "Big East",
      teams: [
        { name: "UConn", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "28-3" },
        { name: "Marquette", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "25-6" },
        { name: "Villanova", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "22-9" },
        { name: "Creighton", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "21-10" }
      ]
    },
    {
      name: "Big Ten",
      teams: [
        { name: "Purdue", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "26-5" },
        { name: "Illinois", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "24-7" },
        { name: "Michigan State", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "23-8" },
        { name: "Wisconsin", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "22-9" }
      ]
    },
    {
      name: "SEC",
      teams: [
        { name: "Auburn", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "25-6" },
        { name: "Tennessee", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "24-7" },
        { name: "Kentucky", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "23-8" },
        { name: "Alabama", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", record: "22-9" }
      ]
    }
  ]

  const trendingPlayers = {
    up: [
      { name: "Zach Edey", team: "Purdue Boilermakers", position: "C" },
      { name: "Donovan Clingan", team: "UConn Huskies", position: "C" }
    ],
    down: [
      { name: "RJ Davis", team: "North Carolina", position: "G" },
      { name: "Tyler Kolek", team: "Marquette", position: "G" }
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">🏀 NCAA Basketball Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, rankings, and March Madness updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot NCAA Basketball Topics</h2>
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
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏀 Conference Leaders</h2>
              
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
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest NCAA Basketball News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                      alt="NCAA Basketball News" 
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