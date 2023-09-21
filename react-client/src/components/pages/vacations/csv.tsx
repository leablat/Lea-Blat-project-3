import { useState, useEffect } from 'react';
import axiosConfig from '../helper/httpConfig';

function CSVGenerator() {
  const [data, setData] = useState<any[]>([]); // Replace 'any[]' with the actual data type

  // Simulate fetching data from an API (replace with your API call)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${axiosConfig.baseUrl}/followers/getReportData`); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateCSV = () => {
    if (data.length === 0) {
      console.error('No data to export.');
      return;
    }

    const csvContent = 'Destination,Followers\n' + data.map((row) => `${row.vacationDestination},${row.likesCount}`).join('\n');

    // Create a Blob object with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vacation_destinations.csv';

    // Trigger a click event on the link to initiate the download
    a.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={generateCSV}>Download CSV</button>
    </div>
  );
}

export default CSVGenerator;
