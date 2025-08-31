import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Anchor,
  Star,
  Shield,
  Clock
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappLink = "https://wa.me/5521974004415?text=Olá! Gostaria de saber mais sobre os passeios da Bravissea.";

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Anchor className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold">Bravissea</h3>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Experiências náuticas premium no Rio de Janeiro. 
                Navegue pelas águas cristalinas com segurança, 
                conforto e muito estilo.
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-accent" />
                <span>Certificado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.9/5</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-primary-foreground/80 text-sm">Siga-nos:</span>
              <a 
                href="https://instagram.com/bravisseatour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services & Links */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-6">Navegação</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#embarcacoes" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Nossas Embarcações
                  </a>
                </li>
                <li>
                  <a href="#como-funciona" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#depoimentos" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#contato" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Serviços</h4>
              <ul className="space-y-3">
                <li className="text-primary-foreground/80">Passeios Turísticos</li>
                <li className="text-primary-foreground/80">Eventos Corporativos</li>
                <li className="text-primary-foreground/80">Festas e Comemorações</li>
                <li className="text-primary-foreground/80">Experiências Românticas</li>
                <li className="text-primary-foreground/80">Roteiros Personalizados</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <p>Marina da Glória</p>
                  <p>Rio de Janeiro - RJ</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">(21) 97400-4415</span>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80 break-all">aluguelbravissea@gmail.com</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">Seg - Dom: 7h às 19h</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Button 
              asChild
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left text-primary-foreground/60 text-sm">
              <p>&copy; {currentYear} Bravissea. Todos os direitos reservados.</p>
              <p className="mt-1">CNPJ: 57.287.270/0001-42 | Registro Marinha: BR-RJ-000000</p>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;