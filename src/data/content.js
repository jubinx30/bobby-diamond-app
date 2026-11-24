import songsData from './songs.json'

export const SONGS_CATALOG = songsData

export const GENRES = [
  'All Genres',
  "50's Songs",
  "60's Songs",
  "70's Music",
  "80's/90's/& Up",
  'Ballads',
  'Classic Rock',
  'Motown',
  'Cocktail/Bossa',
  'Country',
  'Disco Music',
  'Blues',
  'Italian',
  'Irish',
  'Patriotic',
  'Xmas/Holiday'
]

export const VIDEOS_DATA = [
  {
    id: 'featured-1',
    title: 'Hello Dolly & Mack The Knife (Live)',
    subtitle: 'Showcasing the power, charm, and sensitivity of Bobby on stage.',
    duration: '5:45',
    tag: 'FEATURED CLIP',
    type: 'Concert Show',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0',
    description: 'Filmed live before a sold-out theatre audience. Bobby delivers his signature vocal charisma with a full brass section.'
  },
  {
    id: 'clip-1',
    title: 'Live Concert Highlights',
    subtitle: 'Concert Show • 4:15',
    duration: '4:15',
    tag: 'Concert Show',
    description: 'High energy overture, audience banter, and greatest hits medley.'
  },
  {
    id: 'clip-2',
    title: 'Hello Dolly – Live Show',
    subtitle: 'Crowd Favorite • 3:40',
    duration: '3:40',
    tag: 'Crowd Favorite',
    description: 'Bobby serenading the front row with timeless Armstrong flair.'
  },
  {
    id: 'clip-3',
    title: 'Vehicle – High Energy Brass',
    subtitle: 'Upbeat • 3:10',
    duration: '3:10',
    tag: 'Upbeat',
    description: 'Ripping brass riffs and Bobby Diamond belting out pure rock-and-soul energy.'
  },
  {
    id: 'clip-4',
    title: 'Sweet Caroline & 70s Singalong',
    subtitle: 'Audience Favorite • 3:55',
    duration: '3:55',
    tag: 'Singalong',
    description: 'Every hand raised and every voice singing along with Bobby.'
  },
  {
    id: 'clip-5',
    title: 'Signature Ballad: My Way & Unchained Melody',
    subtitle: 'Signature Ballad • 4:25',
    duration: '4:25',
    tag: 'Signature Ballad',
    description: 'Emotional, soaring vocal performance that brings audiences to their feet.'
  }
]

export const REPERTOIRE_CATEGORIES = [
  {
    title: "60's Hits & Classics",
    artists: 'Beatles, Elvis, Tom Jones (350 Songs)',
    genreFilter: "60's Songs"
  },
  {
    title: "70's Golden Repertoire",
    artists: 'Neil Diamond, Elton, Eagles (389 Songs)',
    genreFilter: "70's Music"
  },
  {
    title: "80's, 90's & Up",
    artists: 'Bryan Adams, Billy Joel (163 Songs)',
    genreFilter: "80's/90's/& Up"
  },
  {
    title: "50's Rock & Rat Pack",
    artists: 'Bobby Darin, Sinatra, Chuck Berry (50 Songs)',
    genreFilter: "50's Songs"
  },
  {
    title: 'Motown & Disco Classics',
    artists: 'Temptations, Marvin Gaye, Abba (82 Songs)',
    genreFilter: 'Motown'
  },
  {
    title: 'Ballads & Cocktail/Bossa',
    artists: 'Sinatra, Bennett, Armstrong (66 Songs)',
    genreFilter: 'Ballads'
  }
]
