import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, Star, Anchor, Phone, Mail, MapPin } from 'lucide-react';
import VesselImageCarousel from '@/components/VesselImageCarousel';
import { supabase } from '@/integrations/supabase/client';

interface Vessel {
  id: string;
  name: string;
  description: string | null;
  capacity: number | null;
  price_per_hour: number | null;
  features: string[];
  specifications: any;
  images: VesselImage[];
}

interface VesselImage {
  id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
}

const VesselDetails = () => {
  const { id } = useParams();
  const [vessel, setVessel] = useState<Vessel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVessel();
  }, [id]);

  const loadVessel = async () => {
    if (!id) return;
    
    try {
      const { data: vesselData, error: vesselError } = await supabase
        .from('vessels')
        .select('*')
        .eq('id', id)
        .single();

      if (vesselError) throw vesselError;

      const { data: imagesData, error: imagesError } = await supabase
        .from('vessel_images')
        .select('*')
        .eq('vessel_id', id)
        .order('display_order');

      if (imagesError) {
        console.error('Error loading images for vessel:', id, imagesError);
      }

      const vesselWithImages = {
        ...vesselData,
        images: imagesData || []
      };

      setVessel(vesselWithImages);
      console.log('VesselDetails: Loaded vessel from database:', vesselWithImages);
    } catch (error) {
      console.error('VesselDetails: Error loading vessel:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg">Carregando detalhes da embarcação...</div>
        </div>
      </div>
    );
  }

  if (!vessel) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Embarcação não encontrada</h2>
            <Button onClick={() => window.location.href = '/'}>Voltar ao início</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{vessel.name}</h1>
        <div className="flex justify-center items-center gap-4">
          <Badge variant="outline">
            <Users className="h-4 w-4 mr-1" />
            {vessel.capacity || 0} pessoas
          </Badge>
          <Badge variant="outline">
            <Star className="h-4 w-4 mr-1" />
            Premium
          </Badge>
        </div>
        <p className="text-2xl font-bold text-primary">R$ {vessel.price_per_hour || 0}/hora</p>
      </div>

      {/* Image Gallery */}
      <Card>
        <CardContent className="p-6">
          <VesselImageCarousel 
            images={vessel.images.map(img => img.image_url)} 
            vesselName={vessel.name} 
          />
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Anchor className="h-5 w-5" />
              Sobre esta embarcação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{vessel.description || 'Descrição não disponível'}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Capacidade:</span>
                <span>{vessel.capacity || 0} pessoas</span>
              </div>
              <div className="flex justify-between">
                <span>Preço por hora:</span>
                <span className="font-semibold">R$ {vessel.price_per_hour || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {vessel.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-center">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Reserve Agora
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Entre em contato conosco para reservar esta embarcação e garantir uma experiência inesquecível.
          </p>
          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={() => window.open('https://wa.me/5521974004415', '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('mailto:contato@bravissea.com.br', '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VesselDetails;