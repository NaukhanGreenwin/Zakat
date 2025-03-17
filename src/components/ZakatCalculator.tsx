"use client";

import { useEffect, useState } from 'react';
import { ZakatFormData, ZakatCalculation } from '../types';
import { calculateZakat, calculateNisabThreshold, DEFAULT_ZAKAT_RATE } from '../utils/calculations';
import { useMetalRates } from '../hooks/useMetalRates';
import ZakatForm from './ZakatForm';
import ZakatResults from './ZakatResults';

export default function ZakatCalculator() {
  const { goldPricePerGram } = useMetalRates();
  
  const initialFormData: ZakatFormData = {
    userInfo: {
      name: '',
      contactInfo: '',
    },
    financialAssets: {
      cash: {
        physical: 0,
        bank: 0,
      },
      preciousMetals: {
        gold: {
          weight: 0,
          unit: 'g',
          currentPrice: 0,
        },
        silver: {
          weight: 0,
          unit: 'g',
          currentPrice: 0,
        },
      },
      investments: {
        stocks: 0,
        mutualFunds: 0,
        bonds: 0,
      },
      retirement: {
        type: '',
        liquidValue: 0,
      },
      realEstate: {
        investmentProperties: 0,
        rentalIncome: 0,
        personalUse: false,
      },
      business: {
        inventory: 0,
        accountsReceivable: 0,
        cashInAccounts: 0,
      },
    },
    liabilities: {
      debts: 0,
      pendingTaxes: 0,
      obligations: 0,
    },
    calculationSettings: {
      nisabThreshold: calculateNisabThreshold(goldPricePerGram > 0 ? goldPricePerGram : undefined),
      zakatRate: DEFAULT_ZAKAT_RATE,
    },
  };

  const [formData, setFormData] = useState<ZakatFormData>(initialFormData);
  const [results, setResults] = useState<ZakatCalculation | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Update Nisab threshold when gold price changes
  useEffect(() => {
    if (goldPricePerGram > 0) {
      setFormData(prevData => ({
        ...prevData,
        calculationSettings: {
          ...prevData.calculationSettings,
          nisabThreshold: calculateNisabThreshold(goldPricePerGram)
        }
      }));
    }
  }, [goldPricePerGram]);

  const handleCalculate = () => {
    const calculationResults = calculateZakat(formData);
    setResults(calculationResults);
    setShowResults(true);
  };

  const handleReset = () => {
    // Use the current gold price for the Nisab threshold in the reset form
    const resetFormData = {
      ...initialFormData,
      calculationSettings: {
        ...initialFormData.calculationSettings,
        nisabThreshold: calculateNisabThreshold(goldPricePerGram > 0 ? goldPricePerGram : undefined)
      }
    };
    
    setFormData(resetFormData);
    setResults(null);
    setShowResults(false);
  };

  const handleUpdateForm = (updatedData: Partial<ZakatFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl">
      <div className="md:flex">
        <div className={`w-full ${showResults ? 'md:w-1/2' : 'md:w-full'} p-8`}>
          <ZakatForm 
            formData={formData}
            onUpdateForm={handleUpdateForm}
            onCalculate={handleCalculate}
            onReset={handleReset}
          />
        </div>
        
        {showResults && results && (
          <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-emerald-500 to-teal-700 text-white">
            <ZakatResults results={results} />
          </div>
        )}
      </div>
    </div>
  );
} 