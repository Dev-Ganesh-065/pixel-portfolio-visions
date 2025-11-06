import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:hello@example.com", color: "text-cyan-400" },
  { icon: Github, label: "GitHub", href: "https://github.com", color: "text-purple-400" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "text-blue-400" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "text-sky-400" },
];

export const ContactSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-4xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center gradient-text">
            Let's Connect
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-3d p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50 border-border"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 border-border"
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background/50 border-border resize-none"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="card-3d p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Connect With Me</h3>
                <p className="text-foreground/70 mb-6">
                  Feel free to reach out through any of these platforms. I'm always open to 
                  discussing new projects and opportunities.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-background/30 rounded-lg hover:bg-background/50 transition-colors group"
                    >
                      <social.icon className={`w-5 h-5 ${social.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="card-3d p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-2">Available for Work</h3>
                <p className="text-foreground/70 text-sm">
                  Currently open to freelance projects and full-time opportunities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
