# Paraíba Adentro · Checklist dos requisitos

Cada item das instruções do Projeto Integrador, onde ele fica no código e quem cuida. Marquem `[x]` quando terminar.

**Tema da lista:** Agência de turismo
**Problema:** o turismo da Paraíba se concentra no litoral (João Pessoa), e o interior quase só aparece associado à seca.
**Solução:** um site que apresenta a Paraíba "de dentro pra fora": curiosidades (o carneiro do mapa, o algodão colorido, a cachaça de Areia, o Caribessa), os estados vizinhos e roteiros pelo Sertão, Borborema, Brejo e Litoral.

## Divisão

| Pessoa | Páginas | JavaScript |
|---|---|---|
| 1 | `index.html`, cabeçalho, rodapé, barra de acessibilidade, botão do WhatsApp | `temaClaroEscuro()`, `ajustarFonte()`, `altoContraste()`, `voltarAoTopo()` |
| 2 | `pages/conhece.html`, `pages/culinaria.html` | `trocarAbas()`, `virarCartas()`, `filtrarCulinaria()` |
| 3 | `pages/roteiros.html`, `pages/contato.html` | `filtrarRoteiros()`, `montarRota()`, `mascaraTelefone()`, `validarFormulario()` |
| A definir | `pages/cultura.html` (player, cordel, arte e música) | `trocarMusica()` |
| Bônus | `pages/desafio.html` | `desafio()` |

## Requisitos

### Etapa 5 – GitHub
- [ ] Repositório criado com a estrutura de pastas (já está pronta)
- [ ] Os 3 integrantes adicionados como colaboradores
- [ ] Commits individuais, pequenos, em dias diferentes

### Etapa 6 – HTML semântico
- [x] `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` (esqueleto pronto)
- [x] Página inicial + páginas internas + menu + rodapé
- [ ] Trocar todos os `TODO` por conteúdo de verdade

### Etapa 7 – CSS
- [x] Cores padronizadas em variáveis (`:root`)
- [x] Tipografia (Alfa Slab One + Nunito Sans)
- [x] Flexbox (`.filtros`, `.abas`), Grid (`.linha-do-tempo`), pseudo-classes (`:hover`, `:focus-visible`), animação (`@keyframes surgir`)
- [ ] TODOs do CSS: sublinhado do menu, animação dos pinos, animação de virar a carta, retorno do formulário

### Etapa 8 – Responsividade
- [x] Testado em 1920, 1366, 768, 425 e 375 px sem rolagem horizontal (automatizado)
- [ ] Tirar prints de cada largura para o relatório

### Etapa 9 – Formulário
- [x] Campos nome, e-mail, telefone, mensagem com validação HTML5 (`required`, `type`, `minlength`, `pattern`)
- [ ] Feedback visual (função `validarFormulario`)

### Etapa 10 – Multimídia
- [x] Mapa da Paraíba em SVG (contorno real) e bandeira em SVG
- [ ] Fotos da galeria (próprias ou Wikimedia Commons, com crédito)
- [ ] Vídeo: trocar `ID_DO_VIDEO` por um clipe do canal oficial de um artista paraibano
- [x] Mapa incorporado (Google Maps) em Contato

### Etapa 11 – JavaScript (mínimo 3)
- [x] Menu mobile (navbar do Bootstrap) · [x] Janela "Confira valores" (modal do Bootstrap)
- [x] Modo noturno · [x] Tamanho do texto (A-/A/A+) · [x] Alto contraste (salvos no localStorage)
- [x] Voltar ao topo
- [x] Abas do mapa · [x] Cartas que viram (animação 3D)
- [x] Filtro da Culinária · [x] Filtro de roteiros (lê ?regiao= da busca da inicial) · [x] Monte sua rota (salva no localStorage)
- [x] Player do Spotify (troca de artista) · [x] Máscara de telefone · [x] Validação do formulário · [x] Newsletter do rodapé
- [x] **Desafio**: escape room com 4 salas (uma por região), cronômetro, pistas progressivas e certificado
- [x] **Passaporte**: 8 carimbos (4 salas + páginas exploradas), salvo no localStorage, janela em todas as páginas

### Etapa 12 – Bootstrap
- [x] Navbar · [x] Grid · [x] Cards · [x] Formulário · [x] Botões

### Etapa 13 – Acessibilidade
- [x] Link "pular para o conteúdo", foco visível, `alt`/`aria-label`, títulos em ordem (h1 → h2 → h3)
- [ ] Conferir contraste das cores escolhidas (webaim.org/resources/contrastchecker)

### Etapa 14 – Uso de IA (anotar sempre)
| Data | Ferramenta | Prompt | Resultado | O que o grupo mudou |
|---|---|---|---|---|
| | Claude | "Monta o esqueleto em HTML, CSS e JS conforme as instruções…" | Estrutura de pastas, páginas com TODOs, CSS base, funções vazias com passo a passo, mapa SVG | |
| | Claude | "Me ajuda com os erros que eu listei" (após liberação da professora) | Todo o `script.js` (acessibilidade, filtros, rota, formulário, player, Desafio e Passaporte) | |

### Etapa 15 – Testes
| Teste | Chrome | Edge | Firefox | Celular |
|---|---|---|---|---|
| Links do menu | | | | |
| Formulário (erro e sucesso) | | | | |
| Abas / cartas / filtro / rota | | | | |
| Tema escuro / voltar ao topo | | | | |

## Fontes já conferidas (citar no relatório)
- Caribe paraibano e Caribessa: Paraíba Business, "Caribe paraibano: paraíso natural…"
- Areia, 2º polo de cachaças registradas (139 rótulos, Anuário da Cachaça 2026, Mapa): Paraíba Business
- IG de cachaça de Areia (INPI): Agência Sebrae, "Brasil alcança 150 IGs nacionais…"
- Algodão naturalmente colorido (Embrapa Algodão, Campina Grande): Revista Cultivar
- Contorno do mapa: dados de limites estaduais do projeto "click_that_hood" (Code for America, GitHub)
- O "carneiro do mapa": **sem fonte encontrada** — o grupo descreve com as próprias palavras
- Lista de pontos turísticos: Jornal da Paraíba, "Pontos turísticos da Paraíba" (jornaldaparaiba.com.br/qualaboa/pontos-turisticos-da-paraiba)

- Restaurantes: nomes **fictícios** (seção "Onde comer"), sem fotos nem endereços reais
- Drinks com cachaça paraibana (Gonzaguinha, Negroni brasileiro, cachaça tônica): Paraíba Business
- Seu Pereira e Coletivo 401 (linha 401, "baião nervoso", Lollapalooza 2027): Paraíba Business
- Sabadinho Bom (sábados, 12h30, Praça Rio Branco, Funjope): Paraíba Business — TODO confirmar gratuidade e título de patrimônio imaterial
- Artistas: Enciclopédia Itaú Cultural (Pedro Américo, João Câmara), Prêmio PIPA (José Rufino), Polêmica Paraíba e Jornal da Paraíba (músicos). Sem fotos de pessoas: usamos monogramas. TODO: conferir datas e cidades de cada um
- Cordel: Revista Pesquisa FAPESP (Iphan 2018, Leandro Gomes de Barros), Paraíba Business (lei estadual de 2025), Portal Vermelho (José Camelo de Melo Resende, Guarabira, Pavão Misterioso 1923)
- Player: embed oficial do Spotify. TODO: códigos dos outros artistas. Não colocar arquivos de música no site (direito autoral)
- Desafio: Vale dos Dinossauros (Sousa), Pedra do Ingá (Itacoatiara, tombada pelo Iphan), Teatro Minerva (Areia, 1859 — TODO confirmar o ano), João Pessoa fundada em 5/8/1585 como Nossa Senhora das Neves, às margens do Sanhauá
- Valores dos pacotes: **fictícios**, avisados no site

## Cupom do passaporte
Quem completa os 8 carimbos ganha o cupom **ROTAPB10** (10%). O formulário de contato preenche e valida o cupom sozinho.

## Créditos das fotos (página `pages/creditos.html`)
A página lista cada foto com o campo de autor. As fotos vieram do Google Imagens, então o autor precisa ser localizado: abra a imagem em images.google.com (ícone da câmera) ou no Google Lens e copie o nome do fotógrafo/site. Pistas já encontradas: Farol do Cabo Branco (possivelmente Shutterstock) e Lajedo de Pai Mateus (possivelmente Krys Carneiro/Jornal da Paraíba), ambas da matéria do Jornal da Paraíba. **Confirmar antes de publicar.**

## Fotos em `images/fotos/` (TODO: descobrir e citar o autor de cada uma)
areia-vermelha · orla-joao-pessoa · centro-historico-jp · farol-cabo-branco · pedra-do-inga · picaozinho · portal-areia · engenho-brejo · casario-areia · mandacaru · lajedo-cariri · dinossauros-sousa · dinossauros-por-do-sol · falesias-litoral-sul · feirinha-tambau · igreja-praca · cordel-varal
Fotos tiradas da internet precisam de crédito na legenda. Se não acharem o autor, troquem por fotos próprias ou do Wikimedia Commons.
