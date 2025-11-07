import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FloatingGeometry } from "../scenes/FloatingGeometry";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* 3D Background - Hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <FloatingGeometry />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Gradient Background for mobile */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Available for freelance work</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 glow-text tracking-tight leading-tight">
            JOHN DOE
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-6 sm:mb-8 gradient-text px-4">
            Full Stack Developer & Designer
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            Building modern web applications with clean code and beautiful interfaces
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform glow-box text-sm sm:text-base"
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:scale-105 transition-transform backdrop-blur-sm text-sm sm:text-base"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-sm text-foreground/60 group-hover:text-primary transition-colors">Scroll to explore</span>
        <ArrowDown className="w-6 h-6 animate-bounce text-primary" />
      </motion.button>
    </section>
  );
};
