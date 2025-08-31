import React, { useState, useEffect } from 'react';
import VesselCard from './VesselCard';
import { supabase } from '@/integrations/supabase/client';

interface Vessel {
  id: string;
  name: string;
  description: string | null;
  capacity: number | null;
  price_per_hour: number | null;
  features: string[];
  specifications: any;
  images: VesselImage[];
}

interface VesselImage {
  id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
}

const VesselCatalog = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVessels();
  }, []);

  const loadVessels = async () => {
    try {
      const { data: vesselsData, error: vesselsError } = await supabase
        .from('vessels')
        .select('*')
        .order('name');

      if (vesselsError) throw vesselsError;

      const vesselsWithImages = await Promise.all(
        (vesselsData || []).map(async (vessel) => {
          const { data: imagesData, error: imagesError } = await supabase
            .from('vessel_images')
            .select('*')
            .eq('vessel_id', vessel.id)
            .order('display_order');

          if (imagesError) {
            console.error('Error loading images for vessel:', vessel.id, imagesError);
            return { ...vessel, images: [] };
          }

          return { ...vessel, images: imagesData || [] };
        })
      );

      setVessels(vesselsWithImages);
      console.log('VesselCatalog: Loaded vessels from database:', vesselsWithImages);
    } catch (error) {
      console.error('VesselCatalog: Error loading vessels:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="embarcacoes" className="py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-lg">Carregando embarcações...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="embarcacoes" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossa Frota
            <span className="text-gradient-ocean"> Premium</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma frota diversificada de embarcações premium, todas equipadas com os melhores 
            equipamentos de segurança e conforto para garantir uma experiência inesquecível.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vessels.map((vessel) => (
            <VesselCard 
              key={vessel.id}
              id={vessel.id}
              name={vessel.name}
              type="Premium"
              image={vessel.images[0]?.image_url || '/placeholder.svg'}
              images={vessel.images.map(img => img.image_url)}
              capacity={vessel.capacity || 0}
              price={`R$ ${vessel.price_per_hour || 0}`}
              rating={4.8}
              duration="Full Day"
              location="Marina da Glória"
              features={[]}
              description={vessel.description || ''}
              highlight={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VesselCatalog;