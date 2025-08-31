import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VesselImageCarousel from "@/components/VesselImageCarousel";
import { toast } from "sonner";
import { 
  Settings, 
  Save, 
  Upload, 
  Edit3, 
  Eye,
  Plus,
  Ship
} from "lucide-react";

// Dados das embarcações com múltiplas imagens
const initialVesselsData = {
  segue: {
    id: "segue",
    name: "SEGUE",
    type: "Iate Premium",
    images: ["/src/assets/segue-yacht.jpg"],
    capacity: 18,
    price: "R$ 18.000",
    originalPrice: "R$ 20.000",
    rating: 4.9,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate premium com capacidade para 18 passageiros",
    category: "iate"
  },
  // ... outros vessels
};

const AdminVessels = () => {
  const [vessels, setVessels] = useState(initialVesselsData);
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = (vesselId: string) => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, vesselId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setVessels(prev => ({
          ...prev,
          [vesselId]: {
            ...prev[vesselId],
            images: [...(prev[vesselId]?.images || []), imageUrl]
          }
        }));
        toast.success("Imagem adicionada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = (vesselId: string, imageIndex: number) => {
    // Implementar lógica de edição de imagem
    toast.info("Funcionalidade de edição em desenvolvimento");
  };

  const handleDeleteImage = (vesselId: string, imageIndex: number) => {
    setVessels(prev => ({
      ...prev,
      [vesselId]: {
        ...prev[vesselId],
        images: prev[vesselId]?.images?.filter((_, index) => index !== imageIndex) || []
      }
    }));
    toast.success("Imagem removida com sucesso!");
  };

  const handleSaveVessel = (vesselId: string, data: any) => {
    setVessels(prev => ({
      ...prev,
      [vesselId]: {
        ...prev[vesselId],
        ...data
      }
    }));
    setIsEditing(false);
    toast.success("Embarcação atualizada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-lg">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Administração de Embarcações</h1>
              <p className="text-muted-foreground">Gerencie fotos e informações das embarcações</p>
            </div>
          </div>
          
          <Badge variant="outline" className="px-4 py-2">
            <Settings className="w-4 h-4 mr-2" />
            Admin Panel
          </Badge>
        </div>

        {/* Grid de embarcações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(vessels).map(([vesselId, vessel]) => (
            <Card key={vesselId} className="card-luxury overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{vessel.name}</CardTitle>
                  <Badge variant="secondary">{vessel.type}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Carousel de imagens */}
                  <VesselImageCarousel
                    images={vessel.images || []}
                    vesselName={vessel.name}
                    isAdminMode={true}
                    onAddImage={() => {
                      setSelectedVessel(vesselId);
                      handleAddImage(vesselId);
                    }}
                    onEditImage={(index) => handleEditImage(vesselId, index)}
                    onDeleteImage={(index) => handleDeleteImage(vesselId, index)}
                  />
                  
                  {/* Informações básicas */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Capacidade</p>
                      <p className="font-medium">{vessel.capacity} pessoas</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Preço</p>
                      <p className="font-medium">{vessel.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duração</p>
                      <p className="font-medium">{vessel.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fotos</p>
                      <p className="font-medium">{vessel.images?.length || 0} imagens</p>
                    </div>
                  </div>
                  
                  {/* Botões de ação */}
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Editar Info
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Editar {vessel.name}</DialogTitle>
                        </DialogHeader>
                        <VesselEditForm 
                          vessel={vessel} 
                          onSave={(data) => handleSaveVessel(vesselId, data)}
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(`/vessel/${vesselId}`, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Input de arquivo oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => selectedVessel && handleFileUpload(e, selectedVessel)}
        />
      </div>
    </div>
  );
};

// Componente para editar informações da embarcação
const VesselEditForm = ({ vessel, onSave }: { vessel: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(vessel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="capacity">Capacidade</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="duration">Duração</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="location">Local de Embarque</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>
      
      <div>
        <Label htmlFor="category">Categoria</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lancha">Lancha</SelectItem>
            <SelectItem value="iate">Iate</SelectItem>
            <SelectItem value="catamara">Catamarã</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
};

export default AdminVessels;