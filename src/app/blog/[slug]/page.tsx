import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostSections } from "@/components/BlogPostSections";
import { getCoreMirrorBlogPostBySlug } from "@/lib/coreMirrorBlogMock";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getCoreMirrorBlogPostBySlug(slug);

  if (!post) return { title: "Blog post | Villa4You" };

  return {
    title: `${post.title} | Villa4You Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Villa4You Blog`,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getCoreMirrorBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <BlogPostSections post={post} />
    </div>
  );
}
