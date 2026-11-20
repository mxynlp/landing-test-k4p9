// Tout le contenu reste visible sans JS : ce fichier n'ajoute que des améliorations.
document.documentElement.classList.add('js');

// Lien WhatsApp avec message prérempli
const msg = encodeURIComponent("Bonjour, je viens de voir votre page. Je voudrais mon site. Mon entreprise : ");
document.querySelectorAll('[data-wa]').forEach(a => { a.href = 'https://wa.me/33768855603?text=' + msg; });

// Menu mobile
const nav = document.querySelector('.nav'), burger = document.querySelector('.burger');
const setMenu = open => {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  burger.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-list');
};
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); burger.focus(); } });

// Bandeau défilant : on double la liste pour une boucle continue (copie masquée aux lecteurs d'écran)
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('.marquee-track, .demo-track').forEach(t => {
  [...t.children].forEach(li => {
    const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true');
    c.querySelectorAll('a').forEach(a => a.tabIndex = -1);
    t.appendChild(c);
  });
});


// Apparitions au scroll, en cascade
const rv = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  rv.forEach(el => io.observe(el));
  // Barre WhatsApp : visible une fois le hero dépassé, masquée sur la section contact
  const bar = document.querySelector('.sticky-cta');
  let pastHero = false, onContact = false;
  const upd = () => bar.classList.toggle('show', pastHero && !onContact);
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; upd(); }).observe(document.querySelector('.hero .ctas'));
  new IntersectionObserver(([e]) => { onContact = e.isIntersecting; upd(); }).observe(document.querySelector('#contact'));
} else rv.forEach(el => el.classList.add('in'));
