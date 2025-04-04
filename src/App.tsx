import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import BIRDS from 'vanta/src/vanta.birds';
import * as THREE from 'three';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import RaceCard from './components/RaceCard';

function App() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [breathCount, setBreathCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x0a192f,
          color1: 0x5eead4,
          color2: 0x7e22ce,
          colorMode: "variance",
          birdSize: 1.50,
          wingSpan: 20.00,
          separation: 50.00,
          alignment: 100.00,
          cohesion: 100.00,
          quantity: 3.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      setBreathCount(Math.floor(v * 10));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const practices = [
    {
      title: "Morning Meditation",
      description: "A gentle morning practice focusing on breath awareness and setting intentions for the day ahead.",
      techniques: ["Breath Awareness", "Body Scan", "Intention Setting", "Gratitude"],
      benefits: [
        "Reduced morning anxiety",
        "Improved focus throughout day",
        "Enhanced emotional balance"
      ],
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020",
      guideUrl: "#"
    },
    {
      title: "Mindful Movement",
      description: "Combining gentle movement with breath awareness to create a flowing meditation practice that nurtures both body and mind.",
      techniques: ["Walking Meditation", "Gentle Stretching", "Mindful Movement", "Breath Sync"],
      benefits: [
        "Improved body awareness",
        "Better stress management",
        "Enhanced mind-body connection"
      ],
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2020",
      guideUrl: "#"
    }
  ];

  const sessions = [
    {
      date: "2024-03-15",
      location: "Forest Retreat",
      practice: "Nature Meditation",
      duration: "45 mins",
      focus: "Presence",
      insights: "Deep connection with nature sounds, feeling of complete presence and peace.",
      imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2070"
    },
    {
      date: "2024-02-01",
      location: "Ocean View",
      practice: "Sound Healing",
      duration: "60 mins",
      focus: "Sound",
      insights: "Profound healing experience with ocean waves and singing bowls.",
      imageUrl: "https://images.unsplash.com/photo-1476611317561-60117649dd94?q=80&w=2070"
    },
    {
      date: "2024-01-10",
      location: "Mountain Peak",
      practice: "Sunrise Meditation",
      duration: "30 mins",
      focus: "Light",
      insights: "Beautiful sunrise meditation bringing clarity and renewed energy.",
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070"
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a192f] text-white overflow-hidden">
      <div ref={vantaRef} className="fixed inset-0 z-0" />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-cyan-500 transform origin-left z-50"
        style={{ scaleX }}
      />
      
      <motion.div
        className="fixed top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg p-3 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          transition: { type: "spring", stiffness: 50 }
        }}
      >
        <div className="text-sm font-mono">
          <div className="text-emerald-400">Breaths: {breathCount}</div>
          <div className="text-xs text-gray-400">Mindful Moments</div>
        </div>
      </motion.div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        
        <motion.section
          id="practices"
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
            >
              Mindfulness Practices
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {practices.map((practice, index) => (
                <ProjectCard key={index} {...practice} index={index} />
              ))}
            </div>
          </div>
        </motion.section>
        
        <motion.section
          id="journey"
          className="py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-fuchsia-900/20 to-cyan-900/20"
            style={{ y: backgroundY, opacity: backgroundOpacity }}
          />
          <div className="container mx-auto px-6 relative">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400"
            >
              Meditation Journey
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sessions.map((session, index) => (
                <RaceCard key={index} {...session} index={index} />
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;