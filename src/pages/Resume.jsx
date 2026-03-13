import { portfolioData } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, Download, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import resumePdf from '../data/resume.pdf';

const Resume = () => {
  const { experience, education } = portfolioData;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.target = '_blank';
    link.download = 'Sathish_G_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-24 py-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-border pb-12 px-4 sm:px-0">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-primary font-bold text-[10px] sm:text-sm tracking-widest uppercase"
          >
            <Zap size={14} className="sm:w-4 sm:h-4" /> Career Trajectory
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter">My <span className="text-primary">Journey</span></h1>
          <p className="text-muted-foreground font-medium text-base sm:text-lg max-w-xl">
            A chronological look at my professional evolution and academic foundations.
          </p>
        </div>
        <motion.button 
          data-tour="resume-download"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl sm:rounded-[1.5rem] font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
          onClick={handleDownload}
        >
          <Download size={20} /> Download Full CV
        </motion.button>
      </div>

      {/* Experience Timeline */}
      <section className="space-y-12" data-tour="resume-experience">
        <h2 className="text-3xl font-black flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl text-white flex items-center justify-center shadow-lg">
            <Briefcase size={24} />
          </div>
          Professional Experience
        </h2>

        <div className="space-y-12 relative before:absolute before:left-[23px] before:top-4 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-indigo-500/50 before:to-transparent">
          {experience.map((exp, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-16 group"
            >
              <div className="absolute left-0 top-1 w-12 h-12 bg-background border-4 border-indigo-500 rounded-2xl flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
              </div>
              
              <div className="space-y-4 p-8 bg-card border border-border rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-indigo-500/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">{exp.role}</h3>
                    <p className="text-lg font-bold text-indigo-500 dark:text-indigo-400">{exp.company}</p>
                  </div>
                  <span className="text-[11px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
                <div className="flex items-center gap-2 pt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                   <div className="w-2 h-2 rounded-full bg-indigo-500" />
                   <p className="text-[10px] font-black uppercase tracking-[0.3em]">Full-Time</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Timeline */}
      <section className="space-y-12 pt-12 border-t border-border">
        <h2 className="text-3xl font-black flex items-center gap-4">
           <div className="w-12 h-12 bg-cyan-500 rounded-2xl text-white flex items-center justify-center shadow-lg">
            <GraduationCap size={24} />
          </div>
          Education
        </h2>

        <div className="space-y-12 relative before:absolute before:left-[23px] before:top-4 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-cyan-500/50 before:to-transparent">
          {education.map((edu, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-16 group"
            >
              <div className="absolute left-0 top-1 w-12 h-12 bg-background border-4 border-cyan-500 rounded-2xl flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <div className="w-3 h-3 bg-cyan-500 rounded-full" />
              </div>
              
              <div className="space-y-4 p-8 bg-card border border-border rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-cyan-500/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">{edu.degree}</h3>
                    <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{edu.institution}</p>
                  </div>
                  <span className="text-[11px] font-black text-cyan-600 uppercase tracking-widest bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20 whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
                <div className="flex items-center gap-4 pt-2">
                   <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-2xl border border-border">
                      <Award size={16} className="text-cyan-600" />
                      <span className="text-sm font-black">CGPA: {edu.cgpa}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resume;
