import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Clock, Star, Anchor, Phone, Mail, ArrowLeft, MessageCircle } from 'lucide-react';
import VesselImageCarousel from '@/components/VesselImageCarousel';

// Import images
import mangataYacht from '@/assets/mangata-yacht.jpg';
import grandrarayYacht from '@/assets/grandraray-yacht.jpg';
import sennaYacht from '@/assets/senna-yacht.jpg';
import ladyRuthYacht from '@/assets/lady-ruth-yacht.jpg';
import oceanoCatamaran from '@/assets/oceano-catamaran.jpg';
import nossaYacht from '@/assets/nossa-yacht.jpg';
import blauCatamaran from '@/assets/blau-catamaran.jpg';
import comendadorYacht from '@/assets/comendador-yacht.jpg';
import dragaoYacht from '@/assets/dragao-yacht.jpg';
import flyhiboat from '@/assets/flyhi-boat.jpg';
import iateExecutive from '@/assets/iate-executive.jpg';
import lanchaPremium from '@/assets/lancha-premium.jpg';
import luisaYacht from '@/assets/luisa-yacht.jpg';
import mcellBoat from '@/assets/mcell-boat.jpg';
import mywayYacht from '@/assets/myway-yacht.jpg';
import prestigeYacht from '@/assets/prestige-yacht.jpg';
import rebecaYacht from '@/assets/rebeca-yacht.jpg';
import sevenYacht from '@/assets/seven-yacht.jpg';
import tecnomarineYacht from '@/assets/tecnomarine-yacht.jpg';
import catamaraLuxury from '@/assets/catamara-luxury.jpg';
import segueYacht from '@/assets/segue-yacht.jpg';

// Vessel data - complete with all 18 vessels
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
  },
  "blau": {
    id: "blau",
    name: "Blau Catamaran",
    type: "Catamaran",
    image: blauCatamaran,
    images: [blauCatamaran],
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
    image: comendadorYacht,
    images: [comendadorYacht],
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
    image: dragaoYacht,
    images: [dragaoYacht],
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
    image: flyhiboat,
    images: [flyhiboat],
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
    image: iateExecutive,
    images: [iateExecutive],
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
    image: lanchaPremium,
    images: [lanchaPremium],
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
    image: luisaYacht,
    images: [luisaYacht],
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
    image: mcellBoat,
    images: [mcellBoat],
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
    image: mywayYacht,
    images: [mywayYacht],
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
    image: prestigeYacht,
    images: [prestigeYacht],
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
    image: rebecaYacht,
    images: [rebecaYacht],
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
    image: sevenYacht,
    images: [sevenYacht],
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
  }
};

const VesselDetailsLocal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vessel = id ? vesselsData[id as keyof typeof vesselsData] : null;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passengers: '',
    route: '',
    duration: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppContact = () => {
    if (!vessel) return;
    
    const message = `*Reserva - ${vessel.name}*

*Dados do Cliente:*
Nome: ${formData.name || 'Não informado'}
Email: ${formData.email || 'Não informado'}
Telefone: ${formData.phone || 'Não informado'}

*Detalhes da Reserva:*
Embarcação: ${vessel.name}
Passageiros: ${formData.passengers || 'Não informado'}
Roteiro: ${formData.route || 'Não informado'}
Duração: ${formData.duration || 'Não informado'}
Preço: ${vessel.price}/dia

*Observações:*
${formData.message || 'Nenhuma observação adicional'}

Aguardo retorno para confirmar a reserva!`;

    const whatsappLink = `https://wa.me/5521974004415?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

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

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Formulário de Reserva
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(21) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers">Número de Passageiros</Label>
              <Select onValueChange={(value) => handleInputChange('passengers', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: vessel.capacity }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} {i + 1 === 1 ? 'pessoa' : 'pessoas'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="route">Roteiro Preferido</Label>
              <Select onValueChange={(value) => handleInputChange('route', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o roteiro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="copacabana-ipanema">Copacabana - Ipanema</SelectItem>
                  <SelectItem value="baía-guanabara">Baía de Guanabara</SelectItem>
                  <SelectItem value="ilhas-tijucas">Ilhas Tijucas</SelectItem>
                  <SelectItem value="angra-reis">Angra dos Reis</SelectItem>
                  <SelectItem value="búzios">Búzios</SelectItem>
                  <SelectItem value="personalizado">Roteiro Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duração</Label>
              <Select onValueChange={(value) => handleInputChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4-horas">4 horas</SelectItem>
                  <SelectItem value="6-horas">6 horas</SelectItem>
                  <SelectItem value="8-horas">8 horas (Full Day)</SelectItem>
                  <SelectItem value="personalizado">Duração Personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Observações (Opcional)</Label>
            <Textarea
              id="message"
              placeholder="Alguma observação especial ou solicitação..."
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Enviar via WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('mailto:contato@bravissea.com.br', '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Enviar por Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VesselDetailsLocal;