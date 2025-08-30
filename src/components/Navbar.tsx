import { useState } from "react";
import { Menu, X, Anchor, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import bravissealogo from "@/assets/bravissea-logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [{
    label: "Início",
    href: "#home"
  }, {
    label: "Embarcações",
    href: "#embarcacoes"
  }, {
    label: "Roteiros",
    href: "#roteiros"
  }, {
    label: "Como Funciona",
    href: "#como-funciona"
  }, {
    label: "Contato",
    href: "#contato"
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setIsMenuOpen(false);
    }
  };
  return <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={bravissealogo} alt="Bravissea" className="h-12 w-auto" />
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
            <Button onClick={() => scrollToSection("#embarcacoes")} className="bg-primary hover:bg-primary-dark">
              Reservar Agora
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                <span>(21) 99999-9999</span>
              </div>
              <Button onClick={() => scrollToSection("#embarcacoes")} className="bg-primary hover:bg-primary-dark w-full">
                Reservar Agora
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;