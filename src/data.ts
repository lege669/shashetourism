import { Slide, Attraction, Hotel, Restaurant, Event, StaffMember, GalleryItem, NewsItem, QuizQuestion } from './types';

export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    category: 'Welcome to Shashemene',
    title: 'Explore the heart of Ethiopia',
    subtitle: 'Where lush Rift Valley landscapes meet global cultural heritage, hot springs, and vibrant wildlife sanctuaries.',
    image: 'https://images.unsplash.com/photo-1547127796-06bb04e4b315?auto=format&fit=crop&w=1600&h=900&q=80',
    actionText: 'Explore Tourism',
    tag: 'Official Tourism Portal'
  },
  {
    id: 2,
    category: 'Manager',
    title: 'legese tsegaye',
    subtitle: 'Driving the digital transformation, tourism infrastructure, and smart services as chief of ICT implementation.',
    image: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=1600&h=900&q=80',
    actionText: 'View Staff',
    tag: 'ICT Division Head'
  },
  {
    id: 3,
    category: 'Cultural Melting Pot',
    title: 'Rastafarian Heritage',
    subtitle: 'Discover the unique global community established on Emperor Haile Selassie I\'s historic land grant, rich with music, faith, and organic lifestyle.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&h=900&q=80',
    actionText: 'Discover Culture',
    tag: 'Unique Experience'
  },
  {
    id: 4,
    category: 'Natural Wonders',
    title: 'Wondo Genet Hot Springs',
    subtitle: 'Bathe in therapeutic mineral waters and walk through dense evergreen forests, home to endemic birds and rare colobus monkeys.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&h=900&q=80',
    actionText: 'Plan Resort Trip',
    tag: 'Ecotourism'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'wondo-genet',
    name: 'Wondo Genet Hot Springs',
    category: 'Nature',
    rating: 4.8,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&h=450&q=80',
    description: 'A lush forest resort featuring natural hot springs, spectacular birdwatching, and relaxing thermal swimming pools.',
    longDescription: 'Wondo Genet (meaning "Green Heaven") lives up to its name. Located on a steep hillside covered by dense natural forest, it is famous for its natural hot springs, therapeutic thermal water pools, and incredible biodiversity. The resort is a paradise for bird lovers, hosting many endemic species, alongside playful colobus and vervet monkeys. Visitors can enjoy hiking trails leading to hidden waterfalls.',
    highlights: ['Natural Mineral Hot Baths', 'Forest Hiking Trails', 'Endemic Bird Species', 'High-altitude Organic Coffee'],
    bestTime: 'October to February (Dry season)',
    coordinates: '7.1000° N, 38.6333° E'
  },
  {
    id: 'rastafari-community',
    name: 'Rastafari Community & Museum',
    category: 'Culture',
    rating: 4.9,
    reviewsCount: 245,
    image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=600&h=450&q=80',
    description: 'Explore the global community of the land grant, visiting the Tabernacle, Jamaican museum, and organic farming gardens.',
    longDescription: 'In 1948, Emperor Haile Selassie I granted 500 acres of fertile land in Shashemene to members of the Rastafari movement of the African Diaspora. Today, this vibrant neighborhood is a living testimony of global repatriation. Visitors can tour the Jamaican Museum, view artifacts of historic repatriation, enjoy live reggae music, visit organic "ital" farms, and learn about Rastafarian mysticism and local history.',
    highlights: ['Jamaican Repatriation Museum', 'Tabor Traditional Herb Gardens', 'Vibrant Reggae & Nyabinghi Music', 'Art & Craft Workshops'],
    bestTime: 'Year-round, especially during Selassie’s Birthday celebrations (July 23)',
    coordinates: '7.2012° N, 38.5985° E'
  },
  {
    id: 'senkele-sanctuary',
    name: 'Senkele Swayne\'s Hartebeest Sanctuary',
    category: 'Nature',
    rating: 4.7,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&h=450&q=80',
    description: 'The last sanctuary for the endangered Swayne\'s Hartebeest, set in open savannah plains with gazelles and birds.',
    longDescription: 'Senkele Sanctuary, situated close to Shashemene, is the prime conservation area protecting the critically endangered Swayne\'s Hartebeest. This gorgeous open acacia savannah also flatters travelers with sightings of Bohor reedbucks, Oribi, greater and lesser kudus, and over 190 bird species. Guided walking tours run across the golden grasses as sunrises paint the majestic Ethiopian Rift Valley.',
    highlights: ['Endangered Swayne\'s Hartebeest', 'Walking Safari Safely Guided', 'Breathtaking savannah sunrises', 'Excellent raptor birdwatching'],
    bestTime: 'December to May',
    coordinates: '7.1667° N, 38.2500° E'
  },
  {
    id: 'melka-oda',
    name: 'Melka Oda Archaeological Site',
    category: 'History',
    rating: 4.5,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&h=450&q=80',
    description: 'An ancient pre-historic site featuring rock drawings, geological arches, and Oromo cultural assemblies.',
    longDescription: 'Melka Oda is a place of deep historical and administrative significance in Oromo history. Historically used as a meeting ground for the ancient democratic Gadaa administrative assemblies, it also preserves fascinating pre-historic rock carvings of ancient livestock and figures. The site offers incredible insights into ancient horn-of-Africa civil structures and geological formations.',
    highlights: ['Pre-historic stone carvings', 'Traditional Gadaa assembly sites', 'Volcanic basaltic rock structures', 'Rich oral history guides'],
    bestTime: 'October to March',
    coordinates: '7.1855° N, 38.5412° E'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'rift-valley-hotel',
    name: 'Rift Valley Resort Hotel',
    type: 'Hotel',
    price: '$45 / night',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
    description: 'Modern comfort in the heart of Shashemene. Providing premium rooms, lush private gardens, and an authentic Oromo and Western restaurant.',
    features: ['Free Wi-Fi', 'Complimentary Breakfast', 'Conference Hall', 'Secure Parking', 'Airport shuttle link'],
    location: 'Central Shashemene'
  },
  {
    id: 'zion-train-lodge',
    name: 'Zion Train Eco-Lodge',
    type: 'Lodge',
    price: '$30 / night',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
    description: 'Immerse yourself in Rastafarian hospitality. Earth houses constructed of organic materials, serving world-class organic vegan "Ital" foods.',
    features: ['Organic farm-to-table', 'Reggae library & music sessions', 'Quiet meditation area', 'Bicycle rental', 'Local cultural tour booking'],
    location: 'Rastafari Diaspora Quarter'
  },
  {
    id: 'wondo-genet-resort',
    name: 'Wondo Genet Thermal Resort',
    type: 'Resort',
    price: '$55 / night',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=80',
    description: 'Built directly over natural thermal springs. Experience stepping out of cozy wooden bungalows right into historic hot spring baths.',
    features: ['Thermal pools integration', 'Guided forest hiking tours', 'Bar serving famous local honey wine', 'Massage treatments', 'Natural steam sauna'],
    location: 'Wondo Genet Highlands'
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'abyssinia-traditional',
    name: 'Abyssinia Traditional House',
    cuisine: 'Ethiopian',
    specialty: 'Sizzling Special Tibs & Kitfo with fresh Injera',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=500&q=80',
    description: 'A cultural restaurant where you eat while enjoying traditional live dances, fresh honey wine (Tej), and authentic coffee ceremonies.',
    hours: '11:00 AM - 11:30 PM'
  },
  {
    id: 'one-love-ital',
    name: 'One Love Ital Restaurant',
    cuisine: 'Rastafari Vegan',
    specialty: 'Spiced coconut stews, fresh avocado juice, and home-baked hemp bread',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1490239683250-1c61e4184885?auto=format&fit=crop&w=500&q=80',
    description: 'Charming food sanctuary serving completely clean, "Ital" organic vegan options seasoned with herbs handpicked from the yard.',
    hours: '8:00 AM - 8:00 PM'
  },
  {
    id: 'ict-hub-cafe',
    name: 'The Digital Cafe & Bistro',
    cuisine: 'Continental & Ethiopian Fusion',
    specialty: 'Ethiopian Macchiato & fresh Avocado-Mango Juice layers',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=500&q=80',
    description: 'A modern, high-speed Wi-Fi cafe optimized for digital nomads, travelers, and local tech enthusiasts. Designed in support of our smart tourism initiative.',
    hours: '7:00 AM - 10:00 PM'
  }
];

export const EVENTS: Event[] = [
  {
    id: 'meskel-festival',
    title: 'Meskel Celebration in Shashemene',
    date: 'September 27',
    category: 'Festival',
    location: 'Shashemene Municipality Square',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=500&q=80',
    description: 'The monumental bonfire celebration (Demera) commemorating the finding of the True Cross, featuring gorgeous yellow daisies, white traditional attire, and traditional religious chanting.'
  },
  {
    id: 'selassie-birthday',
    title: 'Emperor Haile Selassie I Coronation anniversary',
    date: 'November 2',
    category: 'Cultural',
    location: 'Rastafari Diaspora Tabernacle',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80',
    description: 'A spectacular global gathering of international repatriation. Filled with roots reggae sessions, panel discussions, Oromo cultural unity dances, and Nyabinghi drumming chants.'
  },
  {
    id: 'smart-tourism-summit',
    title: 'Shashemene Digital Tourism & ICT Expo',
    date: 'August 14',
    category: 'ICT',
    location: 'Municipality Tech Center',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=80',
    description: 'An innovative summit headed by Legese Tsegaye bringing together ICT specialists, accommodation stakeholders, and eco-conservationists to build smart tourism networks.'
  }
];

export const STAFF: StaffMember[] = [
  {
    id: 'legese-tsegaye',
    name: 'Legese Tsegaye',
    role: 'Chief Chief Manager, ICT',
    department: 'Digital Infrastructure & Smart Services',
    image: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=600&h=600&q=80',
    bio: 'Legese is a visionary ICT leader specializing in community networks, digital services, and geographical mapping. He oversees Shashemene\'s smart-tourism databases, ensuring robust server uptimes, open fiber portals, and custom apps serving global travelers.',
    email: 'legesetsegaye41@gmail.com',
    phone: '+251-912-34-5678',
    responsibilities: [
      'Managing Shashemene municipality fiber optic routes & municipal cloud structure.',
      'Developing AI-integrated visitor analytics systems and localized eco-maps.',
      'Securing government data servers & directing public Wi-Fi hotspots for key sights.',
      'Structuring cyber training for youth and small hospitality enterprises.'
    ],
    highlighted: true,
    tier: 'Team Leader'
  },
  {
    id: 'aster-benti',
    name: 'Aster Benti',
    role: 'Director of Cultural Heritage',
    department: 'Tourism Development Office',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Aster has over 12 years of experience in regional tourism management. She works hand-in-hand with regional elders and Diaspora representatives to curate authentic Oromo and Rastafari cultural experiences.',
    email: 'aster.benti@shashemene.org',
    phone: '+251-911-88-9900',
    responsibilities: [
      'Curating community museums and historical preservation files.',
      'Coordinating guide licensing programs to guarantee reliable service.',
      'Liaising with UNESCO and Ethiopian national culture bureaus.'
    ],
    tier: 'Director'
  },
  {
    id: 'elias-oromo',
    name: 'Dr. Elias Oromo',
    role: 'Executive Director',
    department: 'Bureau of Culture and Tourism',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Dr. Elias directs Shashemene\'s tourism expansion master plan. He bridges local development with federal tourism incentives to support sustainable growth.',
    email: 'elias.oromo@shashemene.org',
    phone: '+251-911-22-3344',
    responsibilities: [
      'Approving regional tourism master plans and grants.',
      'Chairing quarterly stakeholder and community advisory boards.',
      'Allocating public resources for eco-preservation.'
    ],
    tier: 'Director'
  },
  {
    id: 'marcus-reid',
    name: 'Marcus Reid',
    role: 'Diaspora Liaison Manager',
    department: 'Community Integration Division',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Marcus repatriated from Kingston, Jamaica to Shashemene in 2011. He holds a degree in African Studies and specializes in bridging legal, cultural, and enterprise matters between local Oromia bureaus and international visitors.',
    email: 'marcus.reid@shashemene.org',
    phone: '+251-920-55-6677',
    responsibilities: [
      'Welcoming international diaspora delegations & arranging land-grant heritage logs.',
      'Directing Rastafarian organic farming workshops for sustainable tourism expansion.',
      'Hosting the quarterly international Reggae Unity festival.'
    ],
    tier: 'Manager'
  },
  {
    id: 'tigist-abebe',
    name: 'Tigist Abebe',
    role: 'Hospitality & Services Manager',
    department: 'Hospitality Support Division',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Tigist coordinates services and standardization programs across all Shashemene hotels, guest houses, and traditional dining establishments.',
    email: 'tigist.abebe@shashemene.org',
    phone: '+251-913-44-5566',
    responsibilities: [
      'Conducting quality and hygiene audits of licensed restaurants.',
      'Organizing customer service workshops for hospitality staff.',
      'Publishing the official local hotel rating index.'
    ],
    tier: 'Manager'
  },
  {
    id: 'daniel-negash',
    name: 'Daniel Negash',
    role: 'Senior Guide Team Leader',
    department: 'Ecotourism Guide Section',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Daniel leads the certified local guide brigade for Wondo Genet hikes and Senkele bird-watching tours. He is fluent in Oromiffa, Amharic, and English.',
    email: 'daniel.n@shashemene.org',
    phone: '+251-915-77-8899',
    responsibilities: [
      'Scheduling weekly guide shifts and mountain patrol rotations.',
      'Designing safe eco-trekking and wildlife monitoring trails.',
      'Mentoring apprentice scouts in native flora and fauna.'
    ],
    tier: 'Team Leader'
  },
  {
    id: 'hana-girma',
    name: 'Hana Girma',
    role: 'Information Desk Coordinator',
    department: 'Visitor Center Relations',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Hana greets arrivals at Shashemene\'s central information center, distributing custom offline digital map codes and handling registration.',
    email: 'hana.g@shashemene.org',
    phone: '+251-922-11-2233',
    responsibilities: [
      'Providing physical itinerary planners and brochures to guests.',
      'Updating the real-time town events notice board.',
      'Managing transit registrations for regional tourists.'
    ],
    tier: 'Employee'
  },
  {
    id: 'samuel-bekele',
    name: 'Samuel Bekele',
    role: 'ICT Support Specialist',
    department: 'Digital Infrastructure & Smart Services',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Samuel handles the daily network maintenance, portal hardware setup, and server troubleshooting under Legese Tsegaye\'s management.',
    email: 'samuel.b@shashemene.org',
    phone: '+251-925-44-3322',
    responsibilities: [
      'Configuring outdoor Wi-Fi hot-spots around transit areas.',
      'Uploading new data records into the local attractions directory.',
      'Providing technical assistance to registered tourism business portals.'
    ],
    tier: 'Employee'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Wondo Genet Woodlands',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Lush mountain peak forests holding natural hot water channels.'
  },
  {
    id: 'g-2',
    title: 'The Rastafari Tabernacle drumming',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Traditional heavy Nyabinghi bass drums played during sacred celebrations.'
  },
  {
    id: 'g-3',
    title: 'ICT Team Summit Review',
    category: 'staff',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Legese Tsegaye coordinating digital map updates during a regional developers assembly.'
  },
  {
    id: 'g-4',
    title: 'Golden Savannah Gazelle',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Diverse species roaming peaceful plains inside the Senkele Wildlife Sanctuary.'
  },
  {
    id: 'g-5',
    title: 'Local Art Crafting Studio',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Intricate handmade standard wool hats, canvas portraits, and handcarved masks.'
  },
  {
    id: 'g-6',
    title: 'Centennial Municipality Hall',
    category: 'landmark',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'The geometric modernist building hosting the tourism digital hub.'
  }
];

export const NEWS_BOARD: NewsItem[] = [
  {
    id: 'n-1',
    title: 'Shashemene Unveils Dynamic High-Speed Fiber Mesh for Hotels',
    date: 'June 18, 2026',
    author: 'Legese Tsegaye',
    category: 'ICT Infrastructure',
    summary: 'The ICT department completes routing 12km of underground fiber optic cables, securing fast broadband connections across our eco-resorts.',
    content: 'Led by our Chief ICT Manager Legese Tsegaye, the Shashemene Municipality Digital Commission has officially successfully installed fiber terminals at major visitor zones, including Zion Eco-Lodge and the central tourist square. This guarantees international digital nomads can stay seamlessly connected while tracking scenic wildlife. High-speed open public Wi-Fi access tags have also been seeded at three tourist hubs.'
  },
  {
    id: 'n-2',
    title: 'Senkele Sanctuary Sighting: Swayne\'s Hartebeest Herd Welcomes 14 Calves!',
    date: 'May 30, 2026',
    author: 'Warden Tsedeke',
    category: 'Wildlife & Conservation',
    summary: 'A record-breaking calving season bodes beautifully for Shashemene\'s endemic and precious mammal sanctuary.',
    content: 'Sanctuary wardens alongside local Oromia environmental volunteers spotted an impressive cluster of new-born calves. Swayne\'s Hartebeest, highly endangered, are local treasures of Shashemene. Increased local cyber-patrols (monitored via the ICT center dashboard) and communal boundaries have successfully reduced cattle grazing inside the gold savannah trails, enabling natural population recovery.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Choose your ideal morning landscape:',
    options: [
      { text: 'Steaming natural thermal baths matching tropical green ferns', type: 'Nature' },
      { text: 'A colorful cultural market loaded with handwoven fabrics and drums', type: 'Culture' },
      { text: 'Historic volcanic ridges and ancient rock carvings', type: 'History' },
      { text: 'An organic coffee farm filling the air with wood-roasted fragrances', type: 'Food' }
    ]
  },
  {
    id: 2,
    question: 'What is your background music preference?',
    options: [
      { text: 'Heavy, slow roots reggae bassline with Nyabinghi ritual drumming', type: 'Culture' },
      { text: 'The rustling of high bamboo trees and bird calls from hornbills', type: 'Nature' },
      { text: 'Ancient Gadaa songs and traditional flute melodies', type: 'History' },
      { text: 'Friendly chatter at a cafe over an outstanding, velvety Macchiato', type: 'Food' }
    ]
  },
  {
    id: 3,
    question: 'How do you like to interact with locals?',
    options: [
      { text: 'Joining elders under the Sycamore (Oda) tree discussing heritage systems', type: 'History' },
      { text: 'Learning to harvest local organic herbs and cooking traditional stews', type: 'Food' },
      { text: 'Exploring forest pathways alongside regional expert naturalists', type: 'Nature' },
      { text: 'Attending a community session in the Jamaican quarter talking history', type: 'Culture' }
    ]
  }
];
