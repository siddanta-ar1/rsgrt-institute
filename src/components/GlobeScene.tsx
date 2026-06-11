'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const icoRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)

  // Floating data-point positions around the sphere
  const dots = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < 40; i++) {
      const phi = Math.acos(-1 + (2 * i) / 40)
      const theta = Math.sqrt(40 * Math.PI) * phi
      const r = 2.25
      pts.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ])
    }
    return pts
  }, [])

  useFrame((_, delta) => {
    const speed = 0.12
    if (outerRef.current) outerRef.current.rotation.y += delta * speed
    if (innerRef.current) innerRef.current.rotation.y += delta * speed * 0.8
    if (icoRef.current) {
      icoRef.current.rotation.y += delta * speed * 0.5
      icoRef.current.rotation.x += delta * speed * 0.2
    }
    if (ringsRef.current) ringsRef.current.rotation.y += delta * speed * 1.2
  })

  return (
    <group>
      {/* Solid inner sphere — subtle glow */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.96, 48, 48]} />
        <meshPhongMaterial
          color="#0c4a6e"
          emissive="#0369a1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.55}
          shininess={80}
        />
      </mesh>

      {/* Lat/lon wireframe sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[2, 28, 18]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Icosahedron outline */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[2.12, 1]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Equatorial ring */}
      <group ref={ringsRef} rotation={[Math.PI / 8, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.45, 0.008, 4, 120]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[2.55, 0.005, 4, 120]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Data-point dots */}
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.028, 6, 6]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#f0f9ff' : '#38bdf8'} />
        </mesh>
      ))}
    </group>
  )
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={1.4} color="#38bdf8" />
      <pointLight position={[-6, -4, -6]} intensity={0.6} color="#6366f1" />
      <pointLight position={[0, 6, -4]} intensity={0.4} color="#e0f2fe" />

      <Stars radius={60} depth={40} count={1800} factor={2.5} fade speed={0.8} />

      <Globe />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
  )
}
