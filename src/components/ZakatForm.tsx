"use client";

import { useState, useEffect } from 'react';
import { ZakatFormData } from '../types';
import { DEFAULT_GOLD_PRICE_PER_GRAM, DEFAULT_SILVER_PRICE_PER_GRAM } from '../utils/calculations';
import { useMetalRates } from '../hooks/useMetalRates';

interface ZakatFormProps {
  formData: ZakatFormData;
  onUpdateForm: (data: Partial<ZakatFormData>) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export default function ZakatForm({ formData, onUpdateForm, onCalculate, onReset }: ZakatFormProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const { 
    goldPricePerGram, 
    silverPricePerGram, 
    goldPricePerOz, 
    silverPricePerOz, 
    isLoading, 
    error, 
    lastUpdated,
    refreshRates
  } = useMetalRates();

  // Update gold and silver prices when they're loaded from the API
  useEffect(() => {
    if (goldPricePerGram > 0 && silverPricePerGram > 0) {
      const updatedFormData = { ...formData };
      
      // Only update if user hasn't manually set prices
      if (!updatedFormData.financialAssets.preciousMetals.gold.currentPrice) {
        updatedFormData.financialAssets.preciousMetals.gold.currentPrice = 
          updatedFormData.financialAssets.preciousMetals.gold.unit === 'g' ? goldPricePerGram : goldPricePerOz;
      }
      
      if (!updatedFormData.financialAssets.preciousMetals.silver.currentPrice) {
        updatedFormData.financialAssets.preciousMetals.silver.currentPrice = 
          updatedFormData.financialAssets.preciousMetals.silver.unit === 'g' ? silverPricePerGram : silverPricePerOz;
      }
      
      onUpdateForm(updatedFormData);
    }
  }, [goldPricePerGram, silverPricePerGram, goldPricePerOz, silverPricePerOz]);

  // Update prices when unit changes
  useEffect(() => {
    const goldUnit = formData.financialAssets.preciousMetals.gold.unit;
    const silverUnit = formData.financialAssets.preciousMetals.silver.unit;
    
    const updatedFormData = { ...formData };
    
    // Only update if we have API prices and user hasn't manually set prices
    if (goldPricePerGram > 0 && !updatedFormData.financialAssets.preciousMetals.gold.currentPrice) {
      updatedFormData.financialAssets.preciousMetals.gold.currentPrice = 
        goldUnit === 'g' ? goldPricePerGram : goldPricePerOz;
    }
    
    if (silverPricePerGram > 0 && !updatedFormData.financialAssets.preciousMetals.silver.currentPrice) {
      updatedFormData.financialAssets.preciousMetals.silver.currentPrice = 
        silverUnit === 'g' ? silverPricePerGram : silverPricePerOz;
    }
    
    onUpdateForm(updatedFormData);
  }, [formData.financialAssets.preciousMetals.gold.unit, formData.financialAssets.preciousMetals.silver.unit]);

  const handleInputChange = (section: keyof ZakatFormData, subSection: string, field: string, value: any) => {
    const numericValue = typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value;
    
    const updatedFormData = { ...formData };
    
    if (section === 'userInfo') {
      updatedFormData.userInfo = {
        ...updatedFormData.userInfo,
        [field]: value,
      };
    } else if (section === 'financialAssets') {
      const updatedAssets = { ...updatedFormData.financialAssets };
      
      if (subSection === 'cash') {
        updatedAssets.cash = {
          ...updatedAssets.cash,
          [field]: numericValue,
        };
      } else if (subSection === 'gold' || subSection === 'silver') {
        updatedAssets.preciousMetals[subSection] = {
          ...updatedAssets.preciousMetals[subSection],
          [field]: field === 'unit' ? value : numericValue,
        };
      } else if (subSection === 'investments') {
        updatedAssets.investments = {
          ...updatedAssets.investments,
          [field]: numericValue,
        };
      } else if (subSection === 'retirement') {
        updatedAssets.retirement = {
          ...updatedAssets.retirement,
          [field]: field === 'type' ? value : numericValue,
        };
      } else if (subSection === 'realEstate') {
        updatedAssets.realEstate = {
          ...updatedAssets.realEstate,
          [field]: field === 'personalUse' ? value === 'true' : numericValue,
        };
      } else if (subSection === 'business') {
        updatedAssets.business = {
          ...updatedAssets.business,
          [field]: numericValue,
        };
      }
      
      updatedFormData.financialAssets = updatedAssets;
    } else if (section === 'liabilities') {
      updatedFormData.liabilities = {
        ...updatedFormData.liabilities,
        [field]: numericValue,
      };
    }
    
    onUpdateForm(updatedFormData);
  };

  const renderPersonalSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (optional)</label>
        <input
          type="text"
          id="name"
          value={formData.userInfo.name}
          onChange={(e) => handleInputChange('userInfo', '', 'name', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Information (optional)</label>
        <input
          type="text"
          id="contactInfo"
          value={formData.userInfo.contactInfo}
          onChange={(e) => handleInputChange('userInfo', '', 'contactInfo', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderCashSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Cash and Bank Balances</h3>
      <div className="space-y-2">
        <label htmlFor="cash-physical" className="block text-sm font-medium text-gray-700">Cash on Hand</label>
        <input
          type="number"
          id="cash-physical"
          value={formData.financialAssets.cash.physical || ''}
          onChange={(e) => handleInputChange('financialAssets', 'cash', 'physical', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="cash-bank" className="block text-sm font-medium text-gray-700">Bank Account Balances</label>
        <input
          type="number"
          id="cash-bank"
          value={formData.financialAssets.cash.bank || ''}
          onChange={(e) => handleInputChange('financialAssets', 'cash', 'bank', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderPreciousMetalsSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Gold and Silver</h3>
      
      {lastUpdated && (
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Prices last updated:</span> {lastUpdated.toLocaleString()}
          <button 
            onClick={refreshRates}
            className="ml-2 text-emerald-600 hover:text-emerald-800 underline text-xs"
          >
            Refresh
          </button>
        </div>
      )}
      
      {error && (
        <div className="text-sm text-red-600 mb-2">
          {error}
        </div>
      )}
      
      <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50">
        <h4 className="text-md font-medium">Gold</h4>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            <label htmlFor="gold-weight" className="block text-sm font-medium text-gray-700">Weight</label>
            <input
              type="number"
              id="gold-weight"
              value={formData.financialAssets.preciousMetals.gold.weight || ''}
              onChange={(e) => handleInputChange('financialAssets', 'gold', 'weight', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gold-unit" className="block text-sm font-medium text-gray-700">Unit</label>
            <select
              id="gold-unit"
              value={formData.financialAssets.preciousMetals.gold.unit}
              onChange={(e) => handleInputChange('financialAssets', 'gold', 'unit', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="g">Grams</option>
              <option value="oz">Ounces</option>
            </select>
          </div>
        </div>
        <div className="space-y-2 mt-2">
          <label htmlFor="gold-price" className="block text-sm font-medium text-gray-700">
            Current Price per {formData.financialAssets.preciousMetals.gold.unit === 'g' ? 'gram' : 'ounce'}
            {isLoading && <span className="ml-2 text-xs text-gray-500">(Loading...)</span>}
          </label>
          <input
            type="number"
            id="gold-price"
            value={formData.financialAssets.preciousMetals.gold.currentPrice || ''}
            onChange={(e) => handleInputChange('financialAssets', 'gold', 'currentPrice', e.target.value)}
            placeholder={`Current: $${formData.financialAssets.preciousMetals.gold.unit === 'g' ? 
              (goldPricePerGram || DEFAULT_GOLD_PRICE_PER_GRAM).toFixed(2) : 
              (goldPricePerOz || DEFAULT_GOLD_PRICE_PER_GRAM * 31.1).toFixed(2)}`}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="border-l-4 border-gray-400 pl-4 py-2 bg-gray-50">
        <h4 className="text-md font-medium">Silver</h4>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            <label htmlFor="silver-weight" className="block text-sm font-medium text-gray-700">Weight</label>
            <input
              type="number"
              id="silver-weight"
              value={formData.financialAssets.preciousMetals.silver.weight || ''}
              onChange={(e) => handleInputChange('financialAssets', 'silver', 'weight', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="silver-unit" className="block text-sm font-medium text-gray-700">Unit</label>
            <select
              id="silver-unit"
              value={formData.financialAssets.preciousMetals.silver.unit}
              onChange={(e) => handleInputChange('financialAssets', 'silver', 'unit', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="g">Grams</option>
              <option value="oz">Ounces</option>
            </select>
          </div>
        </div>
        <div className="space-y-2 mt-2">
          <label htmlFor="silver-price" className="block text-sm font-medium text-gray-700">
            Current Price per {formData.financialAssets.preciousMetals.silver.unit === 'g' ? 'gram' : 'ounce'}
            {isLoading && <span className="ml-2 text-xs text-gray-500">(Loading...)</span>}
          </label>
          <input
            type="number"
            id="silver-price"
            value={formData.financialAssets.preciousMetals.silver.currentPrice || ''}
            onChange={(e) => handleInputChange('financialAssets', 'silver', 'currentPrice', e.target.value)}
            placeholder={`Current: $${formData.financialAssets.preciousMetals.silver.unit === 'g' ? 
              (silverPricePerGram || DEFAULT_SILVER_PRICE_PER_GRAM).toFixed(2) : 
              (silverPricePerOz || DEFAULT_SILVER_PRICE_PER_GRAM * 31.1).toFixed(2)}`}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );

  const renderInvestmentsSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Investments</h3>
      <div className="space-y-2">
        <label htmlFor="investments-stocks" className="block text-sm font-medium text-gray-700">Stocks and Shares (market value)</label>
        <input
          type="number"
          id="investments-stocks"
          value={formData.financialAssets.investments.stocks || ''}
          onChange={(e) => handleInputChange('financialAssets', 'investments', 'stocks', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="investments-mutualFunds" className="block text-sm font-medium text-gray-700">Mutual Funds and ETFs (market value)</label>
        <input
          type="number"
          id="investments-mutualFunds"
          value={formData.financialAssets.investments.mutualFunds || ''}
          onChange={(e) => handleInputChange('financialAssets', 'investments', 'mutualFunds', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="investments-bonds" className="block text-sm font-medium text-gray-700">Bonds or Fixed-Income Securities (market value)</label>
        <input
          type="number"
          id="investments-bonds"
          value={formData.financialAssets.investments.bonds || ''}
          onChange={(e) => handleInputChange('financialAssets', 'investments', 'bonds', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderRetirementSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Retirement Accounts</h3>
      <div className="space-y-2">
        <label htmlFor="retirement-type" className="block text-sm font-medium text-gray-700">Type of Account (401(k), RRSP, pension, etc.)</label>
        <input
          type="text"
          id="retirement-type"
          value={formData.financialAssets.retirement.type}
          onChange={(e) => handleInputChange('financialAssets', 'retirement', 'type', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="retirement-liquidValue" className="block text-sm font-medium text-gray-700">Amount that can be accessed immediately (liquid value)</label>
        <input
          type="number"
          id="retirement-liquidValue"
          value={formData.financialAssets.retirement.liquidValue || ''}
          onChange={(e) => handleInputChange('financialAssets', 'retirement', 'liquidValue', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderRealEstateSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Real Estate and Properties</h3>
      <div className="space-y-2">
        <label htmlFor="realEstate-investmentProperties" className="block text-sm font-medium text-gray-700">Investment Properties (current market value)</label>
        <input
          type="number"
          id="realEstate-investmentProperties"
          value={formData.financialAssets.realEstate.investmentProperties || ''}
          onChange={(e) => handleInputChange('financialAssets', 'realEstate', 'investmentProperties', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="realEstate-rentalIncome" className="block text-sm font-medium text-gray-700">Rental Income (net yearly amount)</label>
        <input
          type="number"
          id="realEstate-rentalIncome"
          value={formData.financialAssets.realEstate.rentalIncome || ''}
          onChange={(e) => handleInputChange('financialAssets', 'realEstate', 'rentalIncome', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Is this property for personal use?</label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="personal-yes"
              name="personalUse"
              value="true"
              checked={formData.financialAssets.realEstate.personalUse === true}
              onChange={(e) => handleInputChange('financialAssets', 'realEstate', 'personalUse', e.target.value)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="personal-yes" className="ml-2 block text-sm text-gray-700">Yes</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="personal-no"
              name="personalUse"
              value="false"
              checked={formData.financialAssets.realEstate.personalUse === false}
              onChange={(e) => handleInputChange('financialAssets', 'realEstate', 'personalUse', e.target.value)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="personal-no" className="ml-2 block text-sm text-gray-700">No</label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Business Assets</h3>
      <div className="space-y-2">
        <label htmlFor="business-inventory" className="block text-sm font-medium text-gray-700">Inventory Value (current market or resale value)</label>
        <input
          type="number"
          id="business-inventory"
          value={formData.financialAssets.business.inventory || ''}
          onChange={(e) => handleInputChange('financialAssets', 'business', 'inventory', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="business-accountsReceivable" className="block text-sm font-medium text-gray-700">Accounts Receivable (outstanding payments owed to you)</label>
        <input
          type="number"
          id="business-accountsReceivable"
          value={formData.financialAssets.business.accountsReceivable || ''}
          onChange={(e) => handleInputChange('financialAssets', 'business', 'accountsReceivable', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="business-cashInAccounts" className="block text-sm font-medium text-gray-700">Cash in Business Accounts</label>
        <input
          type="number"
          id="business-cashInAccounts"
          value={formData.financialAssets.business.cashInAccounts || ''}
          onChange={(e) => handleInputChange('financialAssets', 'business', 'cashInAccounts', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderLiabilitiesSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Liabilities</h3>
      <div className="space-y-2">
        <label htmlFor="liabilities-debts" className="block text-sm font-medium text-gray-700">Outstanding Debts (loans, credit card balances, mortgages—due within current year)</label>
        <input
          type="number"
          id="liabilities-debts"
          value={formData.liabilities.debts || ''}
          onChange={(e) => handleInputChange('liabilities', '', 'debts', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="liabilities-pendingTaxes" className="block text-sm font-medium text-gray-700">Pending Taxes or Obligatory Payments Owed</label>
        <input
          type="number"
          id="liabilities-pendingTaxes"
          value={formData.liabilities.pendingTaxes || ''}
          onChange={(e) => handleInputChange('liabilities', '', 'pendingTaxes', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="liabilities-obligations" className="block text-sm font-medium text-gray-700">Any Immediate Obligations that Reduce Net Wealth</label>
        <input
          type="number"
          id="liabilities-obligations"
          value={formData.liabilities.obligations || ''}
          onChange={(e) => handleInputChange('liabilities', '', 'obligations', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal': return renderPersonalSection();
      case 'cash': return renderCashSection();
      case 'metals': return renderPreciousMetalsSection();
      case 'investments': return renderInvestmentsSection();
      case 'retirement': return renderRetirementSection();
      case 'realEstate': return renderRealEstateSection();
      case 'business': return renderBusinessSection();
      case 'liabilities': return renderLiabilitiesSection();
      default: return renderPersonalSection();
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">Zakat Calculator</h2>
      
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-1 border-b">
          {['personal', 'cash', 'metals', 'investments', 'retirement', 'realEstate', 'business', 'liabilities'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`py-2 px-3 text-xs sm:text-sm md:text-base font-medium rounded-t-lg transition-colors ${
                activeSection === section
                  ? 'bg-emerald-100 text-emerald-800 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {section === 'personal' ? 'Personal' : 
               section === 'cash' ? 'Cash' : 
               section === 'metals' ? 'Gold & Silver' :
               section === 'investments' ? 'Investments' :
               section === 'retirement' ? 'Retirement' :
               section === 'realEstate' ? 'Real Estate' :
               section === 'business' ? 'Business' :
               'Liabilities'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        {renderActiveSection()}
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={onCalculate}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-medium rounded-md shadow hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
        >
          Calculate Zakat
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-white text-gray-700 font-medium rounded-md shadow border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
} 