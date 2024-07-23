import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const StackedBarChart = ({ attempted, revisit, unattempted }) => {
  const data = {
    labels: ['Status'], // This can be changed based on your needs
    datasets: [
      {
        label: 'Attempted',
        data: [attempted],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color for attempted
      },
      {
        label: 'Revisit',
        data: [revisit],
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange color for revisit
      },
      {
        label: 'Unattempted',
        data: [unattempted],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color for unattempted
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Horizontal stacked bar chart
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;
