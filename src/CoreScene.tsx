import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, OrbitControls, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Core() {
  const group = useRef<THREE.Group>(null)
  const rings = useMemo(() => [0, 1, 2, 3, 4], [])
  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = t * 0.12 + pointer.x * 0.22
    group.current.rotation.x = Math.sin(t * 0.35) * 0.1 + pointer.y * 0.12
    group.current.position.y = Math.sin(t * 0.8) * 0.14
  })
  return <group ref={group}>
    <mesh><icosahedronGeometry args={[1.06, 3]} /><meshPhysicalMaterial color="#9ec3d5" metalness={0.92} roughness={0.12} transmission={0.1} clearcoat={1} /></mesh>
    <mesh scale={0.84}><icosahedronGeometry args={[1, 2]} /><meshBasicMaterial color="#07121a" wireframe transparent opacity={0.78} /></mesh>
    {rings.map((i) => <group key={i} rotation={[i * 0.57, i * 0.95, i * 0.25]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55 + (i % 2) * .15, 0.008 + (i % 3) * .007, 12, 110, Math.PI * (1.15 + i * .13)]} />
        <meshBasicMaterial color={i % 2 ? '#76b9db' : '#d7e2ea'} transparent opacity={.72} />
      </mesh>
      <mesh position={[1.55 + (i % 2) * .15, 0, 0]}><sphereGeometry args={[.045 + (i % 2) * .02, 12, 12]} /><meshBasicMaterial color="#ccefff" /></mesh>
    </group>)}
    <mesh scale={1.4}><icosahedronGeometry args={[1, 2]} /><meshBasicMaterial color="#6ec7ee" wireframe transparent opacity={.06} /></mesh>
  </group>
}

function OrbitPaths() {
  const paths = useMemo(() => Array.from({ length: 5 }, (_, i) => {
    const points = Array.from({ length: 90 }, (_, j) => {
      const a = j / 89 * Math.PI * 2
      const x = Math.cos(a) * (2.55 + i * .2)
      const y = Math.sin(a) * (0.68 + i * .1)
      return new THREE.Vector3(x, y, Math.sin(a * 2 + i) * .25)
    })
    return points
  }), [])
  return <>{paths.map((points, i) => <Line key={i} points={points} color={i % 2 ? '#4693b8' : '#b6d7e6'} transparent opacity={.22} lineWidth={0.5} rotation={[i * .28, i * .42, i * .17]} />)}</>
}

export default function CoreScene() {
  return <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={42} />
    <color attach="background" args={['#0c0c0c']} />
    <ambientLight intensity={0.35} />
    <pointLight position={[3, 3, 4]} intensity={18} color="#aee1ff" distance={10} />
    <pointLight position={[-4, -2, 3]} intensity={9} color="#236387" distance={9} />
    <Float speed={1.4} rotationIntensity={0.24} floatIntensity={.7}><Core /><OrbitPaths /></Float>
    <Sparkles count={210} scale={[9, 7, 3]} size={1.1} speed={0.2} opacity={.52} color="#91cceb" />
    <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
  </Canvas>
}

function MecanumWheel({ progress }: { progress: number }) {
  const wheel = useRef<THREE.Group>(null)
  const rollers = useMemo(() => Array.from({ length: 10 }, (_, i) => i), [])
  useFrame(({ clock }) => {
    if (!wheel.current) return
    wheel.current.rotation.z = progress * Math.PI * 5 + clock.getElapsedTime() * .18
    wheel.current.rotation.y = -0.46 + Math.sin(progress * Math.PI) * .26
  })
  return <group ref={wheel} rotation={[0.35, -0.4, .1]}>
    <mesh><torusGeometry args={[1.18, .19, 22, 72]} /><meshStandardMaterial color="#263b43" metalness={.92} roughness={.25} /></mesh>
    <mesh rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.36,.36,.38,32]} /><meshStandardMaterial color="#84cae7" metalness={.9} roughness={.17} /></mesh>
    {rollers.map((i) => { const a=i/rollers.length*Math.PI*2; return <group key={i} position={[Math.cos(a)*1.19,Math.sin(a)*1.19,0]} rotation={[0,0,a+Math.PI/4]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.11,.11,.44,12]} /><meshStandardMaterial color="#b8dfe9" metalness={.75} roughness={.22}/></mesh></group> })}
  </group>
}

function Tuba({ progress }: { progress: number }) {
  const instrument = useRef<THREE.Group>(null)
  const bellProfile = useMemo(() => [
    new THREE.Vector2(.16,-.45), new THREE.Vector2(.18,.2), new THREE.Vector2(.27,.67), new THREE.Vector2(.48,.96), new THREE.Vector2(.64,1.05), new THREE.Vector2(.67,1.1)
  ], [])
  const pipes = useMemo(() => [
    new THREE.CatmullRomCurve3([new THREE.Vector3(-.34,.25,0),new THREE.Vector3(-.38,-.66,0),new THREE.Vector3(-.38,-1.27,0),new THREE.Vector3(.36,-1.34,0),new THREE.Vector3(.67,-1.05,0),new THREE.Vector3(.67,.65,0),new THREE.Vector3(.45,.87,0)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(.44,.62,.08),new THREE.Vector3(.43,-.82,.08),new THREE.Vector3(.25,-1.04,.08),new THREE.Vector3(-.12,-1.04,.08),new THREE.Vector3(-.26,-.82,.08),new THREE.Vector3(-.26,-.19,.08)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-.05,.38,.11),new THREE.Vector3(.08,.64,.11),new THREE.Vector3(.36,.53,.11),new THREE.Vector3(.36,-.53,.11),new THREE.Vector3(.2,-.72,.11),new THREE.Vector3(-.03,-.72,.11),new THREE.Vector3(-.11,-.54,.11)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(.12,.35,-.11),new THREE.Vector3(.25,.55,-.11),new THREE.Vector3(.5,.45,-.11),new THREE.Vector3(.5,-.26,-.11),new THREE.Vector3(.33,-.43,-.11),new THREE.Vector3(.07,-.43,-.11),new THREE.Vector3(-.02,-.3,-.11)])
  ], [])
  useFrame(({ clock }) => { if (!instrument.current) return; instrument.current.rotation.y = -0.65 + progress*Math.PI*1.58; instrument.current.rotation.z = Math.sin(clock.getElapsedTime()*.45)*.025; instrument.current.position.y=Math.sin(clock.getElapsedTime()*.7)*.045 })
  return <group ref={instrument} rotation={[.04,-.5,0]}>
    <mesh position={[-.36,.25,0]}><latheGeometry args={[bellProfile,56]} /><meshPhysicalMaterial color="#c69743" metalness={1} roughness={.14} clearcoat={1}/></mesh>
    <mesh position={[-.36,1.35,0]}><torusGeometry args={[.65,.045,16,48]} /><meshStandardMaterial color="#f3d489" metalness={1} roughness={.13}/></mesh>
    {pipes.map((pipe,i)=><mesh key={i}><tubeGeometry args={[pipe,110,i === 0 ? .115 : .073,14,false]} /><meshPhysicalMaterial color={i === 0 ? '#bf8d35' : '#d6a850'} metalness={1} roughness={.15} clearcoat={1}/></mesh>)}
    <mesh position={[-.83,.24,.04]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.06,.06,.43,16]}/><meshStandardMaterial color="#dfbd72" metalness={1} roughness={.14}/></mesh>
    {[[-.12,.02],[.08,.02],[.28,.02]].map(([x,y],i)=><group key={i} position={[x,y,.18]}><mesh><cylinderGeometry args={[.095,.095,.36,20]}/><meshPhysicalMaterial color="#d4a34c" metalness={1} roughness={.12}/></mesh><mesh position={[0,.25,0]}><cylinderGeometry args={[.11,.11,.08,20]}/><meshStandardMaterial color="#f2d184" metalness={1} roughness={.12}/></mesh><mesh position={[0,.34,0]}><sphereGeometry args={[.1,16,16]}/><meshStandardMaterial color="#e0b35b" metalness={1} roughness={.14}/></mesh></group>)}
    <mesh position={[.08,-.13,.2]} rotation={[Math.PI/2,0,0]}><boxGeometry args={[.62,.14,.09]}/><meshStandardMaterial color="#c89439" metalness={1} roughness={.16}/></mesh>
    <mesh position={[.13,-.92,.02]} rotation={[0,0,0]}><torusGeometry args={[.27,.055,12,32,Math.PI]} /><meshStandardMaterial color="#e4bc69" metalness={1} roughness={.13}/></mesh>
  </group>
}

export function FeatureScene({ type, progress }: { type: 'wheel' | 'tuba', progress: number }) {
  return <Canvas dpr={[1,1.7]} gl={{antialias:true,alpha:true}}>
    <PerspectiveCamera makeDefault position={[0,0,5]} fov={36}/><ambientLight intensity={.4}/><spotLight position={[4,4,5]} intensity={25} angle={.45} penumbra={1} color={type === 'tuba' ? '#ffd77a' : '#c1efff'}/><pointLight position={[-4,-2,3]} intensity={8} color="#2c8ab3"/>
    <Float speed={1} rotationIntensity={.08} floatIntensity={.25}>{type === 'wheel' ? <MecanumWheel progress={progress}/> : <Tuba progress={progress}/>}</Float>
    <Sparkles count={60} scale={[5,5,2]} size={1.5} speed={.18} opacity={.45} color={type === 'tuba' ? '#efcb78' : '#82d2f4'}/>
  </Canvas>
}
