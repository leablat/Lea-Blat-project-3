import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale } from 'chart.js/auto'; // Import scales and other necessary modules
import { getReportDataService } from './servise';
import { Loader } from '../../ui-components/loader';
import { useNavigate } from 'react-router-dom';

Chart.register(CategoryScale, LinearScale);

type ReportData = {
  destination: string;
  followers: number;
};

function VacationReport() {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchReportData() {
      try {
        const data = await getReportDataService();
        setReportData(data.reportData);
      } catch (error:any) {
        if (error.message == '401') {
          navigate('/login')
        }
        alert(error)
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
        backgroundColor: 'rgba(0, 120, 0, 0.5)',
        borderColor: 'rgba(0, 120, 0, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category' as 'category', 
        beginAtZero: true,
      },
      y: {
        type: 'linear' as 'linear', 
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='report-container'>
      <h2>Vacation Report</h2>
      <div className='reports'>
      {reportData.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <Loader></Loader>
      )}
    </div>
    </div>
  );
}

export default VacationReport;
