import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DataItem {
  [column: string]: number;
}

interface ChartData {
  [type: string]: DataItem[];
}

interface ApexLineChartProps {
  data: ChartData;
  selection: string;
}

const ApexLineChart2: React.FC<ApexLineChartProps> = ({ data, selection }) => {
  // Calculamos los promedios aquí dentro para que se recalculen cuando cambien los datos
  const { categories, averages } = calculateAverages(data[selection]);

  const chartData: {
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  } = {
    series: [{
      name: selection,
      data: averages
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
        colors: ['#FF0000'],

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
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
      },
      
    },
    
  };

  return (
    <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
  );
};

// Función para calcular promedios desde datos posiblemente combinados
function calculateAverages(data: DataItem[]): { categories: string[], averages: number[] } {
  let sums: { [key: string]: number } = {};
  let counts: { [key: string]: number } = {};
  data.forEach(entry => {
    Object.keys(entry).forEach(column => {
      sums[column] = (sums[column] || 0) + entry[column];
      counts[column] = (counts[column] || 0) + 1;
    });
  });

  const categories = Object.keys(sums).sort(); // Asegúrate de que las categorías estén ordenadas si es necesario
  const averages = categories.map(key => sums[key] / counts[key]);
  return { categories, averages };
}

export default ApexLineChart2;
