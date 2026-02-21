"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   RESEARCH-BACKED DATA — sources: AirDNA 2025, Elxis.com, iLand,
   Tranio, GlobalPropertyGuide, PriceLabs, Greek Tax Code (Law 5246/2025)
   ═══════════════════════════════════════════════════════════════ */

interface Region {
  name: string;
  tier: 1 | 2 | 3;
  avgNightlyRate: number; // EUR, 2-BR equivalent, peak-adjusted annual average
  peakMultiplier: number; // how much higher peak vs shoulder
  occupancyPeak: number; // Jun-Sep occupancy %
  occupancyShoulder: number; // Apr-May, Oct occupancy %
  occupancyOff: number; // Nov-Mar occupancy %
  peakMonths: number; // months of peak season
  shoulderMonths: number;
  offMonths: number;
  enfiaPerSqm: number; // EUR/sqm annual ENFIA base
  propertyValuePerSqm: number; // avg property value EUR/sqm
  goldenVisaThreshold: number; // EUR (250K, 400K, or 800K)
}

const REGIONS: Region[] = [
  // Tier 1 — Premium destinations
  { name: "Mykonos", tier: 1, avgNightlyRate: 320, peakMultiplier: 2.4, occupancyPeak: 88, occupancyShoulder: 55, occupancyOff: 15, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 12, propertyValuePerSqm: 6500, goldenVisaThreshold: 800000 },
  { name: "Santorini", tier: 1, avgNightlyRate: 290, peakMultiplier: 2.2, occupancyPeak: 90, occupancyShoulder: 50, occupancyOff: 12, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 11, propertyValuePerSqm: 5800, goldenVisaThreshold: 800000 },
  { name: "Athens Center", tier: 1, avgNightlyRate: 110, peakMultiplier: 1.4, occupancyPeak: 78, occupancyShoulder: 68, occupancyOff: 52, peakMonths: 4, shoulderMonths: 4, offMonths: 4, enfiaPerSqm: 10, propertyValuePerSqm: 3200, goldenVisaThreshold: 800000 },
  { name: "Athens Suburbs", tier: 1, avgNightlyRate: 80, peakMultiplier: 1.3, occupancyPeak: 72, occupancyShoulder: 58, occupancyOff: 40, peakMonths: 4, shoulderMonths: 4, offMonths: 4, enfiaPerSqm: 7, propertyValuePerSqm: 2200, goldenVisaThreshold: 800000 },

  // Tier 2 — High-demand destinations
  { name: "Halkidiki", tier: 2, avgNightlyRate: 130, peakMultiplier: 2.0, occupancyPeak: 82, occupancyShoulder: 40, occupancyOff: 10, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 6, propertyValuePerSqm: 2000, goldenVisaThreshold: 250000 },
  { name: "Crete (Chania)", tier: 2, avgNightlyRate: 140, peakMultiplier: 1.9, occupancyPeak: 85, occupancyShoulder: 48, occupancyOff: 18, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 7, propertyValuePerSqm: 2400, goldenVisaThreshold: 250000 },
  { name: "Crete (Heraklion)", tier: 2, avgNightlyRate: 120, peakMultiplier: 1.8, occupancyPeak: 80, occupancyShoulder: 45, occupancyOff: 20, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 7, propertyValuePerSqm: 2100, goldenVisaThreshold: 250000 },
  { name: "Crete (Rethymno)", tier: 2, avgNightlyRate: 115, peakMultiplier: 1.8, occupancyPeak: 78, occupancyShoulder: 42, occupancyOff: 15, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 6, propertyValuePerSqm: 1900, goldenVisaThreshold: 250000 },
  { name: "Rhodes", tier: 2, avgNightlyRate: 110, peakMultiplier: 1.9, occupancyPeak: 83, occupancyShoulder: 45, occupancyOff: 12, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 6, propertyValuePerSqm: 1800, goldenVisaThreshold: 250000 },
  { name: "Corfu", tier: 2, avgNightlyRate: 120, peakMultiplier: 1.8, occupancyPeak: 80, occupancyShoulder: 42, occupancyOff: 12, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 7, propertyValuePerSqm: 2200, goldenVisaThreshold: 250000 },
  { name: "Thessaloniki", tier: 2, avgNightlyRate: 85, peakMultiplier: 1.3, occupancyPeak: 72, occupancyShoulder: 60, occupancyOff: 45, peakMonths: 4, shoulderMonths: 4, offMonths: 4, enfiaPerSqm: 8, propertyValuePerSqm: 2000, goldenVisaThreshold: 250000 },

  // Tier 3 — Islands & smaller destinations
  { name: "Zakynthos", tier: 2, avgNightlyRate: 120, peakMultiplier: 2.0, occupancyPeak: 85, occupancyShoulder: 38, occupancyOff: 8, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 5, propertyValuePerSqm: 1700, goldenVisaThreshold: 250000 },
  { name: "Kefalonia", tier: 2, avgNightlyRate: 110, peakMultiplier: 1.9, occupancyPeak: 80, occupancyShoulder: 35, occupancyOff: 8, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 5, propertyValuePerSqm: 1600, goldenVisaThreshold: 250000 },
  { name: "Paros", tier: 2, avgNightlyRate: 160, peakMultiplier: 2.1, occupancyPeak: 85, occupancyShoulder: 42, occupancyOff: 10, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 7, propertyValuePerSqm: 3200, goldenVisaThreshold: 250000 },
  { name: "Naxos", tier: 3, avgNightlyRate: 110, peakMultiplier: 1.8, occupancyPeak: 78, occupancyShoulder: 35, occupancyOff: 8, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 5, propertyValuePerSqm: 1800, goldenVisaThreshold: 250000 },
  { name: "Milos", tier: 3, avgNightlyRate: 150, peakMultiplier: 2.2, occupancyPeak: 88, occupancyShoulder: 40, occupancyOff: 5, peakMonths: 3, shoulderMonths: 2, offMonths: 7, enfiaPerSqm: 5, propertyValuePerSqm: 2500, goldenVisaThreshold: 250000 },
  { name: "Lefkada", tier: 3, avgNightlyRate: 100, peakMultiplier: 1.8, occupancyPeak: 80, occupancyShoulder: 35, occupancyOff: 8, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1500, goldenVisaThreshold: 250000 },
  { name: "Skiathos", tier: 3, avgNightlyRate: 120, peakMultiplier: 1.9, occupancyPeak: 82, occupancyShoulder: 38, occupancyOff: 8, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 5, propertyValuePerSqm: 2000, goldenVisaThreshold: 250000 },
  { name: "Kos", tier: 3, avgNightlyRate: 95, peakMultiplier: 1.8, occupancyPeak: 80, occupancyShoulder: 38, occupancyOff: 10, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 5, propertyValuePerSqm: 1500, goldenVisaThreshold: 250000 },
  { name: "Pelion", tier: 3, avgNightlyRate: 90, peakMultiplier: 1.5, occupancyPeak: 72, occupancyShoulder: 45, occupancyOff: 25, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 4, propertyValuePerSqm: 1400, goldenVisaThreshold: 250000 },
  { name: "Peloponnese", tier: 3, avgNightlyRate: 85, peakMultiplier: 1.6, occupancyPeak: 70, occupancyShoulder: 38, occupancyOff: 15, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 4, propertyValuePerSqm: 1300, goldenVisaThreshold: 250000 },
  { name: "Thassos", tier: 3, avgNightlyRate: 80, peakMultiplier: 1.7, occupancyPeak: 75, occupancyShoulder: 30, occupancyOff: 5, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1200, goldenVisaThreshold: 250000 },
  { name: "Samos", tier: 3, avgNightlyRate: 75, peakMultiplier: 1.7, occupancyPeak: 72, occupancyShoulder: 30, occupancyOff: 5, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1100, goldenVisaThreshold: 250000 },
  { name: "Hydra", tier: 2, avgNightlyRate: 180, peakMultiplier: 2.0, occupancyPeak: 82, occupancyShoulder: 50, occupancyOff: 15, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 8, propertyValuePerSqm: 3500, goldenVisaThreshold: 250000 },
  { name: "Spetses", tier: 2, avgNightlyRate: 160, peakMultiplier: 1.9, occupancyPeak: 80, occupancyShoulder: 45, occupancyOff: 12, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 7, propertyValuePerSqm: 3000, goldenVisaThreshold: 250000 },
  { name: "Ios", tier: 3, avgNightlyRate: 100, peakMultiplier: 2.0, occupancyPeak: 82, occupancyShoulder: 30, occupancyOff: 5, peakMonths: 3, shoulderMonths: 2, offMonths: 7, enfiaPerSqm: 4, propertyValuePerSqm: 1800, goldenVisaThreshold: 250000 },
  { name: "Syros", tier: 3, avgNightlyRate: 90, peakMultiplier: 1.6, occupancyPeak: 75, occupancyShoulder: 40, occupancyOff: 15, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 5, propertyValuePerSqm: 1700, goldenVisaThreshold: 250000 },
  { name: "Skopelos", tier: 3, avgNightlyRate: 95, peakMultiplier: 1.8, occupancyPeak: 78, occupancyShoulder: 32, occupancyOff: 5, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1400, goldenVisaThreshold: 250000 },
  { name: "Alonissos", tier: 3, avgNightlyRate: 85, peakMultiplier: 1.7, occupancyPeak: 72, occupancyShoulder: 28, occupancyOff: 5, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 3, propertyValuePerSqm: 1200, goldenVisaThreshold: 250000 },
  { name: "Karpathos", tier: 3, avgNightlyRate: 90, peakMultiplier: 1.8, occupancyPeak: 75, occupancyShoulder: 30, occupancyOff: 5, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1300, goldenVisaThreshold: 250000 },
  { name: "Patmos", tier: 3, avgNightlyRate: 110, peakMultiplier: 1.8, occupancyPeak: 78, occupancyShoulder: 35, occupancyOff: 8, peakMonths: 3, shoulderMonths: 2, offMonths: 7, enfiaPerSqm: 5, propertyValuePerSqm: 2000, goldenVisaThreshold: 250000 },
  { name: "Ikaria", tier: 3, avgNightlyRate: 70, peakMultiplier: 1.6, occupancyPeak: 68, occupancyShoulder: 28, occupancyOff: 5, peakMonths: 3, shoulderMonths: 2, offMonths: 7, enfiaPerSqm: 3, propertyValuePerSqm: 1000, goldenVisaThreshold: 250000 },
  { name: "Aegina", tier: 3, avgNightlyRate: 90, peakMultiplier: 1.5, occupancyPeak: 72, occupancyShoulder: 42, occupancyOff: 18, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 5, propertyValuePerSqm: 1800, goldenVisaThreshold: 250000 },
  { name: "Nafplio", tier: 3, avgNightlyRate: 95, peakMultiplier: 1.5, occupancyPeak: 75, occupancyShoulder: 48, occupancyOff: 22, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 5, propertyValuePerSqm: 1600, goldenVisaThreshold: 250000 },
  { name: "Meteora (Kalambaka)", tier: 3, avgNightlyRate: 75, peakMultiplier: 1.4, occupancyPeak: 72, occupancyShoulder: 50, occupancyOff: 28, peakMonths: 4, shoulderMonths: 4, offMonths: 4, enfiaPerSqm: 3, propertyValuePerSqm: 900, goldenVisaThreshold: 250000 },
  { name: "Ioannina", tier: 3, avgNightlyRate: 65, peakMultiplier: 1.3, occupancyPeak: 65, occupancyShoulder: 42, occupancyOff: 25, peakMonths: 4, shoulderMonths: 4, offMonths: 4, enfiaPerSqm: 4, propertyValuePerSqm: 1000, goldenVisaThreshold: 250000 },
  { name: "Kavala", tier: 3, avgNightlyRate: 70, peakMultiplier: 1.5, occupancyPeak: 68, occupancyShoulder: 35, occupancyOff: 12, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1000, goldenVisaThreshold: 250000 },
  { name: "Volos", tier: 3, avgNightlyRate: 70, peakMultiplier: 1.4, occupancyPeak: 68, occupancyShoulder: 40, occupancyOff: 20, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 4, propertyValuePerSqm: 1100, goldenVisaThreshold: 250000 },
  { name: "Kalamata", tier: 3, avgNightlyRate: 80, peakMultiplier: 1.6, occupancyPeak: 72, occupancyShoulder: 38, occupancyOff: 12, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1200, goldenVisaThreshold: 250000 },
  { name: "Mani", tier: 3, avgNightlyRate: 100, peakMultiplier: 1.7, occupancyPeak: 75, occupancyShoulder: 38, occupancyOff: 10, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 3, propertyValuePerSqm: 1400, goldenVisaThreshold: 250000 },
  { name: "Monemvasia", tier: 3, avgNightlyRate: 110, peakMultiplier: 1.6, occupancyPeak: 78, occupancyShoulder: 42, occupancyOff: 15, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 4, propertyValuePerSqm: 1600, goldenVisaThreshold: 250000 },
  { name: "Olympia", tier: 3, avgNightlyRate: 65, peakMultiplier: 1.3, occupancyPeak: 65, occupancyShoulder: 40, occupancyOff: 15, peakMonths: 4, shoulderMonths: 3, offMonths: 5, enfiaPerSqm: 3, propertyValuePerSqm: 800, goldenVisaThreshold: 250000 },
  { name: "Delphi", tier: 3, avgNightlyRate: 70, peakMultiplier: 1.3, occupancyPeak: 68, occupancyShoulder: 45, occupancyOff: 20, peakMonths: 4, shoulderMonths: 4, offMonths: 4, enfiaPerSqm: 3, propertyValuePerSqm: 900, goldenVisaThreshold: 250000 },
  { name: "Lesvos", tier: 3, avgNightlyRate: 70, peakMultiplier: 1.6, occupancyPeak: 70, occupancyShoulder: 30, occupancyOff: 8, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1000, goldenVisaThreshold: 250000 },
  { name: "Chios", tier: 3, avgNightlyRate: 68, peakMultiplier: 1.5, occupancyPeak: 68, occupancyShoulder: 30, occupancyOff: 8, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1000, goldenVisaThreshold: 250000 },
  { name: "Preveza / Parga", tier: 3, avgNightlyRate: 85, peakMultiplier: 1.7, occupancyPeak: 78, occupancyShoulder: 32, occupancyOff: 5, peakMonths: 4, shoulderMonths: 2, offMonths: 6, enfiaPerSqm: 4, propertyValuePerSqm: 1300, goldenVisaThreshold: 250000 },
];

/* ── Greek Tax Scales 2026 (Law 5246/2025) ── */

// Individual rental income tax (progressive)
function calcIndividualRentalTax(income: number): number {
  // 2026 scale: 0-12K @ 15%, 12K-24K @ 25%, 24K-35K @ 35%, 35K+ @ 45%
  if (income <= 0) return 0;
  let tax = 0;
  const brackets = [
    { limit: 12000, rate: 0.15 },
    { limit: 24000, rate: 0.25 },
    { limit: 35000, rate: 0.35 },
    { limit: Infinity, rate: 0.45 },
  ];
  let prev = 0;
  for (const b of brackets) {
    if (income <= prev) break;
    const taxable = Math.min(income, b.limit) - prev;
    tax += taxable * b.rate;
    prev = b.limit;
  }
  return tax;
}

// Corporate income tax (flat 22%)
function calcCorporateTax(income: number): number {
  if (income <= 0) return 0;
  return income * 0.22;
}

// Dividend tax (5% on distributed profits after corporate tax)
function calcDividendTax(netProfit: number): number {
  return netProfit * 0.05;
}

const PROPERTY_TYPES = [
  { id: "apartment-1br", label: "1-BR Apartment", sqm: 45, rateMultiplier: 0.65 },
  { id: "apartment-2br", label: "2-BR Apartment", sqm: 70, rateMultiplier: 1.0 },
  { id: "apartment-3br", label: "3-BR Apartment", sqm: 95, rateMultiplier: 1.3 },
  { id: "villa-2br", label: "2-BR Villa", sqm: 100, rateMultiplier: 1.5 },
  { id: "villa-3br", label: "3-BR Villa", sqm: 140, rateMultiplier: 2.0 },
  { id: "villa-4br", label: "4-BR Villa (Pool)", sqm: 180, rateMultiplier: 2.8 },
  { id: "villa-luxury", label: "Luxury Villa (5+ BR)", sqm: 250, rateMultiplier: 4.0 },
];

const MANAGEMENT_MODELS = [
  { id: "self", label: "Self-Managed", fee: 0, desc: "You handle everything: guests, cleaning, maintenance, pricing, listings" },
  { id: "partial", label: "Partial Management (Villa4you)", fee: 15, desc: "Multi-platform sync, calendar management, guest comms. You handle on-site ops" },
  { id: "full-Villa4you", label: "Full Management (Villa4you)", fee: 20, desc: "End-to-end: listing, pricing, guest comms, cleaning coordination, reporting" },
  { id: "full-premium", label: "Premium PMC", fee: 25, desc: "Boutique/luxury management with concierge, styling, revenue optimization" },
  { id: "full-traditional", label: "Traditional PMC (30%+)", fee: 30, desc: "Legacy property managers, typically island-based, higher commission" },
];

const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${n.toFixed(1)}%`;

export default function VacationOwnerCalculator() {
  const [regionIdx, setRegionIdx] = useState(REGIONS.findIndex(r => r.name === "Halkidiki"));
  const [propertyTypeIdx, setPropertyTypeIdx] = useState(1); // 2-BR apt
  const [managementIdx, setManagementIdx] = useState(2); // full Villa4you
  const [ownershipType, setOwnershipType] = useState<"individual" | "company">("individual");
  const [customRate, setCustomRate] = useState<number | null>(null);
  const [customSqm, setCustomSqm] = useState<number | null>(null);
  const [hasPool, setHasPool] = useState(false);
  const [propertiesCount, setPropertiesCount] = useState(1);

  const region = REGIONS[regionIdx];
  const propType = PROPERTY_TYPES[propertyTypeIdx];
  const mgmt = MANAGEMENT_MODELS[managementIdx];
  const sqm = customSqm || propType.sqm;
  const baseRate = customRate || Math.round(region.avgNightlyRate * propType.rateMultiplier);

  const results = useMemo(() => {
    // Calculate booked nights per season
    const peakNights = region.peakMonths * 30 * (region.occupancyPeak / 100);
    const shoulderNights = region.shoulderMonths * 30 * (region.occupancyShoulder / 100);
    const offNights = region.offMonths * 30 * (region.occupancyOff / 100);
    const totalNights = Math.round(peakNights + shoulderNights + offNights);

    // Revenue with seasonal pricing
    const peakRate = baseRate * (region.peakMultiplier > 1 ? (1 + (region.peakMultiplier - 1) * 0.5) : 1);
    const shoulderRate = baseRate * 0.85;
    const offRate = baseRate * 0.6;
    const grossRevenue = Math.round(peakNights * peakRate + shoulderNights * shoulderRate + offNights * offRate);

    // Platform fees (Airbnb 3% host + Booking.com avg 15% = blended ~8%)
    const platformFees = Math.round(grossRevenue * 0.08);

    // Management fee
    const managementFee = Math.round(grossRevenue * (mgmt.fee / 100));

    // Operating expenses breakdown
    const cleaningPerTurnover = sqm <= 60 ? 45 : sqm <= 100 ? 65 : sqm <= 150 ? 90 : 120;
    const avgStayLength = region.tier === 1 ? 3.5 : region.tier === 2 ? 4 : 4.5;
    const turnovers = Math.round(totalNights / avgStayLength);
    const cleaningTotal = turnovers * cleaningPerTurnover;

    const laundryPerTurnover = sqm <= 60 ? 15 : sqm <= 100 ? 25 : sqm <= 150 ? 35 : 50;
    const laundryTotal = turnovers * laundryPerTurnover;

    const maintenanceAnnual = sqm * 8 + (hasPool ? 2400 : 0); // ~EUR8/sqm + pool
    const utilitiesAnnual = sqm * 12 + (hasPool ? 800 : 0);
    const insuranceAnnual = sqm <= 100 ? 350 : sqm <= 200 ? 550 : 800;
    const suppliesPerTurnover = sqm <= 60 ? 8 : sqm <= 100 ? 12 : 18;
    const suppliesTotal = turnovers * suppliesPerTurnover;

    // Greek short-term rental registration fee (2025+): EUR 600/year/property
    const registrationFee = 600;

    // Short-term rental daily fee: EUR 8/day peak (Apr-Oct), EUR 2/day off (Nov-Mar)
    const dailyFeeTotal = Math.round(
      (peakNights + shoulderNights) * 8 + offNights * 2
    );

    // Promotion / marketing (if self-managed, owner pays; otherwise included in mgmt fee)
    const promotionCost = mgmt.id === "self" ? Math.round(grossRevenue * 0.03) : 0;

    // Photography & listing setup (amortized annually)
    const listingSetup = 300;

    const totalOperatingExpenses =
      cleaningTotal + laundryTotal + maintenanceAnnual + utilitiesAnnual +
      insuranceAnnual + suppliesTotal + registrationFee + dailyFeeTotal +
      promotionCost + listingSetup;

    // ENFIA (annual property tax)
    const enfia = Math.round(sqm * region.enfiaPerSqm);

    // Net before income tax
    const netBeforeTax = grossRevenue - platformFees - managementFee - totalOperatingExpenses - enfia;

    // Income tax
    const totalRentalIncome = netBeforeTax * propertiesCount;
    let incomeTax: number;
    let effectiveTaxRate: number;
    let dividendTax = 0;

    if (ownershipType === "individual") {
      // Individual: 5% flat deduction on gross, then progressive scale
      const taxableIncome = grossRevenue * 0.95; // 5% standard deduction
      incomeTax = calcIndividualRentalTax(taxableIncome);
      effectiveTaxRate = taxableIncome > 0 ? (incomeTax / taxableIncome) * 100 : 0;
    } else {
      // Company: 22% corporate flat + 5% dividend
      const companyProfit = Math.max(0, netBeforeTax);
      incomeTax = calcCorporateTax(companyProfit);
      dividendTax = calcDividendTax(companyProfit - incomeTax);
      effectiveTaxRate = companyProfit > 0 ? ((incomeTax + dividendTax) / companyProfit) * 100 : 0;
    }

    const netAfterTax = netBeforeTax - incomeTax - dividendTax;

    // Property value estimate
    const propertyValue = sqm * region.propertyValuePerSqm;
    const grossYield = propertyValue > 0 ? (grossRevenue / propertyValue) * 100 : 0;
    const netYield = propertyValue > 0 ? (netAfterTax / propertyValue) * 100 : 0;

    // Golden Visa eligibility
    const gvEligible = propertyValue >= region.goldenVisaThreshold;

    // Monthly breakdown
    const monthlyNet = netAfterTax / 12;

    return {
      totalNights, grossRevenue, platformFees, managementFee,
      cleaningTotal, laundryTotal, maintenanceAnnual, utilitiesAnnual,
      insuranceAnnual, suppliesTotal, registrationFee, dailyFeeTotal,
      promotionCost, listingSetup, totalOperatingExpenses, enfia,
      netBeforeTax, incomeTax, dividendTax, netAfterTax,
      effectiveTaxRate, propertyValue, grossYield, netYield,
      gvEligible, monthlyNet, turnovers, peakRate: Math.round(peakRate),
      shoulderRate: Math.round(shoulderRate), offRate: Math.round(offRate),
    };
  }, [regionIdx, propertyTypeIdx, managementIdx, ownershipType, customRate, customSqm, hasPool, propertiesCount, baseRate, sqm, region, mgmt]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Column 1: Property */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b pb-1">Property Details</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Region</label>
            <select value={regionIdx} onChange={e => setRegionIdx(+e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <optgroup label="Tier 1 — Premium">
                {REGIONS.filter(r => r.tier === 1).map((r, _, arr) => {
                  const idx = REGIONS.indexOf(r);
                  return <option key={idx} value={idx}>{r.name} (avg {"\u20AC"}{r.avgNightlyRate}/night)</option>;
                })}
              </optgroup>
              <optgroup label="Tier 2 — High Demand">
                {REGIONS.filter(r => r.tier === 2).map(r => {
                  const idx = REGIONS.indexOf(r);
                  return <option key={idx} value={idx}>{r.name} (avg {"\u20AC"}{r.avgNightlyRate}/night)</option>;
                })}
              </optgroup>
              <optgroup label="Tier 3 — Emerging / Seasonal">
                {REGIONS.filter(r => r.tier === 3).map(r => {
                  const idx = REGIONS.indexOf(r);
                  return <option key={idx} value={idx}>{r.name} (avg {"\u20AC"}{r.avgNightlyRate}/night)</option>;
                })}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Property Type</label>
            <select value={propertyTypeIdx} onChange={e => setPropertyTypeIdx(+e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {PROPERTY_TYPES.map((pt, i) => (
                <option key={i} value={i}>{pt.label} (~{pt.sqm}m{"\u00B2"})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Custom m{"\u00B2"} (optional)</label>
              <input type="number" placeholder={String(propType.sqm)} value={customSqm || ""} onChange={e => setCustomSqm(e.target.value ? +e.target.value : null)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Custom {"\u20AC"}/night</label>
              <input type="number" placeholder={String(baseRate)} value={customRate || ""} onChange={e => setCustomRate(e.target.value ? +e.target.value : null)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} className="rounded" />
              <span className="text-slate-700">Swimming Pool</span>
            </label>
            <div className="flex items-center gap-1">
              <label className="text-xs text-slate-500">Properties:</label>
              <select value={propertiesCount} onChange={e => setPropertiesCount(+e.target.value)} className="rounded border px-2 py-1 text-xs">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Column 2: Management */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b pb-1">Management Model</h3>
          <div className="space-y-2">
            {MANAGEMENT_MODELS.map((m, i) => (
              <button key={m.id} onClick={() => setManagementIdx(i)} className={`w-full rounded-lg border p-2.5 text-left transition ${managementIdx === i ? "border-cyan-600 bg-cyan-50" : "border-slate-200 hover:bg-slate-50"}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${managementIdx === i ? "text-cyan-700" : "text-slate-700"}`}>{m.label}</span>
                  <span className={`text-xs font-bold ${m.fee === 0 ? "text-emerald-600" : managementIdx === i ? "text-cyan-600" : "text-slate-500"}`}>{m.fee === 0 ? "0%" : `${m.fee}%`}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Ownership & Tax */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b pb-1">Ownership & Tax Model</h3>

          <div className="space-y-2">
            <button onClick={() => setOwnershipType("individual")} className={`w-full rounded-lg border p-3 text-left transition ${ownershipType === "individual" ? "border-cyan-600 bg-cyan-50" : "border-slate-200 hover:bg-slate-50"}`}>
              <span className={`text-sm font-semibold ${ownershipType === "individual" ? "text-cyan-700" : "text-slate-700"}`}>Individual Owner</span>
              <p className="text-[10px] text-slate-500 mt-0.5">Progressive rental income tax: 15% / 25% / 35% / 45%</p>
            </button>
            <button onClick={() => setOwnershipType("company")} className={`w-full rounded-lg border p-3 text-left transition ${ownershipType === "company" ? "border-cyan-600 bg-cyan-50" : "border-slate-200 hover:bg-slate-50"}`}>
              <span className={`text-sm font-semibold ${ownershipType === "company" ? "text-cyan-700" : "text-slate-700"}`}>Company (IKE / OE / AE)</span>
              <p className="text-[10px] text-slate-500 mt-0.5">Flat 22% corporate tax + 5% dividend tax on distribution</p>
            </button>
          </div>

          {/* Tax Scales Reference */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <h4 className="text-xs font-bold text-slate-700 mb-1.5">
              {ownershipType === "individual" ? "2026 Rental Income Tax Scale" : "Corporate Tax Rate"}
            </h4>
            {ownershipType === "individual" ? (
              <div className="space-y-0.5 text-[10px]">
                <div className="flex justify-between"><span className="text-slate-500">{"\u20AC"}0 - {"\u20AC"}12,000</span><span className="font-bold text-emerald-600">15%</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{"\u20AC"}12,001 - {"\u20AC"}24,000</span><span className="font-bold text-amber-600">25%</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{"\u20AC"}24,001 - {"\u20AC"}35,000</span><span className="font-bold text-orange-600">35%</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{"\u20AC"}35,001+</span><span className="font-bold text-red-600">45%</span></div>
                <p className="text-slate-400 mt-1 italic">Law 5246/2025 — new 25% bracket from Jan 2026</p>
              </div>
            ) : (
              <div className="space-y-0.5 text-[10px]">
                <div className="flex justify-between"><span className="text-slate-500">Corporate income tax</span><span className="font-bold text-blue-600">22%</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Dividend withholding</span><span className="font-bold text-blue-600">5%</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Effective total</span><span className="font-bold text-blue-700">~25.9%</span></div>
                <p className="text-slate-400 mt-1 italic">Company can deduct actual expenses (not 5% flat)</p>
              </div>
            )}
          </div>

          {results.gvEligible && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
              <p className="text-[10px] font-bold text-amber-700">&#127279; Golden Visa Eligible</p>
              <p className="text-[10px] text-amber-600">Est. property value {"\u20AC"}{fmt(results.propertyValue)} meets {region.name} threshold of {"\u20AC"}{fmt(region.goldenVisaThreshold)}</p>
              <Link href="/tools/golden-visa-calculator" className="text-[10px] text-cyan-600 underline">Use Golden Visa Calculator &rarr;</Link>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 text-white">
          <p className="text-xs text-emerald-100">Gross Revenue</p>
          <p className="text-2xl font-bold">{"\u20AC"}{fmt(results.grossRevenue)}</p>
          <p className="text-[10px] text-emerald-200">{results.totalNights} nights booked | {results.turnovers} turnovers</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-700 p-4 text-white">
          <p className="text-xs text-cyan-100">Net After Tax</p>
          <p className="text-2xl font-bold">{"\u20AC"}{fmt(results.netAfterTax)}</p>
          <p className="text-[10px] text-cyan-200">{"\u20AC"}{fmt(results.monthlyNet)}/month | {fmtPct(results.effectiveTaxRate)} eff. tax</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 p-4 text-white">
          <p className="text-xs text-slate-300">Net Yield (ROI)</p>
          <p className="text-2xl font-bold">{fmtPct(results.netYield)}</p>
          <p className="text-[10px] text-slate-400">Gross yield: {fmtPct(results.grossYield)} | Est. value: {"\u20AC"}{fmt(results.propertyValue)}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 p-4 text-white">
          <p className="text-xs text-violet-200">Seasonal Rates</p>
          <p className="text-lg font-bold">{"\u20AC"}{results.peakRate} <span className="text-xs font-normal">peak</span></p>
          <p className="text-[10px] text-violet-200">{"\u20AC"}{results.shoulderRate} shoulder | {"\u20AC"}{results.offRate} off-season</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue & Deductions */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b">
            <h4 className="text-sm font-bold text-slate-700">Revenue & Deductions</h4>
          </div>
          <div className="p-4 space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-slate-600">Gross Revenue</span><span className="font-semibold text-emerald-600">+{"\u20AC"}{fmt(results.grossRevenue)}</span></div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between"><span className="text-slate-500">Platform Fees (~8%)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.platformFees)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Management Fee ({mgmt.fee}%)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.managementFee)}</span></div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between"><span className="text-slate-500">Cleaning ({results.turnovers} turnovers)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.cleaningTotal)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Laundry & Linen</span><span className="text-red-500">-{"\u20AC"}{fmt(results.laundryTotal)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Maintenance{hasPool ? " + Pool" : ""}</span><span className="text-red-500">-{"\u20AC"}{fmt(results.maintenanceAnnual)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Utilities (elec/water/internet)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.utilitiesAnnual)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Insurance</span><span className="text-red-500">-{"\u20AC"}{fmt(results.insuranceAnnual)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Guest Supplies</span><span className="text-red-500">-{"\u20AC"}{fmt(results.suppliesTotal)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">STR Registration Fee</span><span className="text-red-500">-{"\u20AC"}{fmt(results.registrationFee)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Daily STR Fee ({"\u20AC"}8/{"\u20AC"}2)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.dailyFeeTotal)}</span></div>
            {results.promotionCost > 0 && <div className="flex justify-between"><span className="text-slate-500">Self-promotion (3%)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.promotionCost)}</span></div>}
            <div className="flex justify-between"><span className="text-slate-500">Listing Setup (amortized)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.listingSetup)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">ENFIA Property Tax</span><span className="text-red-500">-{"\u20AC"}{fmt(results.enfia)}</span></div>
            <div className="h-px bg-slate-200" />
            <div className="flex justify-between font-bold"><span className="text-slate-700">Net Before Income Tax</span><span className={results.netBeforeTax >= 0 ? "text-emerald-600" : "text-red-600"}>{"\u20AC"}{fmt(results.netBeforeTax)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{ownershipType === "individual" ? "Income Tax" : "Corporate Tax (22%)"}</span><span className="text-red-500">-{"\u20AC"}{fmt(results.incomeTax)}</span></div>
            {results.dividendTax > 0 && <div className="flex justify-between"><span className="text-slate-500">Dividend Tax (5%)</span><span className="text-red-500">-{"\u20AC"}{fmt(results.dividendTax)}</span></div>}
            <div className="h-px bg-slate-300" />
            <div className="flex justify-between font-bold text-base"><span className="text-slate-900">NET PROFIT</span><span className={results.netAfterTax >= 0 ? "text-emerald-700" : "text-red-700"}>{"\u20AC"}{fmt(results.netAfterTax)}</span></div>
          </div>
        </div>

        {/* Expense Pie Visual */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b">
            <h4 className="text-sm font-bold text-slate-700">Expense Distribution</h4>
          </div>
          <div className="p-4">
            {(() => {
              const totalDeductions = results.platformFees + results.managementFee + results.totalOperatingExpenses + results.enfia + results.incomeTax + results.dividendTax;
              const items = [
                { label: "Platform Fees", amount: results.platformFees, color: "bg-blue-500" },
                { label: "Management", amount: results.managementFee, color: "bg-cyan-500" },
                { label: "Cleaning & Linen", amount: results.cleaningTotal + results.laundryTotal, color: "bg-amber-500" },
                { label: "Maintenance & Utils", amount: results.maintenanceAnnual + results.utilitiesAnnual, color: "bg-orange-500" },
                { label: "STR Fees & Insurance", amount: results.registrationFee + results.dailyFeeTotal + results.insuranceAnnual, color: "bg-red-400" },
                { label: "Supplies & Setup", amount: results.suppliesTotal + results.listingSetup + results.promotionCost, color: "bg-pink-400" },
                { label: "ENFIA", amount: results.enfia, color: "bg-violet-500" },
                { label: "Income Tax", amount: results.incomeTax + results.dividendTax, color: "bg-slate-600" },
                { label: "Net Profit", amount: Math.max(0, results.netAfterTax), color: "bg-emerald-500" },
              ];
              const total = totalDeductions + Math.max(0, results.netAfterTax);
              return (
                <div className="space-y-2">
                  {/* Stacked bar */}
                  <div className="flex h-8 rounded-full overflow-hidden">
                    {items.filter(i => i.amount > 0).map((item, i) => (
                      <div key={i} className={`${item.color} transition-all`} style={{ width: `${(item.amount / total) * 100}%` }} title={`${item.label}: ${"\u20AC"}${fmt(item.amount)}`} />
                    ))}
                  </div>
                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-1 mt-3">
                    {items.filter(i => i.amount > 0).map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color} flex-shrink-0`} />
                        <span className="text-[10px] text-slate-600">{item.label}</span>
                        <span className="text-[10px] font-semibold text-slate-800 ml-auto">{"\u20AC"}{fmt(item.amount)} ({total > 0 ? fmtPct((item.amount / total) * 100) : "0%"})</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Region Occupancy Details */}
            <div className="mt-4 rounded-lg bg-slate-50 p-3">
              <h5 className="text-xs font-bold text-slate-700 mb-1">{region.name} — Occupancy Profile</h5>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div>
                  <p className="text-slate-500">Peak ({region.peakMonths}mo)</p>
                  <p className="font-bold text-emerald-600">{region.occupancyPeak}%</p>
                </div>
                <div>
                  <p className="text-slate-500">Shoulder ({region.shoulderMonths}mo)</p>
                  <p className="font-bold text-amber-600">{region.occupancyShoulder}%</p>
                </div>
                <div>
                  <p className="text-slate-500">Off-season ({region.offMonths}mo)</p>
                  <p className="font-bold text-slate-500">{region.occupancyOff}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Villa4you CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-700 to-blue-800 p-5 text-white">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-bold">Maximize Your Returns with Villa4you</h4>
            <p className="text-sm text-cyan-100 mt-1">
              Villa4you offers flexible management from 0% (self-managed with tools) to 20% (full management).
              Multi-platform distribution across 30+ channels, dynamic pricing, cleaning coordination, and owner dashboard included.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">&#10003; 30+ Booking Channels</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">&#10003; Dynamic Pricing</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">&#10003; Owner Dashboard</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">&#10003; Service Coordination</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">&#10003; Transparent Reporting</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/for-owners" className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-cyan-700 text-center hover:bg-cyan-50">
              Explore Owner Options
            </Link>
            <Link href="/free-evaluation" className="rounded-lg border border-white/40 px-5 py-2 text-xs font-medium text-white text-center hover:bg-white/10">
              Free Property Evaluation
            </Link>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <h5 className="text-[10px] font-bold text-slate-600 mb-1">Data Sources & Methodology</h5>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Tax rates: Greek Tax Code Law 5246/2025 (effective Jan 2026). Corporate tax: 22% flat (PwC Greece).
          Rental income brackets: 15% / 25% / 35% / 45% (iLand, Elxis.com, Euronews confirmation).
          Occupancy & ADR: AirDNA Greece 2025 market data ({"\u20AC"}139 national ADR, 54.7% avg occupancy).
          PM fees: Greece-Invest (20%), Wise/Athens (18%+), Hostaway (20% industry avg), Lodgify (20-30% full service).
          STR daily fee: {"\u20AC"}8/day peak, {"\u20AC"}2/day off-season (Greek Gov 2025). Annual registration: {"\u20AC"}600/property.
          ENFIA: {"\u20AC"}2.50-{"\u20AC"}16.25/sqm (Prosperty). Golden Visa: {"\u20AC"}250K/{"\u20AC"}400K/{"\u20AC"}800K zones (2024 update).
          Property values: aggregated from Spitogatos, RE/MAX Greece, Tranio regional averages.
          This calculator provides estimates for planning purposes only. Consult a Greek tax advisor for precise calculations.
        </p>
      </div>
    </div>
  );
}

