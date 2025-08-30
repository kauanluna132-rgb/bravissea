import { MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const routes = [
  {
    id: 1,
    name: "Urca",
    description: "Navegue pelos pontos mais icônicos do Rio, com vista privilegiada do Pão de Açúcar e Fortaleza de São João.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Praia Vermelha",
    description: "Pequena enseada protegida entre morros, com águas calmas e paisagem única no coração da Urca.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "Praia do Morcego",
    description: "Praia selvagem e preservada, acessível apenas por trilha ou embarcação, ideal para quem busca tranquilidade.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    name: "Adão e Eva",
    description: "Praias selvagens e desertas na Barra da Tijuca, cercadas por natureza exuberante e águas cristalinas.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    name: "Ilha Cagarras",
    description: "Conjunto de ilhas paradisíacas em frente a Ipanema, refúgio da vida marinha e cenário deslumbrante.",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    name: "Ilha Tijuca",
    description: "Destino clássico dos cariocas, com águas cristalinas e ambiente perfeito para relaxar e apreciar a natureza.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const TourRoutes = () => {
  const handleBookRoute = (routeName: string) => {
    const message = `Olá! Gostaria de incluir o destino: ${routeName} no meu passeio. Podem me enviar mais informações?`;
    const whatsappUrl = `https://wa.me/5521974004415?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="roteiros" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Principais Destinos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça os principais destinos que visitamos em nossos passeios pelo Rio de Janeiro
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden group hover:shadow-luxury transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center text-white bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-medium">{route.name}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{route.description}</p>
                
                <Button 
                  onClick={() => handleBookRoute(route.name)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Incluir no Passeio
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou o destino ideal? Criamos experiências personalizadas!
          </p>
          <Button 
            variant="outline" 
            onClick={() => handleBookRoute("Roteiro Personalizado")}
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Solicitar Roteiro Personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourRoutes;