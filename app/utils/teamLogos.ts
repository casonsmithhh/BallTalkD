// Team logo utility for centralized management
export const teamLogos = {
  // AFC East
  'buffalo-bills': '/images/nfl-logos/bills_logo.png',
  'miami-dolphins': '/images/nfl-logos/dolphins_logo.png',
  'new-england-patriots': '/images/nfl-logos/patriots_logo.png',
  'new-york-jets': '/images/nfl-logos/jets_logo.png',
  
  // AFC North
  'baltimore-ravens': '/images/nfl-logos/ravens_logo.png',
  'cincinnati-bengals': '/images/nfl-logos/bengals_logo.png',
  'cleveland-browns': '/images/nfl-logos/browns_logo.png',
  'pittsburgh-steelers': '/images/nfl-logos/steelers_logo.png',
  
  // AFC South
  'houston-texans': '/images/nfl-logos/texans_logo.png',
  'indianapolis-colts': '/images/nfl-logos/colts_logo.png',
  'jacksonville-jaguars': '/images/nfl-logos/jaguars_logo.png',
  'tennessee-titans': '/images/nfl-logos/titans_logo.png',
  
  // AFC West
  'denver-broncos': '/images/nfl-logos/broncos_logo.png',
  'kansas-city-chiefs': '/images/nfl-logos/chiefs_logo.png',
  'las-vegas-raiders': '/images/nfl-logos/raiders_logo.png',
  'los-angeles-chargers': '/images/nfl-logos/chargers_logo.png',
  
  // NFC East
  'dallas-cowboys': '/images/nfl-logos/cowboys_logo.png',
  'new-york-giants': '/images/nfl-logos/giants_logo.png',
  'philadelphia-eagles': '/images/nfl-logos/eagles_logo.png',
  'washington-commanders': '/images/nfl-logos/commanders_logo.png',
  
  // NFC North
  'chicago-bears': '/images/nfl-logos/bears_logo.png',
  'detroit-lions': '/images/nfl-logos/lions_logo.png',
  'green-bay-packers': '/images/nfl-logos/packers_logo.png',
  'minnesota-vikings': '/images/nfl-logos/vikings_logo.png',
  
  // NFC South
  'atlanta-falcons': '/images/nfl-logos/falcons_logo.png',
  'carolina-panthers': '/images/nfl-logos/panthers_logo.png',
  'new-orleans-saints': '/images/nfl-logos/saints_logo.png',
  'tampa-bay-buccaneers': '/images/nfl-logos/buccaneers_logo.png',
  
  // NFC West
  'arizona-cardinals': '/images/nfl-logos/cardinals_logo.png',
  'los-angeles-rams': '/images/nfl-logos/rams_logo.png',
  'san-francisco-49ers': '/images/nfl-logos/49ers_logo.png',
  'seattle-seahawks': '/images/nfl-logos/seahawks_logo.png',
}

export const getTeamLogo = (teamSlug: string): string => {
  return teamLogos[teamSlug as keyof typeof teamLogos] || '/images/nfl-logos/nfl_default.png'
}

export const getTeamLogoWithFallback = (teamSlug: string, fallbackUrl: string = 'https://a.espncdn.com/i/teamlogos/nfl/500/nfl.png'): string => {
  return teamLogos[teamSlug as keyof typeof teamLogos] || fallbackUrl
}