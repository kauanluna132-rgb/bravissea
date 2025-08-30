import { Button } from "@/components/ui/button";
import { MessageCircle, Anchor, Star, Users } from "lucide-react";
import heroYacht from "@/assets/hero-yacht.jpg";
const Hero = () => {
  const whatsappLink = "https://wa.me/5521974004415?text=Olá! Gostaria de saber mais sobre os passeios da Bravissea.";
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroYacht})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-primary/60"></div>
      </div>
      
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white my-[11px]">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 my-[35px]">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Experiências Premium no Rio</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Navegue pelo
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Paraíso Carioca</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Descubra as belezas do Rio de Janeiro a bordo de iates, lanchas e catamarãs de luxo. 
            Experiências inesquecíveis com segurança e conforto garantidos.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-white/80">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-white/80">Embarcações Premium</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5 Anos</div>
              <div className="text-sm text-white/80">de Experiência</div>
            </div>
          </div>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-ocean text-lg px-8 py-6 min-w-[200px]">
              <a href="#embarcacoes">
                <Users className="w-5 h-5 mr-2" />
                Ver Embarcações
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-md text-lg px-8 py-6 min-w-[200px]">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 text-sm text-white/70">
            
          </div>
        </div>
      </div>
      
    </section>;
};
export default Hero;