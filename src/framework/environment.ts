import env from 'env-var';

const requiredString = (name: string) => env.get(name).required()
  .asString();

export const PORT = env.get('PORT').asIntPositive() || 3023;
export const SANDBOX_KEY = requiredString('SANDBOX_KEY');
export const FINNHUB_KEY = requiredString('FINNHUB_KEY');
export const TELEGRAM_BOT_TOKEN = requiredString('TELEGRAM_BOT_TOKEN');
export const PLOTLY_USERNAME = requiredString('PLOTLY_USERNAME');
export const PLOTLY_KEY = requiredString('PLOTLY_KEY');