"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

function GoldenMonolithScene() {
  const tiltGroupRef = useRef<THREE.Group>(null);
  const spinGroupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const currentSpeed = useRef(0.005);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!tiltGroupRef.current || !spinGroupRef.current) return;
    
    // 1. Smooth Tilt based on mouse
    const targetX = (mouse.current.x * Math.PI) / 8;
    const targetY = (mouse.current.y * Math.PI) / 8;
    
    tiltGroupRef.current.rotation.y = THREE.MathUtils.lerp(tiltGroupRef.current.rotation.y, targetX, 0.05);
    tiltGroupRef.current.rotation.x = THREE.MathUtils.lerp(tiltGroupRef.current.rotation.x, -targetY, 0.05);
    
    // 2. Continuous Spin with Proximity Slowdown
    // Calculate distance of mouse from center of screen (0, 0)
    const distance = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2);
    
    // If mouse is close to center (< 0.4), it slows down. If far, it spins faster.
    const targetSpeed = distance < 0.4 ? 0.0005 : 0.005;
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, 0.05);
    
    spinGroupRef.current.rotation.y += currentSpeed.current;
  });

  return (
    <group ref={tiltGroupRef}>
      <group ref={spinGroupRef}>
        {/* Massive Shiny Golden Box (Monolith) */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <RoundedBox args={[2.5, 4.5, 1.5]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color="#eab308" 
              roughness={0.15} 
              metalness={1} 
              envMapIntensity={2}
            />
          </RoundedBox>
        </Float>
      </group>
    </group>
  );
}

import { useDeviceMode } from "./DeviceModeProvider";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Scene() {
  const { theme } = useTheme();
  const { isPhone } = useDeviceMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || isPhone) return null;

  const isDark = theme === "dark" || !theme;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none mix-blend-normal opacity-80 dark:opacity-100">
      <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 1.5]}>
        <ambientLight intensity={isDark ? 0.5 : 1} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <directionalLight position={[-10, -20, -10]} intensity={0.5} color="#ca8a04" />
        <GoldenMonolithScene />
        <Environment preset="city" />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} opacity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
