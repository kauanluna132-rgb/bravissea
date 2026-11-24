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
        <p>Ao enviar um formulário, os parâmetros de campanha e identificadores de clique presentes no link de entrada (UTMs, Meta, Google e TikTok) acompanham a solicitação no CRM para identificar sua origem. O contexto da URL permanece apenas na memória da página até o envio, sem armazenar a URL completa. A atribuição analítica pode permanecer no navegador por até 30 dias. Para solicitações sobre dados já enviados, entre em contato com a Bravissea. Compartilhamos com Meta, Google Ads e Google Analytics informações sobre cliques de contato, consultas de roteiros e aberturas de pedidos de reserva: tipo de ação, local do botão no site, identificador público da embarcação ou roteiro e identificador do evento.</p>
        <p>Essas plataformas também podem receber informações técnicas do navegador e da página e usar cookies próprios para medição de anúncios, atribuição e personalização, incluindo otimização e públicos de publicidade. Os eventos enviados diretamente a Meta e Google não incluem nome, email, telefone, data do passeio ou mensagem.</p>
        <p>Enviamos ao TikTok eventos de visualização de conteúdo, intenção de contato e formulário recebido, horário, identificador do evento, página sem parâmetros pessoais, IP público, dados do navegador e idioma, identificador de clique ttclid e cookie _ttp quando disponíveis. Para melhorar a correspondência dos anúncios, e-mail e telefone normalizado com código do país, além de um identificador externo derivado desses dados, são transformados em hash SHA-256 no servidor antes do envio. O hash permite correspondência e não torna os dados anônimos. Nome, mensagem e informações da reserva não são enviados nessa medição.</p>
        <p>A Lovable realiza medição de visitas sem cookies e sem identificar você. Os eventos de contato do site também podem ser usados para análise de uso.</p>
        <p>Saiba mais em <a className="text-primary underline" href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Privacidade da Meta</a> e <a className="text-primary underline" href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">Privacidade do Google</a>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Funcionamento da medição</h2>
        <p>A medição de navegação e publicidade inicia automaticamente ao acessar o site, sem consulta de região ou exigência de uma preferência salva no navegador. Utilizamos Meta, Google Analytics, Google Ads e a API de eventos do TikTok para atribuição e análise de campanhas. Cookies podem ser utilizados pelas ferramentas de medição. Bloqueadores, configurações do navegador e falhas de rede podem impedir a coleta.</p>
        <p>Para dúvidas ou solicitações sobre o tratamento dos seus dados, entre em contato pelos canais abaixo.</p>
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