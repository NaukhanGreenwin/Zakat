"use client";

import { ZakatCalculation } from '../types';

interface ZakatResultsProps {
  results: ZakatCalculation;
}

export default function ZakatResults({ results }: ZakatResultsProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Zakat Calculation Results</h2>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex-1">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/30">
            <span className="text-lg font-medium">Total Assets</span>
            <span className="text-xl font-semibold">{formatCurrency(results.totalAssets)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-white/30">
            <span className="text-lg font-medium">Total Liabilities</span>
            <span className="text-xl font-semibold">{formatCurrency(results.totalLiabilities)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-white/30">
            <span className="text-lg font-medium">Net Zakatable Wealth</span>
            <span className="text-xl font-semibold">{formatCurrency(results.netZakatableWealth)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-white/30">
            <span className="text-lg font-medium">Nisab Threshold</span>
            <span className="text-xl font-semibold">{formatCurrency(results.nisabThreshold)}</span>
          </div>
          
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center py-4 px-6 bg-white/20 backdrop-blur-md rounded-lg">
              <h3 className="text-lg font-medium mb-1">Zakat Due</h3>
              <span className="text-3xl font-bold mb-2">
                {results.netZakatableWealth > results.nisabThreshold 
                  ? formatCurrency(results.zakatAmount) 
                  : 'No Zakat Due'}
              </span>
              {results.netZakatableWealth <= results.nisabThreshold && (
                <p className="text-sm text-center opacity-80">
                  Your net wealth is below the Nisab threshold. Zakat is not obligatory.
                </p>
              )}
              {results.netZakatableWealth > results.nisabThreshold && (
                <p className="text-sm text-center opacity-80">
                  Based on 2.5% of your net wealth above Nisab
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm opacity-80">
            Calculation Date: {formatDate(results.calculationDate)}
          </div>
          
          <div className="mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-md font-medium mb-2">Reminder</h4>
              <p className="text-sm opacity-90">
                Zakat should be paid once a year on wealth that has been in your possession for one lunar year.
                Consult with a knowledgeable scholar for specific questions about your Zakat obligations.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-white text-emerald-800 font-medium rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
        >
          Print Results
        </button>
      </div>
    </div>
  );
} 