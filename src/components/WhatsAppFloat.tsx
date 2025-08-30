import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppFloat = () => {
  const whatsappLink = "https://wa.me/5521999999999?text=Olá! Gostaria de saber mais sobre os passeios da Bravissea.";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="lg"
        className="whatsapp-pulse bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-luxury animate-bounce"
      >
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-20 right-0 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco no WhatsApp
        <div className="absolute top-full right-4 border-4 border-transparent border-t-foreground"></div>
      </div>
    </div>
  );
};

export default WhatsAppFloat;