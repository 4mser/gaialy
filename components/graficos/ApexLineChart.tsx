import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


function calculateAverages(data: { [column: string]: number }[]): {categories: string[], averages: number[]} {
  let sums: { [key: string]: number } = {};
  let counts: { [key: string]: number } = {};
  data.forEach(entry => {
    Object.keys(entry).forEach(column => {
      sums[column] = (sums[column] || 0) + entry[column];
      counts[column] = (counts[column] || 0) + 1;
    });
  });

  const categories = Object.keys(sums);
  const averages = categories.map(key => sums[key] / counts[key]);
  return { categories, averages };
}

interface DataItem {
  [column: string]: number;
}

interface ChartData {
  [type: string]: DataItem[];
}

interface ApexLineChartProps {
  data: ChartData;
  selection: string;
  color: string;
}

const ApexLineChart: React.FC<ApexLineChartProps> = ({ data, selection, color }) => {
  const { categories, averages } = calculateAverages(data[selection]);

  // Aquí aplicamos el redondeo a dos decimales directamente en la serie
  const formattedAverages = averages.map(avg => parseFloat(avg.toFixed(3)));

  const chartData: {
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  } = {
    series: [{
      name: 'IQA Value',
      data: formattedAverages
    }],
    options: {
      chart: {
        height: 350,
        type: 'line', // Aquí aseguramos que el tipo es reconocido como un valor válido.
        zoom: {
          enabled: true
        }
      },
      colors: [color],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 4,
        colors: [color]
      },
      title: {
        text: `Average Values for ${selection}`,
        align: 'center'
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        title: {
          text: 'Average Value'
        }
      },
      tooltip: {
        enabled: true,
        x: {
          show: true
        }
      }
    }
  };

  return (
    <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
  );
};

export default ApexLineChart;
