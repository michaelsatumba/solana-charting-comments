import React, { useEffect, useState } from 'react';
import { fetchSolanaData } from '../api';

const Metrics = () => {
  // State to hold the metrics data
  const [metrics, setMetrics] = useState({
    volume: 0, // 24h trading volume
    marketCap: 0, // Market capitalization
    circulatingSupply: 0, // Circulating supply of SOL
  });

  useEffect(() => {
    // Function to fetch Solana data
    const fetchData = async () => {
      const solanaData = await fetchSolanaData(); // Fetch data from the API
      setMetrics({
        volume: solanaData.volume, // Set the 24h trading volume
        marketCap: solanaData.marketCap, // Set the market capitalization
        circulatingSupply: solanaData.circulatingSupply, // Set the circulating supply
      });
    };

    fetchData(); // Call fetchData on component mount
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">SOL Price</h2> 
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-lg font-semibold">24h Trading Volume</p> 
          <p className="text-xl">${metrics.volume.toLocaleString()}</p> {/* Display 24h trading volume */}
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Market Cap</p> 
          <p className="text-xl">${metrics.marketCap.toLocaleString()}</p> {/* Display market capitalization */}
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Circulating Supply</p> 
          <p className="text-xl">{metrics.circulatingSupply.toLocaleString()} SOL</p> {/* Display circulating supply */}
        </div>
      </div>
    </div>
  );
};

export default Metrics; 