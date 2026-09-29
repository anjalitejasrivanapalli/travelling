export interface FlightOption {
  id: string;
  airline: string;
  route: string;
  outbound: {
    origin: string;
    layover: string;
    destination: string;
    totalDuration: string;
    departureTime: string;
    arrivalTime: string;
    flightNumbers: string;
  };
  returnFlight: {
    origin: string;
    layover: string;
    destination: string;
    totalDuration: string;
    departureTime: string;
    arrivalTime: string;
    flightNumbers: string;
  };
  estimatedRoundTripINR: number;
  baggage: {
    checked: string;
    cabin: string;
  };
  pros: string[];
  cons: string[];
  statusLabel: 'Recommended' | 'Budget Alternative' | 'Open-Jaw Premium';
}

export interface HotelOption {
  id: string;
  city: 'Moscow' | 'St. Petersburg';
  name: string;
  stars: number;
  neighborhood: string;
  metroProximity: string;
  pricePerNightINR: number;
  pricePerNightRUB: number;
  nights: number;
  totalCostINR: number;
  totalCostRUB: number;
  safetyRating: string;
  safetyFeatures: string[];
  amenities: string[];
  highlight: string;
  recommendedPick?: boolean;
}

export interface ItineraryItem {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  location: string;
  description: string;
  entryFeeRUB: number;
  entryFeeINR: number;
  isFree: boolean;
  transitTip: string;
  foodSuggestion?: string;
  insiderTip?: string;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  city: 'Moscow' | 'St. Petersburg' | 'Transit';
  headline: string;
  theme: string;
  pace: 'Relaxed' | 'Moderate' | 'Active';
  morning: ItineraryItem;
  afternoon: ItineraryItem;
  evening: ItineraryItem;
  dayTotalEstimatedRUB: number;
  dayTotalEstimatedINR: number;
}

export interface BudgetCategory {
  id: string;
  category: string;
  estimatedCostINR: number;
  estimatedCostRUB: number;
  percentOfBudget: number;
  isConfirmedOrEstimated: 'Estimated' | 'Current Official Fee' | 'Market Average';
  notes: string;
  optimizationAdvice: string;
  icon: string;
}

export interface TravelData {
  traveler: {
    name: string;
    origin: string;
    destination: string;
    travelersCount: number;
    dates: string;
    totalDays: number;
    totalNights: number;
    totalBudgetINR: number;
    rubleRateINR: number; // 1 RUB = 0.95 INR approx
  };
  flightOptions: FlightOption[];
  accommodations: HotelOption[];
  itinerary: DayItinerary[];
  budgetCategories: BudgetCategory[];
}

export const TRAVEL_PLAN: TravelData = {
  traveler: {
    name: 'Solo Indian Explorer',
    origin: 'Visakhapatnam (VTZ), India',
    destination: 'Moscow & St. Petersburg, Russia',
    travelersCount: 1,
    dates: '20 October 2026 – 30 October 2026',
    totalDays: 11,
    totalNights: 10,
    totalBudgetINR: 500000,
    rubleRateINR: 0.95, // 1 RUB = ~0.95 INR as of 2026 baseline
  },

  flightOptions: [
    {
      id: 'flight-aeroflot',
      airline: 'Air India / IndiGo + Aeroflot Russian Airlines',
      route: 'Visakhapatnam (VTZ) ⇄ New Delhi (DEL) ⇄ Moscow Sheremetyevo (SVO)',
      outbound: {
        origin: 'VTZ 08:35',
        layover: 'DEL (3h 15m transfer, Terminal 3)',
        destination: 'SVO 18:20 (Same Day)',
        totalDuration: '13h 15m',
        departureTime: '20 Oct 2026, 08:35 AM',
        arrivalTime: '20 Oct 2026, 18:20 PM',
        flightNumbers: 'AI-452 (VTZ-DEL) + SU-233 (DEL-SVO)',
      },
      returnFlight: {
        origin: 'SVO 19:40',
        layover: 'DEL (3h 50m transfer, Terminal 3)',
        destination: 'VTZ 13:25 (+1 Day)',
        totalDuration: '14h 15m',
        departureTime: '30 Oct 2026, 19:40 PM',
        arrivalTime: '31 Oct 2026, 13:25 PM',
        flightNumbers: 'SU-232 (SVO-DEL) + AI-451 (DEL-VTZ)',
      },
      estimatedRoundTripINR: 68000,
      baggage: {
        checked: '23 kg checked baggage included on all sectors',
        cabin: '7 kg cabin bag + laptop personal item',
      },
      pros: [
        'Fastest overall travel time between Visakhapatnam and Russia',
        'Aeroflot flies nonstop DEL-SVO in just 6h 30m with full hot meals',
        'Comfortable transit in Delhi Terminal 3 without city transfer',
      ],
      cons: [
        'Requires domestic connector from VTZ to DEL',
      ],
      statusLabel: 'Recommended',
    },
    {
      id: 'flight-airarabia',
      airline: 'Air Arabia (via Sharjah)',
      route: 'Visakhapatnam/Hyderabad ⇄ Sharjah (SHJ) ⇄ Moscow Domodedovo (DME)',
      outbound: {
        origin: 'VTZ/HYD 04:15',
        layover: 'SHJ (3h 40m)',
        destination: 'DME 14:30',
        totalDuration: '13h 45m',
        departureTime: '20 Oct 2026, 04:15 AM',
        arrivalTime: '20 Oct 2026, 14:30 PM',
        flightNumbers: 'G9-469 + G9-951',
      },
      returnFlight: {
        origin: 'DME 15:20',
        layover: 'SHJ (4h 10m)',
        destination: 'VTZ/HYD 03:30 (+1 Day)',
        totalDuration: '14h 40m',
        departureTime: '30 Oct 2026, 15:20 PM',
        arrivalTime: '31 Oct 2026, 03:30 AM',
        flightNumbers: 'G9-952 + G9-468',
      },
      estimatedRoundTripINR: 59500,
      baggage: {
        checked: '20 kg checked baggage (Value fare tier)',
        cabin: '10 kg cabin baggage',
      },
      pros: [
        'Lowest overall airfare (~₹8,500 cheaper)',
        'Arrives early afternoon in Moscow DME',
      ],
      cons: [
        'Low-cost carrier (meals are paid add-on or pre-booked)',
        'Connecting via Sharjah requires early morning departure',
      ],
      statusLabel: 'Budget Alternative',
    },
    {
      id: 'flight-openjaw',
      airline: 'Emirates / Flydubai (Multi-city Open-Jaw)',
      route: 'VTZ ⇄ DXB ⇄ Moscow (SVO) In / St. Petersburg (LED) Out ⇄ DXB ⇄ VTZ',
      outbound: {
        origin: 'VTZ 09:15',
        layover: 'DXB (3h 10m)',
        destination: 'SVO 19:10',
        totalDuration: '14h 25m',
        departureTime: '20 Oct 2026, 09:15 AM',
        arrivalTime: '20 Oct 2026, 19:10 PM',
        flightNumbers: 'EK/FZ codeshare',
      },
      returnFlight: {
        origin: 'LED 17:30 (St. Petersburg Pulkovo)',
        layover: 'DXB (3h 45m)',
        destination: 'VTZ 14:15 (+1 Day)',
        totalDuration: '16h 15m',
        departureTime: '30 Oct 2026, 17:30 PM',
        arrivalTime: '31 Oct 2026, 14:15 PM',
        flightNumbers: 'FZ-902 + FZ-447',
      },
      estimatedRoundTripINR: 76000,
      baggage: {
        checked: '30 kg checked baggage allowance',
        cabin: '7 kg cabin bag',
      },
      pros: [
        'Open-jaw: fly into Moscow, fly out of St. Petersburg',
        'Saves having to book a return train/flight from SPb back to Moscow on Day 11',
        'Full service Emirates standard comfort',
      ],
      cons: [
        'Higher airfare (~₹8,000 more than Aeroflot)',
      ],
      statusLabel: 'Open-Jaw Premium',
    },
  ],

  accommodations: [
    // Moscow Picks (5 Nights: Oct 20 - Oct 25)
    {
      id: 'hotel-mow-vega',
      city: 'Moscow',
      name: 'Vega Izmailovo Hotel & Convention Center',
      stars: 4,
      neighborhood: 'Izmailovo District (Direct Blue Line Metro to Red Square in 14 mins)',
      metroProximity: '3-minute walk to Partizanskaya Metro Station (Line 3)',
      pricePerNightINR: 3800,
      pricePerNightRUB: 4000,
      nights: 5,
      totalCostINR: 19000,
      totalCostRUB: 20000,
      safetyRating: '9.4/10 (High Security)',
      safetyFeatures: [
        '24/7 front desk security with electronic keycard lifts',
        'Vetted by international solo travelers for decades',
        'In-house currency exchange assistance and reliable Wi-Fi',
      ],
      amenities: ['Central Heating', 'High-speed Wi-Fi', 'En-suite modern bathroom', 'Electric kettle', 'Safe deposit box'],
      highlight: 'Next door to Izmailovo Wooden Kremlin & Souvenir Market; direct Metro line into Red Square.',
      recommendedPick: true,
    },
    {
      id: 'hotel-mow-ibis',
      city: 'Moscow',
      name: 'Ibis Moscow Centre Bakhrushina',
      stars: 3,
      neighborhood: 'Zamoskvorechye (Historic district south of Moskva River)',
      metroProximity: '5-minute walk to Paveletskaya Metro Station & Aeroexpress',
      pricePerNightINR: 4400,
      pricePerNightRUB: 4630,
      nights: 5,
      totalCostINR: 22000,
      totalCostRUB: 23150,
      safetyRating: '9.5/10',
      safetyFeatures: ['International brand protocols', 'Keycard security doors', 'Safe quiet residential street'],
      amenities: ['Buffet breakfast option', 'Soundproofed rooms', 'Climate control', 'Working desk'],
      highlight: 'Walking distance to Tretyakov Gallery; direct train to Domodedovo Airport.',
      recommendedPick: false,
    },
    {
      id: 'hotel-mow-netizen',
      city: 'Moscow',
      name: 'Netizen Moscow Rimskaya (Private En-Suite Room)',
      stars: 3,
      neighborhood: 'Tagansky / Rimskaya',
      metroProximity: '1-minute walk to Rimskaya Metro Station',
      pricePerNightINR: 2600,
      pricePerNightRUB: 2735,
      nights: 5,
      totalCostINR: 13000,
      totalCostRUB: 13675,
      safetyRating: '9.1/10',
      safetyFeatures: ['Modern keycards', '24h reception', 'Social solo traveler friendly environment'],
      amenities: ['Coworking lounge', 'Laundry room', 'High-speed Wi-Fi', 'Private bath'],
      highlight: 'Super budget-friendly boutique hotel-hostel with fully private hotel-grade suites.',
      recommendedPick: false,
    },

    // St. Petersburg Picks (5 Nights: Oct 25 - Oct 30)
    {
      id: 'hotel-spb-station',
      city: 'St. Petersburg',
      name: 'Station Hotel Premier V18',
      stars: 4,
      neighborhood: 'Central District / Vladimirsky (off Nevsky Prospekt)',
      metroProximity: '3-minute walk to Vladimirskaya / Dostoevskaya Metro Stations',
      pricePerNightINR: 3700,
      pricePerNightRUB: 3895,
      nights: 5,
      totalCostINR: 18500,
      totalCostRUB: 19475,
      safetyRating: '9.3/10',
      safetyFeatures: ['Electronic access gates', '24h bilingual reception', 'Quiet courtyard off main avenue'],
      amenities: ['Silent heating', 'Complimentary tea/coffee bar', 'Smart TV', 'Fluffy towels & toiletries'],
      highlight: 'Charming boutique hotel within 8 minutes walk to Moskovsky Train Station and Nevsky.',
      recommendedPick: true,
    },
    {
      id: 'hotel-spb-ibis',
      city: 'St. Petersburg',
      name: 'Ibis St. Petersburg Centre',
      stars: 3,
      neighborhood: 'Ligovsky Prospekt (near Galeria Shopping Mall)',
      metroProximity: '4-minute walk to Ligovsky Prospekt Metro',
      pricePerNightINR: 3400,
      pricePerNightRUB: 3580,
      nights: 5,
      totalCostINR: 17000,
      totalCostRUB: 17900,
      safetyRating: '9.4/10',
      safetyFeatures: ['Accor standard fire/security systems', 'Elevator keycard access', '24-hour manned lobby'],
      amenities: ['On-site restaurant', 'Luggage storage', 'Ironing facilities', 'Rain shower'],
      highlight: 'Directly adjacent to St. Petersburg’s biggest shopping center and supermarket.',
      recommendedPick: false,
    },
    {
      id: 'hotel-spb-soulkitchen',
      city: 'St. Petersburg',
      name: 'Soul Kitchen Junior Riverside Suite',
      stars: 4,
      neighborhood: 'Moika River Embankment (Historic Heart)',
      metroProximity: '5-minute walk to Admiralteyskaya Metro Station',
      pricePerNightINR: 4200,
      pricePerNightRUB: 4420,
      nights: 5,
      totalCostINR: 21000,
      totalCostRUB: 22100,
      safetyRating: '9.7/10',
      safetyFeatures: ['Top globally awarded boutique property', 'Intercom access', 'Dedicated solo travel host'],
      amenities: ['Canal view options', 'Artisanal kitchen', 'Heated floors', 'Designer interior'],
      highlight: 'Prestigious location on the Moika River, 7 minutes walk to St. Isaac’s and Hermitage.',
      recommendedPick: false,
    },
  ],

  itinerary: [
    {
      dayNumber: 1,
      date: '20 October 2026',
      dayOfWeek: 'Tuesday',
      city: 'Transit',
      headline: 'Journey from Visakhapatnam to Moscow & First Evening at Red Square',
      theme: 'Arrival & Welcome to Russia',
      pace: 'Relaxed',
      morning: {
        timeOfDay: 'Morning',
        title: 'Departure from Visakhapatnam (VTZ) & Delhi Transit',
        location: 'VTZ Airport to DEL Terminal 3',
        description: 'Board your morning flight AI-452 from Visakhapatnam (08:35). Arrive at Delhi Terminal 3. Seamless international baggage transfer. Clear Indian immigration and relax before boarding your Aeroflot flight SU-233 to Moscow.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Keep passport, printed e-visa approval letter, and flight tickets in your cabin sling bag.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Nonstop Flight to Moscow Sheremetyevo (SVO)',
        location: 'In Flight (DEL ➔ SVO) across Central Asia',
        description: 'Comfortable 6-hour 35-minute flight with Russian hot meal service. Descend over Moscow’s autumn landscape and touch down at Sheremetyevo Airport (Terminal C) at 18:20 local time (GMT+3). Clear Russian immigration with your e-visa.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Collect migration card slip stamped by border guard (keep inside passport until departure!). Exchange $100 USD at SVO airport bank kiosk to get initial Russian Rubles.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Aeroexpress Train, Hotel Check-In & Nikolskaya Fairy Lights',
        location: 'Aeroexpress to Belorusskaya ➔ Hotel Vega Izmailovo ➔ Nikolskaya St.',
        description: 'Take the fast Aeroexpress electric train (35 mins, 550 RUB) into central Moscow, then Metro Line 3 to Partizanskaya. Check into Vega Izmailovo Hotel. Head out for a magical evening stroll down illuminated Nikolskaya Street next to Red Square.',
        entryFeeRUB: 550,
        entryFeeINR: 520,
        isFree: false,
        transitTip: 'Buy a Moscow Troika smart card at the metro cashier window (deposit 150 RUB, load 1,000 RUB).',
        foodSuggestion: 'Dinner at Stolovaya 57 on the 3rd floor of GUM department store (Soviet cafeteria style, try warm chicken cutlet with mashed potatoes and compote ~450 RUB / ₹425).',
        insiderTip: 'Nikolskaya Street is covered in a canopy of golden fairy lights year-round. It is vibrant, safe, and just 50 meters from Red Square.',
      },
      dayTotalEstimatedRUB: 1200,
      dayTotalEstimatedINR: 1140,
    },
    {
      dayNumber: 2,
      date: '21 October 2026',
      dayOfWeek: 'Wednesday',
      city: 'Moscow',
      headline: 'The Grand Heart: Red Square, Kremlin Fortresses & Zaryadye Skybridge',
      theme: 'Iconic Russian Heritage',
      pace: 'Moderate',
      morning: {
        timeOfDay: 'Morning',
        title: 'Red Square & St. Basil’s Cathedral',
        location: 'Red Square (Krasnaya Ploshchad)',
        description: 'Step into Russia’s most famous square. Marvel at the vibrant patterned onion domes of St. Basil’s Cathedral (built by Ivan the Terrible in 1561). Explore the 9 interconnected chapels inside. Walk past Lenin’s Mausoleum and the red Kremlin towers.',
        entryFeeRUB: 700,
        entryFeeINR: 665,
        isFree: false,
        transitTip: 'Metro to Okhotny Ryad or Ploshchad Revolyutsii (direct 14 min ride from hotel).',
        foodSuggestion: 'Grab a famous GUM waffle-cone ice cream (Plombir) inside the historic arcade for 150 RUB (~₹140).',
        insiderTip: 'Lenin Mausoleum entry is free between 10:00 AM – 1:00 PM (closed Mon/Fri). Backpacks must be checked at the cloakroom.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Moscow Kremlin Grounds & The Armoury Chamber',
        location: 'The Moscow Kremlin (Borovitskaya Gate)',
        description: 'Enter the fortified seat of Russian power. Tour Cathedral Square with the Assumption, Archangel, and Annunciation Cathedrals. Stand beside the gigantic Tsar Bell and Tsar Cannon. Enter the world-renowned Armoury Chamber to witness Fabergé eggs, royal coronation robes, and gilded carriages.',
        entryFeeRUB: 1200,
        entryFeeINR: 1140,
        isFree: false,
        transitTip: 'Pre-book the 14:00 Armoury Chamber entry slot online via tickets.kreml.ru to skip ticket queues.',
        foodSuggestion: 'Lunch at Grabli near Teatralnaya (buffet of salads, warm soups, and grilled meats ~500 RUB / ₹475).',
        insiderTip: 'Audio guides in English are available at the Armoury entrance for 500 RUB.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Zaryadye Park & Sunset over the Moskva River Floating Bridge',
        location: 'Zaryadye Park, Varvarka Street',
        description: 'Walk through Moscow’s futuristic park showcasing Russia’s distinct botanical microclimates. Step out onto the 70-meter cantilevered "Floating Bridge" suspended over the Moskva River for an unforgettable sunset panorama of the Kremlin illuminated in gold.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Short 8-minute walk from Red Square along Varvarka Street.',
        foodSuggestion: 'Dinner at Varenichnaya No. 1 on Nikolskaya: indulge in handmade Russian dumplings (Pelmeni filled with potatoes/mushrooms or meat) with sour cream and warm berry tea (~750 RUB / ₹710).',
        insiderTip: 'October evenings get chilly (approx 3°C); dress in your thermal innerwear and wool scarf.',
      },
      dayTotalEstimatedRUB: 2650,
      dayTotalEstimatedINR: 2515,
    },
    {
      dayNumber: 3,
      date: '22 October 2026',
      dayOfWeek: 'Thursday',
      city: 'Moscow',
      headline: 'Underground Palaces: Metro Architectural Tour & Russian Fine Arts',
      theme: 'Art, Architecture & Culture',
      pace: 'Relaxed',
      morning: {
        timeOfDay: 'Morning',
        title: 'The State Tretyakov Gallery',
        location: 'Lavrushinsky Lane, Zamoskvorechye',
        description: 'Explore the world’s foremost collection of Russian national art spanning 1,000 years. Admire Andrei Rublev’s Trinity icon, Ilya Repin’s masterworks, Ivan Shishkin’s mystical pine forests, and Mikhail Vrubel’s Demon.',
        entryFeeRUB: 700,
        entryFeeINR: 665,
        isFree: false,
        transitTip: 'Metro to Tretyakovskaya (Line 6/8). A short scenic walk through autumn cobblestone lanes.',
        foodSuggestion: 'Café inside Tretyakov or nearby "Bratya Karavaevy" (Karavaev Brothers bakery-café, fantastic salmon pies & coffee ~400 RUB).',
        insiderTip: 'Rent an English audio guide (400 RUB) to appreciate the dramatic stories behind Russian historic paintings.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Moscow Metro "Palaces for the People" Architectural Safari',
        location: 'Ring Line (Koltsevaya) & Line 3',
        description: 'Moscow Metro stations are subterranean museums of marble, bronze chandeliers, and stained glass. Tour the most breathtaking stations with a single metro fare: Mayakovskaya (Art Deco), Komsomolskaya (baroque yellow ceilings & mosaics), Novoslobodskaya (stained glass), and Ploshchad Revolyutsii (bronze statues).',
        entryFeeRUB: 65,
        entryFeeINR: 62,
        isFree: false,
        transitTip: 'Use your Troika card. Stay inside the paid turnstile zone to visit all stations on 1 fare (65 RUB)! Rub the nose of the border guard’s dog statue at Ploshchad Revolyutsii for good travel luck.',
        foodSuggestion: 'Try a hot cheese khachapuri at an authentic Georgian bakery stall near Kievskaya station (~250 RUB).',
        insiderTip: 'Travel between 1:00 PM and 3:30 PM to avoid rush hour crowds and photograph stations freely.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Old Arbat Street Promenade & Evening Cafes',
        location: 'Arbat Pedestrian Street',
        description: 'Stroll down Moscow’s historic 1-kilometer pedestrian promenade, once home to poets Pushkin and Okudzhava. Browse antique stores, street buskers playing Russian ballads, and artists painting portraits under heritage street lamps.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Metro to Arbatskaya or Smolenskaya.',
        foodSuggestion: 'Dinner at Mu-Mu on Arbat (tray-service buffet with comforting beef stroganoff, buckwheat kasha, and fresh berry mors ~550 RUB / ₹520).',
        insiderTip: 'Visit the Viktor Tsoi Memorial Wall on Arbat, an iconic tribute to the Soviet rock pioneer.',
      },
      dayTotalEstimatedRUB: 1965,
      dayTotalEstimatedINR: 1865,
    },
    {
      dayNumber: 4,
      date: '23 October 2026',
      dayOfWeek: 'Friday',
      city: 'Moscow',
      headline: 'Soviet Space Dreams at VDNKh & An Evening at the Bolshoi Area',
      theme: 'Cosmonautics & High Culture',
      pace: 'Moderate',
      morning: {
        timeOfDay: 'Morning',
        title: 'VDNKh Architectural Park & Soviet Pavilions',
        location: 'Prospekt Mira, VDNKh Metro',
        description: 'Discover the colossal Exhibition of Achievements of National Economy (VDNKh). Walk among monumental pavilions representing Soviet republics, gilded fountains (Friendship of Peoples), and the iconic 24-meter "Worker and Kolkhoz Woman" stainless steel sculpture.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Metro Line 6 to VDNKh station. The grounds are expansive; rent an electric scooter or take the park shuttle.',
        foodSuggestion: 'Cosmo-lunch: try retro Russian meat pastries (pirozhki) and tea in the central food avenue (~300 RUB).',
        insiderTip: 'The park grounds are completely free to enter and make for stunning retro-futurist photos.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Memorial Museum of Cosmonautics',
        location: 'Base of the 107-meter Monument to the Conquerors of Space',
        description: 'Russia pioneered the space age! Stand before Sputnik-1, Yuri Gagarin’s Vostok capsule, Soviet lunar rover Lunokhod, spacesuits, and the preserved taxidermy of legendary space dogs Belka and Strelka.',
        entryFeeRUB: 500,
        entryFeeINR: 475,
        isFree: false,
        transitTip: 'Located right next to VDNKh metro exit.',
        foodSuggestion: 'Try authentic space food from the museum’s novelty vending machines (food in tubes: borscht or cottage cheese ~400 RUB)!',
        insiderTip: 'One of the best-curated space museums in the world; exhibits feature clear English signage.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Theatre Square, Bolshoi Facade & Optional Opera/Ballet',
        location: 'Teatralnaya Square',
        description: 'Return to central Moscow. Admire the neoclassic colonnade and Apollo quadriga of the world-famous Bolshoi Theatre. If you booked in advance, enjoy an evening ballet or opera at Bolshoi New Stage or the nearby Stanislavsky Theatre.',
        entryFeeRUB: 2500,
        entryFeeINR: 2375,
        isFree: false,
        transitTip: 'Metro to Teatralnaya. (Note: Performance ticket optional ~2,500 RUB; gazing at the exterior is free!).',
        foodSuggestion: 'Post-theatre supper at "Cheburek.me" or "Marukame" for a warm noodle bowl (~450 RUB).',
        insiderTip: 'Bolshoi tickets go on sale 60-90 days prior on bolshoi.ru. Upper tier seats are as affordable as 2,000–3,000 RUB.',
      },
      dayTotalEstimatedRUB: 3950,
      dayTotalEstimatedINR: 3750,
    },
    {
      dayNumber: 5,
      date: '24 October 2026',
      dayOfWeek: 'Saturday',
      city: 'Moscow',
      headline: 'Panoramic Moscow, Cathedral of the Saviour & Izmailovo Flea Market',
      theme: 'Panoramas & Folk Souvenir Hunting',
      pace: 'Moderate',
      morning: {
        timeOfDay: 'Morning',
        title: 'Cathedral of Christ the Saviour & Patriarchal Bridge',
        location: 'Volkhonka Street, Kropotkinskaya',
        description: 'Visit the tallest Orthodox cathedral in the world with gleaming golden domes rising 103 meters. Step inside to admire monumental frescoes and polished marble walls. Walk onto the pedestrian Patriarchal Bridge for one of the finest views of the Kremlin walls.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Metro to Kropotkinskaya (Line 1).',
        foodSuggestion: 'Bakery breakfast near Kropotkinskaya: warm Syrniki (quark cottage cheese pancakes with condensed milk ~300 RUB).',
        insiderTip: 'Modest attire required inside Orthodox churches (long pants, remove caps; women usually cover heads with a scarf).',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Sparrow Hills (Vorobyovy Gory) & Moscow State University',
        location: 'Vorobyovy Gory Viewpoint',
        description: 'Take the metro to Vorobyovy Gory (the station built directly into a bridge over the Moskva River!). Ascend through the nature park to the observation deck. View the 1953 Stalinist skyscraper of Moscow State University and gaze out over the Moscow skyline and Luzhniki Olympic Stadium.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Metro to Vorobyovy Gory or Universitet. Cable car across the river is available for 350 RUB.',
        foodSuggestion: 'Street food kiosk on the terrace: hot spiced tea (sbiten) and gingerbread (~200 RUB).',
        insiderTip: 'Breathtaking autumn foliage across the river valley in late October.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Izmailovo Wooden Kremlin & Souvenir Flea Market (Vernisazh)',
        location: 'Izmailovo (directly behind your hotel!)',
        description: 'Vibrant fairy-tale wooden fortress. Explore the weekend artisan market for the finest Russian souvenirs: hand-painted Matryoshka nesting dolls, lacquer boxes from Palekh, amber jewelry from Kaliningrad, Soviet vintage badges, and woolen Orenburg shawls at true local prices.',
        entryFeeRUB: 100,
        entryFeeINR: 95,
        isFree: false,
        transitTip: '2-minute walk from Vega Izmailovo Hotel.',
        foodSuggestion: 'Dinner at the open-air charcoal grills inside Izmailovo: Caucasian Shashlik (grilled skewers) with marinated onions and lavash bread (~600 RUB / ₹570).',
        insiderTip: 'Bargaining is accepted at the flea market section! Bring cash rubles.',
      },
      dayTotalEstimatedRUB: 1600,
      dayTotalEstimatedINR: 1520,
    },
    {
      dayNumber: 6,
      date: '25 October 2026',
      dayOfWeek: 'Sunday',
      city: 'St. Petersburg',
      headline: 'Sapsan Bullet Train to Venice of the North & Majestic Nevsky Prospekt',
      theme: 'High-Speed Intercity Journey',
      pace: 'Relaxed',
      morning: {
        timeOfDay: 'Morning',
        title: 'Sapsan Express High-Speed Bullet Train',
        location: 'Moscow Leningradsky Station ➔ St. Petersburg Moskovsky Station',
        description: 'Board Russia’s premier high-speed train "Sapsan" (Train #760, departing 09:30). Cruise smoothly through birch forests and lakes at 250 km/h. Arrive in imperial St. Petersburg at 13:20 (3 hours 50 minutes total).',
        entryFeeRUB: 3500,
        entryFeeINR: 3325,
        isFree: false,
        transitTip: 'Pre-book on rzd.ru or tutu.travel 45-60 days before travel. Free tea/coffee in Comfort Class.',
        foodSuggestion: 'Breakfast in the dining car on Sapsan (porridge, croissant, and Russian tea ~400 RUB).',
        insiderTip: 'Keep your passport handy when boarding the train; Russian rail conductors check ID against tickets.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Hotel Check-In & Nevsky Prospekt Grand Walk',
        location: 'Station Hotel Premier V18 ➔ Nevsky Prospekt',
        description: 'Walk or short 5-minute taxi to Station Hotel Premier V18 near Nevsky. Unpack and refresh. Step out onto Nevsky Prospekt, the legendary avenue commissioned by Peter the Great. Marvel at grand 18th and 19th-century European baroque and neoclassical facades.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Purchase a St. Petersburg "Podorozhnik" contactless transport card (deposit 80 RUB, load 500 RUB).',
        foodSuggestion: 'Lunch at Teremok on Nevsky: Russia’s premier crepe eatery! Try a savory blini with chicken/mushrooms and rich mushroom soup with croutons (~450 RUB / ₹425).',
        insiderTip: 'St. Petersburg is completely flat and best explored on foot; wear waterproof walking shoes.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Kazan Cathedral & Singer House (Dom Knigi)',
        location: 'Nevsky Prospekt at Griboyedov Canal',
        description: 'Gaze up at the 96 Corinthian columns of Kazan Cathedral, inspired by St. Peter’s Basilica in Rome. Enter to hear Orthodox choral chants. Cross the canal to the Art Nouveau Singer Sewing Machine Company building (Dom Knigi), crowned by its illuminated glass globe.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Walking distance along Nevsky.',
        foodSuggestion: 'Café René on the 2nd floor of Singer House overlooking Kazan Cathedral: hot chocolate and apple strudel (~550 RUB).',
        insiderTip: 'Dom Knigi is the ultimate place to buy artistic postcards, art books, and Russian literary souvenirs.',
      },
      dayTotalEstimatedRUB: 4450,
      dayTotalEstimatedINR: 4225,
    },
    {
      dayNumber: 7,
      date: '26 October 2026',
      dayOfWeek: 'Monday',
      city: 'St. Petersburg',
      headline: 'The Grand Hermitage: 3 Million Masterpieces & The Tsars’ Winter Palace',
      theme: 'Imperial Grandeur & Fine Art',
      pace: 'Moderate',
      morning: {
        timeOfDay: 'Morning',
        title: 'Palace Square, Alexander Column & The Winter Palace',
        location: 'Palace Square (Dvortsovaya Ploshchad)',
        description: 'Stand in Russia’s most magnificent imperial square. Stand beneath the 47-meter Alexander Column (standing unsupported by pure gravity). Approach the turquoise, gold, and white baroque facade of the Winter Palace, residence of the Russian Tsars from 1732 to 1917.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: '15-minute walk along Nevsky or bus 7/24 to Admiralteyskaya.',
        foodSuggestion: 'Quick breakfast near Admiralteyskaya: fresh curd rolls and espresso (~280 RUB).',
        insiderTip: 'The Winter Palace entry slot 11:00 AM should be booked on tickets.hermitagemuseum.org 2-3 weeks in advance.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'The State Hermitage Museum Inside Tour',
        location: 'Winter Palace & Small Hermitage',
        description: 'Walk through the gilded Jordan Staircase, Malachite Hall, and St. George’s Hall of the Throne. View two genuine Leonardo da Vinci paintings (Benois Madonna and Madonna Litta), works by Rembrandt (The Return of the Prodigal Son), Michelangelo sculptures, and the mechanical golden Peacock Clock.',
        entryFeeRUB: 700,
        entryFeeINR: 665,
        isFree: false,
        transitTip: 'Located inside the Winter Palace complex. Wear comfortable shoes (exhibit paths stretch over 20 km!).',
        foodSuggestion: 'Hermitage Café on ground floor for a light sandwich and Russian tea (~400 RUB).',
        insiderTip: 'Take a break around 2:30 PM in the Italian skylight room to rest your feet.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'General Staff Building (Impressionist Wing) & Moika River Walk',
        location: 'General Staff Building, south side of Palace Square',
        description: 'Cross the square into the modern wing housing the legendary Shchukin & Morozov collections of Impressionists: Claude Monet, Renoir, Degas, Van Gogh, and entire halls dedicated to Henri Matisse (The Dance) and Pablo Picasso.',
        entryFeeRUB: 500,
        entryFeeINR: 475,
        isFree: false,
        transitTip: 'Directly across Palace Square through the Triumphal Arch.',
        foodSuggestion: 'Dinner at "Pelmeniya" on the Fontanka River: taste dumplings from around the world (Siberian pelmeni, Georgian khinkali, Italian ravioli, Japanese gyoza ~650 RUB / ₹615).',
        insiderTip: 'The General Staff Building has far fewer crowds in the late afternoon and offers sublime natural light.',
      },
      dayTotalEstimatedRUB: 2150,
      dayTotalEstimatedINR: 2040,
    },
    {
      dayNumber: 8,
      date: '27 October 2026',
      dayOfWeek: 'Tuesday',
      city: 'St. Petersburg',
      headline: 'Jeweled Mosaics, Golden Domes & The Rasputin Mystery at Yusupov Palace',
      theme: 'Mosaics & Romanov Legends',
      pace: 'Moderate',
      morning: {
        timeOfDay: 'Morning',
        title: 'Church of the Savior on Spilled Blood',
        location: 'Griboyedov Canal Embankment',
        description: 'Built on the exact spot where Tsar Alexander II was assassinated in 1881. The interior features over 7,500 square meters of intricate glass mosaics covering every inch of walls and soaring domes. Outside, its enamel jewel-like domes gleam over the canal.',
        entryFeeRUB: 450,
        entryFeeINR: 425,
        isFree: false,
        transitTip: 'Walk along the scenic canal from Nevsky Prospekt.',
        foodSuggestion: 'Pyshki on Bolshaya Konyushennaya No. 25: St. Petersburg’s oldest Soviet doughnut shop (operating continuously since 1958!). Warm crispy ring donuts with powdered sugar and milky coffee for just 120 RUB (~₹115)!',
        insiderTip: 'Look up at the central dome to see the colossal mosaic of the "Christ Pantocrator".',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'St. Isaac’s Cathedral & Colonnade 360° Panorama',
        location: 'St. Isaac’s Square',
        description: 'One of the largest domed cathedrals on Earth, decorated with 43 types of stone, malachite columns, and lapis lazuli. Climb the 262 spiral stone steps of the outer Colonnade for an unrivaled 360-degree aerial panorama over the Neva River, naval Admiralty spire, and city rooftops.',
        entryFeeRUB: 750,
        entryFeeINR: 710,
        isFree: false,
        transitTip: 'Cathedral entry 450 RUB + Colonnade ticket 300 RUB.',
        foodSuggestion: 'Lunch at Marketplace on Nevsky: bustling open-kitchen European market with fresh grilled chicken, pastas, and salads (~500 RUB / ₹475).',
        insiderTip: 'Bring your windproof jacket for the colonnade walk; St. Petersburg winds off the Baltic can be brisk.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Yusupov Palace on the Moika (Where Rasputin Met His End)',
        location: 'Moika River Embankment 94',
        description: 'Tour the opulent private residence of the ultra-wealthy Prince Felix Yusupov. Admire the private rococo theatre and royal state halls. Descend into the chilling vaulted cellar where Grigori Rasputin was poisoned and shot on December 30, 1916.',
        entryFeeRUB: 750,
        entryFeeINR: 710,
        isFree: false,
        transitTip: '12-minute walk from St. Isaac’s Square.',
        foodSuggestion: 'Dinner at "Khachapuri & Wine" (famous Petersburg chain, aromatic baked cheese bread, lobio beans, and Georgian lemonade ~700 RUB / ₹665).',
        insiderTip: 'Choose the "State Rooms + Rasputin Exhibition" combo ticket at the palace ticket desk.',
      },
      dayTotalEstimatedRUB: 2750,
      dayTotalEstimatedINR: 2610,
    },
    {
      dayNumber: 9,
      date: '28 October 2026',
      dayOfWeek: 'Wednesday',
      city: 'St. Petersburg',
      headline: 'Tsarskoye Selo (Pushkin): The Fabled Amber Room of Catherine Palace',
      theme: 'Imperial Country Estates',
      pace: 'Relaxed',
      morning: {
        timeOfDay: 'Morning',
        title: 'Suburban Train to Pushkin (Tsarskoye Selo)',
        location: 'Vitebsky Station ➔ Detskoye Selo (Pushkin)',
        description: 'Depart from St. Petersburg’s gorgeous Vitebsky art-nouveau train station. Take the comfortable suburban commuter train (Elektrichka, 30 mins, 55 RUB) to Tsarskoye Selo, where the Russian imperial family spent their summers.',
        entryFeeRUB: 110,
        entryFeeINR: 105,
        isFree: false,
        transitTip: 'Vitebsky station has direct trains every 15-20 minutes. Local bus 371 from Pushkin station stops at the palace gates.',
        foodSuggestion: 'Pick up warm berry pastries and a thermos of hot tea at Vitebsky station before boarding (~250 RUB).',
        insiderTip: 'Vitebsky station itself was Russia’s first railway terminal and looks like a palace with its cast-iron curves.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Catherine Palace & The Legendary Amber Room',
        location: 'Tsarskoye Selo, Pushkin',
        description: 'Gasp at the breathtaking turquoise and gold facade. Step into the Great Hall lined with gilded mirrors and windows. Enter the world-renowned "Eighth Wonder of the World" — the Amber Room, crafted from six tons of genuine Baltic amber panels and gold leaf.',
        entryFeeRUB: 1400,
        entryFeeINR: 1330,
        isFree: false,
        transitTip: 'Palace entrance ticket includes timed admission to the Amber Room.',
        foodSuggestion: 'Warm lunch at "Tsarskoselskaya Trapeza" or cozy bakery near the park (~550 RUB).',
        insiderTip: 'Photography is strictly prohibited inside the Amber Room to protect the resin panels.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Golden Autumn Walk in Catherine Park & Return to City',
        location: 'Catherine Park, Great Pond & Grotto',
        description: 'Stroll around the Great Pond framed by Russian linden trees in late autumn shades. View the Cameron Gallery, Marble Bridge, and Turkish Bath pavilion. Take the evening electric train back to St. Petersburg.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Return train back to Vitebsky station.',
        foodSuggestion: 'Cozy dinner back in St. Petersburg at "Mama Roma" or "Teremok" with hot borsch soup, garlic pampushka bread, and sweet cheese pancakes (~600 RUB / ₹570).',
        insiderTip: 'Late October parks in Pushkin are quiet, serene, and free from the peak summer tourist crowds.',
      },
      dayTotalEstimatedRUB: 2600,
      dayTotalEstimatedINR: 2470,
    },
    {
      dayNumber: 10,
      date: '29 October 2026',
      dayOfWeek: 'Thursday',
      city: 'St. Petersburg',
      headline: 'Birthplace of the City & Imperial Fabergé Easter Eggs',
      theme: 'Foundations & Imperial Treasures',
      pace: 'Moderate',
      morning: {
        timeOfDay: 'Morning',
        title: 'Peter & Paul Fortress and Saints Peter & Paul Cathedral',
        location: 'Hare Island (Zayachy Ostrov)',
        description: 'Cross the wooden bridge onto Hare Island where Peter the Great founded St. Petersburg on May 27, 1703. Enter the Cathedral with its 122-meter golden needle spire. Pay respects at the marble tombs of almost every Russian Tsar from Peter the Great to the last Emperor Nicholas II.',
        entryFeeRUB: 600,
        entryFeeINR: 570,
        isFree: false,
        transitTip: 'Metro Line 2 to Gorkovskaya station.',
        foodSuggestion: 'Breakfast near Gorkovskaya: try Russian curd tarts and cappuccino (~300 RUB).',
        insiderTip: 'Witness the traditional daily noon cannon salute fired from Naryshkin Bastion at exactly 12:00 PM!',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'The Fabergé Museum in Shuvalov Palace',
        location: 'Fontanka River Embankment 21',
        description: 'The world’s greatest private collection of Peter Carl Fabergé works. Marvel at nine historic Imperial Easter Eggs commissioned by Tsars Alexander III and Nicholas II as lavish Easter gifts for their wives, alongside enameled snuff boxes, clocks, and silver dinner services.',
        entryFeeRUB: 500,
        entryFeeINR: 475,
        isFree: false,
        transitTip: '10-minute walk from Nevsky Prospekt along the Fontanka river.',
        foodSuggestion: 'Afternoon coffee at the palace’s aristocratic tea salon (~350 RUB).',
        insiderTip: 'The Coronation Egg with a miniature gold carriage inside that actually rolls is the crown jewel of the collection.',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Farewell Gala Dinner & Illuminated Bridges of the Neva',
        location: 'St. Petersburg Canal Embankments & Nevsky',
        description: 'Spend your final evening admiring the illuminated drawbridges over the wide Neva River and the silhouette of the Peter and Paul Fortress. Reflect on an unforgettable 10-night solo expedition through Russia.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Short walk or Yandex Go taxi (~250 RUB).',
        foodSuggestion: 'Farewell Dinner: Treat yourself to a hearty Russian feast at "Restoran Katyusha" on Nevsky: Authentic Beef Stroganoff with wild forest mushrooms, crispy potatoes, and seabuckthorn tea (~1,400 RUB / ₹1,330).',
        insiderTip: 'In late October, navigation closes on the Neva soon, so evening river walks offer a quiet, romantic ambiance.',
      },
      dayTotalEstimatedRUB: 2850,
      dayTotalEstimatedINR: 2705,
    },
    {
      dayNumber: 11,
      date: '30 October 2026',
      dayOfWeek: 'Friday',
      city: 'Transit',
      headline: 'Eliseev Delicacies, Return to Moscow/Airport & Flight to India',
      theme: 'Souvenirs & Safe Journey Home',
      pace: 'Relaxed',
      morning: {
        timeOfDay: 'Morning',
        title: 'Eliseev Emporium Gourmet Shopping & Packing',
        location: 'Nevsky Prospekt 56',
        description: 'Step into the lavish Art Nouveau Eliseev Emporium with animated mechanical window displays and grand stained glass. Pick up gourmet Russian souvenirs: Alenka chocolates, Russian sea buckthorn tea, Tula spiced gingerbreads, and pine nut sweets.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Walking distance from your hotel. Hotel check-out by 11:30 AM (free luggage storage until departure).',
        foodSuggestion: 'Coffee and freshly baked apple tart inside Eliseev under the giant crystal pineapple chandelier (~400 RUB).',
        insiderTip: 'Airport customs allows up to 250 grams of factory-sealed caviar and plenty of boxed chocolates per traveler.',
      },
      afternoon: {
        timeOfDay: 'Afternoon',
        title: 'Express Journey to Airport (Sapsan to Moscow or SPb Pulkovo)',
        location: 'Moskovsky Station ➔ Moscow SVO (or Pulkovo LED direct)',
        description: 'Board the early afternoon Sapsan back to Moscow (3h 40m) and connect to Aeroexpress to Sheremetyevo Airport (SVO) (or if booked Open-Jaw, take express bus 39 directly from Moskovskaya to Pulkovo LED airport in 20 minutes).',
        entryFeeRUB: 4050,
        entryFeeINR: 3845,
        isFree: false,
        transitTip: 'Arrive at the international departure terminal 3 hours before your scheduled flight.',
        foodSuggestion: 'Pre-flight light dinner at airport food court (~600 RUB).',
        insiderTip: 'Return your Troika or Podorozhnik cards at the station ticket window if you want your 150/80 RUB deposit back!',
      },
      evening: {
        timeOfDay: 'Evening',
        title: 'Homeward Flight to India (Moscow ➔ Delhi ➔ Visakhapatnam)',
        location: 'SVO Terminal C Departure (19:40 PM)',
        description: 'Board your overnight Aeroflot flight SU-232 back to New Delhi. Land at Delhi T3 at 04:20 AM on Oct 31, clear Indian immigration, collect bags, and connect to your Air India / IndiGo flight AI-451 home to Visakhapatnam (VTZ) arriving at 13:25 PM with cherished memories.',
        entryFeeRUB: 0,
        entryFeeINR: 0,
        isFree: true,
        transitTip: 'Wear your warm layers until boarding the Delhi flight; cabin is pleasantly heated.',
      },
      dayTotalEstimatedRUB: 4650,
      dayTotalEstimatedINR: 4415,
    },
  ],

  budgetCategories: [
    {
      id: 'flights',
      category: 'International & Domestic Flights',
      estimatedCostINR: 68000,
      estimatedCostRUB: 71580,
      percentOfBudget: 13.6,
      isConfirmedOrEstimated: 'Estimated',
      notes: 'Visakhapatnam (VTZ) ⇄ New Delhi ⇄ Moscow Sheremetyevo (SVO) with Air India & Aeroflot. Includes 23 kg checked luggage + 7 kg cabin on all legs.',
      optimizationAdvice: 'Booking 4 to 6 months prior can drop airfare to ~₹59,000 via Air Arabia or Gulf Air.',
      icon: 'Plane',
    },
    {
      id: 'visa',
      category: 'Russian E-Visa & Mandatory Insurance',
      estimatedCostINR: 7500,
      estimatedCostRUB: 7895,
      percentOfBudget: 1.5,
      isConfirmedOrEstimated: 'Current Official Fee',
      notes: 'Official Russian MFA Unified E-Visa fee ($52 USD ~ ₹4,500) + Mandatory travel medical insurance with €30,000 coverage valid in RF (~₹2,500) + bank gateway charges (~₹500).',
      optimizationAdvice: 'Apply strictly on official portal evisa.kdmid.ru to avoid agent surcharges.',
      icon: 'ShieldCheck',
    },
    {
      id: 'hotels',
      category: 'Accommodation (10 Nights)',
      estimatedCostINR: 38000,
      estimatedCostRUB: 40000,
      percentOfBudget: 7.6,
      isConfirmedOrEstimated: 'Market Average',
      notes: '5 nights in Moscow (Vega Izmailovo 4-Star @ ₹3,800/night = ₹19,000) + 5 nights in St. Petersburg (Station Hotel Premier 4-Star @ ₹3,700/night = ₹18,500 + registration fees). Safe, heated, central, near metro.',
      optimizationAdvice: 'Choose private en-suite rooms in boutique design hostels (like Netizen Moscow or Soul Kitchen) to save ₹12,000 total without sacrificing comfort.',
      icon: 'Building2',
    },
    {
      id: 'food',
      category: 'Food, Dining & Cafes (11 Days)',
      estimatedCostINR: 20000,
      estimatedCostRUB: 21050,
      percentOfBudget: 4.0,
      isConfirmedOrEstimated: 'Estimated',
      notes: 'Average daily food allowance ₹1,818 (approx 1,910 RUB/day). Covers breakfast (at hotel/bakery), hearty cafeteria lunch at Stolovaya 57 / Mu-Mu / Teremok (~400-600 RUB), dinner at authentic restaurants (~800-1,200 RUB), plus coffees and snacks.',
      optimizationAdvice: 'Stolovayas (Soviet-style self-service canteens) offer full 3-course warm meals for 350-450 RUB.',
      icon: 'UtensilsCrossed',
    },
    {
      id: 'transport',
      category: 'Intercity Rail & Local Transport',
      estimatedCostINR: 14000,
      estimatedCostRUB: 14735,
      percentOfBudget: 2.8,
      isConfirmedOrEstimated: 'Estimated',
      notes: 'Includes Round-trip Sapsan High-Speed Express train (Moscow ⇄ St. Petersburg ~₹6,800), Aeroexpress airport trains (4 trips ~₹2,100), Moscow Troika & SPb Podorozhnik metro passes (~₹2,500), and Yandex Go taxi contingency (~₹2,600).',
      optimizationAdvice: 'Overnight sleeper train (Grand Express or Red Arrow) saves one night of hotel stay and provides a classic Russian rail experience.',
      icon: 'Train',
    },
    {
      id: 'sightseeing',
      category: 'Sightseeing & Museum Entry Fees',
      estimatedCostINR: 12500,
      estimatedCostRUB: 13160,
      percentOfBudget: 2.5,
      isConfirmedOrEstimated: 'Current Official Fee',
      notes: 'Armoury Chamber (1,200 RUB), St. Basil’s (700 RUB), Hermitage Winter Palace (700 RUB), General Staff (500 RUB), Catherine Palace & Amber Room (1,400 RUB), Church of Spilled Blood (450 RUB), St. Isaac’s & Colonnade (750 RUB), Peter & Paul Cathedral (600 RUB), Fabergé Museum (500 RUB), Cosmonautics Museum (500 RUB), Tretyakov Gallery (700 RUB), Izmailovo (100 RUB), plus audio guides.',
      optimizationAdvice: 'Under 18s and full-time ISIC students get free or 50% discount at most federal Russian museums with valid ID.',
      icon: 'Landmark',
    },
    {
      id: 'shopping',
      category: 'Shopping & Russian Souvenirs',
      estimatedCostINR: 15000,
      estimatedCostRUB: 15790,
      percentOfBudget: 3.0,
      isConfirmedOrEstimated: 'Estimated',
      notes: 'Hand-painted wooden Matryoshka nesting dolls, Russian chocolate boxes, Tula gingerbread, Kaliningrad amber pendant, Orenburg down shawl, imperial porcelain mug.',
      optimizationAdvice: 'Buy Matryoshkas at Izmailovo Market on weekends instead of tourist souvenir shops on Arbat (50% cheaper).',
      icon: 'ShoppingBag',
    },
    {
      id: 'emergency',
      category: 'Emergency & Miscellaneous Contingency',
      estimatedCostINR: 23500,
      estimatedCostRUB: 24740,
      percentOfBudget: 4.7,
      isConfirmedOrEstimated: 'Estimated',
      notes: 'Local Russian SIM card with 30GB data (Yota/MTS/Megafon ~700 RUB / ₹665), luggage storage, cloakroom tips, pharmacy items, and buffer for unexpected taxi rides or schedule adjustments.',
      optimizationAdvice: 'Keep emergency cash in crisp $100 bills safely in an interior neck pouch.',
      icon: 'HelpCircle',
    },
  ],
};

// Summary metrics helper
export function getPlanSummary() {
  const totalEstimatedINR = TRAVEL_PLAN.budgetCategories.reduce((sum, c) => sum + c.estimatedCostINR, 0);
  const totalBudgetINR = TRAVEL_PLAN.traveler.totalBudgetINR;
  const remainingSurplusINR = totalBudgetINR - totalEstimatedINR;
  const dailyCostINR = Math.round(totalEstimatedINR / TRAVEL_PLAN.traveler.totalDays);
  const costPerPersonINR = totalEstimatedINR;
  const totalEstimatedRUB = Math.round(totalEstimatedINR / TRAVEL_PLAN.traveler.rubleRateINR);
  const remainingSurplusRUB = Math.round(remainingSurplusINR / TRAVEL_PLAN.traveler.rubleRateINR);

  return {
    totalBudgetINR,
    totalEstimatedINR,
    remainingSurplusINR,
    dailyCostINR,
    costPerPersonINR,
    totalEstimatedRUB,
    remainingSurplusRUB,
    savingsPercentage: ((remainingSurplusINR / totalBudgetINR) * 100).toFixed(1),
  };
}
