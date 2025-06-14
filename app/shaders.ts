import * as THREE from "three";
 
 // Shader for the TV screen
 export const tvScreenShaderMaterial = new THREE.ShaderMaterial({
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

export const gradientShaderMaterial = new THREE.ShaderMaterial({
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
      // Create larger, more organic wave patterns
      float wave1 = sin(vNormal.x * 2.5 + vNormal.y * 1.8 + uTime * 1.2);
      float wave2 = cos(vNormal.y * 2.2 + vNormal.z * 1.5 + uTime * 0.8);
      float wave3 = sin(vNormal.z * 1.9 + vNormal.x * 2.1 + uTime * 1.5);
      
      // Add smooth noise-like patterns
      float organic1 = sin(vNormal.x * 1.3 + vNormal.y * 0.9) * cos(vNormal.z * 1.1 + uTime * 0.6);
      float organic2 = cos(vNormal.y * 1.7 + vNormal.z * 1.2) * sin(vNormal.x * 1.4 + uTime * 0.9);
      
      // Combine for complex, irregular interference
      float interference = (wave1 + wave2 + wave3) * 0.25 + (organic1 + organic2) * 0.15;
      
      // Slower, more fluid color shifts
      float colorShift = interference + sin(uTime * 0.4) * 0.2 + cos(uTime * 0.6) * 0.15;
      
      // Bubble-like iridescent colors
      vec3 color1 = vec3(1.0, 0.4, 0.8);  // Pink
      vec3 color2 = vec3(0.3, 0.8, 1.0);  // Cyan
      vec3 color3 = vec3(0.8, 1.0, 0.4);  // Green-yellow
      vec3 color4 = vec3(0.9, 0.6, 1.0);  // Purple
      
      // Smooth color transitions
      float t = (colorShift + 1.0) * 0.5; // Normalize to 0-1
      
      vec3 finalColor;
      if (t < 0.33) {
        finalColor = mix(color1, color2, t * 3.0);
      } else if (t < 0.66) {
        finalColor = mix(color2, color3, (t - 0.33) * 3.0);
      } else {
        finalColor = mix(color3, color4, (t - 0.66) * 3.0);
      }
      
      // Add subtle, large-scale shimmer
      float shimmer = sin(vNormal.x * 3.0 + vNormal.y * 2.5 + uTime * 1.8) * 0.08 + 0.92;
      finalColor *= shimmer;
      
      // Slight transparency for bubble effect
      gl_FragColor = vec4(finalColor, 0.85);
    }
  `,
  transparent: true, // Enable transparency for realistic bubble look
});

  export const textShader = new THREE.ShaderMaterial({
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

        gl_FragColor = vec4(color, 0.6);
      }
    `,
    transparent: true,
  });
