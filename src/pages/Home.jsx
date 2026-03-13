import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, FolderCode, GraduationCap, ChevronRight, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';

const Home = () => {
  const { personalInfo, stats } = portfolioData;
  const startTour = useStore(state => state.startTour);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 md:pt-32 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <motion.div
        data-tour="hero-intro"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto text-center"
      >
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
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full px-4 relative"
      >
        <div className="relative group/btn">
          {/* Animated Call-to-Action Badge */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: [-10, 0, -10] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg z-20 pointer-events-none"
          >
            Click to start AI tour
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
          </motion.div>

          {/* Pulse Effect Background */}
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse group-hover/btn:scale-110 transition-transform" />

          <button
            onClick={startTour}
            className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary text-white font-black text-[15px] sm:text-[17px] tracking-wide px-8 sm:px-12 py-5 sm:py-6 flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Navigation size={22} className="relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10 uppercase tracking-widest">Start Guided Tour</span>
          </button>
        </div>

        <Link
          to="/portfolio"
          className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 rounded-full border-2 border-border text-foreground font-black text-[15px] sm:text-[17px] uppercase tracking-widest hover:border-primary hover:bg-primary/5 transition-all text-center flex items-center justify-center gap-3 group"
        >
          <span>View Work</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        data-tour="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-20 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl opacity-80"
      >
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
      </motion.div>

      {/* Feature Intro */}
      <section className="mt-20 max-w-4xl mx-auto bg-gradient-to-br from-secondary/50 to-background p-12 rounded-[3rem] border border-border text-center relative overflow-hidden">
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
