import { BigTitle } from "@/components/site/BigTitle";
import { plannedPosts, posts } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on software engineering, AI applications, developer experience, and how agents change the way software gets built.",
};

export default function BlogPage() {
  return (
    <div className="pb-28">
      <BigTitle as="h1">writing</BigTitle>
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <p data-reveal className="text-base leading-relaxed text-muted">
          Technical notes on software, AI engineering, and developer experience.
          Nothing published yet.
        </p>

        {posts.length > 0 ? (
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <li key={post.slug} data-reveal className="py-6">
                <p className="text-[11px] lowercase text-muted">
                  {post.category} · {post.date} · {post.readingTime}
                </p>
                <h2 className="mt-2 text-xl tracking-[-0.03em]">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        <section className="mt-16">
          <h2 data-reveal className="text-[11px] lowercase text-muted">
            planned notes
          </h2>
          <ul className="mt-5">
            {plannedPosts.map((title) => (
              <li
                key={title}
                data-reveal
                className="border-t border-border py-3 text-sm text-muted"
              >
                {title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
