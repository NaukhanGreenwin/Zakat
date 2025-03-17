"use client";

import { useState, useEffect } from 'react';
import { fetchMetalRates } from '../utils/api';

// Storage keys
const METAL_RATES_KEY = 'zakat_calculator_metal_rates';
const LAST_UPDATED_KEY = 'zakat_calculator_last_updated';

// Update interval in milliseconds (8 hours)
const UPDATE_INTERVAL = 8 * 60 * 60 * 1000;

interface UseMetalRatesResult {
  goldPricePerGram: number;
  silverPricePerGram: number;
  goldPricePerOz: number;
  silverPricePerOz: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshRates: () => Promise<void>;
}

export function useMetalRates(): UseMetalRatesResult {
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(0);
  const [silverPricePerGram, setSilverPricePerGram] = useState<number>(0);
  const [goldPricePerOz, setGoldPricePerOz] = useState<number>(0);
  const [silverPricePerOz, setSilverPricePerOz] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadStoredRates = () => {
    if (typeof window === 'undefined') return false;

    try {
      const storedRates = localStorage.getItem(METAL_RATES_KEY);
      const storedLastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

      if (storedRates && storedLastUpdated) {
        const rates = JSON.parse(storedRates);
        const lastUpdatedTime = new Date(storedLastUpdated);
        
        // Check if the stored rates are still valid (less than 8 hours old)
        const now = new Date();
        const timeDiff = now.getTime() - lastUpdatedTime.getTime();
        
        if (timeDiff < UPDATE_INTERVAL) {
          setGoldPricePerGram(rates.goldPricePerGram);
          setSilverPricePerGram(rates.silverPricePerGram);
          setGoldPricePerOz(rates.goldPricePerOz);
          setSilverPricePerOz(rates.silverPricePerOz);
          setLastUpdated(lastUpdatedTime);
          setIsLoading(false);
          return true;
        }
      }
    } catch (err) {
      console.error('Error loading stored rates:', err);
    }
    
    return false;
  };

  const saveRatesToStorage = (rates: {
    goldPricePerGram: number;
    silverPricePerGram: number;
    goldPricePerOz: number;
    silverPricePerOz: number;
  }) => {
    if (typeof window === 'undefined') return;

    try {
      const now = new Date();
      localStorage.setItem(METAL_RATES_KEY, JSON.stringify(rates));
      localStorage.setItem(LAST_UPDATED_KEY, now.toISOString());
      setLastUpdated(now);
    } catch (err) {
      console.error('Error saving rates to storage:', err);
    }
  };

  const fetchRates = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const ratesData = await fetchMetalRates();
      
      const newGoldPricePerGram = ratesData.USD.gold_rates.Price_G;
      const newSilverPricePerGram = ratesData.USD.silver_rates.Price_G;
      const newGoldPricePerOz = ratesData.USD.gold_rates.Price_OZ;
      const newSilverPricePerOz = ratesData.USD.silver_rates.Price_OZ;
      
      setGoldPricePerGram(newGoldPricePerGram);
      setSilverPricePerGram(newSilverPricePerGram);
      setGoldPricePerOz(newGoldPricePerOz);
      setSilverPricePerOz(newSilverPricePerOz);
      
      saveRatesToStorage({
        goldPricePerGram: newGoldPricePerGram,
        silverPricePerGram: newSilverPricePerGram,
        goldPricePerOz: newGoldPricePerOz,
        silverPricePerOz: newSilverPricePerOz
      });
      
      return true;
    } catch (err) {
      console.error('Error fetching metal rates:', err);
      setError('Failed to fetch current metal prices. Using default values.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRates = async () => {
    await fetchRates();
  };

  useEffect(() => {
    const initializeRates = async () => {
      // Try to load stored rates first
      const hasStoredRates = loadStoredRates();
      
      // If no valid stored rates, fetch new ones
      if (!hasStoredRates) {
        await fetchRates();
      }
    };
    
    initializeRates();
    
    // Set up interval to check for updates
    const intervalId = setInterval(() => {
      const storedLastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
      
      if (storedLastUpdated) {
        const lastUpdatedTime = new Date(storedLastUpdated);
        const now = new Date();
        const timeDiff = now.getTime() - lastUpdatedTime.getTime();
        
        if (timeDiff >= UPDATE_INTERVAL) {
          fetchRates();
        }
      }
    }, 60 * 1000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return {
    goldPricePerGram,
    silverPricePerGram,
    goldPricePerOz,
    silverPricePerOz,
    isLoading,
    error,
    lastUpdated,
    refreshRates
  };
} 