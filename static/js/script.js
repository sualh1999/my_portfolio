/**
 * Portfolio Website - Main Script
 * For Python Backend Developer Portfolio
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // ===== THEME TOGGLE =====
  setupThemeToggle();

  // ===== MOBILE MENU TOGGLE =====
  setupMobileMenu();

  // ===== HEADER SCROLL EFFECT =====
  setupScrollHeader();

  // ===== SMOOTH SCROLLING FOR NAVIGATION =====
  setupSmoothScrolling();

  // ===== LOAD PROJECTS DYNAMICALLY =====
  loadProjects();

  // ===== PROJECT MODALS =====
  setupProjectModals();

  // ===== SKILL PROGRESS BARS =====
  setupSkillProgressBars();

  // ===== INITIALIZE TYPEWRITER EFFECT =====
  setupTypewriterEffect();

  // ===== SCROLL TO TOP BUTTON =====
  setupScrollToTopButton();
});

/**
 * Setup theme toggle functionality (light/dark mode)
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check for saved theme preference or use OS preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');

  // Apply the saved theme on page load
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // Toggle theme and save preference
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  // Update the theme icon based on current theme
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }
}

/**
 * Setup mobile menu toggle functionality
 */
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

/**
 * Setup header scroll effect
 */
function setupScrollHeader() {
  const header = document.querySelector('.header');
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
}

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const headerHeight = document.querySelector('.header').offsetHeight;

  // Find the current visible section
  let currentSectionId = sections[0].id;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.id;
    }
  });

  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

/**
 * Setup project modals for detailed project information
 */
function setupProjectModals() {
  const projectCards = document.querySelectorAll('.project-card');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalContent = document.querySelector('.modal-content');
  const modalTitle = document.querySelector('.modal-title');
  const modalClose = document.querySelector('.modal-close');
  const modalButtons = document.querySelector('.modal-buttons');

  // Open modal when a project card is clicked
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');

      // Get project data
      const projectData = getProjectData(projectId);

      // Populate modal content
      modalTitle.textContent = projectData.title;

      // Make sure screenshots exist or use placeholder
      let screenshots = projectData.screenshots || [];
      if (screenshots.length === 0) {
        screenshots = ['static/images/projects/screenshots/placeholder.svg'];
      }

      // Fix paths if needed - ensure no leading slash which can cause path issues
      screenshots = screenshots.map(path => {
        // Remove leading slash if present
        return path.startsWith('/') ? path.substring(1) : path;
      });

      // Create image slider HTML
      let screenshotsHTML = `
        <div class="modal-image-slider">
          <div class="slider-container">
            ${screenshots.map((screenshot, index) => 
              `<div class="slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="modal-image">
                  <img src="${screenshot}" alt="${projectData.title} Screenshot ${index + 1}" class="zoomable-img">
                </div>
              </div>`
            ).join('')}
          </div>

          ${screenshots.length > 1 ? `
            <div class="slider-controls">
              <button class="slider-prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div class="slider-dots">
                ${screenshots.map((_, index) => 
                  `<span class="slider-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
                ).join('')}
              </div>
              <button class="slider-next">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          ` : ''}
        </div>
      `;

      // Populate modal content
      modalContent.innerHTML = `
        ${screenshotsHTML}

        <div class="modal-section">
          <h4 class="modal-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Description
          </h4>
          <div class="modal-section-content">
            <p>${projectData.description}</p>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 19.56 6.5 19.56 17.5 12 22 4.44 17.5 4.44 6.5 12 2"></polygon>
            </svg>
            Technologies Used
          </h4>
          <div class="modal-section-content">
            <div class="modal-tags">
              ${projectData.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Key Features
          </h4>
          <div class="modal-section-content">
            <ul>
              ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      // Update buttons based on available links
      modalButtons.innerHTML = '';

      if (projectData.demoLink) {
        const siteButton = document.createElement('a');
        siteButton.href = projectData.demoLink;
        siteButton.className = 'btn btn-primary';
        siteButton.target = '_blank';
        siteButton.innerHTML = '<i class="fas fa-external-link-alt"></i> Visit Site';
        modalButtons.appendChild(siteButton);
      }

      if (projectData.githubLink) {
        const githubButton = document.createElement('a');
        githubButton.href = projectData.githubLink;
        githubButton.className = 'btn btn-outline';
        githubButton.target = '_blank';
        githubButton.innerHTML = '<i class="fab fa-github"></i> GitHub';
        modalButtons.appendChild(githubButton);
      }

      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

      // Initialize slider if it exists
      initializeSlider();
    });
  });

  // Initialize the image slider
  function initializeSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dot');
    const zoomableImages = document.querySelectorAll('.zoomable-img');

    if (!slides.length) return;

    let currentIndex = 0;

    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Show the current slide
      slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');

      // Apply appropriate scaling to the current slide image based on aspect ratio
      const currentSlideImg = slides[index].querySelector('img');
      if (currentSlideImg) {
        // Determine if image is a phone screenshot or PC screenshot based on aspect ratio
        const isPhoneScreenshot = currentSlideImg.naturalHeight > currentSlideImg.naturalWidth * 1.3;
        
        // Set initial scale based on image type
        const initialScale = isPhoneScreenshot ? 0.25 : 0.7;
        currentSlideImg.style.transform = `scale(${initialScale})`;
        
        // Store the image type as a data attribute for potential future use
        currentSlideImg.setAttribute('data-image-type', isPhoneScreenshot ? 'phone' : 'pc');
      }

      currentIndex = index;
    }
    
    // Initialize zoom functionality for each image
    zoomableImages.forEach(img => {
      let scale = 1;
      let zoomState = 0; // 0 = normal, 1 = 150%, 2 = 170%, 3 = back to normal
      const zoomContainer = img.closest('.modal-image');
      
      // Determine if image is a phone screenshot or PC screenshot based on aspect ratio
      // Phone screenshots are typically taller than they are wide
      const isPhoneScreenshot = img.naturalHeight > img.naturalWidth * 1.3;
      
      // Set initial scale based on image type
      // Phone screenshots get scale(0.25), PC screenshots get scale(0.7)
      const initialScale = isPhoneScreenshot ? 0.25 : 0.7;
      img.style.transform = `scale(${initialScale})`;
      img.style.cursor = 'zoom-in';
      
      // Store the image type as a data attribute for use in click handler
      img.setAttribute('data-image-type', isPhoneScreenshot ? 'phone' : 'pc');
      
      // Add click to zoom
      img.addEventListener('click', () => {
        zoomState = (zoomState + 1) % 3;
        
        // Get the image type from the data attribute
        const imageType = img.getAttribute('data-image-type');
        
        // Different zoom levels based on image type (phone vs PC)
        if (zoomState === 0) {
          // Initial zoom level
          scale = imageType === 'phone' ? 0.25 : 0.7;
          img.style.cursor = 'zoom-in';
        } else if (zoomState === 1) {
          // Medium zoom level
          scale = imageType === 'phone' ? 0.6 : 1.0;
          img.style.cursor = 'zoom-in';
        } else if (zoomState === 2) {
          // Full zoom level
          scale = imageType === 'phone' ? 1.0 : 1.3;
          img.style.cursor = 'zoom-out';
        }
        
        img.style.transform = `scale(${scale})`;
      });
      
      // Let two-finger scroll work normally (for vertical scrolling)
      // No need to prevent default on wheel events
    });

    // Previous slide button
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
      });
    }

    // Next slide button
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
      });
    }

    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
      });
    });
  }

  // Close modal when close button is clicked
  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  });

  // Close modal when clicking outside the modal content
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  });
}

/**
 * Load projects dynamically from the project data
 */
function loadProjects() {
  const projectsGrid = document.querySelector('.projects-grid');

  if (!projectsGrid) return;

  // Clear existing content
  projectsGrid.innerHTML = '';

  // Get all projects data
  const projects = {
    '1': getProjectData('1'),
    '2': getProjectData('2'),
    '3': getProjectData('3'),
    '4': getProjectData('4'),
    '5': getProjectData('5'),
    '6': getProjectData('6'),
    '7': getProjectData('7'),
    '8': getProjectData('8')
  };

  // Create project cards
  Object.entries(projects).forEach(([id, project]) => {
    // Check if screenshots are available, otherwise use placeholder
    let screenshots = project.screenshots || [];
    if (screenshots.length === 0) {
      // Use placeholder.svg for missing screenshots
      screenshots = ['static/images/projects/screenshots/placeholder.svg'];
    }

    // Fix paths if needed - ensure no leading slash which can cause path issues
    screenshots = screenshots.map(path => {
      // Remove leading slash if present
      return path.startsWith('/') ? path.substring(1) : path;
    });

    const thumbnail = screenshots[0] || getProjectImagePath(id);

    // Create project card element
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-project-id', id);

    // Populate project card HTML
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${thumbnail}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">
          ${project.description.substring(0, 100)}...
        </p>
        <div class="project-tags">
          ${project.technologies.slice(0, 4).map(tech => `<span class="project-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="#" class="project-link view-details">
            <i class="fas fa-external-link-alt"></i>
            View Details
          </a>
          ${project.githubLink ? `
            <a href="${project.githubLink}" target="_blank" class="project-link">
              <i class="fab fa-github"></i>
              GitHub
            </a>
          ` : ''}
        </div>
      </div>
    `;

    // Add click event for "View Details" link
    const viewDetailsLink = projectCard.querySelector('.view-details');
    viewDetailsLink.addEventListener('click', (e) => {
      e.preventDefault();
      // The main card click handler in setupProjectModals will handle the modal display
    });

    // Add to projects grid
    projectsGrid.appendChild(projectCard);
  });
}

/**
 * Get project image path by ID (fallback for projects without screenshots)
 */
function getProjectImagePath(projectId) {
  const imagePaths = {
    '1': 'static/images/projects/ecommerce.svg',
    '2': 'static/images/projects/chat-app.svg',
    '3': 'static/images/projects/dashboard.svg',
    '4': 'static/images/projects/api-gateway.svg',
    '5': 'static/images/projects/todo-app.svg',
    '6': 'static/images/projects/cms.svg',
    '7': 'static/images/projects/education.svg',
    '8': 'static/images/projects/charity.svg'
  };

  return imagePaths[projectId] || 'static/images/projects/ecommerce.svg';
}

/**
 * Get project data by ID
 * In a real application, this would fetch data from a database or API
 */
function getProjectData(projectId) {
  const projects = {
      '1': {
          title: 'Maroset Bot',
          description: 'A remote job vacancy posting bot where job owners submit job offers for admin review. Once approved, jobs are posted on a channel. Users can apply by clicking an "Apply" button, which connects them with the job owner privately. The bot also supports startup and company registration, along with user profiles for job seekers.',
          technologies: ['Python', 'python-telegram-bot', 'Flask', 'MySQL'],
          features: [
              'Job owners can post job offers (reviewed by admins)',
              'Approved jobs are posted in a Telegram channel',
              'Users can apply and directly contact job owners',
              'Startup and company registration system',
              'User profile with editable name, bio, phone, and CV (visible to job owners)',
              'Referal system where users can earn money by inviting users.'
          ],
          screenshots: [
              '/static/images/projects/screenshots/maroset-1.jpg',
              '/static/images/projects/screenshots/maroset-2.jpg',
              '/static/images/projects/screenshots/maroset-3.jpg',
              '/static/images/projects/screenshots/maroset-4.jpg',
              '/static/images/projects/screenshots/maroset-5.jpg',
              '/static/images/projects/screenshots/maroset-6.jpg'
          ],
          demoLink: 'https://t.me/Maroset',
          githubLink: null
      },
      '2': {
          title: 'Maroset Admin Panel',
          description: 'A web-based dashboard for managing the Maroset Bot. It allows admins to monitor job statistics, manage companies, and view job activity in real-time.',
          technologies: ['Flask', 'HTMX', 'MySQL', 'JavaScript', 'Bootstrap'],
          features: [
              'Authentication for admin and API routes',
              'Dashboard overview with key job and user metrics',
              'Job analytics with activity trends and top companies/jobs',
              'Company management with job postings and applicant count',
              'Dynamic data rendering with asynchronous pagination',
              'API for job trends with date filtering',
              'Custom time formatting and user/company retrieval'
          ],
          screenshots: [
              '/static/images/projects/screenshots/maroset-admin-1.jpg',
              '/static/images/projects/screenshots/maroset-admin-2.jpg'
          ],
          demoLink: null,
          githubLink: null
      },
      '3': {
          title: 'Udemy Bot',
          description: 'A Telegram bot that sends free Udemy course coupons to users based on their interests. The bot scrapes a free coupon provider site every minute and notifies users when new courses match their preferences.',
          technologies: ['Python', 'python-telegram-bot', 'BeautifulSoup (BS4)', 'MongoDB'],
          features: [
              'Users select interests via buttons or by typing',
              'Scrapes coupon provider site every minute for new free courses',
              'Sends relevant courses to users based on their preferences',
              'Users can add, edit, or clear their preferences',
              'Automated and real-time course updates'
          ],
          screenshots: [
              '/static/images/projects/screenshots/udemy-bot-1.jpg',
              '/static/images/projects/screenshots/udemy-bot-2.jpg',
              '/static/images/projects/screenshots/udemy-bot-3.jpg'
          ],
          demoLink: 'https://t.me/Udemy_corse_bot',
          githubLink: null
      },
      '4': {
          title: 'Udemy Website',
          description: 'A free API provider for developers that offers Udemy course coupons. The site scrapes a free coupon provider every minute and updates coupon details (expiry date, remaining enrollment, availability) every 5 minutes. Users can retrieve data via API with authentication and rate limiting or explore courses through a UI search.',
          technologies: ['Django REST Framework', 'Django', 'Tailwind CSS', 'HTMX', 'BeautifulSoup (BS4)', 'MySQL'],
          features: [
              'Scrapes new coupons every minute and updates details every 5 minutes',
              'API for developers with authentication and rate limiting',
              'Users register with django-allauth and sign in via Google or GitHub',
              'Paginated API responses with token-based authentication',
              'Non-developers can explore courses through an interactive UI',
              'HTMX-powered search for real-time filtering'
          ],
          screenshots: [
              '/static/images/projects/screenshots/udemy_web_1.png',
              '/static/images/projects/screenshots/udemy_web_2.png',
              '/static/images/projects/screenshots/udemy_web_3.png',
              '/static/images/projects/screenshots/udemy_web_4.png',
              '/static/images/projects/screenshots/udemy_web_5.png',
              '/static/images/projects/screenshots/udemy_web_6.png'
          ],
          demoLink: 'https://couponhub.srachn.com/',
          githubLink: 'https://github.com/sualh1999/Free-Udemy-Coupon-API'
      },
      '5': {
          title: 'Freshman Bot',
          description: 'A Telegram bot designed to help freshman students understand their courses easily. It uses AI to summarize course content and break it into smaller pieces for better comprehension. The bot follows a structured learning approach with quizzes to reinforce understanding. Admins can manage content via an admin panel, and the bot supports multiple languages.',
          technologies: ['Python', 'python-telegram-bot', 'Django', 'Bootstrap', 'MySQL'],
          features: [
              'Users enroll in courses they want to learn',
              'AI-powered course summarization into smaller, easy-to-learn pieces',
              'Quiz-based learning with multiple steps for comprehension testing',
              'Admin panel for inserting, updating, or deleting course content',
              'Multilingual support (Amharic, English, Afaan Oromo)'
          ],
          screenshots: [
              '/static/images/projects/screenshots/freshman-1.jpg',
              '/static/images/projects/screenshots/freshman-2.jpg'
          ],
          demoLink: null,
          githubLink: null
      },
      '6': {
          title: 'Hanif Bot',
          description: 'A Telegram bot for Hanif Charity that helps users register for membership, set donation amounts, and receive reminders for due payments. It also supports one-time donations and allows users to communicate with admins for help or information. Donations are processed via a Telegram Web App, and receipts are forwarded to admins for review.',
          technologies: ['Python', 'python-telegram-bot', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
          features: [
              'Membership registration with custom donation amount and duration',
              'Payment reminders for recurring donations',
              'One-time donation option for users',
              'Admin communication system for user inquiries',
              'Telegram Web App for registration and receipt submission',
              'Admin review system for verifying donation receipts'
          ],
          screenshots: [
              '/static/images/projects/screenshots/hanif-1.jpg',
              '/static/images/projects/screenshots/hanif-2.jpg',
              '/static/images/projects/screenshots/hanif-3.jpg',
              '/static/images/projects/screenshots/hanif-4.jpg'
          ],
          demoLink: null,
          githubLink: null
      },
      '7': {
          title: 'Mamit Bot',
          description: 'A Telegram bot that facilitates the buying and selling of social media accounts. Sellers can list their accounts or channels with images and statistics, while buyers can inquire, view details, and proceed with a purchase through the admin.',
          technologies: ['Python', 'python-telegram-bot', 'MongoDB'],
          features: [
              'Sellers can list accounts with images and statistics',
              'Buyers can ask for more info, view images, or proceed with purchase',
              'Secure transaction handling through admin',
              'Three main interaction buttons: Ask More Info, View Images, Buy'
          ],
          screenshots: [
              '/static/images/projects/screenshots/mamit-1.jpg',
              '/static/images/projects/screenshots/mamit-2.jpg',
              '/static/images/projects/screenshots/mamit-3.jpg'
          ],
          demoLink: 'https://t.me/MamitBot',
          githubLink: null
      },
      '8': {
          title: 'Nur Website',
          description: 'A static website for Nur Quran Center built with HTML, CSS, and JavaScript. It provides information about the center and allows users to register for Quran learning or request information.',
          technologies: ['HTML', 'CSS', 'JavaScript'],
          features: [
              'User-friendly static website design',
              'Registration form for Quran learning',
              'Automatic form submission to the site admin via Telegram with user details'
          ],
          screenshots: [
              '/static/images/projects/screenshots/nur_1.png',
              '/static/images/projects/screenshots/nur_2.png',
              '/static/images/projects/screenshots/nur_3.png',
              '/static/images/projects/screenshots/nur_4.png'
          ],
          demoLink: 'https://nurqurancenter.com/',
          githubLink: null
      }
  };


  return projects[projectId] || {
    title: 'Project Details',
    description: 'Project information not available.',
    technologies: [],
    features: [],
    screenshots: [],
    demoLink: null,  // Kept as demoLink for compatibility with existing code
    githubLink: null
  };
}

/**
 * Setup skill progress bars with animation
 */
function setupSkillProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  // Animate progress bars when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target.getAttribute('data-level');
        entry.target.style.width = skillLevel;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

/**
 * Setup typewriter effect for hero section
 */
function setupTypewriterEffect() {
  const typewriterElement = document.querySelector('.typewriter');
  const cursorElement = document.querySelector('.typewriter-cursor');

  if (!typewriterElement || !cursorElement) return;

  const phrases = [
    'Python Backend Developer',
    'Django Expert',
    'Telegram Bot Developer',
    'API Designer',
    'Problem Solver',
    'Code Craftsman'
  ];

  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      // Deleting text
      typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100; // Normal speed when typing
    }

    // Check if word is complete
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      // Pause at the end of the phrase
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typewriter effect
  setTimeout(type, 1000);
}

/**
 * Setup scroll to top button functionality
 * Displays the button when user scrolls down and provides smooth scrolling to top
 */
function setupScrollToTopButton() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const scrollThreshold = 300; // Show button after scrolling this many pixels

  // Show/hide the button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top with smooth animation when clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
