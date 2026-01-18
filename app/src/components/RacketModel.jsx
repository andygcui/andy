import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

function Racket() {
  const { scene } = useGLTF('/racket.glb')
  const meshRef = useRef()

  // Rotate the racket slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return <primitive object={scene} ref={meshRef} scale={1} />
}

function RacketModel() {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Racket />
        <OrbitControls enableZoom={true} enablePan={false} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}

export default RacketModel
