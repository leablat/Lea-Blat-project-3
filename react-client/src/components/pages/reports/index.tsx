import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale } from 'chart.js/auto'; // Import scales and other necessary modules
import { getReportDataService } from './servise';


// Register the scales
Chart.register(CategoryScale, LinearScale);

type ReportData = {
  destination: string;
  followers: number;
  // Other properties if present
};

function VacationReport() {
  const [reportData, setReportData] = useState<ReportData[]>([]);

  useEffect(() => {
    async function fetchReportData() {
      try {
        const data = await getReportDataService();
        setReportData(data.reportData);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    }

    fetchReportData();
  }, []);

  const chartData = {
    labels: reportData.map(item => item.destination),
    datasets: [
      {
        label: 'Number of Followers',
        data: reportData.map(item => item.followers),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category' as 'category', // Use type assertion here
        beginAtZero: true,
      },
      y: {
        type: 'linear' as 'linear', // Use type assertion here
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Vacation Report</h2>
      <div style={{ width: '1000px', height: '900px' }}>
      {reportData.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Loading report data...</p>
      )}
    </div>
    </div>
  );
}

export default VacationReport;
