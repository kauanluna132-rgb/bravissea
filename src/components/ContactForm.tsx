import { useState } from 'react';
import { submitLead, leadRequestId } from '@/lib/submit-lead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
export default function ContactForm() {
 const [busy,setBusy]=useState(false),[status,setStatus]=useState('');
 return <section className="container mx-auto px-4 py-16 max-w-2xl"><h2 className="text-3xl font-bold mb-4">Planeje seu passeio com a Bravissea</h2><p className="mb-6">Conte o que você procura. Nossa equipe verificará disponibilidade e preparará uma proposta.</p><form className="grid gap-4" onSubmit={async e=>{e.preventDefault(); if(busy)return;const form=e.currentTarget;setBusy(true);setStatus('');try{await submitLead(Object.fromEntries(new FormData(form)) as Record<string,string>,leadRequestId());setStatus('Solicitação recebida! Nossa equipe entrará em contato.');form.reset();}catch(err){setStatus((err as Error).message);}finally{setBusy(false);}}}>
 <label>Nome<Input name="name" required minLength={2} maxLength={200} autoComplete="name" /></label>
 <label>WhatsApp<Input name="phone" type="tel" required minLength={10} maxLength={30} autoComplete="tel" /></label>
 <label>Email (opcional)<Input name="email" type="email" maxLength={200} autoComplete="email" /></label>
 <label>Data desejada (opcional)<Input name="date" type="date" /></label>
 <label>Passageiros (opcional)<Input name="guests" type="number" min="1" max="500" /></label>
 <label>Como podemos ajudar?<Textarea name="message" maxLength={3000} /></label>
 <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
 <p className="text-sm text-muted-foreground">Usaremos seus dados para responder à solicitação. Veja a <a href="/privacidade" className="underline">política de privacidade</a>. O envio não confirma uma reserva.</p>
 <Button disabled={busy}>{busy?'Enviando...':'Enviar solicitação'}</Button><p role="status">{status}</p>
 </form></section>;
}
