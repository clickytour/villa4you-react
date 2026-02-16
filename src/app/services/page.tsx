import type { Metadata } from "next";
import { ServicesIndexSections } from "@/components/ServicesIndexSections";

export const metadata: Metadata = {
  title: "Services | Villa4You",
  description: "Service marketplace powered by local Core mirror data.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <ServicesIndexSections />
    </div>
  );
}
