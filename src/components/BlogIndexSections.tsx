import { coreMirrorBlogPosts } from "@/lib/coreMirrorBlogMock";

export function BlogIndexSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
        <p className="text-sm text-slate-500">Home › <span className="font-semibold text-slate-700">Blog</span></p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900">Villa4you Blog</h1>
        <p className="mt-2 text-lg text-slate-600">Local mirror blog template. Content-ready for Core-driven posts.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coreMirrorBlogPosts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              <img src={post.coverImage} alt={post.title} className="h-40 w-full object-cover" />
              <div className="p-3">
                <p className="text-xs text-slate-500">{post.publishedAt} · {post.category}</p>
                <h3 className="mt-1 text-xl font-semibold leading-tight text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="mt-3 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Read</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
