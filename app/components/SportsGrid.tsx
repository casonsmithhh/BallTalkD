import Link from 'next/link'

export default function SportsGrid() {
  const sports = [
    {
      name: 'NBA',
      description: 'Trade talk, MVP debates, young stars and legendary moments.',
      href: '/nba',
      logo: 'https://thewebfactory.us/blogs/wp-content/uploads/2022/09/NBA-Logo-2017.png'
    },
    {
      name: 'NFL',
      description: 'Break down the draft, breakout rookies, and playoff races.',
      href: '/nfl',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png'
    },
    {
      name: 'NHL',
      description: 'Stanley Cup matchups, trade rumors, and power rankings.',
      href: '/nhl',
      logo: 'https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg'
    },
    {
      name: 'MLB',
      description: 'Pitching duels, power hitters, and divisional drama.',
      href: '/mlb',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png'
    },
    {
      name: 'MLS',
      description: 'Postseason hopes, Messi-mania, and rising U.S. stars.',
      href: '/mls',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/MLS_crest_logo_RGB_gradient.svg'
    },
    {
      name: 'Soccer',
      description: 'Global transfers, Champions League, World Cup debates.',
      href: '/soccer',
      logo: 'https://cdn-icons-png.flaticon.com/512/53/53283.png'
    },
    {
      name: 'Tennis',
      description: 'Grand Slams, GOAT debates, and rising stars.',
      href: '/tennis',
      logo: 'https://media.istockphoto.com/id/1345493117/vector/tennis-racket-icon-stock-vector-tennis-logo-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=5KLZBhn5hIDSBM_Y5lS8fgeqA8bZW4AtpuXzx0VU9mg='
    },
    {
      name: 'Formula 1',
      description: 'Team dynamics, qualifying drama, and global circuits.',
      href: '/f1',
      logo: 'https://www.citypng.com/public/uploads/preview/hd-f1-the-official-formula-1-transparent-png-701751712229525ajvwddtfme.png'
    },
    {
      name: 'NCAA Football',
      description: 'Heisman hopefuls, rivalries, and bowl projections.',
      href: '/ncaa-fb',
      logo: 'https://seeklogo.com/images/N/ncaa-football-logo-36487E0FA2-seeklogo.com.png'
    },
    {
      name: 'NCAA Basketball',
      description: 'March Madness, blue bloods, and one-and-dones.',
      href: '/ncaa-bb',
      logo: 'https://smsumustangs.com/images/2017/2/15/NCAAMBBlogo.jpg'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-10">
      {sports.map((sport) => (
        <div
          key={sport.name}
          className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 flex items-center p-5"
        >
          <img
            src={sport.logo}
            alt={`${sport.name} Logo`}
            className="w-20 h-20 object-contain mr-4 flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{sport.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{sport.description}</p>
            <Link
              href={sport.href}
              className="text-gray-900 font-bold hover:text-orange-400 transition-colors"
            >
              Enter {sport.name} Hub →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}