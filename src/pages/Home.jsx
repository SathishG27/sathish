import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, FolderCode, GraduationCap, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { personalInfo, stats } = portfolioData;

  return (
    <div className="space-y-24 py-10 relative overflow-hidden">
      {/* Background Orbs for better aesthetic */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-border shadow-sm mb-4"
        >
          <Sparkles size={16} className="text-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Open for opportunities</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.9]">
            I'm <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{personalInfo.name}</span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Crafting the future as a <span className="text-foreground">Digital Transformation Engineer</span> with intelligent, human-centric web solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-5 pt-4"
        >
          <Link
            to="/portfolio"
            className="group bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
          >
            Explore Projects <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/resume"
            className="border-2 border-border bg-background/50 backdrop-blur-sm px-10 py-4 rounded-full font-bold hover:bg-secondary transition-all hover:border-primary/50"
          >
            View Experience
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { icon: <Briefcase size={28} />, value: stats.experience, label: "Professional Experience", color: "from-indigo-500 to-indigo-600" },
          { icon: <FolderCode size={28} />, value: stats.projects, label: "Completed Projects", color: "from-cyan-500 to-cyan-600" },
          { icon: <GraduationCap size={28} />, value: "8.07", label: "B.E ECE CGPA", color: "from-violet-500 to-violet-600" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 bg-card border border-border rounded-[2.5rem] text-center space-y-4 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-500">
               {stat.icon}
             </div>
             <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} text-white rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
               {stat.icon}
             </div>
             <div className="space-y-1">
               <h3 className="text-4xl font-black tracking-tight">{stat.value}</h3>
               <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
             </div>
          </motion.div>
        ))}
      </section>

      {/* Feature Intro */}
      <section className="max-w-4xl mx-auto bg-gradient-to-br from-secondary/50 to-background p-12 rounded-[3rem] border border-border text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-500 to-primary" />
        <h2 className="text-4xl font-black mb-6">Innovative Problem Solving</h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
          Based in Chennai, I thrive at the intersection of business strategy and technical execution. 
          As an engineer at <span className="text-primary font-bold">Ideassion Technology Solutions</span>, 
          I leverage React, Next.js, Angular, and Spring Boot to build products that don't just work—they inspire.
        </p>
      </section>
    </div>
  );
};

export default Home;
