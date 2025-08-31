import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VesselCard from './VesselCard';
import { supabase } from '@/integrations/supabase/client';

// Import all vessel images for fallback
import dragaoImage from '@/assets/dragao-yacht.jpg';
import blauImage from '@/assets/blau-catamaran.jpg';
import comendadorImage from '@/assets/comendador-yacht.jpg';
import flyHiImage from '@/assets/flyhi-boat.jpg';
import grandRarayImage from '@/assets/grandraray-yacht.jpg';
import iateExecutiveImage from '@/assets/iate-executive.jpg';
import ladyRuthImage from '@/assets/lady-ruth-yacht.jpg';
import lanchaPremiumImage from '@/assets/lancha-premium.jpg';
import luisaImage from '@/assets/luisa-yacht.jpg';
import mangataImage from '@/assets/mangata-yacht.jpg';
import mcellImage from '@/assets/mcell-boat.jpg';
import mywayImage from '@/assets/myway-yacht.jpg';
import nossaImage from '@/assets/nossa-yacht.jpg';
import oceanoImage from '@/assets/oceano-catamaran.jpg';
import prestigeImage from '@/assets/prestige-yacht.jpg';
import rebecaImage from '@/assets/rebeca-yacht.jpg';
import sennaImage from '@/assets/senna-yacht.jpg';
import sevenImage from '@/assets/seven-yacht.jpg';
import catamataLuxuryImage from '@/assets/catamara-luxury.jpg';
import tecnomarine from '@/assets/tecnomarine-yacht.jpg';
import segueImage from '@/assets/segue-yacht.jpg';

interface Vessel {
  id: string;
  name: string;
  description: string | null;
  capacity: number | null;
  price_per_hour: number | null;
  features: string[];
  specifications: any;
  category: string;
  images: VesselImage[];
}

interface VesselImage {
  id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
}

// Fallback vessel data with local images - all 21 vessels
const fallbackVesselData = [
  {
    id: 'mangata',
    name: 'Mangata',
    price_per_hour: 2500,
    capacity: 8,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: mangataImage,
    description: 'Luxo e sofisticação em alto mar. Perfeita para celebrações especiais.',
    specifications: { length: '55 pés', engine: 'Twin 450HP', year: '2023' }
  },
  {
    id: 'grandraray',
    name: 'Grandraray',
    price_per_hour: 3200,
    capacity: 12,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: grandRarayImage,
    description: 'Elite em experiências marítimas.',
    specifications: { length: '62 pés', engine: 'Twin 550HP', year: '2023' }
  },
  {
    id: 'senna',
    name: 'Senna',
    price_per_hour: 2800,
    capacity: 10,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: sennaImage,
    description: 'Velocidade e estilo em uma única embarcação.',
    specifications: { length: '58 pés', engine: 'Twin 600HP', year: '2023' }
  },
  {
    id: 'lady-ruth',
    name: 'Lady Ruth',
    price_per_hour: 2400,
    capacity: 8,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: ladyRuthImage,
    description: 'Elegância clássica e conforto moderno.',
    specifications: { length: '42 pés', engine: 'Twin 320HP', year: '2022' }
  },
  {
    id: 'oceano',
    name: 'Oceano',
    price_per_hour: 4500,
    capacity: 20,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Catamarã',
    image: oceanoImage,
    description: 'Espaço amplo e estabilidade superior.',
    specifications: { length: '50 pés', engine: 'Twin 300HP', year: '2021' }
  },
  {
    id: 'nossa',
    name: 'Nossa',
    price_per_hour: 2800,
    capacity: 12,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: nossaImage,
    description: 'Perfeita para reunir família e amigos.',
    specifications: { length: '48 pés', engine: 'Twin 380HP', year: '2022' }
  },
  {
    id: 'blau',
    name: 'Blau Catamaran',
    price_per_hour: 3800,
    capacity: 20,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Catamarã',
    image: blauImage,
    description: 'Catamarã espaçoso para grupos grandes.',
    specifications: { length: '50 pés', engine: 'Twin 300HP', year: '2021' }
  },
  {
    id: 'comendador',
    name: 'Comendador',
    price_per_hour: 2200,
    capacity: 10,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: comendadorImage,
    description: 'Yacht tradicional com elegância.',
    specifications: { length: '52 pés', engine: 'Twin 380HP', year: '2021' }
  },
  {
    id: 'dragao',
    name: 'Dragão dos Mares',
    price_per_hour: 3500,
    capacity: 12,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: dragaoImage,
    description: 'Potência e velocidade no mar.',
    specifications: { length: '58 pés', engine: 'Twin 600HP', year: '2023' }
  },
  {
    id: 'flyhi',
    name: 'Flyhi Adventure',
    price_per_hour: 1800,
    capacity: 8,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Lancha',
    image: flyHiImage,
    description: 'Aventura e adrenalina no mar.',
    specifications: { length: '44 pés', engine: 'Twin 340HP', year: '2022' }
  },
  {
    id: 'iate-executive',
    name: 'Iate Executive',
    price_per_hour: 3000,
    capacity: 12,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: iateExecutiveImage,
    description: 'Iate executivo para eventos corporativos.',
    specifications: { length: '60 pés', engine: 'Twin 500HP', year: '2022' }
  },
  {
    id: 'lancha-premium',
    name: 'Lancha Premium',
    price_per_hour: 2000,
    capacity: 8,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Lancha',
    image: lanchaPremiumImage,
    description: 'Embarcação de luxo para passeios exclusivos.',
    specifications: { length: '45 pés', engine: 'Twin 350HP', year: '2023' }
  },
  {
    id: 'luisa',
    name: 'Luisa Elegance',
    price_per_hour: 2900,
    capacity: 10,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: luisaImage,
    description: 'Elegância e sofisticação.',
    specifications: { length: '54 pés', engine: 'Twin 460HP', year: '2023' }
  },
  {
    id: 'mcell',
    name: 'MCéll',
    price_per_hour: 1600,
    capacity: 6,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Lancha',
    image: mcellImage,
    description: 'Esportividade e agilidade.',
    specifications: { length: '38 pés', engine: 'Twin 280HP', year: '2022' }
  },
  {
    id: 'myway',
    name: 'MyWay',
    price_per_hour: 2600,
    capacity: 10,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: mywayImage,
    description: 'Seu caminho para o luxo.',
    specifications: { length: '52 pés', engine: 'Twin 420HP', year: '2023' }
  },
  {
    id: 'prestige',
    name: 'Prestige',
    price_per_hour: 3100,
    capacity: 12,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: prestigeImage,
    description: 'Prestígio e exclusividade.',
    specifications: { length: '58 pés', engine: 'Twin 520HP', year: '2023' }
  },
  {
    id: 'rebeca',
    name: 'Rebeca',
    price_per_hour: 2300,
    capacity: 8,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: rebecaImage,
    description: 'Conforto familiar no mar.',
    specifications: { length: '46 pés', engine: 'Twin 360HP', year: '2022' }
  },
  {
    id: 'seven',
    name: 'Seven',
    price_per_hour: 3400,
    capacity: 12,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: sevenImage,
    description: 'Perfeição em cada detalhe.',
    specifications: { length: '64 pés', engine: 'Twin 580HP', year: '2023' }
  },
  {
    id: 'tecnomarine',
    name: 'Tecnomarine',
    price_per_hour: 2700,
    capacity: 10,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: tecnomarine,
    description: 'Tecnologia e performance em alto mar.',
    specifications: { length: '56 pés', engine: 'Twin 480HP', year: '2023' }
  },
  {
    id: 'segue',
    name: 'Segue',
    price_per_hour: 2500,
    capacity: 8,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Yacht',
    image: segueImage,
    description: 'Elegância e conforto em cada detalhe.',
    specifications: { length: '48 pés', engine: 'Twin 400HP', year: '2022' }
  },
  {
    id: 'catamara-luxury',
    name: 'Catamarã Luxury',
    price_per_hour: 5000,
    capacity: 25,
    features: ['Premium', 'Som', 'Bar', 'Seguro'],
    category: 'Catamarã',
    image: catamataLuxuryImage,
    description: 'O máximo em luxo e espaço para grandes grupos.',
    specifications: { length: '65 pés', engine: 'Twin 400HP', year: '2023' }
  }
];

const VesselCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ['Todos', 'Yacht', 'Catamarã', 'Lancha'];

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

      if (vesselsData && vesselsData.length > 0) {
        const vesselsWithImages = await Promise.all(
          vesselsData.map(async (vessel) => {
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
      } else {
        // Use fallback data if no vessels in database
        const fallbackWithImages = fallbackVesselData.map(vessel => ({
          ...vessel,
          images: []
        }));
        setVessels(fallbackWithImages);
      }
    } catch (error) {
      console.error('Error loading vessels:', error);
      // Use fallback data on error
      const fallbackWithImages = fallbackVesselData.map(vessel => ({
        ...vessel,
        images: []
      }));
      setVessels(fallbackWithImages);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredVessels = selectedCategory === 'Todos' 
    ? vessels 
    : vessels.filter(vessel => vessel.category === selectedCategory);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Carregando embarcações...</h2>
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

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVessels.map((vessel) => (
              <VesselCard
                key={vessel.id}
                id={vessel.id}
                name={vessel.name}
                type={vessel.category}
                price={vessel.price_per_hour ? `R$ ${vessel.price_per_hour}` : 'Consulte preço'}
                capacity={vessel.capacity || 0}
                features={vessel.features.map(f => ({ icon: '⚓', label: f }))}
                image={vessel.images.length > 0 ? vessel.images[0].image_url : fallbackVesselData.find(f => f.id === vessel.id)?.image || dragaoImage}
                rating={4.8}
                duration="Full Day"
                location="Marina da Glória"
                description={vessel.description || ''}
              />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VesselCatalog;