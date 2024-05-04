
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const WindowModel: React.FC = () => {
  const { scene } = useGLTF('/models/window.glb');
  const windowRef = useRef<THREE.Object3D>();
  // Ajusta el material de todos los hijos del modelo
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Crea un nuevo material translúcido y negro
      child.material = new THREE.MeshBasicMaterial({
        color: 'black', // color negro
        transparent: true, // habilita la transparencia
        opacity: 0.9  // ajusta la opacidad a translúcido
      });
    }
  });

  return (
    <primitive object={scene} ref={windowRef} scale={[0.0111, 0.007, 0.01]} position={[0, 2, -0.06]} />
  );
};

const PyramidModel: React.FC<{ positionAngle: number }> = ({ positionAngle }) => {
  const radius = 6;
  const angleInRadians = THREE.MathUtils.degToRad(positionAngle);
  const x = radius * Math.sin(angleInRadians);
  const z = radius * -Math.cos(angleInRadians);
  const tip = [x, 0.9, z + 0.001];

  const pyramidVertices = React.useMemo(() => {
    const baseVertices = [
      new THREE.Vector3(-1.03, 2.77, -0.15),
      new THREE.Vector3(1.03, 2.77, -0.15),
      new THREE.Vector3(1.03, 1.23, -0.15),
      new THREE.Vector3(-1.03, 1.23, -0.15)
    ];
    return [...baseVertices, new THREE.Vector3(...tip)];
  }, [tip]);

  const pyramidGeometry = React.useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(pyramidVertices);
    geom.setIndex([
      0, 1, 4, // Front face
      1, 2, 4, // Right face
      2, 3, 4, // Back face
      3, 0, 4  // Left face
    ]);
    geom.computeVertexNormals();
    return geom;
  }, [pyramidVertices]);

  const { opacity } = useSpring({
    reset: true,
    from: { opacity: 0 },
    config: { duration: 1000 },
    to: async (next) => {
      await next({ opacity: 0.0009, config: { duration: 200 } });
      await next({ opacity: 0.2, config: { duration: 500 } });
    }
  });

  

  return (
    <animated.mesh geometry={pyramidGeometry} material-opacity={opacity}>
      <meshBasicMaterial color="red" transparent side={THREE.DoubleSide} />
    </animated.mesh>
  );
};

const SpotModel: React.FC<{ positionAngle: number }> = ({ positionAngle }) => {
  const { scene } = useGLTF('/models/spot.glb');
  const spotRef = useRef<THREE.Object3D>();
  const radius = 6;
  const initialZRotation = Math.PI / 4;
  const angleInRadians = THREE.MathUtils.degToRad(positionAngle);
  const x = radius * Math.sin(angleInRadians);
  const z = radius * -Math.cos(angleInRadians);

  const { position, rotation } = useSpring({
    to: {
      position: [x, 0, z],
      rotation: [0, -angleInRadians + Math.PI, initialZRotation]
    },
    from: {
      position: [0, 0, 0],
      rotation: [0, Math.PI, initialZRotation]
    },
    config: { mass: 1, tension: 150, friction: 30 }
  });

  return (
    // @ts-ignore
    <animated.primitive<object, any> object={scene} ref={spotRef} scale={4} position={position} rotation={rotation} />
  );
};

// Piso de la escena, 
// Piso de la escena, 
const Ground: React.FC<{ width: number; length: number; opacity: number }> = ({ width, length, opacity }) => {
  const { scene } = useThree();
  const textureRef = useRef<THREE.Texture | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>();

  if (!textureRef.current) {
    const loader = new THREE.TextureLoader();
    textureRef.current = loader.load('/assets/images/setupSpot.png');
    textureRef.current.wrapS = THREE.ClampToEdgeWrapping;
    textureRef.current.wrapT = THREE.ClampToEdgeWrapping;
    textureRef.current.repeat.set(1, 1);
  }

  if (!materialRef.current) {
    materialRef.current = new THREE.MeshBasicMaterial({
      map: textureRef.current,
      side: THREE.DoubleSide,
      transparent: true, // habilita la transparencia
      opacity: opacity    // usa la opacidad del estado
    });
  }

  // Creamos un plano rectangular con las dimensiones especificadas
  const geometry = new THREE.PlaneGeometry(width, length);
  const ground = new THREE.Mesh(geometry, materialRef.current);
  ground.position.set(0, 0, -3.6);
  ground.rotation.x = -Math.PI / 2;

  // Agregamos el suelo a la escena
  useEffect(() => {
    scene.add(ground);
    return () => {
      scene.remove(ground);
    };
  }, [scene, ground]);

  // Actualizamos la opacidad del material cuando cambia
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.opacity = opacity;
      materialRef.current.needsUpdate = true; // Actualiza el material
    }
  }, [opacity]);

  

  return null; // El componente no renderiza nada, solo agrega el suelo a la escena
};





const ThreeScene: React.FC<{ onAngleSelect: (angle: number) => void }> = ({ onAngleSelect }) => {
  const [positionAngle, setPositionAngle] = useState<number>(0);
  const [displayAngle, setDisplayAngle] = useState<number>(0);

  const handleClick = (angle: number) => {
    setPositionAngle(-angle);
    setDisplayAngle(angle);
    onAngleSelect(angle);
  };

  

  const angleOptions = [-45, -30, -15, 0, 15, 30, 45];

  return (
      <main className='rounded-[15px] border-2 border-purple-200/15 p-5 flex gap-5 flex-col'>
        <div className=' w-full h-[70vw] md:h-[20vw] hover:cursor-grab rounded-[12px] border-2 border-purple-200/15 overflow-hidden bg-gradient-to-tr from-sky-100 to-white'>
          <Canvas shadows camera={{ position: [0, 5, -10], fov: 60 }} >
            <ambientLight intensity={1.3} />
            <spotLight position={[0, 0, 0]} angle={1} penumbra={1} intensity={1} castShadow />
            <directionalLight position={[-10, 20, 10]} intensity={3} castShadow />
            <pointLight position={[0, 10, 0]} intensity={1} />
            <Suspense fallback={null}>
              <SpotModel positionAngle={positionAngle} />
              <PyramidModel positionAngle={positionAngle} />
              <Ground width={10} length={7} opacity={0.9}/>
              <WindowModel />
              <EffectComposer>
                <Bloom luminanceThreshold={1} luminanceSmoothing={1} height={0} />
                <Noise opacity={0.06} />
                <Vignette eskil={false} offset={0.001} darkness={1.1} />
              </EffectComposer>
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} minDistance={5} maxDistance={15} />
          </Canvas>
        </div>
        
        <div className='flex justify-between md:justify-around '>
          {angleOptions.map((angle) => (
            <motion.button
              key={angle}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              onClick={() => handleClick(angle)}
              className={`${displayAngle === angle ? 'bg-yellow-500' : 'bg-black/30'} shadow-md w-10 h-10 rounded-full  flex items-center justify-center text-white hover:cursor-pointer`}
            >
              {`${angle}°`}
            </motion.button>
          ))}
        </div>
          <button className='bg-cyan-500 p-px text-white rounded-full px-2 py-2 shadow-md'>
            Mostrar Suelo
          </button>
      </main>
  );
};

export default ThreeScene;
