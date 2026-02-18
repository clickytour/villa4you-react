// Proposal Mock Data

export interface ProposalItem {
  name: string;
  description?: string;
  image: string;
  images?: string[];
  region: string;
  listingType: string;
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  pricePerNight?: number;
  totalPrice?: number;
  rating?: number;
  reviewCount?: number;
  detailsUrl: string;
  videoUrl?: string;
  videoUrlGeneric?: string;
  tour3dUrl?: string;
  tour3dUrlGeneric?: string;
  availability?: 'available' | 'unavailable' | 'new-match';
  originalMatch?: boolean;
}

export interface BundleItem {
  type: "property" | "transfer" | "boat_rental" | "service";
  name: string;
  description?: string;
  image: string;
  priceEur: number;
  nights?: number;
  guests?: number;
  offerRef?: string;
  meta?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export interface Proposal {
  id: string;
  mode: "brand" | "nologo";
  type: "individual" | "large_group" | "combination";
  entityType: "vacation" | "hotel_room" | "real_estate" | "service";
  title: string;
  subtitle?: string;
  createdAt: string;
  expiresAt?: string;
  items: ProposalItem[];
  bundleItems?: BundleItem[];
}

const IMG = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop";
const IMG2 = "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop";
const IMG3 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop";
const IMG4 = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop";
const IMG_HOTEL = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop";
const IMG_BOAT = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop";
const IMG_TRANSFER = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop";
const IMG_SERVICE = "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&h=400&fit=crop";
const IMG_RE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop";

export const proposals: Proposal[] = [
  {
    id: "demo-brand-individual",
    mode: "brand",
    type: "individual",
    entityType: "vacation",
    title: "Your Dream Vacation in Lefkada",
    subtitle: "Handpicked villas for July 12–19, 2026",
    createdAt: "2026-02-15T10:00:00Z",
    expiresAt: "2026-03-15T23:59:59Z",
    items: [
      { name: "Villa Sapphire", description: "Stunning seafront villa with infinity pool and panoramic Ionian views.", image: IMG, images: [IMG, IMG2, IMG3], region: "Lefkada, Greece", listingType: "Villa", bedrooms: 4, bathrooms: 3, maxGuests: 8, pricePerNight: 320, totalPrice: 2240, rating: 4.9, reviewCount: 127, detailsUrl: "https://pickedfor.com/pickedfor/detail/villa-sapphire", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", videoUrlGeneric: "https://www.youtube.com/watch?v=generic1", tour3dUrl: "https://my.matterport.com/show/?m=example", tour3dUrlGeneric: "https://my.matterport.com/show/?m=generic1", availability: "available", originalMatch: true },
      { name: "Casa Azzurra", description: "Modern hilltop retreat surrounded by olive groves.", image: IMG2, images: [IMG2, IMG4], region: "Lefkada, Greece", listingType: "Villa", bedrooms: 3, bathrooms: 2, maxGuests: 6, pricePerNight: 250, totalPrice: 1750, rating: 4.7, reviewCount: 89, detailsUrl: "https://pickedfor.com/pickedfor/detail/casa-azzurra", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", videoUrlGeneric: "https://www.youtube.com/watch?v=generic2", availability: "available", originalMatch: true },
      { name: "Olive Stone House", description: "Traditional stone house with private garden and BBQ area.", image: IMG3, images: [IMG3, IMG], region: "Lefkada, Greece", listingType: "House", bedrooms: 2, bathrooms: 1, maxGuests: 4, pricePerNight: 150, totalPrice: 1050, rating: 4.5, reviewCount: 56, detailsUrl: "https://pickedfor.com/pickedfor/detail/olive-stone", availability: "available", originalMatch: true },
      { name: "Porto Blu Apartment", description: "Beachfront apartment steps from Nidri marina. This listing has been booked by another guest for your requested dates.", image: IMG4, images: [IMG4], region: "Lefkada, Greece", listingType: "Apartment", bedrooms: 1, bathrooms: 1, maxGuests: 2, pricePerNight: 95, totalPrice: 665, rating: 4.3, reviewCount: 34, detailsUrl: "https://pickedfor.com/pickedfor/detail/porto-blu", availability: "unavailable", originalMatch: true },
      { name: "Villa Emerald", description: "Just listed! Brand new luxury villa with rooftop terrace and private dock access. Stunning sunset views over the Ionian Sea.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", IMG], region: "Lefkada, Greece", listingType: "Villa", bedrooms: 3, bathrooms: 2, maxGuests: 6, pricePerNight: 290, totalPrice: 2030, rating: 5.0, reviewCount: 3, detailsUrl: "https://pickedfor.com/pickedfor/detail/villa-emerald", tour3dUrl: "https://my.matterport.com/show/?m=example2", tour3dUrlGeneric: "https://my.matterport.com/show/?m=generic3", availability: "new-match", originalMatch: false },
    ],
  },
  {
    id: "demo-brand-largegroup",
    mode: "brand",
    type: "large_group",
    entityType: "vacation",
    title: "Large Group Getaway — Kefalonia",
    subtitle: "Accommodates 24 guests across 3 properties",
    createdAt: "2026-02-14T08:00:00Z",
    items: [
      { name: "Villa Odysseus", description: "Grand 6-bedroom estate with tennis court.", image: IMG, region: "Kefalonia, Greece", listingType: "Villa", bedrooms: 6, bathrooms: 5, maxGuests: 12, pricePerNight: 580, totalPrice: 4060, rating: 4.8, detailsUrl: "https://pickedfor.com/pickedfor/detail/villa-odysseus" },
      { name: "Seaside Retreat", description: "Family-friendly villa on the beach.", image: IMG2, region: "Kefalonia, Greece", listingType: "Villa", bedrooms: 4, bathrooms: 3, maxGuests: 8, pricePerNight: 350, totalPrice: 2450, rating: 4.6, detailsUrl: "https://pickedfor.com/pickedfor/detail/seaside-retreat" },
      { name: "Sunset Cottage", description: "Cozy cottage perfect for a small family.", image: IMG3, region: "Kefalonia, Greece", listingType: "Cottage", bedrooms: 2, bathrooms: 1, maxGuests: 4, pricePerNight: 140, totalPrice: 980, rating: 4.4, detailsUrl: "https://pickedfor.com/pickedfor/detail/sunset-cottage" },
    ],
  },
  {
    id: "demo-brand-combo",
    mode: "brand",
    type: "combination",
    entityType: "vacation",
    title: "All-Inclusive Lefkada Package",
    subtitle: "Villa + airport transfer + boat day trip",
    createdAt: "2026-02-16T12:00:00Z",
    expiresAt: "2026-03-01T23:59:59Z",
    items: [],
    bundleItems: [
      { type: "property", name: "Villa Sapphire", description: "Seafront villa with infinity pool.", image: IMG, priceEur: 2240, nights: 7, guests: 8, bedrooms: 4, bathrooms: 3 },
      { type: "transfer", name: "Airport Transfer (round-trip)", description: "Private car from Aktion Airport to villa and back.", image: IMG_TRANSFER, priceEur: 120, meta: "Round-trip • up to 8 passengers" },
      { type: "boat_rental", name: "Full-Day Boat Trip", description: "Private speedboat with captain — visit Skorpios & Meganisi.", image: IMG_BOAT, priceEur: 450, meta: "8 hours • fuel included" },
    ],
  },
  {
    id: "demo-nologo-individual",
    mode: "nologo",
    type: "individual",
    entityType: "vacation",
    title: "Curated Vacation Options",
    subtitle: "Selected properties for your trip",
    createdAt: "2026-02-15T10:00:00Z",
    items: [
      { name: "Villa Sapphire", description: "Stunning seafront villa with infinity pool.", image: IMG, region: "Lefkada, Greece", listingType: "Villa", bedrooms: 4, bathrooms: 3, maxGuests: 8, pricePerNight: 320, totalPrice: 2240, rating: 4.9, detailsUrl: "https://pickedfor.com/pickedfor/detail/villa-sapphire" },
      { name: "Casa Azzurra", description: "Modern hilltop retreat.", image: IMG2, region: "Lefkada, Greece", listingType: "Villa", bedrooms: 3, bathrooms: 2, maxGuests: 6, pricePerNight: 250, totalPrice: 1750, rating: 4.7, detailsUrl: "https://pickedfor.com/pickedfor/detail/casa-azzurra" },
      { name: "Olive Stone House", description: "Traditional stone house.", image: IMG3, region: "Lefkada, Greece", listingType: "House", bedrooms: 2, bathrooms: 1, maxGuests: 4, pricePerNight: 150, totalPrice: 1050, rating: 4.5, detailsUrl: "https://pickedfor.com/pickedfor/detail/olive-stone" },
    ],
  },
  {
    id: "demo-nologo-largegroup",
    mode: "nologo",
    type: "large_group",
    entityType: "vacation",
    title: "Group Accommodation Options",
    subtitle: "Accommodates 24 guests across 3 properties",
    createdAt: "2026-02-14T08:00:00Z",
    items: [
      { name: "Villa Odysseus", description: "Grand estate.", image: IMG, region: "Kefalonia, Greece", listingType: "Villa", bedrooms: 6, bathrooms: 5, maxGuests: 12, pricePerNight: 580, totalPrice: 4060, rating: 4.8, detailsUrl: "https://pickedfor.com/pickedfor/detail/villa-odysseus" },
      { name: "Seaside Retreat", description: "Beach villa.", image: IMG2, region: "Kefalonia, Greece", listingType: "Villa", bedrooms: 4, bathrooms: 3, maxGuests: 8, pricePerNight: 350, totalPrice: 2450, rating: 4.6, detailsUrl: "https://pickedfor.com/pickedfor/detail/seaside-retreat" },
      { name: "Sunset Cottage", description: "Cozy cottage.", image: IMG3, region: "Kefalonia, Greece", listingType: "Cottage", bedrooms: 2, bathrooms: 1, maxGuests: 4, pricePerNight: 140, totalPrice: 980, rating: 4.4, detailsUrl: "https://pickedfor.com/pickedfor/detail/sunset-cottage" },
    ],
  },
  {
    id: "demo-nologo-combo",
    mode: "nologo",
    type: "combination",
    entityType: "vacation",
    title: "Complete Travel Package",
    subtitle: "Accommodation + transport + activities",
    createdAt: "2026-02-16T12:00:00Z",
    items: [],
    bundleItems: [
      { type: "property", name: "Villa Sapphire", description: "Seafront villa.", image: IMG, priceEur: 2240, nights: 7, guests: 8, bedrooms: 4, bathrooms: 3 },
      { type: "transfer", name: "Airport Transfer", description: "Private car transfer.", image: IMG_TRANSFER, priceEur: 120, meta: "Round-trip" },
      { type: "boat_rental", name: "Boat Day Trip", description: "Private boat excursion.", image: IMG_BOAT, priceEur: 450, meta: "Full day" },
    ],
  },
  {
    id: "demo-brand-hotel",
    mode: "brand",
    type: "individual",
    entityType: "hotel_room",
    title: "Hotel Rooms in Corfu",
    subtitle: "Premium rooms for Aug 1–7, 2026",
    createdAt: "2026-02-17T09:00:00Z",
    items: [
      { name: "Deluxe Sea View Room", description: "Spacious room with private balcony overlooking the sea.", image: IMG_HOTEL, region: "Corfu, Greece", listingType: "Hotel Room", bedrooms: 1, bathrooms: 1, maxGuests: 2, pricePerNight: 180, totalPrice: 1260, rating: 4.6, detailsUrl: "https://pickedfor.com/pickedfor/detail/corfu-deluxe" },
      { name: "Junior Suite", description: "Elegant suite with sitting area and garden view.", image: IMG2, region: "Corfu, Greece", listingType: "Suite", bedrooms: 1, bathrooms: 1, maxGuests: 3, pricePerNight: 260, totalPrice: 1820, rating: 4.8, detailsUrl: "https://pickedfor.com/pickedfor/detail/corfu-suite" },
    ],
  },
  {
    id: "demo-brand-realestate",
    mode: "brand",
    type: "individual",
    entityType: "real_estate",
    title: "Investment Properties — Lefkada",
    subtitle: "Exclusive listings for sale",
    createdAt: "2026-02-18T07:00:00Z",
    items: [
      { name: "Beachfront Plot — Agios Nikitas", description: "1,200 m² buildable plot, 50m from the beach.", image: IMG_RE, region: "Lefkada, Greece", listingType: "Land", totalPrice: 320000, rating: 5.0, detailsUrl: "https://pickedfor.com/pickedfor/detail/agios-nikitas-plot" },
      { name: "Renovated Stone House", description: "Charming 3-bed stone house in Karya village.", image: IMG3, region: "Lefkada, Greece", listingType: "House", bedrooms: 3, bathrooms: 2, totalPrice: 185000, detailsUrl: "https://pickedfor.com/pickedfor/detail/karya-stone" },
      { name: "Modern Villa with Pool", description: "New-build 4-bed villa, turnkey, sea views.", image: IMG, region: "Lefkada, Greece", listingType: "Villa", bedrooms: 4, bathrooms: 3, totalPrice: 520000, detailsUrl: "https://pickedfor.com/pickedfor/detail/modern-villa-pool" },
    ],
  },
  {
    id: "demo-brand-service",
    mode: "brand",
    type: "individual",
    entityType: "service",
    title: "Concierge Services",
    subtitle: "Enhance your stay with premium add-ons",
    createdAt: "2026-02-18T08:00:00Z",
    items: [
      { name: "Private Chef Experience", description: "In-villa dinner prepared by a local chef — 4-course Greek menu.", image: IMG_SERVICE, region: "Lefkada, Greece", listingType: "Service", totalPrice: 280, rating: 4.9, detailsUrl: "https://pickedfor.com/pickedfor/detail/private-chef" },
      { name: "Yoga & Wellness Session", description: "Morning yoga on your terrace with a certified instructor.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", region: "Lefkada, Greece", listingType: "Service", totalPrice: 90, rating: 4.7, detailsUrl: "https://pickedfor.com/pickedfor/detail/yoga" },
      { name: "Guided Hiking Tour", description: "Full-day guided hike through Dimosari Waterfalls trail.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop", region: "Lefkada, Greece", listingType: "Service", totalPrice: 65, rating: 4.8, detailsUrl: "https://pickedfor.com/pickedfor/detail/hiking" },
    ],
  },
  {
    id: "demo-nologo-hotel",
    mode: "nologo",
    type: "individual",
    entityType: "hotel_room",
    title: "Recommended Hotel Rooms",
    subtitle: "Selected rooms for Aug 1–7, 2026",
    createdAt: "2026-02-17T09:00:00Z",
    items: [
      { name: "Deluxe Sea View Room", description: "Spacious room with private balcony overlooking the sea.", image: IMG_HOTEL, region: "Corfu, Greece", listingType: "Hotel Room", bedrooms: 1, bathrooms: 1, maxGuests: 2, pricePerNight: 180, totalPrice: 1260, rating: 4.6, detailsUrl: "https://pickedfor.com/pickedfor/detail/corfu-deluxe" },
      { name: "Junior Suite", description: "Elegant suite with sitting area and garden view.", image: IMG2, region: "Corfu, Greece", listingType: "Suite", bedrooms: 1, bathrooms: 1, maxGuests: 3, pricePerNight: 260, totalPrice: 1820, rating: 4.8, detailsUrl: "https://pickedfor.com/pickedfor/detail/corfu-suite" },
    ],
  },
  {
    id: "demo-nologo-realestate",
    mode: "nologo",
    type: "individual",
    entityType: "real_estate",
    title: "Selected Investment Properties",
    subtitle: "Exclusive listings for sale",
    createdAt: "2026-02-18T07:00:00Z",
    items: [
      { name: "Beachfront Plot — Agios Nikitas", description: "1,200 m² buildable plot, 50m from the beach.", image: IMG_RE, region: "Lefkada, Greece", listingType: "Land", totalPrice: 320000, rating: 5.0, detailsUrl: "https://pickedfor.com/pickedfor/detail/agios-nikitas-plot" },
      { name: "Renovated Stone House", description: "Charming 3-bed stone house in Karya village.", image: IMG3, region: "Lefkada, Greece", listingType: "House", bedrooms: 3, bathrooms: 2, totalPrice: 185000, detailsUrl: "https://pickedfor.com/pickedfor/detail/karya-stone" },
      { name: "Modern Villa with Pool", description: "New-build 4-bed villa, turnkey, sea views.", image: IMG, region: "Lefkada, Greece", listingType: "Villa", bedrooms: 4, bathrooms: 3, totalPrice: 520000, detailsUrl: "https://pickedfor.com/pickedfor/detail/modern-villa-pool" },
    ],
  },
  {
    id: "demo-nologo-service",
    mode: "nologo",
    type: "individual",
    entityType: "service",
    title: "Recommended Services",
    subtitle: "Enhance your stay with premium add-ons",
    createdAt: "2026-02-18T08:00:00Z",
    items: [
      { name: "Private Chef Experience", description: "In-villa dinner prepared by a local chef — 4-course Greek menu.", image: IMG_SERVICE, region: "Lefkada, Greece", listingType: "Service", totalPrice: 280, rating: 4.9, detailsUrl: "https://pickedfor.com/pickedfor/detail/private-chef" },
      { name: "Yoga & Wellness Session", description: "Morning yoga on your terrace with a certified instructor.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", region: "Lefkada, Greece", listingType: "Service", totalPrice: 90, rating: 4.7, detailsUrl: "https://pickedfor.com/pickedfor/detail/yoga" },
      { name: "Guided Hiking Tour", description: "Full-day guided hike through Dimosari Waterfalls trail.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop", region: "Lefkada, Greece", listingType: "Service", totalPrice: 65, rating: 4.8, detailsUrl: "https://pickedfor.com/pickedfor/detail/hiking" },
    ],
  },
];

export function getProposalById(id: string): Proposal | undefined {
  return proposals.find((p) => p.id === id);
}
