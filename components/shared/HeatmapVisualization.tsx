'use client'

import React, { useState } from 'react';
import { IqaContrast } from '@/data/IQACONTRAST';
import HeatMapChart from '../graficos/HeatMapChart';

const HeatmapVisualization: React.FC = () => {
  const [selection, setSelection] = useState('Contrast');
  const data = IqaContrast;  // Asegúrate de que esto corresponda a tus datos importados

  return (
    <div>
      <select value={selection} onChange={e => setSelection(e.target.value)}>
        <option value="Contrast">Contrast</option>
        <option value="Shading">Shading</option>
        <option value="Exposure">Exposure</option>
      </select>
      <br />
      <p className='py-2'>{`Average IQA Values for ${selection}`}</p>
      <br />
      <HeatMapChart data={data} selection={selection} color="#4BCDF8"/>
    </div>
  );
};

export default HeatmapVisualization;
