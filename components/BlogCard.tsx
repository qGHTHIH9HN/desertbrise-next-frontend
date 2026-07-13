import Image from "next/image";
import Link from "next/link";
import type { BlogCard as BlogCardType } from "@/lib/types";

export function BlogCard({ post }: { post: BlogCardType }) {
  return (
    <Link href={post.url || `/blog/${post.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden bg-stone-200">
        {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(min-width: 1024px) 33vw, 100vw" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent" />
        {post.category ? <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-amber-800">{post.category}</span> : null}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black tracking-tight text-stone-950 group-hover:text-amber-800">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-stone-600">{post.excerpt}</p>
        <p className="mt-5 text-sm font-black text-stone-950">Read guide →</p>
      </div>
    </Link>
  );
}
