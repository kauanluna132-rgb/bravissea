import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VesselCatalog from "@/components/VesselCatalog";
import TourRoutes from "@/components/TourRoutes";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <VesselCatalog />
      <TourRoutes />
      <HowItWorks />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
