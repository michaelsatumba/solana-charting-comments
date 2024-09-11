import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { fetchSolanaHistoricalData } from '../api';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Chart = ({ theme }) => {
  // State to hold chart data
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Solana Price (USD)',
        data: [],
        borderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Line color based on theme
        backgroundColor: theme === 'light' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)', // Background color based on theme
        pointBackgroundColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Point color based on theme
        pointBorderColor: '#fff', // Point border color
        pointHoverBackgroundColor: '#fff', // Point hover background color
        pointHoverBorderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Point hover border color based on theme
        fill: false, // Do not fill under the line
      },
    ],
  });

  // State for selected data range (1 day or 7 days)
  const [range, setRange] = useState(1);

  useEffect(() => {
    // Function to fetch and set chart data
    const fetchData = async () => {
      const historicalData = await fetchSolanaHistoricalData(range); // Fetch data based on selected range
      const filteredData = historicalData.filter((_, index) => range === 1 ? index % 2 === 0 : true); // Filter for hourly data if range is 1 day
      setData({
        labels: filteredData.map(item => range === 1 ? new Date(item.date).toLocaleTimeString() : new Date(item.date).toLocaleDateString()), // Format labels based on range
        datasets: [
          {
            label: 'Solana Price (USD)',
            data: filteredData.map(item => item.price), // Map prices to data points
            borderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Line color based on theme
            backgroundColor: theme === 'light' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)', // Background color based on theme
            pointBackgroundColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Point color based on theme
            pointBorderColor: '#fff', // Point border color
            pointHoverBackgroundColor: '#fff', // Point hover background color
            pointHoverBorderColor: theme === 'light' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Point hover border color based on theme
            fill: false, // Do not fill under the line
          },
        ],
      });
    };

    fetchData(); // Call fetchData on component mount and when range or theme changes
  }, [range, theme]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">SOL Price Chart</h2>
      <div className="flex space-x-4 mb-4 justify-center">
        {/* Button to select past 24 hours range */}
        <button
          onClick={() => setRange(1)}
          className={`px-4 py-2 ${range === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          Past 24 Hours
        </button>
        {/* Button to select past 7 days range */}
        <button
          onClick={() => setRange(7)}
          className={`px-4 py-2 ${range === 7 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
        >
          Past 7 Days
        </button>
      </div>
      <div className={`rounded-lg p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
        <Line data={data} /> {/* Render the Line chart with the data */}
      </div>
    </div>
  );
};

export default Chart;