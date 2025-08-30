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

// Importar as imagens
import lanchaImage from "@/assets/lancha-premium.jpg";
import catamaraImage from "@/assets/catamara-luxury.jpg";
import iateImage from "@/assets/iate-executive.jpg";

const vessels = [
  {
    id: "1",
    name: "Ocean Dream",
    type: "Lancha Premium",
    image: lanchaImage,
    capacity: 12,
    price: "R$ 180",
    rating: 4.9,
    duration: "4h",
    location: "Marina da Glória",
    features: [
      { icon: Wifi, label: "Wi-Fi" },
      { icon: Music, label: "Som Premium" },
      { icon: Coffee, label: "Bar" },
      { icon: Shield, label: "Seguro" }
    ],
    description: "Lancha moderna e confortável para grupos pequenos",
    highlight: true,
    category: "lancha"
  },
  {
    id: "2",
    name: "Paradise Sailing",
    type: "Catamarã Luxury",
    image: catamaraImage,
    capacity: 25,
    price: "R$ 220",
    rating: 4.8,
    duration: "6h",
    location: "Urca",
    features: [
      { icon: Waves, label: "Deck Amplo" },
      { icon: Music, label: "Sistema de Som" },
      { icon: Coffee, label: "Cozinha" },
      { icon: Sun, label: "Área Solar" }
    ],
    description: "Catamarã espaçoso ideal para grupos grandes",
    category: "catamara"
  },
  {
    id: "3",
    name: "Royal Yacht",
    type: "Iate Executive",
    image: iateImage,
    capacity: 18,
    price: "R$ 350",
    rating: 5.0,
    duration: "8h",
    location: "Copacabana",
    features: [
      { icon: Anchor, label: "3 Decks" },
      { icon: Coffee, label: "Cozinha Gourmet" },
      { icon: Wifi, label: "Wi-Fi Premium" },
      { icon: Shield, label: "Capitão Incluso" }
    ],
    description: "Iate de luxo para experiências exclusivas",
    category: "iate",
    highlight: true
  }
];

const categories = [
  { id: "all", name: "Todas", count: vessels.length },
  { id: "lancha", name: "Lanchas", count: vessels.filter(v => v.category === "lancha").length },
  { id: "catamara", name: "Catamarãs", count: vessels.filter(v => v.category === "catamara").length },
  { id: "iate", name: "Iates", count: vessels.filter(v => v.category === "iate").length }
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
              <a href="https://wa.me/5521999999999?text=Olá! Gostaria de uma experiência personalizada." target="_blank" rel="noopener noreferrer">
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