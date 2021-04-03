import {FINNHUB_KEY} from '../framework/environment';
import type {CompanyProfile, Quote, RecommendationTrends} from '../../../finnhub/dist';
import FinnhubAPI from '../../../finnhub/dist';

// For API
// const finnhubAPI = new FinnhubAPI(SANDBOX_KEY);
const finnhubAPI = new FinnhubAPI(FINNHUB_KEY);

// For Websocket
// const finnhubWs = new FinnhubWS(SANDBOX_KEY);

export const getQuote = async (symbol: string): Promise<Quote> => {
  return finnhubAPI.getQuote(symbol);
};

export const getCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  return finnhubAPI.getCompanyProfile2(symbol);
};

export const getRecommendationTrends = async (symbol: string): Promise<RecommendationTrends[]> => {
  return finnhubAPI.GetRecommendationTrends(symbol);
};