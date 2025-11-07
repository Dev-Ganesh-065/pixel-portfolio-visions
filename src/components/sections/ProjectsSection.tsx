import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "3D Product Configurator",
    description: "Interactive 3D product visualization with real-time customization options using Three.js and React.",
    tech: ["React", "Three.js", "WebGL"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Immersive Portfolio",
    description: "Award-winning portfolio website featuring scroll-based 3D animations and particle effects.",
    tech: ["GSAP", "Three.js", "ScrollTrigger"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "VR Experience Platform",
    description: "Web-based VR platform for virtual events with spatial audio and multiplayer interactions.",
    tech: ["WebXR", "Node.js", "Socket.io"],
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "AI Art Generator",
    description: "Real-time AI-powered art generation tool with 3D visualization of the creative process.",
    tech: ["TensorFlow.js", "React", "Three.js"],
    gradient: "from-orange-500 to-red-500",
  },
];

export const ProjectsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="projects" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-center gradient-text">
            Featured Projects
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-3d rounded-2xl overflow-hidden group"
              >
                <div className={`h-32 sm:h-40 md:h-48 bg-gradient-to-br ${project.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button variant="default" size="sm" className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                      Code
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
