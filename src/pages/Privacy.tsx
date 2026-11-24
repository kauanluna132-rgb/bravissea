import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="container mx-auto max-w-3xl px-6 pt-28 pb-16 space-y-8">
      <h1 className="text-3xl font-bold">Política de Privacidade</h1>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contatos e pedidos de reserva</h2>
        <p>Ao enviar o formulário de contato ou uma solicitação de passeio, seu nome, telefone, email e detalhes do pedido são registrados no CRM da Bravissea para atendimento e elaboração de proposta. Uma fila na VPS preserva solicitações enquanto o CRM estiver indisponível; após a sincronização, os dados de contato são removidos da fila e mantidos no CRM para o atendimento. No formulário de passeio, também preparamos uma mensagem para o WhatsApp, enviada apenas quando você confirma no aplicativo. O envio do formulário não confirma reserva ou pagamento.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Medição e publicidade</h2>
        <p>Ao enviar um formulário, os parâmetros de campanha e identificadores de clique presentes no link de entrada (UTMs, Meta, Google e TikTok) acompanham a solicitação no CRM para identificar sua origem. Esse envio não autoriza cookies ou pixels de publicidade. O contexto da URL permanece apenas na memória da página até o envio, sem armazenar a URL completa. A atribuição analítica autorizada separadamente pode permanecer no navegador por até 30 dias. Para solicitações sobre dados já enviados, entre em contato com a Bravissea. Quando a medição é permitida, compartilhamos com Meta, Google Ads e Google Analytics informações sobre cliques de contato, consultas de roteiros e aberturas de pedidos de reserva: tipo de ação, local do botão no site, identificador público da embarcação ou roteiro e identificador do evento.</p>
        <p>Essas plataformas também podem receber informações técnicas do navegador e da página e usar cookies próprios para medição de anúncios, atribuição e personalização, incluindo otimização e públicos de publicidade. Nome, email, telefone, data do passeio e texto da mensagem não são incluídos nos eventos enviados pelo site. Não ativamos correspondência avançada de clientes.</p>
        <p>Quando a publicidade é permitida nas configurações de cookies, enviamos ao TikTok o evento de formulário recebido, horário, identificador do evento, página sem parâmetros pessoais, IP público, dados do navegador e idioma, identificador de clique ttclid e cookie _ttp quando disponíveis. Para melhorar a correspondência dos anúncios, e-mail e telefone normalizado com código do país, além de um identificador externo derivado desses dados, são transformados em hash SHA-256 no servidor antes do envio. O hash permite correspondência e não torna os dados anônimos. Nome, mensagem e informações da reserva não são enviados nessa medição. Você pode alterar sua preferência de publicidade nas configurações de cookies.</p>
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