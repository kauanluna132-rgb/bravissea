import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Star, MapPin, Waves, Coffee, Music, Sun } from "lucide-react";
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
import VesselImageCarousel from "@/components/VesselImageCarousel";

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

// Dados das embarcações
const vesselsData = {
  segue: {
    id: "segue",
    name: "SEGUE",
    type: "Lancha",
    images: [
      "/lovable-uploads/e52f0edd-5490-4210-9f1a-35b63fc3cf97.png",
      "/lovable-uploads/dfe6175f-7118-4636-a1b0-a4ddc3109dc1.png",
      "/lovable-uploads/fe41a6fd-0783-417f-b167-506aea17952e.png",
      "/lovable-uploads/1c084d08-90e7-465f-a60d-01bc9b8e2c50.png",
      "/lovable-uploads/aff73c70-ac4e-4f33-a275-7199028d5abe.png",
      "/lovable-uploads/915d6ac3-d213-42f2-a532-21999a73e18b.png",
      "/lovable-uploads/1a51455d-0fb7-450a-9aa2-8f47c4fbe235.png",
      "/lovable-uploads/bdf8c013-2441-43f9-beaf-26ec4c1c805d.png",
      "/lovable-uploads/05b3916b-9a80-45a7-9cc2-acf139866904.png",
      "/lovable-uploads/b945f968-c86e-4010-9c3c-6454c94a319d.png"
    ],
    capacity: 18,
    price: "R$ 18.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha Segue 58 Pés - Motores: 2 x Volvo 950 IPS. 3 quartos (1 suíte, 1 cabine de solteiro/casal, 1 cabine de proa com banheiro social). Cozinha completa com geladeiras, sala espaçosa, som Bluetooth e churrasqueira a carvão. Destinos: Enseada da Urca ou Praia de Adão e Eva.",
    category: "lancha"
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
    name: "LUÍSA VIII",
    type: "Iate 38 Pés",
    images: [
      "/lovable-uploads/03c21177-517e-46bb-ba14-3d5e3e92b548.png",
      "/lovable-uploads/5b46ecc7-6d2f-49f9-97e1-18cd69e70334.png",
      "/lovable-uploads/971d60d5-6cd7-46b1-80e0-b22fc9971ecf.png",
      "/lovable-uploads/f445fc67-3320-4ec8-9fb4-242ae592d18c.png",
      "/lovable-uploads/729365c1-b3c2-4db7-8b9d-931a2f7fb1f7.png",
      "/lovable-uploads/3e2e65a7-195a-4f5e-9cf9-39c176c713cd.png",
      "/lovable-uploads/2b635aac-c2f0-4db3-a82a-e8c116893024.png",
      "/lovable-uploads/c84fec1a-ab0f-4007-ae85-08012b4590c2.png",
      "/lovable-uploads/da929e32-33ee-4fc1-97c0-d366d63ff457.png",
      "/lovable-uploads/8ce2e68b-6ed0-47b8-9f7b-df5ab588c7d2.png"
    ],
    capacity: 13,
    price: "R$ 4.100",
    originalPrice: "R$ 5.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Luisa VIII 38 Pés - 5 horas de passeio com combustível, marinheiro, tapetão flutuante, coolers e caixa de som de altíssima qualidade",
    category: "iate"
  },
  mcell: {
    id: "mcell",
    name: "Lancha M Cell",
    type: "Lancha",
    images: [
      "/lovable-uploads/d1d17103-7ce7-4643-b993-81e04a1468e7.png",
      "/lovable-uploads/75a5ef56-8357-438c-8af1-e6bcba02d684.png",
      "/lovable-uploads/f50de78c-4e90-4465-b038-9c65c849667e.png",
      "/lovable-uploads/f5ee604f-918b-48d0-b36e-336f92696161.png",
      "/lovable-uploads/f5641c4d-f492-468c-8763-40c37a38705b.png",
      "/lovable-uploads/908cf142-ad3f-42d0-8e09-aae748064acb.png"
    ],
    capacity: 9,
    price: "R$ 2.500",
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
    images: [
      "/lovable-uploads/da929e32-33ee-4fc1-97c0-d366d63ff457.png",
      "/lovable-uploads/37823d8f-2d16-402c-8a0a-cfbaacd8c14d.png",
      "/lovable-uploads/2e6b1dea-bd55-448e-b56a-417204d37f78.png",
      "/lovable-uploads/3e2e65a7-195a-4f5e-9cf9-39c176c713cd.png",
      "/lovable-uploads/ca7513a8-7ca6-4c74-94eb-e69fde091b96.png",
      "/lovable-uploads/56562047-b47a-4a19-a6cd-ca765e9bae68.png",
      "/lovable-uploads/d5183a03-42a3-40b8-b960-998e51ffb87f.png",
      "/lovable-uploads/8ce2e68b-6ed0-47b8-9f7b-df5ab588c7d2.png",
      "/lovable-uploads/8e8c7ca9-eb50-4a92-8e06-cbcc8616d15c.png",
      "/lovable-uploads/2b635aac-c2f0-4db3-a82a-e8c116893024.png"
    ],
    capacity: 20,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória (Pier Nobre)",
    description: "Som conexão Bluetooth, 2 quartos, 2 banheiros (1 suíte), sala ampla, cozinha completa, fly e solário de proa muito espaçosos",
    category: "iate"
  },
  luisa: {
    id: "luisa",
    name: "LUÍSA V",
    type: "Iate Premium",
    images: [
      "/lovable-uploads/03c21177-517e-46bb-ba14-3d5e3e92b548.png",
      "/lovable-uploads/5b46ecc7-6d2f-49f9-97e1-18cd69e70334.png",
      "/lovable-uploads/971d60d5-6cd7-46b1-80e0-b22fc9971ecf.png",
      "/lovable-uploads/f445fc67-3320-4ec8-9fb4-242ae592d18c.png",
      "/lovable-uploads/729365c1-b3c2-4db7-8b9d-931a2f7fb1f7.png",
      "/lovable-uploads/3e2e65a7-195a-4f5e-9cf9-39c176c713cd.png",
      "/lovable-uploads/2b635aac-c2f0-4db3-a82a-e8c116893024.png",
      "/lovable-uploads/c84fec1a-ab0f-4007-ae85-08012b4590c2.png",
      "/lovable-uploads/da929e32-33ee-4fc1-97c0-d366d63ff457.png",
      "/lovable-uploads/8ce2e68b-6ed0-47b8-9f7b-df5ab588c7d2.png"
    ],
    capacity: 15,
    price: "R$ 2.800",
    originalPrice: "R$ 3.200",
    rating: 4.6,
    duration: "6h",
    location: "Marina da Glória",
    description: "LUÍSA V - Roteiro principal Marina da Glória x Flamengo x Aeroporto x Urca",
    category: "iate"
  }
};

const VesselDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
              {/* Galeria com Carrossel */}
              <div className="mb-8">
                <VesselImageCarousel
                  images={vessel.images}
                  vesselName={vessel.name}
                />
              </div>

              {/* Descrição Organizada */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Sobre a {vessel.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    {vessel.description}
                  </p>
                  
                  {vessel.id === "segue" && (
                    <div className="space-y-8">
                      {/* Especificações Técnicas */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <Waves className="h-5 w-5 mr-2" />
                          Especificações Técnicas
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Comprimento</span>
                            <p className="text-lg font-semibold">58 Pés</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Motores</span>
                            <p className="text-lg font-semibold">2 x Volvo 950 IPS</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                            <p className="text-lg font-semibold">{vessel.capacity} pessoas</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                            <p className="text-lg font-semibold">{vessel.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Acomodações */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Acomodações
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-muted/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary mb-1">3</div>
                            <p className="text-sm font-medium">Quartos</p>
                            <p className="text-xs text-muted-foreground">1 suíte, 1 cabine solteiro/casal, 1 cabine de proa</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary mb-1">2</div>
                            <p className="text-sm font-medium">Banheiros</p>
                            <p className="text-xs text-muted-foreground">1 banheiro social</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary mb-1">1</div>
                            <p className="text-sm font-medium">Cozinha</p>
                            <p className="text-xs text-muted-foreground">Completa com geladeiras</p>
                          </div>
                        </div>
                      </div>

                      {/* Comodidades */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <Coffee className="h-5 w-5 mr-2" />
                          Comodidades e Entretenimento
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <Music className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Som Bluetooth</p>
                              <p className="text-sm text-muted-foreground">Sistema de áudio conectado</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <Sun className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Churrasqueira a Carvão</p>
                              <p className="text-sm text-muted-foreground">Para refeições a bordo</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <Coffee className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Sala Espaçosa</p>
                              <p className="text-sm text-muted-foreground">Ambiente confortável</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <MapPin className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Localização Premium</p>
                              <p className="text-sm text-muted-foreground">{vessel.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Destinos */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          Destinos Disponíveis
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border border-primary/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-primary mb-2">Enseada da Urca</h5>
                            <p className="text-sm text-muted-foreground">Águas calmas e vista privilegiada do Pão de Açúcar</p>
                          </div>
                          <div className="border border-primary/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-primary mb-2">Praia de Adão e Eva</h5>
                            <p className="text-sm text-muted-foreground">Praia paradisíaca para relaxar e curtir o dia</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {vessel.id !== "segue" && (
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
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recursos Gerais */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">{vessel.capacity} pessoas</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">{vessel.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <MapPin className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">{vessel.location}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Star className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">⭐ {vessel.rating}</span>
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