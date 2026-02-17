import { coreMirrorBlogPosts } from "@/lib/coreMirrorBlogMock";
import { getCoreMirrorPropertyBySlug } from "@/lib/coreMirrorPropertyMock";
import { getCoreMirrorRealEstateBySlug } from "@/lib/coreMirrorRealEstateMock";
import { getCoreMirrorHotelBySlug } from "@/lib/coreMirrorHotelMock";
import { getCoreMirrorHotelRoomBySlug } from "@/lib/coreMirrorHotelRoomMock";
import { coreMirrorServices } from "@/lib/coreMirrorServicesMock";

export type SearchVertical = "all" | "stays" | "services" | "blog";
export type SearchMode = "all" | "vacation" | "sale" | "monthly";

export type SearchRecord = {
  id: string;
  kind: "property" | "service" | "blog";
  vertical: Exclude<SearchVertical, "all">;
  title: string;
  description: string;
  location?: string;
  href: string;
  image?: string;
  tags: string[];
  mode: SearchMode;
  priceLabel?: string;
};

function propertyRecords(): SearchRecord[] {
  const out: SearchRecord[] = [];

  const vacation = getCoreMirrorPropertyBySlug("villa-glarokavos-sea-view");
  if (vacation) {
    out.push({
      id: `property-${vacation.slug}-vacation`,
      kind: "property",
      vertical: "stays",
      title: vacation.title,
      description: vacation.shortDescription,
      location: vacation.location.region,
      href: `/property/${vacation.slug}`,
      image: vacation.gallery[0],
      tags: ["vacation", ...vacation.badges],
      mode: "vacation",
      priceLabel: `From €${vacation.pricing.basicFrom}/night`,
    });
  }

  const realEstate = getCoreMirrorRealEstateBySlug("kassandra-investment-villa");
  if (realEstate) {
    out.push(
      {
        id: `property-${realEstate.slug}-vacation`,
        kind: "property",
        vertical: "stays",
        title: `${realEstate.title} (Vacation)` ,
        description: realEstate.shortSummary,
        location: realEstate.location.region,
        href: `/property/real-estate/${realEstate.slug}/vacation`,
        image: realEstate.media.primaryImage,
        tags: ["real-estate", "vacation", "short_term_rent"],
        mode: "vacation",
        priceLabel: `From €${realEstate.prices.monthlyEur}/month`,
      },
      {
        id: `property-${realEstate.slug}-sale`,
        kind: "property",
        vertical: "stays",
        title: `${realEstate.title} (Sale)`,
        description: "Investment-ready sale mode",
        location: realEstate.location.region,
        href: `/property/real-estate/${realEstate.slug}/sale`,
        image: realEstate.media.primaryImage,
        tags: ["real-estate", "sale", "investment"],
        mode: "sale",
        priceLabel: `Sale €${realEstate.prices.saleEur}`,
      },
      {
        id: `property-${realEstate.slug}-monthly`,
        kind: "property",
        vertical: "stays",
        title: `${realEstate.title} (Monthly)`,
        description: "Long-stay monthly mode",
        location: realEstate.location.region,
        href: `/property/real-estate/${realEstate.slug}/monthly`,
        image: realEstate.media.primaryImage,
        tags: ["real-estate", "monthly", "long-stay"],
        mode: "monthly",
        priceLabel: `Monthly €${realEstate.prices.monthlyEur}`,
      }
    );
  }

  const hotel = getCoreMirrorHotelBySlug("aegean-boutique-hotel");
  if (hotel) {
    out.push(
      {
        id: `property-${hotel.slug}-vacation`,
        kind: "property",
        vertical: "stays",
        title: `${hotel.title} (Vacation)`,
        description: hotel.shortSummary,
        location: hotel.location.region,
        href: `/property/hotel/${hotel.slug}/vacation`,
        image: hotel.media.primaryImage,
        tags: ["hotel", "vacation"],
        mode: "vacation",
        priceLabel: `From €${hotel.prices.fromNightlyEur}/night`,
      },
      {
        id: `property-${hotel.slug}-sale`,
        kind: "property",
        vertical: "stays",
        title: `${hotel.title} (Sale)`,
        description: "Hotel asset for acquisition",
        location: hotel.location.region,
        href: `/property/hotel/${hotel.slug}/sale`,
        image: hotel.media.primaryImage,
        tags: ["hotel", "sale", "investment"],
        mode: "sale",
        priceLabel: `Sale €${hotel.prices.saleEur}`,
      },
      {
        id: `property-${hotel.slug}-monthly`,
        kind: "property",
        vertical: "stays",
        title: `${hotel.title} (Monthly)`,
        description: "Hotel long-stay mode",
        location: hotel.location.region,
        href: `/property/hotel/${hotel.slug}/monthly`,
        image: hotel.media.primaryImage,
        tags: ["hotel", "monthly", "long-stay"],
        mode: "monthly",
        priceLabel: `Monthly €${hotel.prices.monthlyEur}`,
      }
    );
  }

  const room = getCoreMirrorHotelRoomBySlug("aegean-deluxe-suite");
  if (room) {
    out.push(
      {
        id: `property-${room.slug}-vacation`,
        kind: "property",
        vertical: "stays",
        title: `${room.title} (Vacation)`,
        description: room.shortSummary,
        location: room.hotelSlug,
        href: `/property/hotel-room/${room.slug}/vacation`,
        image: room.media.primaryImage,
        tags: ["hotel-room", "vacation"],
        mode: "vacation",
        priceLabel: `From €${room.rates.nightlyEur}/night`,
      },
      {
        id: `property-${room.slug}-sale`,
        kind: "property",
        vertical: "stays",
        title: `${room.title} (Sale)`,
        description: "Room unit for sale/investment mode",
        location: room.hotelSlug,
        href: `/property/hotel-room/${room.slug}/sale`,
        image: room.media.primaryImage,
        tags: ["hotel-room", "sale", "investment"],
        mode: "sale",
      },
      {
        id: `property-${room.slug}-monthly`,
        kind: "property",
        vertical: "stays",
        title: `${room.title} (Monthly)`,
        description: "Room long-stay mode",
        location: room.hotelSlug,
        href: `/property/hotel-room/${room.slug}/monthly`,
        image: room.media.primaryImage,
        tags: ["hotel-room", "monthly"],
        mode: "monthly",
        priceLabel: `Monthly €${room.rates.monthlyEur}`,
      }
    );
  }

  return out;
}

function serviceRecords(): SearchRecord[] {
  return coreMirrorServices.map((s) => ({
    id: `service-${s.slug}`,
    kind: "service",
    vertical: "services",
    title: s.basicDetails.businessName,
    description: s.basicDetails.shortDescription,
    location: s.locationServiceArea.city,
    href: `/services/${s.slug}`,
    image: s.media.primaryPhoto,
    tags: [s.basicDetails.categoryId, s.basicDetails.subcategoryId],
    mode: "all",
    priceLabel: s.basicDetails.priceDescription,
  }));
}

function blogRecords(): SearchRecord[] {
  return coreMirrorBlogPosts.map((b) => ({
    id: `blog-${b.slug}`,
    kind: "blog",
    vertical: "blog",
    title: b.title,
    description: b.excerpt,
    href: `/blog/${b.slug}`,
    image: b.coverImage,
    tags: [b.category],
    mode: "all",
  }));
}

export function getSearchSimulationRecords(): SearchRecord[] {
  return [...propertyRecords(), ...serviceRecords(), ...blogRecords()];
}

export function filterSearchSimulationRecords(records: SearchRecord[], options: { q?: string; vertical?: SearchVertical; mode?: SearchMode; location?: string }) {
  const q = options.q?.trim().toLowerCase() || "";
  const location = options.location?.trim().toLowerCase() || "";

  return records
    .filter((r) => (options.vertical && options.vertical !== "all" ? r.vertical === options.vertical : true))
    .filter((r) => (options.mode && options.mode !== "all" ? r.mode === options.mode || r.mode === "all" : true))
    .filter((r) => (location ? (r.location || "").toLowerCase().includes(location) : true))
    .filter((r) => {
      if (!q) return true;
      const hay = `${r.title} ${r.description} ${r.tags.join(" ")} ${r.location || ""}`.toLowerCase();
      return hay.includes(q);
    })
    .sort((a, b) => {
      if (!q) return a.title.localeCompare(b.title);
      const score = (r: SearchRecord) => {
        const t = r.title.toLowerCase();
        const d = r.description.toLowerCase();
        let s = 0;
        if (t.includes(q)) s += 3;
        if (d.includes(q)) s += 2;
        if (r.tags.join(" ").toLowerCase().includes(q)) s += 1;
        return s;
      };
      return score(b) - score(a);
    });
}
