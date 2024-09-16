"use client"; // Add this line at the very top
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import Lightbulb from "../public/icons/bulb.svg";
import * as THREE from "three";
import useIsMobile from "./useIsMobile";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { LinksContainer } from "./Styles";
import BubblesFeaturedCard from "./BubblesFeaturedCard";
import CamblyFeaturedCard from "./CamblyFeaturedCard";
import LoadingScreen from "./LoadingScreen";
import DarkEffects from "./DarkEffects";
import { IFeaturedCard } from "./FeaturedCard";
import LivingRoom from "./LivingRoom";

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

export default function Home() {
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const controlsRef = useRef<any>(null);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
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
        height: "100svh",
        width: "100vw",
        position: "relative",
        background: isDarkMode ? "#20192a" : "#eeeeee",
        animation: "gradientAnimation 120s ease infinite",
        backgroundSize: "500% 500%",
        transition: "all 0.3s ease-out",
      }}
    >
      {controlsRef.current && (
        <>
          {featuredCard === "bubbles" && (
            <BubblesFeaturedCard
              onBackgroundClick={resetFeaturedCard}
              isDarkMode={isDarkMode}
              visible={featuredCard === "bubbles"}
            />
          )}
          {featuredCard === "cambly" && (
            <CamblyFeaturedCard
              onBackgroundClick={resetFeaturedCard}
              isDarkMode={isDarkMode}
              visible={featuredCard === "cambly"}
            />
          )}
        </>
      )}
      <LinksContainer visible={isAnimationDone} isDarkMode={isDarkMode}>
        <a
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: isMobile ? 40 : 75,
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
            bottom: isMobile ? 40 : 75,
            right: isMobile ? 20 : 60,
            fontFamily: "Radio Grotesk, sans-serif, monospace, sans-serif",
          }}
          href="https://github.com/joaquinkunkel/my-portfolio"
          target="_blank"
        >
          See this page on GitHub
        </a>
      </LinksContainer>
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
              isAnimationDone={isAnimationDone}
              setIsAnimationDone={setIsAnimationDone}
            />
          </group>
          {isDarkMode && <DarkEffects/>}
        </Suspense>
      </Canvas>
    </div>
  );
}
