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
    type: "Iate Premium",
    image: segueImage,
    capacity: 18,
    price: "R$ 18.000",
    originalPrice: "R$ 20.000",
    rating: 4.9,
    duration: "8h",
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
    image: tecnomarineImage,
    capacity: 20,
    price: "R$ 10.000",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "Tecnologia Avançada" },
      { icon: Music, label: "Sistema de Som" },
      { icon: Coffee, label: "Cozinha Gourmet" },
      { icon: Shield, label: "Segurança Total" }
    ],
    description: "Iate Tecnomarine com alta tecnologia para 20 passageiros",
    category: "iate"
  },
  {
    id: "myway",
    name: "IATE MY WAY",
    type: "Iate Luxury",
    image: mywayImage,
    capacity: 20,
    price: "R$ 12.000",
    rating: 4.9,
    duration: "8h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "Design Exclusivo" },
      { icon: Music, label: "Som Ambiente" },
      { icon: Coffee, label: "Bar Premium" },
      { icon: Waves, label: "Deck Espaçoso" }
    ],
    description: "Iate MY WAY com design exclusivo para 20 passageiros",
    highlight: true,
    category: "iate"
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
    name: "Dragão",
    type: "Iate Médio",
    image: dragaoImage,
    capacity: 17,
    price: "R$ 4.000",
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    size: "41 pés",
    features: [
      { icon: Anchor, label: "41 Pés" },
      { icon: Music, label: "Sistema de Audio" },
      { icon: Coffee, label: "Bar" },
      { icon: Shield, label: "Tripulação" }
    ],
    description: "Iate Dragão de 41 pés para 17 passageiros",
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
    image: sennaImage,
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "46 Pés" },
      { icon: Music, label: "Som" },
      { icon: Coffee, label: "2 Suítes" },
      { icon: Shield, label: "2 Motores Volvo" }
    ],
    description: "46 pés com 2 motores volvo a diesel, 2 suítes completas",
    category: "iate"
  },
  {
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
    features: [
      { icon: Anchor, label: "15 Passageiros" },
      { icon: Music, label: "Som" },
      { icon: Coffee, label: "Combustível Incluso" },
      { icon: Shield, label: "Churrasqueira" }
    ],
    description: "Luísa V com roteiro Marina da Glória x Flamengo x Aeroporto x Urca",
    category: "iate"
  }
];

const categories = [
  { id: "all", name: "Todas", count: vessels.length },
  { id: "lancha", name: "Lanchas", count: vessels.filter(v => v.category === "lancha").length },
  { id: "iate", name: "Iates", count: vessels.filter(v => v.category === "iate").length },
  { id: "catamara", name: "Catamarãs", count: vessels.filter(v => v.category === "catamara").length }
];

const VesselCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

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