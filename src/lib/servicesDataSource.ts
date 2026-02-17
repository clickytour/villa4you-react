import { coreMirrorServices, getCoreMirrorServiceBySlug, type CoreMirrorService, type ServiceAudienceTarget, type ServiceBookingType, type ServicePriceModel, type ServiceSubscriptionPlan } from "@/lib/coreMirrorServicesMock";

type ServicesDataSource = "mock" | "core-api";

const DEFAULT_DATA_SOURCE: ServicesDataSource = "mock";

function getDataSource(): ServicesDataSource {
  const value = process.env.SERVICES_DATA_SOURCE;
  if (value === "core-api" || value === "mock") return value;
  return DEFAULT_DATA_SOURCE;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function asAudience(value: unknown): ServiceAudienceTarget[] {
  const allowed: ServiceAudienceTarget[] = ["guests", "agents", "property_owners"];
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is ServiceAudienceTarget => typeof v === "string" && allowed.includes(v as ServiceAudienceTarget));
}

function asBookingType(value: unknown): ServiceBookingType | undefined {
  return value === "external_booking_link" || value === "instant_booking" || value === "request_to_book" ? value : undefined;
}

function asPriceModel(value: unknown): ServicePriceModel {
  if (value === "package" || value === "per_hour" || value === "per_person" || value === "per_service" || value === "quote") return value;
  return "quote";
}

function asPlan(value: unknown): ServiceSubscriptionPlan | undefined {
  return value === "free" || value === "standard" || value === "premium" ? value : undefined;
}

function mapCorePayloadToService(raw: any): CoreMirrorService {
  const slug = asString(raw?.slug, "service");
  return {
    slug,
    basicDetails: {
      businessName: asString(raw?.basicDetails?.businessName, asString(raw?.businessName, "Service")),
      legalName: asString(raw?.basicDetails?.legalName),
      ownerManagerName: asString(raw?.basicDetails?.ownerManagerName),
      categoryId: asString(raw?.basicDetails?.categoryId, "transfersTransport"),
      subcategoryId: asString(raw?.basicDetails?.subcategoryId, "airportTransfer"),
      shortDescription: asString(raw?.basicDetails?.shortDescription, "Service listing"),
      fullDescription: asString(raw?.basicDetails?.fullDescription, "Service details"),
      highlights: asStringArray(raw?.basicDetails?.highlights),
      languagesSupported: asStringArray(raw?.basicDetails?.languagesSupported),
      priceDescription: asString(raw?.basicDetails?.priceDescription),
      email: asString(raw?.basicDetails?.email, "service@example.com"),
      phone: asString(raw?.basicDetails?.phone, "+30"),
      preferredContactMethod: asString(raw?.basicDetails?.preferredContactMethod),
      websiteUrl: asString(raw?.basicDetails?.websiteUrl),
      socialMediaLinks: asStringArray(raw?.basicDetails?.socialMediaLinks),
    },
    locationServiceArea: {
      lat: asNumber(raw?.locationServiceArea?.lat),
      lng: asNumber(raw?.locationServiceArea?.lng),
      country: asString(raw?.locationServiceArea?.country, "Greece"),
      city: asString(raw?.locationServiceArea?.city, "Halkidiki"),
      street: asString(raw?.locationServiceArea?.street),
      stateRegion: asString(raw?.locationServiceArea?.stateRegion),
      address: asString(raw?.locationServiceArea?.address),
      apartmentFloorBuilding: asString(raw?.locationServiceArea?.apartmentFloorBuilding),
      postalZipCode: asString(raw?.locationServiceArea?.postalZipCode),
      serviceAreaCoverageKm: asNumber(raw?.locationServiceArea?.serviceAreaCoverageKm),
    },
    media: {
      primaryPhoto: asString(raw?.media?.primaryPhoto, "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"),
      galleryPhotos: asStringArray(raw?.media?.galleryPhotos),
      promoVideoUrl: asString(raw?.media?.promoVideoUrl),
      logo: asString(raw?.media?.logo),
    },
    pricingBooking: {
      bookingType: asBookingType(raw?.pricingBooking?.bookingType),
      externalBookingLink: asString(raw?.pricingBooking?.externalBookingLink),
      pricingDescription: asString(raw?.pricingBooking?.pricingDescription),
      priceList: Array.isArray(raw?.pricingBooking?.priceList)
        ? raw.pricingBooking.priceList.map((p: any) => ({
            title: asString(p?.title, "Price item"),
            priceModel: asPriceModel(p?.priceModel),
            guestPriceGross: asNumber(p?.guestPriceGross),
            agentPriceNet: asNumber(p?.agentPriceNet),
            commissionable: typeof p?.commissionable === "boolean" ? p.commissionable : undefined,
            photo: asString(p?.photo),
          }))
        : [],
    },
    platformSubscription: {
      subscriptionPlan: asPlan(raw?.platformSubscription?.subscriptionPlan),
      audienceTarget: asAudience(raw?.platformSubscription?.audienceTarget),
    },
    synchronization: {
      status: asString(raw?.synchronization?.status),
      externalRefs: asStringArray(raw?.synchronization?.externalRefs),
      sitesAvailable: asNumber(raw?.synchronization?.sitesAvailable),
      note: asString(raw?.synchronization?.note),
    },
    relatedPropertySlug: asString(raw?.relatedPropertySlug),
    relatedBlogSlug: asString(raw?.relatedBlogSlug),
  };
}

async function loadFromCoreApi(): Promise<CoreMirrorService[]> {
  const base = process.env.CORE_SERVICES_API_URL;
  if (!base) return coreMirrorServices;
  try {
    const res = await fetch(base, { cache: "no-store" });
    if (!res.ok) return coreMirrorServices;
    const payload = await res.json();
    const list = Array.isArray(payload) ? payload : Array.isArray(payload?.items) ? payload.items : [];
    if (list.length === 0) return coreMirrorServices;
    return list.map(mapCorePayloadToService);
  } catch {
    return coreMirrorServices;
  }
}

export async function getServicesList(): Promise<CoreMirrorService[]> {
  const source = getDataSource();
  if (source === "core-api") return loadFromCoreApi();
  return coreMirrorServices;
}

export async function getServiceBySlug(slug: string): Promise<CoreMirrorService | null> {
  const source = getDataSource();
  if (source === "core-api") {
    const list = await loadFromCoreApi();
    return list.find((s) => s.slug === slug) ?? null;
  }
  return getCoreMirrorServiceBySlug(slug);
}
