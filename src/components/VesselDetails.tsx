import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import VesselImageCarousel from "@/components/VesselImageCarousel";
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Clock, 
  MapPin, 
  MessageCircle,
  Calendar,
  Phone,
  Mail,
  User,
  ChevronDown
} from "lucide-react";

// Import vessel images
import segueImage from "@/assets/segue-yacht.jpg";
import tecnomarineImage from "@/assets/tecnomarine-yacht.jpg";
import mywayImage from "@/assets/myway-yacht.jpg";
import flyhiImage from "@/assets/flyhi-boat.jpg";
import mcellImage from "@/assets/mcell-boat.jpg";
import comendadorImage from "@/assets/comendador-yacht.jpg";
import dragaoImage from "@/assets/dragao-yacht.jpg";
import grandrarayImage from "@/assets/grandraray-yacht.jpg";
// Novas embarcações
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

// Vessel data
const vesselData = {
  segue: {
    id: "segue",
    name: "SEGUE",
    type: "Iate Premium",
    image: "/lovable-uploads/4eb88489-9d37-44c7-bb1a-547255829476.png",
    capacity: 18,
    price: "R$ 18.000",
    originalPrice: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Iate premium com capacidade para 18 passageiros, oferecendo o máximo em luxo e conforto para experiências náuticas inesquecíveis.",
    specifications: {
      comprimento: "45 pés",
      motor: "Volvo Penta 435hp",
      combustivel: "Diesel",
      capacidadeTanque: "400L"
    },
    included: [
      "Capitão experiente",
      "Marinheiro auxiliar", 
      "Seguro completo",
      "Equipamentos de segurança",
      "Sistema de som premium",
      "Bar completo"
    ],
    gallery: [
      "/lovable-uploads/4eb88489-9d37-44c7-bb1a-547255829476.png",
      "/lovable-uploads/5fb2c34b-d3b5-457d-bc6a-d39fcf8d281f.png",
      "/lovable-uploads/e209f3ee-4882-462f-83a4-b531d46d4efc.png",
      "/lovable-uploads/cac40335-6a5a-41e2-adfb-43fffc758a17.png",
      "/lovable-uploads/04916aad-37e7-4b88-8cd2-b80513033416.png",
      "/lovable-uploads/924e7658-9396-476b-8c54-f5eecf84cb9f.png",
      "/lovable-uploads/c26f0a9f-f83b-49ec-936f-772e609da02e.png",
      "/lovable-uploads/5d794707-588b-4644-adf5-8125a31abe64.png",
      "/lovable-uploads/7322c1ba-e0c3-4f27-be58-1af0b49e4beb.png",
      "/lovable-uploads/44323201-dca2-4c5f-ad47-833a22a0162c.png"
    ],
    images: [
      "/lovable-uploads/4eb88489-9d37-44c7-bb1a-547255829476.png",
      "/lovable-uploads/5fb2c34b-d3b5-457d-bc6a-d39fcf8d281f.png",
      "/lovable-uploads/e209f3ee-4882-462f-83a4-b531d46d4efc.png",
      "/lovable-uploads/cac40335-6a5a-41e2-adfb-43fffc758a17.png",
      "/lovable-uploads/04916aad-37e7-4b88-8cd2-b80513033416.png",
      "/lovable-uploads/924e7658-9396-476b-8c54-f5eecf84cb9f.png",
      "/lovable-uploads/c26f0a9f-f83b-49ec-936f-772e609da02e.png",
      "/lovable-uploads/5d794707-588b-4644-adf5-8125a31abe64.png",
      "/lovable-uploads/7322c1ba-e0c3-4f27-be58-1af0b49e4beb.png",
      "/lovable-uploads/44323201-dca2-4c5f-ad47-833a22a0162c.png"
    ]
  },
  tecnomarine: {
    id: "tecnomarine",
    name: "Iate Tecnomarine",
    type: "Iate Executive",
    image: tecnomarineImage,
    capacity: 20,
    price: "R$ 10.000",
    originalPrice: undefined,
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate Tecnomarine com alta tecnologia e design moderno, ideal para grupos de até 20 pessoas.",
    specifications: {
      comprimento: "42 pés",
      motor: "Caterpillar 450hp",
      combustivel: "Diesel",
      capacidadeTanque: "350L"
    },
    included: [
      "Capitão profissional",
      "Tripulação completa",
      "Seguro total",
      "Equipamentos náuticos",
      "Sistema de navegação GPS",
      "Cozinha equipada"
    ],
    gallery: [tecnomarineImage],
    images: [tecnomarineImage]
  },
  myway: {
    id: "myway",
    name: "IATE MY WAY",
    type: "Lancha 60 pés",
    image: "/lovable-uploads/myway-1.png",
    capacity: 20,
    price: "R$ 12.000",
    originalPrice: undefined,
    rating: 4.9,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha 60 pés com 3 quartos, 2 banheiros, sala 2 ambientes, cozinha equipada, flybrigde com sofá e mesinha, coolers disponíveis e caixa de som.",
    specifications: {
      comprimento: "60 pés",
      quartos: "3 Quartos",
      banheiros: "2 Banheiros",
      sala: "2 ambientes",
      cozinha: "Equipada",
      flybrigde: "Com sofá e mesinha"
    },
    included: [
      "Lancha 60 pés",
      "3 Quartos",
      "2 Banheiros", 
      "Sala 2 ambientes",
      "Cozinha equipada",
      "Flybrigde com sofá e mesinha",
      "Coolers disponíveis",
      "Caixa de som"
    ],
    schedules: {
      manha: "08:00 às 13:00",
      tarde: "14:00 às 19:00"
    },
    pricing: {
      taxaChurrasco: "R$ 200",
      duracao: "5 horas",
      horaExtra: "R$ 3.500,00",
      gerador: "R$ 3.000,00"
    },
    routes: [
      { name: "Mureta da Urca", price: "R$ 12.000" },
      { name: "Praia Vermelha", price: "R$ 13.000,00" },
      { name: "Adão e Eva (Niterói)", price: "R$ 13.000,00" },
      { name: "Copacabana", price: "R$ 15.000,00" },
      { name: "Ilhas Cagarras", price: "R$ 17.000,00" }
    ],
    gallery: [
      "/lovable-uploads/myway-1.png",
      "/lovable-uploads/myway-2.png",
      "/lovable-uploads/myway-3.png",
      "/lovable-uploads/myway-4.png",
      "/lovable-uploads/myway-5.png"
    ],
    images: [
      "/lovable-uploads/myway-1.png",
      "/lovable-uploads/myway-2.png",
      "/lovable-uploads/myway-3.png",
      "/lovable-uploads/myway-4.png",
      "/lovable-uploads/myway-5.png"
    ]
  },
  flyhi: {
    id: "flyhi",
    name: "FLY HI",
    type: "Lancha Premium",
    image: flyhiImage,
    capacity: 15,
    price: "R$ 3.200",
    originalPrice: "R$ 3.700",
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha FLY HI ideal para passeios emocionantes com velocidade e adrenalina.",
    specifications: {
      comprimento: "32 pés",
      motor: "Mercury 300hp",
      combustivel: "Gasolina",
      capacidadeTanque: "200L"
    },
    included: [
      "Piloto experiente",
      "Seguro",
      "Equipamentos de segurança",
      "Som premium",
      "Cooler com gelo"
    ],
    gallery: [flyhiImage],
    images: [flyhiImage]
  },
  mcell: {
    id: "mcell",
    name: "M CELL",
    type: "Lancha Compacta",
    image: mcellImage,
    capacity: 9,
    price: "R$ 1.999",
    originalPrice: "R$ 2.400",
    rating: 4.6,
    duration: "4h",
    location: "Marina da Glória",
    description: "Lancha compacta M CELL perfeita para grupos pequenos e passeios íntimos.",
    specifications: {
      comprimento: "28 pés",
      motor: "Yamaha 225hp",
      combustivel: "Gasolina",
      capacidadeTanque: "150L"
    },
    included: [
      "Piloto profissional",
      "Seguro básico",
      "Kit de segurança",
      "Sistema de som"
    ],
    gallery: [mcellImage],
    images: [mcellImage]
  },
  comendador: {
    id: "comendador",
    name: "COMENDADOR",
    type: "Iate Executivo",
    image: comendadorImage,
    capacity: 25,
    price: "R$ 7.700",
    originalPrice: undefined,
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate COMENDADOR com capacidade para 25 passageiros, ideal para eventos corporativos.",
    specifications: {
      comprimento: "48 pés",
      motor: "Cummins 550hp",
      combustivel: "Diesel",
      capacidadeTanque: "450L"
    },
    included: [
      "Capitão experiente",
      "Tripulação de apoio",
      "Seguro completo",
      "Equipamentos profissionais",
      "Som profissional",
      "Cozinha completa"
    ],
    gallery: [comendadorImage],
    images: [comendadorImage]
  },
  dragao: {
    id: "dragao",
    name: "Dragão",
    type: "Iate Médio",
    image: dragaoImage,
    capacity: 17,
    price: "R$ 4.000",
    originalPrice: undefined,
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    description: "Iate Dragão de 41 pés com design clássico e conforto moderno.",
    specifications: {
      comprimento: "41 pés",
      motor: "Volvo 380hp",
      combustivel: "Diesel",
      capacidadeTanque: "320L"
    },
    included: [
      "Capitão qualificado",
      "Tripulação",
      "Seguro náutico",
      "Sistema de audio",
      "Bar básico"
    ],
    gallery: [dragaoImage],
    images: [dragaoImage]
  },
  grandraray: {
    id: "grandraray",
    name: "GRAND RARAY",
    type: "Iate Premium",
    image: grandrarayImage,
    capacity: 18,
    price: "R$ 6.000",
    originalPrice: undefined,
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "GRAND RARAY com embarque na Marina da Glória e vista panorâmica excepcional.",
    specifications: {
      comprimento: "43 pés",
      motor: "Caterpillar 420hp",
      combustivel: "Diesel",
      capacidadeTanque: "380L"
    },
    included: [
      "Capitão certificado",
      "Marinheiro auxiliar",
      "Seguro total",
      "Som surround",
      "Cozinha gourmet",
      "Vista panorâmica"
    ],
    gallery: [grandrarayImage],
    images: [grandrarayImage]
  },
  "lady-ruth": {
    id: "lady-ruth",
    name: "LADY RUTH",
    type: "Lancha Premium",
    image: ladyRuthImage,
    capacity: 13,
    price: "R$ 1.999",
    originalPrice: "R$ 2.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lady Ruth oferece 5 horas de excelente passeio com combustível incluso, marinheiro experiente e toda segurança para até 13 passageiros.",
    specifications: {
      comprimento: "38 pés",
      motor: "2x Mercury 250hp",
      combustivel: "Gasolina",
      capacidadeTanque: "300L"
    },
    included: [
      "5 horas de excelente passeio",
      "Combustível incluso",
      "Marinheiro experiente",
      "Equipamentos de segurança",
      "Seguro náutico"
    ],
    gallery: [ladyRuthImage],
    images: [ladyRuthImage]
  },
  mangata: {
    id: "mangata",
    name: "MANGATA",
    type: "Iate Premium",
    image: mangataImage,
    capacity: 12,
    price: "R$ 11.500",
    originalPrice: "R$ 12.000",
    rating: 4.9,
    duration: "5h",
    location: "Iate Clube Rio de Janeiro",
    description: "Sessa Marine c44 de 44 pés com capacidade para 12 pessoas + marinheiro. Localizado na Marina da Glória com espaço de convivência, cabine, quartos e banheiro.",
    specifications: {
      comprimento: "44 pés",
      motor: "2x Volvo Penta 370hp",
      combustivel: "Diesel",
      capacidadeTanque: "400L"
    },
    included: [
      "Gerador mase 10.5",
      "Antena digital",
      "2 quartos",
      "2 banheiros",
      "1 cozinha + mesa de jantar",
      "TV e sistema de som independente nos 3 ambientes",
      "2 freezer",
      "1 geladeira",
      "1 microondas",
      "Ar condicionado",
      "Boiler",
      "Área gourmet elétrica na popa",
      "Churrasqueira elétrica e pia",
      "Churrasqueira a carvão",
      "HT elétrico",
      "GPS",
      "Som",
      "Plataforma submergível",
      "Luzes subaquáticas",
      "Taxa de churrasqueiro R$200"
    ],
    gallery: [mangataImage],
    images: [mangataImage]
  },
  prestige: {
    id: "prestige",
    name: "PRESTIGE",
    type: "Lancha Premium",
    image: prestigeImage,
    capacity: 20,
    price: "R$ 20.000",
    originalPrice: undefined,
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha Prestige 600 fly com dois motores Volvo D13, três quartos sendo uma suíte, uma cabine de solteiro que também pode se transformar em casal, e uma cabine de proa com banheiro social.",
    specifications: {
      comprimento: "60 pés",
      motor: "2x Volvo D13 900hp",
      combustivel: "Diesel",
      capacidadeTanque: "800L"
    },
    included: [
      "Cozinha completa com duas geladeiras",
      "2 mini freezer",
      "Microondas",
      "Fogão elétrico",
      "Sala espaçosa com dois sofás",
      "Armários nos quartos e na sala",
      "Água quente em todas as torneiras",
      "Gerador de 15",
      "Churrasqueira elétrica",
      "Máquina de gelo",
      "Som Bluetooth com automação independente em todos os ambientes",
      "Fly com pia!"
    ],
    gallery: [prestigeImage],
    images: [prestigeImage]
  },
  rebeca: {
    id: "rebeca",
    name: "YACHT REBECA",
    type: "Iate Luxury",
    image: rebecaImage,
    capacity: 16,
    price: "R$ 20.000",
    originalPrice: undefined,
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Phantom 620 Pininfarina de 62 pés com capacidade para até 16 passageiros e pernoite para até 7 passageiros. Design italiano responsável pelo desenho de marcas como Ferrari e Maserati.",
    specifications: {
      comprimento: "62 pés",
      motor: "2x MAN V12 1200hp",
      combustivel: "Diesel",
      capacidadeTanque: "1000L"
    },
    included: [
      "Espaço de convivência",
      "Cabine",
      "Quartos e banheiro",
      "Sala de jantar",
      "Cozinha",
      "Amplo cockpit",
      "Solário na proa com duas opções de distribuição",
      "Cozinha gourmet na plataforma",
      "Fly-bridge bastante espaçoso",
      "Design italiano Pininfarina",
      "Passei com duração de 6 horas com combustível incluso"
    ],
    gallery: [rebecaImage],
    images: [rebecaImage]
  },
  oceano: {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    image: oceanoImage,
    capacity: 65,
    price: "R$ 16.000",
    originalPrice: undefined,
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã de até 65 passageiros com horários válidos por 30 dias. Período de 5hrs com roteiro interno.",
    specifications: {
      comprimento: "65 pés",
      motor: "2x Caterpillar 350hp",
      combustivel: "Diesel",
      capacidadeTanque: "600L"
    },
    included: [
      "Marinheiro e combustível",
      "Horário manhã: 10hs às 15hs",
      "Horário Tarde: 16hs às 21hs",
      "Noite/Livre: a combinar",
      "Até 50 passageiros - R$16.000,00",
      "Até 65 passageiros - R$18.000,00"
    ],
    gallery: [oceanoImage],
    images: [oceanoImage]
  },
  blau: {
    id: "blau",
    name: "CATAMARÃ BLAU",
    type: "Catamarã Premium",
    image: blauImage,
    capacity: 20,
    price: "R$ 7.000",
    originalPrice: undefined,
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã Blau para 20 passageiros com 5 horas de passeio. Marinheiro e churrasqueiro inclusos, combustível incluso.",
    specifications: {
      comprimento: "45 pés",
      motor: "2x Yanmar 150hp",
      combustivel: "Diesel",
      capacidadeTanque: "400L"
    },
    included: [
      "Marinheiro e churrasqueiro",
      "Combustível incluso",
      "Embarque: Marina da Glória",
      "Roteiro: Urca X Praia Vermelha",
      "Itaipu ou cagarras acréscimo de R$2.000,00"
    ],
    gallery: [blauImage],
    images: [blauImage]
  },
  nossa: {
    id: "nossa",
    name: "NOSSA",
    type: "Iate Premium",
    image: nossaImage,
    capacity: 25,
    price: "R$ 7.500",
    originalPrice: undefined,
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Pershing 52HT com gerador 110v, TV, frigobar, churrasqueira a gás, sala, camarote (quarto), banheiro, marinheiro e combustível.",
    specifications: {
      comprimento: "52 pés",
      motor: "2x MAN V8 800hp",
      combustivel: "Diesel",
      capacidadeTanque: "600L"
    },
    included: [
      "Gerador 110v",
      "TV",
      "Frigobar",
      "Churrasqueira a gás",
      "Sala",
      "Camarote (quarto)",
      "Banheiro",
      "Marinheiro",
      "Combustível",
      "Prancha Stand-up",
      "Teto solar",
      "5 horas de passeio",
      "08:00 as 13:00",
      "13:30 as 18:30"
    ],
    gallery: [nossaImage],
    images: [nossaImage]
  },
  seven: {
    id: "seven",
    name: "SEVEN",
    type: "Lancha Premium",
    image: sevenImage,
    capacity: 15,
    price: "R$ 7.000",
    originalPrice: undefined,
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha intermarine 44 pés com embarque na Marina da Glória. Diversos roteiros disponíveis com taxa de churrasco de R$200,00.",
    specifications: {
      comprimento: "44 pés",
      motor: "2x Volvo Penta 435hp",
      combustivel: "Diesel",
      capacidadeTanque: "450L"
    },
    included: [
      "Embarque: Marina da Glória",
      "Roteiro 1: Marina da glória x Flamengo x Botafogo x mureta x marina da glória R$7.000,00",
      "Roteiro 2: Marina da glória x Flamengo x Botafogo x mureta x praia vermelha x marina da glória R$7.500,00",
      "Roteiro 3: Marina da glória x Flamengo x Botafogo x mureta x praia vermelha x Copacabana x marina da glória R$7.900,00",
      "Roteiro 4: Marina da glória x Flamengo x Botafogo x mureta x praia vermelha x ilhas cagarras x marina da glória R$8.400,00",
      "Roteiro 5: Marina da glória x Flamengo x Botafogo x piratininga x Camboinhas x itaipu x marina da glória R$8.400,00",
      "Taxa de churrasco R$200,0"
    ],
    gallery: [sevenImage],
    images: [sevenImage]
  },
  senna: {
    id: "senna",
    name: "SENNA",
    type: "Iate Premium",
    image: sennaImage,
    capacity: 20,
    price: "R$ 7.000",
    originalPrice: undefined,
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "46 pés com 2 motores volvo a diesel, com capacidade para 20 pessoas, com 2 suítes, ar condicionado, gerador, som, geladeira, microondas, tv, boiler, fogão, cooler, sala, fly.",
    specifications: {
      comprimento: "46 pés",
      motor: "2x Volvo Penta 435hp",
      combustivel: "Diesel",
      capacidadeTanque: "500L"
    },
    included: [
      "2 suítes",
      "Ar condicionado",
      "Gerador",
      "Som",
      "Geladeira",
      "Microondas",
      "TV",
      "Boiler",
      "Fogão",
      "Cooler",
      "Sala",
      "Fly",
      "Horários alta temporada",
      "08:00 às 14:00",
      "14:30 às 19:30",
      "Marina x mureta da Urca R$7000",
      "Marina x praia de Adão e Eva ou morcego R$10.000,00",
      "Marina x praia vermelha R$10.000,00",
      "Marina x Copacabana R$12.000,00",
      "Marina x praia de Itaipu R$12.000,00",
      "Marina x cagarras R$ 12.500,00",
      "Hora extra R$2.000",
      "R$200,00 taxa churrasqueiro",
      "Está incluso diesel, comandante e auxiliar"
    ],
    gallery: [sennaImage],
    images: [sennaImage]
  },
  luisa: {
    id: "luisa",
    name: "LUÍSA V",
    type: "Iate Premium",
    image: luisaImage,
    capacity: 15,
    price: "R$ 2.800",
    originalPrice: "R$ 3.200",
    rating: 4.6,
    duration: "6h",
    location: "Marina da Glória",
    description: "Luísa V com roteiro Marina da Glória x Flamengo x Aeroporto x Urca. Incluso: Marinheiro, combustível e churrasqueira.",
    specifications: {
      comprimento: "42 pés",
      motor: "2x Caterpillar 350hp",
      combustivel: "Diesel",
      capacidadeTanque: "400L"
    },
    included: [
      "Marinheiro",
      "Combustível",
      "Churrasqueira",
      "08:00 as 13:00 = R$3.200,00",
      "13:00 as 19:00 = R$3.200,00",
      "Roteiro: Marina da Glória X Flamengo X Aeroporto X Urca",
      "Praia de Copacabana adicional = R$600",
      "Ilhas cagarras ou Itaipu adicional = R$1.000,00",
      "Taxa de Churrasqueiro= R$200,00",
      "Taxa de Embarque = R$200,00",
      "Coolers/macarrão flutuantes / churrasqueira"
    ],
    gallery: [luisaImage],
    images: [luisaImage]
  }
};

// Hook para detectar dispositivos móveis
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const VesselDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState(0);
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

  const vessel = vesselData[id as keyof typeof vesselData];

  if (!vessel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Embarcação não encontrada</h1>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    try {
      setBookingForm(prev => ({
        ...prev,
        [field]: value || ""
      }));
    } catch (error) {
      console.error("Erro ao atualizar formulário:", error);
    }
  };

  const handleBooking = () => {
    const message = `Olá! Gostaria de fazer uma reserva da embarcação ${vessel.name}.

Dados da reserva:
- Nome: ${bookingForm.name}
- Email: ${bookingForm.email}
- Telefone: ${bookingForm.phone}
- Data: ${bookingForm.date}
- Duração: ${bookingForm.duration}
- Número de pessoas: ${bookingForm.guests}
- Roteiro: ${bookingForm.route}
- Observações: ${bookingForm.message}

Aguardo retorno!`;

    const whatsappUrl = `https://wa.me/5521974004415?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Container com padding-top para evitar sobreposição da navbar */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header movido para dentro do main content */}
            <div className="space-y-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{vessel.name}</h1>
                      <Badge variant="secondary">{vessel.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{vessel.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{vessel.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-left md:text-right">
                    <div className="text-3xl font-bold text-primary">{vessel.price}</div>
                    {vessel.originalPrice && (
                      <div className="text-lg text-muted-foreground line-through">{vessel.originalPrice}</div>
                    )}
                    <div className="text-sm text-muted-foreground">por passeio</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <VesselImageCarousel
                images={vessel.images || vessel.gallery}
                vesselName={vessel.name}
                isAdminMode={false}
              />
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Sobre a Embarcação</h2>
              <p className="text-muted-foreground leading-relaxed">{vessel.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Especificações</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(vessel.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-border">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Incluído no Passeio</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {vessel.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-muted rounded-xl">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-lg">{vessel.capacity}</div>
                <div className="text-sm text-muted-foreground">Passageiros</div>
              </div>
              <div className="text-center p-6 bg-muted rounded-xl">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-lg">{vessel.duration}</div>
                <div className="text-sm text-muted-foreground">Duração</div>
              </div>
              <div className="text-center p-6 bg-muted rounded-xl">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-lg">Marina</div>
                <div className="text-sm text-muted-foreground">da Glória</div>
              </div>
            </div>

            {/* My Way Specific Information */}
            {vessel.id === 'myway' && (
              <>
                {/* Horários */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Horários Disponíveis</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Manhã</h4>
                      <p className="text-blue-600">{(vessel as any).schedules?.manha}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800">Tarde</h4>
                      <p className="text-orange-600">{(vessel as any).schedules?.tarde}</p>
                    </div>
                  </div>
                </div>

                {/* Preços e Taxas */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Preços e Taxas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Taxa de churrasco:</span>
                      <span className="font-semibold">{(vessel as any).pricing?.taxaChurrasco}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Duração:</span>
                      <span className="font-semibold">{(vessel as any).pricing?.duracao}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Hora extra:</span>
                      <span className="font-semibold">{(vessel as any).pricing?.horaExtra}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Gerador (ar, geladeira, etc):</span>
                      <span className="font-semibold">{(vessel as any).pricing?.gerador}</span>
                    </div>
                  </div>
                </div>

                {/* Roteiros */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Roteiros Disponíveis</h3>
                  <div className="space-y-3">
                    {(vessel as any).routes?.map((route: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                        <span className="font-medium text-blue-800">{route.name}</span>
                        <span className="font-bold text-blue-600">{route.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Faça sua Reserva</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={bookingForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Seu nome completo"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="seu@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={bookingForm.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(21) 99999-9999"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="date">Data do Passeio</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duração</Label>
                    {isMobile ? (
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={bookingForm.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                      >
                        <option value="">Selecione a duração</option>
                        <option value="4h">4 horas</option>
                        <option value="6h">6 horas</option>
                        <option value="8h">8 horas</option>
                        <option value="custom">Personalizado</option>
                      </select>
                    ) : (
                      <div className="relative">
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                          value={bookingForm.duration}
                          onChange={(e) => handleInputChange("duration", e.target.value)}
                        >
                          <option value="">Selecione a duração</option>
                          <option value="4h">4 horas</option>
                          <option value="6h">6 horas</option>
                          <option value="8h">8 horas</option>
                          <option value="custom">Personalizado</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="guests">Número de Pessoas</Label>
                    {isMobile ? (
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={bookingForm.guests}
                        onChange={(e) => handleInputChange("guests", e.target.value)}
                      >
                        <option value="">Quantas pessoas?</option>
                        {Array.from({ length: Math.min(vessel?.capacity || 10, 50) }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} pessoa{num > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="relative">
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                          value={bookingForm.guests}
                          onChange={(e) => handleInputChange("guests", e.target.value)}
                        >
                          <option value="">Quantas pessoas?</option>
                          {Array.from({ length: Math.min(vessel?.capacity || 10, 50) }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num.toString()}>
                              {num} pessoa{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="route">Roteiro Preferido</Label>
                    {isMobile ? (
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={bookingForm.route}
                        onChange={(e) => handleInputChange("route", e.target.value)}
                      >
                        <option value="">Escolha um roteiro</option>
                        <option value="urca">Urca</option>
                        <option value="praia-vermelha">Praia Vermelha</option>
                        <option value="praia-morcego">Praia do Morcego</option>
                        <option value="adao-eva">Adão e Eva</option>
                        <option value="ilha-cagarras">Ilha Cagarras</option>
                        <option value="ilha-tijuca">Ilha Tijuca</option>
                        <option value="personalizado">Personalizado</option>
                      </select>
                    ) : (
                      <div className="relative">
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                          value={bookingForm.route}
                          onChange={(e) => handleInputChange("route", e.target.value)}
                        >
                          <option value="">Escolha um roteiro</option>
                          <option value="urca">Urca</option>
                          <option value="praia-vermelha">Praia Vermelha</option>
                          <option value="praia-morcego">Praia do Morcego</option>
                          <option value="adao-eva">Adão e Eva</option>
                          <option value="ilha-cagarras">Ilha Cagarras</option>
                          <option value="ilha-tijuca">Ilha Tijuca</option>
                          <option value="personalizado">Personalizado</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Observações</Label>
                    <Textarea
                      id="message"
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Alguma observação especial?"
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full btn-ocean"
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enviar Reserva via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default VesselDetails;