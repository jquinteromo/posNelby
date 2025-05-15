"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Sparkles } from "@react-three/drei";
import * as THREE from "three"; // Importamos THREE para tipos

// Componente para cargar el avatar
const Avatar: React.FC = () => {
  const { scene } = useGLTF("/avatars/human_glb.glb"); // Ruta del archivo .glb dentro de public
  const avatarRef = useRef<THREE.Object3D | null>(null); // Definir el tipo de referencia de THREE

  // Animación para el avatar
  useEffect(() => {
    if (scene.animations.length > 0 && avatarRef.current) {
      const animationMixer = new THREE.AnimationMixer(scene);

      const action = animationMixer.clipAction(scene.animations[0]);
      action.play();

      const clock = new THREE.Clock();
      const animate = () => {
        animationMixer.update(clock.getDelta());
        requestAnimationFrame(animate);
      };

      animate();

      // Limpiar la animación al desmontar
      return () => {
        animationMixer.stopAllAction();
      };
    }
  }, [scene]);

  return <primitive ref={avatarRef} object={scene} scale={0.5} position={[0, 0, 0]} />;
};

const DiscoLights: React.FC = () => {
  const [intensity, setIntensity] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntensity(Math.random() * 1.5); // Intensidad de luz aleatoria
    }, 200); // Cambia la intensidad cada 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <pointLight position={[5, 5, 5]} intensity={intensity} color="white" />
      <pointLight position={[-5, 5, -5]} intensity={intensity} color="blue" />
      <pointLight position={[5, 5, -5]} intensity={intensity} color="green" />
      <pointLight position={[-5, 5, 5]} intensity={intensity} color="red" />
    </>
  );
};

const DiscoFloor: React.FC = () => {
  const [floorColor, setFloorColor] = useState<string>("#ffffff");

  useEffect(() => {
    const interval = setInterval(() => {
      setFloorColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 300); // Cambia el color del piso cada 300ms

    return () => clearInterval(interval);
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={floorColor} />
    </mesh>
  );
};

const DiscoScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
      <ambientLight />
      <DiscoLights />
      <DiscoFloor />
      <Stage>
        <Avatar />
      </Stage>
      <OrbitControls />
      <Sparkles count={50} size={2} speed={1} />
    </Canvas>
  );
};

export default DiscoScene;
