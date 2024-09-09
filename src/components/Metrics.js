import React, { useEffect, useState } from 'react';
import { fetchSolanaData } from '../api';

const Metrics = () => {
  const [metrics, setMetrics] = useState({
    volume: 0,
    marketCap: 0,
    circulatingSupply: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const solanaData = await fetchSolanaData();
      setMetrics({
        volume: solanaData.volume,
        marketCap: solanaData.marketCap,
        circulatingSupply: solanaData.circulatingSupply,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">SOL Price</h2>
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-lg font-semibold">24h Trading Volume</p>
          <p className="text-xl">${metrics.volume.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Market Cap</p>
          <p className="text-xl">${metrics.marketCap.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Circulating Supply</p>
          <p className="text-xl">{metrics.circulatingSupply.toLocaleString()} SOL</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;