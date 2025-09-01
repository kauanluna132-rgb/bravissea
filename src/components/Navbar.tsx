import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Anchor, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import ImageWithFallback from "@/components/ui/image-with-fallback";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [{
    label: "Início",
    href: "#home"
  }, {
    label: "Embarcações",
    href: "#embarcações"
  }, {
    label: "Roteiros",
    href: "#roteiros"
  }, {
    label: "Avaliações",
    href: "#testimonials"
  }, {
    label: "Clientes",
    href: "#customer-photos"
  }];

  const handleLogoClick = () => {
    // Se não estiver na página inicial, navegar para ela
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      // Se já estiver na página inicial, fazer scroll para o topo
      scrollToSection("#home");
    }
    setIsMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    // Se não estiver na página inicial, navegar para ela primeiro
    if (location.pathname !== '/') {
      navigate('/');
      // Aguardar um pequeno delay para a página carregar antes do scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
    setIsMenuOpen(false);
  };
  return <nav className="fixed top-4 left-4 right-4 mx-auto max-w-7xl glass-effect z-50 rounded-2xl border border-white/20 shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:justify-between">
          {/* Logo - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={handleLogoClick} className="cursor-pointer">
              <ImageWithFallback src="/lovable-uploads/3dd1c35b-81c4-4a09-85cd-8cd136cac6b0.png" alt="Bravissea" className="h-12 w-auto" showLoader={false} />
            </button>
          </div>

          {/* Logo - Mobile (Centered) */}
          <div className="md:hidden flex-1 flex justify-center">
            <button onClick={handleLogoClick} className="cursor-pointer">
              <ImageWithFallback src="/lovable-uploads/3dd1c35b-81c4-4a09-85cd-8cd136cac6b0.png" alt="Bravissea" className="h-12 w-auto" showLoader={false} />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => <button key={item.label} onClick={() => scrollToSection(item.href)} className="text-foreground hover:text-primary transition-colors font-medium">
                {item.label}
              </button>)}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-1" />
              <span>(21) 97400-4415</span>
            </div>
            <Button onClick={() => scrollToSection("#embarcações")} className="bg-primary hover:bg-primary-dark">
              Reservar Agora
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 absolute right-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              {menuItems.map(item => <button key={item.label} onClick={() => scrollToSection(item.href)} className="text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                  {item.label}
                </button>)}
              <div className="flex items-center text-sm text-muted-foreground pt-2">
                <Phone className="h-4 w-4 mr-1" />
                <span>(21) 97400-4415</span>
              </div>
              <Button onClick={() => scrollToSection("#embarcações")} className="bg-primary hover:bg-primary-dark w-full">
                Reservar Agora
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;