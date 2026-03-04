// Global scripts - Construction website

(function () {
  'use strict';

  // Navbar: mobile menu toggle and close when clicking outside
  var toggler = document.querySelector('.navbar-toggler');
  var menu = document.querySelector('.navbar-menu');
  var overlay = document.querySelector('.navbar-overlay');

  function closeMenu() {
    if (toggler) toggler.setAttribute('aria-expanded', 'false');
    if (menu) menu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (toggler && menu) {
    toggler.addEventListener('click', function () {
      var open = toggler.getAttribute('aria-expanded') === 'true';
      toggler.setAttribute('aria-expanded', !open);
      menu.classList.toggle('is-open', !open);
      if (overlay) overlay.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
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

  // Testimonials slider
  var track = document.querySelector('.testimonials-track');
  var slides = document.querySelectorAll('.testimonial-slide');
  var dotsContainer = document.querySelector('.testimonials-dots');
  var btnPrev = document.querySelector('.testimonial-btn-prev');
  var btnNext = document.querySelector('.testimonial-btn-next');
  var current = 0;
  var total = slides.length;

  if (track && slides.length > 0 && dotsContainer) {
    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = 'translateX(-' + current * 100 + '%)';
      dotsContainer.querySelectorAll('.testimonial-dot').forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-selected', i === current);
      });
    }

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.setAttribute('aria-selected', i === 0);
      dot.addEventListener('click', function () { goTo(i); });
      dotsContainer.appendChild(dot);
    });

    if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });

    goTo(0);
  }

  // Footer: scroll-in effect when footer enters viewport
  var footer = document.getElementById('site-footer');
  if (footer) {
    var footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          footer.classList.add('is-in-view');
        }
      });
    }, { rootMargin: '0px', threshold: 0.15 });

    observer.observe(footer);
  }
})();
