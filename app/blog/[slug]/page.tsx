import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { TourCard } from "@/components/TourCard";
import { CTA } from "@/components/CTA";
import { getBlog, getPost, getServices } from "@/lib/api";
import { dateLabel, plainText } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };
type TocItem = { id: string; text: string };

function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const updated = (html || "").replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, inner) => {
    const text = plainText(inner);
    const id = `section-${toc.length + 1}`;
    toc.push({ id, text });
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html: updated, toc };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { post } = await getPost(slug);
    return { title: post.meta_title || `${post.title} | DesertBrise Travel`, description: post.meta_description || post.excerpt };
  } catch {
    return {};
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = await getPost(slug);
  } catch {
    notFound();
  }

  const post = data.post;
  const { html, toc } = addHeadingIds(post.content || "");

  const [fallbackTours, fallbackPosts] = await Promise.all([
    getServices({ per_page: 6 }).catch(() => null),
    getBlog({ per_page: 6 }).catch(() => null),
  ]);

  const featuredTours = (post.featured_tours?.length ? post.featured_tours : fallbackTours?.items || []).slice(0, 3);
  const relatedPosts = (post.related_posts?.length ? post.related_posts : (fallbackPosts?.items || []).filter((item) => item.id !== post.id)).slice(0, 3);

  return (
    <>
      <section className="bg-[#fffaf2] px-5 py-14 sm:px-8 lg:px-10">
        <article className="mx-auto max-w-7xl">
          <div className="rounded-[2.4rem] border border-[#eadbc8] bg-white p-6 shadow-[0_18px_54px_rgba(58,37,22,.07)] md:p-10">
            <div className="flex flex-wrap gap-3 text-sm font-bold text-[#75675d]">
              <Link href="/blog" className="text-[#8b541f]">← Travel Journal</Link>
              {post.category ? <span>{post.category}</span> : null}
              {post.published_at ? <span>{dateLabel(post.published_at)}</span> : null}
            </div>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.95] tracking-[-.055em] text-[#2b1b11] md:text-8xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#75675d]">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#75675d]">
              {post.author_name ? <span>By <strong className="text-[#2b1b11]">{post.author_name}</strong></span> : null}
              {post.reviewed_by ? <span>Reviewed by <strong className="text-[#2b1b11]">{post.reviewed_by}</strong></span> : null}
              {post.updated_label ? <span>{post.updated_label}</span> : null}
            </div>
            {post.image ? (
              <div className="mt-9 h-[28rem] overflow-hidden rounded-[2rem] bg-[#dac9b7]">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              </div>
            ) : null}
          </div>
        </article>
      </section>

      <section className="bg-[#fffaf2] px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_340px]">
          <main>
            {post.quick_answer ? (
              <div className="premium-card rounded-[2rem] p-7 md:p-9">
                <p className="premium-eyebrow">Quick answer</p>
                <p className="mt-4 text-lg leading-8 text-[#4f463f]">{post.quick_answer}</p>
              </div>
            ) : null}

            {post.takeaways?.length ? (
              <div className="premium-card mt-6 rounded-[2rem] p-7 md:p-9">
                <p className="premium-eyebrow">Key takeaways</p>
                <div className="mt-5 grid gap-3">
                  {post.takeaways.map((takeaway, index) => (
                    <div key={`${takeaway}-${index}`} className="flex gap-3 rounded-2xl bg-[#fffaf2] p-4 text-sm font-bold leading-6 text-[#2b1b11]">
                      <span className="text-[#d79a44]">0{index + 1}</span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <article className="premium-card mt-6 rounded-[2rem] p-7 md:p-11">
              <div className="prose-travel max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
            </article>

            {post.faqs?.length ? (
              <section className="mt-12">
                <p className="premium-eyebrow">FAQ</p>
                <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Questions from travelers.</h2>
                <div className="mt-8 grid gap-4">
                  {post.faqs.filter((faq) => faq.question && faq.answer).map((faq) => (
                    <details key={faq.question} className="premium-card rounded-[1.4rem] p-6 open:bg-white">
                      <summary className="cursor-pointer text-base font-extrabold text-[#2b1b11]">{faq.question}</summary>
                      <p className="mt-4 text-sm leading-7 text-[#75675d]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </main>

          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            {toc.length ? (
              <div className="premium-card rounded-[1.6rem] p-6">
                <p className="premium-eyebrow">On this page</p>
                <ol className="mt-4 grid gap-3 text-sm font-bold leading-6 text-[#75675d]">
                  {toc.map((item, index) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="hover:text-[#8b541f]">{index + 1}. {item.text}</a>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {featuredTours.length ? (
              <div className="premium-card rounded-[1.6rem] p-6">
                <p className="premium-eyebrow">Featured tours</p>
                <div className="mt-5 grid gap-4">
                  {featuredTours.map((tour) => (
                    <Link key={tour.id} href={tour.url} className="group grid grid-cols-[92px_1fr] gap-3 rounded-2xl bg-[#fffaf2] p-3">
                      <div className="h-20 overflow-hidden rounded-xl bg-[#dac9b7]">{tour.image ? <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" /> : null}</div>
                      <div>
                        <h3 className="clamp-2 text-sm font-extrabold leading-5 text-[#2b1b11] group-hover:text-[#8b541f]">{tour.title}</h3>
                        <p className="mt-1 text-xs text-[#75675d]">{tour.duration || tour.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {relatedPosts.length ? (
              <div className="premium-card rounded-[1.6rem] p-6">
                <p className="premium-eyebrow">Related articles</p>
                <div className="mt-5 grid gap-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} href={related.url} className="block rounded-2xl bg-[#fffaf2] p-4">
                      <h3 className="clamp-2 text-sm font-extrabold leading-5 text-[#2b1b11] hover:text-[#8b541f]">{related.title}</h3>
                      <p className="mt-2 clamp-2 text-xs leading-5 text-[#75675d]">{related.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {featuredTours.length ? (
        <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Tours mentioned in this guide</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#2b1b11]">Related journeys.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          </div>
        </section>
      ) : null}

      {relatedPosts.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Continue reading</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#2b1b11]">Related articles.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => <BlogCard key={related.id} post={related} />)}
            </div>
          </div>
        </section>
      ) : null}

      <CTA eyebrow="Need help choosing?" title="Tell us what you want to feel in Morocco." text="We will guide you toward the route, timing, and travel style that fits you best." />
    </>
  );
}
