/* ==========================================================================
   ROTAPB · script.js
   ETAPA 11: funcionalidades interativas em JavaScript puro (sem bibliotecas).

   Cada função começa verificando se o elemento existe na página, porque o
   mesmo script.js é usado em todas as páginas. Tudo é ligado no final, no
   evento DOMContentLoaded.

   Índice
    1. Utilidades (storage seguro, normalizar texto)
    2. Acessibilidade: modo noturno, tamanho do texto, alto contraste
    3. Voltar ao topo
    4. Abas do mapa e cartas que viram (Você conhece?)
    5. Filtros (Culinária e Roteiros) e Monte sua rota
    6. Player de música (Cultura)
    7. Formulários: máscara de telefone, validação, newsletter
    8. Passaporte (carimbos salvos no navegador)
    9. Desafio: escape room por regiões
   ========================================================================== */

/* ======================= 1. UTILIDADES ======================= */

/* localStorage pode falhar (modo anônimo, bloqueio de cookies). Por isso
   toda leitura e escrita passa por aqui, dentro de try/catch. */
const armazem = {
  ler(chave, padrao) {
    try {
      const valor = localStorage.getItem(chave);
      return valor === null ? padrao : JSON.parse(valor);
    } catch (erro) {
      return padrao;
    }
  },
  gravar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      /* sem armazenamento: o site continua funcionando, só não lembra */
    }
  }
};

/* "Pedra do Ingá" -> "PEDRA DO INGA". Serve para comparar respostas. */
function normalizar(texto) {
  return texto
    .normalize("NFD")                 // separa acentos das letras
    .replace(/[̀-ͯ]/g, "")  // remove os acentos
    .replace(/[^a-zA-Z0-9 ]/g, " ")   // tira pontuação
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function anoNoRodape() {
  document.querySelectorAll(".js-ano").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}

/* ======================= 2. ACESSIBILIDADE ======================= */

/* Modo noturno: coloca/tira data-tema="escuro" no <html>.
   O CSS troca as variáveis de cor. A escolha fica salva. */
function temaClaroEscuro() {
  const botao = document.getElementById("botaoTema");
  if (!botao) return;
  const html = document.documentElement;

  function aplicar(escuro) {
    if (escuro) html.setAttribute("data-tema", "escuro");
    else html.removeAttribute("data-tema");
    botao.setAttribute("aria-pressed", String(escuro));
    botao.innerHTML = escuro
      ? '<i class="bi bi-sun" aria-hidden="true"></i><span class="rotulo"> Modo claro</span>'
      : '<i class="bi bi-moon-stars" aria-hidden="true"></i><span class="rotulo"> Modo noturno</span>';
    botao.setAttribute("aria-label", escuro ? "Modo claro" : "Modo noturno");
  }

  aplicar(armazem.ler("rotapb-tema", false));
  botao.addEventListener("click", function () {
    const escuro = !html.hasAttribute("data-tema");
    aplicar(escuro);
    armazem.gravar("rotapb-tema", escuro);
  });
}

/* Tamanho do texto: A- / A / A+ mudam a variável --escala (80% a 140%). */
function ajustarFonte() {
  const maior = document.getElementById("fonteMaior");
  const menor = document.getElementById("fonteMenor");
  const normal = document.getElementById("fonteNormal");
  if (!maior || !menor || !normal) return;

  let tamanho = armazem.ler("rotapb-fonte", 100);

  function aplicar() {
    document.documentElement.style.setProperty("--escala", tamanho + "%");
    armazem.gravar("rotapb-fonte", tamanho);
    normal.setAttribute("aria-pressed", String(tamanho === 100));
  }

  maior.addEventListener("click", function () { tamanho = Math.min(140, tamanho + 10); aplicar(); });
  menor.addEventListener("click", function () { tamanho = Math.max(80, tamanho - 10); aplicar(); });
  normal.addEventListener("click", function () { tamanho = 100; aplicar(); });
  aplicar();
}

/* Alto contraste: data-contraste="alto" no <html>. */
function altoContraste() {
  const botao = document.getElementById("altoContraste");
  if (!botao) return;
  const html = document.documentElement;

  function aplicar(ligado) {
    if (ligado) html.setAttribute("data-contraste", "alto");
    else html.removeAttribute("data-contraste");
    botao.setAttribute("aria-pressed", String(ligado));
  }

  aplicar(armazem.ler("rotapb-contraste", false));
  botao.addEventListener("click", function () {
    const ligado = !html.hasAttribute("data-contraste");
    aplicar(ligado);
    armazem.gravar("rotapb-contraste", ligado);
  });
}

/* ======================= 3. VOLTAR AO TOPO ======================= */
function voltarAoTopo() {
  const botao = document.getElementById("voltarTopo");
  if (!botao) return;
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("scroll", function () {
    botao.classList.toggle("visivel", window.scrollY > 400);
  }, { passive: true });

  botao.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduzMovimento ? "auto" : "smooth" });
  });
}

/* ======================= 4. ABAS E CARTAS ======================= */

/* Abas do mapa: cada botão .aba aponta (aria-controls) para um .painel. */
function trocarAbas() {
  const abas = document.querySelectorAll(".aba");
  if (abas.length === 0) return;
  const paineis = document.querySelectorAll(".painel");

  abas.forEach(function (aba) {
    aba.addEventListener("click", function () {
      abas.forEach(function (a) {
        a.classList.remove("ativa");
        a.setAttribute("aria-selected", "false");
      });
      aba.classList.add("ativa");
      aba.setAttribute("aria-selected", "true");

      paineis.forEach(function (p) { p.hidden = true; });
      const alvo = document.getElementById(aba.getAttribute("aria-controls"));
      if (alvo) alvo.hidden = false;
    });
  });
}

/* Cartas que viram ao clicar (a animação está no CSS). */
function virarCartas() {
  const cartas = document.querySelectorAll(".carta");
  if (cartas.length === 0) return;

  cartas.forEach(function (carta) {
    carta.addEventListener("click", function () {
      const virada = carta.classList.toggle("virada");
      carta.setAttribute("aria-pressed", String(virada));
    });
  });
}

/* ======================= 5. FILTROS E ROTA ======================= */

/* Função genérica: botões com data-filtro mostram/escondem itens com data-<atributo>.
   Usada na Culinária (data-categoria) e nos Roteiros (data-regiao). */
function ligarFiltro(seletorBotoes, seletorItens, atributo, filtroInicial) {
  const botoes = document.querySelectorAll(seletorBotoes);
  const itens = document.querySelectorAll(seletorItens);
  if (botoes.length === 0) return;

  function aplicar(filtro) {
    itens.forEach(function (item) {
      item.hidden = !(filtro === "todas" || item.dataset[atributo] === filtro);
    });
    botoes.forEach(function (b) {
      const ativo = b.dataset.filtro === filtro;
      b.classList.toggle("ativo", ativo);
      b.setAttribute("aria-pressed", String(ativo));
    });
  }

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () { aplicar(botao.dataset.filtro); });
  });

  if (filtroInicial) aplicar(filtroInicial);
}

function filtrarCulinaria() {
  ligarFiltro(".filtro-culinaria", ".item-culinaria", "categoria");
}

/* A busca da página inicial manda ?regiao=sertao na URL: já abrimos filtrado. */
function filtrarRoteiros() {
  const parametro = new URLSearchParams(location.search).get("regiao");
  const valido = ["sertao", "borborema", "brejo", "litoral"].includes(parametro);
  ligarFiltro(".filtro:not(.filtro-culinaria)", ".item-roteiro", "regiao", valido ? parametro : null);
}

/* Monte sua rota: lista as cidades marcadas, na ordem oeste → leste. */
function montarRota() {
  const caixas = document.querySelectorAll(".incluir-rota");
  const lista = document.getElementById("listaRota");
  const resumo = document.getElementById("resumoRota");
  if (caixas.length === 0 || !lista || !resumo) return;

  function atualizar() {
    const marcadas = Array.from(caixas)
      .filter(function (c) { return c.checked; })
      .sort(function (a, b) { return Number(a.dataset.ordem) - Number(b.dataset.ordem); });

    lista.innerHTML = "";
    if (marcadas.length === 0) {
      lista.innerHTML = '<li class="vazio">Marque as cidades que quer visitar.</li>';
      resumo.textContent = "0 cidades";
      return;
    }
    marcadas.forEach(function (caixa, i) {
      const li = document.createElement("li");
      li.textContent = "Dia " + (i + 1) + " · " + caixa.value;
      lista.appendChild(li);
    });
    const n = marcadas.length;
    resumo.textContent = n + (n === 1 ? " cidade · 1 dia" : " cidades · " + n + " dias");
    armazem.gravar("rotapb-rota", marcadas.map(function (c) { return c.value; }));
  }

  // recupera a rota salva da última visita
  const salva = armazem.ler("rotapb-rota", []);
  caixas.forEach(function (c) { if (salva.includes(c.value)) c.checked = true; });

  caixas.forEach(function (c) { c.addEventListener("change", atualizar); });
  atualizar();
}

/* ======================= 6. PLAYER ======================= */
function trocarMusica() {
  const faixas = document.querySelectorAll(".faixa");
  const player = document.getElementById("playerSpotify");
  if (faixas.length === 0 || !player) return;

  faixas.forEach(function (faixa) {
    faixa.addEventListener("click", function () {
      const codigo = faixa.dataset.spotify;
      if (!codigo || codigo === "TODO") {
        faixa.insertAdjacentHTML("beforeend", ' <small>(em breve)</small>');
        return;
      }
      player.src = "https://open.spotify.com/embed/" + codigo;
      player.title = "Player de música: " + faixa.textContent.trim() + " no Spotify";
      faixas.forEach(function (f) {
        f.classList.remove("ativa");
        f.setAttribute("aria-pressed", "false");
      });
      faixa.classList.add("ativa");
      faixa.setAttribute("aria-pressed", "true");
    });
  });
}

/* ======================= 7. FORMULÁRIOS ======================= */

/* (83) 99999-9999 enquanto a pessoa digita. */
function mascaraTelefone() {
  const campo = document.getElementById("telefone");
  if (!campo) return;

  campo.addEventListener("input", function () {
    const d = campo.value.replace(/\D/g, "").slice(0, 11);
    if (d.length > 6) campo.value = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
    else if (d.length > 2) campo.value = "(" + d.slice(0, 2) + ") " + d.slice(2);
    else if (d.length > 0) campo.value = "(" + d;
    else campo.value = "";
  });
}

/* Validação HTML5 + regras extras, com feedback visual do Bootstrap. */
function validarFormulario() {
  const form = document.getElementById("formViagem");
  const retorno = document.getElementById("retornoForm");
  if (!form || !retorno) return;

  const mensagem = document.getElementById("mensagem");
  const contador = document.getElementById("contadorMensagem");
  if (mensagem && contador) {
    const atualizar = function () { contador.textContent = mensagem.value.length + "/" + mensagem.maxLength; };
    mensagem.addEventListener("input", atualizar);
    atualizar();
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // regra extra: pelo menos uma região marcada
    const regioes = form.querySelectorAll('fieldset input[type="checkbox"]');
    const algumaRegiao = Array.from(regioes).some(function (c) { return c.checked; });
    const avisoRegiao = document.getElementById("avisoRegiao");
    if (avisoRegiao) avisoRegiao.hidden = algumaRegiao;

    if (!form.checkValidity() || !algumaRegiao) {
      form.classList.add("was-validated");
      retorno.className = "alert alert-danger mt-3";
      retorno.textContent = "Confira os campos destacados antes de enviar.";
      const primeiroErro = form.querySelector(":invalid");
      if (primeiroErro) primeiroErro.focus();
      return;
    }

    const nome = form.nome.value.trim().split(" ")[0];
    retorno.className = "alert alert-success mt-3";
    retorno.textContent = "Obrigado, " + nome + "! Recebemos seu pedido e respondemos em até 2 dias úteis.";
    form.reset();
    form.classList.remove("was-validated");
    if (contador) contador.textContent = "0/" + mensagem.maxLength;
    carimbar("contato");
  });
}

/* Caixa "Novidades por e-mail" do rodapé. */
function assinarNovidades() {
  document.querySelectorAll(".assinatura").forEach(function (form) {
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();
      const campo = form.querySelector('input[type="email"]');
      const ok = campo.checkValidity() && campo.value.trim() !== "";
      campo.classList.toggle("is-invalid", !ok);
      let aviso = form.querySelector(".aviso-assinatura");
      if (!aviso) {
        aviso = document.createElement("p");
        aviso.className = "aviso-assinatura small mt-2 mb-0";
        aviso.setAttribute("role", "status");
        form.appendChild(aviso);
      }
      aviso.textContent = ok ? "Pronto! Você vai receber as novidades da RotaPB." : "Digite um e-mail válido.";
      if (ok) form.reset();
    });
  });
}

/* ======================= 8. PASSAPORTE ======================= */

/* Os carimbos. Metade vem do Desafio (uma sala por região), metade de
   páginas exploradas. Tudo fica salvo em localStorage ("rotapb-passaporte"). */
const CARIMBOS = [
  { id: "sertao",    nome: "Sertão",         detalhe: "Vale dos Dinossauros", icone: "bi-sun",          tipo: "sala" },
  { id: "borborema", nome: "Cariri",         detalhe: "Pedra do Ingá",        icone: "bi-gem",          tipo: "sala" },
  { id: "brejo",     nome: "Brejo",          detalhe: "Teatro Minerva",       icone: "bi-tree",         tipo: "sala" },
  { id: "litoral",   nome: "Litoral",        detalhe: "Centro Histórico",     icone: "bi-water",        tipo: "sala" },
  { id: "conhece",   nome: "Curioso",        detalhe: "Você conhece?",        icone: "bi-lightbulb",    tipo: "pagina" },
  { id: "culinaria", nome: "Comilão",        detalhe: "Culinária",            icone: "bi-cup-hot",      tipo: "pagina" },
  { id: "cultura",   nome: "Forrozeiro",     detalhe: "Cultura",              icone: "bi-music-note-beamed", tipo: "pagina" },
  { id: "contato",   nome: "Viajante",       detalhe: "Pediu uma viagem",     icone: "bi-send",         tipo: "pagina" }
];

function lerPassaporte() {
  return armazem.ler("rotapb-passaporte", { carimbos: {}, nome: "" });
}

/* Dá um carimbo e atualiza o que estiver na tela. Retorna true se era novo. */
function carimbar(id) {
  const passaporte = lerPassaporte();
  if (passaporte.carimbos[id]) return false;
  passaporte.carimbos[id] = new Date().toISOString().slice(0, 10);
  armazem.gravar("rotapb-passaporte", passaporte);
  desenharPassaporte();
  return true;
}

function desenharPassaporte() {
  const passaporte = lerPassaporte();
  const total = CARIMBOS.length;
  const feitos = CARIMBOS.filter(function (c) { return passaporte.carimbos[c.id]; }).length;

  document.querySelectorAll(".js-passaporte-contagem").forEach(function (el) {
    el.textContent = feitos + "/" + total;
  });

  const grade = document.getElementById("gradeCarimbos");
  if (grade) {
    grade.innerHTML = CARIMBOS.map(function (c) {
      const data = passaporte.carimbos[c.id];
      return (
        '<li class="carimbo regiao-' + c.id + (data ? " carimbado" : "") + '">' +
          '<span class="carimbo-selo"><i class="bi ' + c.icone + '" aria-hidden="true"></i></span>' +
          '<strong>' + c.nome + '</strong>' +
          '<span class="carimbo-detalhe">' + c.detalhe + '</span>' +
          '<span class="visually-hidden">' + (data ? "carimbado em " + data : "ainda não carimbado") + '</span>' +
        '</li>'
      );
    }).join("");
  }

  const barra = document.getElementById("barraPassaporte");
  if (barra) {
    barra.style.width = Math.round((feitos / total) * 100) + "%";
    barra.parentElement.setAttribute("aria-valuenow", feitos);
  }

  const completo = document.getElementById("passaporteCompleto");
  if (completo) completo.hidden = feitos < total;
}

const CUPOM = "ROTAPB10"; // 10% para quem completa o passaporte

function passaporteCompleto() {
  const p = lerPassaporte();
  return CARIMBOS.every(function (c) { return p.carimbos[c.id]; });
}

/* Campo "Cupom" do formulário: confere o código e avisa o desconto. */
function validarCupom() {
  const campo = document.getElementById("cupom");
  const aviso = document.getElementById("avisoCupom");
  if (!campo || !aviso) return;

  function conferir() {
    const codigo = campo.value.trim().toUpperCase();
    if (!codigo) { aviso.textContent = ""; campo.classList.remove("is-valid", "is-invalid"); return; }
    const ok = codigo === CUPOM && passaporteCompleto();
    campo.classList.toggle("is-valid", ok);
    campo.classList.toggle("is-invalid", !ok);
    aviso.textContent = ok
      ? "Cupom válido: 10% de desconto no seu roteiro."
      : (codigo === CUPOM ? "Esse cupom só vale com o passaporte completo (8/8)." : "Cupom não encontrado.");
  }
  if (passaporteCompleto() && !campo.value) { campo.value = CUPOM; }
  campo.addEventListener("input", conferir);
  conferir();
}

/* Carimbo automático por página visitada + botão de zerar. */
function iniciarPassaporte() {
  const pagina = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
  if (["conhece", "culinaria", "cultura"].includes(pagina)) carimbar(pagina);

  const zerar = document.getElementById("zerarPassaporte");
  if (zerar) {
    zerar.addEventListener("click", function () {
      armazem.gravar("rotapb-passaporte", { carimbos: {}, nome: "" });
      desenharPassaporte();
    });
  }
  desenharPassaporte();
}

/* ======================= 9. DESAFIO (ESCAPE ROOM) ======================= */

/* Uma sala por região, cada uma num ponto histórico. As respostas aceitam
   variações (sem acento, maiúsculas/minúsculas, grafias comuns). */
const SALAS = [
  {
    id: "sertao", regiao: "Sertão", titulo: "A sala das pegadas",
    foto: "../images/fotos/dinossauros-por-do-sol.webp", alt: "Portal com dois dinossauros de pescoço comprido em Sousa",
    pistas: [
      "Há mais de 100 milhões de anos, gigantes caminharam na lama deste lugar. A lama virou pedra e os passos ficaram gravados.",
      "Na entrada da cidade, dois desses gigantes de pescoço comprido se beijam num portal.",
      "Fica no Sertão, perto de Cajazeiras, e o nome da cidade também é um sobrenome português."
    ],
    pergunta: "Em que cidade ficam as pegadas de dinossauro?",
    respostas: ["SOUSA", "SOUZA", "VALE DOS DINOSSAUROS"],
    descoberta: "Vale dos Dinossauros, em Sousa",
    texto: "O Monumento Natural Vale dos Dinossauros guarda pegadas fossilizadas de dinossauros no leito de rios, a céu aberto. É um dos sítios paleontológicos mais importantes do país."
  },
  {
    id: "borborema", regiao: "Cariri e Borborema", titulo: "A sala dos símbolos",
    foto: "../images/fotos/pedra-do-inga.webp", alt: "Inscrições rupestres gravadas na Pedra do Ingá",
    pistas: [
      "Numa pedra de mais de 20 metros, alguém gravou símbolos que ninguém decifrou até hoje.",
      "Os estudiosos chamam esses desenhos de itacoatiaras. O povo chama de \"escritas\".",
      "A pedra tem o nome do município onde fica, que também é o nome de uma árvore de vagens doces."
    ],
    pergunta: "Qual é o nome da pedra (e da cidade)?",
    respostas: ["INGA", "PEDRA DO INGA"],
    descoberta: "Pedra do Ingá",
    texto: "A Itacoatiara do Ingá é um dos maiores conjuntos de inscrições rupestres do Brasil, tombado pelo Iphan. O significado dos símbolos segue um mistério."
  },
  {
    id: "brejo", regiao: "Brejo", titulo: "A sala do teatro",
    foto: "../images/fotos/casario-areia.webp", alt: "Casario colorido no centro histórico de Areia",
    pistas: [
      "Na serra, a cidade das flores e dos engenhos guarda o teatro mais antigo da Paraíba, inaugurado em 1859.",
      "O teatro tem o nome da deusa romana da sabedoria e das artes.",
      "Na mesma cidade nasceu o pintor de \"Independência ou Morte\"."
    ],
    pergunta: "Qual é o nome do teatro?",
    respostas: ["MINERVA", "TEATRO MINERVA"],
    descoberta: "Teatro Minerva, em Areia",
    texto: "Areia tem o centro histórico tombado pelo Iphan, a casa onde nasceu Pedro Américo, engenhos de cachaça e o Teatro Minerva, o primeiro da Paraíba."
  },
  {
    id: "litoral", regiao: "Litoral", titulo: "A sala do rio",
    foto: "../images/fotos/igreja-praca.webp", alt: "Igreja amarela e praça no Centro Histórico de João Pessoa",
    pistas: [
      "A capital nasceu em 5 de agosto de 1585, às margens do rio Sanhauá, e é uma das cidades mais antigas do Brasil.",
      "Antes do nome atual, ela já se chamou Filipeia, Frederica e Parahyba.",
      "O primeiro nome homenageava a santa do dia 5 de agosto: Nossa Senhora das ___."
    ],
    pergunta: "Complete: Nossa Senhora das…",
    respostas: ["NEVES", "NOSSA SENHORA DAS NEVES"],
    descoberta: "Centro Histórico de João Pessoa",
    texto: "Fundada como Nossa Senhora das Neves, a capital guarda no Varadouro e no Centro Histórico igrejas, casarões e o Hotel Globo, com vista para o rio Sanhauá."
  }
];

function desafio() {
  const palco = document.getElementById("desafioPalco");
  if (!palco) return;

  let indice = 0;
  let pistasAbertas = 1;
  let inicio = Date.now();
  let cronometro = null;

  const relogio = document.getElementById("desafioTempo");
  const progresso = document.getElementById("desafioProgresso");
  const passos = document.querySelectorAll(".desafio-passo");

  function tempo() {
    const s = Math.floor((Date.now() - inicio) / 1000);
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const seg = String(s % 60).padStart(2, "0");
    if (relogio) relogio.textContent = m + ":" + seg;
    return m + ":" + seg;
  }

  function atualizarProgresso() {
    if (progresso) {
      progresso.style.width = (indice / SALAS.length) * 100 + "%";
      progresso.parentElement.setAttribute("aria-valuenow", indice);
    }
    passos.forEach(function (p, i) {
      p.classList.toggle("feito", i < indice);
      p.classList.toggle("atual", i === indice);
    });
  }

  function mostrarSala() {
    const sala = SALAS[indice];
    pistasAbertas = 1;
    atualizarProgresso();

    palco.innerHTML =
      '<div class="row g-4 align-items-start">' +
        '<div class="col-12 col-lg-6">' +
          '<img class="desafio-foto" src="' + sala.foto + '" alt="' + sala.alt + '">' +
        '</div>' +
        '<div class="col-12 col-lg-6">' +
          '<p class="sobretitulo">Sala ' + (indice + 1) + ' de ' + SALAS.length + ' · ' + sala.regiao + '</p>' +
          '<h2 class="h3">' + sala.titulo + '</h2>' +
          '<ol class="pistas" id="listaPistas"></ol>' +
          '<button type="button" class="btn btn-sm btn-outline-secondary mb-3" id="maisPista">Pedir outra pista</button>' +
          '<form id="formSala" class="form-sala" novalidate>' +
            '<label for="resposta" class="form-label fw-bold">' + sala.pergunta + '</label>' +
            '<div class="d-flex gap-2 flex-wrap">' +
              '<input id="resposta" class="form-control" autocomplete="off" required placeholder="Sua resposta">' +
              '<button type="submit" class="btn btn-pb">Destrancar</button>' +
            '</div>' +
            '<p id="retornoSala" class="mt-2 mb-0" role="status" aria-live="polite"></p>' +
          '</form>' +
        '</div>' +
      '</div>';

    desenharPistas();
    document.getElementById("maisPista").addEventListener("click", function () {
      if (pistasAbertas < sala.pistas.length) { pistasAbertas++; desenharPistas(); }
      if (pistasAbertas === sala.pistas.length) this.disabled = true;
    });
    document.getElementById("formSala").addEventListener("submit", conferir);
    document.getElementById("resposta").focus();
  }

  function desenharPistas() {
    const sala = SALAS[indice];
    const lista = document.getElementById("listaPistas");
    lista.innerHTML = sala.pistas.slice(0, pistasAbertas).map(function (p) {
      return "<li>" + p + "</li>";
    }).join("");
  }

  function conferir(evento) {
    evento.preventDefault();
    const sala = SALAS[indice];
    const campo = document.getElementById("resposta");
    const retorno = document.getElementById("retornoSala");
    const digitado = normalizar(campo.value);

    if (!digitado) { retorno.textContent = "Digite uma resposta."; return; }

    if (sala.respostas.includes(digitado)) {
      carimbar(sala.id);
      mostrarDescoberta(sala);
    } else {
      retorno.textContent = "Ainda não. Leia as pistas de novo ou peça outra.";
      campo.classList.add("is-invalid");
      campo.select();
    }
  }

  function mostrarDescoberta(sala) {
    const ultima = indice === SALAS.length - 1;
    palco.innerHTML =
      '<div class="descoberta">' +
        '<span class="carimbo-selo grande regiao-' + sala.id + '"><i class="bi bi-check-lg" aria-hidden="true"></i></span>' +
        '<p class="sobretitulo">Carimbo conquistado · ' + sala.regiao + '</p>' +
        '<h2 class="h3">Você descobriu: ' + sala.descoberta + '</h2>' +
        '<p>' + sala.texto + '</p>' +
        '<div class="d-flex flex-wrap gap-2 mt-3">' +
          '<button type="button" class="btn btn-pb" id="proximaSala">' + (ultima ? "Ver o resultado" : "Próxima sala") + '</button>' +
          '<a class="btn btn-outline-secondary" href="roteiros.html?regiao=' + sala.id + '">Ver roteiro da região</a>' +
        '</div>' +
      '</div>';
    document.getElementById("proximaSala").addEventListener("click", function () {
      indice++;
      if (indice < SALAS.length) mostrarSala();
      else mostrarFinal();
    });
    document.getElementById("proximaSala").focus();
  }

  function mostrarFinal() {
    clearInterval(cronometro);
    atualizarProgresso();
    const total = tempo();
    const passaporte = lerPassaporte();
    palco.innerHTML =
      '<div class="descoberta final">' +
        '<p class="sobretitulo">Travessia concluída em ' + total + '</p>' +
        '<h2 class="h2">Você atravessou a Paraíba de dentro pra fora</h2>' +
        '<p>Quatro regiões, quatro lugares históricos, quatro carimbos. Agora é ir pessoalmente.</p>' +
        (passaporteCompleto()
          ? '<p class="alert alert-success">Passaporte completo! Use o cupom <code class="cupom">' + CUPOM + '</code> e ganhe <strong>10% de desconto</strong> em qualquer roteiro.</p>'
          : '<p class="alert alert-secondary">Complete os outros carimbos do passaporte (explore o site) e ganhe <strong>10% de desconto</strong> na sua viagem.</p>') +
        '<form id="formCertificado" class="certificado-form" novalidate>' +
          '<label for="nomeViajante" class="form-label fw-bold">Seu nome, para o certificado</label>' +
          '<div class="d-flex gap-2 flex-wrap">' +
            '<input id="nomeViajante" class="form-control" maxlength="60" value="' + (passaporte.nome || "") + '" placeholder="Nome e sobrenome">' +
            '<button type="submit" class="btn btn-pb">Gerar certificado</button>' +
          '</div>' +
        '</form>' +
        '<div id="certificado" class="certificado" hidden>' +
          '<img src="../images/logo-rotapb.svg" alt="RotaPB" class="certificado-logo">' +
          '<p class="certificado-titulo">Certificado de Viajante da Paraíba</p>' +
          '<p>Certificamos que <strong id="certNome"></strong> atravessou a Paraíba do Sertão ao mar, destrancando as quatro salas do Desafio RotaPB em <strong>' + total + '</strong>.</p>' +
          '<p class="small">Emitido em <span id="certData"></span> · Projeto acadêmico · UNIPÊ</p>' +
          '<button type="button" class="btn btn-outline-secondary btn-sm no-print" id="imprimirCert"><i class="bi bi-printer" aria-hidden="true"></i> Imprimir ou salvar em PDF</button>' +
        '</div>' +
        '<div class="mt-4 d-flex flex-wrap gap-2">' +
          '<button type="button" class="btn btn-outline-secondary" id="jogarDeNovo">Jogar de novo</button>' +
          '<a class="btn btn-escuro" href="contato.html">Monte sua viagem</a>' +
        '</div>' +
      '</div>';

    document.getElementById("formCertificado").addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nomeViajante").value.trim();
      if (!nome) { document.getElementById("nomeViajante").focus(); return; }
      const p = lerPassaporte(); p.nome = nome; armazem.gravar("rotapb-passaporte", p);
      document.getElementById("certNome").textContent = nome;
      document.getElementById("certData").textContent = new Date().toLocaleDateString("pt-BR");
      document.getElementById("certificado").hidden = false;
    });
    document.getElementById("imprimirCert").addEventListener("click", function () { window.print(); });
    document.getElementById("jogarDeNovo").addEventListener("click", function () {
      indice = 0; inicio = Date.now();
      cronometro = setInterval(tempo, 1000);
      mostrarSala();
    });
  }

  cronometro = setInterval(tempo, 1000);
  mostrarSala();
}

/* ---------- Liga tudo quando a página termina de carregar ---------- */
document.addEventListener("DOMContentLoaded", function () {
  anoNoRodape();
  temaClaroEscuro();
  ajustarFonte();
  altoContraste();
  voltarAoTopo();
  trocarAbas();
  virarCartas();
  filtrarCulinaria();
  filtrarRoteiros();
  montarRota();
  trocarMusica();
  mascaraTelefone();
  validarFormulario();
  validarCupom();
  assinarNovidades();
  iniciarPassaporte();
  desafio();
});
