import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Anchor, Star, Shield, Clock } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappLink = "https://wa.me/5521974004415?text=Olá! Gostaria de saber mais sobre os passeios da Bravissea.";
  return <footer className="bg-slate-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Contact Info - Takes up 2 columns */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Anchor className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold">Bravissea</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white/90 font-medium">Chat via WhatsApp</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white/90">(21) 97400-4415</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white/90">aluguelbravissea@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white/90">Marina da Glória, Rio de Janeiro - RJ</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white/90">Seg - Dom: 7h às 19h</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-white/80">Certificado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white/80">4.9/5</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Button asChild className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white mt-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-blue-400 text-lg font-semibold mb-6">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <a href="#embarcações" className="text-white/80 hover:text-blue-400 transition-colors">
                  Nossas Embarcações
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/80 hover:text-blue-400 transition-colors">
                  Avaliações
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-white/80 hover:text-blue-400 transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#customer-photos" className="text-white/80 hover:text-blue-400 transition-colors">
                  Clientes
                </a>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-blue-400 text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li className="text-white/80">Passeios Turísticos</li>
              <li className="text-white/80">Eventos Corporativos</li>
              <li className="text-white/80">Festas e Comemorações</li>
              <li className="text-white/80">Experiências Românticas</li>
              <li className="text-white/80">Roteiros Personalizados</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/bravisseatour" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left text-white/60 text-sm">
              <p>&copy; {currentYear} Bravissea. Todos os direitos reservados.</p>
              <p className="mt-1">CNPJ: 57.287.270/0001-42 </p>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;