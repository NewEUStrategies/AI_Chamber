/*
# Membership applications table for AI Chamber recruitment cockpit

1. New Tables
- `membership_applications`
  - `id` (uuid, primary key) — unique application identifier
  - `company_name` (text) — applicant company name
  - `contact_name` (text) — person submitting the application
  - `email` (text) — contact email
  - `phone` (text) — contact phone (nullable)
  - `website` (text) — company website (nullable)
  - `country` (text) — CEE country of origin
  - `city` (text) — city (nullable)
  - `sector` (text) — industry/sector
  - `company_size` (text) — micro / small / medium
  - `employees` (int) — number of employees (nullable)
  - `ai_maturity` (text) — exploring / implementing / advanced
  - `motivation` (text) — free-text motivation
  - `status` (text) — pipeline stage: new / in_review / interview / accepted / rejected / withdrawn (default: new)
  - `score` (int) — internal evaluation score 0-100 (nullable)
  - `reviewer` (text) — assigned reviewer name (nullable)
  - `notes` (text) — internal notes (nullable)
  - `submitted_at` (timestamptz) — when the application arrived (default: now)
  - `created_at` / `updated_at` (timestamptz) — row bookkeeping
2. Indexes
- Index on `status`, `submitted_at`, `country` for cockpit filtering.
3. Security
- RLS enabled. This is a single-tenant internal tool with no sign-in screen,
  so all CRUD is intentionally open to `anon, authenticated` (shared data).
- Four separate policies: select / insert / update / delete.
4. Seed data
- Inserts ~14 sample applications across CEE countries and statuses so the
  cockpit renders meaningfully before real data is supplied.
*/

CREATE TABLE IF NOT EXISTS membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  website text,
  country text NOT NULL DEFAULT 'Poland',
  city text,
  sector text NOT NULL DEFAULT 'Other',
  company_size text NOT NULL DEFAULT 'small',
  employees int,
  ai_maturity text NOT NULL DEFAULT 'exploring',
  motivation text,
  status text NOT NULL DEFAULT 'new',
  score int,
  reviewer text,
  notes text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_status ON membership_applications (status);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON membership_applications (submitted_at);
CREATE INDEX IF NOT EXISTS idx_applications_country ON membership_applications (country);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_applications" ON membership_applications;
CREATE POLICY "anon_select_applications"
ON membership_applications FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_applications" ON membership_applications;
CREATE POLICY "anon_insert_applications"
ON membership_applications FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_applications" ON membership_applications;
CREATE POLICY "anon_update_applications"
ON membership_applications FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_applications" ON membership_applications;
CREATE POLICY "anon_delete_applications"
ON membership_applications FOR DELETE
TO anon, authenticated USING (true);

-- Seed sample data (only if the table is empty)
INSERT INTO membership_applications
  (company_name, contact_name, email, phone, website, country, city, sector, company_size, employees, ai_maturity, motivation, status, score, reviewer, notes, submitted_at)
SELECT * FROM (VALUES
  ('VisaLab sp. z o.o.', 'Marta Kowalczyk', 'marta@visalab.pl', '+48 601 234 567', 'https://visalab.pl', 'Poland', 'Warsaw', 'RegTech', 'small', 34, 'advanced', 'Automating cross-border compliance checks with LLM pipelines.', 'new', NULL, NULL, NULL, now() - interval '1 day'),
  ('DataBridge s.r.o.', 'Jiri Novak', 'jiri@databridge.cz', '+420 777 123 456', 'https://databridge.cz', 'Czechia', 'Prague', 'Data Analytics', 'medium', 85, 'implementing', 'We want to expand regionally and shape EU AI policy.', 'in_review', 72, 'Tomasz Snażyk', 'Strong product-market fit in retail analytics.', now() - interval '3 days'),
  ('BalticBrain UAB', 'Liga Kalnina', 'liga@balticbrain.lt', '+370 699 887 76', 'https://balticbrain.lt', 'Lithuania', 'Vilnius', 'AI R&D', 'small', 22, 'advanced', 'Research-driven NLP for Baltic languages.', 'interview', 81, 'Tomasz Snażyk', 'Schedule call for next week.', now() - interval '5 days'),
  ('MediScribe d.o.o.', 'Ana Horvat', 'ana@mediscribe.hr', NULL, 'https://mediscribe.hr', 'Croatia', 'Zagreb', 'HealthTech', 'micro', 9, 'exploring', 'Early-stage clinical documentation assistant.', 'new', NULL, NULL, NULL, now() - interval '2 days'),
  ('AgroSense Kft.', 'Peter Szabo', 'peter@agrosense.hu', '+36 20 555 6677', 'https://agrosense.hu', 'Hungary', 'Budapest', 'AgriTech', 'small', 41, 'implementing', 'Satellite + ML crop optimization for CEE farms.', 'in_review', 64, NULL, 'Needs financial review.', now() - interval '6 days'),
  ('LexMachina S.A.', 'Ioana Popescu', 'ioana@lexmachina.ro', '+40 722 334 556', 'https://lexmachina.ro', 'Romania', 'Bucharest', 'LegalTech', 'medium', 120, 'advanced', 'Legal research copilot across 12 jurisdictions.', 'accepted', 93, 'Board Review', 'Approved unanimously at board meeting.', now() - interval '12 days'),
  ('SmartFactory Popov', 'Marek Popov', 'marek@smartfactory.sk', NULL, NULL, 'Slovakia', 'Bratislava', 'Manufacturing', 'medium', 95, 'implementing', 'Predictive maintenance for industrial lines.', 'interview', 78, 'Tomasz Snażyk', NULL, now() - interval '8 days'),
  ('NordVision OÜ', 'Kaarel Tamm', 'kaarel@nordvision.ee', '+372 5566 7788', 'https://nordvision.ee', 'Estonia', 'Tallinn', 'Cybersecurity', 'small', 28, 'advanced', 'Threat detection models for EU infrastructure.', 'accepted', 88, 'Board Review', 'Strong policy alignment.', now() - interval '15 days'),
  ('GreenPulse sp. z o.o.', 'Katarzyna Nowak', 'katarzyna@greenpulse.pl', '+48 512 987 654', 'https://greenpulse.pl', 'Poland', 'Kraków', 'EnergyTech', 'small', 39, 'exploring', 'Grid-load forecasting with renewables mix.', 'rejected', 41, NULL, 'Product too early; reapply in 6 months.', now() - interval '10 days'),
  ('CreditMind AD', 'Georgi Ivanov', 'georgi@creditmind.bg', '+359 888 112 233', 'https://creditmind.bg', 'Bulgaria', 'Sofia', 'FinTech', 'small', 45, 'implementing', 'Credit risk scoring for SME lending.', 'new', NULL, NULL, NULL, now() - interval '4 hours'),
  ('VisionQube LLC', 'Olena Shevchenko', 'olena@visionqube.ua', NULL, 'https://visionqube.ua', 'Ukraine', 'Kyiv', 'Computer Vision', 'small', 31, 'advanced', 'Quality control vision systems for manufacturing.', 'in_review', 69, NULL, NULL, now() - interval '2 days'),
  ('TextFlow UAB', 'Romas Grigas', 'romas@textflow.lt', '+370 688 554 433', NULL, 'Lithuania', 'Kaunas', 'MarTech', 'micro', 8, 'exploring', 'Multilingual campaign generation.', 'withdrawn', NULL, NULL, 'Withowned by applicant - joined another network.', now() - interval '20 days'),
  ('CyberHedge d.o.o.', 'Marko Kovač', 'marko@cyberhedge.si', '+386 41 555 123', 'https://cyberhedge.si', 'Slovenia', 'Ljubljana', 'Cybersecurity', 'small', 26, 'advanced', 'AI-driven SOC automation.', 'interview', 74, 'Tomasz Snażyk', 'Second interview pending.', now() - interval '7 days'),
  ('RailOptim Zrt.', 'Zoltan Nagy', 'zoltan@railoptim.hu', NULL, NULL, 'Hungary', 'Debrecen', 'Logistics', 'medium', 110, 'implementing', 'Rail freight routing optimization.', 'new', NULL, NULL, NULL, now() - interval '9 hours'),
  ('EduSpark s.r.o.', 'Lucia Benova', 'lucia@eduspark.sk', '+421 903 442 118', 'https://eduspark.sk', 'Slovakia', 'Košice', 'EdTech', 'micro', 12, 'exploring', 'Adaptive learning for vocational schools.', 'in_review', 55, NULL, 'Borderline - discuss at weekly review.', now() - interval '4 days')
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM membership_applications);