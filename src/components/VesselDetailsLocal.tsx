import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, Star, Anchor, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import VesselImageCarousel from '@/components/VesselImageCarousel';

// Import images
import mangataYacht from '@/assets/mangata-yacht.jpg';
import grandrarayYacht from '@/assets/grandraray-yacht.jpg';
import sennaYacht from '@/assets/senna-yacht.jpg';
import ladyRuthYacht from '@/assets/lady-ruth-yacht.jpg';
import oceanoCatamaran from '@/assets/oceano-catamaran.jpg';
import nossaYacht from '@/assets/nossa-yacht.jpg';

// Vessel data
const vesselsData = {
  "mangata": {
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
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Luxo e sofisticação em alto mar. Perfeita para celebrações especiais com até 8 pessoas. Equipada com sistema de som premium, bar completo e todos os equipamentos de segurança necessários.",
    specifications: {
      length: "55 pés",
      engine: "Twin 450HP",
      year: "2023"
    }
  },
  "grandraray": {
    id: "grandraray",
    name: "Grandraray",
    type: "Premium Yacht",
    image: grandrarayYacht,
    images: [grandrarayYacht],
    capacity: 12,
    price: "R$ 3.200",
    originalPrice: undefined,
    rating: 4.8,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Elite em experiências marítimas. Embarcação premium com capacidade para 12 pessoas, ideal para eventos corporativos e celebrações especiais.",
    specifications: {
      length: "62 pés",
      engine: "Twin 550HP",
      year: "2023"
    }
  },
  "senna": {
    id: "senna",
    name: "Senna",
    type: "Sport Yacht",
    image: sennaYacht,
    images: [sennaYacht],
    capacity: 10,
    price: "R$ 2.800",
    originalPrice: undefined,
    rating: 4.7,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Velocidade e estilo em uma única embarcação. Design esportivo moderno com desempenho excepcional no mar.",
    specifications: {
      length: "58 pés",
      engine: "Twin 600HP",
      year: "2023"
    }
  },
  "lady-ruth": {
    id: "lady-ruth",
    name: "Lady Ruth",
    type: "Classic Yacht",
    image: ladyRuthYacht,
    images: [ladyRuthYacht],
    capacity: 8,
    price: "R$ 2.400",
    originalPrice: undefined,
    rating: 4.8,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Elegância clássica e conforto moderno. Decoração sofisticada e ambiente acolhedor para momentos especiais.",
    specifications: {
      length: "42 pés",
      engine: "Twin 320HP",
      year: "2022"
    }
  },
  "oceano": {
    id: "oceano",
    name: "Oceano",
    type: "Catamaran",
    image: oceanoCatamaran,
    images: [oceanoCatamaran],
    capacity: 20,
    price: "R$ 4.500",
    originalPrice: undefined,
    rating: 4.9,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Espaço amplo e estabilidade superior. Ideal para grupos grandes com deck amplo e área de descanso.",
    specifications: {
      length: "50 pés",
      engine: "Twin 300HP",
      year: "2021"
    }
  },
  "nossa": {
    id: "nossa",
    name: "Nossa",
    type: "Family Yacht",
    image: nossaYacht,
    images: [nossaYacht],
    capacity: 12,
    price: "R$ 2.800",
    originalPrice: undefined,
    rating: 4.7,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Perfeita para reunir família e amigos. Ambiente familiar e acolhedor com todas as comodidades necessárias.",
    specifications: {
      length: "48 pés",
      engine: "Twin 380HP",
      year: "2022"
    }
  }
};

const VesselDetailsLocal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vessel = id ? vesselsData[id as keyof typeof vesselsData] : null;

  if (!vessel) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Embarcação não encontrada</h2>
            <Button onClick={() => navigate('/')}>Voltar ao início</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Back Button */}
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{vessel.name}</h1>
        <div className="flex justify-center items-center gap-4">
          <Badge variant="outline">
            <Users className="h-4 w-4 mr-1" />
            {vessel.capacity} pessoas
          </Badge>
          <Badge variant="outline">
            <Star className="h-4 w-4 mr-1" />
            {vessel.rating}
          </Badge>
          <Badge variant="outline">
            {vessel.type}
          </Badge>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-primary">{vessel.price}/dia</p>
          {vessel.originalPrice && (
            <p className="text-lg text-muted-foreground line-through">{vessel.originalPrice}</p>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <Card>
        <CardContent className="p-6">
          <VesselImageCarousel 
            images={vessel.images} 
            vesselName={vessel.name} 
          />
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Anchor className="h-5 w-5" />
              Sobre esta embarcação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{vessel.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Capacidade:</span>
                <span>{vessel.capacity} pessoas</span>
              </div>
              <div className="flex justify-between">
                <span>Duração:</span>
                <span>{vessel.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Local:</span>
                <span>{vessel.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specifications & Features */}
        <Card>
          <CardHeader>
            <CardTitle>Especificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Comprimento:</span>
                  <span>{vessel.specifications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Motor:</span>
                  <span>{vessel.specifications.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ano:</span>
                  <span>{vessel.specifications.year}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Características</h4>
                <div className="grid grid-cols-2 gap-2">
                  {vessel.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-center">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Reserve Agora
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Entre em contato conosco para reservar esta embarcação e garantir uma experiência inesquecível.
          </p>
          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={() => window.open(`https://wa.me/5521974004415?text=${encodeURIComponent(`Olá! Tenho interesse na embarcação ${vessel.name}. Gostaria de mais informações sobre preços e disponibilidade.`)}`, '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('mailto:contato@bravissea.com.br', '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VesselDetailsLocal;