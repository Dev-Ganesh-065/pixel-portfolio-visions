import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Ring } from "@react-three/drei";
import * as THREE from "three";

export const FloatingGeometry = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);

  // Generate particle positions once - reduced for performance
  const particlePositions = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      speed: Math.random() * 0.4 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Cinematic camera orbit
    state.camera.position.x = Math.sin(time * 0.1) * 0.5;
    state.camera.position.y = Math.cos(time * 0.15) * 0.3;
    state.camera.lookAt(0, 0, 0);

    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.15;
      sphereRef.current.rotation.y = time * 0.2;
      sphereRef.current.position.y = Math.sin(time * 0.5) * 0.4;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.z = time * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.2;
      ringRef.current.rotation.z = time * 0.1;
    }

    // Animate particles with flowing motion
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const data = particlePositions[i];
        particle.position.y += Math.sin(time * data.speed + data.offset) * 0.002;
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
      });
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, 5, 5]} intensity={1} color="#00d4ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#00d4ff"
      />

      {/* Main distorted sphere */}
      <Sphere ref={sphereRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#00d4ff"
          emissiveIntensity={0.4}
        />
      </Sphere>

      {/* Orbiting torus */}
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.2, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          roughness={0.2}
          metalness={0.9}
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Additional ring */}
      <Ring ref={ringRef} args={[1.8, 2, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00d4ff"
          roughness={0.3}
          metalness={0.8}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Enhanced particle field */}
      <group ref={particlesRef}>
        {particlePositions.map((data, i) => (
          <mesh key={i} position={data.position}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#a855f7" : "#00ffff"}
              emissive={i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#a855f7" : "#00ffff"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Ambient glow spheres */}
      <mesh position={[-3, 2, -2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[3, -2, -2]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
};
