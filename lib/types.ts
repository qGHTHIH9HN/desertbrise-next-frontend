export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  link_primary: string;
  label_primary: string;
  link_secondary: string;
  label_secondary: string;
};

export type ServiceCard = {
  id: number;
  title: string;
  slug: string;
  url: string;
  url_base: string;
  excerpt: string;
  location: string;
  duration: string;
  price: number;
  group_type: string;
  journey_style: string;
  best_for: string;
  image: string;
  meta_title?: string;
  meta_description?: string;
};

export type ServiceDetail = ServiceCard & {
  content: string;
  hero_intro: string;
  availability_text: string;
  stay_info: string;
  transport_info: string;
  departure_type: string;
  highlight_1: string;
  highlight_2: string;
  highlight_3: string;
  images: Array<{ id: number; image: string; alt: string }>;
  itinerary: Array<{ day_number: number; title: string; details: string; location: string; meals: string; accommodation: string }>;
  faqs: Array<{ question: string; answer: string }>;
  includes: Array<{ label: string; type: string }>;
  reviews: Array<{ name: string; rating: number; content: string; created_at: string }>;
};

export type BlogCard = {
  id: number;
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  category: string;
  published_at: string;
  image: string;
  meta_title?: string;
  meta_description?: string;
};

export type BlogPost = BlogCard & {
  content: string;
  quick_answer: string;
  takeaways: string[];
  author_name: string;
  author_role: string;
  reviewed_by: string;
  updated_label: string;
};
