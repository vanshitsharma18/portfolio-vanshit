import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, MeshDistortMaterial, Float, Torus } from '@react-three/drei'
import * as THREE from 'three'

/* ── Morphing DevOps Sphere ── */
function CloudSphere() {
  const sphereRef  = useRef()
  const wireRef    = useRef()
  const ring1Ref   = useRef()
  const ring2Ref   = useRef()
  const ring3Ref   = useRef()
  const nodesRef   = useRef([])

  const nodePositions = [
    [2.6, 0.4, 0.5],   [-2.4, 0.6, 0.2],  [0.3, 2.5, 0.6],
    [0.5, -2.4, 0.4],  [2.0, -1.5, 0.8],  [-1.8, 1.8, 0.5],
    [2.2, 1.2, -0.5],  [-2.0, -1.4, 0.3],
  ]

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.08
      sphereRef.current.rotation.x = Math.sin(t * 0.04) * 0.15
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.08
      wireRef.current.rotation.x = Math.sin(t * 0.04) * 0.15
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3
    if (ring2Ref.current) ring2Ref.current.rotation.y = t * 0.2
    if (ring3Ref.current) ring3Ref.current.rotation.x = t * 0.15
    nodesRef.current.forEach((node, i) => {
      if (node) {
        const scale = 1 + Math.sin(t * 1.5 + i) * 0.25
        node.scale.setScalar(scale)
      }
    })
  })

  return (
    <group>
      {/* Central morphing sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.7, 64, 64]} />
        <MeshDistortMaterial
          color="#C8FF00"
          emissive="#3A5000"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          distort={0.38}
          speed={2.2}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef} scale={1.02}>
        <sphereGeometry args={[1.7, 20, 20]} />
        <meshBasicMaterial color="#C8FF00" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Orbit rings */}
      <mesh ref={ring1Ref} rotation={[1.5, 0, 0.3]}>
        <torusGeometry args={[2.8, 0.018, 16, 120]} />
        <meshBasicMaterial color="#C8FF00" transparent opacity={0.35} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[0.4, 0.3, 1.1]}>
        <torusGeometry args={[3.4, 0.012, 16, 120]} />
        <meshBasicMaterial color="#00FFD1" transparent opacity={0.2} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0.9, 1.2, 0.5]}>
        <torusGeometry args={[3.9, 0.008, 16, 120]} />
        <meshBasicMaterial color="#7B8EFF" transparent opacity={0.15} />
      </mesh>

      {/* Orbiting nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos} ref={el => nodesRef.current[i] = el}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#C8FF00' : i % 3 === 1 ? '#00FFD1' : '#7B8EFF'} />
        </mesh>
      ))}

      {/* Connection lines */}
      {nodePositions.slice(0, 4).map((p1, i) => {
        const p2 = nodePositions[(i + 1) % 4]
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...p1), new THREE.Vector3(...p2)
        ])
        return (
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#C8FF00" transparent opacity={0.12} />
          </line>
        )
      })}
    </group>
  )
}

/* ── Floating Data Particles ── */
function Particles({ count = 120 }) {
  const ref = useRef()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C8FF00" size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[8, 8, 8]}   color="#C8FF00" intensity={4} />
      <pointLight position={[-8, -6, -4]} color="#00FFD1" intensity={1.5} />
      <pointLight position={[0, 0, 5]}   color="#ffffff" intensity={0.5} />

      <Stars radius={100} depth={60} count={3500} factor={4} saturation={0} fade />
      <Particles />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.5}>
          <CloudSphere />
        </Float>
      </Suspense>
    </Canvas>
  )
}
