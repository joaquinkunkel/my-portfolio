import React from "react";
import { Html, useProgress } from "@react-three/drei";
import { useEffect } from "react";

function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
    const { progress, loaded, total } = useProgress();
    useEffect(() => {
      if (loaded === total) {
        onLoaded(); // Call the function passed as a prop when loading is complete
      }
    }, [loaded, total, onLoaded]);
  
    return (
      <Html center>
        <div
          style={{
            opacity: 0.6,
            fontSize: "1.5em",
            color: "#585862",
            fontFamily: "Cooper Black, sans-serif",
          }}
        >
          Loading... {progress.toFixed(2)}%
        </div>
      </Html>
    );
  }

export default React.memo(LoadingScreen)