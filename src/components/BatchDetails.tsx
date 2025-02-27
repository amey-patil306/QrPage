import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Milk, Calendar, Tag, Clock, User, Clipboard, BarChart, Truck, Store, Factory, MapPin, Thermometer, Package, Database, ArrowRight, ArrowDown } from 'lucide-react';

interface BatchDetailsProps {
  batchData: any;
}

const BatchDetails: React.FC<BatchDetailsProps> = ({ batchData }) => {
  if (!batchData) return null;

  const formatDate = (timestamp: string) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString();
  };

  const formatTime = (timestamp: string) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleTimeString();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Supply chain nodes
  const supplyChainNodes = [
    {
      id: 'collection',
      title: 'Collection Centre',
      icon: <Database className="h-8 w-8 text-white" />,
      data: batchData.collection,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-500',
      textColor: 'text-primary-700'
    },
    {
      id: 'distributor',
      title: 'Distributor',
      icon: <Factory className="h-8 w-8 text-white" />,
      data: batchData.distributor,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-500',
      textColor: 'text-secondary-700'
    },
    {
      id: 'logistics',
      title: 'Logistics',
      icon: <Truck className="h-8 w-8 text-white" />,
      data: batchData.logistics,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-700'
    },
    {
      id: 'shop',
      title: 'Shop',
      icon: <Store className="h-8 w-8 text-white" />,
      data: batchData.shop,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-700'
    }
  ];

  // Filter out nodes with no data
  const availableNodes = supplyChainNodes.filter(node => node.data);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary-100"
    >
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
        <motion.h2 
          variants={textVariants}
          className="text-xl md:text-2xl font-bold text-white flex items-center"
        >
          <Tag className="mr-2 h-6 w-6" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Batch #{batchData.batch_no} Details
          </motion.span>
        </motion.h2>
      </div>

      {/* Supply Chain Flow Visualization */}
      <motion.div 
        variants={itemVariants}
        className="p-4 md:p-6 bg-gray-50"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block"
          >
            Supply
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            Chain
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block"
          >
            Journey
          </motion.span>
        </h3>

        {/* Desktop Journey Visualization */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            
            {/* Nodes and Arrows */}
            <div className="flex items-center justify-between relative z-10">
              {availableNodes.map((node, index) => (
                <React.Fragment key={node.id}>
                  {/* Node */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: index * 0.2, duration: 0.5 }
                      }}
                      whileHover={{ scale: 1.05 }}
                      className={`flex flex-col items-center justify-center bg-gradient-to-r ${node.color} p-4 rounded-lg shadow-md min-w-[140px] text-white relative z-20`}
                    >
                      <div className="relative">
                        {node.icon}
                        <motion.div 
                          className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                        />
                      </div>
                      <p className="mt-2 font-medium text-center">{node.title}</p>
                      <p className="text-xs opacity-80">
                        {node.data.timestamp ? formatDate(node.data.timestamp) : 
                        node.data.receiving_timestamp ? formatDate(node.data.receiving_timestamp) : ''}
                      </p>
                    </motion.div>
                    
                    {/* Date Indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                      className={`mt-2 text-xs font-medium ${node.textColor}`}
                    >
                      {node.data.timestamp ? formatTime(node.data.timestamp) : 
                      node.data.receiving_timestamp ? formatTime(node.data.receiving_timestamp) : ''}
                    </motion.div>
                  </div>
                  
                  {/* Arrow between nodes */}
                  {index < availableNodes.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scaleX: 1,
                        transition: { delay: index * 0.2 + 0.1, duration: 0.4 }
                      }}
                      className="flex items-center justify-center z-10"
                    >
                      <motion.div
                        animate={{ 
                          x: [0, 10, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          delay: index * 0.2
                        }}
                      >
                        <ArrowRight className="h-8 w-8 text-primary-400" />
                      </motion.div>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Journey Visualization */}
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-4">
            {availableNodes.map((node, index) => (
              <React.Fragment key={node.id}>
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: index * 0.2, duration: 0.5 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col items-center justify-center bg-gradient-to-r ${node.color} p-4 rounded-lg shadow-md w-full max-w-[200px] text-white`}
                >
                  <div className="relative">
                    {node.icon}
                    <motion.div 
                      className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                    />
                  </div>
                  <p className="mt-2 font-medium text-center">{node.title}</p>
                  <p className="text-xs opacity-80">
                    {node.data.timestamp ? formatDate(node.data.timestamp) : 
                    node.data.receiving_timestamp ? formatDate(node.data.receiving_timestamp) : ''}
                  </p>
                </motion.div>
                
                {/* Arrow between nodes */}
                {index < availableNodes.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scaleY: 1,
                      transition: { delay: index * 0.2 + 0.1, duration: 0.4 }
                    }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, 5, 0],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        delay: index * 0.2
                      }}
                    >
                      <ArrowDown className="h-6 w-6 text-primary-400" />
                    </motion.div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detailed Information */}
      <div className="p-4 md:p-6 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {/* Collection Centre Section */}
        {batchData.collection && (
          <motion.div
            variants={itemVariants}
            className="bg-primary-50 rounded-lg p-4 border border-primary-100 hover:shadow-md transition-shadow"
          >
            <motion.h3 
              variants={textVariants}
              className="text-lg font-semibold text-primary-700 mb-3 flex items-center"
            >
              <div className="p-1.5 bg-primary-500 rounded-md mr-2">
                <Database className="h-5 w-5 text-white" />
              </div>
              Collection Centre
            </motion.h3>
            <div className="space-y-3">
              <motion.div variants={textVariants} className="flex items-start">
                <MapPin className="text-primary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-600 font-medium">Location</p>
                  <p className="text-gray-800">{batchData.collection.location || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Droplets className="text-primary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-600 font-medium">Quantity of Milk</p>
                  <p className="text-gray-800">{batchData.collection.quantity_of_milk || 'N/A'} liters</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Milk className="text-primary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-600 font-medium">Breed of Cow</p>
                  <p className="text-gray-800">{batchData.collection.breed_of_cow || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <User className="text-primary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-600 font-medium">Farmer ID</p>
                  <p className="text-gray-800">{batchData.collection.farmer_id || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Calendar className="text-primary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-600 font-medium">Collection Timestamp</p>
                  <p className="text-gray-800">{formatDate(batchData.collection.timestamp)} {formatTime(batchData.collection.timestamp)}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Distributor Section */}
        {batchData.distributor && (
          <motion.div
            variants={itemVariants}
            className="bg-secondary-50 rounded-lg p-4 border border-secondary-100 hover:shadow-md transition-shadow"
          >
            <motion.h3 
              variants={textVariants}
              className="text-lg font-semibold text-secondary-700 mb-3 flex items-center"
            >
              <div className="p-1.5 bg-secondary-500 rounded-md mr-2">
                <Factory className="h-5 w-5 text-white" />
              </div>
              Distributor
            </motion.h3>
            <div className="space-y-3">
              <motion.div variants={textVariants} className="flex items-start">
                <User className="text-secondary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-600 font-medium">Distributor ID</p>
                  <p className="text-gray-800">{batchData.distributor.distributor_id || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <MapPin className="text-secondary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-600 font-medium">Location</p>
                  <p className="text-gray-800">{batchData.distributor.location || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Droplets className="text-secondary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-600 font-medium">Quantity</p>
                  <p className="text-gray-800">{batchData.distributor.quantity || 'N/A'} liters</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Package className="text-secondary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-600 font-medium">Storage Conditions</p>
                  <p className="text-gray-800">{batchData.distributor.storage_conditions || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Calendar className="text-secondary-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-600 font-medium">Receiving Timestamp</p>
                  <p className="text-gray-800">{formatDate(batchData.distributor.receiving_timestamp)} {formatTime(batchData.distributor.receiving_timestamp)}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Logistics Section */}
        {batchData.logistics && (
          <motion.div
            variants={itemVariants}
            className="bg-amber-50 rounded-lg p-4 border border-amber-100 hover:shadow-md transition-shadow"
          >
            <motion.h3 
              variants={textVariants}
              className="text-lg font-semibold text-amber-700 mb-3 flex items-center"
            >
              <div className="p-1.5 bg-amber-500 rounded-md mr-2">
                <Truck className="h-5 w-5 text-white" />
              </div>
              Logistics
            </motion.h3>
            <div className="space-y-3">
              <motion.div variants={textVariants} className="flex items-start">
                <MapPin className="text-amber-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-600 font-medium">Receiving Location</p>
                  <p className="text-gray-800">{batchData.logistics.receiving_location || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Truck className="text-amber-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-600 font-medium">Distance Travelled</p>
                  <p className="text-gray-800">{batchData.logistics.distance_travelled || 'N/A'} km</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Thermometer className="text-amber-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-600 font-medium">Temperature</p>
                  <p className="text-gray-800">{batchData.logistics.temperature || 'N/A'}°C</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Clipboard className="text-amber-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-600 font-medium">Environment Conditions</p>
                  <p className="text-gray-800">{batchData.logistics.environment_conditions || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Calendar className="text-amber-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-600 font-medium">Timestamp</p>
                  <p className="text-gray-800">{formatDate(batchData.logistics.timestamp)} {formatTime(batchData.logistics.timestamp)}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Shop Section */}
        {batchData.shop && (
          <motion.div
            variants={itemVariants}
            className="bg-purple-50 rounded-lg p-4 border border-purple-100 hover:shadow-md transition-shadow"
          >
            <motion.h3 
              variants={textVariants}
              className="text-lg font-semibold text-purple-700 mb-3 flex items-center"
            >
              <div className="p-1.5 bg-purple-500 rounded-md mr-2">
                <Store className="h-5 w-5 text-white" />
              </div>
              Shop
            </motion.h3>
            <div className="space-y-3">
              <motion.div variants={textVariants} className="flex items-start">
                <Package className="text-purple-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Storage Conditions</p>
                  <p className="text-gray-800">{batchData.shop.storage_conditions || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Package className="text-purple-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Number of Packets Received</p>
                  <p className="text-gray-800">{batchData.shop.number_of_packets_received || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div variants={textVariants} className="flex items-start">
                <Calendar className="text-purple-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Timestamp</p>
                  <p className="text-gray-800">{formatDate(batchData.shop.timestamp)} {formatTime(batchData.shop.timestamp)}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BatchDetails;