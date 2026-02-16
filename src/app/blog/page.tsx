import type { Metadata } from "next";
import { BlogIndexSections } from "@/components/BlogIndexSections";

export const metadata: Metadata = {
  title: "Blog | Villa4You",
  description: "Guides and insights from Villa4You. Local mirror template ready for Core-driven content.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <BlogIndexSections />
    </div>
  );
}
