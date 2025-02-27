/*
  # Add dairy tracking tables and sample data
  
  1. New Tables
    - `collection_centre` - Stores information about milk collection
    - `distributor` - Stores information about milk distribution
    - `logistics` - Stores information about milk transportation
    - `shop` - Stores information about retail shops receiving milk
  
  2. Sample Data
    - Added sample data for each table with batch numbers 1-5
*/

-- Create collection_centre table if it doesn't exist
CREATE TABLE IF NOT EXISTS collection_centre (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_no text NOT NULL,
  location text NOT NULL,
  quantity_of_milk numeric NOT NULL,
  breed_of_cow text NOT NULL,
  farmer_id text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create distributor table if it doesn't exist
CREATE TABLE IF NOT EXISTS distributor (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_no text NOT NULL,
  distributor_id text NOT NULL,
  location text NOT NULL,
  quantity numeric NOT NULL,
  storage_conditions text NOT NULL,
  receiving_timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create logistics table if it doesn't exist
CREATE TABLE IF NOT EXISTS logistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_no text NOT NULL,
  receiving_location text NOT NULL,
  distance_travelled numeric NOT NULL,
  temperature numeric NOT NULL,
  environment_conditions text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create shop table if it doesn't exist
CREATE TABLE IF NOT EXISTS shop (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_no text NOT NULL,
  storage_conditions text NOT NULL,
  number_of_packets_received integer NOT NULL,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE collection_centre ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributor ENABLE ROW LEVEL SECURITY;
ALTER TABLE logistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop ENABLE ROW LEVEL SECURITY;

-- Create policies for all tables
DO $$ 
BEGIN
  -- Collection Centre policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'collection_centre' AND policyname = 'Anyone can read collection_centre'
  ) THEN
    CREATE POLICY "Anyone can read collection_centre"
      ON collection_centre
      FOR SELECT
      TO authenticated, anon
      USING (true);
  END IF;

  -- Distributor policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'distributor' AND policyname = 'Anyone can read distributor'
  ) THEN
    CREATE POLICY "Anyone can read distributor"
      ON distributor
      FOR SELECT
      TO authenticated, anon
      USING (true);
  END IF;

  -- Logistics policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'logistics' AND policyname = 'Anyone can read logistics'
  ) THEN
    CREATE POLICY "Anyone can read logistics"
      ON logistics
      FOR SELECT
      TO authenticated, anon
      USING (true);
  END IF;

  -- Shop policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'shop' AND policyname = 'Anyone can read shop'
  ) THEN
    CREATE POLICY "Anyone can read shop"
      ON shop
      FOR SELECT
      TO authenticated, anon
      USING (true);
  END IF;
END $$;

-- Insert sample data for collection_centre
INSERT INTO collection_centre (batch_no, location, quantity_of_milk, breed_of_cow, farmer_id, timestamp)
VALUES 
  ('1', 'Amritsar, Punjab', 500, 'Holstein Friesian', 'F001', '2025-01-10 08:30:00'),
  ('2', 'Anand, Gujarat', 750, 'Gir', 'F002', '2025-01-11 07:45:00'),
  ('3', 'Karnal, Haryana', 600, 'Sahiwal', 'F003', '2025-01-12 09:15:00'),
  ('4', 'Kolar, Karnataka', 450, 'Jersey', 'F004', '2025-01-13 08:00:00'),
  ('5', 'Baramati, Maharashtra', 800, 'Murrah Buffalo', 'F005', '2025-01-14 07:30:00'),
  ('B001', 'Ludhiana, Punjab', 550, 'Holstein Friesian', 'F006', '2025-01-15 08:45:00'),
  ('B002', 'Mehsana, Gujarat', 700, 'Mehsana Buffalo', 'F007', '2025-01-16 09:00:00'),
  ('B003', 'Sonipat, Haryana', 650, 'Sahiwal', 'F008', '2025-01-17 08:15:00'),
  ('B004', 'Mysore, Karnataka', 500, 'Jersey', 'F009', '2025-01-18 07:45:00'),
  ('B005', 'Nashik, Maharashtra', 850, 'Murrah Buffalo', 'F010', '2025-01-19 08:30:00');

-- Insert sample data for distributor
INSERT INTO distributor (batch_no, distributor_id, location, quantity, storage_conditions, receiving_timestamp)
VALUES 
  ('1', 'D001', 'Delhi NCR', 480, 'Refrigerated at 4°C', '2025-01-10 12:30:00'),
  ('2', 'D002', 'Ahmedabad', 730, 'Refrigerated at 3°C', '2025-01-11 11:45:00'),
  ('3', 'D003', 'Chandigarh', 590, 'Refrigerated at 4°C', '2025-01-12 13:15:00'),
  ('4', 'D004', 'Bangalore', 440, 'Refrigerated at 3.5°C', '2025-01-13 12:00:00'),
  ('5', 'D005', 'Pune', 780, 'Refrigerated at 4°C', '2025-01-14 11:30:00'),
  ('B001', 'D006', 'Delhi NCR', 530, 'Refrigerated at 4°C', '2025-01-15 12:45:00'),
  ('B002', 'D007', 'Ahmedabad', 680, 'Refrigerated at 3°C', '2025-01-16 13:00:00'),
  ('B003', 'D008', 'Chandigarh', 630, 'Refrigerated at 4°C', '2025-01-17 12:15:00'),
  ('B004', 'D009', 'Bangalore', 480, 'Refrigerated at 3.5°C', '2025-01-18 11:45:00'),
  ('B005', 'D010', 'Pune', 830, 'Refrigerated at 4°C', '2025-01-19 12:30:00');

-- Insert sample data for logistics
INSERT INTO logistics (batch_no, receiving_location, distance_travelled, temperature, environment_conditions, timestamp)
VALUES 
  ('1', 'Delhi Warehouse', 250, 4.2, 'Refrigerated truck, humidity controlled', '2025-01-10 16:30:00'),
  ('2', 'Ahmedabad Warehouse', 120, 3.8, 'Refrigerated truck, humidity controlled', '2025-01-11 15:45:00'),
  ('3', 'Chandigarh Warehouse', 180, 4.1, 'Refrigerated truck, humidity controlled', '2025-01-12 17:15:00'),
  ('4', 'Bangalore Warehouse', 150, 3.9, 'Refrigerated truck, humidity controlled', '2025-01-13 16:00:00'),
  ('5', 'Pune Warehouse', 100, 4.0, 'Refrigerated truck, humidity controlled', '2025-01-14 15:30:00'),
  ('B001', 'Delhi Warehouse', 270, 4.1, 'Refrigerated truck, humidity controlled', '2025-01-15 16:45:00'),
  ('B002', 'Ahmedabad Warehouse', 130, 3.7, 'Refrigerated truck, humidity controlled', '2025-01-16 17:00:00'),
  ('B003', 'Chandigarh Warehouse', 190, 4.0, 'Refrigerated truck, humidity controlled', '2025-01-17 16:15:00'),
  ('B004', 'Bangalore Warehouse', 160, 3.8, 'Refrigerated truck, humidity controlled', '2025-01-18 15:45:00'),
  ('B005', 'Pune Warehouse', 110, 4.1, 'Refrigerated truck, humidity controlled', '2025-01-19 16:30:00');

-- Insert sample data for shop
INSERT INTO shop (batch_no, storage_conditions, number_of_packets_received, timestamp)
VALUES 
  ('1', 'Refrigerated display at 4°C', 960, '2025-01-10 18:30:00'),
  ('2', 'Refrigerated display at 4°C', 1460, '2025-01-11 17:45:00'),
  ('3', 'Refrigerated display at 4°C', 1180, '2025-01-12 19:15:00'),
  ('4', 'Refrigerated display at 4°C', 880, '2025-01-13 18:00:00'),
  ('5', 'Refrigerated display at 4°C', 1560, '2025-01-14 17:30:00'),
  ('B001', 'Refrigerated display at 4°C', 1060, '2025-01-15 18:45:00'),
  ('B002', 'Refrigerated display at 4°C', 1360, '2025-01-16 19:00:00'),
  ('B003', 'Refrigerated display at 4°C', 1260, '2025-01-17 18:15:00'),
  ('B004', 'Refrigerated display at 4°C', 960, '2025-01-18 17:45:00'),
  ('B005', 'Refrigerated display at 4°C', 1660, '2025-01-19 18:30:00');