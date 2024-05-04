'use client'

import React, { useState } from 'react'
import ThreeScene from './ThreeScene';

const RenderScene = () => {
  const [selectedAngle, setSelectedAngle] = useState<number | null>(null);

  return (
    <section className='w-full'>
      <div className="collection-heading">
        <h2 className="h2-bold text-dark-600">Simulación 3D</h2>
      </div>
        <ThreeScene onAngleSelect={setSelectedAngle} />
    </section>
  )
}

export default RenderScene
