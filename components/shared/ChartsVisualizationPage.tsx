'use client'

import React, { useState } from 'react';
import { IqaContrast } from '@/data/IQACONTRAST';
import ApexLineChart from '../graficos/ApexLineChart';

const VisualizationPage: React.FC = () => {
  const [selection, setSelection] = useState('Contrast');
  const data = IqaContrast;  // Asegúrate de que esto corresponda a tus datos importados

  return (
    <div>
      <select value={selection} onChange={e => setSelection(e.target.value)}>
        <option value="Contrast">Contrast</option>
        <option value="Shading">Shading</option>
        <option value="Exposure">Exposure</option>
      </select>
      <ApexLineChart data={data} selection={selection} color="#4BCDF8"/>
    </div>
  );
};

export default VisualizationPage;
