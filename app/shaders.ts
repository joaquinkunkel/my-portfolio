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

  // Shader for ripple gradient effect
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
        float wave = sin(vNormal.x * 4.0 + uTime * 0.9) + 
                     sin(vNormal.y * 4.0 + uTime * 0.5) + 
                     sin(vNormal.z * 4.0 + uTime * 1.0);

        wave = wave * 0.5 + 0.5;

        float r = 0.2 - 0.5 * wave;
        float g = 0.0 - 0.4 * wave;
        float b = 0.8 - 0.2 * wave;
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `,
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

        gl_FragColor = vec4(color, 0.3);
      }
    `,
    transparent: true,
  });
