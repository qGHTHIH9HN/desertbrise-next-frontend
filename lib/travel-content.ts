export type Destination = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  query: string;
  highlights: string[];
  mood: string;
  bestFor: string;
};

export type TravelStyle = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  query: string;
  highlights: string[];
  feeling: string;
  bestFor: string;
};

const img = (file: string) => `https://www.desertbrise-travel.com/public/assets/uploads/services/${file}`;

export const destinations: Destination[] = [
  {
    slug: "sahara-desert",
    name: "Sahara Desert",
    eyebrow: "Silence, stars and golden dunes",
    title: "The Sahara, designed for emotion and comfort.",
    description:
      "Soft dunes, private camps, camel moments, firelight, and quiet desert mornings. This is for travelers who want Morocco to feel unforgettable, not rushed.",
    image: img("service_1781398268_f3a09cd6.webp"),
    query: "desert",
    highlights: ["Private desert camps", "Camel and 4x4 routes", "Sunset and stargazing", "Slow Sahara rhythm"],
    mood: "Warm, cinematic, spiritual and deeply calm.",
    bestFor: "Couples, families, photographers, first-time Sahara travelers and people seeking silence.",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    eyebrow: "Red city, gardens and hidden riads",
    title: "Marrakech with depth, not pressure.",
    description:
      "Medina colors, gardens, rooftops, food, artisans, and handpicked riads. We shape Marrakech with a calm route so it feels beautiful instead of overwhelming.",
    image: img("service_1781549776_520d3124.webp"),
    query: "marrakech",
    highlights: ["Medina and souks", "Riad stays", "Food and artisan moments", "Calm local guidance"],
    mood: "Colorful, refined, alive and sensory.",
    bestFor: "Culture lovers, first-time visitors, couples, luxury travelers and short Morocco escapes.",
  },
  {
    slug: "atlas-mountains",
    name: "Atlas Mountains",
    eyebrow: "Villages, valleys and mountain air",
    title: "Mountain journeys with human warmth.",
    description:
      "Walks, Berber villages, high passes, valleys, kasbahs and wide views. Perfect for travelers who want nature, authenticity and movement without losing comfort.",
    image: img("service_1781550982_a1d6df16.webp"),
    query: "atlas",
    highlights: ["High Atlas scenery", "Village encounters", "Light hikes and views", "Kasbah stays"],
    mood: "Fresh, grounding, scenic and real.",
    bestFor: "Hikers, families, nature lovers and travelers who want Morocco beyond cities.",
  },
  {
    slug: "chefchaouen-fes",
    name: "Chefchaouen & Fes",
    eyebrow: "Blue streets and ancient medinas",
    title: "Northern Morocco full of soul and history.",
    description:
      "Chefchaouen’s blue alleys, Fes craftsmanship, Roman ruins, spiritual medinas and northern landscapes come together in a slow, deeply cultural route.",
    image: img("service_1781125359_f6361011.webp"),
    query: "chefchaouen",
    highlights: ["Blue city walks", "Fes artisans", "Volubilis ruins", "Northern landscapes"],
    mood: "Poetic, historic, photogenic and meaningful.",
    bestFor: "Culture seekers, photographers, families and travelers wanting northern Morocco.",
  },
  {
    slug: "essaouira-coast",
    name: "Essaouira & Atlantic Coast",
    eyebrow: "Ocean wind, seafood and relaxed endings",
    title: "A soft Atlantic finish after the intensity of Morocco.",
    description:
      "Essaouira brings sea air, ramparts, whitewashed streets, seafood, art, and a peaceful rhythm. It is a beautiful ending to a desert or city journey.",
    image: img("service_1781472705_61f04236.webp"),
    query: "essaouira",
    highlights: ["Atlantic coast", "Seafood and medina", "Ramparts and sunsets", "Relaxed travel pace"],
    mood: "Breezy, peaceful, creative and restorative.",
    bestFor: "Couples, families, food lovers and travelers who want a calm final chapter.",
  },
  {
    slug: "casablanca-rabat",
    name: "Casablanca & Rabat",
    eyebrow: "Gateway cities with imperial elegance",
    title: "Start Morocco with clarity and style.",
    description:
      "Casablanca and Rabat can become more than transfer stops: ocean views, Hassan II Mosque, royal avenues, gardens, history and a smooth beginning or ending.",
    image: img("service_1781204826_37bf31dd.webp"),
    query: "casablanca",
    highlights: ["Hassan II Mosque", "Rabat heritage", "Ocean-side moments", "Smooth arrival logistics"],
    mood: "Elegant, structured, modern and easy.",
    bestFor: "Travelers arriving through Casablanca, families, first-time visitors and grand Morocco routes.",
  },
];

export const travelStyles: TravelStyle[] = [
  {
    slug: "private-luxury",
    name: "Private Luxury",
    eyebrow: "Comfort, beauty and personal service",
    title: "A refined Morocco journey without losing authenticity.",
    description:
      "Private drivers, handpicked riads, elegant camps, calm pacing and carefully chosen experiences. Luxury here means comfort with real human connection.",
    image: img("service_1781550039_3d324056.webp"),
    query: "luxury",
    highlights: ["Private driver", "Selected riads", "Premium camps", "Calm itinerary rhythm"],
    feeling: "Smooth, elegant, safe and deeply cared for.",
    bestFor: "Couples, families, honeymooners and travelers who want comfort with meaning.",
  },
  {
    slug: "desert-trekking",
    name: "Desert Trekking",
    eyebrow: "Walking, silence and Sahara depth",
    title: "Desert trekking that feels human, safe and transformative.",
    description:
      "Walk through dunes, camp under stars, meet nomadic rhythms and feel the desert slowly. Built for people who want presence, not only sightseeing.",
    image: img("service_1781200162_f8ec6b23.webp"),
    query: "trek",
    highlights: ["Guided desert walks", "Nomad-style camps", "Camel support", "Slow Sahara immersion"],
    feeling: "Grounded, simple, powerful and unforgettable.",
    bestFor: "Hikers, retreat groups, nature lovers and travelers wanting a deeper Sahara experience.",
  },
  {
    slug: "family-friendly",
    name: "Family Friendly",
    eyebrow: "Safe, flexible and easy for everyone",
    title: "Morocco made comfortable for families.",
    description:
      "Balanced routes, safe transport, child-friendly pacing, easy stops, memorable activities and enough flexibility so the trip feels joyful, not exhausting.",
    image: img("service_1780589455_840360ba.webp"),
    query: "family",
    highlights: ["Flexible timing", "Safe private transport", "Kid-friendly stops", "Comfortable stays"],
    feeling: "Relaxed, protected, fun and memorable.",
    bestFor: "Families with children or teenagers, multi-generation groups and first-time Morocco trips.",
  },
  {
    slug: "culture-food",
    name: "Culture & Food",
    eyebrow: "Medinas, artisans and shared tables",
    title: "Taste Morocco through people, craft and story.",
    description:
      "Cooking, markets, artisans, medinas, villages and shared meals. This style is for travelers who want to understand Morocco through daily life.",
    image: img("service_1781549348_514b0f71.webp"),
    query: "food",
    highlights: ["Cooking experiences", "Artisan visits", "Medina walks", "Local food moments"],
    feeling: "Warm, colorful, generous and close to real life.",
    bestFor: "Food lovers, culture seekers, couples and travelers who enjoy slow discovery.",
  },
  {
    slug: "romantic-escape",
    name: "Romantic Escape",
    eyebrow: "Soft moments, privacy and beauty",
    title: "A private Morocco escape for two.",
    description:
      "Beautiful riads, desert sunsets, private dinners, hammam, slow mornings and routes designed around connection, comfort and unforgettable atmosphere.",
    image: img("service_1781550407_b570a7aa.webp"),
    query: "romantic",
    highlights: ["Private stays", "Sunset moments", "Soft pacing", "Special dinners"],
    feeling: "Intimate, warm, cinematic and peaceful.",
    bestFor: "Couples, honeymooners, anniversaries and travelers celebrating something special.",
  },
  {
    slug: "adventure-nature",
    name: "Adventure & Nature",
    eyebrow: "Mountains, gorges and wide landscapes",
    title: "Active Morocco with comfort at the end of the day.",
    description:
      "Atlas valleys, gorges, desert tracks, oases and nature routes with enough comfort to make adventure feel exciting but never chaotic.",
    image: img("service_1781398996_1b9d3b8a.webp"),
    query: "adventure",
    highlights: ["Atlas routes", "Gorges and oases", "Scenic drives", "Active but balanced pace"],
    feeling: "Open, energetic, scenic and refreshing.",
    bestFor: "Active travelers, photographers, nature lovers and friends traveling together.",
  },
];

export function findDestination(slug: string) {
  return destinations.find((item) => item.slug === slug);
}

export function findTravelStyle(slug: string) {
  return travelStyles.find((item) => item.slug === slug);
}
