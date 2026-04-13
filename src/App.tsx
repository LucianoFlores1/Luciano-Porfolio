/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Code2, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Phone, 
  MapPin,
  ExternalLink,
  ChevronRight,
  Terminal,
  Languages,
  Monitor,
  Server,
  Database,
  Wrench,
  Cloud
} from 'lucide-react';

const menuItems = ['INICIO', 'PERFIL', 'HABILIDADES', 'PROYECTOS', 'CONTACTO'];

const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Ignore audio errors
  }
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState('INICIO');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeout = useRef<NodeJS.Timeout | null>(null);
  const prevMenuRef = useRef(activeMenu);

  useEffect(() => {
    if (prevMenuRef.current !== activeMenu) {
      playRetroSound('select');
      
      // Trigger glitch effect
      setIsGlitching(true);
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
      glitchTimeout.current = setTimeout(() => setIsGlitching(false), 250);
      
      prevMenuRef.current = activeMenu;
    }
  }, [activeMenu]);

  const playRetroSound = (type: 'select' | 'hover' | 'scroll') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'select':
          osc.type = 'square';
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
        case 'hover':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case 'scroll':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(100, now);
          osc.frequency.linearRampToValueAtTime(50, now + 0.05);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
      }
    } catch (e) {
      // Ignore audio errors
    }
  };

  const handleScroll = (e: React.WheelEvent) => {
    if (isScrolling) return;

    const currentIndex = menuItems.indexOf(activeMenu);
    let nextIndex = currentIndex;

    if (e.deltaY > 0) {
      nextIndex = Math.min(currentIndex + 1, menuItems.length - 1);
    } else if (e.deltaY < 0) {
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    if (nextIndex !== currentIndex) {
      playRetroSound('scroll');
      setActiveMenu(menuItems[nextIndex]);
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 100);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const renderContent = () => {
    switch (activeMenu) {
      case 'INICIO':
        return (
          <motion.div 
            key="inicio"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col gap-6 md:pl-8 relative h-full overflow-y-auto custom-scrollbar pr-2"
          >
            {/* Top Row: Photo and Info */}
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
              {/* Retro Profile Photo */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 border-2 border-white/20 bg-black overflow-hidden group">
                <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[10px] text-white/80 font-mono tracking-tighter uppercase">REC [●] 00:04:12</span>
                </div>
                <div className="absolute bottom-2 left-2 z-20 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  <span className="text-[10px] text-red-500 font-mono tracking-tighter uppercase">SYNC_STATUS: OK</span>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600 z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600 z-20" />
                
                <img 
                  src="https://picsum.photos/seed/luciano/400/400" 
                  alt="Luciano Flores" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute inset-0 crt-overlay opacity-40 pointer-events-none" />
              </div>

              {/* Name and Title */}
              <div className="flex-1 text-left">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-incandescent mb-2" style={{ textShadow: '4px 4px 0px #000' }}>
                  LUCIANO
                </h1>
                <h2 className="font-cursive text-3xl md:text-5xl text-white transform -rotate-2 mb-6" style={{ textShadow: '2px 2px 4px #000' }}>
                  Rafael Flores
                </h2>
                <div className="box-neon bg-black/60 p-4 max-w-lg backdrop-blur-sm">
                  <h3 className="text-lg md:text-xl text-white mb-1 tracking-wider uppercase font-bold">Ingeniero de Software:</h3>
                  <p className="text-base md:text-lg text-[#ffb3c6]">
                    Desarrollador Full Stack especializado en React, Node.js, TypeScript y SQL.
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Row: Tech Stack Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
              {[
                { name: 'TYPESCRIPT', icon: Languages, id: '01', sub: 'JS' },
                { name: 'REACT.JS', icon: Monitor, id: '02' },
                { name: 'NODE.JS', icon: Server, id: '03' },
                { name: 'POSTGRESQL', icon: Database, id: '04' },
                { name: 'AWS_CLOUD', icon: Cloud, id: '05' },
                { name: 'DOCKER', icon: Terminal, id: '06' }
              ].map((tech, i) => (
                <div key={i} className="relative group border border-white/10 bg-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all cursor-default">
                  <span className="absolute top-1 right-2 text-white/10 text-2xl font-bold group-hover:text-white/20 transition-colors">{tech.id}</span>
                  {tech.sub && <span className="text-[10px] text-[#ff2a4b] font-bold absolute top-4 left-4">{tech.sub}</span>}
                  <tech.icon className="w-8 h-8 text-[#ffb3c6] group-hover:text-[#ff2a4b] transition-colors" />
                  <span className="text-[10px] md:text-xs text-white/80 tracking-widest font-bold uppercase text-center">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row: Project Sneak Peaks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-8">
              {[
                { 
                  id: 'P-01', 
                  title: 'EZIPTV_CONTROL_PANEL', 
                  desc: 'Low-latency streaming architecture with custom transcoding pipelines. Monitoring active nodes...',
                  tags: ['NEXT.JS', 'FFMPEG', 'W_SOCKETS'],
                  img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
                },
                { 
                  id: 'P-02', 
                  title: 'MIAMIGOFIEL_CORE', 
                  desc: 'Relational matching engine for pet rescue operations. Real-time geofencing integrated.',
                  tags: ['K_NATIVE', 'MONGODB', 'FIREBASE'],
                  img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
                }
              ].map((proj, i) => (
                <div key={i} className="group border border-white/10 bg-black/40 overflow-hidden flex flex-col">
                  <div className="h-48 relative overflow-hidden bg-gray-900">
                    <div className="absolute top-2 left-2 right-2 z-20 flex justify-between items-center text-[10px] font-mono text-white/40">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-600" />
                        <div className="w-2 h-2 bg-gray-600" />
                        <div className="w-2 h-2 bg-gray-600" />
                      </div>
                      <span>ID: {proj.id} // {proj.title.split('_')[0]}</span>
                    </div>
                    <img 
                      src={proj.img} 
                      alt={proj.title} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 border-2 border-[#ff2a4b] flex items-center justify-center bg-black/60">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#ff2a4b] border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none crt-overlay opacity-30" />
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <h4 className="text-xl md:text-2xl font-bold text-white tracking-tighter group-hover:text-[#ff2a4b] transition-colors">{proj.title}</h4>
                    <p className="text-sm md:text-base text-[#ffb3c6] leading-tight font-mono">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] border border-white/20 px-2 py-0.5 text-white/60 font-bold">{tag}</span>
                      ))}
                    </div>
                    <button className="text-[#ff2a4b] text-xs font-bold flex items-center gap-2 mt-2 hover:translate-x-1 transition-transform">
                      {'>'} RUN_DEMO <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'PERFIL':
        return (
          <motion.div 
            key="perfil"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar pr-2"
          >
            <div className="box-neon bg-black/40 p-4 md:p-8 backdrop-blur-md mb-8">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 border-b border-[#ff2a4b]/30 pb-4">
                <User className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Perfil Profesional</h2>
              </div>
              <p className="text-lg md:text-2xl text-[#ffb3c6] leading-relaxed text-justify mb-6">
                Ingeniero de Software Full Stack con experiencia desarrollando aplicaciones web escalables end-to-end utilizando React, Next.js, Node.js, TypeScript y SQL. Experiencia en desarrollo de APIs REST, arquitecturas frontend basadas en componentes, integraciones entre sistemas y diseño de bases de datos.
              </p>
              
              <div className="flex items-center gap-3 md:gap-4 mb-6 mt-12 border-b border-[#ff2a4b]/30 pb-4">
                <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-xl md:text-3xl text-white tracking-widest uppercase">Experiencia</h2>
              </div>
              <div className="space-y-8">
                <div className="relative pl-6 border-l-2 border-[#ff0055]/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff0055] shadow-[0_0_10px_#ff0055]" />
                  <h3 className="text-xl text-white font-bold">Desarrollador Full Stack Freelance</h3>
                  <p className="text-[#ff0055] text-sm mb-2">Remoto | 2022 – Presente</p>
                  <ul className="space-y-1 text-[#ffb3c6] text-base list-disc list-inside">
                    <li>Desarrollo end-to-end de aplicaciones web (React, Node.js, SQL).</li>
                    <li>Construcción de APIs REST y automatización mediante n8n.</li>
                  </ul>
                </div>
                <div className="relative pl-6 border-l-2 border-[#ff0055]/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff0055] shadow-[0_0_10px_#ff0055]" />
                  <h3 className="text-xl text-white font-bold">Analista de Datos / Desarrollador</h3>
                  <p className="text-[#ff0055] text-sm mb-2">Remoto | 2021 – 2022</p>
                  <ul className="space-y-1 text-[#ffb3c6] text-base list-disc list-inside">
                    <li>Análisis de datos con Python/Pandas y dashboards en Power BI.</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 mb-6 mt-12 border-b border-[#ff2a4b]/30 pb-4">
                <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-xl md:text-3xl text-white tracking-widest uppercase">Educación</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <ChevronRight className="w-6 h-6 text-[#ff0055] shrink-0" />
                  <div>
                    <h3 className="text-lg text-white font-bold">Tecnicatura Universitaria en Desarrollo de Software</h3>
                    <p className="text-[#ff0055] text-base">UPATecO | 2022 – 2024</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ChevronRight className="w-6 h-6 text-[#ff0055] shrink-0" />
                  <div>
                    <h3 className="text-lg text-white font-bold">Programa de Analista de Datos</h3>
                    <p className="text-[#ff0055] text-base">Coderhouse | 2021 – 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'HABILIDADES':
        const skills = [
          { category: 'Lenguajes', items: 'JavaScript (ES6+), TypeScript, Python, SQL', icon: Languages },
          { category: 'Frontend', items: 'React.js, Next.js, HTML5, CSS3, TailwindCSS, PWA', icon: Monitor },
          { category: 'Backend', items: 'Node.js, Express.js, APIs REST, Microservicios', icon: Server },
          { category: 'Bases de Datos', items: 'MySQL, Supabase, IndexedDB, Optimización', icon: Database },
          { category: 'Herramientas', items: 'Git, GitHub, Agile/Scrum, CI/CD, n8n', icon: Wrench },
          { category: 'Cloud', items: 'Vercel, Serverless, Service Workers', icon: Cloud }
        ];
        return (
          <motion.div 
            key="habilidades"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar pr-2"
          >
            <div className="box-neon bg-black/40 p-4 md:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#ff2a4b]/30 pb-4">
                <Code2 className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Habilidades Técnicas</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {skills.map((skill, idx) => (
                  <div key={idx} className="border border-[#ff2a4b]/20 p-3 md:p-4 hover:bg-[#ff0055]/5 transition-colors">
                    <h3 className="text-[#ff0055] text-lg md:text-xl mb-2 font-bold uppercase tracking-tighter flex items-center gap-2">
                      <skill.icon className="w-4 h-4 md:w-5 md:h-5" /> {skill.category}
                    </h3>
                    <p className="text-white text-base md:text-lg">{skill.items}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-3 md:gap-4 mb-6 mt-12 border-b border-[#ff2a4b]/30 pb-4">
                <Terminal className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-xl md:text-3xl text-white tracking-widest uppercase">Certificaciones</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {['Cybersecurity Foundations (Google)', 'Generative AI (Microsoft)', 'QA Manual & Agile Testing', 'Automatización con n8n', 'Programa Tu Futuro'].map((cert, idx) => (
                  <div key={idx} className="text-[#ffb3c6] text-base md:text-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#ff0055] rounded-full shrink-0" /> {cert}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'PROYECTOS':
        const projects = [
          { name: 'EzIPTV', desc: 'Reproductor IPTV Web Open Source. PWA con Next.js 16, HLS.js y IndexedDB.' },
          { name: 'miAmigoFiel', desc: 'Proyecto Ganador de Hackathon. Plataforma para mascotas perdidas con geolocalización.' },
          { name: 'Sistema Inventario', desc: 'Gestión de inventario y técnicos con Node.js, Express y React.' },
          { name: 'Gestión Municipal', desc: 'Dashboards internos y automatización con n8n. Reducción del 40% en tiempos.' }
        ];
        return (
          <motion.div 
            key="proyectos"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar pr-2"
          >
            <div className="box-neon bg-black/40 p-4 md:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#ff2a4b]/30 pb-4">
                <FolderGit2 className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Proyectos Destacados</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {projects.map((proj, idx) => (
                  <div key={idx} className="group border border-[#ff2a4b]/30 p-4 md:p-6 hover:border-[#ff0055] transition-all cursor-pointer bg-black/20">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#ff0055] text-xl md:text-2xl font-bold group-hover:text-white transition-colors uppercase tracking-widest">{proj.name}</h3>
                      <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-[#ff2a4b] opacity-50 group-hover:opacity-100 shrink-0 ml-2" />
                    </div>
                    <p className="text-[#ffb3c6] text-base md:text-lg leading-relaxed">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'CONTACTO':
        return (
          <motion.div 
            key="contacto"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="flex-1 md:pl-8 flex items-center justify-center overflow-y-auto custom-scrollbar pr-2"
          >
            <div className="box-neon bg-black/60 p-6 md:p-12 backdrop-blur-xl w-full max-w-2xl my-auto">
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10 border-b border-[#ff2a4b]/30 pb-4 justify-center">
                <Mail className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Conectemos</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <a href="mailto:lucianorafaelflores@gmail.com" className="flex items-center gap-4 group">
                  <div className="p-3 md:p-4 border border-[#ff2a4b]/30 group-hover:border-[#ff0055] transition-colors shrink-0">
                    <Mail className="w-6 h-6 md:w-8 md:h-8 text-[#ff0055]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs md:text-sm uppercase">Email</p>
                    <p className="text-white text-base md:text-lg truncate">lucianorafael...</p>
                  </div>
                </a>
                <a href="tel:+5493874871320" className="flex items-center gap-4 group">
                  <div className="p-3 md:p-4 border border-[#ff2a4b]/30 group-hover:border-[#ff0055] transition-colors shrink-0">
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-[#ff0055]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs md:text-sm uppercase">Teléfono</p>
                    <p className="text-white text-base md:text-lg truncate">+54 9 3874 871320</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 group">
                  <div className="p-3 md:p-4 border border-[#ff2a4b]/30 group-hover:border-[#ff0055] transition-colors shrink-0">
                    <Linkedin className="w-6 h-6 md:w-8 md:h-8 text-[#ff0055]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs md:text-sm uppercase">LinkedIn</p>
                    <p className="text-white text-base md:text-lg truncate">Luciano Flores</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 group">
                  <div className="p-3 md:p-4 border border-[#ff2a4b]/30 group-hover:border-[#ff0055] transition-colors shrink-0">
                    <Github className="w-6 h-6 md:w-8 md:h-8 text-[#ff0055]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs md:text-sm uppercase">GitHub</p>
                    <p className="text-white text-base md:text-lg truncate">lucianorafael</p>
                  </div>
                </a>
              </div>
              <div className="mt-8 md:mt-12 flex items-center gap-3 md:gap-4 text-gray-500 justify-center text-center">
                <MapPin className="w-5 h-5 shrink-0" />
                <p className="uppercase tracking-widest text-sm md:text-base">Salta, Argentina (Remoto / Híbrido)</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-black text-[#ff2a4b] font-pixel overflow-hidden custom-cursor selection:bg-[#ff0055] selection:text-white relative">
      {/* Screen Background & Effects */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505635552518-3448ff116af3?q=80&w=2000&auto=format&fit=crop")' }}
      />

      <div className="vignette" />
      <div className="crt-overlay" />
      
      {/* Retro Channel Change Distortion */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.3, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "linear" }}
            className="fixed inset-0 z-[90] bg-white mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 3px)`,
              backgroundSize: '100% 4px'
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_150%_120%_at_50%_-20%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_40%)]" />
      <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />

      {/* Main Content Layout */}
      <div className={`relative z-10 flex flex-col md:flex-row h-full w-full p-4 md:p-8 lg:p-12 transition-all duration-200 ${isGlitching ? 'scale-[1.02] blur-[1px]' : 'scale-100 blur-0'}`}>

        {/* Left Navigation Area */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-6 w-full md:w-auto md:min-w-[160px] border-b-2 md:border-b-0 md:border-r-2 border-[#ff2a4b]/20 pb-4 md:pb-0 pr-0 md:pr-6 shrink-0">
          
          {/* Menu Items */}
          <div 
            onWheel={handleScroll}
            className="flex flex-row md:flex-col justify-start md:justify-center gap-2 md:gap-3 overflow-hidden md:overflow-visible w-full"
          >
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveMenu(item)}
                onMouseEnter={() => playRetroSound('hover')}
                className={`text-base md:text-2xl lg:text-3xl tracking-widest text-left transition-all duration-200 shrink-0 ${
                  activeMenu === item
                    ? 'text-neon-active box-neon px-3 py-1 md:px-4 md:py-2 bg-[#ff0055]/20'
                    : 'text-[#ff6b8b] hover:text-[#ff8a9e] menu-item-hover px-3 py-1 md:px-4 md:py-2'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 flex flex-col pt-6 md:pt-0 md:pl-12 relative h-full overflow-hidden">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

