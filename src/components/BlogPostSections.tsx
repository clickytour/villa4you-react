import type { CoreMirrorBlogPost } from "@/lib/coreMirrorBlogMock";

export function BlogPostSections({ post }: { post: CoreMirrorBlogPost }) {
  return (
    <section className="mx-auto max-w-[980px] px-4 pb-10 pt-4">
      <article className="rounded-2xl border border-slate-300 bg-white p-6 md:p-8">
        <p className="text-sm text-slate-500">Blog / {post.category}</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">{post.title}</h1>
        <p className="mt-2 text-sm text-slate-500">Published: {post.publishedAt}</p>
        <img src={post.coverImage} alt={post.title} className="mt-4 h-[360px] w-full rounded-xl object-cover" />

        <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
          {post.content.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {post.relatedPropertySlug && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-700">Related property:</p>
            <a href={`/property/${post.relatedPropertySlug}`} className="mt-1 inline-flex text-sm font-semibold text-blue-700 hover:underline">
              View related property page
            </a>
          </div>
        )}
      </article>
    </section>
  );
}
