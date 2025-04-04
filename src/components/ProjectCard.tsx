import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProjectCardProps {
  title: string;
  description: string;
  techniques: string[];
  benefits: string[];
  imageUrl: string;
  guideUrl: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techniques,
  benefits,
  imageUrl,
  guideUrl,
  index,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      x: index % 2 === 0 ? -50 : 50
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.2
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden"
    >
      <motion.div
        className="aspect-video relative overflow-hidden"
        whileHover="hover"
      >
        <motion.img
          variants={imageVariants}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-teal-600/30 flex items-center justify-center"
        >
          <span className="text-white font-semibold">Begin Practice</span>
        </motion.div>
      </motion.div>
      
      <div className="p-6">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-white mb-3"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 mb-4"
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <h4 className="text-sm font-medium text-teal-400 mb-2">Techniques</h4>
          <div className="flex flex-wrap gap-2">
            {techniques.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-teal-900/50 rounded-full text-xs text-teal-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h4 className="text-sm font-medium text-teal-400 mb-2">Benefits</h4>
          <ul className="list-disc list-inside text-gray-300 text-sm">
            {benefits.map((benefit, i) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {benefit}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.a
          href={guideUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, x: 5 }}
          className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
        >
          View Guide
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;