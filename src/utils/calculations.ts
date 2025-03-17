import { FinancialAssets, Liabilities, ZakatCalculation, ZakatFormData } from '../types';

export const DEFAULT_ZAKAT_RATE = 0.025; // 2.5%

// Gold and Silver prices can be updated with real-time API in a production version
export const DEFAULT_GOLD_PRICE_PER_GRAM = 75; // USD
export const DEFAULT_SILVER_PRICE_PER_GRAM = 0.85; // USD

// Nisab threshold is approximately 85 grams of gold or 595 grams of silver
export const calculateNisabThreshold = (goldPrice: number = DEFAULT_GOLD_PRICE_PER_GRAM): number => {
  return 85 * goldPrice; // Using gold standard for Nisab
};

export const calculateTotalAssets = (assets: FinancialAssets): number => {
  const cashTotal = assets.cash.physical + assets.cash.bank;
  
  const goldValue = assets.preciousMetals.gold.weight * 
    (assets.preciousMetals.gold.unit === 'oz' ? 31.1 : 1) * 
    (assets.preciousMetals.gold.currentPrice || DEFAULT_GOLD_PRICE_PER_GRAM);
  
  const silverValue = assets.preciousMetals.silver.weight * 
    (assets.preciousMetals.silver.unit === 'oz' ? 31.1 : 1) * 
    (assets.preciousMetals.silver.currentPrice || DEFAULT_SILVER_PRICE_PER_GRAM);
  
  const investmentsTotal = assets.investments.stocks + assets.investments.mutualFunds + assets.investments.bonds;
  
  const retirementTotal = assets.retirement.liquidValue;
  
  // Only include investment properties, not personal use
  const realEstateTotal = assets.realEstate.personalUse ? 0 : assets.realEstate.investmentProperties;
  const rentalIncomeTotal = assets.realEstate.rentalIncome;
  
  const businessTotal = assets.business.inventory + assets.business.accountsReceivable + assets.business.cashInAccounts;
  
  return cashTotal + goldValue + silverValue + investmentsTotal + retirementTotal + realEstateTotal + rentalIncomeTotal + businessTotal;
};

export const calculateTotalLiabilities = (liabilities: Liabilities): number => {
  return liabilities.debts + liabilities.pendingTaxes + liabilities.obligations;
};

export const calculateZakat = (data: ZakatFormData): ZakatCalculation => {
  const totalAssets = calculateTotalAssets(data.financialAssets);
  const totalLiabilities = calculateTotalLiabilities(data.liabilities);
  const netZakatableWealth = totalAssets - totalLiabilities;
  
  const nisabThreshold = data.calculationSettings.nisabThreshold || calculateNisabThreshold();
  const zakatRate = data.calculationSettings.zakatRate || DEFAULT_ZAKAT_RATE;
  
  // Zakat is paid only if net wealth exceeds the Nisab threshold
  const zakatAmount = netZakatableWealth > nisabThreshold ? netZakatableWealth * zakatRate : 0;
  
  return {
    totalAssets,
    totalLiabilities,
    netZakatableWealth,
    zakatAmount,
    calculationDate: new Date(),
    nisabThreshold
  };
}; 