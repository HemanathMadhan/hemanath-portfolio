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
});
