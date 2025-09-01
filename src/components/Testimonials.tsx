import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Fallback testimonials em caso de erro na API
const fallbackTestimonials = [
  {
    id: 1,
    name: "Marina Silva",
    location: "São Paulo",
    rating: 5,
    text: "Experiência incrível! A embarcação estava impecável e o capitão foi super atencioso. As vistas do Pão de Açúcar e Cristo foram inesquecíveis. Recomendo demais!",
    vessel: "Ocean Dream",
    avatar: "MS",
    date: "2024-08-15"
  },
  {
    id: 2,
    name: "Carlos Eduardo",
    location: "Belo Horizonte", 
    rating: 5,
    text: "Passeio perfeito para comemorar nosso aniversário de casamento. O sunset no catamarã foi mágico. Atendimento de primeira e segurança total.",
    vessel: "Paradise Sailing",
    avatar: "CE",
    date: "2024-08-10"
  },
  {
    id: 3,
    name: "Amanda Costa",
    location: "Rio de Janeiro",
    rating: 5,
    text: "Organizei uma confraternização da empresa no iate e foi um sucesso! Todos ficaram impressionados com o luxo e conforto. Já estamos planejando o próximo.",
    vessel: "Royal Yacht", 
    avatar: "AC",
    date: "2024-08-05"
  },
  {
    id: 4,
    name: "Roberto Santos",
    location: "Brasília",
    rating: 5,
    text: "Primeira vez no Rio e escolhi o passeio da Bravissea. Que decisão acertada! Conheci a cidade de um ângulo único. Profissionalismo exemplar.",
    vessel: "Ocean Dream",
    avatar: "RS",
    date: "2024-07-28"
  },
  {
    id: 5,
    name: "Juliana Oliveira", 
    location: "Salvador",
    rating: 5,
    text: "Despedida de solteira inesquecível! As meninas adoraram o catamarã. Música, drinks e muito mar. A Bravissea tornou nosso dia especial em algo mágico.",
    vessel: "Paradise Sailing",
    avatar: "JO",
    date: "2024-07-20"
  },
  {
    id: 6,
    name: "Fernando Lima",
    location: "Porto Alegre",
    rating: 5,
    text: "Viagem de negócios que virou experiência premium. O iate executivo impressionou nossos clientes internacionais. Fechamos o contrato a bordo!",
    vessel: "Royal Yacht",
    avatar: "FL",
    date: "2024-07-15"
  }
];

const stats = [
  { number: "1000+", label: "Clientes Satisfeitos" },
  { number: "4.9/5", label: "Avaliação Média" },
  { number: "99%", label: "Recomendam a Bravissea" },
  { number: "5 Anos", label: "de Excelência" }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar reviews do Google
  const fetchGoogleReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Buscando reviews do Google...');
      
      const { data, error: supabaseError } = await supabase.functions.invoke('google-reviews');
      
      if (supabaseError) {
        console.error('Erro ao buscar reviews:', supabaseError);
        throw new Error(supabaseError.message || 'Erro ao buscar avaliações');
      }
      
      console.log('Reviews recebidos:', data);
      
      if (data && data.reviews && data.reviews.length > 0) {
        // Adicionar IDs únicos aos reviews do Google
        const reviewsWithIds = data.reviews.map((review: any, index: number) => ({
          ...review,
          id: `google-${index}`,
          avatar: review.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
        }));
        
        setTestimonials(reviewsWithIds);
        console.log('Reviews atualizados com sucesso');
      } else {
        console.log('Nenhum review encontrado, usando fallback');
        setError('Nenhuma avaliação encontrada no Google');
      }
    } catch (error: any) {
      console.error('Erro ao carregar reviews do Google:', error);
      setError(error.message || 'Erro ao carregar avaliações do Google');
      // Manter os reviews de fallback em caso de erro
      setTestimonials(fallbackTestimonials);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar reviews quando o componente monta
  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Experiências Reais
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O que Nossos
            <span className="text-gradient-ocean"> Clientes Dizem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais de 1000 experiências inesquecíveis criadas. Veja os depoimentos de quem 
            já navegou conosco e descobriu o Rio de Janeiro de uma forma única.
          </p>
          
          {/* Indicador de status */}
          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">
                Exibindo avaliações locais (erro ao carregar Google Reviews)
              </span>
            </div>
          )}
          
          {isLoading && (
            <div className="mt-4 text-sm text-muted-foreground">
              Carregando avaliações do Google...
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-luxury overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                  
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Vessel Badge */}
                <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
                  {testimonial.vessel}
                </Badge>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                    {testimonial.date && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Por que Confiar na Bravissea?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Segurança Certificada</h4>
              <p className="text-sm text-muted-foreground">
                Todas as embarcações possuem certificação da Marinha e equipamentos de segurança
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Capitães Experientes</h4>
              <p className="text-sm text-muted-foreground">
                Profissionais habilitados com anos de experiência nas águas cariocas
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Satisfação Garantida</h4>
              <p className="text-sm text-muted-foreground">
                Compromisso com a excelência e experiências que superam expectativas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;