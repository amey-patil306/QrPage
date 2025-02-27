/*
  # Create batches table for dairy products

  1. New Tables
    - `batches`
      - `id` (uuid, primary key)
      - `batch_number` (text, unique)
      - `production_date` (timestamp)
      - `expiry_date` (timestamp)
      - `milk_type` (text)
      - `fat_content` (numeric)
      - `volume` (numeric)
      - `quality_grade` (text)
      - `inspector_name` (text)
      - `notes` (text)
  2. Security
    - Enable RLS on `batches` table
    - Add policy for authenticated users to read all batches
    - Add policy for authenticated users to insert batches
*/

-- Create the batches table
CREATE TABLE IF NOT EXISTS batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_number text UNIQUE NOT NULL,
  production_date timestamptz NOT NULL DEFAULT now(),
  expiry_date timestamptz NOT NULL,
  milk_type text NOT NULL,
  fat_content numeric NOT NULL,
  volume numeric NOT NULL,
  quality_grade text NOT NULL,
  inspector_name text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read batches"
  ON batches
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can insert batches"
  ON batches
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert sample data
INSERT INTO batches (batch_number, production_date, expiry_date, milk_type, fat_content, volume, quality_grade, inspector_name, notes)
VALUES 
  ('B001', '2025-01-15', '2025-02-15', 'Cow', 3.5, 1000, 'A', 'John Smith', 'Premium quality milk from Jersey cows'),
  ('B002', '2025-01-16', '2025-02-16', 'Buffalo', 7.2, 800, 'A+', 'Maria Garcia', 'High fat content, suitable for cream production'),
  ('B003', '2025-01-17', '2025-02-17', 'Cow', 1.5, 1200, 'B', 'David Johnson', 'Low-fat milk batch'),
  ('B004', '2025-01-18', '2025-02-18', 'Goat', 4.1, 500, 'A', 'Sarah Williams', 'Specialty milk for sensitive digestion'),
  ('B005', '2025-01-19', '2025-02-19', 'Buffalo', 8.0, 750, 'A+', 'James Brown', 'Premium buffalo milk for mozzarella production');