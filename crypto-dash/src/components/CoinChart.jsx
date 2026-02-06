import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Timescale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Timescale
);



const CoinChart = ({ coinid }) => {
const [chartData, setChartData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchChartData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
    );
    const data = await res.json();

    const prices = data.prices.map((price) => ({
      x: price[0],
      y: price[1],
    }));

    setChartData({
      datasets: [
        {
          label: "Price (USD)",
          data: prices,
          fill: true, // Area under the line is filled
          borderColor: "#007bff", // Fill Color
          pointRadius: 0, //Hides pointRadius
          tension: 0.3, //Smooth out the line
        },
      ],
    });
    setLoading(false);
  };

  fetchChartData();
}, [coinid]);
if (loading) return <p>Loading chart...</p>;

  return (
    <div style={{ marginTop: '30px' }}>
        <Line data={chartData} options ={{responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false},//tooltip appears when hovering near a point
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                    tick: {
                        autoSkip: true, //skip ticks if there are too many
                        maxTicksLimit: 7, //Each tick on the axis represents a day
                    },
                }
                y: {
                    ticks: {
                        callback: (value) => `$${value.toLocaleString()}`,//Format numbers like $25,000
                    },
                }
            },
        }} />
    </div>
  )
};

export default CoinChart;
