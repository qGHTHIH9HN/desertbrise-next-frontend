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
  original_price?: number;
  discount_percent?: number;
  group_type: string;
  journey_style: string;
  best_for: string;
  image: string;
  meta_title?: string;
  meta_description?: string;
};

export type ServiceImage = { id: number; image: string; alt: string; sort_order?: number };
export type ItineraryDay = {
  id?: number;
  day_number: number;
  title: string;
  details: string;
  location: string;
  meals: string;
  included?: string;
  accommodation: string;
  image?: string;
};
export type ServiceFaq = { question: string; answer: string };
export type ServiceInclude = { id?: number; title: string; details: string; type?: string; is_active?: number };
export type ServiceReview = { name: string; rating: number; title?: string; content: string; operator_reply?: string; created_at: string };
export type ServiceDeparture = { id: number; start_date: string; end_date: string; status: string; price: number; available_seats: number };

export type ServiceDetail = ServiceCard & {
  content: string;
  hero_intro: string;
  availability_text: string;
  availability_type?: string;
  duration_days?: number;
  max_future_days?: number;
  child_rate?: number;
  wetravel_uuid?: string;
  stay_info: string;
  transport_info: string;
  departure_type: string;
  highlight_1: string;
  highlight_2: string;
  highlight_3: string;
  highlights?: string[];
  guidance_type?: string;
  adventure_type?: string;
  budget_class?: string;
  images: ServiceImage[];
  itinerary: ItineraryDay[];
  faqs: ServiceFaq[];
  includes: ServiceInclude[];
  reviews: ServiceReview[];
  review_summary?: { total: number; average: number };
  departures?: ServiceDeparture[];
  related_services?: ServiceCard[];
  related_posts?: BlogCard[];
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

export type BlogFaq = { question: string; answer: string };

export type BlogPost = BlogCard & {
  content: string;
  quick_answer: string;
  takeaways: string[];
  author_name: string;
  author_role: string;
  reviewed_by: string;
  updated_label: string;
  tags?: string;
  faqs?: BlogFaq[];
  featured_tours?: ServiceCard[];
  related_posts?: BlogCard[];
};

export type CmsPageCard = {
  id: number;
  title: string;
  slug: string;
  url: string;
  page_type: "hub" | "style" | "default" | string;
  excerpt: string;
  hero_subtitle: string;
  image: string;
  secondary_image?: string;
  meta_title?: string;
  meta_description?: string;
  updated_at?: string;
};

export type CmsPageFaq = { question: string; answer: string };
export type CmsPageLandmark = { title: string; description: string; image?: string; sort_order?: number };
export type CmsPageExperience = { title: string; description: string; icon?: string; image?: string; sort_order?: number };
export type CmsPageStyleSection = { section_key: string; title?: string; subtitle?: string; body?: string; sort_order?: number };
export type CmsPageStyleItem = { title: string; description: string; icon?: string; image?: string; sort_order?: number };

export type CmsPage = CmsPageCard & {
  hero_image: string;
  intro_image: string;
  surprise_image?: string;
  why_visit_title?: string;
  why_visit_text?: string;
  landmarks_title?: string;
  experiences_title?: string;
  tours_title?: string;
  guides_title?: string;
  faq_title?: string;
  landmarks_text?: string;
  experiences_text?: string;
  itinerary_text?: string;
  audience_text?: string;
  surprise_title?: string;
  surprise_text?: string;
  cta_title?: string;
  cta_text?: string;
  cta_button_text?: string;
  cta_button_url?: string;
  content?: string;
  landmarks?: CmsPageLandmark[];
  experiences?: CmsPageExperience[];
  faqs?: CmsPageFaq[];
  services?: ServiceCard[];
  posts?: BlogCard[];
  style_sections?: Record<string, CmsPageStyleSection>;
  style_items?: Record<string, CmsPageStyleItem[]>;
};

export type BookingPayload = {
  service_id: number;
  name: string;
  email: string;
  phone?: string;
  adults: number;
  children: number;
  total_price?: number;
  preferred_date?: string;
  pickup_place?: string;
  travel_style?: string;
  message: string;
  departure_id?: number | string;
};
