import Link from 'next/link'

export default function SportsGrid() {
  const sports = [
    {
      name: 'NBA',
      description: 'Trade talk, MVP debates, young stars and legendary moments.',
      href: '/nba',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/NBA-Logo.png',
      teams: ['Lakers', 'Warriors', 'Celtics', 'Heat'],
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
    },
    {
      name: 'NFL',
      description: 'Break down the draft, breakout rookies, and playoff races.',
      href: '/nfl',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/NFL-Logo.png',
      teams: ['Chiefs', 'Bills', 'Cowboys', 'Patriots'],
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop'
    },
    {
      name: 'NHL',
      description: 'Stanley Cup matchups, trade rumors, and power rankings.',
      href: '/nhl',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/NHL-Logo.png',
      teams: ['Rangers', 'Bruins', 'Penguins', 'Blackhawks'],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
    },
    {
      name: 'MLB',
      description: 'Pitching duels, power hitters, and divisional drama.',
      href: '/mlb',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/MLB-Logo.png',
      teams: ['Yankees', 'Dodgers', 'Red Sox', 'Giants'],
      image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=200&fit=crop'
    },
    {
      name: 'MLS',
      description: 'Postseason hopes, Messi-mania, and rising U.S. stars.',
      href: '/mls',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/MLS-Logo.png',
      teams: ['LAFC', 'Inter Miami', 'Seattle', 'Atlanta'],
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=200&fit=crop'
    },
    {
      name: 'Soccer',
      description: 'Global transfers, Champions League, World Cup debates.',
      href: '/soccer',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/UEFA-Champions-League-Logo.png',
      teams: ['Real Madrid', 'Barcelona', 'Man City', 'Liverpool'],
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=200&fit=crop'
    },
    {
      name: 'Tennis',
      description: 'Grand Slams, GOAT debates, and rising stars.',
      href: '/tennis',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/ATP-Logo.png',
      teams: ['ATP', 'WTA', 'Grand Slams', 'Rankings'],
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=200&fit=crop'
    },
    {
      name: 'Formula 1',
      description: 'Team dynamics, qualifying drama, and global circuits.',
      href: '/f1',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Formula-1-Logo.png',
      teams: ['Red Bull', 'Mercedes', 'Ferrari', 'McLaren'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop'
    },
    {
      name: 'NCAA Football',
      description: 'Heisman hopefuls, rivalries, and bowl projections.',
      href: '/ncaa-fb',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/NCAA-Logo.png',
      teams: ['Alabama', 'Georgia', 'Ohio State', 'Michigan'],
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop'
    },
    {
      name: 'NCAA Basketball',
      description: 'March Madness, blue bloods, and one-and-dones.',
      href: '/ncaa-bb',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/NCAA-Logo.png',
      teams: ['Duke', 'UNC', 'Kentucky', 'Kansas'],
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
    }
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Sports Community
          </h2>
          <p className="text-lg text-gray-600">
            Join passionate fans discussing the latest news, trades, and analysis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <div
              key={sport.name}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={sport.image}
                  alt={`${sport.name} Background`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute top-4 left-4">
                  <img
                    src={sport.logo}
                    alt={`${sport.name} Official Logo`}
                    className="w-12 h-12 rounded-lg bg-white p-2 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/48x48/cccccc/666666?text=' + sport.name.charAt(0)
                    }}
                  />
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{sport.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {sport.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {sport.teams.slice(0, 3).map(team => (
                    <span
                      key={team}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                    >
                      {team}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={sport.href}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group-hover:text-orange-500"
                >
                  Enter {sport.name} Hub
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}