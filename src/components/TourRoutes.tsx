import { MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { trackLead } from "@/lib/ad-measurement";

const routes = [
  {
    id: 1,
    name: "Urca",
    description: "Navegue pelos pontos mais icônicos do Rio, com vista privilegiada do Pão de Açúcar e Fortaleza de São João.",
    image: "/lovable-uploads/1cb06697-52ac-43f5-ade1-afa0b0a1ecb3.png"
  },
  {
    id: 2,
    name: "Praia Vermelha",
    description: "Pequena enseada protegida entre morros, com águas calmas e paisagem única no coração da Urca.",
    image: "/lovable-uploads/3da81416-7cd9-4b6c-9ef4-50ac23d91d35.png"
  },
  {
    id: 3,
    name: "Praia do Morcego",
    description: "Praia selvagem e preservada, acessível apenas por trilha ou embarcação, ideal para quem busca tranquilidade.",
    image: "/lovable-uploads/d50a29db-3c23-4714-832b-8ca6e66a6a5d.png"
  },
  {
    id: 4,
    name: "Adão e Eva",
    description: "Praias selvagens e desertas na Barra da Tijuca, cercadas por natureza exuberante e águas cristalinas.",
    image: "/lovable-uploads/cda8d6a1-a754-4cb9-9058-c03ecec63744.png"
  },
  {
    id: 5,
    name: "Ilha Cagarras",
    description: "Conjunto de ilhas paradisíacas em frente a Ipanema, refúgio da vida marinha e cenário deslumbrante.",
    image: "/lovable-uploads/c70f09d4-882e-48c0-a6b9-6331eced8fb3.png"
  },
  {
    id: 6,
    name: "Ilha Tijuca",
    description: "Destino clássico dos cariocas, com águas cristalinas e ambiente perfeito para relaxar e apreciar a natureza.",
    image: "/lovable-uploads/e9f39912-b13b-40c5-89d3-fc8615aba6f8.png"
  }
];

const TourRoutes = () => {
  const handleBookRoute = (routeName: string) => {
    const message = `Olá! Gostaria de incluir o destino: ${routeName} no meu passeio. Podem me enviar mais informações?`;
    const whatsappUrl = `https://wa.me/5521974004415?text=${encodeURIComponent(message)}`;
    const popup = window.open(whatsappUrl, '_blank');
    if (!popup) return;
    popup.opener = null;
    const route = routes.find((item) => item.name === routeName);
    if (!route) return;
    window.__lovableEvents?.track?.("project.route_inquiry_clicked", { source: "tour_routes", route_id: route.id });
    void trackLead({ kind: "route_inquiry_clicked", source: "tour_routes", route_id: route.id });
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