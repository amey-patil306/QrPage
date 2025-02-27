import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { fetchBatchData, getAllBatches } from './lib/supabase';
import BatchSearch from './components/BatchSearch';
import BatchDetails from './components/BatchDetails';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';

function App() {
  const [batchData, setBatchData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [batchNumbers, setBatchNumbers] = useState<string[]>([]);

  // Fetch available batch numbers on component mount
  useEffect(() => {
    const fetchBatchNumbers = async () => {
      try {
        const batches = await getAllBatches();
        if (batches && batches.length > 0) {
          setBatchNumbers(batches.map((batch: any) => batch.batch_number));
        }
      } catch (err) {
        console.error('Error fetching batch numbers:', err);
      }
    };

    fetchBatchNumbers();
  }, []);

  const handleSearch = async (batchNumber: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchBatchData(batchNumber);
      if (data) {
        setBatchData(data);
      } else {
        setError(`No data found for batch number ${batchNumber}`);
        setBatchData(null);
      }
    } catch (err) {
      setError('An error occurred while fetching the batch data');
      setBatchData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary-200 opacity-20 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-secondary-300 opacity-20 blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[30%] w-40 h-40 rounded-full bg-primary-300 opacity-10 blur-2xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        variants={itemVariants}
        className="bg-white shadow-md sticky top-0 z-10 border-b border-primary-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <motion.div 
              className="flex items-center justify-center sm:justify-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Database className="h-10 w-10 text-primary-500" />
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-primary-200 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div className="ml-3">
                <motion.h1 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  BlockBasket
                </motion.h1>
                <motion.p
                  className="text-xs text-primary-400 font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Transparent Supply Chain Management
                </motion.p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                className="text-primary-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Quality Dairy Products
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Search Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-primary-100"
        >
          <motion.h2 
            className="text-xl font-semibold text-primary-600 mb-4 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block animate-pulse-slow">Search</span> for Batch Information
          </motion.h2>
          <BatchSearch onSearch={handleSearch} isLoading={isLoading} />
        </motion.div>

        {/* Results Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-8"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"
              ></motion.div>
            </div>
          ) : error ? (
            <ErrorState message={error} />
          ) : batchData ? (
            <BatchDetails batchData={batchData} />
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        variants={itemVariants}
        className="bg-white border-t border-primary-100 mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.p 
            className="text-center text-primary-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            © {new Date().getFullYear()} BlockBasket - Quality Dairy Products
          </motion.p>
        </div>
      </motion.footer>
    </motion.div>
  );
}

export default App;