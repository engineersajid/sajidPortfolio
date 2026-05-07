/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Terminal, 
  Layers, 
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Command,
  Activity,
  Globe,
  Youtube,
  Facebook,
  GraduationCap,
  Play
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, RESEARCH_PAPERS, SKILLS } from './constants';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-blue pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{ 
        x: position.x - 16, 
        y: position.y - 16,
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['projects', 'research', 'experience', 'contact'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all ${isScrolled ? 'bg-black/50 backdrop-blur-2xl rounded-full border border-white/10 px-8 py-3' : ''}`}>
        <motion.a 
          href="#"
          className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <Command size={22} className="text-white" />
          </div>
          <span className="hidden sm:inline">SAJID<span className="text-brand-blue">.</span></span>
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link}`} 
              className="text-sm font-medium text-white/50 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1 group"
            >
              <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">/</span> {link}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-white text-black font-bold text-xs rounded-full hover:bg-brand-blue hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            GET IN TOUCH
          </a>
        </div>

        <button className="md:hidden p-2 text-white/70" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-bg/95 backdrop-blur-3xl z-40 flex flex-col justify-center items-center gap-10 md:hidden"
          >
            {links.map((link) => (
              <a 
                key={link} 
                href={`#${link}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display font-bold hover:text-brand-blue transition-colors"
              >
                {link.toUpperCase()}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-brand-blue min-w-[200px] inline-block">
      {words[index].substring(0, subIndex)}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block w-1 h-8 bg-brand-blue align-middle"
      />
    </span>
  );
};

const AnimatedCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">
        {count.toFixed(2)}{suffix}
      </div>
      <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">{label}</div>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-20 mask-fade-bottom">
           <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=100&w=2000" 
            alt="AI Concept" 
            className="w-full h-full object-cover animate-slow-zoom"
           />
        </div>
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-blue/20 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-accent/10 blur-[140px] rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2"
        >
          <Sparkles size={14} className="text-brand-blue" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">SAJID // AI RESEARCHER & FULL-STACK DEV</span>
        </motion.div>

        <motion.h1 
          className="text-[10vw] sm:text-[8vw] font-bold leading-[0.85] mb-12 select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <span className="text-gradient block uppercase">Building the Future</span>
          <span className="text-[6vw] italic text-white/20 block transform translate-x-[2vw]">THROUGH AI & <span className="text-brand-accent not-italic">CODE</span></span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl mt-8">
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-2xl md:text-3xl font-light text-white/60 leading-tight mb-6 h-[2.5em] flex items-center">
              Crafting <Typewriter words={['Intelligent Systems', 'Flutter Apps', 'MERN Solutions', 'Computer Vision']} />
            </div>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-6">
              I am a <span className="text-white font-bold">high-achieving CSE student at BUBT</span> with a <span className="text-brand-blue font-bold">CGPA of 3.92</span>. As an AI Researcher and Software Engineer, I bridge the gap between complex machine learning and user-centric applications, specializing in building intelligent systems for real-world challenges.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Computer Vision', 'Mobile Dev', 'Deep Learning'].map(tag => (
                <span key={tag} className="text-[10px] font-mono border border-white/10 px-3 py-1 rounded-full text-white/30 uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-10 items-center md:items-end w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex gap-16 mb-4">
              <AnimatedCounter value={3.92} label="Academic CGPA" />
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-accent mb-2">98%+</div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Project Accuracy</div>
              </div>
            </div>
            
            <div className="flex gap-6 items-center">
              <div className="flex gap-4">
                <a href={PERSONAL_INFO.socials.github} target="_blank" rel="no-referrer" className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all group overflow-hidden relative">
                  <Github size={24} className="relative z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-0 bg-brand-blue group-hover:h-full transition-all duration-300" />
                </a>
              </div>
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6,182,212,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-brand-blue text-white rounded-3xl font-bold text-xl flex items-center gap-4 relative overflow-hidden group shadow-2xl"
              >
                <span className="relative z-10 uppercase tracking-widest">Let's Connect</span>
                <ArrowUpRight size={24} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-brand-blue to-transparent" />
        <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">SCROLL</span>
      </motion.div>
    </section>
  );
};

const BentoSkills = () => {
  return (
    <section id="skills" className="py-32 bg-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-brand-blue tracking-[0.3em] uppercase mb-4">/ CAPABILITIES</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">TECHNICAL <br /> <span className="text-white/30 italic">EXCELLENCE</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* AI Research Block */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-2 md:row-span-2 glass-card p-10 rounded-[3rem] group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
              <Cpu size={200} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <Activity size={32} className="text-brand-blue mb-8" />
                <h4 className="text-4xl font-bold text-white">AI Research</h4>
                <p className="text-lg text-white/50 leading-relaxed max-w-xs mb-8">
                  Specializing in Deep Learning, Federated Learning, and YOLO architectures for agricultural/medical computer vision.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.ai.map(s => <span key={s} className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-sm text-white/70">{s}</span>)}
              </div>
            </div>
          </motion.div>

          {/* Mobile Focus */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-2 glass-card p-10 rounded-[3rem] flex flex-col justify-between bg-brand-blue/5 border-brand-blue/20"
          >
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-2xl font-bold text-white">Mobile Engineering</h4>
              <Code2 size={24} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-3">
              {SKILLS.mobile.map(s => <span key={s} className="text-brand-accent font-mono text-xs px-3 py-1 border border-brand-accent/30 rounded-full">{s}</span>)}
            </div>
          </motion.div>

          {/* Web Ecosystem */}
          <motion.div 
            whileHover={{ y: -10 }} 
            className="glass-card p-8 rounded-[2.5rem]"
          >
            <h4 className="font-bold mb-4 flex items-center gap-2 text-white">
              <Globe size={18} className="text-brand-blue" />
              Full-Stack Web
            </h4>
            <div className="space-y-2">
              {SKILLS.web.map(t => (
                <div key={t} className="flex justify-between items-center text-sm text-white/50 group">
                  <span>{t}</span>
                  <div className="w-1 h-1 bg-brand-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cyber Security */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent"
          >
            <h4 className="font-bold mb-4 flex items-center gap-2 text-white">
              <Terminal size={18} className="text-white/40" />
              Cyber Security
            </h4>
            <ul className="text-sm space-y-2 text-white/60">
              {SKILLS.cyber.map(b => (
                <li key={b} className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: any;
  idx: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      className="group"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] mb-8 bg-surface shadow-2xl transition-all duration-500 hover:shadow-brand-blue/20">
        <div className="absolute inset-0 bg-white/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-90 z-20" />
        
        <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end z-30">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string) => (
              <span key={t} className="px-4 py-1.5 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-full text-[10px] font-mono tracking-wider text-white/80 uppercase">
                {t}
              </span>
            ))}
          </div>
          <h4 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white group-hover:text-brand-blue transition-colors duration-500">
            {project.title}
          </h4>
          <p className="text-lg text-white/50 max-w-xl group-hover:text-white/80 transition-colors duration-500 delay-75">
            {project.description}
          </p>
          
          <div className="mt-8 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-150">
            <a href={project.github} className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-white hover:text-black transition-all font-bold">
              <Github size={18} /> Source
            </a>
            <a href={project.link} className="bg-brand-blue px-8 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-brand-accent hover:scale-105 transition-all font-bold shadow-lg shadow-brand-blue/20">
              Live Preview <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-sm font-mono text-brand-blue tracking-[0.3em] uppercase mb-4">/ PORTFOLIO</h2>
            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter">IMPACT <br /> <span className="text-white/30 italic">SOLUTIONS</span></h3>
          </div>
          <div className="flex items-center gap-8 text-white/30">
            <div className="h-px w-24 bg-white/20" />
            <span className="text-xs font-mono uppercase tracking-[0.5em] animate-pulse">Scroll to navigate</span>
          </div>
        </div>

        <div className="space-y-32">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ResearchLab = () => {
  return (
    <section id="research" className="py-32 bg-surface/30 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="sticky top-32">
            <h2 className="text-6xl font-bold tracking-tighter mb-8 italic text-white">RESEARCH <br /> <span className="text-white/40 not-italic">LAB</span></h2>
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Deep-diving into <span className="text-white">Computer Vision</span> and <span className="text-brand-blue">Explainable AI (XAI)</span>. My work on MangoFusionNet pushes accuracy to 98.33%.
            </p>
            <div className="p-8 glass-card rounded-[2.5rem] bg-brand-blue/5">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={24} className="text-brand-blue" />
                <span className="font-bold text-white">Publications</span>
              </div>
              <div className="text-4xl font-bold text-white mb-2 underline decoration-brand-blue">Elsevier</div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/40">Data in Brief (Vol 59, 2025)</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-8">
          {RESEARCH_PAPERS.map((paper, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-12 rounded-[3.5rem] hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="px-3 py-1 rounded-md bg-brand-blue/20 text-brand-blue text-[10px] font-mono tracking-widest uppercase">
                   {paper.date}
                </div>
                <div className="w-12 h-px bg-white/10" />
              </div>
              <h4 className="text-3xl font-bold mb-6 group-hover:text-brand-blue transition-colors text-white">{paper.title}</h4>
              <p className="text-white/40 mb-10 leading-relaxed italic border-l-2 border-brand-blue/40 pl-6">
                "{paper.abstract}"
              </p>
              <div className="flex flex-wrap gap-6">
                <a href={paper.links.paper} target="_blank" rel="no-referrer" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase group-hover:gap-4 transition-all text-white">
                  Access Paper <ArrowUpRight size={18} className="text-brand-blue" />
                </a>
              </div>
            </motion.div>
          ))}
          
          {/* Technical Terminal Snippet */}
          <div className="glass-card p-10 rounded-[3rem] bg-[#0c0c0c] font-mono text-sm border-white/5 opacity-80">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <div className="text-green-500/50">sajid@bubt:~ $ python run_inference.py --model MangoFusionNet</div>
            <div className="text-white/40 mt-2">
              [SYSTEM] Model Loaded: AI_BUBT_V1 <br />
              [INFERENCE] Accuracy: 98.33% <br />
              [XAI] Generative Mapping... Completed. <br />
              [STATUS] Classification: "Harivanga" (Confirmed)
            </div>
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-brand-blue inline-block mt-2" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const YouTubeSection = () => {
  const [liveSubs, setLiveSubs] = useState(PERSONAL_INFO.youtube?.subscribers || 56214);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSubs(prev => prev + Math.floor(Math.random() * 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-red-500 mb-6">
            <Youtube size={24} />
            <span className="font-mono text-xs tracking-[0.3em] uppercase">Content Creation</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 italic text-white underline decoration-red-600 decoration-8 underline-offset-8">EXPLORER <br /> <span className="text-white/30 not-italic">MOTIVATION</span></h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            "{PERSONAL_INFO.youtube?.tagline}" — A platform dedicated to human growth through 
            <span className="text-white"> powerful speeches, life solutions, and inspiring biographies.</span>
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            {PERSONAL_INFO.youtube?.topics.map(topic => (
              <span key={topic} className="px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-xs font-bold text-red-400 uppercase tracking-widest">{topic}</span>
            ))}
          </div>

          <a 
            href="https://www.youtube.com/@ExplorerMotivation?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-red-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-red-700 transition-all hover:scale-105 group shadow-[0_10px_30px_rgba(220,38,38,0.3)] z-10 relative"
          >
            CONFIRM SUBSCRIPTION <Play size={20} className="fill-current group-hover:scale-125 transition-transform" />
          </a>
        </motion.div>

        <div className="relative">
          <div className="glass-card p-2 rounded-[3rem] overflow-hidden group">
             <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-black">
                {!isPlaying ? (
                  <>
                    <img 
                      src="https://img.youtube.com/vi/_rievQkvZzk/maxresdefault.jpg" 
                      alt="YouTube Thumbnail" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <button 
                        onClick={() => setIsPlaying(true)}
                        className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group cursor-pointer"
                       >
                          <Play size={44} className="fill-white text-white ml-2" />
                       </button>
                    </div>
                  </>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/_rievQkvZzk?autoplay=1" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
             </div>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="absolute -bottom-10 -right-5 md:-right-10 glass-card p-8 rounded-[2rem] bg-white text-black shadow-2xl min-w-[220px] pointer-events-none"
          >
            <div className="text-[10px] font-mono text-black/50 uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" /> Real-time Audience
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold font-display text-red-600 mb-1 leading-none">
                {(liveSubs / 1000).toFixed(1)}K
              </div>
              <div className="text-[10px] font-mono text-black/40 uppercase tracking-[0.2em] font-bold">Subscribers on Air</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-40 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 bg-brand-blue rounded-full blur-[60px] absolute pointer-events-none"
          />
          <h2 className="text-[12vw] font-bold tracking-tighter leading-none mb-12 select-none text-gradient opacity-20">
            LET'S <span className="italic">EVOLVE</span>
          </h2>
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white line-clamp-2">Ready to scale your vision?</h3>
            <p className="text-xl text-white/50 mb-12 leading-relaxed">
              Whether you need an <span className="text-white">AI-first mobile app</span> or a <span className="text-brand-blue">research collaborator</span> for advanced modeling, I'm just an email away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-12 py-8 bg-white text-black text-2xl font-bold rounded-[2rem] hover:bg-brand-blue hover:text-white transition-all inline-flex items-center gap-4 group"
              >
                HIRE SAJID <Mail size={32} className="group-hover:rotate-12 transition-transform" />
              </a>
              <a 
                href={PERSONAL_INFO.youtube?.link}
                target="_blank"
                rel="no-referrer"
                className="px-12 py-8 bg-white/5 border border-white/10 text-white text-2xl font-bold rounded-[2rem] hover:bg-red-600 transition-all inline-flex items-center gap-4 group"
              >
                MOTIVATE ME <Youtube size={32} className="text-red-500 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div className="mt-32 w-full grid grid-cols-1 md:grid-cols-4 gap-12 text-left pt-12 border-t border-white/5">
            <div>
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mb-4">Location</div>
              <p className="text-lg font-bold flex items-center gap-2 text-white">
                <MapPin size={20} className="text-brand-blue" /> Dhaka, {PERSONAL_INFO.location}
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mb-4">Social Ecosystem</div>
              <div className="flex flex-wrap gap-8">
                <a href={PERSONAL_INFO.socials.github} target="_blank" rel="no-referrer" className="text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2 group">
                  <Github size={18} /> <span className="text-xs font-bold tracking-widest italic group-hover:translate-x-1 transition-transform">GITHUB</span>
                </a>
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="no-referrer" className="text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2 group">
                  <Linkedin size={18} /> <span className="text-xs font-bold tracking-widest italic group-hover:translate-x-1 transition-transform">LINKEDIN</span>
                </a>
                <a href={PERSONAL_INFO.socials.youtube} target="_blank" rel="no-referrer" className="text-white/40 hover:text-red-500 transition-colors flex items-center gap-2 group">
                  <Youtube size={18} /> <span className="text-xs font-bold tracking-widest italic group-hover:translate-x-1 transition-transform">YOUTUBE</span>
                </a>
                <a href={PERSONAL_INFO.socials.scholar} target="_blank" rel="no-referrer" className="text-white/40 hover:text-brand-accent transition-colors flex items-center gap-2 group">
                  <GraduationCap size={18} /> <span className="text-xs font-bold tracking-widest italic group-hover:translate-x-1 transition-transform">SCHOLAR</span>
                </a>
                <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="no-referrer" className="text-white/40 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <Facebook size={18} /> <span className="text-xs font-bold tracking-widest italic group-hover:translate-x-1 transition-transform">FACEBOOK</span>
                </a>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mb-4">Local Time</div>
              <p className="text-lg font-bold font-mono text-white">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} GMT+6
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AppFooter = () => (
  <footer className="py-12 border-t border-white/5 bg-bg relative z-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
          <Terminal size={16} className="text-white" />
        </div>
        <span className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase">
          MD. SAJEDUR RAHMAN // RESEARCH & CODE
        </span>
      </div>
      <div className="flex gap-12 text-white/20 text-[10px] font-mono tracking-widest">
        <span>© 2026 // ALL RIGHTS RESERVED</span>
        <a href="#" className="hover:text-white transition-colors uppercase">Top ↑</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="bg-bg text-white selection:bg-brand-blue selection:text-white min-h-screen">
      <div className="noise-bg fixed inset-0 pointer-events-none z-[60]" />
      <Cursor />
      <Navbar />
      <Hero />
      <BentoSkills />
      <ProjectsSection />
      <ResearchLab />
      <YouTubeSection />
      <Contact />
      <AppFooter />
    </main>
  );
}

