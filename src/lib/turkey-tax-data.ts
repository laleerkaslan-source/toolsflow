// Türkiye Vergi & SGK Verileri — 2025/2026
// Bu dosya tek kaynak noktası. Oranlar değiştiğinde sadece burası güncellenir.

export const TAX_YEARS = [2026, 2025] as const;
export type TaxYear = (typeof TAX_YEARS)[number];

// Gelir Vergisi Dilimleri (Ücret Gelirleri)
export const INCOME_TAX_BRACKETS: Record<TaxYear, { limit: number; rate: number }[]> = {
  2026: [
    { limit: 158_000, rate: 0.15 },
    { limit: 330_000, rate: 0.20 },
    { limit: 800_000, rate: 0.27 },
    { limit: 1_900_000, rate: 0.35 },
    { limit: Infinity, rate: 0.40 },
  ],
  2025: [
    { limit: 110_000, rate: 0.15 },
    { limit: 230_000, rate: 0.20 },
    { limit: 580_000, rate: 0.27 },
    { limit: 1_500_000, rate: 0.35 },
    { limit: Infinity, rate: 0.40 },
  ],
};

// SGK Oranları
export const SGK_RATES = {
  employee: {
    premium: 0.14, // İşçi SGK Primi
    unemployment: 0.01, // İşçi İşsizlik Sigortası
  },
  employer: {
    premium: 0.205, // İşveren SGK Primi (hazine indirimsiz)
    premiumWithDiscount: 0.155, // İşveren SGK Primi (5 puan hazine indirimi)
    unemployment: 0.02, // İşveren İşsizlik Sigortası
  },
};

// Damga Vergisi Oranı
export const STAMP_TAX_RATE = 0.00759;

// SGK Tavan ve Taban
export const SGK_LIMITS: Record<TaxYear, { ceiling: number; floor: number }> = {
  2026: { ceiling: 176_419.80, floor: 26_005.50 },
  2025: { ceiling: 132_657.60, floor: 22_104.00 },
};

// Asgari Ücret (Aylık Brüt)
export const MINIMUM_WAGE: Record<TaxYear, number> = {
  2026: 26_005.50,
  2025: 22_104.00,
};

// Kıdem Tazminatı Tavanı (6 aylık dönemler)
export const SEVERANCE_CEILING: Record<string, number> = {
  "2026-H1": 41_828.42,
  "2025-H2": 35_058.58,
  "2025-H1": 30_019.15,
  "2024-H2": 23_489.83,
};

// KDV Oranları
export const VAT_RATES = [
  { rate: 1, label: { tr: "%1 — Temel gıda maddeleri", en: "1% — Basic food items" } },
  { rate: 10, label: { tr: "%10 — Temel ihtiyaç malları", en: "10% — Essential goods" } },
  { rate: 20, label: { tr: "%20 — Standart oran", en: "20% — Standard rate" } },
];

// KKDF (Kaynak Kullanımını Destekleme Fonu)
export const KKDF_RATE = 0.15; // Tüketici kredileri için

// BSMV (Banka ve Sigorta Muameleleri Vergisi)
export const BSMV_RATE = 0.10;

// Gelir vergisi hesaplama fonksiyonu
export function calculateIncomeTax(
  taxableIncome: number,
  cumulativeIncome: number,
  year: TaxYear
): number {
  const brackets = INCOME_TAX_BRACKETS[year];
  let tax = 0;
  let remaining = taxableIncome;
  let currentBase = cumulativeIncome;

  for (const bracket of brackets) {
    if (currentBase >= bracket.limit) {
      currentBase = currentBase; // already past this bracket
      continue;
    }
    const taxableInBracket = Math.min(remaining, bracket.limit - currentBase);
    if (taxableInBracket <= 0) continue;
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    currentBase += taxableInBracket;
    if (remaining <= 0) break;
  }

  return tax;
}

// Net maaş hesaplama
export function calculateNetSalary(
  grossSalary: number,
  year: TaxYear,
  cumulativeIncome: number = 0,
  applyMinWageExemption: boolean = true
) {
  const sgkEmployee = Math.min(grossSalary, SGK_LIMITS[year].ceiling) * SGK_RATES.employee.premium;
  const unemploymentEmployee = Math.min(grossSalary, SGK_LIMITS[year].ceiling) * SGK_RATES.employee.unemployment;
  const stampTax = grossSalary * STAMP_TAX_RATE;

  const taxableIncome = grossSalary - sgkEmployee - unemploymentEmployee;
  const incomeTax = calculateIncomeTax(taxableIncome, cumulativeIncome, year);

  // Asgari ücret vergi istisnası
  let minWageExemption = 0;
  if (applyMinWageExemption) {
    const minWage = MINIMUM_WAGE[year];
    const minWageSgk = minWage * SGK_RATES.employee.premium;
    const minWageUnemployment = minWage * SGK_RATES.employee.unemployment;
    const minWageTaxable = minWage - minWageSgk - minWageUnemployment;
    const minWageTax = calculateIncomeTax(minWageTaxable, cumulativeIncome, year);
    const minWageStamp = minWage * STAMP_TAX_RATE;
    minWageExemption = minWageTax + minWageStamp;
  }

  const totalDeductions = sgkEmployee + unemploymentEmployee + incomeTax + stampTax - minWageExemption;
  const netSalary = grossSalary - totalDeductions;

  // İşveren maliyeti
  const sgkEmployer = Math.min(grossSalary, SGK_LIMITS[year].ceiling) * SGK_RATES.employer.premiumWithDiscount;
  const unemploymentEmployer = Math.min(grossSalary, SGK_LIMITS[year].ceiling) * SGK_RATES.employer.unemployment;
  const totalEmployerCost = grossSalary + sgkEmployer + unemploymentEmployer;

  return {
    grossSalary,
    sgkEmployee,
    unemploymentEmployee,
    incomeTax,
    stampTax,
    minWageExemption,
    totalDeductions,
    netSalary,
    sgkEmployer,
    unemploymentEmployer,
    totalEmployerCost,
    newCumulativeIncome: cumulativeIncome + taxableIncome,
  };
}
