# RotaPB — Você conhece a Paraíba?

Site responsivo de uma agência de turismo fictícia que apresenta a Paraíba **de dentro pra fora**, do Sertão ao Litoral. Projeto Integrador da disciplina de **Desenvolvimento Front-End para Web** (Curso de Análise e Desenvolvimento de Sistemas · UNIPÊ).

## Estrutura do projeto

```
RotaPB/
├── index.html                  Página inicial (hero, busca por região, destaques, galeria e tabela de valores)
├── pages/
│   ├── conhece.html            "Você conhece?" — mapa interativo da Paraíba, vizinhos e cartas que viram
│   ├── culinaria.html          Comidas e frutas típicas com filtro, drinks paraibanos e sugestões de onde comer
│   ├── cultura.html            Rádio paraibana (player Spotify), cordel, artes plásticas, músicos e vídeo YouTube
│   ├── roteiros.html           Filtro por região, "Monte sua rota" (integrado ao Contato) e calendário de festas
│   ├── desafio.html            Escape room interativo (4 salas regionais), cronômetro e certificado imprimível
│   ├── contato.html            Formulário "Monte sua viagem" com importação da rota, cupom, WhatsApp e mapa
│   └── creditos.html           Créditos das fotos, fontes verificadas e tecnologias utilizadas
├── css/
│   └── style.css               Identidade visual, variáveis CSS, animações, modo noturno, alto contraste e responsividade
├── js/
│   └── script.js               Interatividade em JavaScript puro (sem bibliotecas além do Bootstrap)
├── images/                     Logos em SVG, ilustração do carneirinho e fotos otimizadas em WebP
├── assets/                     Bootstrap 5.3 e Bootstrap Icons (cópia local)
└── docs/                       Documentação das etapas e checklist de requisitos
```

## Como executar localmente

1. Clone ou baixe o repositório.
2. Abra a pasta `RotaPB` no VS Code e utilize a extensão **Live Server** no arquivo `index.html` (ou abra com qualquer servidor HTTP estático, como `python -m http.server`).

## Funcionalidades em JavaScript

- **Acessibilidade**: modo noturno, ajuste do tamanho da fonte (`A-` / `A` / `A+`), alto contraste (preferências salvas no `localStorage`) e navegação por teclado.
- **Você conhece?**: abas interativas do mapa (Paraíba e estados vizinhos), pinos clicáveis no mapa SVG levando ao roteiro da região e cartas 3D que viram ao clicar.
- **Culinária e Roteiros**: filtros dinâmicos por categoria/região (incluindo leitura de parâmetros da busca da página inicial).
- **Monte sua rota → Contato**: seleção de cidades ordenada automaticamente de oeste para leste (salva no `localStorage`), com remoção individual, limpeza e **preenchimento automático das regiões e da lista de cidades na mensagem do formulário de contato**.
- **Rádio paraibana**: troca dinâmica entre 5 artistas paraibanos no player oficial incorporado do Spotify.
- **Formulário "Monte sua viagem"**: máscara de telefone, validação HTML5 + regras customizadas, contador de caracteres, validação automática do cupom `ROTAPB10`, feedback estilizado e atalho para envio do resumo via WhatsApp.
- **Desafio e Passaporte**: escape room com 4 salas históricas, pistas progressivas, cronômetro, certificado imprimível e passaporte de 8 carimbos salvo no navegador que desbloqueia 10% de desconto (`ROTAPB10`).
- **Utilidades**: newsletter no rodapé e botão flutuante "Voltar ao topo".

## Tecnologias utilizadas

HTML5 semântico · CSS3 (Variáveis, Flexbox, Grid e animações) · JavaScript (ES6+) · Bootstrap 5.3 · Bootstrap Icons · Google Fonts · Git/GitHub

## Integrantes

- Adalberto Velloso Borges Melo de Albuquerque
- Amanda Beatriz Andrade Baía
- Poliana Ferreira Vieira de Melo

**Professora:** Karine Heloise Felix De Sousa · UNIPÊ (2026)
