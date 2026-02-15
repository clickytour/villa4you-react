export type JsonObject = Record<string, unknown>;

export type RawWpPropertyPayload = JsonObject & {
  core_id?: number | string;
  resource_id?: number | string;
  title?: string;
  subtitle?: string | null;
  summary_short?: string | null;
  summary_long?: string | null;
  location_country?: string | null;
  location_region?: string | null;
  location_city?: string | null;
  geo_lat?: string | number | null;
  geo_lng?: string | number | null;
  bedrooms?: string | number | null;
  bathrooms?: string | number | null;
  maximum_number_of_guests?: string | number | null;
  floorspace?: string | number | null;
  floorspace_units?: string | null;
  price?: string | number | null;
  status?: string | number | boolean | null;
  minimum_stay_nights?: string | number | null;
  featured_image_url?: string | null;
  gallery?: unknown;
  capacity_json?: string | JsonObject | null;
  highligts?: string | JsonObject | null;
  common_expences?: string | number | null;
  cleaning_coust?: string | number | null;
  ground_units?: string | null;
  grounds_units?: string | null;
};

export type NormalizedProperty = {
  id: {
    coreId: number | null;
    resourceId: number | null;
  };
  title: string;
  subtitle: string;
  summaryShort: string;
  summaryLongHtml: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number | null;
    lng: number | null;
  };
  metrics: {
    bedrooms: number | null;
    bathrooms: number | null;
    maxGuests: number | null;
    floorspace: number | null;
    floorspaceUnits: string;
    minimumStayNights: number | null;
  };
  pricing: {
    nightlyPriceEur: number | null;
    commonExpenses: number | null;
    cleaningCost: number | null;
  };
  media: {
    featuredImageUrl: string;
    galleryUrls: string[];
  };
  features: {
    capacity: JsonObject;
    highlights: JsonObject;
  };
  raw: {
    status: string;
    typeWarnings: string[];
    source: RawWpPropertyPayload;
  };
};

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function toStringSafe(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseJsonObject(value: unknown): JsonObject {
  if (!value) return {};
  if (typeof value === "object" && !Array.isArray(value)) return value as JsonObject;
  if (typeof value !== "string") return {};

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as JsonObject) : {};
  } catch {
    return {};
  }
}

function parseGalleryUrls(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (item && typeof item === "object" ? (item as { url?: unknown }).url : null))
    .filter((url): url is string => typeof url === "string" && url.startsWith("http"));
}

function normalizeStatus(value: unknown): string {
  if (typeof value === "boolean") return value ? "active" : "inactive";
  if (typeof value === "number") return value === 1 ? "active" : "inactive";
  if (typeof value === "string") {
    const s = value.trim().toLowerCase();
    if (s === "1" || s === "publish" || s === "published") return "active";
    if (s === "0" || s === "draft") return "inactive";
    return s;
  }
  return "unknown";
}

export function normalizeWpProperty(payload: RawWpPropertyPayload): NormalizedProperty {
  const warnings: string[] = [];

  if (payload.cleaning_coust !== undefined) {
    warnings.push("Non-canonical field used: cleaning_coust");
  }
  if (payload.common_expences !== undefined) {
    warnings.push("Non-canonical field used: common_expences");
  }
  if (payload.highligts !== undefined) {
    warnings.push("Non-canonical field used: highligts");
  }
  if (payload.ground_units !== undefined && payload.grounds_units !== undefined) {
    warnings.push("Both ground_units and grounds_units were provided");
  }

  return {
    id: {
      coreId: toNumber(payload.core_id),
      resourceId: toNumber(payload.resource_id),
    },
    title: toStringSafe(payload.title),
    subtitle: toStringSafe(payload.subtitle),
    summaryShort: toStringSafe(payload.summary_short),
    summaryLongHtml: toStringSafe(payload.summary_long),
    location: {
      country: toStringSafe(payload.location_country),
      region: toStringSafe(payload.location_region),
      city: toStringSafe(payload.location_city),
      lat: toNumber(payload.geo_lat),
      lng: toNumber(payload.geo_lng),
    },
    metrics: {
      bedrooms: toNumber(payload.bedrooms),
      bathrooms: toNumber(payload.bathrooms),
      maxGuests: toNumber(payload.maximum_number_of_guests),
      floorspace: toNumber(payload.floorspace),
      floorspaceUnits: toStringSafe(payload.floorspace_units || payload.grounds_units || payload.ground_units),
      minimumStayNights: toNumber(payload.minimum_stay_nights),
    },
    pricing: {
      nightlyPriceEur: toNumber(payload.price),
      commonExpenses: toNumber(payload.common_expences),
      cleaningCost: toNumber(payload.cleaning_coust),
    },
    media: {
      featuredImageUrl: toStringSafe(payload.featured_image_url),
      galleryUrls: parseGalleryUrls(payload.gallery),
    },
    features: {
      capacity: parseJsonObject(payload.capacity_json),
      highlights: parseJsonObject(payload.highligts),
    },
    raw: {
      status: normalizeStatus(payload.status),
      typeWarnings: warnings,
      source: payload,
    },
  };
}
