export type Destination = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  secondaryImage: string;
  query: string;
  routeMood: string;
  bestTime: string;
  idealDuration: string;
  bestFor: string;
  highlights: string[];
  signatureExperiences: Array<{ title: string; text: string }>;
  planningNotes: Array<{ label: string; value: string }>;
  emotionalHook: string;
  faqs: Array<{ question: string; answer: string }>;
};

export type TravelStyle = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  secondaryImage: string;
  query: string;
  feeling: string;
  bestFor: string;
  pace: string;
  comfortLevel: string;
  idealDuration: string;
  highlights: string[];
  moments: Array<{ title: string; text: string }>;
  includedFeeling: Array<{ label: string; text: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

const img = (file: string) => `https://www.desertbrise-travel.com/public/assets/uploads/services/${file}`;

export const destinations: Destination[] = [
  {
    slug: "sahara-desert",
    name: "Sahara Desert",
    eyebrow: "Silence, stars and golden dunes",
    title: "Feel the Sahara slowly, privately and comfortably.",
    subtitle: "The desert is not only a place to visit. It is the moment travelers remember years later.",
    description:
      "Private camps, soft dunes, firelight, camel moments, 4x4 tracks, nomadic rhythm and skies full of stars. We shape the Sahara with enough comfort to feel safe, and enough silence to feel transformed.",
    image: img("service_1781398268_f3a09cd6.webp"),
    secondaryImage: img("service_1781200162_f8ec6b23.webp"),
    query: "desert",
    routeMood: "Warm, cinematic, spiritual and deeply calm.",
    bestTime: "October to April for the softest temperatures. May and September can work with careful pacing.",
    idealDuration: "3 to 5 days from Marrakech, or 5 to 7 days when combined with valleys and kasbahs.",
    bestFor: "Couples, families, photographers, retreat groups and travelers who want silence instead of a rushed desert stop.",
    highlights: ["Private desert camp", "Camel sunset", "Firelight dinner", "Stargazing", "Nomadic rhythm", "Slow sunrise"],
    emotionalHook:
      "The Sahara works when it is not treated like a checklist. The magic comes from the pause: tea before sunset, silence after dinner, and waking before the first light touches the dunes.",
    signatureExperiences: [
      { title: "Sunset without pressure", text: "Arrive early enough to slow down, settle into camp, and watch the colors change without rushing from the car to the camel." },
      { title: "A private camp feeling", text: "Comfortable bedding, calm service and a setting that lets the desert feel intimate instead of crowded." },
      { title: "Stars and firelight", text: "The evening is designed around atmosphere: dinner, music when appropriate, warm blankets and clear desert skies." },
      { title: "Desert route with meaning", text: "Kasbahs, oases, valleys and local stops can be woven into the journey so the Sahara feels connected to Morocco, not separate from it." },
    ],
    planningNotes: [
      { label: "Best route", value: "Marrakech → Dades or Skoura → Sahara → Ouarzazate or Ait Benhaddou → Marrakech" },
      { label: "Comfort tip", value: "One night in the desert is beautiful; two nights lets the body relax into the rhythm." },
      { label: "Good to know", value: "The long drive becomes enjoyable when broken with valleys, kasbahs, tea stops and scenic timing." },
    ],
    faqs: [
      { question: "Is the Sahara comfortable for first-time visitors?", answer: "Yes, when the camp and route are chosen properly. We focus on private transport, comfortable bedding, clear timing and a calm arrival." },
      { question: "Should I choose Merzouga or M’Hamid?", answer: "Merzouga is iconic and easier for many classic routes. M’Hamid feels wilder and deeper for travelers who want a more remote Sahara atmosphere." },
      { question: "How many days should I plan?", answer: "Three days is possible from Marrakech, but four or five days feel more comfortable and less rushed." },
    ],
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    eyebrow: "Red city, gardens and hidden riads",
    title: "Experience Marrakech with beauty, calm and local confidence.",
    subtitle: "Marrakech should feel alive and inspiring, not overwhelming.",
    description:
      "Hidden riads, quiet courtyards, gardens, rooftops, souks, artisans, hammam, food and warm evening light. We design Marrakech with a soft route so travelers feel guided, comfortable and curious.",
    image: img("service_1781549776_520d3124.webp"),
    secondaryImage: img("service_1781549348_514b0f71.webp"),
    query: "marrakech",
    routeMood: "Colorful, refined, sensory and full of life.",
    bestTime: "March to May and September to November are especially pleasant. Winter is also excellent for culture and food.",
    idealDuration: "2 to 4 nights depending on whether Marrakech is the start, middle or final chapter of your route.",
    bestFor: "Culture lovers, couples, first-time Morocco travelers, food lovers and travelers who enjoy beautiful stays.",
    highlights: ["Hidden riads", "Garden moments", "Food experiences", "Medina walks", "Artisan visits", "Rooftop sunsets"],
    emotionalHook:
      "The secret of Marrakech is not seeing everything. It is entering the city with the right rhythm: a quiet courtyard after the souk, a trusted guide, a rooftop at sunset and time to breathe.",
    signatureExperiences: [
      { title: "Medina without stress", text: "A calm local route through color, craft and story so the souks feel exciting instead of confusing." },
      { title: "Riad atmosphere", text: "Stay or dine in places where architecture, scent, light and silence create the emotion people expect from Marrakech." },
      { title: "Food and craft", text: "Markets, cooking, tea, spices and artisan workshops can turn the city into a human experience, not only sightseeing." },
      { title: "Soft endings", text: "Gardens, hammam, rooftops and private dinners help balance the city’s intensity with comfort." },
    ],
    planningNotes: [
      { label: "Best route", value: "Marrakech works beautifully before or after the Sahara, Atlas Mountains, Essaouira or a private grand tour." },
      { label: "Comfort tip", value: "Choose a calm riad location and plan medina time in focused blocks instead of all day wandering." },
      { label: "Good to know", value: "Marrakech is strongest when paired with quiet places: desert, mountains, gardens or coast." },
    ],
    faqs: [
      { question: "Is Marrakech safe for private travelers?", answer: "Yes, with the right planning, trusted transport and a calm local route. We avoid pressure and keep the experience comfortable." },
      { question: "How many nights are enough?", answer: "Two nights gives a taste; three or four nights allow gardens, food, hammam and nearby experiences without rushing." },
      { question: "Can Marrakech be part of a family trip?", answer: "Yes. We adjust timing, guide style, stops and activities so the city feels enjoyable for children and adults." },
    ],
  },
  {
    slug: "atlas-mountains",
    name: "Atlas Mountains",
    eyebrow: "Villages, valleys and mountain air",
    title: "Breathe deeper in the Atlas Mountains.",
    subtitle: "A softer Morocco of valleys, passes, villages, kasbahs and wide open views.",
    description:
      "The Atlas Mountains bring fresh air, scenic roads, walking paths, village warmth and the feeling of seeing Morocco from above. It is perfect for travelers who want nature and authenticity without losing comfort.",
    image: img("service_1781550982_a1d6df16.webp"),
    secondaryImage: img("service_1781398996_1b9d3b8a.webp"),
    query: "atlas",
    routeMood: "Fresh, grounding, scenic and real.",
    bestTime: "Spring and autumn are ideal. Summer can be good in higher valleys; winter is beautiful when routes are chosen carefully.",
    idealDuration: "1 to 3 days for light mountain discovery, or longer when combined with trekking and desert routes.",
    bestFor: "Nature lovers, walkers, families, photographers and travelers who want villages and landscapes beyond the cities.",
    highlights: ["High passes", "Village walks", "Kasbah stays", "Valley views", "Light trekking", "Fresh mountain air"],
    emotionalHook:
      "The mountains give the journey space. After medinas and long roads, the Atlas brings air, quiet and human encounters that make Morocco feel grounded.",
    signatureExperiences: [
      { title: "Scenic pass routes", text: "Travel through high roads with carefully timed viewpoints, tea stops and landscape changes." },
      { title: "Village connection", text: "Respectful encounters, local meals and walking routes that feel human rather than staged." },
      { title: "Kasbah atmosphere", text: "Stay or pause in places built from earth and history, with wide views and soft evening light." },
      { title: "Active but comfortable", text: "Walks can be gentle, scenic or more adventurous depending on your level and season." },
    ],
    planningNotes: [
      { label: "Best route", value: "Marrakech → High Atlas → Ait Benhaddou or valleys → Sahara, or a short mountain escape from Marrakech." },
      { label: "Comfort tip", value: "Private transport makes a big difference because timing, stops and altitude comfort can be adjusted." },
      { label: "Good to know", value: "Mountain weather changes quickly, so flexible planning is more important than a rigid schedule." },
    ],
    faqs: [
      { question: "Do I need to be very fit?", answer: "No. We can design anything from scenic drives and short walks to full trekking days." },
      { question: "Can the Atlas be combined with the desert?", answer: "Yes. The mountains are one of the most beautiful ways to reach or return from the Sahara." },
      { question: "Is it good for families?", answer: "Yes, especially with gentle walks, scenic stops and comfortable accommodation." },
    ],
  },
  {
    slug: "chefchaouen-fes",
    name: "Chefchaouen & Fes",
    eyebrow: "Blue streets and ancient medinas",
    title: "Northern Morocco with soul, craft and history.",
    subtitle: "A poetic route through blue alleys, Roman ruins, spiritual medinas and old craftsmanship.",
    description:
      "Chefchaouen gives beauty and calm; Fes gives depth, tradition and living heritage. Together they create a northern journey that feels slower, more cultural and deeply photogenic.",
    image: img("service_1781125359_f6361011.webp"),
    secondaryImage: img("service_1783452875_b8d2f3a2.webp"),
    query: "chefchaouen",
    routeMood: "Poetic, historic, photogenic and meaningful.",
    bestTime: "Spring and autumn are excellent. Winter can be atmospheric and quieter; summer needs softer pacing.",
    idealDuration: "3 to 5 days for Tangier, Chefchaouen, Volubilis, Meknes and Fes, or longer as part of a grand route.",
    bestFor: "Culture seekers, photographers, families and travelers who want a deeper northern Morocco chapter.",
    highlights: ["Blue city walks", "Fes artisans", "Volubilis ruins", "Northern landscapes", "Medina heritage", "Slow photography"],
    emotionalHook:
      "This route feels like Morocco opening old doors. The blue city softens the senses, then Fes brings the depth of craft, knowledge and living tradition.",
    signatureExperiences: [
      { title: "Chefchaouen slowly", text: "Enjoy the blue streets early or late when the light is soft and the city feels intimate." },
      { title: "Fes with a real guide", text: "Fes needs guidance. With the right route, it becomes a living museum of craft, food and spiritual history." },
      { title: "Roman and imperial layers", text: "Volubilis, Meknes and old city gates connect the northern route to Morocco’s historic depth." },
      { title: "Calm photography time", text: "The route allows quiet moments, not only quick stops for pictures." },
    ],
    planningNotes: [
      { label: "Best route", value: "Tangier or Casablanca → Chefchaouen → Volubilis → Meknes → Fes" },
      { label: "Comfort tip", value: "Fes is best explored with a trusted guide and a calm riad base." },
      { label: "Good to know", value: "Chefchaouen is beautiful but small; combine it with Fes for a richer journey." },
    ],
    faqs: [
      { question: "Is Chefchaouen worth the distance?", answer: "Yes when it is part of a northern route. It feels more meaningful when paired with Fes, Volubilis and Tangier or Casablanca." },
      { question: "Is Fes difficult to visit?", answer: "Fes is complex, but with a good guide it becomes one of Morocco’s most rewarding cultural experiences." },
      { question: "Can this route connect to the desert?", answer: "Yes. Fes to Merzouga is a classic route through the Middle Atlas toward the Sahara." },
    ],
  },
  {
    slug: "essaouira-coast",
    name: "Essaouira & Atlantic Coast",
    eyebrow: "Ocean wind, seafood and relaxed endings",
    title: "Let Morocco end with sea air and softness.",
    subtitle: "Essaouira is where many journeys exhale.",
    description:
      "Whitewashed streets, Atlantic wind, seafood, ramparts, art, music and relaxed coastal rhythm. Essaouira is perfect after Marrakech, the mountains or the Sahara when travelers want to slow down.",
    image: img("service_1781472705_61f04236.webp"),
    secondaryImage: img("service_1781550039_3d324056.webp"),
    query: "essaouira",
    routeMood: "Breezy, peaceful, creative and restorative.",
    bestTime: "Spring, autumn and winter are very pleasant. Summer is lively and windy, good for ocean atmosphere.",
    idealDuration: "1 to 3 nights depending on how much relaxation you want at the end of the route.",
    bestFor: "Couples, families, food lovers, artists, photographers and travelers who want a calm final chapter.",
    highlights: ["Atlantic ramparts", "Seafood", "Medina art", "Beach walks", "Sunset wind", "Relaxed pace"],
    emotionalHook:
      "After Morocco’s intensity, Essaouira gives a different emotion: open air, ocean sound and the comfort of moving slowly without missing anything.",
    signatureExperiences: [
      { title: "A coastal pause", text: "Unstructured time to walk, eat seafood, watch the port and feel the Atlantic atmosphere." },
      { title: "Art and medina lanes", text: "A softer medina rhythm with galleries, white walls, blue doors and relaxed exploration." },
      { title: "Food by the sea", text: "Fresh fish, simple lunches and ocean views make the day feel easy and generous." },
      { title: "A gentle ending", text: "Essaouira is ideal as a final chapter before returning to Marrakech or Casablanca." },
    ],
    planningNotes: [
      { label: "Best route", value: "Marrakech → Essaouira → Marrakech/Casablanca, or after a longer desert and city route." },
      { label: "Comfort tip", value: "Use it as a slow ending, not only a quick day trip if your itinerary allows." },
      { label: "Good to know", value: "The wind is part of the city’s character. Bring a light layer even in warm seasons." },
    ],
    faqs: [
      { question: "Is Essaouira good for families?", answer: "Yes. The pace is relaxed, the medina is easier than Marrakech, and beach walks are simple to enjoy." },
      { question: "Can it be a day trip?", answer: "Yes, but one or two nights gives a much better feeling of the city." },
      { question: "Is it good after the desert?", answer: "Very. The contrast between Sahara silence and Atlantic air creates a beautiful final rhythm." },
    ],
  },
  {
    slug: "casablanca-rabat",
    name: "Casablanca & Rabat",
    eyebrow: "Gateway cities with imperial elegance",
    title: "Begin Morocco smoothly, with elegance and clarity.",
    subtitle: "Arrival cities can feel beautiful when they are planned with intention.",
    description:
      "Casablanca and Rabat offer ocean views, royal avenues, gardens, historic monuments and a practical, comfortable beginning or ending to a private Morocco route.",
    image: img("service_1781204826_37bf31dd.webp"),
    secondaryImage: img("service_1783452660_f894cdc9.webp"),
    query: "casablanca",
    routeMood: "Elegant, structured, modern and easy.",
    bestTime: "Good year-round, especially as an arrival or departure chapter connected to northern or imperial routes.",
    idealDuration: "1 to 2 nights depending on flight timing and whether Rabat is included.",
    bestFor: "Travelers arriving through Casablanca, families, first-time visitors and grand Morocco routes.",
    highlights: ["Hassan II Mosque", "Rabat heritage", "Ocean views", "Royal avenues", "Smooth arrival", "Easy logistics"],
    emotionalHook:
      "These cities are often treated as transit points, but with the right timing they create a composed, elegant first impression of Morocco.",
    signatureExperiences: [
      { title: "Arrival without confusion", text: "Private airport pickup, a calm first transfer and a route that helps travelers settle in." },
      { title: "Hassan II Mosque", text: "One of Morocco’s most impressive monuments and a powerful first cultural moment." },
      { title: "Rabat’s calm elegance", text: "Gardens, royal avenues, old gates and ocean-side heritage bring a softer city feeling." },
      { title: "North or grand route gateway", text: "A practical starting point for Chefchaouen, Fes, Marrakech or full Morocco circuits." },
    ],
    planningNotes: [
      { label: "Best route", value: "Casablanca → Rabat → Chefchaouen/Fes, or Casablanca → Marrakech depending on flight plans." },
      { label: "Comfort tip", value: "Do not overload the first day after a long flight. Keep it elegant and calm." },
      { label: "Good to know", value: "Rabat often surprises travelers with its calm, clean and refined atmosphere." },
    ],
    faqs: [
      { question: "Should I skip Casablanca?", answer: "Not necessarily. It depends on your flight timing. The Hassan II Mosque and ocean setting can make it worthwhile." },
      { question: "Is Rabat worth visiting?", answer: "Yes for travelers who enjoy calm, elegant cities and imperial heritage without heavy crowds." },
      { question: "Can this connect to Chefchaouen and Fes?", answer: "Yes. Casablanca and Rabat work naturally as the beginning of a northern Morocco route." },
    ],
  },
];

export const travelStyles: TravelStyle[] = [
  {
    slug: "private-luxury",
    name: "Private Luxury",
    eyebrow: "Comfort, beauty and personal service",
    title: "Luxury Morocco travel with soul, not distance.",
    subtitle: "Private, elegant and deeply human — comfort without losing authenticity.",
    description:
      "Private drivers, refined riads, selected camps, calm pacing, carefully chosen experiences and personal support. Luxury here means being cared for while still feeling the real Morocco.",
    image: img("service_1781550039_3d324056.webp"),
    secondaryImage: img("service_1781550407_b570a7aa.webp"),
    query: "luxury",
    feeling: "Smooth, elegant, safe and deeply cared for.",
    bestFor: "Couples, honeymooners, families, mature travelers and anyone who wants comfort with meaning.",
    pace: "Slow to balanced, with private flexibility every day.",
    comfortLevel: "High comfort: selected stays, private transfers, soft timing and upgraded camp options.",
    idealDuration: "5 to 15 days depending on how much of Morocco you want to include.",
    highlights: ["Private driver", "Selected riads", "Premium camps", "Calm pacing", "Personal support", "Special moments"],
    moments: [
      { title: "Arrive cared for", text: "From the first airport pickup, the journey feels clear, private and calm." },
      { title: "Stay beautifully", text: "Riads, kasbahs and camps are chosen for atmosphere, comfort and location." },
      { title: "Experience privately", text: "Guides, meals, scenic stops and cultural moments are planned around your rhythm." },
      { title: "End without stress", text: "Transfers, timing and final nights are arranged so the journey closes smoothly." },
    ],
    includedFeeling: [
      { label: "Transport", text: "Private vehicle and professional local driver." },
      { label: "Stays", text: "Handpicked riads, kasbahs or camps based on your comfort level." },
      { label: "Experiences", text: "Private guided moments, food, culture, desert and scenic stops." },
      { label: "Support", text: "Human support before and during the journey." },
    ],
    faqs: [
      { question: "Does luxury mean disconnected from local life?", answer: "No. The goal is comfort with real connection: beautiful stays, thoughtful service and authentic moments." },
      { question: "Can this be fully customized?", answer: "Yes. Route, pace, hotel level, guiding and experiences are shaped around you." },
      { question: "Is it suitable for families?", answer: "Yes, especially because private timing and comfortable logistics make Morocco easier for families." },
    ],
  },
  {
    slug: "desert-trekking",
    name: "Desert Trekking",
    eyebrow: "Walking, silence and Sahara depth",
    title: "Walk the Sahara, not just photograph it.",
    subtitle: "For travelers who want presence, simplicity and a deeper desert rhythm.",
    description:
      "Guided desert walks, dunes, wild camps or comfortable camps, camel support, quiet evenings and local desert knowledge. This style is about slowing down enough to feel the Sahara.",
    image: img("service_1781200162_f8ec6b23.webp"),
    secondaryImage: img("service_1781398268_f3a09cd6.webp"),
    query: "trek",
    feeling: "Grounded, simple, powerful and unforgettable.",
    bestFor: "Hikers, retreat groups, nature lovers and travelers wanting a meaningful Sahara experience.",
    pace: "Slow and active, with walking adapted to season and fitness.",
    comfortLevel: "From simple nomadic-style camps to more comfortable desert camp options.",
    idealDuration: "3 to 7 days depending on walking level and desert depth.",
    highlights: ["Guided walks", "Camel support", "Starry camps", "Nomadic rhythm", "Silence", "Sunrise dunes"],
    moments: [
      { title: "Begin slowly", text: "The first walking day introduces the terrain, silence and desert rhythm gently." },
      { title: "Move with support", text: "Camels or vehicles can support luggage and logistics depending on route style." },
      { title: "Evening in the dunes", text: "Fire, dinner and sky become the emotional center of the day." },
      { title: "Wake with light", text: "Morning in the Sahara often becomes the most memorable moment of the trip." },
    ],
    includedFeeling: [
      { label: "Guidance", text: "Local desert guide and route planning." },
      { label: "Camp", text: "Desert camp style based on comfort level." },
      { label: "Meals", text: "Simple, warm meals adapted to the trek." },
      { label: "Safety", text: "Season-aware pacing and practical support." },
    ],
    faqs: [
      { question: "Do I need trekking experience?", answer: "Not always. Routes can be gentle or more advanced. The plan depends on your level and season." },
      { question: "Is it comfortable?", answer: "It can be simple or comfortable depending on the camp style you choose." },
      { question: "When is the best season?", answer: "October to April is best for walking in the desert." },
    ],
  },
  {
    slug: "family-friendly",
    name: "Family Friendly",
    eyebrow: "Safe, flexible and easy for everyone",
    title: "Morocco made comfortable for families.",
    subtitle: "Private pacing, safe logistics and experiences that keep everyone engaged.",
    description:
      "Balanced routes, comfortable transport, flexible timing, child-friendly stops, memorable activities and calm support. The goal is a trip parents can enjoy too.",
    image: img("service_1780589455_840360ba.webp"),
    secondaryImage: img("service_1782507486_bd3cd0d5.webp"),
    query: "family",
    feeling: "Relaxed, protected, fun and memorable.",
    bestFor: "Families with children or teenagers, multi-generation groups and first-time Morocco trips.",
    pace: "Flexible, with shorter intense days and enough rest time.",
    comfortLevel: "Comfort-focused, with private vehicle, easy stops and family-friendly accommodation.",
    idealDuration: "6 to 12 days for a balanced family Morocco route.",
    highlights: ["Private timing", "Safe driver", "Family activities", "Flexible stops", "Comfortable stays", "Easy meals"],
    moments: [
      { title: "No rushed mornings", text: "The day starts with enough time for breakfast, packing and family rhythm." },
      { title: "Activities with memory", text: "Camels, cooking, gardens, desert camp, light walks and medina moments are balanced." },
      { title: "Comfort between places", text: "Private transport means stops can happen when children or parents need them." },
      { title: "A journey for everyone", text: "The route avoids making adults feel like logistics managers all day." },
    ],
    includedFeeling: [
      { label: "Transport", text: "Private family-friendly vehicle and driver." },
      { label: "Pacing", text: "Flexible timing and realistic daily distances." },
      { label: "Activities", text: "Experiences chosen for different ages." },
      { label: "Support", text: "Help before and during the trip." },
    ],
    faqs: [
      { question: "Is Morocco good for children?", answer: "Yes, when the route is private, flexible and not overpacked." },
      { question: "Can you adjust for teenagers?", answer: "Yes. We can add adventure, photography, food, desert, shopping or cultural activities depending on their interests." },
      { question: "How do you handle long drives?", answer: "We break them with scenic stops, food, short visits and comfortable timing." },
    ],
  },
  {
    slug: "culture-food",
    name: "Culture & Food",
    eyebrow: "Medinas, artisans and shared tables",
    title: "Taste Morocco through people, craft and story.",
    subtitle: "Food and culture become the doorway into real local life.",
    description:
      "Cooking, markets, artisans, medinas, villages, tea, bread, spices and shared meals. This style is for travelers who want to understand Morocco through daily life.",
    image: img("service_1781549348_514b0f71.webp"),
    secondaryImage: img("service_1781551116_55874a5a.webp"),
    query: "food",
    feeling: "Warm, colorful, generous and close to real life.",
    bestFor: "Food lovers, culture seekers, couples and travelers who enjoy slow discovery.",
    pace: "Slow to balanced, with time for markets, workshops and meals.",
    comfortLevel: "Comfortable, authentic and guided by trusted local relationships.",
    idealDuration: "5 to 10 days depending on how many regions you include.",
    highlights: ["Cooking", "Markets", "Artisans", "Tea rituals", "Village meals", "Medina walks"],
    moments: [
      { title: "Enter the market", text: "The route begins with scent, color, ingredients and stories behind Moroccan food." },
      { title: "Meet the makers", text: "Craftspeople, cooks, guides and local families help the journey feel human." },
      { title: "Eat with context", text: "Meals are not just included; they become part of the story." },
      { title: "Take memory home", text: "Recipes, craft and cultural understanding stay with travelers after the trip." },
    ],
    includedFeeling: [
      { label: "Food", text: "Cooking, local meals or market experiences where available." },
      { label: "Guides", text: "Context-rich guiding in medinas and cultural places." },
      { label: "Craft", text: "Artisan visits shaped respectfully." },
      { label: "Pace", text: "Enough time to enjoy, not only sample." },
    ],
    faqs: [
      { question: "Can food experiences be private?", answer: "Yes, many can be arranged privately depending on the city and date." },
      { question: "Can dietary needs be handled?", answer: "Most needs can be planned for when shared early." },
      { question: "Is this good with children?", answer: "Yes, especially cooking, markets and hands-on cultural activities." },
    ],
  },
  {
    slug: "romantic-escape",
    name: "Romantic Escape",
    eyebrow: "Soft moments, privacy and beauty",
    title: "A private Morocco escape for two.",
    subtitle: "Desert sunsets, riad courtyards, private dinners and slow mornings.",
    description:
      "Beautiful stays, intimate pacing, hammam, desert atmosphere, soft evenings and thoughtful details. Designed for couples who want Morocco to feel personal and memorable.",
    image: img("service_1781550407_b570a7aa.webp"),
    secondaryImage: img("service_1781472705_61f04236.webp"),
    query: "romantic",
    feeling: "Intimate, warm, cinematic and peaceful.",
    bestFor: "Couples, honeymooners, anniversaries and travelers celebrating something special.",
    pace: "Slow and private, with space for beauty and quiet.",
    comfortLevel: "High comfort, with romantic stays and private services when available.",
    idealDuration: "5 to 10 days for a balanced romantic Morocco journey.",
    highlights: ["Private dinners", "Riad stays", "Desert sunset", "Hammam", "Coastal pause", "Soft pacing"],
    moments: [
      { title: "Begin beautifully", text: "A calm arrival and carefully chosen first stay sets the tone." },
      { title: "Share the desert", text: "Sunset, stars and camp atmosphere create the emotional center of the journey." },
      { title: "Slow down together", text: "Gardens, coast, hammam and private meals give the route intimacy." },
      { title: "Celebrate naturally", text: "Special details can be added without making the trip feel artificial." },
    ],
    includedFeeling: [
      { label: "Privacy", text: "Private route, transport and flexible timing." },
      { label: "Beauty", text: "Selected stays and emotional locations." },
      { label: "Moments", text: "Sunsets, dinners and soft experiences." },
      { label: "Care", text: "Planning around comfort and atmosphere." },
    ],
    faqs: [
      { question: "Can you plan honeymoon details?", answer: "Yes. We can shape stays, pacing and special moments around the occasion." },
      { question: "Is the desert romantic?", answer: "Very, when the camp is chosen carefully and the arrival is not rushed." },
      { question: "Can we include coast and desert?", answer: "Yes. Desert plus Essaouira creates a beautiful contrast for couples." },
    ],
  },
  {
    slug: "adventure-nature",
    name: "Adventure & Nature",
    eyebrow: "Mountains, gorges and wide landscapes",
    title: "Active Morocco with comfort at the end of the day.",
    subtitle: "For travelers who want movement, views and wild places without chaos.",
    description:
      "Atlas valleys, gorges, oases, desert tracks, scenic roads and optional walks. The route feels active and open, while still keeping comfort and planning under control.",
    image: img("service_1781398996_1b9d3b8a.webp"),
    secondaryImage: img("service_1781550982_a1d6df16.webp"),
    query: "adventure",
    feeling: "Open, energetic, scenic and refreshing.",
    bestFor: "Active travelers, photographers, nature lovers and friends traveling together.",
    pace: "Active but balanced, with rest built into the route.",
    comfortLevel: "Moderate to high comfort depending on accommodation choices.",
    idealDuration: "5 to 12 days depending on regions and activity level.",
    highlights: ["Atlas valleys", "Gorges", "Oases", "Desert tracks", "Scenic roads", "Optional hikes"],
    moments: [
      { title: "Move through landscapes", text: "The journey changes from mountains to valleys to desert and coast." },
      { title: "Choose your activity level", text: "Walks, scenic stops and routes are adapted to fitness and season." },
      { title: "Photograph wide places", text: "The itinerary gives enough time for light, views and unforced photography." },
      { title: "Rest well", text: "Adventure feels better when evenings are comfortable and organized." },
    ],
    includedFeeling: [
      { label: "Nature", text: "Routes through valleys, gorges, oases and desert landscapes." },
      { label: "Flexibility", text: "Activity adjusted to season and ability." },
      { label: "Transport", text: "Private vehicle for difficult distances." },
      { label: "Comfort", text: "Balanced stays after active days." },
    ],
    faqs: [
      { question: "Can this be soft adventure?", answer: "Yes. Adventure can mean scenic exploration, not only hard trekking." },
      { question: "What is the best season?", answer: "Spring and autumn are best for active routes; winter can be excellent in the south." },
      { question: "Can we include the desert?", answer: "Yes. Desert tracks, oases and gorges are natural parts of this style." },
    ],
  },
];

export function findDestination(slug: string) {
  return destinations.find((item) => item.slug === slug);
}

export function findTravelStyle(slug: string) {
  return travelStyles.find((item) => item.slug === slug);
}
