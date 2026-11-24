export default function AttributionChoice({checked,onChange}:{checked:boolean;onChange:(value:boolean)=>void}) {
 return <label className="flex items-start gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} className="mt-1" /><span>Permito medição analítica e publicitária para associar este pedido à campanha que me trouxe ao site. Opcional; posso alterar em Configurações de cookies.</span></label>;
}
