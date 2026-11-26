# RotaPB · Checklist dos requisitos

Acompanhamento de cada etapa do Projeto Integrador de Desenvolvimento Front-End para Web (UNIPÊ).

**Tema escolhido:** Agência de turismo  
**Problema:** O turismo da Paraíba se concentra no litoral (João Pessoa), e o interior quase só aparece associado à seca.  
**Solução:** Um site que apresenta a Paraíba "de dentro pra fora": curiosidades (o carneiro do mapa, o algodão colorido, a cachaça de Areia, o Caribessa), estados vizinhos, culinária, cultura, roteiros filtráveis integrados ao formulário de contato e gamificação (Desafio + Passaporte).

## Requisitos por etapa

### Etapa 5 – GitHub
- [x] Repositório criado com a estrutura de pastas (`RotaPB`)
- [x] Integrantes adicionados como colaboradores (`https://github.com/PolianaM06/RotaPB`)
- [x] Commits organizados ao longo do desenvolvimento

### Etapa 6 – HTML semântico
- [x] `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- [x] Página inicial + 7 páginas internas + menu + rodapé
- [x] Todos os `TODO` substituídos por conteúdo final revisado

### Etapa 7 – CSS
- [x] Cores padronizadas em variáveis (`:root`) com contraste validado (WCAG AA)
- [x] Tipografia (Plus Jakarta Sans + DM Serif Display)
- [x] Flexbox (`.filtros`, `.abas`, `.busca`), Grid (`.player`, `.grade-carimbos`, `.lista-restaurantes`), pseudo-classes (`:hover`, `:focus-visible`), animações (`@keyframes surgir`, `pulsarPino`, `carimbar`, `tremer`)
- [x] Sublinhado do menu ativo, animação dos pinos do mapa, cartas 3D e retorno estilizado do formulário implementados

### Etapa 8 – Responsividade
- [x] Testado em 1920, 1366, 768, 425 e 375 px sem rolagem horizontal em todas as 8 páginas
- [x] Capturas de tela registradas para o relatório final

### Etapa 9 – Formulário
- [x] Campos nome, e-mail, telefone, regiões, cupom e mensagem com validação HTML5 (`required`, `type`, `minlength`, `pattern`)
- [x] Feedback visual estilizado (`validarFormulario`), preenchimento automático a partir de Roteiros e atalho para envio via WhatsApp

### Etapa 10 – Multimídia
- [x] Mapa da Paraíba e dos estados vizinhos em SVG (contorno real) e bandeira em SVG
- [x] Galeria de fotos otimizadas em WebP com créditos na legenda e em `pages/creditos.html`
- [x] Vídeo oficial incorporado do YouTube (`pages/cultura.html`)
- [x] Player oficial incorporado do Spotify com 5 artistas paraibanos verificados (`pages/cultura.html`)
- [x] Mapa incorporado do Google Maps (`pages/contato.html`)

### Etapa 11 – JavaScript (mínimo 3)
- [x] Menu mobile (navbar Bootstrap) e modal "Confira valores"
- [x] Modo noturno, tamanho do texto (`A-`/`A`/`A+`) e alto contraste (salvos no `localStorage`)
- [x] Voltar ao topo
- [x] Abas do mapa, pinos interativos no mapa SVG e cartas 3D que viram
- [x] Filtro da Culinária e filtro de Roteiros (integrado à busca da página inicial)
- [x] Monte sua rota (salva no `localStorage`, remoção individual, limpeza e preenchimento automático no Contato)
- [x] Player do Spotify com troca entre 5 artistas
- [x] Máscara de telefone, validação do formulário, validação de cupom e newsletter do rodapé
- [x] **Desafio**: escape room com 4 salas regionais, cronômetro, pistas progressivas e certificado imprimível
- [x] **Passaporte**: 8 carimbos (4 salas do Desafio + 4 páginas exploradas: Conheça, Culinária, Cultura e Roteiros), salvo no `localStorage`

### Etapa 12 – Bootstrap
- [x] Navbar · [x] Grid · [x] Cards · [x] Formulários · [x] Botões · [x] Modal

### Etapa 13 – Acessibilidade
- [x] Link "pular para o conteúdo", foco visível, `alt`/`aria-label`, títulos em ordem estrita (`h1 → h2 → h3`), navegação por teclado
- [x] Contraste das cores validado para WCAG AA (>= 4.5:1) no modo claro, modo noturno e alto contraste

### Etapa 14 – Uso de IA
| Data | Ferramenta | Prompt / Solicitação | Resultado | O que o grupo revisou/mudou |
|---|---|---|---|---|
| 2026 | Claude | Estruturação inicial em HTML, CSS e JS, desafio interativo e player do Spotify | Esqueleto das páginas, estilo base, funções JS, escape room com pistas progressivas e embed do Spotify | Adaptação do quiz de múltipla escolha para escape room com pistas e cronômetro; revisão de conteúdo, fontes e imagens |
| 2026 | Gemini | Revisão técnica final, integração automática Roteiros → Contato, verificação de acessibilidade/contraste, otimização de imagens e testes | Fluxo automático Roteiros → Contato, correção do 8º carimbo do Passaporte, IDs oficiais do Spotify, otimização WebP e auditoria responsiva | Validação manual dos fluxos, aprovação visual e atualização do relatório e apresentação |

### Etapa 15 – Testes
| Teste | Edge (Desktop) | Chrome/Chromium | Mobile (375/425px) | Tablet (768px) |
|---|---|---|---|---|
| Links do menu e cards | OK | OK | OK | OK |
| Formulário (erro, sucesso e rota automática) | OK | OK | OK | OK |
| Abas / mapa / cartas / filtros / rota | OK | OK | OK | OK |
| Player Spotify / vídeo YouTube / Mapa | OK | OK | OK | OK |
| Desafio / Passaporte 8/8 / Cupom ROTAPB10 | OK | OK | OK | OK |
| Modo noturno / Alto contraste / Voltar ao topo | OK | OK | OK | OK |

## Cupom do passaporte
Quem completa os **8 carimbos** (4 salas do Desafio + páginas Você conhece?, Culinária, Cultura e Roteiros) desbloqueia o cupom **ROTAPB10** (10% de desconto), preenchido e validado automaticamente no formulário de contato.
