-- Create storage bucket for vessel images
INSERT INTO storage.buckets (id, name, public) VALUES ('vessel-images', 'vessel-images', true);

-- Create vessels table
CREATE TABLE public.vessels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER,
  price_per_hour DECIMAL(10,2),
  features TEXT[],
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vessel_images table
CREATE TABLE public.vessel_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vessel_id UUID NOT NULL REFERENCES public.vessels(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vessels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vessel_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Vessels are publicly readable" 
ON public.vessels 
FOR SELECT 
USING (true);

CREATE POLICY "Vessel images are publicly readable" 
ON public.vessel_images 
FOR SELECT 
USING (true);

-- Create policies for admin access (authenticated users)
CREATE POLICY "Authenticated users can manage vessels" 
ON public.vessels 
FOR ALL 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage vessel images" 
ON public.vessel_images 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create storage policies
CREATE POLICY "Vessel images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'vessel-images');

CREATE POLICY "Authenticated users can upload vessel images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'vessel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update vessel images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'vessel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete vessel images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'vessel-images' AND auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_vessel_images_vessel_id ON public.vessel_images(vessel_id);
CREATE INDEX idx_vessel_images_order ON public.vessel_images(vessel_id, display_order);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_vessels_updated_at
BEFORE UPDATE ON public.vessels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing vessel data
INSERT INTO public.vessels (name, description, capacity, price_per_hour, features, specifications) VALUES
('Lancha Premium', 'Embarcação de luxo para passeios exclusivos', 8, 800.00, ARRAY['Bar', 'Som', 'Churrasqueira'], '{"length": "45 pés", "engine": "Twin 350HP", "year": "2023"}'),
('Iate Executive', 'Iate executivo para eventos corporativos', 12, 1200.00, ARRAY['Sala de reunião', 'Wi-Fi', 'Catering'], '{"length": "60 pés", "engine": "Twin 500HP", "year": "2022"}'),
('Catamaran Blau', 'Catamarã espaçoso para grupos grandes', 20, 1500.00, ARRAY['Deck amplo', 'Bar', 'Área de descanso'], '{"length": "50 pés", "engine": "Twin 300HP", "year": "2021"}'),
('Yacht Prestige', 'Yacht de prestígio para ocasiões especiais', 10, 2000.00, ARRAY['Suíte master', 'Jacuzzi', 'Chef a bordo'], '{"length": "70 pés", "engine": "Twin 700HP", "year": "2023"}'),
('Nossa Senhora Yacht', 'Yacht clássico para passeios familiares', 6, 600.00, ARRAY['Sala de estar', 'Cozinha', 'Solarium'], '{"length": "40 pés", "engine": "Single 250HP", "year": "2020"}'),
('Seven Seas', 'Embarcação moderna para aventuras', 14, 900.00, ARRAY['Equipamento de pesca', 'Deck', 'Som'], '{"length": "48 pés", "engine": "Twin 400HP", "year": "2022"}'),
('Mangata Luxury', 'Luxo e conforto em alto mar', 8, 1100.00, ARRAY['Bar premium', 'Ar condicionado', 'Área VIP'], '{"length": "55 pés", "engine": "Twin 450HP", "year": "2023"}'),
('Comendador', 'Yacht tradicional com elegância', 10, 850.00, ARRAY['Sala de jantar', 'Deck superior', 'Bar'], '{"length": "52 pés", "engine": "Twin 380HP", "year": "2021"}'),
('Lady Ruth', 'Embarcação feminina e sofisticada', 6, 700.00, ARRAY['Decoração exclusiva', 'Som ambiente', 'Bar'], '{"length": "42 pés", "engine": "Twin 320HP", "year": "2022"}'),
('Dragão dos Mares', 'Potência e velocidade no mar', 12, 1300.00, ARRAY['Motor potente', 'Design esportivo', 'Som'], '{"length": "58 pés", "engine": "Twin 600HP", "year": "2023"}'),
('Oceano Azul', 'Catamarã para relaxamento', 16, 1000.00, ARRAY['Rede de descanso', 'Bar', 'Área gourmet'], '{"length": "46 pés", "engine": "Twin 350HP", "year": "2021"}'),
('Flyhi Adventure', 'Aventura e adrenalina no mar', 8, 750.00, ARRAY['Equipamento esportivo', 'Som', 'Cooler'], '{"length": "44 pés", "engine": "Twin 340HP", "year": "2022"}'),
('Rebeca Luxury', 'Luxo e requinte para eventos', 10, 1400.00, ARRAY['Área gourmet', 'Bar premium', 'Ar condicionado'], '{"length": "56 pés", "engine": "Twin 480HP", "year": "2023"}'),
('Tecnomarine Pro', 'Tecnologia de ponta no mar', 12, 1100.00, ARRAY['GPS avançado', 'Som digital', 'Wi-Fi'], '{"length": "50 pés", "engine": "Twin 420HP", "year": "2022"}'),
('Grandraray Elite', 'Elite em experiências marítimas', 8, 1600.00, ARRAY['Serviço premium', 'Chef', 'Bar exclusivo'], '{"length": "62 pés", "engine": "Twin 550HP", "year": "2023"}'),
('Senna Speed', 'Velocidade e performance', 6, 900.00, ARRAY['Motor esportivo', 'Design aerodinâmico', 'Som'], '{"length": "38 pés", "engine": "Twin 400HP", "year": "2022"}'),
('Luisa Elegance', 'Elegância e sofisticação', 10, 1250.00, ARRAY['Decoração refinada', 'Bar', 'Área lounge'], '{"length": "54 pés", "engine": "Twin 460HP", "year": "2023"}'),
('Mcell Innovation', 'Inovação em embarcações', 14, 950.00, ARRAY['Tecnologia moderna', 'Som', 'Área de descanso'], '{"length": "48 pés", "engine": "Twin 390HP", "year": "2021"}'),
('MyWay Freedom', 'Liberdade para explorar', 8, 800.00, ARRAY['Autonomia estendida', 'GPS', 'Som'], '{"length": "46 pés", "engine": "Twin 360HP", "year": "2022"}'),
('Segue o Fluxo', 'Siga o fluxo das ondas', 12, 850.00, ARRAY['Relaxamento', 'Bar', 'Área zen'], '{"length": "50 pés", "engine": "Twin 370HP", "year": "2021"}');

-- Enable realtime for tables
ALTER TABLE public.vessels REPLICA IDENTITY FULL;
ALTER TABLE public.vessel_images REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER publication supabase_realtime ADD TABLE public.vessels;
ALTER publication supabase_realtime ADD TABLE public.vessel_images;