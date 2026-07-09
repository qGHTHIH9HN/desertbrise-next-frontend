import Image from "next/image";
import Link from "next/link";
import type { BlogCard as BlogCardType } from "@/lib/types";

export function BlogCard({ post }: { post: BlogCardType }) {
  return (
    <Link href={post.url || `/blog/${post.slug}`} className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-stone-200">
        {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" /> : null}
      </div>
      <div className="p-6">
        {post.category ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">{post.category}</p> : null}
        <h3 className="mt-3 text-xl font-bold tracking-tight text-stone-950 group-hover:text-amber-800">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-stone-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
