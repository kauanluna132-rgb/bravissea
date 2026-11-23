import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="container mx-auto max-w-3xl px-6 pt-28 pb-16 space-y-8">
      <h1 className="text-3xl font-bold">Política de Privacidade</h1>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contatos e pedidos de reserva</h2>
        <p>Ao solicitar uma reserva, os dados preenchidos são usados para preparar uma mensagem para o WhatsApp da Bravissea. A mensagem só é enviada quando você confirma o envio no WhatsApp. O site não confirma automaticamente uma reserva ou pagamento.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Medição e publicidade</h2>
        <p>Quando a medição é permitida, compartilhamos com Meta, Google Ads e Google Analytics informações sobre cliques de contato, consultas de roteiros e aberturas de pedidos de reserva: tipo de ação, local do botão no site, identificador público da embarcação ou roteiro e identificador do evento.</p>
        <p>Essas plataformas também podem receber informações técnicas do navegador e da página e usar cookies próprios para medição de anúncios, atribuição e personalização, incluindo otimização e públicos de publicidade. Nome, email, telefone, data do passeio e texto da mensagem não são incluídos nos eventos enviados pelo site. Não ativamos correspondência avançada de clientes.</p>
        <p>O TikTok ainda não está ativado. Seu recebimento de eventos depende de configuração posterior do pixel e atualização deste aviso.</p>
        <p>A Lovable realiza medição de visitas sem cookies e sem identificar você. Os eventos de contato do site também podem ser usados para análise de uso.</p>
        <p>Saiba mais em <a className="text-primary underline" href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Privacidade da Meta</a> e <a className="text-primary underline" href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">Privacidade do Google</a>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Escolhas e retirada da permissão</h2>
        <p>Não mostramos aviso regional automático. Na União Europeia e Espaço Econômico Europeu, Reino Unido, Suíça, Canadá e onde a localização não puder ser determinada, os eventos publicitários ficam bloqueados sem permissão. Em outras regiões, a medição publicitária pode funcionar, respeitando suas escolhas e o sinal Global Privacy Control do navegador.</p>
        <p>Você pode aceitar ou rejeitar cada finalidade em “Configurações de cookies”, no rodapé. Uma recusa interrompe novos disparos, inclusive nas outras abas abertas do site. Aceitar depois não reenvia ações bloqueadas anteriormente. Suas preferências ficam guardadas no navegador; a retirada não desfaz dados que as plataformas já receberam.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Fale conosco</h2>
        <p>Para dúvidas sobre seus dados ou atendimento, entre em contato com a Bravissea pelo email aluguelbravissea@gmail.com ou pelo telefone (21) 97400-4415.</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default Privacy;