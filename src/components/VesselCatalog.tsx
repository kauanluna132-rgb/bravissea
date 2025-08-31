import React from 'react';
import VesselCard from './VesselCard';

// Import images
import blauCatamaran from '@/assets/blau-catamaran.jpg';
import comendadorYacht from '@/assets/comendador-yacht.jpg';
import dragaoYacht from '@/assets/dragao-yacht.jpg';
import flyhiboat from '@/assets/flyhi-boat.jpg';
import grandrarayYacht from '@/assets/grandraray-yacht.jpg';
import iateExecutive from '@/assets/iate-executive.jpg';
import ladyRuthYacht from '@/assets/lady-ruth-yacht.jpg';
import lanchaPremium from '@/assets/lancha-premium.jpg';
import luisaYacht from '@/assets/luisa-yacht.jpg';
import mangataYacht from '@/assets/mangata-yacht.jpg';
import mcellBoat from '@/assets/mcell-boat.jpg';
import mywayYacht from '@/assets/myway-yacht.jpg';
import nossaYacht from '@/assets/nossa-yacht.jpg';
import oceanoCatamaran from '@/assets/oceano-catamaran.jpg';
import prestigeYacht from '@/assets/prestige-yacht.jpg';
import rebecaYacht from '@/assets/rebeca-yacht.jpg';
import segueYacht from '@/assets/segue-yacht.jpg';
import sennaYacht from '@/assets/senna-yacht.jpg';
import sevenYacht from '@/assets/seven-yacht.jpg';
import tecnomarineYacht from '@/assets/tecnomarine-yacht.jpg';
import catamaraLuxury from '@/assets/catamara-luxury.jpg';

// Vessel data with images
const vessels = [
  {
    id: "mangata",
    name: "Mangata",
    type: "Luxury Yacht",
    image: mangataYacht,
    images: [mangataYacht],
    capacity: 8,
    price: "R$ 2.500",
    originalPrice: "R$ 3.000",
    rating: 4.9,
    duration: "Full Day",
    location: "Marina da Glória",
    features: [
      { icon: "⚓", label: "Premium" },
      { icon: "🎵", label: "Som" },
      { icon: "☕", label: "Bar" },
      { icon: "🛡️", label: "Seguro" }
    ],
    description: "Luxo e sofisticação em alto mar. Perfect para celebrações especiais.",
    highlight: true
  },
  {
    id: "grandraray",
    name: "Grandraray",
    type: "Premium Yacht",
    image: grandrarayYacht,
    images: [grandrarayYacht],
    capacity: 12,
    price: "R$ 3.200",
    rating: 4.8,
    duration: "Full Day",
    location: "Marina da Glória",
    features: [
      { icon: "⚓", label: "Premium" },
      { icon: "🎵", label: "Som" },
      { icon: "☕", label: "Bar" },
      { icon: "🛡️", label: "Seguro" }
    ],
    description: "Elite em experiências marítimas.",
    highlight: false
  },
  {
    id: "senna",
    name: "Senna",
    type: "Sport Yacht",
    image: sennaYacht,
    images: [sennaYacht],
    capacity: 10,
    price: "R$ 2.800",
    rating: 4.7,
    duration: "Full Day",
    location: "Marina da Glória",
    features: [
      { icon: "⚓", label: "Premium" },
      { icon: "🎵", label: "Som" },
      { icon: "☕", label: "Bar" },
      { icon: "🛡️", label: "Seguro" }
    ],
    description: "Velocidade e estilo em uma única embarcação.",
    highlight: false
  },
  {
    id: "lady-ruth",
    name: "Lady Ruth",
    type: "Classic Yacht",
    image: ladyRuthYacht,
    images: [ladyRuthYacht],
    capacity: 8,
    price: "R$ 2.400",
    rating: 4.8,
    duration: "Full Day", 
    location: "Marina da Glória",
    features: [
      { icon: "⚓", label: "Premium" },
      { icon: "🎵", label: "Som" },
      { icon: "☕", label: "Bar" },
      { icon: "🛡️", label: "Seguro" }
    ],
    description: "Elegância clássica e conforto moderno.",
    highlight: false
  },
  {
    id: "oceano",
    name: "Oceano",
    type: "Catamaran",
    image: oceanoCatamaran,
    images: [oceanoCatamaran],
    capacity: 20,
    price: "R$ 4.500",
    rating: 4.9,
    duration: "Full Day",
    location: "Marina da Glória",
    features: [
      { icon: "⚓", label: "Premium" },
      { icon: "🎵", label: "Som" },
      { icon: "☕", label: "Bar" },
      { icon: "🛡️", label: "Seguro" }
    ],
    description: "Espaço amplo e estabilidade superior.",
    highlight: false
  },
  {
    id: "nossa",
    name: "Nossa",
    type: "Family Yacht",
    image: nossaYacht,
    images: [nossaYacht],
    capacity: 12,
    price: "R$ 2.800",
    rating: 4.7,
    duration: "Full Day",
    location: "Marina da Glória", 
    features: [
      { icon: "⚓", label: "Premium" },
      { icon: "🎵", label: "Som" },
      { icon: "☕", label: "Bar" },
      { icon: "🛡️", label: "Seguro" }
    ],
    description: "Perfeita para reunir família e amigos.",
    highlight: false
  }
];

const VesselCatalog = () => {

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
              type={vessel.type}
              image={vessel.image}
              images={vessel.images}
              capacity={vessel.capacity}
              price={vessel.price}
              originalPrice={vessel.originalPrice}
              rating={vessel.rating}
              duration={vessel.duration}
              location={vessel.location}
              features={vessel.features}
              description={vessel.description}
              highlight={vessel.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VesselCatalog;