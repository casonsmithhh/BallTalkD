'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function NFLPage() {
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
      title: "MVP Race 2024",
      description: "Josh Allen leads with 4,306 passing yards and 40 total TDs, leading Buffalo to #2 AFC seed.",
      image: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png"
    },
    {
      title: "Playoff Picture",
      description: "Bills, Ravens, Chiefs, and Lions emerge as top contenders heading into divisional round.",
      image: "https://static.www.nfl.com/image/private/t_new_photo_album/league/fvjfzllenfkmfj8hpe8s"
    },
    {
      title: "Rookie Watch",
      description: "Caleb Williams and Jayden Daniels showing promise in their development as rookie QBs.",
      image: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png"
    },
    {
      title: "Trade Deadline Impact",
      description: "Recent moves by contenders shaping the playoff landscape and championship odds.",
      image: "https://static.www.nfl.com/image/private/t_new_photo_album/league/o8p5vfx7ew2ipgf8y41e"
    }
  ]

  const currentNews = [
    {
      title: "Bills Clinch AFC East",
      description: "Buffalo secures division title with Josh Allen's MVP-caliber season performance.",
      source: "ESPN NFL"
    },
    {
      title: "Chiefs Dynasty Continues",
      description: "Kansas City remains playoff favorite after back-to-back Super Bowl victories.",
      source: "NFL Network"
    },
    {
      title: "Lions Roar in NFC",
      description: "Detroit emerges as legitimate Super Bowl contender with explosive offense.",
      source: "The Athletic"
    },
    {
      title: "Rookie QB Development",
      description: "Williams, Daniels, and Maye showing different trajectories in year one.",
      source: "Pro Football Focus"
    }
  ]

  const divisions = {
    afc: {
      east: [
        { name: "Bills", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png", record: "13-3" },
        { name: "Dolphins", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png", record: "8-8" },
        { name: "Jets", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png", record: "7-9" },
        { name: "Patriots", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png", record: "4-12" }
      ],
      north: [
        { name: "Ravens", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png", record: "12-4" },
        { name: "Steelers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png", record: "10-6" },
        { name: "Bengals", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png", record: "9-7" },
        { name: "Browns", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png", record: "3-13" }
      ],
      south: [
        { name: "Texans", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png", record: "10-6" },
        { name: "Colts", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png", record: "8-8" },
        { name: "Jaguars", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png", record: "4-12" },
        { name: "Titans", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png", record: "3-13" }
      ],
      west: [
        { name: "Chiefs", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png", record: "15-1" },
        { name: "Chargers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png", record: "11-5" },
        { name: "Broncos", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/den.png", record: "9-7" },
        { name: "Raiders", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png", record: "4-12" }
      ]
    },
    nfc: {
      east: [
        { name: "Eagles", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png", record: "13-3" },
        { name: "Commanders", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png", record: "11-5" },
        { name: "Cowboys", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png", record: "7-9" },
        { name: "Giants", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png", record: "3-13" }
      ],
      north: [
        { name: "Lions", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png", record: "14-2" },
        { name: "Vikings", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/min.png", record: "13-3" },
        { name: "Packers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png", record: "11-5" },
        { name: "Bears", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png", record: "4-12" }
      ],
      south: [
        { name: "Buccaneers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png", record: "9-7" },
        { name: "Falcons", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png", record: "8-8" },
        { name: "Saints", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/no.png", record: "5-11" },
        { name: "Panthers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/car.png", record: "4-12" }
      ],
      west: [
        { name: "Rams", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png", record: "10-6" },
        { name: "Seahawks", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png", record: "9-7" },
        { name: "Cardinals", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png", record: "8-8" },
        { name: "49ers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png", record: "6-10" }
      ]
    }
  }

  const trendingPlayers = {
    up: [
      { name: "Josh Allen", team: "Buffalo Bills", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png" },
      { name: "Jared Goff", team: "Detroit Lions", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png" }
    ],
    down: [
      { name: "Dak Prescott", team: "Dallas Cowboys", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png" },
      { name: "Aaron Rodgers", team: "New York Jets", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png" }
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">🏈 NFL Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, standings, and analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot NFL Topics</h2>
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

            {/* NFL Teams by Division */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏈 NFL Standings</h2>
              
              {/* AFC */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">AFC</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(divisions.afc).map(([divisionName, teams]) => (
                    <div key={divisionName} className="bg-white rounded-lg shadow-md p-4">
                      <h4 className="text-lg font-semibold mb-3 text-center capitalize text-red-600">
                        AFC {divisionName}
                      </h4>
                      <div className="space-y-2">
                        {teams.map((team, index) => (
                          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div className="flex items-center">
                              <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mr-3" />
                              <span className="font-medium">{team.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">{team.record}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NFC */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">NFC</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(divisions.nfc).map(([divisionName, teams]) => (
                    <div key={divisionName} className="bg-white rounded-lg shadow-md p-4">
                      <h4 className="text-lg font-semibold mb-3 text-center capitalize text-blue-600">
                        NFC {divisionName}
                      </h4>
                      <div className="space-y-2">
                        {teams.map((team, index) => (
                          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div className="flex items-center">
                              <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mr-3" />
                              <span className="font-medium">{team.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">{team.record}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest NFL News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://static.www.nfl.com/image/private/t_new_photo_album/league/nfl-logo-shield" 
                      alt="NFL News" 
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