import type { BlogCard, BlogPost, HeroSlide, ServiceCard, ServiceDetail } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_PHP_API_BASE || "http://localhost/public/api";

type ApiPagination = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    next: { revalidate: 300 },
    headers: { Accept: "application/json", ...(init?.headers || {}) },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${url}`);
  }

  return res.json() as Promise<T>;
}

export async function getHome(): Promise<{
  ok: boolean;
  brand: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  hero_slides: HeroSlide[];
  services: ServiceCard[];
  posts: BlogCard[];
}> {
  return getJson("/home.php");
}

export async function getServices(params: Record<string, string | number> = {}): Promise<{
  ok: boolean;
  items: ServiceCard[];
  pagination: ApiPagination;
}> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => qs.set(key, String(value)));
  return getJson(`/services.php${qs.size ? `?${qs.toString()}` : ""}`);
}

export async function getService(slug: string): Promise<{ ok: boolean; service: ServiceDetail }> {
  return getJson(`/service.php?slug=${encodeURIComponent(slug)}`);
}

export async function getBlog(params: Record<string, string | number> = {}): Promise<{
  ok: boolean;
  items: BlogCard[];
  pagination: ApiPagination;
}> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => qs.set(key, String(value)));
  return getJson(`/blog.php${qs.size ? `?${qs.toString()}` : ""}`);
}

export async function getPost(slug: string): Promise<{ ok: boolean; post: BlogPost }> {
  return getJson(`/post.php?slug=${encodeURIComponent(slug)}`);
}
