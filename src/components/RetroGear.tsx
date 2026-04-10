import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface GearProps {
  activeIndex: number;
}

const Gear = ({ activeIndex }: GearProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(0);

  useEffect(() => {
    // Each menu item rotates the gear by a certain amount
    // Negated for a more natural "towards user" rotation when scrolling down
    targetRotation.current = -activeIndex * (Math.PI / 3);
  }, [activeIndex]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate around the Z-axis (the axle of the gear)
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        targetRotation.current,
        0.15
      );
    }
  });

  // Create a gear shape
  const gearShape = new THREE.Shape();
  const outerRadius = 0.8;
  const innerRadius = 0.6;
  const teeth = 12;
  const toothWidth = 0.15;

  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2;
    const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
    
    // Tooth start
    gearShape.absarc(0, 0, outerRadius, angle - toothWidth/2, angle + toothWidth/2, false);
    // Gap start
    gearShape.absarc(0, 0, innerRadius, angle + toothWidth/2, nextAngle - toothWidth/2, false);
  }

  const extrudeSettings = {
    steps: 1,
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 8 // Smoother bevels for a premium look
  };

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Main Solid Gear */}
      <mesh ref={meshRef} position={[0, 0, -0.2]}>
        <extrudeGeometry args={[gearShape, extrudeSettings]} />
        <meshStandardMaterial 
          color="#222222" // Solid dark grey
          roughness={0.6} // More opaque/matte
          metalness={0.5} // Less metallic shine
          envMapIntensity={0.8} // Softer reflections
        />
      </mesh>
      
      {/* Central Shaft */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.6} roughness={0.5} envMapIntensity={0.8} />
      </mesh>
    </group>
  );
};

export const RetroGear = ({ activeIndex }: GearProps) => {
  return (
    <div className="w-16 lg:w-20 h-full relative flex items-center justify-center">
      <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={35} />
        
        {/* Clean studio environment for professional reflections */}
        <Environment preset="studio" />
        
        {/* Base ambient light */}
        <ambientLight intensity={0.6} color="#ffffff" />
        
        {/* Key Light: Front-top-left, white, highlights the metal */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        
        {/* Fill Light: Front-bottom-right, slightly cool to contrast */}
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#aaccff" />
        
        {/* Rim Light: Strong red light from behind to give the retro/cyberpunk edge */}
        <spotLight 
          position={[-3, 0, -3]} 
          angle={0.5} 
          penumbra={0.5} 
          intensity={15} 
          color="#ff0055" 
        />
        
        <Gear activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
};

