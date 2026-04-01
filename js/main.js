/**
 * PPRZ.PH — Paparazzzzzi
 * Main JavaScript — Animations, Interactions, Smooth Scroll
 */

(function () {
  'use strict';

  // ============================================================
  // PAGE LOADER
  // ============================================================
  function initLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    // Hide loader after fonts + content ready
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 600);
    });

    // Fallback: hide after 2.5s regardless
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 2500);
  }

  // ============================================================
  // NAVIGATION — sticky scroll effect
  // ============================================================
  function initNav() {
    var nav = document.getElementById('mainNav');
    if (!nav) return;

    var lastScrollY = 0;

    function onScroll() {
      var scrollY = window.scrollY || window.pageYOffset;

      // Add scrolled class after 40px
      if (scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on init
  }

  // ============================================================
  // MOBILE HAMBURGER
  // ============================================================
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    var isOpen = false;

    function toggleMenu() {
      isOpen = !isOpen;
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());

      // Animate hamburger lines
      var spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
        document.body.style.overflow = 'hidden';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        document.body.style.overflow = '';
      }
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close on mobile link click
    var mobileLinks = mobileNav.querySelectorAll('.nav__mobile-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (isOpen) toggleMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        toggleMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) toggleMenu();
    });
  }

  // ============================================================
  // SMOOTH SCROLL — for anchor links
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
          10
        );

        var targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      });
    });
  }

  // ============================================================
  // SCROLL REVEAL — Intersection Observer
  // ============================================================
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Check if reduced motion preferred
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Reveal all immediately
      elements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ============================================================
  // HERO TEXT — character split animation
  // ============================================================
  function initHeroAnimation() {
    var heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;

    // The animation is CSS-based via keyframes
    // We add a class after a brief delay for the title reveal
    // (already handled via CSS animation on the element)
  }

  // ============================================================
  // CURSOR GLOW — follows mouse
  // ============================================================
  function initCursorGlow() {
    var glow = document.getElementById('cursorGlow');
    if (!glow) return;

    // Only on non-touch devices
    if ('ontouchstart' in window) return;

    var mouseX = 0;
    var mouseY = 0;
    var currentX = 0;
    var currentY = 0;
    var raf;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function animate() {
      currentX = lerp(currentX, mouseX, 0.08);
      currentY = lerp(currentY, mouseY, 0.08);

      glow.style.left = currentX + 'px';
      glow.style.top = currentY + 'px';

      raf = requestAnimationFrame(animate);
    }

    animate();
  }

  // ============================================================
  // PORTFOLIO CARD — keyboard accessibility
  // ============================================================
  function initPortfolioCards() {
    var cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(function (card) {
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Could trigger a lightbox or detail view here
          console.log('Portfolio card activated:', card.getAttribute('aria-label'));
        }
      });
    });
  }

  // ============================================================
  // SERVICE TAGS — interactive hover sounds / keyboard
  // ============================================================
  function initServiceTags() {
    var tags = document.querySelectorAll('.service-tag');
    tags.forEach(function (tag) {
      tag.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Toggle active state
          tag.style.background = 'var(--color-accent)';
          tag.style.color = 'var(--color-bg)';
        }
      });
    });
  }

  // ============================================================
  // SERVICES LIST — hover counter animation
  // ============================================================
  function initServicesCounter() {
    var items = document.querySelectorAll('.services__item');
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        var name = item.querySelector('.services__item-name');
        if (name) {
          name.style.letterSpacing = '0.04em';
        }
      });
      item.addEventListener('mouseleave', function () {
        var name = item.querySelector('.services__item-name');
        if (name) {
          name.style.letterSpacing = '';
        }
      });

      // Keyboard
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          // Could scroll to related portfolio section
        }
      });
    });
  }

  // ============================================================
  // STATS COUNTER — animated number count-up
  // ============================================================
  function initStatsCounter() {
    var stats = document.querySelectorAll('.about__stat-number');
    if (!stats.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var animated = false;

    function countUp(el, target, suffix, duration) {
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !animated) {
            animated = true;

            stats.forEach(function (stat) {
              var text = stat.textContent.trim();
              var suffix = '';
              var numStr = text;

              // Extract suffix (non-numeric trailing chars)
              var match = text.match(/^(\d+)(.*)$/);
              if (match) {
                numStr = match[1];
                suffix = match[2] || '';
                var num = parseInt(numStr, 10);
                countUp(stat, num, suffix, 1500);
              }
              // For non-numeric (like "PH"), skip
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    var aboutSection = document.querySelector('.about__stats');
    if (aboutSection) observer.observe(aboutSection);
  }

  // ============================================================
  // MARQUEE — pause on hover
  // ============================================================
  function initMarquee() {
    var wrapper = document.querySelector('.marquee-wrapper');
    var track = document.querySelector('.marquee-track');
    if (!wrapper || !track) return;

    wrapper.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });

    wrapper.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  }

  // ============================================================
  // ACTIVE NAV LINKS — highlight based on scroll position
  // ============================================================
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;

    function updateActive() {
      var scrollY = window.scrollY + 100;

      sections.forEach(function (section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(function (link) {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('nav__link--active');
              link.style.color = 'var(--color-text)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
  }

  // ============================================================
  // INIT ALL
  // ============================================================
  function init() {
    initLoader();
    initNav();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initHeroAnimation();
    initCursorGlow();
    initPortfolioCards();
    initServiceTags();
    initServicesCounter();
    initStatsCounter();
    initMarquee();
    initActiveNav();

    console.log('%cPPRZ.PH — Paparazzzzzi 📸', 'color: #FFD700; font-size: 14px; font-weight: bold;');
    console.log('%cFor Your Event. Based in the Philippines.', 'color: #888; font-size: 11px;');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
