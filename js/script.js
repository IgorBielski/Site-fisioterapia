/* =========================================================
   Reabilitação em Foco — script.js
   Menu responsivo, acordeão, busca/filtro de artigos,
   botão voltar ao topo e animações de entrada.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- menu hambúrguer ---------- */
  var btnMenu = document.querySelector('.btn-menu');
  var navPrincipal = document.querySelector('.nav-principal');

  if (btnMenu && navPrincipal) {
    btnMenu.addEventListener('click', function () {
      var aberto = navPrincipal.classList.toggle('aberto');
      btnMenu.classList.toggle('aberto', aberto);
      btnMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    navPrincipal.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navPrincipal.classList.remove('aberto');
        btnMenu.classList.remove('aberto');
        btnMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- acordeão (mitos e verdades) ---------- */
  document.querySelectorAll('.item-acordeao button').forEach(function (botao) {
    botao.addEventListener('click', function () {
      var item = botao.closest('.item-acordeao');
      var resposta = item.querySelector('.resposta');
      var aberto = botao.getAttribute('aria-expanded') === 'true';

      botao.setAttribute('aria-expanded', String(!aberto));
      if (!aberto) {
        resposta.style.maxHeight = resposta.scrollHeight + 'px';
      } else {
        resposta.style.maxHeight = 0;
      }
    });
  });

  /* ---------- busca e filtro de artigos ---------- */
  var campoBusca = document.querySelector('.campo-busca');
  var filtros = document.querySelectorAll('.filtro');
  var cartoesArtigo = document.querySelectorAll('.cartao-artigo');
  var semResultado = document.querySelector('.sem-resultado');
  var filtroAtivo = 'todos';

  function aplicarFiltros() {
    var termo = (campoBusca ? campoBusca.value : '').trim().toLowerCase();
    var algumVisivel = false;

    cartoesArtigo.forEach(function (cartao) {
      var categoria = cartao.getAttribute('data-categoria') || '';
      var texto = cartao.getAttribute('data-busca') || cartao.textContent.toLowerCase();
      var passaCategoria = (filtroAtivo === 'todos' || categoria === filtroAtivo);
      var passaBusca = termo === '' || texto.toLowerCase().indexOf(termo) !== -1;
      var visivel = passaCategoria && passaBusca;

      cartao.style.display = visivel ? '' : 'none';
      if (visivel) algumVisivel = true;
    });

    if (semResultado) {
      semResultado.style.display = algumVisivel ? 'none' : 'block';
    }
  }

  if (campoBusca) campoBusca.addEventListener('input', aplicarFiltros);

  filtros.forEach(function (botaoFiltro) {
    botaoFiltro.addEventListener('click', function () {
      filtros.forEach(function (f) { f.classList.remove('ativo'); });
      botaoFiltro.classList.add('ativo');
      filtroAtivo = botaoFiltro.getAttribute('data-filtro');
      aplicarFiltros();
    });
  });

  /* ---------- botão voltar ao topo ---------- */
  var botaoTopo = document.querySelector('.topo');
  if (botaoTopo) {
    window.addEventListener('scroll', function () {
      botaoTopo.classList.toggle('visivel', window.scrollY > 480);
    });
    botaoTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- animação de entrada ao rolar ---------- */
  var elementosEntrada = document.querySelectorAll('.entra');
  if ('IntersectionObserver' in window && elementosEntrada.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosEntrada.forEach(function (el) { observador.observe(el); });
  } else {
    elementosEntrada.forEach(function (el) { el.classList.add('visivel'); });
  }

});
