import Link from "next/link";
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
        <section className="relative isolate overflow-hidden bg-[#2b1b11] px-5 pb-24 pt-24 text-white sm:px-8 lg:px-10">
          {post.image ? <img src={post.image} alt={post.title} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-42" /> : null}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1d130c] via-[#1d130c]/88 to-[#1d130c]/38" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#fffaf2] to-transparent" />

          <div className="mx-auto max-w-5xl">
            <Link href="/blog" className="text-sm font-bold text-[#efbd73] transition hover:text-white">← Back to journal</Link>
            {post.category ? <p className="premium-eyebrow mt-8 text-[#efbd73]">{post.category}</p> : null}
            <h1 className="display-font mt-5 text-6xl font-semibold leading-[.95] tracking-[-.055em] md:text-8xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84">{post.excerpt}</p>
            {post.author_name ? (
              <p className="mt-6 text-sm font-bold text-white/70">
                By {post.author_name}{post.author_role ? ` — ${post.author_role}` : ""}
              </p>
            ) : null}
          </div>
        </section>

        <section className="bg-[#fffaf2] px-5 pb-24 pt-8 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
            <main>
              {post.quick_answer ? (
                <div className="premium-card rounded-[2rem] p-6 md:p-8">
                  <p className="premium-eyebrow">Quick answer</p>
                  <p className="mt-4 text-lg leading-8 text-[#5d4b3e]">{post.quick_answer}</p>
                </div>
              ) : null}

              {post.takeaways?.length ? (
                <div className="premium-card mt-6 rounded-[2rem] p-6 md:p-8">
                  <p className="premium-eyebrow">Key takeaways</p>
                  <ul className="mt-5 grid gap-3 text-base leading-8 text-[#5d4b3e]">
                    {post.takeaways.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 text-[#d79a44]">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="premium-card mt-6 rounded-[2rem] p-6 md:p-10">
                <div className="prose-travel max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
              </div>
            </main>

            <aside className="h-fit rounded-[2rem] border border-[#eadbc8] bg-white p-6 shadow-[0_18px_54px_rgba(58,37,22,.08)] lg:sticky lg:top-24">
              <p className="premium-eyebrow">Need help planning?</p>
              <h2 className="display-font mt-4 text-4xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11]">
                Turn this advice into a real trip.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#75675d]">
                We can build a private route around your dates, comfort style, and the experiences you want most.
              </p>
              <Link href="/contact" className="premium-btn mt-6 w-full bg-[#2b1b11] text-white hover:bg-[#d79a44] hover:text-[#1d130c]">
                Ask us directly <span>→</span>
              </Link>
              <div className="mt-6 border-t border-[#eadbc8] pt-6 text-sm leading-7 text-[#75675d]">
                <p><strong className="text-[#2b1b11]">Updated:</strong> {post.updated_label || post.published_at}</p>
                {post.reviewed_by ? <p><strong className="text-[#2b1b11]">Reviewed by:</strong> {post.reviewed_by}</p> : null}
              </div>
            </aside>
          </div>
        </section>
      </article>

      <CTA />
    </>
  );
}
