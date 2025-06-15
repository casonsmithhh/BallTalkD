'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function SoccerPage() {
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
      title: "Champions League Drama",
      description: "Round of 16 matchups set with Real Madrid, Manchester City, and PSG leading favorites.",
      image: "https://logos-world.net/wp-content/uploads/2020/06/UEFA-Champions-League-Logo.png"
    },
    {
      title: "Premier League Title Race",
      description: "Liverpool, Arsenal, and Manchester City in tight battle for English crown.",
      image: "https://logos-world.net/wp-content/uploads/2020/06/Premier-League-Logo.png"
    },
    {
      title: "Transfer Window Buzz",
      description: "January window sees major moves as clubs prepare for final push.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "World Cup 2026 Prep",
      description: "Nations preparing for expanded 48-team tournament in USA, Canada, Mexico.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    }
  ]

  const currentNews = [
    {
      title: "Mbappe's Real Madrid Impact",
      description: "French superstar continues to adapt to life at Santiago Bernabeu.",
      source: "ESPN FC"
    },
    {
      title: "Premier League Mid-Season",
      description: "Title race heating up as Liverpool maintains slight edge over rivals.",
      source: "Sky Sports"
    },
    {
      title: "Champions League Knockouts",
      description: "Round of 16 draw sets up blockbuster matchups across Europe.",
      source: "UEFA.com"
    },
    {
      title: "USMNT Development",
      description: "Young American talents making waves in European leagues.",
      source: "The Athletic"
    }
  ]

  const leagues = [
    {
      name: "Premier League",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Premier-League-Logo.png",
      teams: [
        { name: "Liverpool", logo: "https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png", points: "45" },
        { name: "Arsenal", logo: "https://logos-world.net/wp-content/uploads/2020/06/Arsenal-Logo.png", points: "43" },
        { name: "Chelsea", logo: "https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.png", points: "40" },
        { name: "Man City", logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png", points: "38" }
      ]
    },
    {
      name: "La Liga",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/La-Liga-Logo.png",
      teams: [
        { name: "Real Madrid", logo: "https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png", points: "46" },
        { name: "Barcelona", logo: "https://logos-world.net/wp-content/uploads/2020/06/FC-Barcelona-Logo.png", points: "42" },
        { name: "Atletico Madrid", logo: "https://logos-world.net/wp-content/uploads/2020/06/Atletico-Madrid-Logo.png", points: "38" },
        { name: "Athletic Bilbao", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", points: "35" }
      ]
    },
    {
      name: "Serie A",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Serie-A-Logo.png",
      teams: [
        { name: "Napoli", logo: "https://logos-world.net/wp-content/uploads/2020/06/Napoli-Logo.png", points: "44" },
        { name: "Inter Milan", logo: "https://logos-world.net/wp-content/uploads/2020/06/Inter-Milan-Logo.png", points: "43" },
        { name: "Atalanta", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", points: "40" },
        { name: "Juventus", logo: "https://logos-world.net/wp-content/uploads/2020/06/Juventus-Logo.png", points: "37" }
      ]
    },
    {
      name: "Bundesliga",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Bundesliga-Logo.png",
      teams: [
        { name: "Bayern Munich", logo: "https://logos-world.net/wp-content/uploads/2020/06/Bayern-Munich-Logo.png", points: "42" },
        { name: "Bayer Leverkusen", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", points: "38" },
        { name: "Eintracht Frankfurt", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", points: "36" },
        { name: "RB Leipzig", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png", points: "34" }
      ]
    }
  ]

  const trendingPlayers = {
    up: [
      { name: "Kylian Mbappe", team: "Real Madrid", logo: "https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png" },
      { name: "Mohamed Salah", team: "Liverpool", logo: "https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" }
    ],
    down: [
      { name: "Neymar Jr", team: "Al-Hilal", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png" },
      { name: "Eden Hazard", team: "Retired", logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png" }
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">⚽ Soccer Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, standings, and analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot Soccer Topics</h2>
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

            {/* League Standings */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">⚽ Top European Leagues</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {leagues.map((league, leagueIndex) => (
                  <div key={leagueIndex} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-center mb-4">
                      <img src={league.logo} alt={league.name} className="w-8 h-8 object-contain mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">{league.name}</h3>
                    </div>
                    <div className="space-y-3">
                      {league.teams.map((team, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                            <img src={team.logo} alt={team.name} className="w-6 h-6 object-contain mx-3" />
                            <span className="font-medium text-sm">{team.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">{team.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest Soccer News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                      alt="Soccer News" 
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