import { rentalPages } from "./lib/seo";
import RouteSeo from "./components/RouteSeo";
import Rental from "./pages/Rental";
import { useEffect, lazy, Suspense, type ComponentType } from "react";
import { trackSiteEvent } from "./lib/ad-measurement";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
const LazyVesselDetails = lazy(() => import("./pages/VesselDetails"));
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

function SiteMeasurement() {
 const {pathname}=useLocation();
 useEffect(()=>{
  if(pathname==='/' || rentalPages.some(p=>pathname==='/'+p.slug)) void trackSiteEvent('ViewContent');
  else if(pathname.startsWith('/vessel/')) void trackSiteEvent('ViewContent',pathname.split('/')[2]);
 },[pathname]);
 return null;
}

const App = ({ VesselPage = LazyVesselDetails }: { VesselPage?: ComponentType } = {}) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <>
        <RouteSeo />
        <SiteMeasurement />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vessel/:id" element={<Suspense fallback={<main className="container mx-auto pt-32 px-6" aria-busy="true">Carregando embarcação…</main>}><VesselPage /></Suspense>} />
          <Route path="/privacidade" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/:slug" element={<Rental />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
