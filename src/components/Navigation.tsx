import React, { useState, useEffect } from 'react';
import { Bot as Lotus, Heart, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const totalBreaths = 10;

  useEffect(() => {
    let lastScrollTime = Date.now();
    let lastScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentPosition = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (currentPosition / totalScroll) * 100;
      
      const breaths = Math.floor((currentProgress / 100) * totalBreaths);
      setBreathCount(breaths);
      
      const timeDiff = currentTime - lastScrollTime;
      if (timeDiff > 2000) {
        setBreathPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
      }

      setScrollProgress(currentProgress);
      
      lastScrollTime = currentTime;
      lastScrollPosition = currentPosition;

      const sections = ['home', 'practices', 'journey'];
      const currentSection = sections.find((section, index) => 
        currentProgress >= (index * (100 / sections.length)) &&
        currentProgress < ((index + 1) * (100 / sections.length))
      );
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg rounded-full p-2 shadow-lg">
      <div className="relative">
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-teal-400 via-purple-500 to-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${scrollProgress}%` }}
        />
        
        <motion.div
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-lg p-2 text-sm text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <div className="font-bold text-lg">{breathCount} breaths</div>
            <div className="text-xs text-gray-300">of {totalBreaths}</div>
          </div>
          <div className="text-xs text-teal-400 mt-1">
            {breathPhase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
          </div>
        </motion.div>
        
        <div className="flex items-center gap-4 relative z-10">
          {[
            { id: 'home', icon: Lotus, label: 'Begin Practice' },
            { id: 'practices', icon: Heart, label: 'Mindfulness' },
            { id: 'journey', icon: Moon, label: 'Inner Peace' },
          ].map((item, index) => (
            <motion.button
              key={item.id}
              className={`relative p-3 rounded-full transition-colors ${
                activeSection === item.id
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-teal-600/50'
              }`}
              onClick={() => {
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-6 h-6" />
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black/50 px-2 py-1 rounded"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {item.label}
              </motion.div>
              <motion.div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
                  scrollProgress >= (index * (100 / 3))
                    ? 'bg-teal-400'
                    : 'bg-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: scrollProgress >= (index * (100 / 3)) ? 1 : 0 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;