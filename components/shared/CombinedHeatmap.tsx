'use client'
import React, { useState, useEffect } from 'react';
import { IqaWeather } from '@/data/IQAWEATHER';
import { IqaHours } from '@/data/IQAHOURS';
import HeatMapChart2 from '../graficos/HeatMapChart2';

export interface DataItem {
    [column: string]: number;
}

export interface ChartData {
    [type: string]: DataItem[];
}



const CombinedHeatmap: React.FC = () => {
    const [weatherSelection, setWeatherSelection] = useState('Sunny');
    const [hourSelection, setHourSelection] = useState('9-12AM');
    const [combinedData, setCombinedData] = useState<DataItem[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);  // Estado para controlar la carga de datos
  
    useEffect(() => {
      if (!IqaWeather[weatherSelection] || !IqaHours[hourSelection]) {
        console.error("One of the data sets is undefined", {
          weatherData: IqaWeather[weatherSelection],
          hourData: IqaHours[hourSelection]
        });
        setIsDataLoaded(false);  // Asegurar que no intentamos renderizar sin datos
        return;
      }
      
      const weatherData = IqaWeather[weatherSelection];
      const hourData = IqaHours[hourSelection];
      const combinedAverages = calculateCombinedAverages(weatherData, hourData);
      setCombinedData(combinedAverages);
      setIsDataLoaded(true);  // Marcar que los datos están listos
    }, [weatherSelection, hourSelection]);
  
    return (
      <section>
        <div className='flex gap-3'>
            <select value={hourSelection} onChange={e => setHourSelection(e.target.value)}>
                <option value="9-12AM">9-12AM</option>
                <option value="12PM-3PM">12PM-3PM</option>
                <option value="3PM-5PM">3PM-5PM</option>
                <option value="5PM-Sunset">5PM-Sunset</option>
            </select>
            <select value={weatherSelection} onChange={e => setWeatherSelection(e.target.value)}>
                <option value="Sunny">Sunny</option>
                <option value="Cloudy">Cloudy</option>
                <option value="Rainy">Rainy</option>
            </select>
        </div>
        <br />
        <p className='py-2'>{`Average IQA Values for ${hourSelection} on a ${weatherSelection} Day`}</p>

        {isDataLoaded ? <HeatMapChart2 key={`${weatherSelection}-${hourSelection}`} data={{ 'Combined': combinedData }} selection='Combined' color="#FF0000" /> : null}
      </section>
    );
  };
  

function calculateCombinedAverages(weatherData: DataItem[], hourData: DataItem[]): DataItem[] {
    const length = Math.min(weatherData.length, hourData.length);
    const combined = [];
  
    for (let index = 0; index < length; index++) {
      const wItem = weatherData[index];
      const hItem = hourData[index];
  
      const keys = Object.keys(wItem);
      let combinedItem: DataItem = {};
  
      keys.forEach(key => {
        const weatherValue = wItem[key] ?? 0;  // Uso de nullish coalescing para manejar undefined
        const hourValue = hItem?.[key] ?? 0;   // Uso de optional chaining y nullish coalescing
        combinedItem[key] = (weatherValue + hourValue) / 2;
      });
  
      combined.push(combinedItem);
    }
  
    return combined;
  }
  

export default CombinedHeatmap;
