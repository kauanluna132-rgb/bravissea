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
  Ship,
  Home,
  Check,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import vessel images
import segueImage from "@/assets/segue-yacht.jpg";
import tecnomarineImage from "@/assets/tecnomarine-yacht.jpg";
import mywayImage from "@/assets/myway-yacht.jpg";
import flyhiImage from "@/assets/flyhi-boat.jpg";
import mcellImage from "@/assets/mcell-boat.jpg";
import comendadorImage from "@/assets/comendador-yacht.jpg";
import dragaoImage from "@/assets/dragao-yacht.jpg";
import grandrarayImage from "@/assets/grandraray-yacht.jpg";
import ladyRuthImage from "@/assets/lady-ruth-yacht.jpg";
import mangataImage from "@/assets/mangata-yacht.jpg";
import prestigeImage from "@/assets/prestige-yacht.jpg";
import rebecaImage from "@/assets/rebeca-yacht.jpg";
import oceanoImage from "@/assets/oceano-catamaran.jpg";
import blauImage from "@/assets/blau-catamaran.jpg";
import nossaImage from "@/assets/nossa-yacht.jpg";
import sevenImage from "@/assets/seven-yacht.jpg";
import sennaImage from "@/assets/senna-yacht.jpg";
import luisaImage from "@/assets/luisa-yacht.jpg";

// Interface para os dados das embarcações
interface VesselData {
  id: string;
  name: string;
  type: string;
  images: string[];
  capacity: number;
  price: string;
  originalPrice?: string;
  rating: number;
  duration: string;
  location: string;
  description: string;
  category: string;
}

// Dados completos das embarcações com múltiplas imagens
const initialVesselsData: Record<string, VesselData> = {
  segue: {
    id: "segue",
    name: "SEGUE",
    type: "Iate Premium",
    images: [segueImage],
    capacity: 18,
    price: "R$ 18.000",
    originalPrice: "R$ 20.000",
    rating: 4.9,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate premium com capacidade para 18 passageiros",
    category: "iate"
  },
  tecnomarine: {
    id: "tecnomarine",
    name: "Iate Tecnomarine",
    type: "Iate Executive",
    images: [tecnomarineImage],
    capacity: 20,
    price: "R$ 10.000",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate Tecnomarine com alta tecnologia para 20 passageiros",
    category: "iate"
  },
  myway: {
    id: "myway",
    name: "IATE MY WAY",
    type: "Iate Luxury",
    images: [mywayImage],
    capacity: 20,
    price: "R$ 12.000",
    rating: 4.9,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate MY WAY com design exclusivo para 20 passageiros",
    category: "iate"
  },
  flyhi: {
    id: "flyhi",
    name: "FLY HI",
    type: "Lancha Premium",
    images: [flyhiImage],
    capacity: 15,
    price: "R$ 3.200",
    originalPrice: "R$ 3.700",
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha FLY HI ideal para passeios emocionantes",
    category: "lancha"
  },
  mcell: {
    id: "mcell",
    name: "Lancha M Cell",
    type: "Lancha",
    images: [
      "/lovable-uploads/mcell-1.png",
      "/lovable-uploads/mcell-2.png",
      "/lovable-uploads/mcell-3.png",
      "/lovable-uploads/mcell-4.png",
      "/lovable-uploads/mcell-5.png",
      "/lovable-uploads/mcell-6.png"
    ],
    capacity: 9,
    price: "R$ 2.500",
    originalPrice: undefined,
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha M Cell com cabine, churrasqueira e todas as comodidades para um passeio perfeito",
    category: "lancha"
  },
  comendador: {
    id: "comendador",
    name: "COMENDADOR",
    type: "Iate Executivo",
    images: [comendadorImage],
    capacity: 25,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "Iate COMENDADOR com capacidade para 25 passageiros",
    category: "iate"
  },
  dragao: {
    id: "dragao",
    name: "Dragão",
    type: "Iate Médio",
    images: [dragaoImage],
    capacity: 17,
    price: "R$ 4.000",
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    description: "Iate Dragão de 41 pés para 17 passageiros",
    category: "iate"
  },
  grandraray: {
    id: "grandraray",
    name: "GRAND RARAY",
    type: "Iate Premium",
    images: [grandrarayImage],
    capacity: 18,
    price: "R$ 6.000",
    rating: 4.8,
    duration: "8h",
    location: "Marina da Glória",
    description: "GRAND RARAY com embarque na Marina da Glória",
    category: "iate"
  },
  "lady-ruth": {
    id: "lady-ruth",
    name: "LADY RUTH",
    type: "Lancha Premium",
    images: [ladyRuthImage],
    capacity: 13,
    price: "R$ 1.999",
    originalPrice: "R$ 2.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lady Ruth com 5 horas de excelente passeio",
    category: "lancha"
  },
  mangata: {
    id: "mangata",
    name: "MANGATA",
    type: "Iate Premium",
    images: [mangataImage],
    capacity: 12,
    price: "R$ 11.500",
    originalPrice: "R$ 12.000",
    rating: 4.9,
    duration: "5h",
    location: "Iate Clube Rio de Janeiro",
    description: "Sessa Marine c44 - Mangata com copacabana/cagarras",
    category: "iate"
  },
  prestige: {
    id: "prestige",
    name: "PRESTIGE",
    type: "Lancha Premium",
    images: [prestigeImage],
    capacity: 20,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha Prestige 600 fly, dois motores volvo d 13",
    category: "lancha"
  },
  rebeca: {
    id: "rebeca",
    name: "YACHT REBECA",
    type: "Iate Luxury",
    images: [rebecaImage],
    capacity: 16,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Phantom 620 Pininfarina de 62 pés com design italiano",
    category: "iate"
  },
  oceano: {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    images: [oceanoImage],
    capacity: 65,
    price: "R$ 16.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã de até 65 passageiros com horários válidos por 30 dias",
    category: "catamara"
  },
  blau: {
    id: "blau",
    name: "CATAMARÃ BLAU",
    type: "Catamarã Premium",
    images: [blauImage],
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã Blau com embarque na Marina da Glória",
    category: "catamara"
  },
  nossa: {
    id: "nossa",
    name: "NOSSA",
    type: "Iate Premium",
    images: [nossaImage],
    capacity: 25,
    price: "R$ 7.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Pershing 52HT com gerador 110v e equipamentos completos",
    category: "iate"
  },
  seven: {
    id: "seven",
    name: "SEVEN",
    type: "Lancha Premium",
    images: [sevenImage],
    capacity: 15,
    price: "R$ 7.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha intermarine 44 pés com embarque na Marina da Glória",
    category: "lancha"
  },
  senna: {
    id: "senna",
    name: "SENNA",
    type: "Iate Premium",
    images: ["/lovable-uploads/senna-1.png", "/lovable-uploads/senna-2.png", "/lovable-uploads/senna-3.png", "/lovable-uploads/senna-4.png", "/lovable-uploads/senna-5.png", "/lovable-uploads/senna-6.png", "/lovable-uploads/senna-7.png", "/lovable-uploads/senna-8.png", "/lovable-uploads/senna-9.png", "/lovable-uploads/senna-10.png"],
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "46 pés com 2 motores volvo a diesel, 2 suítes completas",
    category: "iate"
  },
  luisa: {
    id: "luisa",
    name: "LUÍSA V",
    type: "Iate Premium",
    images: ["/lovable-uploads/luisa-1.png", "/lovable-uploads/luisa-2.png", "/lovable-uploads/luisa-3.png", "/lovable-uploads/luisa-4.png", "/lovable-uploads/luisa-5.png", "/lovable-uploads/luisa-6.png", "/lovable-uploads/luisa-7.png", "/lovable-uploads/luisa-8.png", "/lovable-uploads/luisa-9.png", "/lovable-uploads/luisa-10.png"],
    capacity: 15,
    price: "R$ 2.800",
    originalPrice: "R$ 3.200",
    rating: 4.6,
    duration: "6h",
    location: "Marina da Glória",
    description: "Luísa V com roteiro Marina da Glória x Flamengo x Aeroporto x Urca",
    category: "iate"
  }
};

const AdminVessels = () => {
  const navigate = useNavigate();
  const [vessels, setVessels] = useState<Record<string, VesselData>>(() => {
    // Carregar dados salvos do localStorage ou usar dados iniciais
    const savedData = localStorage.getItem('adminVesselsData');
    return savedData ? JSON.parse(savedData) : initialVesselsData;
  });
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = (vesselId: string) => {
    console.log('handleAddImage chamado para:', vesselId);
    setSelectedVessel(vesselId);
    // Forçar click direto no input sem limite
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log('handleFileUpload - files:', files?.length, 'selectedVessel:', selectedVessel);
    
    if (!files || files.length === 0) {
      console.log('Nenhum arquivo selecionado');
      toast.error('Nenhum arquivo selecionado');
      return;
    }

    if (!selectedVessel) {
      console.log('Nenhum vessel selecionado');
      toast.error('Erro: embarcação não selecionada');
      return;
    }

    const filesArray = Array.from(files);
    const totalFiles = filesArray.length;
    
    console.log(`Processando ${totalFiles} arquivo(s) para vessel: ${selectedVessel}`);
    toast.info(`Processando ${totalFiles} imagem${totalFiles > 1 ? 'ns' : ''}...`);

    const processedImages: string[] = [];
    let processedCount = 0;

    filesArray.forEach((file, index) => {
      console.log(`Processando arquivo ${index + 1}:`, file.name, file.type, file.size);
      
      if (!file.type.startsWith('image/')) {
        console.error('Arquivo não é uma imagem:', file.type);
        toast.error(`Arquivo ${file.name} não é uma imagem válida`);
        processedCount++;
        
        // Verificar se todos foram processados (mesmo com erro)
        if (processedCount === totalFiles) {
          updateVesselImages();
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (imageUrl) {
          processedImages[index] = imageUrl;
          processedCount++;
          
          console.log(`Imagem ${processedCount}/${totalFiles} processada com sucesso`);
          
          // Quando todas as imagens foram processadas
          if (processedCount === totalFiles) {
            updateVesselImages();
          }
        }
      };
      
      reader.onerror = (error) => {
        console.error('Erro ao ler arquivo:', error);
        toast.error(`Erro ao processar ${file.name}`);
        processedCount++;
        
        // Verificar se todos foram processados (mesmo com erro)
        if (processedCount === totalFiles) {
          updateVesselImages();
        }
      };
      
      reader.readAsDataURL(file);
    });

    function updateVesselImages() {
      console.log('updateVesselImages chamada, processedImages:', processedImages);
      
      const validImages = processedImages.filter(Boolean);
      console.log('Imagens válidas encontradas:', validImages.length);
      
      if (validImages.length === 0) {
        toast.error('Nenhuma imagem válida foi processada');
        return;
      }
      
      setVessels(prev => {
        const currentVessel = prev[selectedVessel];
        if (!currentVessel) {
          console.error('Vessel não encontrado:', selectedVessel);
          toast.error('Erro: embarcação não encontrada');
          return prev;
        }

        const updatedVessel = {
          ...currentVessel,
          images: [...(currentVessel.images || []), ...validImages]
        };

        console.log('Vessel antes da atualização:', currentVessel);
        console.log('Vessel após atualização:', updatedVessel);
        console.log('Total de imagens após atualização:', updatedVessel.images.length);

        const newState = {
          ...prev,
          [selectedVessel]: updatedVessel
        };
        
        console.log('Novo estado completo:', newState);
        return newState;
      });
      
      setHasUnsavedChanges(true);
      toast.success(`${validImages.length} imagem${validImages.length > 1 ? 'ns' : ''} adicionada${validImages.length > 1 ? 's' : ''} com sucesso!`);
    }
    
    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleEditImage = (vesselId: string, imageIndex: number) => {
    setSelectedVessel(vesselId);
    fileInputRef.current?.click();
    toast.info("Selecione uma nova imagem para substituir");
  };

  const handleDeleteImage = (vesselId: string, imageIndex: number) => {
    setVessels(prev => ({
      ...prev,
      [vesselId]: {
        ...prev[vesselId],
        images: prev[vesselId]?.images?.filter((_, index) => index !== imageIndex) || []
      }
    }));
    setHasUnsavedChanges(true);
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
    setHasUnsavedChanges(true);
    setIsEditing(false);
    toast.success("Embarcação atualizada com sucesso!");
  };

  const handleSaveAllChanges = () => {
    try {
      console.log('Iniciando salvamento das alterações...');
      console.log('Dados a serem salvos:', vessels);
      
      // Verificar se localStorage está disponível
      if (typeof Storage === "undefined") {
        throw new Error("LocalStorage não está disponível");
      }
      
      // Converter para JSON e verificar se é válido
      const dataToSave = JSON.stringify(vessels);
      console.log('JSON gerado com sucesso, tamanho:', dataToSave.length);
      
      // Salvar no localStorage
      localStorage.setItem('adminVesselsData', dataToSave);
      console.log('Dados salvos no localStorage com sucesso');
      
      // Também salvar uma flag indicando que há dados customizados
      localStorage.setItem('hasCustomVesselData', 'true');
      console.log('Flag de dados customizados salva');
      
      // Verificar se foi salvo corretamente
      const savedData = localStorage.getItem('adminVesselsData');
      if (!savedData) {
        throw new Error("Falha ao verificar dados salvos");
      }
      
      // FORÇAR ATUALIZAÇÃO DO SITE - Disparar evento personalizado
      window.dispatchEvent(new CustomEvent('vesselsDataUpdated', { 
        detail: vessels 
      }));
      
      // Também recarregar a página principal se estiver aberta em outra aba
      if (window.opener) {
        window.opener.postMessage({ type: 'vesselsUpdated', data: vessels }, '*');
      }
      
      setHasUnsavedChanges(false);
      console.log('Estado atualizado - salvamento concluído');
      toast.success("✅ Alterações salvas! Site atualizado automaticamente!");
      
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(`Erro ao salvar as informações: ${errorMessage}`);
    }
  };

  const handleExitAdmin = () => {
    if (hasUnsavedChanges) {
      const confirmExit = window.confirm(
        "Você tem alterações não salvas. Deseja realmente sair sem salvar?"
      );
      if (!confirmExit) return;
    }
    
    navigate('/');
    toast.info("Voltando ao site principal...");
  };

  const handleResetData = () => {
    const confirmReset = window.confirm(
      "Isso irá resetar todas as modificações e voltar aos dados originais. Confirma?"
    );
    
    if (confirmReset) {
      localStorage.removeItem('adminVesselsData');
      localStorage.removeItem('hasCustomVesselData');
      setVessels(initialVesselsData);
      setHasUnsavedChanges(false);
      toast.success("Dados resetados para o padrão original!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6 py-8">
        {/* Header com botões de ação */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-lg">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Administração de Embarcações</h1>
              <p className="text-muted-foreground text-sm lg:text-base">Gerencie fotos e informações das embarcações</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            {hasUnsavedChanges && (
              <Badge variant="destructive" className="px-3 py-2 text-xs">
                <X className="w-3 h-3 mr-2" />
                Alterações não salvas
              </Badge>
            )}
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleExitAdmin}
                className="border-muted-foreground/30 w-full sm:w-auto text-sm"
                size="sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Site
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleResetData}
                className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 w-full sm:w-auto text-sm"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Resetar Dados
              </Button>
              
              <Button
                onClick={handleSaveAllChanges}
                disabled={!hasUnsavedChanges}
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-sm"
                size="sm"
              >
                <Check className="w-4 h-4 mr-2" />
                Salvar no Site
              </Button>
            </div>
          </div>
        </div>

        {/* Grid de embarcações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {Object.entries(vessels).map(([vesselId, vessel]) => (
            <Card key={vesselId} className="card-luxury overflow-hidden">
              <CardHeader className="pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base lg:text-lg truncate">{vessel.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{vessel.type}</Badge>
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
                      console.log('onAddImage chamado para vessel:', vesselId);
                      handleAddImage(vesselId);
                    }}
                    onEditImage={(index) => handleEditImage(vesselId, index)}
                    onDeleteImage={(index) => handleDeleteImage(vesselId, index)}
                  />
                  
                  {/* Informações básicas */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm">
                    <div>
                      <p className="text-muted-foreground">Capacidade</p>
                      <p className="font-medium">{vessel.capacity} pessoas</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Preço</p>
                      <p className="font-medium truncate">{vessel.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duração</p>
                      <p className="font-medium">{vessel.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fotos</p>
                      <p className="font-medium text-primary">{vessel.images?.length || 0} imagens</p>
                    </div>
                  </div>
                  
                  {/* Botões de ação */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          <Edit3 className="w-3 h-3 mr-2" />
                          Editar Info
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                      className="text-xs"
                      onClick={() => window.open(`/vessel/${vesselId}`, '_blank')}
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Input de arquivo oculto para MÚLTIPLAS imagens SEM LIMITE */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          title="Adicionar múltiplas imagens - sem limite"
        />
      </div>
    </div>
  );
};

// Componente para editar informações da embarcação
const VesselEditForm = ({ vessel, onSave }: { vessel: VesselData; onSave: (data: VesselData) => void }) => {
  const [formData, setFormData] = useState<VesselData>(vessel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
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