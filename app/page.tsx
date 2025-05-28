"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import * as THREE from "three";
import useIsMobile from "./hooks/useIsMobile";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ContactLink, DarkModeToggleIcon, DarkModeToggleLink, GitHubLink, LinksContainer, PageContainer } from "./components/StyledComponents";
import BubblesFeaturedCard from "./components/BubblesFeaturedCard";
import CamblyFeaturedCard from "./components/CamblyFeaturedCard";
import LoadingScreen from "./components/LoadingScreen";
import { FeaturedCard } from "./components/FeaturedCard";
import LivingRoom from "./components/LivingRoom";
import React from "react";
import FreelanceFeaturedCard from "./components/FreelanceFeaturedCard";
// import DarkEffects from "./components/DarkEffects";
// import Cursor from "./components/Cursor";

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

function Home() {
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [darkmode, setdarkmode] = useState(false);
  const controlsRef = useRef<any>(null);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [featuredCard, setFeaturedCard] = useState<FeaturedCard>(null);
  const resetFeaturedCard = useCallback(() => {
    setFeaturedCard(null);
  }, []);

  const sceneScale = useIsMobile()
    ? new THREE.Vector3(0.8, 0.8, 0.8)
    : new THREE.Vector3(1, 1, 1);

  const toggleDarkMode = useCallback(() => {
    setdarkmode(!darkmode);
  }, [darkmode]);

  return (
    <PageContainer darkmode={darkmode}>
      {/* <Cursor /> */}
      {controlsRef.current && (
        <>
          {featuredCard === "bubbles" && (
            <BubblesFeaturedCard
              onBackgroundClick={resetFeaturedCard}
              darkmode={darkmode}
              isvisible={featuredCard === "bubbles"}
            />
          )}
          {featuredCard === "cambly" && (
            <CamblyFeaturedCard
              onBackgroundClick={resetFeaturedCard}
              darkmode={darkmode}
              isvisible={featuredCard === "cambly"}
            />
          )}
          {featuredCard === "freelance" && (
            <FreelanceFeaturedCard
              onBackgroundClick={resetFeaturedCard}
              darkmode={darkmode}
              isvisible={featuredCard === "freelance"}
            />
          )}
        </>
      )}
      <LinksContainer isvisible={isAnimationDone} darkmode={darkmode}>
        <DarkModeToggleLink
          isMobile={isMobile}
          href="#"
          onClick={toggleDarkMode}
        >
          <DarkModeToggleIcon darkmode={darkmode} />
        </DarkModeToggleLink>
        <ContactLink 
          darkmode={darkmode} 
          isMobile={isMobile}
          href="mailto:joaquinkunkel@gmail.com"
          target="_blank"
        >
          Let&apos;s talk!
        </ContactLink>
        <GitHubLink
          isMobile={isMobile}
          href="https://github.com/joaquinkunkel/my-portfolio"
          target="_blank"
        >
          See this page on GitHub
        </GitHubLink>
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
              darkmode={darkmode}
              setFeaturedCard={setFeaturedCard}
              shouldStartAnimation={shouldStartAnimation}
              setShouldStartAnimation={setShouldStartAnimation}
              isAnimationDone={isAnimationDone}
              setIsAnimationDone={setIsAnimationDone}
            />
          </group>
          {/* {darkmode && <DarkEffects/>} */}
        </Suspense>
      </Canvas>
    </PageContainer>
  );
}

export default React.memo(Home);
