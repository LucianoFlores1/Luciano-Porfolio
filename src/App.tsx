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
import { RetroGear } from './components/RetroGear';

const menuItems = ['INICIO', 'PERFIL', 'HABILIDADES', 'EXPERIENCIA', 'PROYECTOS', 'EDUCACIÓN', 'CONTACTO'];

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
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const prevMenuRef = useRef(activeMenu);

  useEffect(() => {
    if (prevMenuRef.current !== activeMenu) {
      playClickSound();
      prevMenuRef.current = activeMenu;
    }
  }, [activeMenu]);

  const handleScroll = (e: React.WheelEvent) => {
    if (isScrolling) return;

    const currentIndex = menuItems.indexOf(activeMenu);
    let nextIndex = currentIndex;

    if (e.deltaY > 0) {
      // Scroll down
      nextIndex = Math.min(currentIndex + 1, menuItems.length - 1);
    } else if (e.deltaY < 0) {
      // Scroll up
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    if (nextIndex !== currentIndex) {
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
            className="flex-1 flex flex-col justify-between md:pl-8 relative h-full overflow-y-auto custom-scrollbar"
          >
            <div className="flex flex-col items-end gap-4 md:gap-6 mt-4 md:mt-0">
              <div className="text-right relative">
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-incandescent" style={{ textShadow: '4px 4px 0px #000' }}>
                  LUCIANO
                </h1>
                <h2 className="font-cursive text-3xl sm:text-4xl md:text-6xl text-white absolute bottom-0 right-0 transform translate-y-1/4 -rotate-6 whitespace-nowrap" style={{ textShadow: '2px 2px 4px #000' }}>
                  Rafael Flores
                </h2>
              </div>

              <div className="box-neon bg-black/60 p-4 md:p-6 w-full max-w-md backdrop-blur-sm mt-8 md:mt-8">
                <h3 className="text-xl md:text-3xl text-white mb-2 md:mb-4 tracking-wider uppercase">Ingeniero de Software:</h3>
                <p className="text-lg md:text-xl text-[#ffb3c6] text-right mb-4">
                  Desarrollador Full Stack especializado en React, Node.js, TypeScript y SQL.
                </p>
                <div className="flex justify-end gap-3 md:gap-4 mt-4 md:mt-6 items-end">
                  <div className="flex gap-1 md:gap-2 opacity-80">
                    <span className="text-2xl md:text-3xl text-gray-400">♟</span>
                    <span className="text-2xl md:text-3xl text-gray-400">♞</span>
                    <span className="text-2xl md:text-3xl text-gray-400">♜</span>
                    <span className="text-2xl md:text-3xl text-yellow-500" style={{ textShadow: '0 0 10px #eab308' }}>♚</span>
                  </div>
                  <div className="w-8 h-6 md:w-12 md:h-8 bg-[#75AADB] flex flex-col justify-between border border-white/20">
                    <div className="h-1/3 bg-[#75AADB]"></div>
                    <div className="h-1/3 bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500"></div></div>
                    <div className="h-1/3 bg-[#75AADB]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute hidden md:block bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
              <p className="text-2xl md:text-3xl text-white tracking-[0.2em] opacity-60 animate-pulse uppercase text-center">
                Gira la rueda para explorar
              </p>
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
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar"
          >
            <div className="box-neon bg-black/40 p-4 md:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 border-b border-[#ff2a4b]/30 pb-4">
                <User className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Perfil Profesional</h2>
              </div>
              <p className="text-lg md:text-2xl text-[#ffb3c6] leading-relaxed text-justify">
                Ingeniero de Software Full Stack con experiencia desarrollando aplicaciones web escalables end-to-end utilizando React, Next.js, Node.js, TypeScript y SQL. Experiencia en desarrollo de APIs REST, arquitecturas frontend basadas en componentes, integraciones entre sistemas y diseño de bases de datos.
              </p>
              <p className="text-lg md:text-2xl text-[#ffb3c6] mt-4 md:mt-6 leading-relaxed text-justify">
                Ganador de un hackathon tecnológico desarrollando una plataforma colaborativa con geolocalización en tiempo real. Experiencia construyendo Progressive Web Apps, sistemas de gestión empresarial y aplicaciones con sincronización offline.
              </p>
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
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar"
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
            </div>
          </motion.div>
        );
      case 'EXPERIENCIA':
        return (
          <motion.div 
            key="experiencia"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar"
          >
            <div className="box-neon bg-black/40 p-4 md:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#ff2a4b]/30 pb-4">
                <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Experiencia Profesional</h2>
              </div>
              <div className="space-y-8 md:space-y-12">
                <div className="relative pl-6 md:pl-8 border-l-2 border-[#ff0055]/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff0055] shadow-[0_0_10px_#ff0055]" />
                  <h3 className="text-xl md:text-2xl text-white font-bold">Desarrollador Full Stack Freelance</h3>
                  <p className="text-[#ff0055] text-base md:text-lg mb-2 md:mb-4">Remoto | Ene 2022 – Presente</p>
                  <ul className="space-y-1 md:space-y-2 text-[#ffb3c6] text-base md:text-lg list-disc list-inside">
                    <li>Desarrollo end-to-end de aplicaciones web utilizando React, Node.js y SQL.</li>
                    <li>Construcción de APIs REST con Node.js y Express.</li>
                    <li>Desarrollo de interfaces modernas con arquitectura de componentes reutilizables.</li>
                    <li>Integración de APIs externas y automatización mediante n8n.</li>
                  </ul>
                </div>
                <div className="relative pl-6 md:pl-8 border-l-2 border-[#ff0055]/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff0055] shadow-[0_0_10px_#ff0055]" />
                  <h3 className="text-xl md:text-2xl text-white font-bold">Analista de Datos / Desarrollador</h3>
                  <p className="text-[#ff0055] text-base md:text-lg mb-2 md:mb-4">Remoto | 2021 – 2022</p>
                  <ul className="space-y-1 md:space-y-2 text-[#ffb3c6] text-base md:text-lg list-disc list-inside">
                    <li>Análisis de datos utilizando Python, Pandas y SQL.</li>
                    <li>Construcción de pipelines ETL básicos para extracción y transformación.</li>
                    <li>Creación de dashboards y visualizaciones en Power BI.</li>
                  </ul>
                </div>
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
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar"
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
      case 'EDUCACIÓN':
        return (
          <motion.div 
            key="educacion"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 md:pl-8 overflow-y-auto custom-scrollbar"
          >
            <div className="box-neon bg-black/40 p-4 md:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#ff2a4b]/30 pb-4">
                <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Educación</h2>
              </div>
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                <div className="flex gap-3 md:gap-4">
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#ff0055] shrink-0" />
                  <div>
                    <h3 className="text-xl md:text-2xl text-white font-bold">Tecnicatura Universitaria en Desarrollo de Software</h3>
                    <p className="text-[#ff0055] text-lg md:text-xl">UPATecO | 2022 – 2024</p>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#ff0055] shrink-0" />
                  <div>
                    <h3 className="text-xl md:text-2xl text-white font-bold">Programa de Analista de Datos</h3>
                    <p className="text-[#ff0055] text-lg md:text-xl">Coderhouse | 2021 – 2022</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#ff2a4b]/30 pb-4">
                <Terminal className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055]" />
                <h2 className="text-2xl md:text-4xl text-white tracking-widest uppercase">Certificaciones</h2>
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
      case 'CONTACTO':
        return (
          <motion.div 
            key="contacto"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="flex-1 md:pl-8 flex items-center justify-center overflow-y-auto custom-scrollbar"
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-0 md:p-4 lg:p-6 custom-cursor selection:bg-[#ff0055] selection:text-white overflow-hidden">
      {/* Physical Vertical Gear Assembly (Three.js) - Fixed on the left edge of the screen */}
      <div 
        className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 items-center shrink-0 h-1/3 cursor-ns-resize z-[100]"
        onWheel={handleScroll}
      >
        <RetroGear activeIndex={menuItems.indexOf(activeMenu)} />
      </div>

      {/* TV Bezel */}
      <div className="relative w-full h-screen md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] bg-[#111] rounded-none md:rounded-[2rem] border-0 md:border-[16px] lg:border-[24px] border-[#1a1a1a] shadow-none md:shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-2px_5px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
        
        {/* Inner Screen */}
        <div className="relative w-full h-full bg-black text-[#ff2a4b] font-pixel overflow-hidden rounded-none md:rounded-[1.5rem] border-0 md:border-[12px] border-[#050505] shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
          
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505635552518-3448ff116af3?q=80&w=2000&auto=format&fit=crop")' }}
          />

          <div className="vignette" />
          <div className="crt-overlay" />
          
          <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_150%_120%_at_50%_-20%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_40%)]" />
          <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

          {/* Main Content Layout */}
          <div className="relative z-10 flex flex-col md:flex-row h-full w-full p-4 md:p-12 lg:p-16">

            {/* Left Navigation Area */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-8 w-full md:w-auto md:min-w-[180px] border-b-2 md:border-b-0 md:border-r-2 border-[#ff2a4b]/30 pb-4 md:pb-0 pr-0 md:pr-4 shrink-0">
              
              {/* Menu Items */}
              <div 
                onWheel={handleScroll}
                className="flex flex-row md:flex-col justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto md:overflow-visible custom-scrollbar w-full"
              >
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveMenu(item)}
                    className={`text-lg md:text-2xl lg:text-3xl tracking-widest text-left transition-all duration-200 shrink-0 ${
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
            <div className="flex-1 flex flex-col pt-4 md:pt-0 md:pl-8 relative h-full overflow-hidden">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

