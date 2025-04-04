import React from 'react';
import { Bot as Lotus, Heart, Moon, Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const personalInfo = {
  name: "Sarah Parker",
  title: "Mindfulness Guide",
  location: "Zen Valley, CA",
  email: "sarah.parker@example.com",
  github: "https://github.com/sarahparker",
  linkedin: "https://linkedin.com/in/sarahparker",
  resumeUrl: "/path-to-your-resume.pdf",
  bio: "Certified mindfulness instructor with 5+ years of experience in meditation and breathwork. Helping others find peace and clarity in their daily lives.",
  practices: [
    "Meditation",
    "Breathwork",
    "Sound Healing",
    "Body Scanning",
    "Walking Meditation",
    "Mindful Movement",
    "Nature Connection",
    "Stress Reduction"
  ],
  highlights: [
    "1000+ guided sessions",
    "Published mindfulness research",
    "Retreat facilitator",
    "Mindfulness app creator"
  ]
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.8 }
    }
  };

  const glowVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div 
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="absolute -inset-10 bg-gradient-to-r from-emerald-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-3xl"
            />
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <motion.div variants={iconVariants} whileHover="hover">
                <Lotus className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <motion.div variants={iconVariants} whileHover="hover">
                <Moon className="w-8 h-8 text-fuchsia-400" />
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-fuchsia-400 to-cyan-400">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl text-emerald-400 mb-2">{personalInfo.title}</h2>
              <p className="text-gray-300">{personalInfo.location}</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10 hover:border-emerald-500/50 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                {personalInfo.bio}
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-fuchsia-500/50 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-emerald-400 mb-4">Practices</h3>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.practices.map((practice, index) => (
                    <motion.span
                      key={practice}
                      className="px-3 py-1 bg-emerald-900/50 rounded-full text-sm text-emerald-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(16, 185, 129, 0.4)" }}
                    >
                      {practice}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-emerald-400 mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {personalInfo.highlights.map((highlight, index) => (
                    <motion.li
                      key={highlight}
                      className="text-gray-300 flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10, color: "rgb(110, 231, 183)" }}
                    >
                      <Heart className="w-4 h-4 text-emerald-400" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { href: `mailto:${personalInfo.email}`, icon: Mail, text: "Contact Me", className: "bg-emerald-600 hover:bg-emerald-700" },
                { href: personalInfo.resumeUrl, icon: Download, text: "Download Guide", className: "bg-fuchsia-600 hover:bg-fuchsia-700" },
                { href: personalInfo.github, icon: Github, text: "GitHub", className: "bg-gray-800 hover:bg-gray-700" },
                { href: personalInfo.linkedin, icon: Linkedin, text: "LinkedIn", className: "bg-cyan-600 hover:bg-cyan-700" }
              ].map((link, index) => (
                <motion.a
                  key={link.text}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-white transition-all duration-300 ${link.className}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <link.icon className="w-4 h-4" />
                  {link.text}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;