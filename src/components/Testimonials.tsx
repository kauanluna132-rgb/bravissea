import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

// Avaliações reais dos clientes
const testimonials = [
  {
    id: 1,
    name: "Rebeca Hansen",
    rating: 5,
    text: "Comemore o aniversário de 15 anos do meu filho com a família e amigos. Foi tudo top! Mesmo com o tempo nublado, curtimos bastante. A equipe foi muito atenciosa desde o primeiro contato. Fechei a promoção da...",
    avatar: "RH",
    timeAgo: "4 meses atrás"
  },
  {
    id: 2,
    name: "Silveira Luna",
    rating: 5,
    text: "Foi tudo impecável! A equipe foi super atenciosa desde o primeiro contato até o final do passeio. A embarcação estava limpa, confortável e bem equipada. Fizemos um roteiro maravilhoso pela Lúcia e praia Vermelha e ainda tiveram um churrasco top a bordo. Com certeza voltaremos!",
    avatar: "SL",
    timeAgo: "5 meses atrás"
  },
  {
    id: 3,
    name: "702 Cross",
    rating: 5,
    text: "Experiência incrível! Alugue uma lancha para um passeio com amigos e familiares no Rio de Janeiro e foi simplesmente perfeito. A equipe da Bravissea foi super atenciosa e profissional desde o início. Altamente recomendado!",
    avatar: "7C",
    timeAgo: "5 meses atrás"
  },
  {
    id: 4,
    name: "Nazarete Silva",
    rating: 5,
    text: "Não posso deixar de falar do meu passeio. Juro que fiquei com medo de graças, mas assim que entrei em contato com a Empresa Bravissea, o seu WhatsApp é recomendo e o atendimento foi excelente...",
    avatar: "NS",
    timeAgo: "5 meses atrás"
  },
  {
    id: 5,
    name: "Rafael Ferrari",
    rating: 5,
    text: "O barco é ótimo! Foi no Luiza 7, cabem 15 pessoas confortáveis. A equipe é muito solícita e muito competente. Indico a todos.",
    avatar: "RF",
    timeAgo: "um mês atrás"
  },
  {
    id: 6,
    name: "Alice Silva",
    rating: 5,
    text: "Top demais a experiência, totalmente privado, gostamos muito",
    avatar: "AS",
    timeAgo: "6 dias atrás"
  },
  {
    id: 7,
    name: "Alex Ramos",
    rating: 5,
    text: "Empresa fazendo a diferenciado do começo até o final do passeio 🛥️🌊 parabéns 🏆",
    avatar: "AR",
    timeAgo: "um mês atrás"
  },
  {
    id: 8,
    name: "Marangela Almeida",
    rating: 5,
    text: "Excelente tudo, muito perfeito",
    avatar: "MA",
    timeAgo: "um mês atrás"
  },
  {
    id: 9,
    name: "Minas Lancho 2",
    rating: 5,
    text: "Ótimo atendimento.",
    avatar: "ML",
    timeAgo: "4 meses atrás"
  },
  {
    id: 10,
    name: "Jeferson Faccio",
    rating: 5,
    text: "Excelente.. 👍",
    avatar: "JF",
    timeAgo: "4 meses atrás"
  },
  {
    id: 11,
    name: "Michael Thompson",
    rating: 5,
    text: "Excelente atendimento",
    avatar: "MT",
    timeAgo: "5 meses atrás"
  },
  {
    id: 12,
    name: "Carlos Dom",
    rating: 5,
    text: "Bravissea tornou meu aniversário muito especial. Meu grupo e eu nos divertimos muito, obrigado por tudo, quando eu voltar ao Brasil com certeza reservar com vocês novamente.",
    avatar: "CD",
    timeAgo: "3 meses atrás"
  },
  {
    id: 13,
    name: "Mariana Campos",
    rating: 5,
    text: "Aluguei uma lancha para minha despedida de solteira, foi tudo maravilhoso! Muito cuidadosos e atenciosos! Ganhei fotos personalizadas! Indico, e alugaria novamente!",
    avatar: "MC",
    timeAgo: "4 meses atrás"
  },
  {
    id: 14,
    name: "Joelma Gouveia",
    rating: 5,
    text: "Aluguei uma lancha para um evento com amigos e a experiência foi maravilhosa. Todo o processo de reserva foi simples e rápido. A equipe é super profissional e nos garantiu total segurança. Já estamos planejando o próximo passeio!",
    avatar: "JG",
    timeAgo: "5 meses atrás"
  },
  {
    id: 15,
    name: "Jo Sousa",
    rating: 5,
    text: "Meu passeio foi MARAVILHOSO. Obrigada pessoal da Bravissea! Foi tudo perfeito, desde a recepção até o final do passeio.",
    avatar: "JS",
    timeAgo: "5 meses atrás"
  },
  {
    id: 16,
    name: "Rosely Valentim",
    rating: 5,
    text: "Realizei meu sonho de andar de lancha e conhecer a cidade maravilhosa. Empresa responsável e que zela pela satisfação do cliente.",
    avatar: "RV",
    timeAgo: "5 meses atrás"
  },
  {
    id: 17,
    name: "Márcio Araújo",
    rating: 5,
    text: "Parabéns a empresa, foi um passeio maravilhoso, funcionários muito educados e prestativos, gostei muito, recomendo!",
    avatar: "MA",
    timeAgo: "6 meses atrás"
  }
];

const stats = [
  { number: "1000+", label: "Clientes Satisfeitos" },
  { number: "4.9/5", label: "Avaliação Média" },
  { number: "99%", label: "Recomendam a Bravissea" },
  { number: "5 Anos", label: "de Excelência" }
];

const Testimonials = () => {
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

        {/* Testimonials Carousel */}
        <div className="relative mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="card-luxury overflow-hidden h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Quote Icon */}
                      <div className="flex justify-between items-start mb-4">
                        <Quote className="w-8 h-8 text-primary/20 flex-shrink-0" />
                        
                        {/* Rating */}
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-foreground mb-6 leading-relaxed flex-grow">
                        "{testimonial.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 mt-auto">
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
                          <div className="text-xs text-muted-foreground">
                            {testimonial.timeAgo}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 border-primary/20 hover:bg-white hover:border-primary" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 border-primary/20 hover:bg-white hover:border-primary" />
          </Carousel>
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