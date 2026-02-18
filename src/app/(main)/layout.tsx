import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
