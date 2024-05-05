import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

function calculateAverages(data: { [column: string]: number }[]): { categories: string[], averages: number[] } {
    let sums: { [key: string]: number } = {};
    let counts: { [key: string]: number } = {};
    data.forEach(entry => {
        Object.keys(entry).forEach(column => {
            sums[column] = (sums[column] || 0) + entry[column];
            counts[column] = (counts[column] || 0) + 1;
        });
    });

    const categories = Object.keys(sums).sort((a, b) => parseInt(a) - parseInt(b));
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

const HeatMapChart2: React.FC<ApexLineChartProps> = ({ data, selection, color }) => {
    const { categories, averages } = calculateAverages(data[selection]);
    const formattedAverages = averages.map(avg => parseFloat(avg.toFixed(3)));

    const sortedData = categories.map((category, index) => ({
        x: category, // Usar categorías directamente
        y: formattedAverages[index]
    }));

    const chartData: {
        series: { name: string; data: { x: string; y: number }[] }[];
        options: ApexOptions;
    } = {
        series: [{
            name: '',
            data: sortedData
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
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
                align: 'center'
            },
            xaxis: {
                type: 'category',
                categories: categories
            },
            yaxis: {
                title: {
                    text: 'Average Value'
                }
            },
            tooltip: {
                enabled: true
            },
            grid: {
                borderColor: '#E2DEE7',
                strokeDashArray: 5
            }
        }
    };

    return (
        <ReactApexChart options={chartData.options} series={chartData.series} type="heatmap" height={350} />
    );
};

export default HeatMapChart2;
