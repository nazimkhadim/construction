// Global scripts - Construction website

(function () {
  'use strict';

  // Navbar: mobile menu toggle
  var toggler = document.querySelector('.navbar-toggler');
  var menu = document.querySelector('.navbar-menu');
  if (toggler && menu) {
    toggler.addEventListener('click', function () {
      var open = toggler.getAttribute('aria-expanded') === 'true';
      toggler.setAttribute('aria-expanded', !open);
      menu.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggler.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Navbar: add scrolled class for transparent → solid effect (throttled)
  var header = document.querySelector('.site-header');
  if (header) {
    var scrollTicking = false;
    function onScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
        scrollTicking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
