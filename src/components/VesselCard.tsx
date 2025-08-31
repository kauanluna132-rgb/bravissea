import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Clock, 
  MapPin, 
  Star, 
  Wifi, 
  Coffee, 
  Music, 
  Shield,
  MessageCircle,
  Camera
} from "lucide-react";

interface VesselFeature {
  icon: any;
  label: string;
}

interface VesselCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  images?: string[];
  capacity: number;
  price: string;
  originalPrice?: string;
  rating: number;
  duration: string;
  location: string;
  features: VesselFeature[];
  description: string;
  highlight?: boolean;
}

const VesselCard = ({
  id,
  name,
  type,
  image,
  images = [],
  capacity,
  price,
  originalPrice,
  rating,
  duration,
  location,
  features,
  description,
  highlight = false
}: VesselCardProps) => {
  const navigate = useNavigate();
  const whatsappMessage = `Olá! Tenho interesse na embarcação ${name}. Gostaria de mais informações sobre preços e disponibilidade.`;
  const whatsappLink = `https://wa.me/5521974004415?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card className={`card-luxury overflow-hidden group ${highlight ? 'ring-2 ring-accent shadow-luxury' : ''}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges no canto superior */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
            {type}
          </Badge>
          {highlight && (
            <Badge className="bg-accent text-white font-medium">
              Destaque
            </Badge>
          )}
        </div>
        
        {/* Rating no canto superior direito */}
        <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold text-primary">{rating}</span>
        </div>
        
        {/* Botão de galeria no hover */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" variant="secondary" className="bg-white/90 text-primary">
              <Camera className="w-4 h-4 mr-2" />
              Ver Galeria ({images.length} fotos)
            </Button>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{price}</div>
            {originalPrice && (
              <div className="text-sm text-muted-foreground line-through">{originalPrice}</div>
            )}
            <div className="text-xs text-muted-foreground">por passeio</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-4">
        {/* Informações principais */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium">{capacity} pessoas</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">{location}</span>
          </div>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap gap-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-xs"
            >
              <feature.icon className="w-3 h-3 text-primary" />
              <span className="font-medium">{feature.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/vessel/${id}`)}
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
          >
            Ver Detalhes
          </Button>
          <Button 
            asChild
            className="flex-1 btn-ocean"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Reservar
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VesselCard;