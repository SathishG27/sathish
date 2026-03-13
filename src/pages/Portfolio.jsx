import { portfolioData } from '../data/portfolioData';
import { ExternalLink, Github, Layers, Sparkles, Layout, Globe, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const { projects } = portfolioData;

  return (
    <div className="space-y-24 py-10">
      <div className="space-y-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-cyan-600 font-bold text-sm tracking-widest uppercase"
        >
          <Layout size={16} /> Engineering Showcase
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Selected <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Works</span></h1>
        <p className="text-muted-foreground font-medium text-xl leading-relaxed">
          A collection of digital products I've engineered, ranging from enterprise-level platforms to innovative personal experiments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10" data-tour="portfolio-projects">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative flex flex-col bg-card border border-border rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-primary/20"
          >
            {/* Project Header/Image Placeholder */}
            <div className="h-64 bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
              <Layers className="text-primary/10 w-40 h-40 absolute transition-transform group-hover:scale-125 duration-700" />
              
              {/* Badge for project type */}
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-background/80 backdrop-blur-md rounded-full border border-border shadow-sm flex items-center gap-2 z-10">
                {project.client.includes('Personal') ? <UserSize size={12} className="text-cyan-600" /> : <Globe size={12} className="text-indigo-600" />}
                <span className="text-[10px] font-black uppercase tracking-widest">{project.client}</span>
              </div>
            </div>

            <div className="p-10 flex-1 flex flex-col space-y-6 relative">
              <div className="space-y-2">
                <h3 className="text-3xl font-black tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 bg-secondary text-primary rounded-lg border border-primary/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex items-center gap-6 pt-6 mt-auto border-t border-border">
                {project.preview && (
                  <a 
                    href={project.preview} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:opacity-70 transition-opacity"
                  >
                    <ExternalLink size={18} /> Visit Project
                  </a>
                )}
                <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={18} /> Deep Dive
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section data-tour="portfolio-contact" className="bg-gradient-to-br from-primary to-indigo-700 rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <Sparkles size={160} />
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Got a visionary project in mind?</h2>
          <p className="text-indigo-50 leading-relaxed max-w-2xl mx-auto font-medium text-lg">
            I'm currently accepting new projects and consulting roles. Use the AI guide in the corner to learn more about my specific technical workflows.
          </p>
          <button className="bg-white text-primary px-12 py-5 rounded-[2rem] font-black text-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
};

// Helper for icon
const UserSize = ({ size, className }) => <Sparkles size={size} className={className} />;

export default Portfolio;
