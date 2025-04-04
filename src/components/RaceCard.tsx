import React from 'react';
import { Calendar, MapPin, Clock, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RaceCardProps {
  date: string;
  location: string;
  practice: string;
  duration: string;
  focus: string;
  insights: string;
  imageUrl: string;
  index: number;
}

const RaceCard: React.FC<RaceCardProps> = ({
  date,
  location,
  practice,
  duration,
  focus,
  insights,
  imageUrl,
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
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden"
    >
      <motion.div
        className="aspect-video relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={imageUrl}
          alt={`${practice} at ${location}`}
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-purple-600/30 flex items-center justify-center"
        >
          <span className="text-white font-semibold">View Session Details</span>
        </motion.div>
      </motion.div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white">{practice}</h3>
            <div className="flex items-center gap-2 text-gray-300 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-teal-400"
          >
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-gray-300"
          >
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-gray-300"
          >
            <Moon className="w-4 h-4" />
            <span>{focus}</span>
          </motion.div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-300 text-sm"
        >
          {insights}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default RaceCard;