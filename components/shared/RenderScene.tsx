'use client'

import React, { useState } from 'react'
import ThreeScene from './ThreeScene';

const RenderScene = () => {
  const [selectedAngle, setSelectedAngle] = useState<number | null>(null);

  return (
    <section className='w-full'>
        <ThreeScene onAngleSelect={setSelectedAngle} />
    </section>
  )
}

export default RenderScene
