import { portfolioData } from '../data/portfolioData';
import { User, MapPin, Mail, Phone, Globe, Code2, Database, LayoutPanelTop, Sparkles, Cpu, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const { personalInfo, skills } = portfolioData;

  return (
    <div className="space-y-20 py-10 max-w-6xl mx-auto">
      <div className="space-y-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-6xl font-black tracking-tight"
        >
          Beyond the <span className="text-primary">Pixels</span>
        </motion.h1>
        <p className="text-muted-foreground text-xl max-w-2xl font-medium leading-relaxed">
          I bridge the gap between human needs and technical capabilities, creating digital solutions that are as intuitive as they are powerful.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Personal Story & Details */}
        <div className="lg:col-span-7 space-y-12">
          <section data-tour="about-identity" className="p-8 bg-card border border-border rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
               <User size={120} />
            </div>
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles size={20} />
               </div>
               Identity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <DetailBox label="Full Name" value={personalInfo.name} />
              <DetailBox label="Experience" value="2+ Years Productive" />
              <DetailBox label="Notice Period" value="15 to 30 Days" icon={<Calendar size={14} className="text-primary" />} />
              <DetailBox label="Based In" value={personalInfo.address} icon={<MapPin size={14} className="text-primary" />} />
            </div>
          </section>

          <section className="p-8 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-[2.5rem] shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 italic">
               Let's Connect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <ContactItem icon={<Mail size={20} />} label="Professional Email" value={personalInfo.email} />
               <ContactItem icon={<Phone size={20} />} label="Direct Line" value={personalInfo.phone} />
            </div>
          </section>
        </div>

        {/* Right Column: Skills Grid */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-6" data-tour="about-skills">
            <h2 className="text-2xl font-black flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                  <Cpu size={22} />
               </div>
               Skill Stack
            </h2>
            
            <div className="space-y-8">
              <SkillCategory 
                title="Frontend Mastery" 
                icon={<Code2 size={18} className="text-indigo-500" />} 
                skills={skills.frontend} 
                accent="indigo"
              />
              <SkillCategory 
                title="Backend & Infrastructure" 
                icon={<Database size={18} className="text-cyan-500" />} 
                skills={skills.backend} 
                accent="cyan"
              />
              <SkillCategory 
                title="System Design & UI" 
                icon={<LayoutPanelTop size={18} className="text-violet-500" />} 
                skills={skills.uiLibraries} 
                accent="violet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailBox = ({ label, value, icon }) => (
  <div className="space-y-1 relative z-10">
    <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em]">{label}</p>
    <p className="text-xl font-bold flex items-center gap-2">{icon}{value}</p>
  </div>
);

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10 transition-transform hover:scale-[1.02]">
    <div className="p-2 bg-white/20 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-0.5">{label}</p>
      <p className="text-sm font-bold truncate">{value}</p>
    </div>
  </div>
);

const SkillCategory = ({ title, icon, skills, accent }) => {
  const accentColors = {
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
        {icon} {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <motion.span 
            key={skill} 
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-colors cursor-default ${accentColors[accent] || "bg-secondary text-secondary-foreground border-border"}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default About;
