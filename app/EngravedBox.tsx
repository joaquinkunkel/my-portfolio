import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

function EngravedBox({
  text,
  position,
  rotation,
}: {
  text: string;
  position: number[];
  rotation?: THREE.Euler;
}) {
  const [font, setFont] = useState<any>(null);

  // Load the font on component mount
  useEffect(() => {
    const loader = new FontLoader();
    loader.load("/fonts/Supply_Bold.json", (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

  // Return null or a loading fallback if the font is not yet loaded
  if (!font) {
    return null;
  }

  const textOptions = {
    font,
    size: 0.2, // Adjust size as needed
    height: 0.02, // Adjust the depth of the engraving
    curveSegments: 12,
  };

  // Create the text geometry after the font is loaded
  const textGeometry = new TextGeometry(text, textOptions);

  // Material for the engraved text
  const textMaterial = new THREE.MeshStandardMaterial({
    color: "#732e44", // Darker color for engraved text
    metalness: 0.2,
    roughness: 0.7,
  });

  return (
    <group>
      {/* The box */}
      <RoundedBox
        args={[1.8, 0.8, 1.8]}
        radius={0.2}
        smoothness={10}
        position={[0, 0.35, 0]}
      >
        <meshStandardMaterial color="#e66578" metalness={0.3} roughness={0.4} />
      </RoundedBox>

      {/* Engraved text */}
      <mesh
        geometry={textGeometry}
        material={textMaterial}
        position={[-0.65, 0.35, 0.89]} // Adjusting position slightly out from the box
        rotation={rotation}
      />
    </group>
  );
}

export default React.memo(EngravedBox);
