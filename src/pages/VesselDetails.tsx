import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Mock data - em um app real, isso viria de uma API
const vessels = {
  "1": {
    id: "1",
    name: "Lancha Premium Executive",
    type: "Lancha",
    image: "/src/assets/lancha-premium.jpg",
    capacity: 12,
    price: 2500,
    rating: 4.8,
    duration: "4-8 horas",
    location: "Marina da Glória",
    features: [
      { icon: Users, label: "12 passageiros" },
      { icon: Wifi, label: "Wi-Fi a bordo" },
      { icon: Car, label: "Estacionamento" },
      { icon: Utensils, label: "Área gourmet" }
    ],
    description: "Lancha premium perfeita para passeios executivos e celebrações especiais.",
    gallery: [
      "/src/assets/lancha-premium.jpg",
      "/src/assets/hero-yacht.jpg",
      "/src/assets/catamara-luxury.jpg"
    ],
    specifications: {
      length: "45 pés",
      cabins: 2,
      bathrooms: 1,
      fuel: "Diesel",
      year: 2022
    },
    included: [
      "Comandante experiente",
      "Equipamentos de segurança",
      "Som ambiente",
      "Geladeira e freezer",
      "Churrasqueira",
      "Seguro total"
    ],
    routes: [
      "Baía de Guanabara",
      "Ilhas Tijucas", 
      "Angra dos Reis",
      "Búzios"
    ]
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

  const vessel = vessels[id as keyof typeof vessels];

  if (!vessel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Embarcação não encontrada</h2>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    const message = `
🚤 *RESERVA BRAVISSEA*

*Embarcação:* ${vessel.name}
*Nome:* ${bookingForm.name}
*Email:* ${bookingForm.email}
*Telefone:* ${bookingForm.phone}
*Data:* ${bookingForm.date}
*Duração:* ${bookingForm.duration}
*Passageiros:* ${bookingForm.guests}
*Roteiro:* ${bookingForm.route}

*Mensagem adicional:*
${bookingForm.message}

Aguardo confirmação! 🌊
    `;
    
    const whatsappUrl = `https://wa.me/5521974004415?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-secondary/30 py-8">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às embarcações
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {vessel.name}
                </h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <Badge variant="outline">{vessel.type}</Badge>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {vessel.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    {vessel.rating}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl font-bold text-primary">
                  R$ {vessel.price.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-muted-foreground">por dia</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Galeria e Detalhes */}
            <div className="lg:col-span-2">
              {/* Galeria */}
              <div className="mb-8">
                <div className="mb-4">
                  <img 
                    src={vessel.gallery[selectedImage]} 
                    alt={vessel.name}
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {vessel.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
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
              </div>

              {/* Descrição */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Sobre esta embarcação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{vessel.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Especificações</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Comprimento:</span>
                          <span>{vessel.specifications.length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Cabines:</span>
                          <span>{vessel.specifications.cabins}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Banheiros:</span>
                          <span>{vessel.specifications.bathrooms}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Combustível:</span>
                          <span>{vessel.specifications.fuel}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Ano:</span>
                          <span>{vessel.specifications.year}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Incluso</h4>
                      <ul className="space-y-2 text-sm">
                        {vessel.included.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recursos */}
              <Card>
                <CardHeader>
                  <CardTitle>Recursos e Comodidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {vessel.features.map((feature, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <feature.icon className="h-8 w-8 text-primary mb-2" />
                        <span className="text-sm">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Reserva */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Waves className="h-5 w-5 mr-2 text-primary" />
                    Fazer Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name"
                      value={bookingForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone"
                      value={bookingForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(21) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Data preferida</Label>
                    <Input 
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duração</Label>
                    <Select onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4h">4 horas</SelectItem>
                        <SelectItem value="6h">6 horas</SelectItem>
                        <SelectItem value="8h">8 horas (dia inteiro)</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="guests">Número de passageiros</Label>
                    <Select onValueChange={(value) => handleInputChange('guests', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quantas pessoas?" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: vessel.capacity }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1} {i === 0 ? 'pessoa' : 'pessoas'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="route">Roteiro desejado</Label>
                    <Select onValueChange={(value) => handleInputChange('route', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha um roteiro" />
                      </SelectTrigger>
                      <SelectContent>
                        {vessel.routes.map((route) => (
                          <SelectItem key={route} value={route}>
                            {route}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mensagem (opcional)</Label>
                    <Textarea 
                      id="message"
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Alguma solicitação especial?"
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={!bookingForm.name || !bookingForm.phone}
                  >
                    Enviar Reserva via WhatsApp
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Ao clicar, você será redirecionado para o WhatsApp com suas informações preenchidas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default VesselDetails;