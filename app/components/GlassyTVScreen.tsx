import React, { useMemo } from "react";
import * as THREE from "three";

interface IGlassyTVScreenProps {
  active: boolean
}

const GlassyTVScreen: React.FC<IGlassyTVScreenProps> = ({ active }) => {
    const envMap = useMemo(() => {
      // Create a basic color-based environment map
      const size = 512; // Size of the texture
      const data = new Uint8Array(3 * size * size); // RGB format
  
      // Fill the texture with a gradient color or a solid color
      for (let i = 0; i < size * size; i++) {
        const stride = i * 3;
        const color = i * 255; // Simple gradient
        data[stride] = color;
        data[stride + 1] = color;
        data[stride + 2] = color;
      }
  
      const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
      texture.needsUpdate = true;
  
      const cubeTexture = new THREE.CubeTexture([
        texture,
        texture,
        texture,
        texture,
        texture,
        texture,
      ]);
      cubeTexture.format = THREE.RGBFormat;
      cubeTexture.needsUpdate = true;
  
      return cubeTexture;
    }, []);
  
    if (!envMap) {
      console.error("Environment map is not loaded correctly");
      return null;
    }
  
    return (
      <mesh position={[0, 1.55, 0.62]} castShadow>
        <planeGeometry args={[1.2, 0.9]} />
        <meshPhysicalMaterial
          color="#535333"
          metalness={0.9}
          roughness={0}
          transparent={true}
          opacity={active ? 0.1 : 0.7}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMap={envMap}
          envMapIntensity={2}
        />
      </mesh>
    );
  }

  export default React.memo(GlassyTVScreen)