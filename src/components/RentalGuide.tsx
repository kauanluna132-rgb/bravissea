import { Link } from 'react-router-dom';
import { faq, rentalPages } from '@/lib/seo';
export function RentalLinks() {
 return <nav aria-label="Tipos de aluguel" className="flex flex-wrap gap-3">{rentalPages.map(p=><Link key={p.slug} to={'/'+p.slug} className="rounded-full border border-primary/30 px-4 py-2 text-sm text-primary hover:bg-primary/5">{p.title}</Link>)}</nav>;
}
export function RentalFAQ() {
 return <section className="container mx-auto max-w-4xl px-6 py-14" aria-labelledby="perguntas-aluguel"><h2 id="perguntas-aluguel" className="text-3xl font-bold mb-7">Dúvidas sobre aluguel de embarcações no Rio</h2><div className="space-y-5">{faq.map(([q,a])=><details key={q} className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-muted-foreground leading-relaxed">{a}</p></details>)}</div></section>;
}
export default function RentalGuide() {
 return <section className="container mx-auto px-6 py-14"><div className="max-w-4xl mb-8"><h2 className="text-3xl font-bold mb-4">Aluguel de embarcações para seu passeio no Rio de Janeiro</h2><p className="text-muted-foreground leading-relaxed">Compare lanchas, iates e catamarãs para um passeio com seu grupo. A Bravissea apresenta fotos, capacidade de passageiros, duração e características de cada embarcação. Escolha o modelo e solicite um orçamento para confirmar disponibilidade, roteiro, itens incluídos e ponto de embarque na Marina da Glória.</p></div><RentalLinks /></section>;
}
