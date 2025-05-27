import React from "react";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";

function DarkEffects() {
  return (
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
  );
}

export default React.memo(DarkEffects);
