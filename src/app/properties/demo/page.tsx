import type { Metadata } from "next";
import { PropertySnapshot } from "@/components/PropertySnapshot";
import { mockWpPayloadA } from "@/lib/mockWpPayload";
import { normalizeWpProperty } from "@/lib/propertyNormalizer";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoPropertyPage() {
  const normalized = normalizeWpProperty(mockWpPayloadA);
  return <PropertySnapshot property={normalized} />;
}
