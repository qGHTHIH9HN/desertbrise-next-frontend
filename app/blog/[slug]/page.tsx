import Image from "next/image";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { getPost } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { post } = await getPost(slug);
    return {
      title: post.meta_title || `${post.title} | DesertBrise Travel`,
      description: post.meta_description || post.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = await getPost(slug);
  } catch {
    notFound();
  }

  const post = data.post;

  return (
    <>
      <article>
        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {post.category ? <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-700">{post.category}</p> : null}
            <h1 className="mt-4 text-4xl font-black tracking-tight text-stone-950 md:text-6xl">{post.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">{post.excerpt}</p>
            {post.author_name ? <p className="mt-5 text-sm text-stone-500">By {post.author_name}{post.author_role ? ` — ${post.author_role}` : ""}</p> : null}
          </div>
        </section>

        {post.image ? (
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <div className="relative h-[28rem] overflow-hidden rounded-[2.5rem] bg-stone-200 shadow-xl">
              <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
            </div>
          </div>
        ) : null}

        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
            {post.quick_answer ? (
              <div className="mb-10 rounded-2xl bg-[#f8f1e7] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Quick answer</p>
                <p className="mt-3 text-base leading-8 text-stone-700">{post.quick_answer}</p>
              </div>
            ) : null}

            {post.takeaways?.length ? (
              <div className="mb-10 rounded-2xl border border-stone-200 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Key takeaways</p>
                <ul className="mt-4 grid gap-3 text-sm leading-7 text-stone-700">
                  {post.takeaways.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            ) : null}

            <div className="prose-travel max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </section>
      </article>
      <CTA />
    </>
  );
}
