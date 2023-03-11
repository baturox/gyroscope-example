import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { getGyroscope, sendPermission } from './gyro';

function Box(props) {
  const ref = useRef();
  useFrame((state, delta) => {
    setInterval(() => {
      const gyroscope = getGyroscope();
      ref.current.position.x = gyroscope.x / 1000;
      ref.current.position.y = gyroscope.y / 1000;
      ref.current.position.z = gyroscope.z / 1000;
    }, 100);
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
  const [start, setStart] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  setInterval(() => {
    const gyroscope = getGyroscope();
    setX(gyroscope.x);
    setY(gyroscope.y);
    setZ(gyroscope.z);
  }, 100);

  return (
    <div>
      {!start && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <button
            style={{ width: '100%', height: 50 }}
            onClick={() => {
              sendPermission().then(response => {
                console.log('permission: ' + response);
                if (response) {
                  setStart(true);
                }
              });
            }}>
            Start
          </button>
        </div>)}
      {start && (
        <>
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
        </>)}
    </div>
  )
}