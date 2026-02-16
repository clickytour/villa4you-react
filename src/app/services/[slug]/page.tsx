import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailSections } from "@/components/ServiceDetailSections";
import { getCoreMirrorServiceBySlug } from "@/lib/coreMirrorServicesMock";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getCoreMirrorServiceBySlug(slug);
  if (!service) return { title: "Service | Villa4You" };
  return {
    title: `${service.name} | Villa4You Services`,
    description: service.excerpt,
    openGraph: {
      title: `${service.name} | Villa4You Services`,
      description: service.excerpt,
      images: [service.image],
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getCoreMirrorServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <ServiceDetailSections service={service} />
    </div>
  );
}
