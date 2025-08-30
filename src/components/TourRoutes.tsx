import { MapPin, Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const routes = [
  {
    id: 1,
    name: "Baía de Guanabara Completa",
    duration: "4 horas",
    maxPeople: 12,
    price: "R$ 2.500",
    rating: 4.9,
    highlights: ["Cristo Redentor", "Pão de Açúcar", "Fortaleza de Santa Cruz", "Museu do Amanhã"],
    description: "Passeio completo pela icônica Baía de Guanabara com paradas estratégicas para fotos e contemplação.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    difficulty: "Fácil",
    included: ["Comandante experiente", "Equipamentos de segurança", "Água e refrigerantes", "Seguro"]
  },
  {
    id: 2,
    name: "Ilhas Tijucas",
    duration: "6 horas",
    maxPeople: 8,
    price: "R$ 3.200",
    rating: 4.8,
    highlights: ["Ilha da Tijuca", "Praia da Barra", "Mergulho livre", "Churrasco a bordo"],
    description: "Aventura pelas belas Ilhas Tijucas com paradas para banho de mar e snorkeling.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    difficulty: "Moderado",
    included: ["Equipamentos de mergulho", "Almoço", "Comandante", "Combustível"]
  },
  {
    id: 3,
    name: "Angra dos Reis VIP",
    duration: "8 horas",
    maxPeople: 15,
    price: "R$ 4.800",
    rating: 5.0,
    highlights: ["Ilha Grande", "Lagoa Azul", "Praia do Dentista", "Jantar a bordo"],
    description: "Experiência VIP em Angra dos Reis visitando as praias mais paradisíacas da região.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    difficulty: "Fácil",
    included: ["Transfer", "Refeições completas", "Open bar", "Guia especializado"]
  },
  {
    id: 4,
    name: "Pôr do Sol Romântico",
    duration: "3 horas",
    maxPeople: 6,
    price: "R$ 1.800",
    rating: 4.9,
    highlights: ["Vista do Cristo", "Pôr do sol", "Jantar romântico", "Música ambiente"],
    description: "Passeio romântico ideal para casais com vista exclusiva do pôr do sol carioca.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    difficulty: "Fácil",
    included: ["Jantar para dois", "Champagne", "Música", "Decoração especial"]
  }
];

const TourRoutes = () => {
  const handleBookRoute = (routeName: string) => {
    const message = `Olá! Gostaria de reservar o roteiro: ${routeName}. Podem me enviar mais informações?`;
    const whatsappUrl = `https://wa.me/5521999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="roteiros" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Roteiros Exclusivos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra o Rio de Janeiro de uma perspectiva única com nossos roteiros cuidadosamente planejados
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden group hover:shadow-luxury transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {route.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm font-medium">{route.rating}</span>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-foreground">
                    {route.name}
                  </CardTitle>
                  <span className="text-2xl font-bold text-primary">
                    {route.price}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {route.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Até {route.maxPeople} pessoas
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{route.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Destaques do roteiro:</h4>
                  <div className="flex flex-wrap gap-2">
                    {route.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Incluso:</h4>
                  <ul className="text-sm text-muted-foreground">
                    {route.included.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBookRoute(route.name)}
                  className="w-full bg-primary hover:bg-primary-dark"
                >
                  Reservar Este Roteiro
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou o roteiro ideal? Criamos experiências personalizadas!
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