export interface FinancialAssets {
  cash: {
    physical: number;
    bank: number;
  };
  preciousMetals: {
    gold: {
      weight: number;
      unit: 'g' | 'oz';
      currentPrice: number;
    };
    silver: {
      weight: number;
      unit: 'g' | 'oz';
      currentPrice: number;
    };
  };
  investments: {
    stocks: number;
    mutualFunds: number;
    bonds: number;
  };
  retirement: {
    type: string;
    liquidValue: number;
  };
  realEstate: {
    investmentProperties: number;
    rentalIncome: number;
    personalUse: boolean;
  };
  business: {
    inventory: number;
    accountsReceivable: number;
    cashInAccounts: number;
  };
}

export interface Liabilities {
  debts: number;
  pendingTaxes: number;
  obligations: number;
}

export interface ZakatCalculation {
  totalAssets: number;
  totalLiabilities: number;
  netZakatableWealth: number;
  zakatAmount: number;
  calculationDate: Date;
  nisabThreshold: number;
}

export interface UserInfo {
  name?: string;
  contactInfo?: string;
}

export interface ZakatFormData {
  userInfo: UserInfo;
  financialAssets: FinancialAssets;
  liabilities: Liabilities;
  calculationSettings: {
    nisabThreshold: number;
    zakatRate: number;
  };
} 