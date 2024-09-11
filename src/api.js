// Function to fetch current Solana data from CoinGecko API
export const fetchSolanaData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/solana'); // Fetch data from the API
  const data = await response.json(); // Parse the JSON response
  return {
    price: data.market_data.current_price.usd, // Extract current price in USD
    volume: data.market_data.total_volume.usd, // Extract total volume in USD
    marketCap: data.market_data.market_cap.usd, // Extract market cap in USD
    circulatingSupply: data.market_data.circulating_supply, // Extract circulating supply
  };
};

// Function to fetch historical Solana data from CoinGecko API
export const fetchSolanaHistoricalData = async (days = 1) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=${days}`); // Fetch historical data for the specified number of days
  const data = await response.json(); // Parse the JSON response
  return data.prices.map(price => ({
    date: price[0], // Use timestamp directly as the date
    price: price[1], // Extract price
  }));
};