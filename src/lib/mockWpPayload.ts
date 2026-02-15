import type { RawWpPropertyPayload } from "@/lib/propertyNormalizer";

export const mockWpPayloadA: RawWpPropertyPayload = {
  core_id: 417,
  resource_id: 248967,
  title: "Seaview Ramona Apartment 1",
  subtitle: "Ramona 1",
  summary_short:
    "Discover Seaview Ramona Apartment in Neos Marmaras, Sithonia, Halkidiki.",
  summary_long: "<p>Sample long description from WP payload.</p>",
  status: 1,
  location_country: "GR",
  location_region: "Sithonia",
  location_city: "Neos Marmaras",
  geo_lat: "40.09479874",
  geo_lng: "23.77803629",
  maximum_number_of_guests: 9,
  bedrooms: 3,
  bathrooms: 1,
  floorspace: "84.00",
  floorspace_units: "m2",
  minimum_stay_nights: 6,
  price: "105.00",
  common_expences: "0.00",
  cleaning_coust: "0.00",
  featured_image_url:
    "https://pub-9f9fad1ce459499cb069de54195eea55.r2.dev/properties/ramona-524afa05bea95/primary_image/01KG2DEHHP6X66K0CZAHCNXB5C.JPG",
  gallery: [
    {
      url: "https://pub-9f9fad1ce459499cb069de54195eea55.r2.dev/properties/ramona-524afa05bea95/gallery/01KG2DEK666S9Q7EJNNNDQDFBM.JPG",
    },
    {
      url: "https://pub-9f9fad1ce459499cb069de54195eea55.r2.dev/properties/ramona-524afa05bea95/gallery/01KG2DEMPVC2HADZZE4CJ0F59P.JPG",
    },
  ],
  capacity_json:
    '{"air_conditioning":"Air Conditioning","free_wifi":"Free Wi-Fi","sea_view":"Sea view"}',
  highligts:
    '{"sea_coast_vacation_destinations":"Sea Coast Vacation Destinations"}',
};
