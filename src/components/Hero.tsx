import { Button } from "@/components/ui/button";
import { trackLead } from "@/lib/ad-measurement";
import { MessageCircle, Anchor, Star, Users } from "lucide-react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import heroYacht from "@/assets/hero-yacht.jpg";
const Hero = () => {
  const whatsappLink = "https://wa.me/5521974004415?text=Olá! Gostaria de saber mais sobre os passeios da Bravissea.";
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroYacht} sizes="100vw" alt="" aria-hidden="true" width={1920} height={1080} {...{fetchpriority:"high"}} loading="eager" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-primary/60"></div>
      </div>
      
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white my-[11px]">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8 my-[25px] md:my-[35px]">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            <span className="text-xs md:text-sm font-medium">Experiências Premium no Rio</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Aluguel de lanchas, iates e catamarãs
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">no Rio de Janeiro</span>
          </h1>
          
          {/* Subheadline */}
          <p className="md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed text-base">
            Planeje um passeio privado para seu grupo com a Bravissea. Compare embarcações, capacidades e valores de referência e consulte disponibilidade para embarque na Marina da Glória.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 md:mb-10">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">1000+</div>
              <div className="text-xs md:text-sm text-white/80">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
              <div className="text-xs md:text-sm text-white/80">Embarcações Premium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">5 Anos</div>
              <div className="text-xs md:text-sm text-white/80">de Experiência</div>
            </div>
          </div>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-ocean text-base md:text-lg px-6 md:px-8 py-4 md:py-6 min-w-[180px] md:min-w-[200px]">
              <a href="#embarcações">
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Ver Embarcações
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-md text-base md:text-lg px-6 md:px-8 py-4 md:py-6 min-w-[180px] md:min-w-[200px]">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => {
                window.__lovableEvents?.track?.("project.contact_clicked", { source: "hero" });
                void trackLead({ kind: "contact_clicked", source: "hero" });
              }}>
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
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