/**
 * Hemanath M. — Portfolio Scripts
 * Handles navigation, active link scrollspy, project toggle, and resume modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header shadow on scroll & Active link ScrollSpy
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Header shadow
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // ScrollSpy active link
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 3. View All Projects Toggle
  const viewAllBtn = document.getElementById('viewAllProjectsBtn');
  const extraProjects = document.querySelectorAll('.project-extra');

  if (viewAllBtn && extraProjects.length > 0) {
    viewAllBtn.addEventListener('click', () => {
      const isHidden = extraProjects[0].classList.contains('hidden');

      extraProjects.forEach((card) => {
        card.classList.toggle('hidden', !isHidden);
        if (isHidden) {
          // Trigger smooth reveal animation when unhiding
          setTimeout(() => {
            card.classList.add('visible');
          }, 30);
        }
      });

      const span = viewAllBtn.querySelector('span');
      if (span) {
        span.textContent = isHidden ? 'Show Less' : 'View All Projects';
      }
    });
  }

  // 4. Resume Modal Interaction
  const resumeBtn = document.getElementById('resumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalPrintBtn = document.getElementById('modalPrintBtn');

  const openModal = (e) => {
    e.preventDefault();
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  resumeBtn?.addEventListener('click', openModal);
  modalCloseBtn?.addEventListener('click', closeModal);
  modalOkBtn?.addEventListener('click', closeModal);

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('open')) {
      closeModal();
    }
  });

  modalPrintBtn?.addEventListener('click', () => {
    window.print();
  });

  // 5. Hero Typewriter Role Animation
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const roles = [
      'Software Developer',
      'Web & Python Developer',
      'Machine Learning Enthusiast',
      'Database Specialist'
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;

    const typeStep = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typewriterEl.textContent = currentRole.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeStep, 350);
          return;
        }
        setTimeout(typeStep, 45);
      } else {
        charIndex++;
        typewriterEl.textContent = currentRole.substring(0, charIndex);
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeStep, 2200);
          return;
        }
        setTimeout(typeStep, 80);
      }
    };

    // Initial pause so the visitor reads the first role
    setTimeout(typeStep, 2200);
  }

  // 6. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // 7. Animated Number Counters
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    let countersStarted = false;

    const startCounters = () => {
      if (countersStarted) return;
      countersStarted = true;

      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1400;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic curve
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeProgress * target);

          counter.textContent = currentVal + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target + suffix;
          }
        };

        requestAnimationFrame(updateCount);
      });
    };

    const statsRow = document.querySelector('.hero-stats-row');
    if (statsRow && 'IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      statsObserver.observe(statsRow);
    } else {
      setTimeout(startCounters, 600);
    }
  }
});
