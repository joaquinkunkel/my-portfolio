import { Billboard, RoundedBox, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import EngravedBox from "./EngravedBox";
import FloatingGroup from "./FloatingGroup";
import IOSIconShape from "./iOSIconShape";
import { gradientShaderMaterial, textShader, tvScreenShaderMaterial } from "./shaders";
import useIsMobile from "./hooks/useIsMobile";
import { Text } from "@react-three/drei";
import GlassyTVScreen from "./GlassyTVScreen";
import { IFeaturedCard } from "./FeaturedCard";

// Load the GLTF bird model
function BirdModel(props: any) {
  const { scene } = useGLTF("/models/bird.gltf");
  return <primitive object={scene} {...props} />;
}

const LivingRoom = ({
  controlsRef,
  darkMode,
  setFeaturedCard,
  shouldStartAnimation,
  isAnimationDone,
  setIsAnimationDone,
}: {
  onProjectClick: (project: any) => void;
  onProjectHover: (project: any) => void;
  controlsRef: React.MutableRefObject<any>;
  darkMode: boolean;
  setFeaturedCard: React.Dispatch<React.SetStateAction<IFeaturedCard>>;
  shouldStartAnimation: boolean;
  setShouldStartAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimationDone: boolean;
  setIsAnimationDone: React.Dispatch<React.SetStateAction<boolean>>;
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

  const handleBubblesClick = useCallback(() => {
    setFeaturedCard("bubbles");
  }, [setFeaturedCard]);

  const handleCamblyClick = useCallback(() => {
    setFeaturedCard("cambly");
  }, [setFeaturedCard]);

  const handleFreelanceClick = useCallback(() => {
    window.open("https://behance.net/joaquinkunkel", "_blank");
  }, []);

  useEffect(() => {
    gradientShaderRef.current = gradientShaderMaterial;
    textShaderRef.current = textShader;
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
        setIsAnimationDone(true);
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [shouldStartAnimation, isMobile, setIsAnimationDone]);

  
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
    if (sphereRef.current?.uniforms?.utime) {
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
            position={[0, isMobile ? 9 : 6.5, 0]}
            fontSize={isMobile ? 1 : 0.65}
            fontWeight="normal"
            anchorX="center"
            anchorY="middle"
            castShadow
            font="/fonts/COOPBL.TTF"
            color={darkMode ? "#ffffff" : "#383842"}
          >
            Hi, I'm Joaquín.
          </Text>
        </animated.mesh>
      </Billboard>

      <Billboard>
        <animated.mesh>
          <Text
            position={[0, isMobile ? 7.96 : 5.86, 0]}
            fontSize={isMobile ? 0.5 : 0.36}
            color={darkMode ? "white" : "#383842"}
            anchorX="center"
            anchorY="middle"
            castShadow
            font="/fonts/RadioGrotesk-Regular.ttf"
            material={darkMode ? textShaderRef.current || new THREE.ShaderMaterial : undefined}
          >
            I design and code software.
          </Text>
        </animated.mesh>
      </Billboard>

      { /*
      <group position={[-3, 0.5, 3]} scale={[1.1, 1.1, 1.1]}>
        <animated.mesh
          castShadow
          scale={coursedogSpring.scale.to((s) => [s, s, s])}
          onPointerOver={() => {
            setHoveredObject("coursedog");
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHoveredObject(null);
            document.body.style.cursor = "auto";
          }}
          onClick={() => console.log("Coursedog clicked")}
        >
          {(hoveredObject === "coursedog" || isMobile) && (
            <Billboard>
              <Text
                position={[0, isMobile ? 3 : 3.5, 0]}
                fontSize={isMobile ? 0.6 : 0.4}
                color={darkMode ? "#5a67d8" : "#4c51bf"} // Blue-indigo color for both themes
                font="/fonts/COOPBL.TTF"
              >
                Coursedog
              </Text>
              <Text
                position={[0, isMobile ? 2.5 : 3, 0]}
                fontSize={isMobile ? 0.35 : 0.24}
                color={darkMode ? "white" : "#383842"}
                font="/fonts/RadioGrotesk-Regular.ttf"
              >
                UI Designer
              </Text>
              {!isMobile && (
                <Text
                  position={[0, 2.3, 0]}
                  fontSize={0.24}
                  color={"#777777"}
                  font="/fonts/RadioGrotesk-Regular.ttf"
                >
                  2018 - 2019
                </Text>
              )}
            </Billboard>
          )}
          <RoundedBox args={[1.5, 1, 1.5]} radius={0.2} smoothness={10}>
            <meshStandardMaterial color="white" metalness={0.4} roughness={0.3} />
          </RoundedBox>
          <FloatingGroup active={false}>
            <mesh scale={2.0} castShadow>
              <DogTrophyModel position={[0, 0.39, 0]} />
            </mesh>
          </FloatingGroup>
          <pointLight
            position={[0, 2, 0]}
            intensity={hoveredObject === "coursedog" ? 25 : 0.1}
            distance={60}
            color="lightblue"
            castShadow
          />
        </animated.mesh>
      </group>
      */}

      <animated.mesh
        position={[-3.0, 0, -3.6]}
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
              position={[0, isMobile ? 3.5 : 3.75, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color="#e66578"
              font="/fonts/COOPBL.TTF"
            >
              Bubbles
            </Text>
            <Text
              position={[0, isMobile ? 2.9 : 3.35, 0]}
              fontSize={isMobile ? 0.35 : 0.24}
              color={darkMode ? "white" : "#383842"}
              font="/fonts/RadioGrotesk-Regular.ttf"
            >
              UX & Eng (founding team)
            </Text>
            {!isMobile && (
              <Text
                position={[0, 3, 0]}
                fontSize={0.24}
                color={"#777777"}
                font="/fonts/RadioGrotesk-Regular.ttf"
              >
                2021 - now
              </Text>
            )}
          </Billboard>
        )}
        <FloatingGroup active>
          <mesh position={[0, 1.75, 0]}>
            <sphereGeometry args={[0.75, 32, 32]} />
            <meshStandardMaterial
              color="white"
              transparent
              opacity={0.4}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={0.5}
            />
            <primitive object={gradientShaderRef.current || new THREE.ShaderMaterial} ref={sphereRef} />
          </mesh>

          <mesh position={[0, 1.75, 0]}>
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
        <EngravedBox text="Current" position={[0, 0.35, 0]} />
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
        position={[3, 0, 3]}
        rotation={[0, -Math.PI / 2, 0]}
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
              position={[0, isMobile ? 3.6 : 3.6, 0]}
              fontSize={isMobile ? 0.6 : 0.4}
              color={darkMode ? "#c6f545" : "#76d525"}
              font="/fonts/COOPBL.TTF"
            >
              Freelance
            </Text>
            <Text
              position={[0, isMobile ? 3 : 3.15, 0]}
              fontSize={isMobile ? 0.35 : 0.24}
              color={darkMode ? "white" : "#383842"}
              font="/fonts/RadioGrotesk-Regular.ttf"
            >
              Design, motion & art
            </Text>
            {!isMobile && (
              <Text
                position={[0, 2.76, 0]}
                fontSize={0.24}
                color={"#777777"}
                font="/fonts/RadioGrotesk-Regular.ttf"
              >
                Since 2015
              </Text>
            )}
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
              fontSize={isMobile ? 0.6 : 0.43}
              color="#e49610"
              font="/fonts/COOPBL.TTF"
            >
              Cambly
            </Text>
            <Text
              position={[0, isMobile ? 2.4 : 2.58, 0]}
              fontSize={isMobile ? 0.35 : 0.27}
              color={darkMode ? "white" : "#383842"}
              font="/fonts/RadioGrotesk-Regular.ttf"
            >
              Lead product designer
            </Text>
            {!isMobile && (
              <Text
                position={[0, 2.2, 0]}
                fontSize={0.27}
                color={"#777777"}
                font="/fonts/RadioGrotesk-Regular.ttf"
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

  export default React.memo(LivingRoom)