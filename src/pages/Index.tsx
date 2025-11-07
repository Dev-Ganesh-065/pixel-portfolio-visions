import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="relative">
      <Navigation />
      <main className="scroll-smooth">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="py-6 sm:py-8 text-center text-foreground/60 border-t border-border px-4">
        <p className="text-xs sm:text-sm">&copy; 2025 John Doe. Built with React, Three.js & ❤️</p>
      </footer>
    </div>
  );
};

export default Index;
