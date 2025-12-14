"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Target,
  Hammer,
  Rocket,
  TrendingUp,
  Settings,
  Palette,
  Smartphone,
  BarChart3,
  Globe,
  Zap,
  Mail,
  Briefcase,
} from "lucide-react";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const navItems = [
  { label: "Hem", href: "#home" },
  { label: "Resa", href: "#journey" },
  { label: "Tjänster", href: "#services" },
  { label: "Projekt", href: "#projects" },
  { label: "Kontakt", href: "#contact" },
];

const Navigation = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F01A4] via-[#7B2FD1] to-[#C026D3] origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-[#4F01A4]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/logo-white.png" 
              alt="PixelPioneer Logo" 
              className="h-6 sm:h-8 w-auto"
            />
            <span className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Delta Block, sans-serif' }}>
              PixelPioneer
            </span>
          </motion.a>
          <motion.ul
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-8"
          >
            {navItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={item.href}
                  className="text-gray-300 hover:text-[#C026D3] transition-colors"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </nav>
    </>
  );
};

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const FloatingPixel = ({ delay, seed }: { delay?: number; seed: number }) => {
  const top = 10 + seededRandom(seed) * 80;
  const left = 10 + seededRandom(seed * 97.13) * 80;

  return (
    <motion.div
      className="absolute w-2 h-2 bg-[#7B2FD1]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
        y: [-30, -60, -30],
        x: [-20, 20, -20],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: [0.65, 0, 0.35, 1],
      }}
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
    />
  );
};

const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any as any },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as any as any },
    },
  };

  return (
    <section
      ref={ref}
      id='home'
      className='relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 scroll-mt-24'
    >
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage:
            "linear-gradient(rgba(79, 1, 164, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 1, 164, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {[...Array(12)].map((_, i) => (
        <FloatingPixel key={i} delay={i * 0.5} seed={i + 1} />
      ))}

      <motion.div
        style={{ y, opacity }}
        className='relative z-10 text-center px-6 max-w-5xl'
      >
        <motion.h1
          variants={titleVariants}
          initial='hidden'
          animate='visible'
          className='text-6xl md:text-8xl font-black mb-6 bg-linear-to-r from-[#4F01A4] via-[#7B2FD1] to-[#E879F9] bg-clip-text text-transparent'
          style={{ fontFamily: "Delta Block, sans-serif" }}
        >
          Från pixel
          <br />
          till plattform
        </motion.h1>

        <motion.p
          variants={subtitleVariants}
          initial='hidden'
          animate='visible'
          className='text-2xl md:text-3xl text-gray-400 mb-8'
        >
          Jag utvecklar moderna webbplatser och digitala plattformar. <br />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="text-[#C026D3]"
            style={{ fontFamily: 'Delta Block, sans-serif' }}
          >
            Pixel för pixel.
          </motion.span>
        </motion.p>

        <motion.a
          href='#journey'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(79, 1, 164, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className='inline-block px-8 py-4 bg-gradient-to-r from-[#4F01A4] to-[#7B2FD1] text-white font-bold rounded-lg text-lg shadow-lg shadow-[#4F01A4]/30'
        >
          Påbörja resan
        </motion.a>
      </motion.div>
    </section>
  );
};

const BrandExplosion = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [animationPhase, setAnimationPhase] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      // Phase 1: P's fly in (happens automatically with isInView)
      // Phase 2: Explosion starts
      setTimeout(() => setAnimationPhase(1), 1000);
      // Phase 3: Logo reveals
      setTimeout(() => setAnimationPhase(2), 1100);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden py-20"
    >
      {/* Animated P's from sides */}
      {animationPhase < 1 && (
        <>
          <motion.img
            src="/images/single_p.png"
            alt="P"
            initial={{ x: -1000, opacity: 0 }}
            animate={isInView ? { 
              x: 0,
              opacity: 1,
              rotate: [0, 360, 720]
            } : {}}
            transition={{ 
              x: { duration: 1, ease: [0.16, 1, 0.3, 1] as any },
              opacity: { duration: 0.3, ease: "easeIn" },
              rotate: { duration: 1, ease: "linear" }
            }}
            className="absolute w-32 md:w-48"
            style={{ 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-150%, -50%)',
              filter: 'drop-shadow(0 0 20px rgba(123, 47, 209, 0.8))'
            }}
          />
          
          <motion.img
            src="/images/single_p.png"
            alt="P"
            initial={{ x: 1000, opacity: 0 }}
            animate={isInView ? { 
              x: 0,
              opacity: 1,
              rotate: [0, -360, -720]
            } : {}}
            transition={{ 
              x: { duration: 1, ease: [0.16, 1, 0.3, 1] as any },
              opacity: { duration: 0.3, ease: "easeIn" },
              rotate: { duration: 1, ease: "linear" }
            }}
            className="absolute w-32 md:w-48"
            style={{ 
              right: '50%', 
              top: '50%', 
              transform: 'translate(150%, -50%)',
              filter: 'drop-shadow(0 0 20px rgba(192, 38, 211, 0.8))'
            }}
          />
        </>
      )}

      {/* Explosion particles */}
      {animationPhase >= 1 && [...Array(40)].map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const distance = 150 + Math.random() * 250;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-sm"
            style={{
              background: `linear-gradient(135deg, #4F01A4, #C026D3)`,
              left: '50%',
              top: '50%',
              boxShadow: '0 0 10px rgba(192, 38, 211, 0.8)'
            }}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0,
              opacity: 1 
            }}
            animate={{
              x,
              y,
              scale: [0, 2, 1.5, 0],
              opacity: [1, 1, 0.5, 0],
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1] as any,
            }}
          />
        );
      })}

      {/* Logo reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={animationPhase >= 2 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
        className="relative z-10 text-center"
      >
        <motion.img
          src="/images/logo_horizon.png"
          alt="PixelPioneer Logo"
          className="w-64 md:w-96 mx-auto"
          initial={{ rotate: -90, opacity: 0, scale: 0.3 }}
          animate={animationPhase >= 2 ? { rotate: 0, opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(79, 1, 164, 0.6))'
          }}
        />
      </motion.div>
    </section>
  );
};

const Journey = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [clickedCard, setClickedCard] = React.useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const journeySteps = [
    {
      Icon: Target,
      title: "Förståelse",
      desc: "Jag börjar med att lära känna ditt företag, dina mål och dina kunder. Varje projekt är unikt.",
    },
    {
      Icon: Hammer,
      title: "Utveckling",
      desc: "Jag bygger allt från visuella hemsidor till komplexa SaaS-plattformar. Fokus på användarvänlighet och att det ska vara lätt för dig att hantera.",
    },
    {
      Icon: Rocket,
      title: "Lansering",
      desc: "När allt är klart lanserar jag din nya webbplats och säkerställer att allt fungerar perfekt.",
    },
    {
      Icon: TrendingUp,
      title: "Tillväxt",
      desc: "Jag finns kvar som stöd när du växer. Uppdateringar, förbättringar och nya funktioner när du behöver det.",
    },
  ];

  const handleCardClick = (index: number) => {
    if (clickedCard === index) return; // Prevent multiple clicks
    setClickedCard(index);
    setTimeout(() => setClickedCard(null), 1000);
  };

  return (
    <section
      ref={ref}
      id="journey"
      className="min-h-screen flex items-center py-20 bg-gradient-to-b from-slate-950 to-slate-900 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white" style={{ fontFamily: 'Delta Block, sans-serif' }}>
            Så här går det till
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12">
            En tydlig process från pixel till färdig plattform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {journeySteps.map((step, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                x: 10, 
                borderColor: "rgb(79, 1, 164)",
                boxShadow: "0 0 30px rgba(79, 1, 164, 0.4)",
              }}
              onClick={() => handleCardClick(i)}
              className="p-6 bg-slate-800/30 border-l-4 border-[#4F01A4]/20 rounded-lg backdrop-blur-sm relative overflow-visible group cursor-pointer"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4F01A4] to-[#C026D3]"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Particle Explosion */}
              {clickedCard === i && [...Array(20)].map((_, particleIndex) => {
                const angle = (particleIndex / 20) * Math.PI * 2;
                const distance = 100 + Math.random() * 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                return (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-2 h-2 bg-[#C026D3] rounded-sm"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      scale: 0,
                      opacity: 1 
                    }}
                    animate={{
                      x,
                      y,
                      scale: [0, 1, 0.5, 0],
                      opacity: [1, 1, 0.5, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1] as any,
                    }}
                  />
                );
              })}
              
              <motion.div
                className="relative z-10"
                animate={clickedCard === i ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <step.Icon className="w-10 h-10 mb-4 text-[#C026D3]" />
              </motion.div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#C026D3] mb-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-xl text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const services = [
    { Icon: Globe, title: "Webbplatser", tech: "Snabba, säkra och användarvänliga" },
    { Icon: BarChart3, title: "SaaS-plattformar", tech: "Avancerade verktyg och system" },
    { Icon: Smartphone, title: "Mobilvänligt", tech: "Fungerar perfekt på alla enheter" },
    { Icon: Settings, title: "Serviceavtal", tech: "Jag tar hand om allt åt dig även efter lansering" },
    { Icon: Palette, title: "Design", tech: "Professionell design som stäcker ut" },
    { Icon: Zap, title: "Prestanda", tech: "Blixtsnabba laddningstider" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section
      ref={ref}
      id="services"
      className="min-h-screen flex items-center py-20 bg-slate-900 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white" style={{ fontFamily: 'Delta Block, sans-serif' }}>
            Vad jag erbjuder
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12">
            Allt du behöver för en framgångsrik webbplats.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(79, 1, 164, 0.1)",
                borderColor: "rgb(79, 1, 164)",
              }}
              whileTap={{ 
                scale: 0.9,
                rotate: [0, -5, 5, -5, 0],
                backgroundColor: "rgba(79, 1, 164, 0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-[#4F01A4]/5 border-2 border-[#4F01A4]/20 rounded-xl text-center cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                whileTap={{ 
                  scale: [1, 1.3, 1],
                  rotate: 360,
                }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex justify-center"
              >
                <service.Icon className="w-12 h-12 text-[#7B2FD1]" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                {service.title}
              </h3>
              <p className="text-gray-400 text-base">{service.tech}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [flippedCard, setFlippedCard] = React.useState<number | null>(null);

  const projects = [
    {
      Icon: Zap,
      title: "Rutputs.nu",
      desc: "Professionell webbplats för fönsterputsföretag med bokningssystem.",
      details: "En komplett webbplats som visar upp företagets tjänster och gör det enkelt för kunder att boka direkt online. Sidan är snabb, mobilvänlig och enkel att uppdatera.",
      link: "https://rutputs.nu"
    },
    {
      Icon: BarChart3,
      title: "Planeramera.se",
      desc: "Digital plattform för prenumerationer och företagsadministration.",
      details: "En komplett lösning där företag kan hantera sina prenumerationer, kunder och betalningar på ett ställe. Allt från inloggning till betalning är automatiserat.",
      link: "https://planeramera.se"
    },
    {
      Icon: Smartphone,
      title: "AI-coach",
      desc: "Digital coach som ingår i ett utbildningskoncept.",
      details: "En AI-driven coach som hjälper deltagare genom utbildningen. Går att prata med när som helst för att få stöd och vägledning längs vägen.",
      link: "https://www.nyfikenmodellen.se"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen flex items-center py-20 bg-gradient-to-b from-slate-900 to-slate-950 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white" style={{ fontFamily: 'Delta Block, sans-serif' }}>
            Projekt jag genomfört
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12">
            Från lokala företag till digitala plattformar.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <div key={i} className="h-[400px] flex items-center">
              <motion.div
                variants={cardVariants}
                onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                animate={{ rotateY: flippedCard === i ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-full w-full cursor-pointer"
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 bg-slate-800/30 rounded-xl overflow-hidden border border-[#4F01A4]/10"
                  style={{ 
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                >
                  <motion.div
                    className="h-48 bg-linear-to-br from-[#4F01A4]/20 to-[#C026D3]/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <project.Icon className="w-16 h-16 text-[#C026D3]" />
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#7B2FD1] mb-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-400">{project.desc}</p>
                    <p className="text-sm text-[#C026D3] mt-4">Klicka för mer info →</p>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 bg-slate-800/90 rounded-xl border-2 border-[#7B2FD1] p-6 flex flex-col justify-between"
                  style={{ 
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#C026D3] mb-4" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {project.details}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="block w-full px-4 py-2 bg-gradient-to-r from-[#4F01A4] to-[#7B2FD1] text-white text-center rounded-lg hover:shadow-lg hover:shadow-[#4F01A4]/50 transition-shadow"
                      >
                        Besök webbplats
                      </a>
                    )}
                    <p className="text-sm text-[#C026D3] text-center">← Klicka för att stänga</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="contact"
      className="min-h-screen flex items-center py-20 bg-slate-950 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
            Redo att påbörja resan?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 sm:mb-8 px-2">
            Berätta om ditt projekt så bryter vi ny mark tillsammans.
          </p>
          
          {/* CTA Button */}
          <motion.a
            href="/brief"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(79, 1, 164, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#4F01A4] to-[#7B2FD1] text-white font-bold rounded-lg text-base sm:text-lg shadow-lg shadow-[#4F01A4]/30"
            style={{ fontFamily: 'Delta Block, sans-serif' }}
          >
            Fyll i projektformulär
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-900/50 border-2 border-[#4F01A4]/30 rounded-2xl p-6 sm:p-8 md:p-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[#C026D3] text-center" style={{ fontFamily: 'Delta Block, sans-serif' }}>
            Hör gärna av dig!
          </h2>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-[#4F01A4]/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="w-8 h-8 text-[#C026D3]" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#7B2FD1] mb-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                E-post
              </h3>
              <a href="mailto:hej@pixelpioneer.se" className="text-lg text-gray-300 hover:text-[#C026D3] transition-colors">
                hej@pixelpioneer.se
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-[#4F01A4]/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Briefcase className="w-8 h-8 text-[#C026D3]" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#7B2FD1] mb-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
                Telefon
              </h3>
              <a href="tel:+46734644604" className="text-lg text-gray-300 hover:text-[#C026D3] transition-colors">
                0734-64 46 04
              </a>
            </motion.div>
          </div>

          {/* Bottom Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 pt-8 border-t border-[#4F01A4]/20 text-center"
          >
            <p className="text-[#7B2FD1] font-bold text-lg mb-2" style={{ fontFamily: 'Delta Block, sans-serif' }}>
              JAG ÄLSKAR NYA PROJEKT
            </p>
            <p className="text-gray-400 text-base">
              Skicka ett meddelande eller ring så pratar vi om hur jag kan hjälpa dig!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="bg-slate-950 text-white" style={{ fontFamily: 'VT323, monospace' }}>
      <Navigation />
      <Hero />
      <Journey />
      <Services />
      <BrandExplosion />
      <Projects />
      <Contact />
      <Footer />
      <CookieBanner />
    </div>
  );
}
