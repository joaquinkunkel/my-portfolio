"use client"; // Add this line at the very top
import styled from 'styled-components';
import FeaturedCard from './FeaturedCard';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Image from 'next/image';
import {
  RoundedBox,
  Text,
  Billboard,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import Lightbulb from "../public/icons/bulb.svg";
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  HueSaturation,
} from "@react-three/postprocessing";

import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import useIsMobile from "./useIsMobile";
import "./globals.css";
import "leaflet/dist/leaflet.css";

function LoadingScreen({ onLoaded } : {
  onLoaded: () => void;
}) {
  const { progress, loaded, total } = useProgress();
  useEffect(() => {
    if (loaded === total) {
      onLoaded(); // Call the function passed as a prop when loading is complete
    }
  }, [loaded, total, onLoaded]);

  return (
    <Html center>
      <div style={{ fontSize: "1.5em", color: '#383842', fontFamily: 'Cooper Black, sans-serif' }}>
        Loading... {progress.toFixed(2)}%
      </div>
    </Html>
  );
}

function GlassyTVScreen() {
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
    <mesh position={[0, 1.41, 0.52]} castShadow>
      <planeGeometry args={[1.3, 0.8]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.6}
        roughness={0}
        transparent={true}
        opacity={0.1}
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMap={envMap}
        envMapIntensity={2}
      />
    </mesh>
  );
}

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

// Load the GLTF bird model
function BirdModel(props: any) {
  const { scene } = useGLTF("/models/bird.gltf");
  return <primitive object={scene} {...props} />;
}

type IFeaturedCard = "bubbles" | "cambly" | "freelance" | null;

const LivingRoom = ({
  onProjectClick,
  onProjectHover,
  controlsRef,
  isDarkMode,
  setFeaturedCard,
  shouldStartAnimation,
  setShouldStartAnimation,
}: {
  onProjectClick: (project: any) => void;
  onProjectHover: (project: any) => void;
  controlsRef: React.MutableRefObject<any>;
  isDarkMode: boolean;
  setFeaturedCard: React.Dispatch<React.SetStateAction<IFeaturedCard>>;
  shouldStartAnimation: boolean;
  setShouldStartAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const tvScreenRef = useRef<THREE.ShaderMaterial | null>(null);
  const sphereRef = useRef<THREE.ShaderMaterial | null>(null);
  const textShaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const gradientShaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const [textVisible, setTextVisible] = useState(false);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { size } = useThree();
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const handleBubblesClick = useCallback(() => {
    setFeaturedCard("bubbles");
  }, []);

  const handleCamblyClick = useCallback(() => {
    setFeaturedCard("cambly");
  }, []);

  const handleFreelanceClick = useCallback(() => {
    window.open("https://behance.net/joaquinkunkel", "_blank");
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / size.width) * 2 - 1,
        y: -(event.clientY / size.height) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size]);

  useEffect(() => {
    if (shouldStartAnimation) {
      const animationDuration = isMobile ? 3000 : 1800; // Adjust based on your intro animation duration
      const timer = setTimeout(() => {
        console.log("@@");
        setIsAnimationDone(true);
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [shouldStartAnimation, isMobile]);

  // Shader for the TV screen
  const tvScreenShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1.0, 1.0) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

      float random(vec2 uv) {
        return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        float r = 0.5 + 0.5 * sin(uTime + vUv.x * 3.0);
        float g = 0.5 + 0.5 * sin(uTime + vUv.y * 3.0 + 1.0);
        float b = 0.5 + 0.5 * sin(uTime + vUv.x * 3.0 + vUv.y * 3.0 + 2.0);
        
        float grain = random(vUv * uResolution.xy + uTime * 10.0) * 0.2;
        gl_FragColor = vec4(r + grain, g + grain, b + grain, 1.0);
      }
    `,
  });

  // Shader for ripple gradient effect
  const gradientShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        float wave = sin(vNormal.x * 4.0 + uTime * 0.2) + 
                     sin(vNormal.y * 4.0 + uTime * 0.5) + 
                     sin(vNormal.z * 4.0 + uTime * 1.0);

        wave = wave * 0.5 + 0.5;

        float r = 0.1 - 0.5 * wave;
        float g = 0.0 - 0.4 * wave;
        float b = 0.6 - 0.2 * wave;
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `,
  });

  gradientShaderRef.current = gradientShaderMaterial;

  // Shader for text
  textShaderRef.current = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        float dist = distance(vUv, vec2(0.5, 0.5));
        vec3 color = vec3(1.0);

        if (dist > 0.3) {
          float edgeFactor = smoothstep(0.3, 0.5, dist);
          color.r += edgeFactor * (0.6 + 0.2 * sin(uTime + dist * 10.0));
          color.g += edgeFactor * (0.6 + 0.2 * sin(uTime + dist * 15.0 + 1.0));
          color.b += edgeFactor * (0.6 + 0.2 * sin(uTime + dist * 20.0 + 2.0));
        }

        gl_FragColor = vec4(color, 0.3);
      }
    `,
    transparent: true,
  });

  const { position } = useSpring({
    from: {
      position: [isMobile ? 9 : 10, isMobile ? 4 : -10, isMobile ? 0 : 10],
    },
    to: { position: [-12.47, isMobile ? 7 : 5.28, 9.57] },
    config: {
      duration: isMobile ? 3000 : 1800,
      easing: (t) => (isMobile ? --t * t * t + 1 : --t * t + 1),
    },
    onRest: () => setTextVisible(true),
  });

  const line1Fade = useSpring({
    opacity: textVisible ? 1 : 0,
    config: { duration: 300 },
  });

  const line2Fade = useSpring({
    opacity: textVisible ? 1 : 0,
    delay: 300,
    config: { duration: 300 },
  });

  const birdSpring = useSpring({
    scale: hoveredObject === "bird" ? [1.1, 1.1, 1.1] : [1, 1, 1],
    config: { duration: 250, easing: (t) => t * t * (3 - 2 * t) },
    position: hoveredObject === "bird" ? [3, 0.55, -3] : [3, 0.55, -3],
  });

  const lampSpring = useSpring({
    scale: hoveredObject === "lamp" ? [1.1, 1.1, 1.1] : [1, 1, 1],
    config: { duration: 250, easing: (t) => t * t * (3 - 2 * t) },
  });

  const tvSpring = useSpring({
    scale: hoveredObject === "tv" ? [1.1, 1.1, 1.1] : [1, 1, 1],
    config: { duration: 250, easing: (t) => t * t * (3 - 2 * t) },
  });

  useFrame((state) => {
    const controls = controlsRef.current;
    controls.object.position.set(...position.get());
    if (controls && isAnimationDone) {
      controlsRef.current.enabled = true; // Enable controls only after animation
      const targetX = mouse.x * 0.2;
      const targetY = Math.pow(mouse.y, 1) * 1; // Exaggerate the effect based on the Y position
      controls.target.lerp(
        new THREE.Vector3(targetX * 2.0, targetY * 0.1, -targetY * 0.2),
        0.06,
      );
      controls.update();
    }

    if (tvScreenRef.current) {
      tvScreenRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
    if (textShaderRef.current) {
      textShaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
    if (sphereRef.current) {
      sphereRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });
  return (
    <group position={[0, -1, 0]} scale={[1.1, 1.1, 1.1]}>
      <IOSIconShape />

      {/* Text elements with Billboard to face the camera */}
      <Billboard>
        <animated.mesh>
          <Text
            position={[0, isMobile ? 10 : 6.5, 0]}
            fontSize={isMobile ? 1 : 0.9}
            anchorX="center"
            anchorY="middle"
            castShadow
            font="/fonts/COOPBL.TTF"
            color={isDarkMode ? "#ffffff" : "#383842"}
          >
            Joaquín Kunkel
          </Text>
        </animated.mesh>
      </Billboard>

      <Billboard>
        <animated.mesh>
          <Text
            position={[0, isMobile ? 8.9 : 5.7, 0]}
            fontSize={isMobile ? 0.4 : 0.3}
            color={isDarkMode ? "white" : "#383842"}
            anchorX="center"
            anchorY="middle"
            castShadow
            font="/fonts/Supply-Regular.otf"
            material={isDarkMode ? textShaderRef.current : undefined}
          >
            Product designer who codes
          </Text>
        </animated.mesh>
      </Billboard>

      <animated.mesh
        position={[3, 0, 3]}
        castShadow
        scale={lampSpring.scale.to((s) => [s, s, s])}
        onPointerOver={() => {
          setHoveredObject("lamp");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredObject(null);
          document.body.style.cursor = "auto";
        }}
        onClick={handleBubblesClick}
      >
        {(hoveredObject === "lamp" || isMobile) && (
          <Billboard>
            <Text
              position={[0, isMobile ? 4 : 3.95, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color="#cf60cf"
              font="/fonts/COOPBL.TTF"
            >
              Bubbles
            </Text>
            <Text
              position={[0, isMobile ? 3.5 : 3.55, 0]}
              fontSize={isMobile ? 0.35 : 0.24}
              color={isDarkMode ? "white" : "#383842"}
              font="/fonts/Supply-Regular.otf"
            >
              Front-end & Design
            </Text>
            {!isMobile && (
              <Text
                position={[0, 3.2, 0]}
                fontSize={0.24}
                color={"#888888"}
                font="/fonts/Supply-Regular.otf"
              >
                2021 - now
              </Text>
            )}
          </Billboard>
        )}
        <FloatingGroup active={hoveredObject === "lamp"}>
          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[0.75, 32, 32]} />
            <meshStandardMaterial
              color="white"
              transparent
              opacity={0.4}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={0.5}
            />
            <primitive object={gradientShaderRef.current} ref={sphereRef} />
          </mesh>

          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[0.76, 33, 33]} />
            <meshStandardMaterial
              color="gray"
              metalness={1}
              roughness={0.3}
              transparent
              opacity={0.4}
              envMapIntensity={1}
            />
          </mesh>
        </FloatingGroup>

        <RoundedBox
          args={[1.5, 1, 1.5]}
          radius={0.2}
          smoothness={10}
          position={[0, 0.55, 0]}
        >
          <meshStandardMaterial
            color="#e87967"
            metalness={0.3}
            roughness={0.9}
          />
        </RoundedBox>

        <pointLight
          position={[0, 1.1, 0]}
          intensity={hoveredObject === "lamp" ? 2 : 0.1}
          distance={10}
          color="pink"
          castShadow
        />
      </animated.mesh>

      {/* TV */}

      <animated.mesh
        position={[-3, 0, -3]}
        castShadow
        scale={tvSpring.scale.to((s) => [s, s, s])}
        onPointerOver={() => {
          setHoveredObject("tv");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredObject(null);
          document.body.style.cursor = "auto";
        }}
        onClick={handleFreelanceClick}
      >
        {(hoveredObject === "tv" || isMobile) && (
          <Billboard>
            <Text
              position={[0, isMobile ? 4 : 3.6, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color={isDarkMode ? "#c6f545" : "#76d525"}
              font="/fonts/COOPBL.TTF"
            >
              Freelance
            </Text>
            <Text
              position={[0, isMobile ? 3.5 : 3.15, 0]}
              fontSize={isMobile ? 0.35 : 0.24}
              color={isDarkMode ? "white" : "#383842"}
              font="/fonts/Supply-Regular.otf"
            >
              Design, motion,
            </Text>
            <Text
              position={[0, isMobile ? 3 : 2.83, 0]}
              fontSize={isMobile ? 0.35 : 0.24}
              color={isDarkMode ? "white" : "#383842"}
              font="/fonts/Supply-Regular.otf"
            >
              eng & art
            </Text>
          </Billboard>
        )}
        <RoundedBox
          args={[2, 0.6, 2]}
          radius={0.1}
          smoothness={10}
          position={[0, 0.55, 0.1]}
        >
          <meshStandardMaterial color="white" metalness={0.4} roughness={0.3} />
        </RoundedBox>
        <FloatingGroup active={hoveredObject === "tv"}>
          <GlassyTVScreen />
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[1.5, 1, 1]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          <mesh position={[0, 1.4, 0.51]} castShadow>
            <planeGeometry args={[1.3, 0.8]} />
            <primitive object={tvScreenShaderMaterial} ref={tvScreenRef} />
            {/* <spotLight
            position={[0, 1.6, 0.61]}
            target-position={[0, 2, 5]}
            intensity={2}
            distance={10}
            angle={Math.PI / 6}
            penumbra={0.5}
            color="white"
            castShadow
          /> */}
          </mesh>
        </FloatingGroup>

        <pointLight
          position={[0.2, 1, 1.2]}
          intensity={hoveredObject === "tv" ? 0.4 : 0.1}
          distance={8}
          color="pink"
          castShadow
        />
      </animated.mesh>

      {/* Bird */}
      <animated.mesh
        position={birdSpring.position.to((x, y, z) => [x, y, z])}
        scale={birdSpring.scale.to((s) => [s, s, s])}
        onPointerOver={() => {
          setHoveredObject("bird");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredObject(null);
          document.body.style.cursor = "auto";
        }}
        onClick={handleCamblyClick}
        castShadow
      >
        {(hoveredObject === "bird" || isMobile) && (
          <Billboard>
            <Text
              position={[0, isMobile ? 3 : 3, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color="#e49610"
              font="/fonts/COOPBL.TTF"
            >
              Cambly
            </Text>
            <Text
              position={[0, isMobile ? 2.55 : 2.58, 0]}
              fontSize={isMobile ? 0.35 : 0.24}
              color={isDarkMode ? "white" : "#383842"}
              font="/fonts/Supply-Regular.otf"
            >
              Front-end & Design
            </Text>
            {!isMobile && (
              <Text
                position={[0, 2.2, 0]}
                fontSize={0.24}
                color={"#888888"}
                font="/fonts/Supply-Regular.otf"
              >
                2019 - 2021
              </Text>
            )}
          </Billboard>
        )}
        <RoundedBox args={[1.5, 1, 1.5]} radius={0.2} smoothness={10}>
          <meshStandardMaterial color="white" metalness={0.4} roughness={0.3} />
        </RoundedBox>
        <pointLight
          position={[11, 2, -9]}
          intensity={hoveredObject === "bird" ? 25 : 0.1}
          distance={59}
          color="orange"
          castShadow
        />
        <FloatingGroup active={false}>
          <mesh scale={3.0} castShadow>
            <BirdModel position={[0, 0.39, 0]} />
          </mesh>
        </FloatingGroup>
      </animated.mesh>
    </group>
  );
};

function ResponsiveCamera() {
  const isMobile = useIsMobile();
  const { camera } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = isMobile ? 64 : 50;
      camera.updateProjectionMatrix();
    }
  }, [isMobile, camera]);

  return null;
}

const cardStyle = {
  background: "rgba(245, 245, 245, 0.8)",
  // height: "100%",
  width: "100%",
  maxWidth: 600,
  margin: "0 auto",
  zIndex: 11,
  borderRadius: 22,
  boxShadow:
    "0px 28px 60px -28px rgba(0,0,0,0.4), inset 0px 2px 2px -1px rgba(255, 255, 255, 0.4), inset 0px -32px 6px -32px rgba(0, 0, 0, 0.1)",
  outline: "1px solid rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(20px)",
  padding: "14px 24px",
  fontFamily: "Radio Grotesk, sans-serif",
  color: "#383842",
  lineHeight: "130%",
};

const cardBackgroundStyle = {
  height: "100%",
  width: "100%",
  padding: 40,
  position: "absolute",
  fontFamily: "Cooper Black",
  zIndex: 11,
  background: "rgba(0,0,0,0.5)",
  overflow: 'auto',
};

const closeLinkStyle = {
  color: "white",
  position: "absolute",
  margin: "50px auto",
  right: 0,
  marginLeft: "auto",
  textAlign: "right",
  width: "100%",
  display: "flex",
};

const featuredHeadingStyle = {
  fontFamily: "Cooper Black",
  fontSize: 32,
  margin: "16px 0 40px",
  textShadow:
    "0 0 24px rgba(255, 255, 255, 0.6), 0 10px 20px rgba(255, 255, 255, 0.4)",
};

const captionStyle = {
  fontSize: "0.8em",
};

const sectionStyle = {
  background: "rgba(255, 255, 255, 0.4)",
  padding: "0px 20px 20px",
  fontSize: 16,
  borderRadius: 12,
  display: "flex",
  alignItems: "baseline",
  flexDirection: "column" as "column",
  outline: "1px solid rgba(0, 0, 0, 0.1)",
  width: '100%',
};

const liStyle = {
  width: "100%",
};

const mapStyle = {
  height: 120,
  // filter: "grayscale(1)",
  mixBlendMode: "multiply" as "multiply",
};
const mapContainerStyle = {
  background: "white",
  height: 120,
  display: "flex",
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  margin: "16px 0 12px",
  outline: "1px solid rgba(0,0,0,0.1)",
};
const graphStyle = {
  background:
    "linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.65))",
  borderRadius: 8,
  height: 120,
  width: "100%",
  margin: "16px 0 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outline: "1px solid rgba(0,0,0,0.1)",
};
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin: 20px 0;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px;
  }
`;
const webLinkStyle = {
  position: "absolute" as "absolute",
  top: 20,
  right: 20,
  background: "rgba(255, 255, 255, 0.5)",
  borderRadius: 10,
  padding: "6px 12px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  color: "#383842",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "0.9em",
  outline: "1px solid rgba(0, 0, 0, 0.1)",
}
const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=13&size=600x300&maptype=roadmap
&markers=color:red%7Clabel:S%7C37.7749,-122.4194
&key=pk.eyJ1Ijoiam9hcXVpbmt1bmtlbCIsImEiOiJjbTBraHNzajMxN2IwMm1xMnA1NHBqMDY3In0.QoxI3AJs0BryBFMJXh_jXQ`;

const BubblesFeaturedCard = ({ onBackgroundClick, isDarkMode, visible } : {
  onBackgroundClick: () => void;
  isDarkMode ?: boolean;
  visible ?: boolean;
}) => {
  const iconStyle = {
    marginRight: 8,
    color: "#383842",
  };

  const captionStyle = {
    fontSize: "0.85em",
    opacity: 0.65,
    marginTop: 4,
  };

  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,12/600x300?access_token=pk.eyJ1Ijoiam9hcXVpbmt1bmtlbCIsImEiOiJjbTBraHNzajMxN2IwMm1xMnA1NHBqMDY3In0.QoxI3AJs0BryBFMJXh_jXQ`;

  const svgGraph = (
    <svg
      style={{ opacity: 0.7 }}
      width="calc(100% - 40px)"
      height="auto"
      viewBox="0 0 100 50"
    >
      <line
        x1="0"
        y1="10"
        x2="100"
        y2="10"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="0"
        y1="20"
        x2="100"
        y2="20"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="0"
        y1="30"
        x2="100"
        y2="30"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="0"
        y1="40"
        x2="100"
        y2="40"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="10"
        y1="0"
        x2="10"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="20"
        y1="0"
        x2="20"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="30"
        y1="0"
        x2="30"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="40"
        y1="0"
        x2="40"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="60"
        y1="0"
        x2="60"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="70"
        y1="0"
        x2="70"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="80"
        y1="0"
        x2="80"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <line
        x1="90"
        y1="0"
        x2="90"
        y2="50"
        stroke="rgba(56, 56, 66, 0.2)"
        strokeWidth="0.5"
      />
      <polyline
        fill="none"
        stroke="#cf50df"
        strokeWidth="1.2"
        points="0,50 10,40 20,35 30,20 40,10 50,15 60,5 70,0 80,10 90,20 100,5"
      />
    </svg>
  );

  return (
    <FeaturedCard
      onBackgroundClick={onBackgroundClick}
      isDarkMode={isDarkMode}
      visible={visible}
    >

        <a
          href="https://usebubbles.com" // Replace with the actual Bubbles landing page URL
          target="_blank"
          rel="noopener noreferrer"
          style={webLinkStyle}
        >
          Visit website
        </a>
        <h1
          style={{
            ...featuredHeadingStyle,
            color: "#cf60cf",
          }}
        >
          Bubbles
        </h1>

        <Row>
          <div style={sectionStyle}>
            <div style={mapContainerStyle}>
              <img  src={mapUrl} alt="San Francisco Map" style={mapStyle} />
            </div>
            <div>
              San Francisco, CA
              <br />
              <p style={captionStyle}>Remote team</p>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={graphStyle}>{svgGraph}</div>
            <div>ARR from 0 to $150K</div>
            <p style={captionStyle}>2022 - 2024 • Team of 7</p>
          </div>
        </Row>

        <div
          style={{
            display: "flex",
            flexDirection: "column" as "column",
            gap: 24,
            margin: "20px 0",
            width: "100%",
          }}
        >
          {/* <p style={captionStyle}>Some highlights</p> */}
          <div
            style={{
              ...sectionStyle,
              padding: 20,
              borderRadius: 12,
              width: "100%",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>
                Design & implement UX for growth & core product
              </li>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>Full rebrand & marketing guidelines</li>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>
                Introduced generative AI functionality
                <p style={captionStyle}>
                  Incl. automatic meeting notes & action items
                </p>
              </li>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>
                Collaborated with the incredible&nbsp;
                <a href="https://taylorlecroy.com/" target="_blank">
                  @Taylor Lecroy&nbsp;
                </a>
              </li>
            </div>
          </div>
        </div>
    </FeaturedCard>
  );
};

const CamblyFeaturedCard = ({ onBackgroundClick, isDarkMode, visible}: {
  onBackgroundClick: () => void;
  isDarkMode?: boolean;
  visible?: boolean;
}) => {
  const iconStyle = {
    marginRight: 8,
    color: "#383842",
  };

  const captionStyle = {
    fontSize: "0.85em",
    opacity: 0.65,
    marginTop: 4,
  };

  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,12/600x300?access_token=pk.eyJ1Ijoiam9hcXVpbmt1bmtlbCIsImEiOiJjbTBraHNzajMxN2IwMm1xMnA1NHBqMDY3In0.QoxI3AJs0BryBFMJXh_jXQ`;

  const svgGraph = (
    <svg
      style={{ opacity: 0.7 }}
      width="calc(100% - 40px)"
      height="auto"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" fill="rgba(56, 56, 66, 0.01)" />
      {[...Array(99)].map((_, i) => (
        <circle
          key={i}
          cx={(i % 10) * 10 + 5}
          cy={Math.floor(i / 10) * 10 + 5}
          r="2"
          fill="rgba(56, 56, 66, 0.3)"
        />
      ))}
      <circle cx="95" cy="5" r="4" fill="#a45600" />
    </svg>
  );

  return (
    <FeaturedCard
    onBackgroundClick={onBackgroundClick}
    isDarkMode={isDarkMode}
    visible={visible}
    >
        <a
          href="https://cambly.com" // Replace with the actual Bubbles landing page URL
          target="_blank"
          rel="noopener noreferrer"
          style={webLinkStyle}
        >
          Visit website
        </a>
        <h1 style={{ ...featuredHeadingStyle, color: "#e49610" }}>Cambly</h1>

        <Row
        >
          <div style={sectionStyle}>
            <div style={mapContainerStyle}>
              <img  src={mapUrl} alt="San Francisco Map" style={mapStyle} />
            </div>
            <div>
              San Francisco, CA
              <br />
              <p style={captionStyle}>Hybrid team</p>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={graphStyle}>{svgGraph}</div>
            <div>Solo UX designer</div>
            <p style={captionStyle}>in a company of 100</p>
          </div>
        </Row>

        <Row
        >
          {/* <p style={captionStyle}>Some highlights</p> */}
          <div
            style={{
              ...sectionStyle,
              padding: 20,
              borderRadius: 12,
              width: "100%",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>Owned UX for iOS, Android & web features</li>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>Implemented web features in React</li>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>
                Introduced higher-converting onboarding flows
                <p style={captionStyle}>
                  Boosted free-trial conversion by 10% in adult and kids
                  products
                </p>
              </li>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <li style={liStyle}>Full rebrand & marketing guidelines</li>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              {/* <li style={liStyle}>
                Led a branding workshop fresh out of college
                <p style={captionStyle}>
                <a href="https://taylorlecroy.com/" target="_blank">
                  Watch the video&nbsp;
                </a>
                </p>
              </li> */}
            </div>
          </div>
        </Row>
    </FeaturedCard>
  );
};

export default function Home() {
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const controlsRef = useRef<any>(null);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const [featuredCard, setFeaturedCard] = useState<IFeaturedCard>(null);
  const resetFeaturedCard = useCallback(() => {
    setFeaturedCard(null);
  }, []);
  const sceneScale = useIsMobile()
    ? new THREE.Vector3(0.8, 0.8, 0.8)
    : new THREE.Vector3(1, 1, 1);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        background: isDarkMode ? "#20192a" : "#eeeeee",
        animation: "gradientAnimation 120s ease infinite",
        backgroundSize: "500% 500%",
        transition: "all 0.3s ease-out",
      }}
    >
      {controlsRef.current &&
      <>
        <BubblesFeaturedCard
        onBackgroundClick={resetFeaturedCard}
        isDarkMode={isDarkMode}
        visible={featuredCard === 'bubbles'}
        />
        <CamblyFeaturedCard
        onBackgroundClick={resetFeaturedCard}
        isDarkMode={isDarkMode}
        visible={featuredCard === 'cambly'}
        />
        </>
}
      {isMobile !== undefined && (
        <div
          style={{
            fontFamily: "Radio Grotesk, Radio Grotesk, sans-serif, monospace",
            color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "#383842",
          }}
        >
          <a
            style={{
              position: "absolute",
              zIndex: 10,
              bottom: isMobile ? 120 : 75,
              left: isMobile ? 20 : 60,
            }}
            href="#"
            onClick={() => {
              setIsDarkMode(!isDarkMode);
            }}
          >
            <Lightbulb
              style={{
                width: 32,
                height: 32,
                filter: isDarkMode ? "invert()" : "none",
                strokeWidth: 9,
                stroke: "black",
              }}
            />
          </a>
          <a
            style={{
              position: "absolute",
              zIndex: 10,
              top: isMobile ? 20 : 75,
              right: isMobile ? 20 : 60,
              padding: "2px 10px",
              background: isDarkMode ? "white" : "#383842",
              color: isDarkMode ? "#383842" : "#eeeeee",
              borderRadius: 10,
              fontFamily:
                "Cooper Black, Supply, Radio Grotesk, sans-serif, monospace, sans-serif",
            }}
            href="mailto:joaquinkunkel@gmail.com"
            target="_blank"
          >
            Let&apos;s talk!
          </a>
          <a
            style={{
              position: "absolute",
              zIndex: 10,
              bottom: isMobile ? 120 : 75,
              right: isMobile ? 20 : 60,
              fontFamily:
              "Supply, Radio Grotesk, sans-serif, monospace, sans-serif",
            }}
            href="https://github.com/joaquinkunkel/my-portfolio"
            target="_blank"
          >
            See this page on GitHub
          </a>
        </div>
      )}
      <Canvas shadows>
        <Suspense
          fallback={
            <LoadingScreen onLoaded={() => setShouldStartAnimation(true)} />
          }
        >
          <ResponsiveCamera />
          <ambientLight intensity={2} />
          <directionalLight
            position={[8, 14, -8]}
            intensity={0.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-near={1}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight position={[-10, 0, -4]} intensity={1} castShadow />
          <DreiOrbitControls ref={controlsRef} regress enableRotate={false} />
          <group scale={sceneScale}>
            <LivingRoom
              onProjectClick={setActiveProject}
              onProjectHover={setHoveredProject}
              controlsRef={controlsRef}
              isDarkMode={isDarkMode}
              setFeaturedCard={setFeaturedCard}
              shouldStartAnimation={shouldStartAnimation}
              setShouldStartAnimation={setShouldStartAnimation}
            />
          </group>
          {/* Add post-processing effects here */}
          {isDarkMode && (
            <EffectComposer>
              <Bloom
                intensity={0.02}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.3}
              />
              <Vignette eskil={false} offset={0.1} darkness={0.4} />
              <HueSaturation hue={0} saturation={0.1} />
              {/* <BrightnessContrast brightness={0.05} contrast={0.2} /> */}
              {/* <Noise opacity={0.08} /> */}
              <DepthOfField
                focusDistance={0.1}
                focalLength={0.9}
                bokehScale={2}
                height={480}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
