// src/api.js
export const fetchSolanaData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/solana');
  const data = await response.json();
  return {
    price: data.market_data.current_price.usd,
    volume: data.market_data.total_volume.usd,
    marketCap: data.market_data.market_cap.usd,
    circulatingSupply: data.market_data.circulating_supply,
  };
};

export const fetchSolanaHistoricalData = async (days = 1) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=${days}`);
  const data = await response.json();
  return data.prices.map(price => ({
    date: price[0], // Use timestamp directly
    price: price[1],
  }));
};