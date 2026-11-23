import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { readChoice, saveChoices } from "@/lib/consent";

const PrivacySettings = () => {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const gpc = readChoice("advertising") === "denied" &&
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

  const changeOpen = (next: boolean) => {
    if (next) {
      setAnalytics(readChoice("analytics") === "granted");
      setAdvertising(readChoice("advertising") === "granted");
    }
    setOpen(next);
  };
  const save = (analyticsAllowed: boolean, adsAllowed: boolean) => {
    saveChoices({ analytics: analyticsAllowed ? "granted" : "denied", advertising: adsAllowed ? "granted" : "denied" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-inherit whitespace-normal">Configurações de cookies</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg max-h-[85dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Suas preferências de privacidade</DialogTitle>
          <DialogDescription>
            Escolha se permite medir suas ações e usar cookies para publicidade.
            Você pode mudar sua escolha a qualquer momento.
          </DialogDescription>
        </DialogHeader>
        {gpc && <p className="text-sm text-muted-foreground">O sinal de privacidade do seu navegador bloqueia a medição opcional.</p>}
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between gap-4 py-4">
            <div><p className="font-medium">Necessários</p><p className="text-sm text-muted-foreground">Guardam suas preferências.</p></div>
            <span className="text-sm text-muted-foreground">Sempre ativos</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <div><Label htmlFor="privacy-analytics">Análise de uso</Label><p className="text-sm text-muted-foreground">Fornecida por Lovable e Google Analytics.</p></div>
            <Switch id="privacy-analytics" checked={analytics && !gpc} onCheckedChange={setAnalytics} disabled={gpc} />
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <div><Label htmlFor="privacy-advertising">Publicidade</Label><p className="text-sm text-muted-foreground">Fornecida por Meta e Google para medir contatos e melhorar anúncios.</p></div>
            <Switch id="privacy-advertising" checked={advertising && !gpc} onCheckedChange={setAdvertising} disabled={gpc} />
          </div>
        </div>
        <a href="/privacidade" className="text-sm text-primary underline">Política de Privacidade</a>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => save(false, false)}>Rejeitar todos</Button>
          <Button variant="outline" disabled={gpc} onClick={() => save(true, true)}>Aceitar todos</Button>
        </div>
        <Button onClick={() => save(analytics && !gpc, advertising && !gpc)}>Salvar preferências</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacySettings;