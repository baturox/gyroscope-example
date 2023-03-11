import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import getGyroscope from 'reactjs-gyroscope';

function Box(props) {
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
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  setInterval(() => {
    const gyroscope = getGyroscope();
    setX(gyroscope.x);
    setY(gyroscope.y);
    setZ(gyroscope.z);
  }, 1000);

  return (
    <div>
      <ul>
        <li>x: {x}</li>
        <li>y: {y}</li>
        <li>z: {z}</li>
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100vh' }}>

        <Canvas>
          <Box position={[0.1, 0, 0]} />
        </Canvas>
      </div>
    </div>
  )
}