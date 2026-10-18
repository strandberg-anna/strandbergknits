/* Sticka tidlösa plagg – små funktioner för sidan */

// Mobilmenyn
document.querySelectorAll('.menu-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var nav = document.getElementById('nav');
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Stäng' : 'Meny';
  });
});

// Årtal i sidfoten
document.querySelectorAll('.year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Videor: när en video har ett YouTube-id (data-youtube="...") spelas den på plats.
// Utan id visas bara bilden med etiketten "Kommer snart".
document.querySelectorAll('.video-thumb').forEach(function (thumb) {
  var id = thumb.getAttribute('data-youtube');
  var soon = thumb.querySelector('.soon');
  if (id) {
    if (soon) soon.remove();
    thumb.addEventListener('click', function () {
      thumb.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0" title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    });
  } else {
    thumb.style.cursor = 'default';
    var play = thumb.querySelector('.play');
    if (play) play.style.opacity = '.55';
  }
});

// Videor: filterknappar och sökning
(function () {
  var chips = document.querySelectorAll('.chip');
  var search = document.getElementById('video-search');
  var items = document.querySelectorAll('[data-cat]');
  if (!items.length) return;
  var current = 'alla';
  function update() {
    var q = search ? search.value.trim().toLowerCase() : '';
    items.forEach(function (it) {
      var okCat = current === 'alla' || it.getAttribute('data-cat') === current;
      var okText = !q || it.textContent.toLowerCase().indexOf(q) > -1;
      it.hidden = !(okCat && okText);
    });
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('active'); });
      c.classList.add('active');
      current = c.getAttribute('data-filter');
      update();
    });
  });
  if (search) search.addEventListener('input', update);
})();

// Nyhetsbrevet är inte kopplat ännu
document.querySelectorAll('.newsletter form').forEach(function (f) {
  if (f.getAttribute('action')) return; // när en riktig adress finns används den
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = f.querySelector('.form-msg');
    msg.textContent = 'Nyhetsbrevet är inte igång ännu. Skriv gärna till mig så länge, via Kontakt längst ned.';
  });
});
