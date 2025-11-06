import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SkillSphere } from "../scenes/SkillSphere";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "React", color: "#61dafb", position: [-3, 1, 0] as [number, number, number] },
  { name: "Three.js", color: "#00d4ff", position: [0, 1, 2] as [number, number, number] },
  { name: "TypeScript", color: "#3178c6", position: [3, 1, 0] as [number, number, number] },
  { name: "Node.js", color: "#68a063", position: [-2, -1, -1] as [number, number, number] },
  { name: "WebGL", color: "#a855f7", position: [2, -1, -1] as [number, number, number] },
  { name: "GSAP", color: "#88ce02", position: [0, -1, 1] as [number, number, number] },
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
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center gradient-text">
            Skills & Technologies
          </h2>

          <div className="h-[600px] card-3d rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
              
              {skills.map((skill) => (
                <SkillSphere
                  key={skill.name}
                  skill={skill.name}
                  position={skill.position}
                  color={skill.color}
                />
              ))}
              
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </div>

          <p className="text-center text-foreground/60 mt-6 text-lg">
            Drag to rotate • Scroll to explore
          </p>
        </motion.div>
      </div>
    </section>
  );
};
