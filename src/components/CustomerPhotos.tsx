import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ImageWithFallback from "@/components/ui/image-with-fallback";

const customerPhotos = [
  {
    id: 1,
    image: "/lovable-uploads/80c14237-591b-4078-a057-8e87634b1ac1.png",
    caption: "Celebrando momentos únicos",
    description: "Grupo de amigos aproveitando um dia perfeito no mar com a Bravissea"
  },
  {
    id: 2,
    image: "/lovable-uploads/c7fc66fb-1083-4a29-b2bc-ef3f7a9cd666.png",
    caption: "Aventuras inesquecíveis",
    description: "Explorando as águas cristalinas do Rio de Janeiro"
  },
  {
    id: 3,
    image: "/lovable-uploads/e771199d-233c-47b4-80d0-26ed031e74a9.png",
    caption: "Eventos exclusivos",
    description: "Celebrações especiais com vista para o Pão de Açúcar"
  },
  {
    id: 4,
    image: "/lovable-uploads/486acf05-acfa-4d10-8a3e-64dc6469a7e7.png",
    caption: "Experiências autênticas",
    description: "Momentos de alegria e diversão com a tripulação Bravissea"
  },
  {
    id: 5,
    image: "/lovable-uploads/33c4c5a0-a909-4ae0-8a02-a41a12a38e56.png",
    caption: "Despedidas memoráveis",
    description: "Comemorações especiais a bordo do Luisa V"
  },
  {
    id: 6,
    image: "/lovable-uploads/1ad1ea81-7822-4258-8dfc-5d141cccb050.png",
    caption: "Pôr do sol perfeito",
    description: "Brindando com vista para o Cristo Redentor"
  },
  {
    id: 7,
    image: "/lovable-uploads/ce175c79-a2f4-46cf-89a5-434257a239da.png",
    caption: "Grupos corporativos",
    description: "Eventos empresariais com o máximo conforto e elegância"
  },
  {
    id: 8,
    image: "/lovable-uploads/5ab58bd0-af90-425f-8c66-2f8b4bdb438f.png",
    caption: "Momentos especiais",
    description: "Diversão garantida com a equipe mais experiente do Rio"
  },
  {
    id: 9,
    image: "/lovable-uploads/f737014c-7d26-4cd0-ba08-1eed8eba73f1.png",
    caption: "Luxo e conforto",
    description: "Navegando com estilo pelas baías mais belas do mundo"
  },
  {
    id: 10,
    image: "/lovable-uploads/1a5cefcf-e482-41ad-bc47-e4d860d5d22f.png",
    caption: "Cartões postais vivos",
    description: "Registrando memórias com o Pão de Açúcar ao fundo"
  }
];

const CustomerPhotos = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Momentos Reais
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Vivendo o 
            <span className="text-gradient-ocean"> Rio de Janeiro</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada foto conta uma história. Veja como nossos clientes criam memórias 
            inesquecíveis navegando pelas águas mais belas do mundo. Sorrisos genuínos, 
            momentos únicos e experiências que ficam para sempre.
          </p>
        </div>

        {/* Photos Carousel */}
        <div className="relative mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {customerPhotos.map((photo) => (
                <CarouselItem key={photo.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="card-luxury overflow-hidden h-full group">
                    <CardContent className="p-0 relative">
                      {/* Image */}
                      <div className="aspect-[4/5] overflow-hidden">
                        <ImageWithFallback
                          src={photo.image}
                          alt={photo.caption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-lg font-bold mb-2">{photo.caption}</h3>
                          <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {photo.description}
                          </p>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 border-primary/20 hover:bg-white hover:border-primary" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 border-primary/20 hover:bg-white hover:border-primary" />
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Sua Próxima Aventura Te Espera</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Junte-se a milhares de clientes satisfeitos que já viveram experiências únicas com a Bravissea. 
            Crie suas próprias memórias navegando pelas águas paradisíacas do Rio de Janeiro.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Momentos Únicos</h4>
              <p className="text-xs text-muted-foreground">Experiências que ficam para sempre</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Memórias Eternas</h4>
              <p className="text-xs text-muted-foreground">Registros que você guardará para sempre</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Histórias Especiais</h4>
              <p className="text-xs text-muted-foreground">Cada navegação é uma nova aventura</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotos;