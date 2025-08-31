import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit3, Save, X, Upload, Eye, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  category: string;
  images: VesselImage[];
}

interface VesselImage {
  id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
}

const AdminVessels = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [editingVessel, setEditingVessel] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Vessel>>({});
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVessels();
  }, []);

  const loadVessels = async () => {
    try {
      const { data: vesselsData, error: vesselsError } = await supabase
        .from('vessels')
        .select('*')
        .order('name');

      if (vesselsError) throw vesselsError;

      const vesselsWithImages = await Promise.all(
        (vesselsData || []).map(async (vessel) => {
          const { data: imagesData, error: imagesError } = await supabase
            .from('vessel_images')
            .select('*')
            .eq('vessel_id', vessel.id)
            .order('display_order');

          if (imagesError) {
            console.error('Error loading images for vessel:', vessel.id, imagesError);
            return { ...vessel, images: [] };
          }

          return { ...vessel, images: imagesData || [] };
        })
      );

      setVessels(vesselsWithImages);
      console.log('AdminVessels: Loaded vessels from database:', vesselsWithImages);
    } catch (error) {
      console.error('AdminVessels: Error loading vessels:', error);
      toast.error('Erro ao carregar embarcações');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast.error('Nome da embarcação é obrigatório');
      return;
    }

    try {
      if (editingVessel) {
        // Update existing vessel
        const { error } = await supabase
          .from('vessels')
          .update({
            name: formData.name,
            description: formData.description || null,
            capacity: formData.capacity || null,
            price_per_hour: formData.price_per_hour || null,
            features: formData.features || [],
            specifications: formData.specifications || {},
            category: formData.category || 'Yacht'
          })
          .eq('id', editingVessel);

        if (error) throw error;
        toast.success('Embarcação atualizada com sucesso!');
      } else {
        // Add new vessel
        const { error } = await supabase
          .from('vessels')
          .insert({
            name: formData.name,
            description: formData.description || null,
            capacity: formData.capacity || null,
            price_per_hour: formData.price_per_hour || null,
            features: formData.features || [],
            specifications: formData.specifications || {},
            category: formData.category || 'Yacht'
          });

        if (error) throw error;
        toast.success('Embarcação adicionada com sucesso!');
      }

      await loadVessels();
      setEditingVessel(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving vessel:', error);
      toast.error('Erro ao salvar embarcação');
    }
  };

  const handleDelete = async (vesselId: string) => {
    try {
      const { error } = await supabase
        .from('vessels')
        .delete()
        .eq('id', vesselId);

      if (error) throw error;
      
      await loadVessels();
      toast.success('Embarcação removida com sucesso!');
    } catch (error) {
      console.error('Error deleting vessel:', error);
      toast.error('Erro ao remover embarcação');
    }
  };

  const handleEdit = (vessel: Vessel) => {
    setEditingVessel(vessel.id);
    setFormData({
      name: vessel.name,
      description: vessel.description,
      capacity: vessel.capacity,
      price_per_hour: vessel.price_per_hour,
      features: vessel.features,
      specifications: vessel.specifications,
      category: vessel.category || 'Yacht'
    });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  const handleAddImage = async (vesselId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) return;

      console.log('AdminVessels: Starting image upload for vessel:', vesselId);
      console.log('AdminVessels: Number of files:', files.length);

      try {
        let successCount = 0;
        
        for (const file of Array.from(files)) {
          console.log('AdminVessels: Processing file:', file.name, 'Size:', file.size);
          
          const fileExt = file.name.split('.').pop()?.toLowerCase();
          if (!fileExt || !['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
            console.error('AdminVessels: Invalid file type:', fileExt);
            toast.error(`Arquivo ${file.name} não é uma imagem válida`);
            continue;
          }

          const fileName = `${vesselId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          console.log('AdminVessels: Uploading to path:', fileName);
          
          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('vessel-images')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('AdminVessels: Upload error:', uploadError);
            toast.error(`Erro ao fazer upload de ${file.name}: ${uploadError.message}`);
            continue;
          }

          console.log('AdminVessels: Upload successful:', uploadData);

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('vessel-images')
            .getPublicUrl(fileName);

          console.log('AdminVessels: Public URL:', publicUrl);

          // Get current max display order
          const { data: currentImages, error: orderError } = await supabase
            .from('vessel_images')
            .select('display_order')
            .eq('vessel_id', vesselId)
            .order('display_order', { ascending: false })
            .limit(1);

          if (orderError) {
            console.error('AdminVessels: Error getting display order:', orderError);
          }

          const nextOrder = currentImages && currentImages.length > 0 
            ? (currentImages[0].display_order || 0) + 1 
            : 0;

          console.log('AdminVessels: Next display order:', nextOrder);

          // Save image record to database
          const { error: dbError } = await supabase
            .from('vessel_images')
            .insert({
              vessel_id: vesselId,
              image_url: publicUrl,
              alt_text: file.name.split('.')[0],
              display_order: nextOrder
            });

          if (dbError) {
            console.error('AdminVessels: Database error:', dbError);
            toast.error(`Erro ao salvar ${file.name} no banco de dados: ${dbError.message}`);
            
            // Try to cleanup uploaded file if DB insert failed
            await supabase.storage
              .from('vessel-images')
              .remove([fileName]);
            continue;
          }

          successCount++;
          console.log('AdminVessels: Successfully saved image:', file.name);
        }

        if (successCount > 0) {
          await loadVessels();
          toast.success(`${successCount} imagem(ns) adicionada(s) com sucesso!`);
        }
      } catch (error) {
        console.error('AdminVessels: Unexpected error during upload:', error);
        toast.error('Erro inesperado ao fazer upload das imagens');
      }
    };
    
    input.click();
  };

  const handleDeleteImage = async (vesselId: string, imageId: string) => {
    try {
      // Get image data to extract file path
      const { data: imageData, error: fetchError } = await supabase
        .from('vessel_images')
        .select('image_url')
        .eq('id', imageId)
        .single();

      if (fetchError) throw fetchError;

      // Extract file path from URL
      const url = new URL(imageData.image_url);
      const filePath = url.pathname.split('/vessel-images/')[1];

      // Delete from storage
      if (filePath) {
        await supabase.storage
          .from('vessel-images')
          .remove([filePath]);
      }

      // Delete from database
      const { error: deleteError } = await supabase
        .from('vessel_images')
        .delete()
        .eq('id', imageId);

      if (deleteError) throw deleteError;

      await loadVessels();
      toast.success('Imagem removida com sucesso!');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Erro ao remover imagem');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg">Carregando embarcações...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gerenciar Embarcações</h1>
        <Button 
          onClick={() => setEditingVessel('new')} 
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Embarcação
        </Button>
      </div>

      {/* Vessel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vessels.map((vessel) => (
          <Card key={vessel.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{vessel.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Capacidade: {vessel.capacity} pessoas
                  </p>
                  <span className="text-lg font-semibold">R$ {vessel.price_per_hour}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(vessel)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(vessel.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Imagens ({vessel.images.length})</h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Galeria
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Galeria - {vessel.name}</DialogTitle>
                    </DialogHeader>
                    <VesselImageCarousel
                      images={vessel.images.map(img => img.image_url)}
                      vesselName={vessel.name}
                      isAdminMode={true}
                      onAddImage={() => handleAddImage(vessel.id)}
                      onDeleteImage={(imageIndex) => {
                        const imageId = vessel.images[imageIndex]?.id;
                        if (imageId) handleDeleteImage(vessel.id, imageId);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex flex-wrap gap-1">
                {vessel.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit/Add Form Dialog */}
      {editingVessel && (
        <Dialog open={true} onOpenChange={() => setEditingVessel(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVessel === 'new' ? 'Adicionar Nova Embarcação' : 'Editar Embarcação'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome da embarcação"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da embarcação"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Capacidade</label>
                  <Input
                    type="number"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    placeholder="Número de pessoas"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Preço por hora (R$)</label>
                  <Input
                    type="number"
                    value={formData.price_per_hour || ''}
                    step="0.01"
                    onChange={(e) => setFormData({ ...formData, price_per_hour: Number(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Categoria</label>
                  <select
                    value={formData.category || 'Yacht'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="Yacht">Yacht</option>
                    <option value="Catamarã">Catamarã</option>
                    <option value="Lancha">Lancha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Características</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Nova característica"
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                  />
                  <Button onClick={addFeature} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features?.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeFeature(index)}>
                      {feature} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingVessel(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminVessels;