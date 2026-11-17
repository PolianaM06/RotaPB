/* RotaPB - JavaScript simples para a primeira versão do site */

document.addEventListener('DOMContentLoaded', function () {
  // Ano no rodapé
  document.querySelectorAll('.js-ano').forEach(function (item) {
    item.textContent = new Date().getFullYear();
  });

  // Abas da página "Você conhece?"
  document.querySelectorAll('.aba').forEach(function (botao) {
    botao.addEventListener('click', function () {
      document.querySelectorAll('.aba').forEach(function (aba) {
        aba.classList.remove('ativa');
      });
      document.querySelectorAll('.painel').forEach(function (painel) {
        painel.hidden = true;
      });
      botao.classList.add('ativa');
      var painel = document.getElementById(botao.getAttribute('aria-controls'));
      if (painel) painel.hidden = false;
    });
  });

  // Cartas de curiosidades
  document.querySelectorAll('.carta').forEach(function (carta) {
    carta.addEventListener('click', function () {
      carta.classList.toggle('virada');
    });
  });

  // Filtros de culinária e roteiros
  document.querySelectorAll('.filtro').forEach(function (botao) {
    botao.addEventListener('click', function () {
      var culinaria = botao.classList.contains('filtro-culinaria');
      var classeBotao = culinaria ? '.filtro-culinaria' : '.filtro:not(.filtro-culinaria)';
      var classeItem = culinaria ? '.item-culinaria' : '.item-roteiro';
      var atributo = culinaria ? 'categoria' : 'regiao';
      var filtro = botao.dataset.filtro;

      document.querySelectorAll(classeBotao).forEach(function (item) {
        item.classList.toggle('ativo', item === botao);
      });
      document.querySelectorAll(classeItem).forEach(function (item) {
        item.hidden = filtro !== 'todas' && item.dataset[atributo] !== filtro;
      });
    });
  });

  // Seleção de cidades para montar um roteiro
  var cidades = document.querySelectorAll('.incluir-rota');
  var lista = document.getElementById('listaRota');
  var resumo = document.getElementById('resumoRota');
  if (cidades.length && lista && resumo) {
    function atualizarRota() {
      lista.innerHTML = '';
      var escolhidas = Array.from(cidades).filter(function (cidade) {
        return cidade.checked;
      });
      escolhidas.sort(function (a, b) {
        return Number(a.dataset.ordem) - Number(b.dataset.ordem);
      });
      escolhidas.forEach(function (cidade, indice) {
        var item = document.createElement('li');
        item.textContent = 'Dia ' + (indice + 1) + ': ' + cidade.value;
        lista.appendChild(item);
      });
      if (!escolhidas.length) lista.innerHTML = '<li>Selecione as cidades.</li>';
      resumo.textContent = escolhidas.length + ' cidade(s)';
    }
    cidades.forEach(function (cidade) {
      cidade.addEventListener('change', atualizarRota);
    });
    atualizarRota();
  }

  // Seleção de música na página de cultura
  var player = document.getElementById('playerSpotify');
  document.querySelectorAll('.faixa').forEach(function (botao) {
    botao.addEventListener('click', function () {
      if (!player || !botao.dataset.spotify || botao.dataset.spotify === 'TODO') return;
      player.src = 'https://open.spotify.com/embed/' + botao.dataset.spotify;
      document.querySelectorAll('.faixa').forEach(function (faixa) {
        faixa.classList.remove('ativa');
      });
      botao.classList.add('ativa');
    });
  });

  // Formulário de contato (demonstração: não envia dados)
  var formulario = document.getElementById('formViagem');
  var retorno = document.getElementById('retornoForm');
  if (formulario && retorno) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var regioes = formulario.querySelectorAll('fieldset input[type="checkbox"]');
      var marcada = Array.from(regioes).some(function (item) { return item.checked; });
      var aviso = document.getElementById('avisoRegiao');
      if (aviso) aviso.hidden = marcada;
      if (!formulario.checkValidity() || (regioes.length > 0 && !marcada)) {
        retorno.className = 'alert alert-danger mt-3';
        retorno.textContent = 'Preencha os campos obrigatórios.';
        return;
      }
      retorno.className = 'alert alert-success mt-3';
      retorno.textContent = 'Formulário preenchido! Esta é uma demonstração e os dados não foram enviados.';
      formulario.reset();
    });
  }

  // Newsletter (demonstração)
  document.querySelectorAll('.assinatura').forEach(function (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (email && email.checkValidity()) {
        alert('E-mail válido! Cadastro demonstrativo, sem envio de dados.');
        form.reset();
      } else if (email) {
        email.reportValidity();
      }
    });
  });
});
