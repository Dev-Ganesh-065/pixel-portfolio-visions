import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FloatingGeometry } from "../scenes/FloatingGeometry";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <FloatingGeometry />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 glow-text">
            JOHN DOE
          </h1>
          <h2 className="text-2xl md:text-4xl font-light mb-8 gradient-text">
            Creative Developer & 3D Enthusiast
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12">
            Crafting immersive digital experiences with modern web technologies and 3D graphics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-8 h-8 animate-bounce text-primary" />
        </motion.div>
      </div>
    </section>
  );
};
