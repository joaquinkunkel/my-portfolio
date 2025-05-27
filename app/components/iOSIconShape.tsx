import React, { useMemo } from "react";
import * as THREE from "three";

function IOSIconShape() {
    // Create the shape in a useMemo to avoid re-creating it on every render
    const shape = useMemo(() => {
      const x = 0;
      const y = 0;
      const width = 10;
      const height = 10;
      const radius = 1.8; // Adjust this value to control the roundness of the corners
  
      const roundedRect = new THREE.Shape();
      roundedRect.moveTo(x, y + radius);
      roundedRect.lineTo(x, y + height - radius);
      roundedRect.quadraticCurveTo(x, y + height, x + radius, y + height);
      roundedRect.lineTo(x + width - radius, y + height);
      roundedRect.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius,
      );
      roundedRect.lineTo(x + width, y + radius);
      roundedRect.quadraticCurveTo(x + width, y, x + width - radius, y);
      roundedRect.lineTo(x + radius, y);
      roundedRect.quadraticCurveTo(x, y, x, y + radius);
  
      return roundedRect;
    }, []);
  
    // Create the geometry in a useMemo to avoid re-creating it on every render
    const geometry = useMemo(
      () =>
        new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false }),
      [shape],
    );
  
    return (
      <mesh
        geometry={geometry}
        position={[-4.5, 0.01, 4.5]}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#111111"
          metalness={0.6}
          roughness={0.24}
          envMapIntensity={0.4}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
    );
  }

export default React.memo(IOSIconShape);
