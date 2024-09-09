// src/components/Metrics.js
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
    <div>
      <h3>24h Trading Volume: ${metrics.volume.toLocaleString()}</h3>
      <h3>Market Cap: ${metrics.marketCap.toLocaleString()}</h3>
      <h3>Circulating Supply: {metrics.circulatingSupply.toLocaleString()} SOL</h3>
    </div>
  );
};

export default Metrics;