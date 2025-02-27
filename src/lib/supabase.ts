import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch batch data from all related tables
export async function fetchBatchData(batchNumber: string) {
  try {
    // Fetch data from all tables related to this batch
    const [collectionResult, distributorResult, shopResult, logisticsResult] = await Promise.all([
      supabase
        .from('collection_centre')
        .select('*')
        .eq('batch_no', batchNumber)
        .maybeSingle(),
      supabase
        .from('distributor')
        .select('*')
        .eq('batch_no', batchNumber)
        .maybeSingle(),
      supabase
        .from('shop')
        .select('*')
        .eq('batch_no', batchNumber)
        .maybeSingle(),
      supabase
        .from('logistics')
        .select('*')
        .eq('batch_no', batchNumber)
        .maybeSingle()
    ]);
    
    // Combine all data into a single object
    const batchData = {
      batch_no: batchNumber,
      collection: collectionResult.data || null,
      distributor: distributorResult.data || null,
      shop: shopResult.data || null,
      logistics: logisticsResult.data || null
    };
    
    // If we have at least one piece of data, return the combined object
    if (batchData.collection || batchData.distributor || batchData.shop || batchData.logistics) {
      return batchData;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching batch data:', error);
    return null;
  }
}

// Function to get all unique batch numbers
export async function getAllBatches() {
  try {
    // Get batch numbers from all tables
    const [collectionResult, distributorResult, shopResult, logisticsResult] = await Promise.all([
      supabase.from('collection_centre').select('batch_no'),
      supabase.from('distributor').select('batch_no'),
      supabase.from('shop').select('batch_no'),
      supabase.from('logistics').select('batch_no')
    ]);
    
    // Combine all batch numbers and remove duplicates
    const allBatchNumbers = [
      ...(collectionResult.data || []),
      ...(distributorResult.data || []),
      ...(shopResult.data || []),
      ...(logisticsResult.data || [])
    ];
    
    // Extract unique batch numbers
    const uniqueBatchNumbers = [...new Set(allBatchNumbers.map(item => item.batch_no))];
    
    // Return as array of objects with batch_number property for compatibility
    return uniqueBatchNumbers.map(batch_no => ({ batch_number: batch_no }));
  } catch (error) {
    console.error('Error fetching all batches:', error);
    return [];
  }
}