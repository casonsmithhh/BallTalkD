'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function F1Page() {
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
      title: "2025 Season Preview",
      description: "New regulations, driver changes, and championship predictions for the upcoming season.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Max vs. The Field",
      description: "Can anyone challenge Verstappen's dominance in the new season?",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Driver Market Moves",
      description: "Major driver transfers and contract extensions shaping the grid.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Technical Innovations",
      description: "New car designs and aerodynamic developments for 2025.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    }
  ]

  const currentNews = [
    {
      title: "Pre-Season Testing Begins",
      description: "Teams hit the track for crucial testing ahead of the 2025 season opener.",
      source: "Formula1.com"
    },
    {
      title: "Hamilton's Ferrari Debut",
      description: "Seven-time champion begins new chapter with the Scuderia.",
      source: "ESPN F1"
    },
    {
      title: "Red Bull's Title Defense",
      description: "Verstappen and Red Bull look to extend their championship streak.",
      source: "Sky Sports F1"
    },
    {
      title: "Rookie Sensations",
      description: "New drivers making their F1 debuts in 2025.",
      source: "Motorsport.com"
    }
  ]

  const standings = {
    drivers: [
      { name: "Max Verstappen", team: "Red Bull Racing", points: "575", flag: "🇳🇱" },
      { name: "Lando Norris", team: "McLaren", points: "356", flag: "🇬🇧" },
      { name: "Charles Leclerc", team: "Ferrari", points: "308", flag: "🇲🇨" },
      { name: "Oscar Piastri", team: "McLaren", points: "292", flag: "🇦🇺" },
      { name: "Carlos Sainz", team: "Ferrari", points: "244", flag: "🇪🇸" },
      { name: "George Russell", team: "Mercedes", points: "192", flag: "🇬🇧" },
      { name: "Lewis Hamilton", team: "Mercedes", points: "190", flag: "🇬🇧" },
      { name: "Sergio Perez", team: "Red Bull Racing", points: "152", flag: "🇲🇽" }
    ],
    constructors: [
      { name: "Red Bull Racing", points: "727", color: "bg-blue-600" },
      { name: "McLaren", points: "648", color: "bg-orange-500" },
      { name: "Ferrari", points: "552", color: "bg-red-600" },
      { name: "Mercedes", points: "382", color: "bg-gray-600" },
      { name: "Aston Martin", points: "86", color: "bg-green-600" },
      { name: "Alpine", points: "65", color: "bg-pink-500" },
      { name: "Haas", points: "58", color: "bg-gray-400" },
      { name: "RB", points: "46", color: "bg-blue-400" }
    ]
  }

  const upcomingRaces = [
    {
      name: "Bahrain Grand Prix",
      date: "March 2, 2025",
      location: "Sakhir, Bahrain",
      circuit: "Bahrain International Circuit"
    },
    {
      name: "Saudi Arabian Grand Prix",
      date: "March 9, 2025",
      location: "Jeddah, Saudi Arabia",
      circuit: "Jeddah Corniche Circuit"
    },
    {
      name: "Australian Grand Prix",
      date: "March 16, 2025",
      location: "Melbourne, Australia",
      circuit: "Albert Park Circuit"
    },
    {
      name: "Japanese Grand Prix",
      date: "March 23, 2025",
      location: "Suzuka, Japan",
      circuit: "Suzuka International Racing Course"
    }
  ]

  const trendingDrivers = {
    up: [
      { name: "Lando Norris", team: "McLaren", flag: "🇬🇧" },
      { name: "Oscar Piastri", team: "McLaren", flag: "🇦🇺" }
    ],
    down: [
      { name: "Sergio Perez", team: "Red Bull Racing", flag: "🇲🇽" },
      { name: "Daniel Ricciardo", team: "Free Agent", flag: "🇦🇺" }
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">🏎️ Formula 1 Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, standings, and race updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot F1 Topics</h2>
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

            {/* Championship Standings */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏆 2024 Championship Standings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Drivers Championship */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">Drivers Championship</h3>
                  <div className="space-y-3">
                    {standings.drivers.map((driver, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <span className="text-lg mx-3">{driver.flag}</span>
                          <div>
                            <span className="font-medium">{driver.name}</span>
                            <span className="text-sm text-gray-500 block">{driver.team}</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{driver.points}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Constructors Championship */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">Constructors Championship</h3>
                  <div className="space-y-3">
                    {standings.constructors.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <div className={`w-4 h-4 rounded mx-3 ${team.color}`}></div>
                          <span className="font-medium">{team.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{team.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Upcoming Races */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏁 2025 Race Calendar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingRaces.map((race, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{race.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Date:</strong> {race.date}</p>
                      <p><strong>Location:</strong> {race.location}</p>
                      <p><strong>Circuit:</strong> {race.circuit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest F1 News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                      alt="F1 News" 
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
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-900">📈 Driver Trends</h3>
              
              {/* Trending Up */}
              <div className="mb-6">
                <h4 className="text-green-600 font-semibold mb-3 flex items-center">
                  <i className="fas fa-arrow-up mr-2"></i>
                  Trending Up
                </h4>
                {trendingDrivers.up.map((driver, index) => (
                  <div key={index} className="flex items-center p-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-lg mr-3">{driver.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{driver.name}</div>
                      <div className="text-xs text-gray-500">{driver.team}</div>
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
                {trendingDrivers.down.map((driver, index) => (
                  <div key={index} className="flex items-center p-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-lg mr-3">{driver.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{driver.name}</div>
                      <div className="text-xs text-gray-500">{driver.team}</div>
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