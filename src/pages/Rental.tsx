import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VesselCard from '@/components/VesselCard';
import { vessels } from '@/components/VesselCatalog';
import { rentalPages } from '@/lib/seo';
import { RentalFAQ, RentalLinks } from '@/components/RentalGuide';
import ContactForm from '@/components/ContactForm';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import NotFound from './NotFound';
export default function Rental() {
 const {slug}=useParams();const page=rentalPages.find(p=>p.slug===slug);
 if(!page)return <NotFound />;
 const fleet=vessels.filter(v=>v.category===page.category);
 return <div className="min-h-screen"><Navbar /><main><header className="bg-secondary/30 pt-32 pb-14"><div className="container mx-auto px-6 max-w-5xl"><nav aria-label="Navegação estrutural" className="text-sm mb-6"><Link to="/" className="underline">Início</Link><span aria-hidden="true"> / </span>{page.title}</nav><h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{page.title}</h1><p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{page.intro}</p><a href="#frota" className="inline-flex rounded-lg bg-primary text-white px-6 py-3 mt-7">Comparar embarcações</a></div></header><section id="frota" className="container mx-auto px-6 py-14"><h2 className="text-3xl font-bold mb-4">Compare as opções para seu passeio</h2><p className="text-muted-foreground mb-8">Valores de referência por passeio, sujeitos à confirmação de data, roteiro e serviços.</p><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{fleet.map(v=><VesselCard key={v.id} {...v} />)}</div></section><section className="container mx-auto max-w-4xl px-6 py-10 space-y-10">{page.sections.map(([heading,text])=><section key={heading}><h2 className="text-2xl font-semibold mb-3">{heading}</h2><p className="text-muted-foreground leading-relaxed">{text}</p></section>)}</section><RentalFAQ /><section className="container mx-auto px-6 py-10"><h2 className="text-2xl font-semibold mb-6">Outras opções de aluguel no Rio</h2><RentalLinks /></section><ContactForm /></main><Footer /><WhatsAppFloat /></div>;
}
