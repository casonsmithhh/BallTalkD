import Link from 'next/link'

export default function SportsGrid() {
  const sports = [
    {
      name: 'NBA',
      description: 'Trade talk, MVP debates, young stars and legendary moments.',
      href: '/nba',
      logo: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg',
      teams: ['Lakers', 'Warriors', 'Celtics', 'Heat']
    },
    {
      name: 'NFL',
      description: 'Break down the draft, breakout rookies, and playoff races.',
      href: '/nfl',
      logo: 'https://static.www.nfl.com/image/private/t_new_photo_album/league/nfl-logo-shield',
      teams: ['Chiefs', 'Bills', 'Cowboys', 'Patriots']
    },
    {
      name: 'NHL',
      description: 'Stanley Cup matchups, trade rumors, and power rankings.',
      href: '/nhl',
      logo: 'https://assets.nhle.com/logos/nhl/svg/nhl_logo.svg',
      teams: ['Rangers', 'Bruins', 'Penguins', 'Blackhawks']
    },
    {
      name: 'MLB',
      description: 'Pitching duels, power hitters, and divisional drama.',
      href: '/mlb',
      logo: 'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg',
      teams: ['Yankees', 'Dodgers', 'Red Sox', 'Giants']
    },
    {
      name: 'MLS',
      description: 'Postseason hopes, Messi-mania, and rising U.S. stars.',
      href: '/mls',
      logo: 'https://images.mlssoccer.com/image/private/t_keep-aspect-ratio-e-mobile_3x/mls-logo-white.png',
      teams: ['LAFC', 'Inter Miami', 'Seattle', 'Atlanta']
    },
    {
      name: 'Soccer',
      description: 'Global transfers, Champions League, World Cup debates.',
      href: '/soccer',
      logo: 'https://cdn-icons-png.flaticon.com/512/53/53283.png',
      teams: ['Real Madrid', 'Barcelona', 'Man City', 'Liverpool']
    },
    {
      name: 'Tennis',
      description: 'Grand Slams, GOAT debates, and rising stars.',
      href: '/tennis',
      logo: 'https://cdn-icons-png.flaticon.com/512/53/53283.png',
      teams: ['ATP', 'WTA', 'Grand Slams', 'Rankings']
    },
    {
      name: 'Formula 1',
      description: 'Team dynamics, qualifying drama, and global circuits.',
      href: '/f1',
      logo: 'https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg',
      teams: ['Red Bull', 'Mercedes', 'Ferrari', 'McLaren']
    },
    {
      name: 'NCAA Football',
      description: 'Heisman hopefuls, rivalries, and bowl projections.',
      href: '/ncaa-fb',
      logo: 'https://cdn-icons-png.flaticon.com/512/53/53283.png',
      teams: ['Alabama', 'Georgia', 'Ohio State', 'Michigan']
    },
    {
      name: 'NCAA Basketball',
      description: 'March Madness, blue bloods, and one-and-dones.',
      href: '/ncaa-bb',
      logo: 'https://cdn-icons-png.flaticon.com/512/53/53283.png',
      teams: ['Duke', 'UNC', 'Kentucky', 'Kansas']
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
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <img
                      src={sport.logo}
                      alt={`${sport.name} Logo`}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://cdn-icons-png.flaticon.com/512/53/53283.png'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{sport.name}</h3>
                    <div className="text-sm text-gray-500">
                      {sport.teams.slice(0, 2).join(', ')}...
                    </div>
                  </div>
                </div>
                
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