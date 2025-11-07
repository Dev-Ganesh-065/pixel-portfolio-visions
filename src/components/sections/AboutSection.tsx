import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const AboutSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 gradient-text text-center sm:text-left">
          About Me
        </h2>
        
        <div className="card-3d p-6 sm:p-8 md:p-12 rounded-2xl">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-4 sm:mb-6">
            I'm a passionate developer specializing in creating stunning 3D web experiences. 
            With expertise in modern JavaScript frameworks and Three.js, I transform ideas into 
            interactive digital realities.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed">
            My journey in web development started with a fascination for creative coding and has 
            evolved into building immersive experiences that push the boundaries of what's possible 
            on the web. I love combining technical excellence with artistic vision to create 
            memorable digital experiences.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {[
              { label: "Projects", value: "50+" },
              { label: "Experience", value: "5+ Years" },
              { label: "Technologies", value: "20+" },
              { label: "Happy Clients", value: "30+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 sm:p-4 rounded-lg bg-background/30">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-foreground/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
