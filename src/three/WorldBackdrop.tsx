/**
 * The living 3D backdrop: a Thai dusk with drifting paper lanterns and
 * fireflies, soft bloom, and mouse parallax. Renders behind screen content.
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// ── Gradient sky dome ──
function SkyDome({ variant }: { variant: 'dusk' | 'deep' }) {
  const material = useMemo(() => {
    const top = new THREE.Color(variant === 'dusk' ? '#0d1530' : '#070c1a')
    const mid = new THREE.Color(variant === 'dusk' ? '#1a2246' : '#0c1428')
    const bottom = new THREE.Color(variant === 'dusk' ? '#4a2c4e' : '#1a1f3e')
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: top },
        midColor: { value: mid },
        bottomColor: { value: bottom },
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 midColor;
        uniform vec3 bottomColor;
        varying vec3 vPos;
        void main() {
          float h = normalize(vPos).y;
          vec3 c = h > 0.0
            ? mix(midColor, topColor, smoothstep(0.0, 0.7, h))
            : mix(midColor, bottomColor, smoothstep(0.0, 0.55, -h));
          gl_FragColor = vec4(c, 1.0);
        }
      `,
    })
  }, [variant])
  return (
    <mesh material={material}>
      <sphereGeometry args={[80, 24, 16]} />
    </mesh>
  )
}

// ── Floating paper lanterns ──
const LANTERN_COUNT = 16

function Lanterns() {
  const bodyRef = useRef<THREE.InstancedMesh>(null)
  const glowRef = useRef<THREE.InstancedMesh>(null)
  const seeds = useMemo(
    () =>
      Array.from({ length: LANTERN_COUNT }, (_, i) => ({
        x: (Math.sin(i * 12.9898) * 43758.5453) % 1,
        base: new THREE.Vector3(
          ((i % 4) - 1.5) * 7 + Math.sin(i * 7.3) * 2.5,
          Math.sin(i * 3.7) * 4 + 2,
          -6 - (i % 5) * 4 - Math.sin(i * 5.1) * 2,
        ),
        speed: 0.25 + ((i * 37) % 10) / 22,
        phase: i * 1.37,
        scale: 0.55 + ((i * 13) % 7) / 10,
      })),
    [],
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const glowColor = useMemo(() => new THREE.Color('#ffb35c'), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const body = bodyRef.current
    const glow = glowRef.current
    if (!body || !glow) return
    seeds.forEach((s, i) => {
      const y = s.base.y + Math.sin(t * s.speed + s.phase) * 1.1 + t * 0.06 * s.speed
      const wrappedY = ((y + 6) % 18) - 6
      const x = s.base.x + Math.sin(t * 0.13 + s.phase * 2) * 0.8
      dummy.position.set(x, wrappedY, s.base.z)
      dummy.rotation.set(Math.sin(t * 0.4 + s.phase) * 0.08, 0, Math.cos(t * 0.33 + s.phase) * 0.06)
      dummy.scale.setScalar(s.scale)
      dummy.updateMatrix()
      body.setMatrixAt(i, dummy.matrix)
      dummy.scale.setScalar(s.scale * (2.1 + Math.sin(t * 1.7 + s.phase) * 0.25))
      dummy.updateMatrix()
      glow.setMatrixAt(i, dummy.matrix)
    })
    body.instanceMatrix.needsUpdate = true
    glow.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <instancedMesh ref={bodyRef} args={[undefined, undefined, LANTERN_COUNT]}>
        <cylinderGeometry args={[0.34, 0.46, 0.95, 10, 1]} />
        <meshStandardMaterial
          color="#ff9a3d"
          emissive="#ff7b1a"
          emissiveIntensity={2.2}
          roughness={0.6}
        />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, LANTERN_COUNT]}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.10} depthWrite={false} blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </group>
  )
}

// ── Fireflies ──
const FIREFLY_COUNT = 90

function Fireflies() {
  const ref = useRef<THREE.Points>(null)
  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(FIREFLY_COUNT * 3)
    const phases = new Float32Array(FIREFLY_COUNT)
    for (let i = 0; i < FIREFLY_COUNT; i++) {
      positions[i * 3] = (Math.sin(i * 12.9) * 0.5 + 0.5 - 0.5) * 30
      positions[i * 3 + 1] = (Math.sin(i * 78.2) * 0.5) * 12
      positions[i * 3 + 2] = -2 - ((i * 17) % 20)
      phases[i] = (i * 2.399) % (Math.PI * 2)
    }
    return { positions, phases }
  }, [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float phase;
          uniform float uTime;
          varying float vTwinkle;
          void main() {
            vec3 p = position;
            p.x += sin(uTime * 0.22 + phase * 3.0) * 0.9;
            p.y += sin(uTime * 0.35 + phase * 2.0) * 0.7;
            vTwinkle = 0.5 + 0.5 * sin(uTime * (1.4 + fract(phase) * 1.6) + phase * 7.0);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = (2.2 + vTwinkle * 3.2) * (24.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying float vTwinkle;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.05, d) * (0.35 + vTwinkle * 0.65);
            gl_FragColor = vec4(1.0, 0.85, 0.45, a * 0.8);
          }
        `,
      }),
    [],
  )

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-phase" args={[phases, 1]} />
      </bufferGeometry>
    </points>
  )
}

// ── Mouse parallax rig ──
function ParallaxRig() {
  const { camera, pointer } = useThree()
  useFrame(() => {
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.03
    camera.position.y += (pointer.y * 0.55 + 0.4 - camera.position.y) * 0.03
    camera.lookAt(0, 0.4, -8)
  })
  return null
}

interface Props {
  variant?: 'dusk' | 'deep'
  /** Disable postprocessing for weaker devices / reduced motion. */
  effects?: boolean
  /** Render the drifting 3D lanterns (screens may supply their own lantern art). */
  lanterns?: boolean
  className?: string
}

export default function WorldBackdrop({ variant = 'dusk', effects = true, lanterns = true, className }: Props) {
  return (
    <div
      className={className}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 7], fov: 52 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
      >
        <SkyDome variant={variant} />
        <ambientLight intensity={0.5} color="#8090c0" />
        <directionalLight position={[4, 8, 2]} intensity={0.7} color="#ffd9a0" />
        {lanterns && <Lanterns />}
        <Fireflies />
        <ParallaxRig />
        {effects && (
          <EffectComposer>
            <Bloom intensity={0.85} luminanceThreshold={0.55} luminanceSmoothing={0.4} mipmapBlur />
            <Vignette eskil={false} offset={0.18} darkness={0.78} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
