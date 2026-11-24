import RentalGuide, { RentalFAQ } from "@/components/RentalGuide";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VesselCatalog from "@/components/VesselCatalog";
import TourRoutes from "@/components/TourRoutes";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CustomerPhotos from "@/components/CustomerPhotos";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
      <div id="home">
        <Hero />
      </div>
      
      {/* Scroll Indicator */}
      <div className="relative z-20 flex justify-center -mt-8">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center bg-white shadow-lg">
            <div className="w-1 h-3 bg-primary/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <RentalGuide />
      <div id="embarcações" data-nosnippet="">
        <VesselCatalog />
      </div>
      <div id="roteiros">
        <TourRoutes />
      </div>
      <div id="como-funciona">
        <HowItWorks />
      </div>
      <div id="customer-photos">
        <CustomerPhotos />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contato">
        <ContactForm />
      </div>
      <RentalFAQ />
      </main>
      <div>
        <Footer />
      </div>
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
