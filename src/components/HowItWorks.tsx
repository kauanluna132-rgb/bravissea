import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MessageCircle, 
  CreditCard, 
  Anchor,
  Calendar,
  MapPin,
  Shield,
  Star
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Escolha sua Embarcação",
    description: "Navegue por nossa frota premium e selecione a embarcação ideal para sua ocasião",
    details: ["Filtre por tipo e capacidade", "Veja fotos e especificações", "Compare preços e avaliações"]
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Entre em Contato",
    description: "Fale conosco via WhatsApp para confirmar disponibilidade e personalizar seu passeio",
    details: ["Atendimento especializado", "Sugestões de roteiros", "Esclarecimento de dúvidas"]
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Confirme sua Reserva",
    description: "Realize o pagamento seguro e receba a confirmação com todos os detalhes",
    details: ["Pagamento seguro", "Confirmação instantânea", "Detalhes do embarque"]
  },
  {
    id: 4,
    icon: Anchor,
    title: "Embarque e Navegue",
    description: "Chegue ao ponto de encontro e embarque para uma experiência inesquecível",
    details: ["Briefing de segurança", "Capitão experiente", "Experiência premium"]
  }
];

const features = [
  {
    icon: Calendar,
    title: "Flexibilidade Total",
    description: "Escolha data, horário e duração do seu passeio"
  },
  {
    icon: MapPin,
    title: "Roteiros Exclusivos",
    description: "Pontos turísticos únicos apenas acessíveis pelo mar"
  },
  {
    icon: Shield,
    title: "Segurança Garantida",
    description: "Embarcações licenciadas e equipamentos de segurança"
  },
  {
    icon: Star,
    title: "Experiência Premium",
    description: "Serviço de bordo e comodidades de alto padrão"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Processo Simples
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Como 
            <span className="text-gradient-ocean"> Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Em apenas 4 passos simples, você estará navegando pelas águas cristalinas 
            do Rio de Janeiro em uma de nossas embarcações premium.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent z-0"></div>
              )}
              
              <Card className="card-luxury text-center h-full relative z-10">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-ocean rounded-full text-white font-bold text-lg mb-6">
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{step.description}</p>
                  
                  {/* Details */}
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-ocean rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Pronto para sua Aventura?</h3>
          <p className="mb-6 opacity-90">
            Nossa equipe está pronta para criar a experiência náutica perfeita para você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#embarcacoes"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Ver Embarcações
            </a>
            <a 
              href="https://wa.me/5521974004415?text=Olá! Quero agendar meu passeio com a Bravissea."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;