import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Search } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 px-4"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-red-50 rounded-xl p-8 inline-flex items-center justify-center mb-4"
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
          <AlertCircle className="h-12 w-12 text-red-500" />
        </motion.div>
      </motion.div>
      <motion.h3 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl font-medium text-gray-900 mb-2"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="inline-block"
        >
          Batch
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="inline-block"
        >
          not
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="inline-block"
        >
          found
        </motion.span>
      </motion.h3>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-red-500 max-w-md mx-auto"
      >
        {message}
      </motion.p>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-500 mt-2 max-w-md mx-auto"
      >
        Please check the batch number and try again.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 flex flex-wrap justify-center gap-3"
      >
        {["1", "2", "B001", "B002"].map((suggestion, i) => (
          <motion.div
            key={suggestion}
            whileHover={{ scale: 1.05, backgroundColor: "#e6f0fe" }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 bg-gray-100 rounded-full text-primary-600 text-sm font-medium cursor-pointer flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + (i * 0.1), duration: 0.3 }}
          >
            <Search className="h-4 w-4 mr-1" />
            Try "{suggestion}"
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ErrorState;