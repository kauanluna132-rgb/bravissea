import { useState, useEffect } from "react";
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
    type: "Iate Premium",
    image: "/lovable-uploads/4eb88489-9d37-44c7-bb1a-547255829476.png",
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
    ],
    capacity: 18,
    price: "R$ 18.000",
    originalPrice: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "Luxo Premium" },
      { icon: Music, label: "Som Premium" },
      { icon: Coffee, label: "Bar Completo" },
      { icon: Shield, label: "Capitão Incluso" }
    ],
    description: "Iate premium com capacidade para 18 passageiros",
    highlight: true,
    category: "iate"
  },
  {
    id: "tecnomarine",
    name: "Iate Tecnomarine",
    type: "Iate Executive",
    image: "/lovable-uploads/0896ea4c-40a0-4ed6-8f39-e5d9a16ce6ce.png",
    images: [
      "/lovable-uploads/0896ea4c-40a0-4ed6-8f39-e5d9a16ce6ce.png",
      "/lovable-uploads/f1afaaa9-d344-4021-a4d5-fe95069c5d80.png",
      "/lovable-uploads/9c5a4b56-9abb-4097-8827-72ac3267e3d8.png",
      "/lovable-uploads/37823d8f-2d16-402c-8a0a-cfbaacd8c14d.png",
      "/lovable-uploads/2e6b1dea-bd55-448e-b56a-417204d37f78.png",
      "/lovable-uploads/4030871f-68fb-4740-bcd7-a365279c5ee2.png",
      "/lovable-uploads/a25126c1-052f-42f4-bda3-df51414e8968.png",
      "/lovable-uploads/0dfb6b55-abba-46ad-b2ca-4089832dae35.png",
      "/lovable-uploads/3b470483-9e56-47e2-830a-41959e242096.png"
    ],
    capacity: 20,
    price: "R$ 10.000",
    rating: 4.8,
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
    image: "/lovable-uploads/d54253e7-7ccf-4adb-af17-e81020696795.png",
    images: [
      "/lovable-uploads/d54253e7-7ccf-4adb-af17-e81020696795.png",
      "/lovable-uploads/1741780f-1cda-4856-a568-6004932119ad.png",
      "/lovable-uploads/613c8065-c109-4371-8b70-a14cdc1634ab.png",
      "/lovable-uploads/9b466995-31e9-4a1a-919b-21fdcce224a2.png",
      "/lovable-uploads/794f66a3-fe29-46b6-ab32-9d36ceee92af.png"
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
    description: "Lancha 60 pés com 3 quartos, 2 banheiros, sala 2 ambientes e cozinha equipada",
    highlight: true,
    category: "lancha"
  },
  {
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
    features: [
      { icon: Waves, label: "Alta Velocidade" },
      { icon: Music, label: "Som Premium" },
      { icon: Sun, label: "Área Solar" },
      { icon: Shield, label: "Segurança" }
    ],
    description: "Lancha FLY HI ideal para passeios emocionantes",
    category: "lancha"
  },
  {
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
    features: [
      { icon: Users, label: "Grupos Pequenos" },
      { icon: Music, label: "Som" },
      { icon: Sun, label: "Deck Aberto" },
      { icon: Shield, label: "Seguro" }
    ],
    description: "Lancha compacta M CELL perfeita para grupos pequenos",
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
    image: "/lovable-uploads/ca7513a8-7ca6-4c74-94eb-e69fde091b96.png",
    images: [
      "/lovable-uploads/ca7513a8-7ca6-4c74-94eb-e69fde091b96.png",
      "/lovable-uploads/56562047-b47a-4a19-a6cd-ca765e9bae68.png",
      "/lovable-uploads/d5183a03-42a3-40b8-b960-998e51ffb87f.png",
      "/lovable-uploads/87793615-17b2-46cd-83e8-f0060a012b57.png",
      "/lovable-uploads/50fccc66-cb1b-4412-8c54-fe679bfbf080.png",
      "/lovable-uploads/7c580f4c-ea10-4abc-804c-6ef4081f3a6e.png",
      "/lovable-uploads/8e8c7ca9-eb50-4a92-8e06-cbcc8616d15c.png",
      "/lovable-uploads/67f82209-8ce4-40b3-a168-8e083dfe39ac.png",
      "/lovable-uploads/55828aaa-059f-4efd-88ec-d8f9ac9c138a.png",
      "/lovable-uploads/485c2828-9c1a-47b5-b3b6-b9e7a73b53f0.png"
    ],
    capacity: 17,
    price: "R$ 4.000",
    rating: 4.7,
    duration: "6h",
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
    image: grandrarayImage,
    capacity: 18,
    price: "R$ 6.000",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "Design Premium" },
      { icon: Music, label: "Som Surround" },
      { icon: Coffee, label: "Cozinha Gourmet" },
      { icon: Waves, label: "Vista Panorâmica" }
    ],
    description: "GRAND RARAY com embarque na Marina da Glória",
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
    image: "/lovable-uploads/senna-1.png",
    capacity: 20,
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
    description: "Som conexão Bluetooth, 2 quartos, 2 banheiros (1 suíte), sala ampla, cozinha completa, fly e solário de proa muito espaçosos",
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
    description: "LUÍSA V - Roteiro principal Marina da Glória x Flamengo x Aeroporto x Urca",
    category: "iate"
  }
];

const VesselCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [vesselsData, setVesselsData] = useState(vessels);

  // Carregar dados salvos do admin se existirem
  useEffect(() => {
    const loadVesselData = () => {
      const savedData = localStorage.getItem('adminVesselsData');
      const hasCustomData = localStorage.getItem('hasCustomVesselData');
      
      console.log('VesselCatalog - Verificando dados salvos:', { savedData: !!savedData, hasCustomData });
      
      if (savedData && hasCustomData === 'true') {
        try {
          const customVessels = JSON.parse(savedData);
          console.log('VesselCatalog - Dados customizados carregados:', customVessels);
          
          // Converter objeto para array mantendo a estrutura original
          const vesselArray = Object.values(customVessels).map((vessel: any) => ({
            ...vessel,
            image: vessel.images?.[0] || vessel.image, // Primeira imagem como image principal
            features: vessels.find(v => v.id === vessel.id)?.features || []
          }));
          
          console.log('VesselCatalog - Array de vessels criado:', vesselArray);
          setVesselsData(vesselArray);
        } catch (error) {
          console.error('Erro ao carregar dados customizados:', error);
        }
      }
    };

    // Carregar dados inicialmente
    loadVesselData();

    // Ouvir por atualizações do admin
    const handleVesselsUpdate = (event: any) => {
      console.log('VesselCatalog - Evento de atualização recebido:', event);
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

  const categories = [
    { id: "all", name: "Todas", count: vesselsData.length },
    { id: "lancha", name: "Lanchas", count: vesselsData.filter(v => v.category === "lancha").length },
    { id: "iate", name: "Iates", count: vesselsData.filter(v => v.category === "iate").length },
    { id: "catamara", name: "Catamarãs", count: vesselsData.filter(v => v.category === "catamara").length }
  ];

  const filteredVessels = vesselsData
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
          {localStorage.getItem('hasCustomVesselData') === 'true' && (
            <Badge variant="outline" className="mb-4 px-4 py-2 bg-green-50 text-green-700 border-green-200">
              ✨ Dados customizados carregados do painel admin
            </Badge>
          )}
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