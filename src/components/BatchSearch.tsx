import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface BatchSearchProps {
  onSearch: (batchNumber: string) => void;
  isLoading: boolean;
}

const BatchSearch: React.FC<BatchSearchProps> = ({ onSearch, isLoading }) => {
  const [batchNumber, setBatchNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchNumber.trim()) {
      onSearch(batchNumber.trim());
    }
  };

  // Text animation for placeholder
  const placeholderText = "Enter batch number...";
  const placeholderLetters = placeholderText.split("");

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.form 
        onSubmit={handleSubmit} 
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.input
          type="text"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          placeholder={placeholderText}
          className="w-full px-4 py-3 pl-12 pr-24 rounded-full border-2 border-primary-200 focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-sm"
          whileFocus={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primary-500" />
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <motion.button
            type="submit"
            disabled={isLoading || !batchNumber.trim()}
            className={`px-4 py-1.5 rounded-full bg-primary-500 text-white font-medium transition-colors duration-300 ${
              isLoading || !batchNumber.trim()
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:bg-primary-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <span className="flex items-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-1"
                />
                Searching
              </span>
            ) : (
              'Search'
            )}
          </motion.button>
        </div>
      </motion.form>
      <motion.div 
        className="text-center mt-3 text-sm text-primary-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-center space-x-2">
          {["Try", "searching", "for", "batch", "numbers", "like", "\"1\"", "or", "\"B001\""].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1), duration: 0.3 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BatchSearch;