import { useState } from "react";
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
  User
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

// Vessel data
const vesselData = {
  segue: {
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
    gallery: [segueImage]
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
    gallery: [tecnomarineImage]
  },
  myway: {
    id: "myway",
    name: "IATE MY WAY",
    type: "Iate Luxury",
    image: mywayImage,
    capacity: 20,
    price: "R$ 12.000",
    originalPrice: undefined,
    rating: 4.9,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate MY WAY com design exclusivo e amenidades premium para até 20 passageiros.",
    specifications: {
      comprimento: "44 pés",
      motor: "MAN 520hp",
      combustivel: "Diesel",
      capacidadeTanque: "420L"
    },
    included: [
      "Capitão certificado",
      "Marinheiro",
      "Seguro náutico",
      "Kit segurança",
      "Som ambiente",
      "Bar premium"
    ],
    gallery: [mywayImage]
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
    gallery: [flyhiImage]
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
    gallery: [mcellImage]
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
    gallery: [comendadorImage]
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
    gallery: [dragaoImage]
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
    gallery: [grandrarayImage]
  }
};

const VesselDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          
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
          
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{vessel.price}</div>
            {vessel.originalPrice && (
              <div className="text-lg text-muted-foreground line-through">{vessel.originalPrice}</div>
            )}
            <div className="text-sm text-muted-foreground">por passeio</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <img 
                src={vessel.gallery[selectedImage]} 
                alt={vessel.name}
                className="w-full h-96 object-cover rounded-xl"
              />
              {vessel.gallery.length > 1 && (
                <div className="flex gap-2">
                  {vessel.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${vessel.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                    <Select value={bookingForm.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4h">4 horas</SelectItem>
                        <SelectItem value="6h">6 horas</SelectItem>
                        <SelectItem value="8h">8 horas</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="guests">Número de Pessoas</Label>
                    <Select value={bookingForm.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quantas pessoas?" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: vessel.capacity }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} pessoa{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="route">Roteiro Preferido</Label>
                    <Select value={bookingForm.route} onValueChange={(value) => handleInputChange("route", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha um roteiro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urca">Urca</SelectItem>
                        <SelectItem value="praia-vermelha">Praia Vermelha</SelectItem>
                        <SelectItem value="praia-morcego">Praia do Morcego</SelectItem>
                        <SelectItem value="adao-eva">Adão e Eva</SelectItem>
                        <SelectItem value="ilha-cagarras">Ilha Cagarras</SelectItem>
                        <SelectItem value="ilha-tijuca">Ilha Tijuca</SelectItem>
                        <SelectItem value="personalizado">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
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