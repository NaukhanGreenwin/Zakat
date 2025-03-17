/**
 * API utility to fetch gold and silver prices
 * Based on: https://gist.github.com/surferxo3/8b4eafe499f7fa52eacb6cc187d0a49a
 */

// API URL to fetch gold and silver prices (default USD)
const RATES_API_URL = 'https://data-asg.goldprice.org/dbXRates/USD';

// Conversion constants
const OZ_TO_GRAM = 31.1034768; // Conversion factor from ounces to grams
const GRAM_TO_KG = 1000; // Conversion factor from grams to kilograms
const TOLA_TO_GRAM = 11.6638038; // Conversion factor from tolas to grams

interface MetalRates {
  gold_rates: {
    Price_OZ: number;
    Price_G: number;
    Price_KG: number;
    Price_Tola: number;
    Price_24K: number;
    Price_22K: number;
    Price_21K: number;
    Price_18K: number;
  };
  silver_rates: {
    Price_OZ: number;
    Price_G: number;
    Price_KG: number;
    Price_Tola: number;
  };
}

interface RatesResponse {
  [currency: string]: MetalRates;
}

export async function fetchMetalRates(): Promise<RatesResponse> {
  try {
    const response = await fetch(RATES_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rates: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Extract gold and silver prices from the API response
    const goldPrice = parseFloat(data.items[0].xauPrice);
    const silverPrice = parseFloat(data.items[0].xagPrice);
    
    // Calculate prices in different units
    const goldPricePerGram = goldPrice / OZ_TO_GRAM;
    const goldPricePerKg = goldPricePerGram * GRAM_TO_KG;
    const goldPricePerTola = goldPricePerGram * TOLA_TO_GRAM;
    
    const silverPricePerGram = silverPrice / OZ_TO_GRAM;
    const silverPricePerKg = silverPricePerGram * GRAM_TO_KG;
    const silverPricePerTola = silverPricePerGram * TOLA_TO_GRAM;
    
    // Calculate gold prices for different karats
    const gold24K = goldPrice;
    const gold22K = (goldPrice * 22) / 24;
    const gold21K = (goldPrice * 21) / 24;
    const gold18K = (goldPrice * 18) / 24;
    
    // Format the response
    const formattedResponse: RatesResponse = {
      USD: {
        gold_rates: {
          Price_OZ: parseFloat(goldPrice.toFixed(2)),
          Price_G: parseFloat(goldPricePerGram.toFixed(2)),
          Price_KG: parseFloat(goldPricePerKg.toFixed(2)),
          Price_Tola: parseFloat(goldPricePerTola.toFixed(2)),
          Price_24K: parseFloat(gold24K.toFixed(2)),
          Price_22K: parseFloat(gold22K.toFixed(2)),
          Price_21K: parseFloat(gold21K.toFixed(2)),
          Price_18K: parseFloat(gold18K.toFixed(2))
        },
        silver_rates: {
          Price_OZ: parseFloat(silverPrice.toFixed(2)),
          Price_G: parseFloat(silverPricePerGram.toFixed(2)),
          Price_KG: parseFloat(silverPricePerKg.toFixed(2)),
          Price_Tola: parseFloat(silverPricePerTola.toFixed(2))
        }
      }
    };
    
    return formattedResponse;
  } catch (error) {
    console.error('Error fetching metal rates:', error);
    // Return default values if API call fails
    return {
      USD: {
        gold_rates: {
          Price_OZ: 2500.00,
          Price_G: 80.38,
          Price_KG: 80380.00,
          Price_Tola: 937.50,
          Price_24K: 2500.00,
          Price_22K: 2291.67,
          Price_21K: 2187.50,
          Price_18K: 1875.00
        },
        silver_rates: {
          Price_OZ: 28.50,
          Price_G: 0.92,
          Price_KG: 920.00,
          Price_Tola: 10.73
        }
      }
    };
  }
} 