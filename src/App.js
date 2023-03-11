import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { getGyroscope, gyroscopePermission } from 'reactjs-gyroscope';

function Box(props) {
  const ref = useRef();
  useFrame((state, delta) => {
    const velocity = 0.01;
    getGyroscope((event) => {
      ref.current.position.x = event.alpha * velocity;
      ref.current.position.y = event.beta * velocity;
      ref.current.position.z = event.gamma * velocity;
    });
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

  useEffect(() => {
    getGyroscope((event) => {
      setX(event.alpha);
      setY(event.beta);
      setZ(event.gamma);
    });
  }, [start])

  return (
    <div>
      {!start && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <button
            style={{ width: '100%', height: 50 }}
            onClick={() => {
              gyroscopePermission().then(response => {
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