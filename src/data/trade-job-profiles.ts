import type { TradeSlug } from "./trades";

export interface TradeJobProfile {
  /** Typical mid-tier job used in worked examples */
  avgJobLabel: string;
  avgJobValue: number;
  /** A smaller, common job type + price range */
  lowJob: { label: string; low: number; high: number };
  /** A larger, high-ticket job type + price range */
  highJob: { label: string; low: number; high: number };
  /** What a "commercial" / high-tier recurring client looks like for this trade */
  commercialExample: string;
  commercialAnnualValue: number;
  /** Loaded hourly crew cost used in COGS breakdowns */
  crewHourlyCost: number;
  /** Recurring/repeat service naming for retention & ascension content */
  recurringServiceLabel: string;
}

export const tradeJobProfiles: Record<TradeSlug, TradeJobProfile> = {
  roofing: {
    avgJobLabel: "roof repair",
    avgJobValue: 1800,
    lowJob: { label: "minor leak repair", low: 400, high: 900 },
    highJob: { label: "full roof replacement", low: 8000, high: 16000 },
    commercialExample: "a property management company with a 40-unit portfolio",
    commercialAnnualValue: 28000,
    crewHourlyCost: 65,
    recurringServiceLabel: "annual roof inspection",
  },
  hvac: {
    avgJobLabel: "AC repair",
    avgJobValue: 650,
    lowJob: { label: "diagnostic + minor repair", low: 150, high: 450 },
    highJob: { label: "full system replacement", low: 5000, high: 11000 },
    commercialExample: "a commercial property with rooftop units under a service contract",
    commercialAnnualValue: 22000,
    crewHourlyCost: 70,
    recurringServiceLabel: "seasonal maintenance tune-up",
  },
  electrical: {
    avgJobLabel: "panel upgrade",
    avgJobValue: 2400,
    lowJob: { label: "fixture or outlet install", low: 150, high: 400 },
    highJob: { label: "full home rewire", low: 6000, high: 15000 },
    commercialExample: "a commercial building on a quarterly electrical safety contract",
    commercialAnnualValue: 18000,
    crewHourlyCost: 75,
    recurringServiceLabel: "annual safety inspection",
  },
  plumbing: {
    avgJobLabel: "water heater replacement",
    avgJobValue: 1600,
    lowJob: { label: "drain clearing", low: 150, high: 350 },
    highJob: { label: "full repipe", low: 4000, high: 9000 },
    commercialExample: "a property management company managing multiple rental units",
    commercialAnnualValue: 20000,
    crewHourlyCost: 65,
    recurringServiceLabel: "annual plumbing inspection",
  },
  "lawn-care": {
    avgJobLabel: "seasonal cleanup",
    avgJobValue: 450,
    lowJob: { label: "one-time mow", low: 50, high: 100 },
    highJob: { label: "full property renovation (aeration, seeding, mulch)", low: 2000, high: 6000 },
    commercialExample: "an HOA with 100+ homes on a weekly service contract",
    commercialAnnualValue: 35000,
    crewHourlyCost: 45,
    recurringServiceLabel: "weekly mowing route",
  },
  "tree-service": {
    avgJobLabel: "tree removal",
    avgJobValue: 2000,
    lowJob: { label: "pruning / trim", low: 300, high: 700 },
    highJob: { label: "large removal with crane", low: 5000, high: 12000 },
    commercialExample: "a municipality or HOA with a standing tree-maintenance contract",
    commercialAnnualValue: 25000,
    crewHourlyCost: 50,
    recurringServiceLabel: "annual pruning visit",
  },
  landscaping: {
    avgJobLabel: "landscape refresh",
    avgJobValue: 3500,
    lowJob: { label: "seasonal bed cleanup", low: 300, high: 800 },
    highJob: { label: "design-build hardscape project", low: 10000, high: 40000 },
    commercialExample: "a commercial property on a monthly grounds-maintenance contract",
    commercialAnnualValue: 30000,
    crewHourlyCost: 55,
    recurringServiceLabel: "quarterly maintenance visit",
  },
  painting: {
    avgJobLabel: "exterior repaint",
    avgJobValue: 3800,
    lowJob: { label: "single interior room", low: 400, high: 900 },
    highJob: { label: "full exterior repaint", low: 4500, high: 9500 },
    commercialExample: "a multi-unit apartment complex on a rotating repaint contract",
    commercialAnnualValue: 32000,
    crewHourlyCost: 55,
    recurringServiceLabel: "annual touch-up visit",
  },
  remodeling: {
    avgJobLabel: "bathroom remodel",
    avgJobValue: 12000,
    lowJob: { label: "bathroom refresh", low: 5000, high: 10000 },
    highJob: { label: "kitchen remodel / home addition", low: 25000, high: 80000 },
    commercialExample: "a property investor doing recurring unit renovations",
    commercialAnnualValue: 60000,
    crewHourlyCost: 70,
    recurringServiceLabel: "annual maintenance walkthrough",
  },
  "general-contractors": {
    avgJobLabel: "renovation project",
    avgJobValue: 15000,
    lowJob: { label: "small repair project", low: 1000, high: 3000 },
    highJob: { label: "full renovation or build-out", low: 20000, high: 100000 },
    commercialExample: "a commercial buildout client with repeat projects",
    commercialAnnualValue: 80000,
    crewHourlyCost: 70,
    recurringServiceLabel: "annual property assessment",
  },
  "junk-removal": {
    avgJobLabel: "full truckload pickup",
    avgJobValue: 400,
    lowJob: { label: "single item pickup", low: 75, high: 150 },
    highJob: { label: "full estate or property cleanout", low: 1500, high: 4000 },
    commercialExample: "a property management company with recurring cleanout needs",
    commercialAnnualValue: 15000,
    crewHourlyCost: 45,
    recurringServiceLabel: "recurring monthly pickup",
  },
  "pest-control": {
    avgJobLabel: "initial pest treatment",
    avgJobValue: 350,
    lowJob: { label: "one-time spray", low: 100, high: 200 },
    highJob: { label: "termite treatment", low: 1200, high: 3000 },
    commercialExample: "a commercial property on a quarterly pest management contract",
    commercialAnnualValue: 16000,
    crewHourlyCost: 45,
    recurringServiceLabel: "quarterly maintenance visit",
  },
};
