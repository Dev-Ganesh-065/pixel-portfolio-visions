import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface SkillSphereProps {
  skill: string;
  position: [number, number, number];
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  category: string;
}

export const SkillSphere = ({ skill, position, color, orbitRadius, orbitSpeed, category }: SkillSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Orbital motion around center
      const angle = time * orbitSpeed + position[0];
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.3;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = time * 0.3;
      
      // Hover scale effect
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={hovered ? 1 : 0.4}
          transparent
          opacity={hovered ? 1 : 0.9}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh scale={hovered ? 1.5 : 1.2}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <Text
        position={[0, 0, 0.7]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill}
      </Text>

      {/* Tooltip on hover */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 1, 0]}>
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg pointer-events-none">
            <p className="text-sm font-bold text-foreground">{skill}</p>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </Html>
      )}
    </group>
  );
};
