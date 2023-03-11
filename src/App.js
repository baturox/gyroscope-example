import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import getGyroscope from 'reactjs-gyroscope';

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  useFrame((state, delta) => {
    setInterval(() => {
      const gyroscope = getGyroscope();
      console.log(gyroscope.x);
      console.log(ref);

      ref.current.position.x = gyroscope.x / 90;
      ref.current.position.y = gyroscope.y / 90;
      ref.current.position.z = gyroscope.z / 90;
    }, 1000);
  })

  // Subscribe this component to the render-loop, rotate the mesh every frame

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100vh' }}>
      <Canvas>
        <Box position={[0.1, 0, 0]} />
      </Canvas>
    </div>
  )
}