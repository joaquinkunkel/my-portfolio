import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

type FloatingGroupProps = {
  active?: boolean;
  children: React.ReactNode;
};

const FloatingGroup: React.FC<FloatingGroupProps> = ({
  active = true,
  children,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const speed = 2; // Adjust speed for the breathing motion
  const amplitude = 0.1; // Adjust amplitude for how much it moves up and down

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const elapsedTime = clock.getElapsedTime();
      const y = amplitude + Math.sin(elapsedTime * speed) * amplitude; // Sine wave for smooth oscillation
      groupRef.current.position.y = active ? y : 0;
    }
  });
  return <group ref={groupRef}>{children}</group>;
};

export default React.memo(FloatingGroup);
