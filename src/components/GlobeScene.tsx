'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'

// Sun comes from this world-space direction
const SUN = new THREE.Vector3(5, 2, 3).normalize()

/* ─── Day/Night Earth shader ─────────────────────────────────── */
const EARTH_VERT = /* glsl */ `
  varying vec2  vUv;
  varying vec3  vWorldNormal;
  varying vec3  vWorldPos;

  void main() {
    vUv          = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const EARTH_FRAG = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3      sunDir;
  uniform vec3      camPos;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vWorldNormal);

    // Day / night blend
    float NdotL    = dot(N, sunDir);
    float dayBlend = smoothstep(-0.18, 0.28, NdotL);

    vec4 day   = texture2D(dayMap,   vUv);
    vec4 night = texture2D(nightMap, vUv);
    night.rgb *= 2.8;  // amplify city-lights

    vec4 color = mix(night, day, dayBlend);

    // Subtle ocean specular
    vec3 viewDir = normalize(camPos - vWorldPos);
    vec3 half_   = normalize(sunDir + viewDir);
    float spec   = pow(max(dot(N, half_), 0.0), 80.0) * 0.35 * dayBlend;
    color.rgb   += spec;

    // Horizon atmospheric tint (scattering rim)
    float rim = pow(1.0 - abs(dot(N, viewDir)), 4.0);
    color.rgb  = mix(color.rgb, vec3(0.3, 0.65, 1.0), rim * 0.4 * dayBlend);

    gl_FragColor = color;
  }
`

/* ─── Atmosphere glow shader (rendered on BackSide) ─────────── */
const ATM_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal     = normalize(normalMatrix * normal);
    vec4 mvPos  = modelViewMatrix * vec4(position, 1.0);
    vView       = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`

const ATM_FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float intensity = pow(1.0 - abs(dot(vNormal, vView)), 2.2);
    gl_FragColor = vec4(0.25, 0.6, 1.0, intensity * 0.9);
  }
`

/* ─── Earth mesh ─────────────────────────────────────────────── */
function EarthMesh() {
  const earthRef  = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  const [dayMap, nightMap] = useLoader(TextureLoader, [
    '/textures/earth-day.jpg',
    '/textures/earth-night.jpg',
  ])

  // Anisotropic filtering for sharper textures
  dayMap.anisotropy   = 8
  nightMap.anisotropy = 8

  const uniforms = useMemo(() => ({
    dayMap:   { value: dayMap },
    nightMap: { value: nightMap },
    sunDir:   { value: SUN },
    camPos:   { value: new THREE.Vector3() },
  }), [dayMap, nightMap])

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.07
    uniforms.camPos.value.copy(camera.position)
  })

  return (
    // 23.5° axial tilt
    <group rotation={[0, 0, THREE.MathUtils.degToRad(23.5)]}>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 96, 96]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={EARTH_VERT}
          fragmentShader={EARTH_FRAG}
        />
      </mesh>

      {/* Outer atmosphere — BackSide so it wraps around the sphere */}
      <mesh>
        <sphereGeometry args={[2.22, 64, 64]} />
        <shaderMaterial
          vertexShader={ATM_VERT}
          fragmentShader={ATM_FRAG}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Thin inner glow layer */}
      <mesh>
        <sphereGeometry args={[2.06, 64, 64]} />
        <meshPhongMaterial
          color="#4488ff"
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  )
}

/* ─── Scene wrapper ──────────────────────────────────────────── */
export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      {/* Very faint fill so the night side isn't pitch black */}
      <ambientLight intensity={0.03} />

      {/* Sun — matches the shader SUN direction */}
      <directionalLight
        position={[5, 2, 3]}
        intensity={2.8}
        color="#fff5e8"
      />

      <Stars
        radius={90}
        depth={60}
        count={4000}
        factor={3}
        fade
        speed={0.4}
        saturation={0}
      />

      <Suspense fallback={null}>
        <EarthMesh />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping
        dampingFactor={0.04}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </Canvas>
  )
}
