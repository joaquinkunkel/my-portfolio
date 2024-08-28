"use client"; // Add this line at the very top

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Text,
  Billboard,
  useGLTF,
} from "@react-three/drei";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import useIsMobile from "./useIsMobile";

// Load the GLTF bird model
function BirdModel(props: any) {
  const { scene } = useGLTF("/models/bird.gltf");
  return <primitive object={scene} {...props} />;
}

const LivingRoom = ({
  onProjectClick,
  onProjectHover,
  controlsRef,
}: {
  onProjectClick: (project: any) => void;
  onProjectHover: (project: any) => void;
  controlsRef: React.MutableRefObject<any>;
}) => {
  const tvScreenRef = useRef<THREE.ShaderMaterial | null>(null);
  const sphereRef = useRef<THREE.ShaderMaterial | null>(null);
  const textShaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const gradientShaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const [textVisible, setTextVisible] = useState(false);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const isMobile = useIsMobile();

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

        float r = 0.3 - 0.2 * wave;
        float g = 0.3 - 0.2 * wave;
        float b = 0.6 - 0.3 * wave;
        
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
          color.r += edgeFactor * (1.0 + 0.5 * sin(uTime + dist * 10.0));
          color.g += edgeFactor * (1.0 + 0.5 * sin(uTime + dist * 15.0 + 1.0));
          color.b += edgeFactor * (1.0 + 0.5 * sin(uTime + dist * 20.0 + 2.0));
        }

        gl_FragColor = vec4(color, 0.7);
      }
    `,
    transparent: true,
  });

  const { position } = useSpring({
    from: { position: [10, -10, 10] },
    to: { position: [-12.47, 4.28, 9.57] },
    config: { duration: 1400, easing: (t) => --t * t * t * t + 1 },
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
    position: hoveredObject === "bird" ? [3, 0.8, -3] : [3, 0.8, -3],
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
    if (controls) {
      controls.object.position.set(...position.get());
      controls.update();
    }

    if (tvScreenRef.current) {
      tvScreenRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
    if (textShaderRef.current) {
      textShaderRef.current.uniforms.uTime.value =
        state.clock.getElapsedTime();
    }
    if (sphereRef.current) {
      sphereRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group>
      <RoundedBox
        args={[10, 1, 10]}
        radius={0.3}
        smoothness={10}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#444948"
          metalness={0.5}
          roughness={0.7}
          envMapIntensity={0.4}
        />
      </RoundedBox>

      {/* Text elements with Billboard to face the camera */}
      <Billboard>
        <animated.mesh>
          <Text
            position={[0, isMobile ? 8 : 6.5, 0]}
            fontSize={isMobile ? 1 : 0.5}
            anchorX="center"
            anchorY="middle"
            castShadow
            font="/fonts/COOPBL.TTF"
            material={textShaderRef.current}
          >
            Joaquín Kunkel
          </Text>
        </animated.mesh>
      </Billboard>

      <Billboard>
        <animated.mesh>
          <Text
            position={[0, isMobile ? 7 : 6, 0]}
            fontSize={isMobile ? 0.65 : 0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
            castShadow
            font="/fonts/RadioGrotesk-Regular.ttf"
            material={textShaderRef.current}
          >
            Designer who codes
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
        onClick={() => window.open("https://usebubbles.com/", "_blank")}
      >
        {(hoveredObject === "lamp" || isMobile) && (
          <Billboard>
            <Text
              position={[0, isMobile ? 4 : 3.6, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color="#f070af"
              font="/fonts/COOPBL.TTF"
            >
              Bubbles
            </Text>
            <Text
              position={[0, isMobile ? 3.5 : 3.25, 0]}
              fontSize={isMobile ? 0.4 : 0.28}
              color="white"
              font="/fonts/RadioGrotesk-Regular.ttf"
            >
              Front-end & Design
            </Text>
          </Billboard>
        )}
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
            color="black"
            metalness={1}
            roughness={0.3}
            transparent
            opacity={0.4}
            envMapIntensity={1}
          />
        </mesh>

        <RoundedBox
          args={[1.5, 1, 1.5]}
          radius={0.2}
          smoothness={10}
          position={[0, 0.75, 0]}
        >
          <meshStandardMaterial
            color="#e87967"
            metalness={0.2}
            roughness={0.4}
          />
        </RoundedBox>

        <pointLight
          position={[0, 2.1, 0]}
          intensity={hoveredObject === "lamp" ? 2 : 0.3}
          distance={5}
          color="white"
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
        onClick={() =>
          window.open("https://behance.net/joaquinkunkel", "_blank")
        }
      >
        {(hoveredObject === "tv" || isMobile) && (
          <Billboard>
            <Text
              position={[0, isMobile ? 4 : 3.6, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color="#30f03f"
              font="/fonts/COOPBL.TTF"
            >
              Freelance
            </Text>
            <Text
              position={[0, isMobile ? 3.5 : 3.25, 0]}
              fontSize={isMobile ? 0.4 : 0.28}
              color="white"
              font="/fonts/RadioGrotesk-Regular.ttf"
            >
              Design, motion,
            </Text>
            <Text
              position={[0, isMobile ? 3 : 2.96, 0]}
              fontSize={isMobile ? 0.4 : 0.28}
              color="white"
              font="/fonts/RadioGrotesk-Regular.ttf"
            >
              eng & art
            </Text>
          </Billboard>
        )}
        <RoundedBox
          args={[1.5, 1, 1.5]}
          radius={0.2}
          smoothness={10}
          position={[0, 0.75, 0]}
        >
          <meshStandardMaterial
            color="#999999"
            metalness={0.1}
            roughness={0.4}
          />
        </RoundedBox>
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[1.5, 1, 1]} />
          <meshStandardMaterial
            color="#555555"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[0, 2, 0.51]} castShadow>
          <planeGeometry args={[1.3, 0.8]} />
          <primitive object={tvScreenShaderMaterial} ref={tvScreenRef} />
          <spotLight
            position={[0, 2, 0.51]}
            target-position={[0, 2, 5]}
            intensity={2}
            distance={10}
            angle={Math.PI / 6}
            penumbra={0.5}
            color="white"
            castShadow
          />
        </mesh>
        <pointLight
          position={[0, 2.1, 0]}
          intensity={hoveredObject === "tv" ? 2 : 0.3}
          distance={5}
          color="white"
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
        onClick={() => window.open("https://cambly.com/", "_blank")}
        castShadow
      >
        {(hoveredObject === "bird" || isMobile) && (
          <Billboard>
            <Text
              position={[0, isMobile ? 3 : 3, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color="orange"
              font="/fonts/COOPBL.TTF"
            >
              Cambly
            </Text>
            <Text
              position={[0, isMobile ? 2.65 : 2.65, 0]}
              fontSize={isMobile ? 0.4 : 0.28}
              color="white"
              font="/fonts/RadioGrotesk-Regular.ttf"
            >
              Front-end & Design
            </Text>
          </Billboard>
        )}
        <RoundedBox
          args={[1.5, 1, 1.5]}
          radius={0.2}
          smoothness={10}
        >
          <meshStandardMaterial
            color="#999999"
            metalness={0.1}
            roughness={0.4}
          />
        </RoundedBox>
        <mesh scale={3.0}>
          <BirdModel position={[0, 0.39, 0]} />
        </mesh>
        <pointLight
          position={[0, 1, 0]}
          intensity={hoveredObject === "bird" ? 2 : 0.3}
          distance={5}
          color="white"
          castShadow
        />
      </animated.mesh>
    </group>
  );
};

function ResponsiveCamera() {
  const isMobile = useIsMobile();
  const { camera } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = isMobile ? 70 : 50;
      camera.updateProjectionMatrix();
    }
  }, [isMobile, camera]);

  return null;
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const controlsRef = useRef<any>(null);

  const sceneScale = useIsMobile() ? new THREE.Vector3(0.8, 0.8, 0.8) : new THREE.Vector3(1, 1, 1)

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        background: "linear-gradient(180deg, #4a4a44, #242428)",
        animation: "gradientAnimation 1.5s ease infinite",
        backgroundSize: "400% 400%",
      }}
    >
      <div
        style={{
          fontFamily: "Radio Grotesk",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <a
          style={{ position: "absolute", zIndex: 10, bottom: 30, left: 20 }}
          href="mailto:joaquinkunkel@gmail.com"
          target="_blank"
        >
          Let&apos;s talk
        </a>
        <a
          style={{ position: "absolute", zIndex: 10, bottom: 30, right: 20 }}
          href="https://github.com/joaquinkunkel"
          target="_blank"
        >
          See this page on GitHub
        </a>
      </div>
      <Canvas shadows>
        <ResponsiveCamera />
        <ambientLight intensity={2} />
        <directionalLight
          position={[10, 14, -10]}
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
        <DreiOrbitControls ref={controlsRef} />
        <group scale={sceneScale}>
          <LivingRoom
            onProjectClick={setActiveProject}
            onProjectHover={setHoveredProject}
            controlsRef={controlsRef}
          />
        </group>
      </Canvas>

      {activeProject !== null && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            overflowY: "scroll",
            padding: "20px",
            transition: "opacity 0.5s",
          }}
        >
          <h1>Project {activeProject + 1}</h1>
          <p>Details about project {activeProject + 1}...</p>
          <button onClick={() => setActiveProject(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
