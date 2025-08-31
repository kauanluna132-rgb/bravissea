import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import VesselCard from "./VesselCard";
import { 
  Search, 
  Filter, 
  Users, 
  Wifi, 
  Coffee, 
  Music, 
  Shield, 
  Waves,
  Anchor,
  Sun
} from "lucide-react";

// Importar as imagens das embarcações
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

const vessels = [
  {
    id: "segue",
    name: "SEGUE",
    type: "Lancha",
    image: "/lovable-uploads/e52f0edd-5490-4210-9f1a-35b63fc3cf97.png",
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
    features: [
      { icon: Anchor, label: "58 Pés" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Churrasqueira" },
      { icon: Shield, label: "3 Quartos" }
    ],
    description: "Lancha Segue 58 Pés com capacidade para 18 passageiros",
    highlight: true,
    category: "lancha"
  },
  {
    id: "tecnomarine",
    name: "TECNOMARINE",
    type: "Iate 52 pés",
    image: "/lovable-uploads/92b2d24f-28f3-4cdb-be14-99cf7cd729da.png",
    images: [
      "/lovable-uploads/92b2d24f-28f3-4cdb-be14-99cf7cd729da.png",
      "/lovable-uploads/4697521e-1dee-4702-bbe1-67079bb5f843.png",
      "/lovable-uploads/af99f0bb-1b98-48c8-b827-d0bc93ba7759.png",
      "/lovable-uploads/463d7eeb-42ce-415c-b7ff-80724d026b46.png",
      "/lovable-uploads/b0f38995-9c1b-4570-951d-57023d3d1199.png",
      "/lovable-uploads/95ba7d4a-ca33-4738-a613-7148b3d1b867.png",
      "/lovable-uploads/96e4b997-89be-4c5d-985b-ccd8c69440cc.png",
      "/lovable-uploads/6ba680e5-fcc8-4a6b-b81e-78a8c7589659.png",
      "/lovable-uploads/31a54bf8-6201-4349-b69a-9b289882ff99.png"
    ],
    capacity: 20,
    price: "R$ 10.000",
    rating: 4.9,
    duration: "5h",
    location: "Marina da Glória",
    size: "52 pés",
    features: [
      { icon: Anchor, label: "52 Pés" },
      { icon: Music, label: "Sistema de Som" },
      { icon: Coffee, label: "Cozinha Equipada" },
      { icon: Shield, label: "Marinheiro Incluso" }
    ],
    description: "Iate Tecnomarine 52 pés com capacidade para 20 passageiros",
    category: "iate"
  },
  {
    id: "myway",
    name: "IATE MY WAY",
    type: "Lancha 60 pés",
    image: "/lovable-uploads/3588f07b-7df8-4af6-829b-24ecd40b669e.png",
    images: [
      "/lovable-uploads/3588f07b-7df8-4af6-829b-24ecd40b669e.png",
      "/lovable-uploads/78c323b5-e854-4a7c-ad9c-66b0477d604b.png",
      "/lovable-uploads/9eddcf09-1dc0-44ce-8335-a8c03e574409.png",
      "/lovable-uploads/221aa19e-adc7-47e6-a105-6d253b1b47fa.png",
      "/lovable-uploads/be0928b3-3995-4daf-a4c0-9e51b1c70487.png",
      "/lovable-uploads/df620d3e-513f-4487-adc4-4b90ca2dc0c3.png",
      "/lovable-uploads/6f10c3d7-fdd1-4a6b-aff5-c747bab05438.png",
      "/lovable-uploads/9dd84655-7e04-4441-9eab-f45a778e5d9c.png",
      "/lovable-uploads/e02bd15f-6c03-4c32-85fc-5de1a208a6e3.png"
    ],
    capacity: 20,
    price: "R$ 12.000",
    rating: 4.9,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "60 Pés" },
      { icon: Music, label: "Caixa de Som" },
      { icon: Coffee, label: "Cozinha Equipada" },
      { icon: Waves, label: "Flybrigde" }
    ],
    description: "Iate my way - Lancha 60 pés com 3 quartos, 2 banheiros, sala 2 ambientes e cozinha equipada",
    highlight: true,
    category: "lancha"
  },
  {
    id: "flyhi",
    name: "LUÍSA VIII",
    type: "Iate 38 Pés",
    image: "/lovable-uploads/7e95a21c-7588-479d-b209-a63d158402cf.png",
    images: [
      "/lovable-uploads/7e95a21c-7588-479d-b209-a63d158402cf.png",
      "/lovable-uploads/2ebda6df-6882-4c6b-b682-b007670efd23.png",
      "/lovable-uploads/ef09472e-331c-4441-b5da-2117580f78b7.png",
      "/lovable-uploads/4e87113f-0897-4e88-9229-f6f955dcf309.png",
      "/lovable-uploads/d6e878ee-6e60-46e8-969a-16cc6c49f976.png",
      "/lovable-uploads/6e132063-1c8a-4b6b-ac64-0ef4627ea834.png",
      "/lovable-uploads/32d94aba-c4ba-4e2b-be73-c76551f11a47.png",
      "/lovable-uploads/cd17a893-4bbc-4a82-bf5b-84b03ea11881.png",
      "/lovable-uploads/dfd65f37-942d-4bf1-9741-434ae2430999.png",
      "/lovable-uploads/86c6955b-f427-49fe-a9ce-30905edd7328.png"
    ],
    capacity: 13,
    price: "R$ 3.200",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "38 Pés" },
      { icon: Music, label: "Som de Altíssima Qualidade" },
      { icon: Coffee, label: "Coolers" },
      { icon: Shield, label: "Marinheiro Incluso" }
    ],
    description: "Luisa 8 38 Pés - 5 horas de passeio com combustível, marinheiro, tapetão flutuante, coolers e caixa de som de altíssima qualidade",
    category: "iate"
  },
  {
    id: "mcell",
    name: "Lancha M Cell",
    type: "Lancha",
    image: "/lovable-uploads/fe22476e-95ca-419b-b283-9a55cd96b7a9.png",
    capacity: 9,
    price: "R$ 2.500",
    originalPrice: undefined,
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Users, label: "Grupos Pequenos" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Sun, label: "Churrasqueira" },
      { icon: Shield, label: "Banheiro" }
    ],
    description: "Lancha M Cell com cabine, churrasqueira e todas as comodidades para um passeio perfeito",
    category: "lancha"
  },
  {
    id: "comendador",
    name: "COMENDADOR",
    type: "Iate Executivo",
    image: comendadorImage,
    capacity: 25,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "Grande Capacidade" },
      { icon: Music, label: "Som Profissional" },
      { icon: Coffee, label: "Cozinha Completa" },
      { icon: Waves, label: "Múltiplos Decks" }
    ],
    description: "Iate COMENDADOR com capacidade para 25 passageiros",
    category: "iate"
  },
  {
    id: "dragao",
    name: "DRAGÃO",
    type: "Iate 41 pés",
    image: "/lovable-uploads/063d534d-72c1-4861-964e-1013f7b5e1fb.png",
    images: [
      "/lovable-uploads/063d534d-72c1-4861-964e-1013f7b5e1fb.png",
      "/lovable-uploads/78e24106-0662-4b8f-b957-01c6446386f0.png",
      "/lovable-uploads/e0c8a5e9-c885-4aaa-8a4e-2f6e32b615eb.png",
      "/lovable-uploads/206b8791-35ce-478d-b0ce-50f36209cdbb.png",
      "/lovable-uploads/811fbc3c-bbbb-49d6-9ef2-6b047f5dee31.png",
      "/lovable-uploads/991fc380-07b8-4ab0-869a-af16900c15e0.png",
      "/lovable-uploads/9b059d47-e2ac-4f6a-bccf-b5d9f4b6a2ae.png",
      "/lovable-uploads/b7ece9f5-ac8c-4875-8123-350d6f0bbae6.png",
      "/lovable-uploads/4babac2a-c5e7-4a90-a06f-af9ef7824b00.png",
      "/lovable-uploads/6dd56391-2365-43bd-9ac8-52d83aec7bbf.png"
    ],
    capacity: 17,
    price: "R$ 4.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    size: "41 pés",
    features: [
      { icon: Anchor, label: "41 Pés" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Churrasqueira" },
      { icon: Shield, label: "2 Tripulantes" }
    ],
    description: "Iate de 41 pés com capacidade para 17 passageiros + 2 tripulantes",
    category: "iate"
  },
  {
    id: "grandraray",
    name: "GRAND RARAY",
    type: "Iate Premium",
    image: "/lovable-uploads/ab7f00cd-e5bd-490d-8dce-6f179460fd9a.png",
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "20 Passageiros" },
      { icon: Music, label: "Som Altíssima Qualidade" },
      { icon: Coffee, label: "Coolers" },
      { icon: Waves, label: "Tapetão Flutuante" }
    ],
    description: "GRAND RARAY com 5 horas de passeio e equipamentos de primeira qualidade",
    category: "iate"
  },
  // Novas embarcações
  {
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
    features: [
      { icon: Anchor, label: "13 Passageiros" },
      { icon: Music, label: "Som" },
      { icon: Coffee, label: "Combustível Incluso" },
      { icon: Shield, label: "Marinheiro" }
    ],
    description: "Lady Ruth com 5 horas de excelente passeio",
    category: "lancha"
  },
  {
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
    features: [
      { icon: Anchor, label: "44 Pés" },
      { icon: Music, label: "Som 3 Ambientes" },
      { icon: Coffee, label: "Geladeira" },
      { icon: Shield, label: "2 Quartos" }
    ],
    description: "Sessa Marine c44 - Mangata com copacabana/cagarras",
    category: "iate"
  },
  {
    id: "prestige",
    name: "PRESTIGE",
    type: "Lancha Premium",
    image: prestigeImage,
    capacity: 20,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "600 Fly" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Cozinha Completa" },
      { icon: Shield, label: "3 Quartos" }
    ],
    description: "Lancha Prestige 600 fly, dois motores volvo d 13",
    category: "lancha"
  },
  {
    id: "rebeca",
    name: "YACHT REBECA",
    type: "Iate Luxury",
    image: rebecaImage,
    capacity: 16,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "62 Pés" },
      { icon: Music, label: "Pininfarina" },
      { icon: Coffee, label: "Cozinha Gourmet" },
      { icon: Shield, label: "Design Italiano" }
    ],
    description: "Phantom 620 Pininfarina de 62 pés com design italiano",
    category: "iate"
  },
  {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    image: oceanoImage,
    capacity: 65,
    price: "R$ 16.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "65 Passageiros" },
      { icon: Music, label: "Horários Flexíveis" },
      { icon: Coffee, label: "Roteiro Interno" },
      { icon: Shield, label: "Marinheiro" }
    ],
    description: "Catamarã de até 65 passageiros com horários válidos por 30 dias",
    category: "catamara"
  },
  {
    id: "blau",
    name: "CATAMARÃ BLAU",
    type: "Catamarã Premium",
    image: blauImage,
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "20 Passageiros" },
      { icon: Music, label: "Som" },
      { icon: Coffee, label: "Combustível Incluso" },
      { icon: Shield, label: "Marinheiro" }
    ],
    description: "Catamarã Blau com embarque na Marina da Glória",
    category: "catamara"
  },
  {
    id: "nossa",
    name: "NOSSA",
    type: "Iate Premium",
    image: nossaImage,
    capacity: 25,
    price: "R$ 7.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "52HT" },
      { icon: Music, label: "TV" },
      { icon: Coffee, label: "Frigobar" },
      { icon: Shield, label: "Churrasqueira" }
    ],
    description: "Pershing 52HT com gerador 110v e equipamentos completos",
    category: "iate"
  },
  {
    id: "seven",
    name: "SEVEN",
    type: "Lancha Premium",
    image: sevenImage,
    capacity: 15,
    price: "R$ 7.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "44 Pés" },
      { icon: Music, label: "Som" },
      { icon: Coffee, label: "Combustível Incluso" },
      { icon: Shield, label: "Marinheiro" }
    ],
    description: "Lancha intermarine 44 pés com embarque na Marina da Glória",
    category: "lancha"
  },
  {
    id: "senna",
    name: "SENNA",
    type: "Iate Premium",
    image: "/lovable-uploads/758a21a0-0f35-4d63-8802-bf9fb5543f54.png",
    capacity: 18,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória (Pier Nobre)",
    features: [
      { icon: Anchor, label: "Motores diesel 500HP" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "2 quartos, 2 banheiros (1 suíte)" },
      { icon: Shield, label: "Fly e solário espaçosos" }
    ],
    description: "Capacidade: 18 passageiros + 2 tripulantes. Motores de centro diesel 500HP",
    category: "iate"
  },
  {
    id: "luisa",
    name: "LUÍSA V",
    type: "Iate Premium",
    image: "/lovable-uploads/03c21177-517e-46bb-ba14-3d5e3e92b548.png",
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
    price: "R$ 3.200",
    rating: 4.6,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "15 Passageiros" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Churrasqueira" },
      { icon: Shield, label: "Marinheiro Incluso" }
    ],
    description: "LUÍSA V - Iate Premium para até 15 passageiros com comodidades completas",
    category: "iate"
  }
];

const VesselCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { id: "all", name: "Todas", count: vessels.length },
    { id: "lancha", name: "Lanchas", count: vessels.filter(v => v.category === "lancha").length },
    { id: "iate", name: "Iates", count: vessels.filter(v => v.category === "iate").length },
    { id: "catamara", name: "Catamarãs", count: vessels.filter(v => v.category === "catamara").length }
  ];

  const filteredVessels = vessels
    .filter(vessel => {
      const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vessel.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || vessel.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, ""));
        case "price-high":
          return parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, ""));
        case "capacity":
          return b.capacity - a.capacity;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.highlight ? 1 : -1;
      }
    });

  return (
    <section id="embarcacoes" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Nossa Frota Premium
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Escolha Sua
            <span className="text-gradient-ocean"> Embarcação</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma frota diversificada de embarcações premium, todas equipadas com os melhores 
            equipamentos de segurança e conforto para garantir uma experiência inesquecível.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar embarcação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-background border-border/50 focus:border-primary"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="featured">Destaques</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="capacity">Capacidade</option>
              <option value="rating">Avaliação</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            {filteredVessels.length} embarcação{filteredVessels.length !== 1 ? 'ões' : ''} encontrada{filteredVessels.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Vessel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredVessels.map((vessel) => (
            <VesselCard
              key={vessel.id}
              {...vessel}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredVessels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhuma embarcação encontrada</h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar os filtros ou termo de busca
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Não encontrou o que procurava?</h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco e criaremos uma experiência personalizada para você!
            </p>
            <Button asChild className="btn-ocean">
              <a href="https://wa.me/5521974004415?text=Olá! Gostaria de uma experiência personalizada." target="_blank" rel="noopener noreferrer">
                Falar com Especialista
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VesselCatalog;