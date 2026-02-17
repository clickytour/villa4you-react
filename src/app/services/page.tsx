import type { Metadata } from "next";
import { ServicesIndexSections } from "@/components/ServicesIndexSections";
import { getServicesList } from "@/lib/servicesDataSource";

export const metadata: Metadata = {
  title: "Services | Villa4You",
  description: "Service marketplace powered by local Core mirror data.",
};

export default async function ServicesPage() {
  const services = await getServicesList();
  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <ServicesIndexSections services={services} />
    </div>
  );
}
