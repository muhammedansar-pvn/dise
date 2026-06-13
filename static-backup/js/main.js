/* ==========================================================================
   DISE Website Interactions & Dynamic Features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Header scroll state ---
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initially on load


  // --- 2. Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }


  // --- 3. Scroll Spy (Active Nav Link) ---
  const sections = document.querySelectorAll('section[id]');
  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset header
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);


  // --- 4. Intersection Observer for Entrance Animations ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });


  // --- 5. Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');
  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', toggleBackToTop);

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // --- 6. Admissions Modal Trigger & Controls ---
  const modal = document.getElementById('admissions-modal');
  const modalClose = document.getElementById('modal-close');
  const applyButtons = document.querySelectorAll('.trigger-apply');
  const admissionForm = document.getElementById('admission-form');
  const formFieldsWrapper = document.getElementById('modal-form-fields');
  const thankYouScreen = document.getElementById('modal-thank-you');

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset form states after close animation completes
    setTimeout(() => {
      if (admissionForm) admissionForm.reset();
      if (formFieldsWrapper) formFieldsWrapper.style.display = 'block';
      if (thankYouScreen) thankYouScreen.style.display = 'none';
    }, 300);
  };

  applyButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Close modal when clicking overlay background
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Handle Admission Inquiry Form submission
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate form submission animation/API call
      formFieldsWrapper.style.display = 'none';
      thankYouScreen.style.display = 'block';
      
      // Highlight new status or save info locally
      console.log('Admission inquiries submitted successfully.');
    });
  }


  // --- 7. Curriculum & Facilities Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const facilityCards = document.querySelectorAll('.facility-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      facilityCards.forEach(card => {
        if (filterValue === 'all') {
          card.classList.remove('hidden');
          // Trigger minor redraw/re-observe animation
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else if (card.classList.contains(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  // --- 8. Daily Schedule Status Widget & Timeline Highlights ---
  const updateScheduleStatus = () => {
    const statusBadge = document.getElementById('schedule-status');
    const statusText = document.getElementById('status-time-text');
    
    if (!statusBadge || !statusText) return;

    // Get Current Date/Time
    const now = new Date();
    const currentDay = now.getDay(); // 0: Sunday, 1: Mon, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = (currentHour * 60) + currentMinute;

    // Schedule: 7:30 AM (450 mins) to 8:30 PM (1230 mins)
    const openTime = (7 * 60) + 30; // 450
    const closeTime = (20 * 60) + 30; // 1230
    const isSunday = (currentDay === 0);

    let isOpen = false;

    if (!isSunday && currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
      isOpen = true;
    }

    if (isOpen) {
      statusBadge.className = 'status-badge open';
      statusBadge.innerHTML = '<span class="status-dot"></span>In Session';
      statusText.textContent = 'Active now (Classes & Study ongoing)';
    } else {
      statusBadge.className = 'status-badge closed';
      statusBadge.innerHTML = '<span class="status-dot"></span>Closed';
      if (isSunday) {
        statusText.textContent = 'Weekly Holiday (Sunday)';
      } else {
        statusText.textContent = 'Outside operational hours (Open Mon-Sat 7:30 AM - 8:30 PM)';
      }
    }

    // --- Timeline Highlights based on current time ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => item.classList.remove('active'));

    if (isOpen) {
      // Find matching schedule block
      // 07:30 - 08:30 : Morning Majlis & Quran
      // 08:30 - 12:30 : Kerala State Academic Classes
      // 12:30 - 01:30 : Lunch & Prayer Break
      // 01:30 - 04:30 : Secondary Session (Acedemics)
      // 04:30 - 05:30 : Tea Break, Prayers & Sports
      // 05:30 - 08:30 : Classical Islamic & Language Education
      if (currentTimeInMinutes >= 450 && currentTimeInMinutes < 510) {
        document.getElementById('period-1')?.classList.add('active');
      } else if (currentTimeInMinutes >= 510 && currentTimeInMinutes < 750) {
        document.getElementById('period-2')?.classList.add('active');
      } else if (currentTimeInMinutes >= 750 && currentTimeInMinutes < 810) {
        document.getElementById('period-3')?.classList.add('active');
      } else if (currentTimeInMinutes >= 810 && currentTimeInMinutes < 990) {
        document.getElementById('period-4')?.classList.add('active');
      } else if (currentTimeInMinutes >= 990 && currentTimeInMinutes < 1050) {
        document.getElementById('period-5')?.classList.add('active');
      } else if (currentTimeInMinutes >= 1050 && currentTimeInMinutes < 1230) {
        document.getElementById('period-6')?.classList.add('active');
      }
    }
  };

  // Run update initially and every minute
  updateScheduleStatus();
  setInterval(updateScheduleStatus, 60000);


  // --- 9. Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Form validation
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (name && email && message) {
        // Render simple toast or overlay replacement
        const formInner = contactForm.innerHTML;
        contactForm.innerHTML = `
          <div class="text-center animate-on-scroll fade-in visible" style="padding: 20px 0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px;">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h4 style="margin-bottom: 8px; color: var(--primary-dark)">Message Sent!</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Thank you for contacting us. We will get back to you shortly.</p>
          </div>
        `;
        console.log('Contact message submitted successfully.');
      }
    });
  }

});
