import React from 'react';
import { motion } from 'framer-motion';
import { Search, Database } from 'lucide-react';

const EmptyState: React.FC = () => {
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5
      }
    })
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: (custom: number) => ({
      y: [0, -10, 0],
      transition: {
        delay: custom * 0.3,
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 px-4"
    >
      <div className="flex justify-center mb-6 space-x-4">
        <motion.div
          custom={0}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="bg-primary-50 rounded-full p-4 inline-flex items-center justify-center"
        >
          <motion.div
            custom={0}
            variants={floatVariants}
            initial="initial"
            animate="animate"
          >
            <Database className="h-8 w-8 text-primary-500" />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.div 
          className="bg-primary-50 rounded-xl p-8 inline-flex items-center justify-center mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Search className="h-12 w-12 text-primary-500" />
          </motion.div>
        </motion.div>
        <motion.h3 
          className="text-xl font-medium text-gray-900 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="inline-block"
          >
            No
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
            className="inline-block"
          >
            batch
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            className="inline-block"
          >
            selected
          </motion.span>
        </motion.h3>
        <motion.p 
          className="text-gray-500 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Enter a batch number in the search box above to view detailed information about the dairy batch.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {["1", "2", "B001", "B002"].map((suggestion, i) => (
            <motion.div
              key={suggestion}
              whileHover={{ scale: 1.05, backgroundColor: "#e6f0fe" }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-gray-100 rounded-full text-primary-600 text-sm font-medium cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + (i * 0.1), duration: 0.3 }}
            >
              Try "{suggestion}"
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;