import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Importar as imagens das embarcações
import segueImage from "@/assets/segue-yacht.jpg";
import tecnomarineImage from "@/assets/tecnomarine-yacht.jpg";
import mywayImage from "@/assets/myway-yacht.jpg";
import flyhiImage from "@/assets/flyhi-boat.jpg";
import mcellImage from "@/assets/mcell-boat.jpg";
import comendadorImage from "@/assets/comendador-yacht.jpg";
import dragaoImage from "@/assets/dragao-yacht.jpg";
import grandrarayImage from "@/assets/grandraray-yacht.jpg";
import ladyRuthImage from "@/assets/lady-ruth-yacht.jpg";
import mangataImage from "@/assets/mangata-yacht.jpg";
import prestigeImage from "@/assets/prestige-yacht.jpg";
import rebecaImage from "@/assets/rebeca-yacht.jpg";
import oceanoImage from "@/assets/oceano-catamaran.jpg";
import blauImage from "@/assets/blau-catamaran.jpg";
import nossaImage from "@/assets/nossa-yacht.jpg";
import sevenImage from "@/assets/seven-yacht.jpg";
import sennaImage from "@/assets/senna-yacht.jpg";
import luisaImage from "@/assets/luisa-yacht.jpg";

// Dados iniciais das embarcações (mesmo formato do admin)
const initialVesselsData = {
  segue: {
    id: "segue",
    name: "SEGUE",
    type: "Iate Premium",
    images: [segueImage],
    capacity: 18,
    price: "R$ 18.000",
    originalPrice: "R$ 20.000",
    rating: 4.9,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate premium com capacidade para 18 passageiros",
    category: "iate"
  },
  tecnomarine: {
    id: "tecnomarine",
    name: "Iate Tecnomarine",
    type: "Iate Executive",
    images: [tecnomarineImage],
    capacity: 20,
    price: "R$ 10.000",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate Tecnomarine com alta tecnologia para 20 passageiros",
    category: "iate"
  },
  myway: {
    id: "myway",
    name: "IATE MY WAY",
    type: "Iate Luxury",
    images: [mywayImage],
    capacity: 20,
    price: "R$ 12.000",
    rating: 4.9,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate MY WAY com design exclusivo para 20 passageiros",
    category: "iate"
  },
  flyhi: {
    id: "flyhi",
    name: "FLY HI",
    type: "Lancha Premium",
    images: [flyhiImage],
    capacity: 15,
    price: "R$ 3.200",
    originalPrice: "R$ 3.700",
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha FLY HI ideal para passeios emocionantes",
    category: "lancha"
  },
  mcell: {
    id: "mcell",
    name: "Lancha M Cell",
    type: "Lancha",
    images: [
      "/lovable-uploads/mcell-1.png",
      "/lovable-uploads/mcell-2.png",
      "/lovable-uploads/mcell-3.png",
      "/lovable-uploads/mcell-4.png",
      "/lovable-uploads/mcell-5.png",
      "/lovable-uploads/mcell-6.png"
    ],
    capacity: 9,
    price: "R$ 2.500",
    originalPrice: undefined,
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha M Cell com cabine, churrasqueira e todas as comodidades para um passeio perfeito",
    category: "lancha"
  },
  comendador: {
    id: "comendador",
    name: "COMENDADOR",
    type: "Iate Executivo",
    images: [comendadorImage],
    capacity: 25,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate COMENDADOR com capacidade para 25 passageiros",
    category: "iate"
  },
  dragao: {
    id: "dragao",
    name: "Dragão",
    type: "Iate Médio",
    images: [dragaoImage],
    capacity: 17,
    price: "R$ 4.000",
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    description: "Iate Dragão de 41 pés para 17 passageiros",
    category: "iate"
  },
  grandraray: {
    id: "grandraray",
    name: "GRAND RARAY",
    type: "Iate Premium",
    images: [grandrarayImage],
    capacity: 18,
    price: "R$ 6.000",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "GRAND RARAY com embarque na Marina da Glória",
    category: "iate"
  },
  "lady-ruth": {
    id: "lady-ruth",
    name: "LADY RUTH",
    type: "Lancha Premium",
    images: [ladyRuthImage],
    capacity: 13,
    price: "R$ 1.999",
    originalPrice: "R$ 2.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lady Ruth com 5 horas de excelente passeio",
    category: "lancha"
  },
  mangata: {
    id: "mangata",
    name: "MANGATA",
    type: "Iate Premium",
    images: [mangataImage],
    capacity: 12,
    price: "R$ 11.500",
    originalPrice: "R$ 12.000",
    rating: 4.9,
    duration: "5h",
    location: "Iate Clube Rio de Janeiro",
    description: "Sessa Marine c44 - Mangata com copacabana/cagarras",
    category: "iate"
  },
  prestige: {
    id: "prestige",
    name: "PRESTIGE",
    type: "Lancha Premium",
    images: [prestigeImage],
    capacity: 20,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha Prestige 600 fly, dois motores volvo d 13",
    category: "lancha"
  },
  rebeca: {
    id: "rebeca",
    name: "YACHT REBECA",
    type: "Iate Luxury",
    images: [rebecaImage],
    capacity: 16,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Phantom 620 Pininfarina de 62 pés com design italiano",
    category: "iate"
  },
  oceano: {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    images: [oceanoImage],
    capacity: 65,
    price: "R$ 16.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã de até 65 passageiros com horários válidos por 30 dias",
    category: "catamara"
  },
  blau: {
    id: "blau",
    name: "CATAMARÃ BLAU",
    type: "Catamarã Premium",
    images: [blauImage],
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã Blau com embarque na Marina da Glória",
    category: "catamara"
  },
  nossa: {
    id: "nossa",
    name: "NOSSA",
    type: "Iate Premium",
    images: [nossaImage],
    capacity: 25,
    price: "R$ 7.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Pershing 52HT com gerador 110v e equipamentos completos",
    category: "iate"
  },
  seven: {
    id: "seven",
    name: "SEVEN",
    type: "Lancha Premium",
    images: [sevenImage],
    capacity: 15,
    price: "R$ 7.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha intermarine 44 pés com embarque na Marina da Glória",
    category: "lancha"
  },
  senna: {
    id: "senna",
    name: "SENNA",
    type: "Iate Premium",
    images: [sennaImage],
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "46 pés com 2 motores volvo a diesel, 2 suítes completas",
    category: "iate"
  },
  luisa: {
    id: "luisa",
    name: "LUÍSA V",
    type: "Iate Premium",
    images: [luisaImage],
    capacity: 15,
    price: "R$ 2.800",
    originalPrice: "R$ 3.200",
    rating: 4.6,
    duration: "6h",
    location: "Marina da Glória",
    description: "Luísa V com roteiro Marina da Glória x Flamengo x Aeroporto x Urca",
    category: "iate"
  }
};

const VesselDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [vesselsData, setVesselsData] = useState(initialVesselsData);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    duration: "",
    guests: "",
    route: "",
    message: ""
  });

  // Carregar dados salvos do admin se existirem
  useEffect(() => {
    const loadVesselData = () => {
      const savedData = localStorage.getItem('adminVesselsData');
      const hasCustomData = localStorage.getItem('hasCustomVesselData');
      
      console.log('VesselDetails - Verificando dados salvos:', { savedData: !!savedData, hasCustomData });
      
      if (savedData && hasCustomData === 'true') {
        try {
          const customVessels = JSON.parse(savedData);
          console.log('VesselDetails - Dados customizados carregados:', customVessels);
          setVesselsData(customVessels);
        } catch (error) {
          console.error('Erro ao carregar dados customizados no VesselDetails:', error);
        }
      }
    };

    // Carregar dados inicialmente
    loadVesselData();

    // Ouvir por atualizações do admin
    const handleVesselsUpdate = (event: any) => {
      console.log('VesselDetails - Evento de atualização recebido:', event);
      loadVesselData();
    };

    // Escutar eventos de atualização
    window.addEventListener('vesselsDataUpdated', handleVesselsUpdate);
    window.addEventListener('storage', handleVesselsUpdate);

    // Limpar listeners ao desmontar
    return () => {
      window.removeEventListener('vesselsDataUpdated', handleVesselsUpdate);
      window.removeEventListener('storage', handleVesselsUpdate);
    };
  }, []);

  const vessel = id ? vesselsData[id as keyof typeof vesselsData] : null;

  if (!vessel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Embarcação não encontrada</h2>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    const message = `
🚤 *RESERVA BRAVISSEA*

*Embarcação:* ${vessel.name}
*Nome:* ${bookingForm.name}
*Email:* ${bookingForm.email}
*Telefone:* ${bookingForm.phone}
*Data:* ${bookingForm.date}
*Duração:* ${bookingForm.duration}
*Passageiros:* ${bookingForm.guests}
*Roteiro:* ${bookingForm.route}

*Mensagem adicional:*
${bookingForm.message}

Aguardo confirmação! 🌊
    `;
    
    const whatsappUrl = `https://wa.me/5521974004415?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-secondary/30 py-8">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às embarcações
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {vessel.name}
                </h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <Badge variant="outline">{vessel.type}</Badge>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {vessel.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    {vessel.rating}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl font-bold text-primary">
                  {vessel.price}
                </div>
                <div className="text-sm text-muted-foreground">por dia</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Galeria e Detalhes */}
            <div className="lg:col-span-2">
              {/* Galeria */}
              <div className="mb-8">
                <div className="mb-4">
                  <img 
                    src={vessel.images[selectedImage]} 
                    alt={vessel.name}
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {vessel.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${vessel.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Descrição */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Sobre esta embarcação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{vessel.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Especificações</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Capacidade:</span>
                          <span>{vessel.capacity} pessoas</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Duração:</span>
                          <span>{vessel.duration}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Localização:</span>
                          <span>{vessel.location}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Avaliação:</span>
                          <span>⭐ {vessel.rating}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Categoria:</span>
                          <span className="capitalize">{vessel.category}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Incluso</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          Comandante experiente
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          Equipamentos de segurança
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          Som ambiente
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          Seguro total
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          Combustível incluso
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recursos */}
              <Card>
                <CardHeader>
                  <CardTitle>Recursos e Comodidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm">{vessel.capacity} pessoas</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm">{vessel.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <MapPin className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm">{vessel.location}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Star className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm">⭐ {vessel.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Reserva */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Waves className="h-5 w-5 mr-2 text-primary" />
                    Fazer Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name"
                      value={bookingForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone"
                      value={bookingForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(21) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Data preferida</Label>
                    <Input 
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duração</Label>
                    <Select onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4h">4 horas</SelectItem>
                        <SelectItem value="6h">6 horas</SelectItem>
                        <SelectItem value="8h">8 horas (dia inteiro)</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="guests">Número de passageiros</Label>
                    <Select onValueChange={(value) => handleInputChange('guests', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quantas pessoas?" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: vessel.capacity }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1} {i === 0 ? 'pessoa' : 'pessoas'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="route">Roteiro desejado</Label>
                    <Select onValueChange={(value) => handleInputChange('route', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha um roteiro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Baía de Guanabara">Baía de Guanabara</SelectItem>
                        <SelectItem value="Ilhas Tijucas">Ilhas Tijucas</SelectItem>
                        <SelectItem value="Angra dos Reis">Angra dos Reis</SelectItem>
                        <SelectItem value="Búzios">Búzios</SelectItem>
                        <SelectItem value="Copacabana/Cagarras">Copacabana/Cagarras</SelectItem>
                        <SelectItem value="Personalizado">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mensagem (opcional)</Label>
                    <Textarea 
                      id="message"
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Alguma solicitação especial?"
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={!bookingForm.name || !bookingForm.phone}
                  >
                    Enviar Reserva via WhatsApp
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Ao clicar, você será redirecionado para o WhatsApp com suas informações preenchidas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default VesselDetails;