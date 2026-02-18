import { PropertySnapshot } from "@/components/PropertySnapshot";
import { mockWpPayloadA } from "@/lib/mockWpPayload";
import { normalizeWpProperty } from "@/lib/propertyNormalizer";

export default function DemoPropertyPage() {
  const normalized = normalizeWpProperty(mockWpPayloadA);
  return <PropertySnapshot property={normalized} />;
}
