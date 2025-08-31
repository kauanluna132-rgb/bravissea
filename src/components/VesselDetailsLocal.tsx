import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Star, Wifi, Car, Music, Wind, MapPin, Clock, User, Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
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

// Fallback vessel data
const vesselsData = {
  "mangata": {
    id: "mangata",
    name: "Mangata",
    type: "Luxury Yacht",
    image: mangataImage,
    images: [mangataImage],
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
    image: grandRarayImage,
    images: [grandRarayImage],
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
    image: sennaImage,
    images: [sennaImage],
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
    image: ladyRuthImage,
    images: [ladyRuthImage],
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
    image: oceanoImage,
    images: [oceanoImage],
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
    image: nossaImage,
    images: [nossaImage],
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
  },
  "blau": {
    id: "blau",
    name: "Blau Catamaran",
    type: "Catamaran",
    image: blauImage,
    images: [blauImage],
    capacity: 20,
    price: "R$ 3.800",
    originalPrice: undefined,
    rating: 4.8,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Catamarã espaçoso para grupos grandes. Deck amplo e área de descanso com vista panorâmica.",
    specifications: {
      length: "50 pés",
      engine: "Twin 300HP",
      year: "2021"
    }
  },
  "comendador": {
    id: "comendador",
    name: "Comendador",
    type: "Classic Yacht",
    image: comendadorImage,
    images: [comendadorImage],
    capacity: 10,
    price: "R$ 2.200",
    originalPrice: undefined,
    rating: 4.6,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Yacht tradicional com elegância. Sala de jantar e deck superior para momentos especiais.",
    specifications: {
      length: "52 pés",
      engine: "Twin 380HP",
      year: "2021"
    }
  },
  "dragao": {
    id: "dragao",
    name: "Dragão dos Mares",
    type: "Sport Yacht",
    image: dragaoImage,
    images: [dragaoImage],
    capacity: 12,
    price: "R$ 3.500",
    originalPrice: undefined,
    rating: 4.8,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Potência e velocidade no mar. Motor potente e design esportivo para experiências emocionantes.",
    specifications: {
      length: "58 pés",
      engine: "Twin 600HP",
      year: "2023"
    }
  },
  "flyhi": {
    id: "flyhi",
    name: "Flyhi Adventure",
    type: "Adventure Boat",
    image: flyHiImage,
    images: [flyHiImage],
    capacity: 8,
    price: "R$ 1.800",
    originalPrice: undefined,
    rating: 4.5,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Aventura e adrenalina no mar. Equipamento esportivo e som para momentos únicos.",
    specifications: {
      length: "44 pés",
      engine: "Twin 340HP",
      year: "2022"
    }
  },
  "iate-executive": {
    id: "iate-executive",
    name: "Iate Executive",
    type: "Executive Yacht",
    image: iateExecutiveImage,
    images: [iateExecutiveImage],
    capacity: 12,
    price: "R$ 3.000",
    originalPrice: undefined,
    rating: 4.7,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Iate executivo para eventos corporativos. Sala de reunião, Wi-Fi e serviço de catering.",
    specifications: {
      length: "60 pés",
      engine: "Twin 500HP",
      year: "2022"
    }
  },
  "lancha-premium": {
    id: "lancha-premium",
    name: "Lancha Premium",
    type: "Premium Boat",
    image: lanchaPremiumImage,
    images: [lanchaPremiumImage],
    capacity: 8,
    price: "R$ 2.000",
    originalPrice: undefined,
    rating: 4.6,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Embarcação de luxo para passeios exclusivos. Bar, som e churrasqueira para momentos especiais.",
    specifications: {
      length: "45 pés",
      engine: "Twin 350HP",
      year: "2023"
    }
  },
  "luisa": {
    id: "luisa",
    name: "Luisa Elegance",
    type: "Luxury Yacht",
    image: luisaImage,
    images: [luisaImage],
    capacity: 10,
    price: "R$ 2.900",
    originalPrice: undefined,
    rating: 4.8,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Elegância e sofisticação. Decoração refinada, bar e área lounge para relaxamento.",
    specifications: {
      length: "54 pés",
      engine: "Twin 460HP",
      year: "2023"
    }
  },
  "mcell": {
    id: "mcell",
    name: "MCéll",
    type: "Sport Boat",
    image: mcellImage,
    images: [mcellImage],
    capacity: 6,
    price: "R$ 1.600",
    originalPrice: undefined,
    rating: 4.4,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Esportividade e agilidade. Embarcação compacta e rápida para aventuras no mar.",
    specifications: {
      length: "38 pés",
      engine: "Twin 280HP",
      year: "2022"
    }
  },
  "myway": {
    id: "myway",
    name: "MyWay",
    type: "Luxury Yacht",
    image: mywayImage,
    images: [mywayImage],
    capacity: 10,
    price: "R$ 2.600",
    originalPrice: undefined,
    rating: 4.7,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Seu caminho para o luxo. Design moderno e conforto excepcional para experiências únicas.",
    specifications: {
      length: "52 pés",
      engine: "Twin 420HP",
      year: "2023"
    }
  },
  "prestige": {
    id: "prestige",
    name: "Prestige",
    type: "Luxury Yacht",
    image: prestigeImage,
    images: [prestigeImage],
    capacity: 12,
    price: "R$ 3.100",
    originalPrice: undefined,
    rating: 4.8,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Prestígio e exclusividade. Luxo refinado com todas as comodidades para experiências inesquecíveis.",
    specifications: {
      length: "58 pés",
      engine: "Twin 520HP",
      year: "2023"
    }
  },
  "rebeca": {
    id: "rebeca",
    name: "Rebeca",
    type: "Family Yacht",
    image: rebecaImage,
    images: [rebecaImage],
    capacity: 8,
    price: "R$ 2.300",
    originalPrice: undefined,
    rating: 4.6,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Conforto familiar no mar. Ambiente acolhedor e seguro para toda a família.",
    specifications: {
      length: "46 pés",
      engine: "Twin 360HP",
      year: "2022"
    }
  },
  "seven": {
    id: "seven",
    name: "Seven",
    type: "Luxury Yacht",
    image: sevenImage,
    images: [sevenImage],
    capacity: 12,
    price: "R$ 3.400",
    originalPrice: undefined,
    rating: 4.9,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Perfeição em cada detalhe. Yacht de luxo com acabamento impecável e tecnologia de ponta.",
    specifications: {
      length: "64 pés",
      engine: "Twin 580HP",
      year: "2023"
    }
  },
  "tecnomarine": {
    id: "tecnomarine",
    name: "Tecnomarine",
    type: "Sport Yacht",
    image: tecnomarine,
    images: [tecnomarine],
    capacity: 10,
    price: "R$ 2.700",
    originalPrice: undefined,
    rating: 4.7,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Tecnologia e performance em alto mar. Design inovador com sistemas avançados de navegação.",
    specifications: {
      length: "56 pés",
      engine: "Twin 480HP",
      year: "2023"
    }
  },
  "segue": {
    id: "segue",
    name: "Segue",
    type: "Luxury Yacht",
    image: segueImage,
    images: [segueImage],
    capacity: 8,
    price: "R$ 2.500",
    originalPrice: undefined,
    rating: 4.6,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "Elegância e conforto em cada detalhe. Yacht sofisticado para experiências exclusivas.",
    specifications: {
      length: "48 pés",
      engine: "Twin 400HP",
      year: "2022"
    }
  },
  "catamara-luxury": {
    id: "catamara-luxury",
    name: "Catamarã Luxury",
    type: "Catamaran",
    image: catamataLuxuryImage,
    images: [catamataLuxuryImage],
    capacity: 25,
    price: "R$ 5.000",
    originalPrice: undefined,
    rating: 4.9,
    duration: "Full Day",
    location: "Marina da Glória",
    features: ["Premium", "Som", "Bar", "Seguro"],
    description: "O máximo em luxo e espaço para grandes grupos. Catamarã de luxo com todas as comodidades.",
    specifications: {
      length: "65 pés",
      engine: "Twin 400HP",
      year: "2023"
    }
  }
};

const VesselDetailsLocal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vessel, setVessel] = useState<Vessel | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passengers: '',
    route: '',
    duration: '',
    observations: ''
  });

  useEffect(() => {
    loadVessel();
  }, [id]);

  const loadVessel = async () => {
    if (!id) return;
    
    try {
      const { data: vesselData, error: vesselError } = await supabase
        .from('vessels')
        .select('*')
        .eq('id', id)
        .single();

      if (vesselError) throw vesselError;

      if (vesselData) {
        const { data: imagesData, error: imagesError } = await supabase
          .from('vessel_images')
          .select('*')
          .eq('vessel_id', id)
          .order('display_order');

        if (imagesError) {
          console.error('Error loading images:', imagesError);
        }

        setVessel({
          ...vesselData,
          images: imagesData || []
        });
      } else {
        // Fallback to local data
        const fallbackVessel = vesselsData[id as keyof typeof vesselsData];
        if (fallbackVessel) {
        setVessel({
          ...fallbackVessel,
          price_per_hour: parseInt(fallbackVessel.price.replace(/[^\d]/g, '')),
          category: fallbackVessel.type === 'Catamaran' ? 'Catamarã' : 'Yacht',
          images: []
        });
        }
      }
    } catch (error) {
      console.error('Error loading vessel:', error);
      // Fallback to local data
      const fallbackVessel = vesselsData[id as keyof typeof vesselsData];
      if (fallbackVessel) {
        setVessel({
          ...fallbackVessel,
          price_per_hour: parseInt(fallbackVessel.price.replace(/[^\d]/g, '')),
          category: fallbackVessel.type === 'Catamaran' ? 'Catamarã' : 'Yacht',
          images: []
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
        </div>
      </div>
    );
  }

  if (!vessel) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Embarcação não encontrada</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const vesselImages = vessel.images.length > 0 
    ? vessel.images.map(img => img.image_url)
    : [vesselsData[vessel.id as keyof typeof vesselsData]?.image || dragaoImage];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vesselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vesselImages.length) % vesselImages.length);
  };

  const handleWhatsAppContact = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor, preencha nome, email e telefone');
      return;
    }

    const message = `*Reserva - ${vessel.name}*

*Dados do Cliente:*
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}

*Detalhes da Reserva:*
Embarcação: ${vessel.name}
Passageiros: ${formData.passengers}
Roteiro: ${formData.route}
Duração: ${formData.duration}
Preço: ${vessel.price_per_hour ? `R$ ${vessel.price_per_hour}/h` : 'Consulte preço'}

*Observações:*
${formData.observations || 'Nenhuma observação adicional'}

Aguardo retorno para confirmar a reserva!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5521999999999?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('Redirecionando para WhatsApp...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-6 px-4">
        <div className="container mx-auto">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-6">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <img
                  src={vesselImages[currentImageIndex]}
                  alt={vessel.name}
                  className="w-full h-full object-cover"
                />
                {vesselImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              {vesselImages.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  {vesselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">{vessel.name}</h1>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {vessel.price_per_hour ? `R$ ${vessel.price_per_hour}` : 'Consulte preço'}
                  </div>
                  <div className="text-sm text-gray-600">por hora</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span>Até {vessel.capacity} pessoas</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>Marina da Glória</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {vessel.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {vessel.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Fazer Reserva</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <User className="w-4 h-4 inline mr-2" />
                        Nome *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefone *
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(21) 99999-9999"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Users className="w-4 h-4 inline mr-2" />
                        Passageiros
                      </label>
                      <select
                        value={formData.passengers}
                        onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Selecione</option>
                        {Array.from({ length: vessel.capacity || 10 }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num.toString()}>{num} pessoa{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Roteiro
                      </label>
                      <select
                        value={formData.route}
                        onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Selecione o roteiro</option>
                        <option value="Baía de Guanabara">Baía de Guanabara</option>
                        <option value="Ilhas Tijucas">Ilhas Tijucas</option>
                        <option value="Angra dos Reis">Angra dos Reis</option>
                        <option value="Ilha Grande">Ilha Grande</option>
                        <option value="Cabo Frio">Cabo Frio</option>
                        <option value="Búzios">Búzios</option>
                        <option value="Customizado">Roteiro Customizado</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Duração
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Selecione a duração</option>
                        <option value="4 horas">4 horas</option>
                        <option value="6 horas">6 horas</option>
                        <option value="8 horas">8 horas</option>
                        <option value="Dia inteiro">Dia inteiro</option>
                        <option value="2 dias">2 dias</option>
                        <option value="3 dias">3 dias</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Observações</label>
                    <Textarea
                      value={formData.observations}
                      onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                      placeholder="Alguma observação especial para seu passeio..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Solicitar Reserva via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VesselDetailsLocal;