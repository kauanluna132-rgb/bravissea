import { useEffect } from "react";
import { trackSiteEvent } from "./lib/ad-measurement";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import VesselDetails from "./pages/VesselDetails";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

function SiteMeasurement() {
 const {pathname}=useLocation();
 useEffect(()=>{
  if(pathname==='/') void trackSiteEvent('ViewContent');
  else if(pathname.startsWith('/vessel/')) void trackSiteEvent('ViewContent',pathname.split('/')[2]);
 },[pathname]);
 return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteMeasurement />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vessel/:id" element={<VesselDetails />} />
          <Route path="/privacidade" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
