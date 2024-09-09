import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { fetchSolanaHistoricalData } from '../api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Chart = ({ theme }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Solana Price (USD)',
        data: [],
        borderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        backgroundColor: theme === 'light' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)',
        pointBackgroundColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  });
  const [range, setRange] = useState(1); // State for selected data range (1 day or 7 days)

  useEffect(() => {
    const fetchData = async () => {
      const historicalData = await fetchSolanaHistoricalData(range); // Fetch data based on selected range
      const filteredData = historicalData.filter((_, index) => range === 1 ? index % 2 === 0 : true); // Filter for hourly data if range is 1 day
      setData({
        labels: filteredData.map(item => range === 1 ? new Date(item.date).toLocaleTimeString() : new Date(item.date).toLocaleDateString()), // Format labels based on range
        datasets: [
          {
            label: 'Solana Price (USD)',
            data: filteredData.map(item => item.price),
            borderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
            backgroundColor: theme === 'light' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)',
            pointBackgroundColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
            fill: false,
          },
        ],
      });
    };

    fetchData();
  }, [range, theme]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">SOL Price Chart</h2>
      <div className="flex space-x-4 mb-4 justify-center">
        <button
          onClick={() => setRange(1)}
          className={`px-4 py-2 ${range === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          Past 24 Hours
        </button>
        <button
          onClick={() => setRange(7)}
          className={`px-4 py-2 ${range === 7 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          Past 7 Days
        </button>
      </div>
      <div className={`rounded-lg p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Chart;