# Bravissea — eventos de contato

## Eventos e significados
| Momento existente | Evento do site / Lovable | Meta | GA4 | Google Ads |
| --- | --- | --- | --- | --- |
| WhatsApp no início, rodapé, botão flutuante, Como funciona, especialista ou card de embarcação | bravissea.contact_clicked / project.contact_clicked | Contact | contact_clicked | AW-17381921158/6v53CKuBm5UbEIajrOBA |
| Incluir no Passeio em um roteiro, após abrir WhatsApp | bravissea.route_inquiry_clicked / project.route_inquiry_clicked | Contact | route_inquiry_clicked | AW-17381921158/6v53CKuBm5UbEIajrOBA |
| Enviar Reserva via WhatsApp, após abrir WhatsApp | bravissea.booking_request_opened / project.booking_request_opened | Contact | booking_request_opened | AW-17381921158/Q8CjCKm3yZ0bEIajrOBA |

São sinais de intenção, não leads confirmados, mensagens enviadas, reservas concluídas ou vendas. Não usar Purchase, Schedule ou receita estimada para esses cliques. Sem confirmação no WhatsApp/CRM, não existe evento de lead efetivamente recebido.

## Destinos e duplicidade
- Pixel Meta instalado: 618975987909341.
- GA4: G-BFQWK1GY74. Google Ads: AW-17381921158.
- IDs e labels recuperados do container público GTM-W9MGL923 versão 5 em 2026-11-23.
- Os antigos acionadores automáticos por link, texto “Incluir no Passeio” e classe do botão de reserva foram substituídos por chamadas diretas únicas. O container não carrega junto com essas chamadas. O container remoto continua intacto.
- Um evento por ação e um identificador único por ocorrência; Google Ads recebe transaction_id. Meta recebe eventID. Nenhum envio por servidor foi solicitado ou instalado.
- Contas Meta/Google não conectadas nesta conversa: definições, restrições do dataset, titularidade das conversões, status primário/secundário e elegibilidade para otimização permanecem não verificados. Nenhuma definição de conversão ou campanha foi criada ou alterada.
- TikTok desativado; o usuário informou que colocará o pixel depois. Existe preparação para Contact, mas nenhum envio TikTok está instalado sem ID.

## Privacidade
- Escolha expressa: sem aviso regional automático.
- publicidade bloqueada sem permissão na UE/EEE, Reino Unido, Suíça, Canadá e regiões desconhecidas, incluindo falha de consulta regional.
- Recusa e Global Privacy Control bloqueiam publicidade em qualquer região. Escolhas independentes para análise e publicidade. Rejeição e retirada disponíveis permanentemente no rodapé; mudanças entre abas tratadas pelo módulo de consentimento.
- Nenhum evento publicitário bloqueado é armazenado para posterior reenvio.
- Política de Privacidade vinculada no rodapé descreve dados, plataformas, finalidade e retirada.
- Sem correspondência avançada, hashing, emails, telefones, nome, data, passageiros, mensagem, texto de WhatsApp ou URLs completos nos parâmetros de eventos.

## Verificações em 2026-11-23
- 10 testes automatizados aprovados para destino, ausência de dados pessoais, TikTok desativado, regiões desconhecidas, separação de finalidades, retirada e GPC.
- Catálogo Lovable validado: 3 eventos registrados.
- Navegador com transportes simulados: seis locais de contato, consulta de roteiro e pedido de reserva com informações preenchidas; abre destino WhatsApp e emite uma chamada por plataforma, sem duplicar.
- Pedido de reserva testado com seletores reais e dados de teste; nenhum atendimento ou mensagem real enviado.
- Canadá, EEA, localização desconhecida e GPC bloqueiam tags e eventos publicitários enquanto o WhatsApp continua funcional.
- Recusa após inicialização impede novos eventos e após recarregar não reinicializa pixel.
- Tela de preferências e política verificadas em 390×844 sem rolagem horizontal.
- Teste adicional com scripts reais, região BR simulada: requests Meta PageView/Contact para pixel correto, Google Ads conversion com label de contato e GA4 contact_clicked observados. Sem erros JavaScript; alguns requests Google/GA4/DoubleClick encerrados como ERR_ABORTED no ambiente de teste.
- Requests observados não comprovam recebimento, contagem, atribuição, elegibilidade ou aprendizado das plataformas. Não houve acesso a Test Events nem read-back nas contas.
- Alterações ainda não publicadas ao encerrar a implementação; verificar domínio público após publicar. O setup é instalado e testado, não conversões comprovadamente contadas.

## Próximos passos externos
1. Publicar as mudanças e verificar no domínio bravissea.com.br.
2. Confirmar Meta Test Events e configurações/restrições do dataset.
3. Confirmar labels e categorias das conversões na conta Google Ads e eventos no GA4.
4. Informar ID TikTok; ativar, atualizar política e testar recebimento.
5. Futuro lead confirmado exigiria confirmação no atendimento/CRM; fora deste escopo.