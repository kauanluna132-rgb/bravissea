import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

const AdminButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Senha simples para demonstração - em produção, seria mais seguro
    if (password === "admin123") {
      setIsAuthenticated(true);
      setIsOpen(false);
      window.location.href = "/admin/vessels";
      toast.success("Acesso liberado!");
    } else {
      toast.error("Senha incorreta!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-4 left-4 z-50 bg-white/90 backdrop-blur-sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Acesso Administrativo
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="password">Senha de Administrador</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            <Unlock className="w-4 h-4 mr-2" />
            Entrar no Painel Admin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminButton;