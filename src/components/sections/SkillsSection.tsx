import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SkillSphere } from "../scenes/SkillSphere";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  // Frontend
  { name: "React", color: "#61dafb", category: "Frontend", orbitRadius: 3, orbitSpeed: 0.3 },
  { name: "Three.js", color: "#00d4ff", category: "Frontend", orbitRadius: 3.5, orbitSpeed: 0.25 },
  { name: "TypeScript", color: "#3178c6", category: "Frontend", orbitRadius: 3.2, orbitSpeed: 0.35 },
  { name: "GSAP", color: "#88ce02", category: "Frontend", orbitRadius: 3.3, orbitSpeed: 0.28 },
  // Backend
  { name: "Node.js", color: "#68a063", category: "Backend", orbitRadius: 4, orbitSpeed: -0.2 },
  { name: "GraphQL", color: "#e535ab", category: "Backend", orbitRadius: 4.2, orbitSpeed: -0.22 },
  // Tools
  { name: "WebGL", color: "#a855f7", category: "Tools", orbitRadius: 2.5, orbitSpeed: 0.4 },
  { name: "Git", color: "#f05032", category: "Tools", orbitRadius: 2.8, orbitSpeed: 0.38 },
];

export const SkillsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-6xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center gradient-text">
            Skills & Technologies
          </h2>
          <p className="text-center text-foreground/70 mb-12 text-lg">
            Hover over skills to learn more • Drag to explore the galaxy
          </p>

          <div className="h-[700px] card-3d rounded-2xl overflow-hidden relative">
            <Canvas camera={{ position: [0, 2, 10], fov: 75 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
              <spotLight
                position={[0, 10, 0]}
                angle={0.5}
                penumbra={1}
                intensity={0.5}
                color="#00d4ff"
              />
              
              {/* Central core */}
              <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                  color="#00d4ff"
                  emissive="#00d4ff"
                  emissiveIntensity={1}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>

              {/* Orbiting skills */}
              {skills.map((skill, index) => (
                <SkillSphere
                  key={skill.name}
                  skill={skill.name}
                  position={[index * 0.5, 0, 0]}
                  color={skill.color}
                  orbitRadius={skill.orbitRadius}
                  orbitSpeed={skill.orbitSpeed}
                  category={skill.category}
                />
              ))}
              
              <OrbitControls 
                enableZoom={true}
                minDistance={5}
                maxDistance={15}
                autoRotate 
                autoRotateSpeed={0.5}
                enablePan={false}
              />
            </Canvas>
            
            {/* Category legend */}
            <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4">
              <h3 className="text-sm font-bold mb-2 text-foreground">Categories</h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#61dafb]"></div>
                  <span className="text-foreground/70">Frontend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#68a063]"></div>
                  <span className="text-foreground/70">Backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#a855f7]"></div>
                  <span className="text-foreground/70">Tools</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
