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
  
  // ===== PROJECT MODALS =====
  setupProjectModals();
  
  // ===== SKILL PROGRESS BARS =====
  setupSkillProgressBars();
  
  // ===== INITIALIZE TYPEWRITER EFFECT =====
  setupTypewriterEffect();
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
  
  // Open modal when a project card is clicked
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      
      // Get project data (in a real scenario, this would be fetched from a database)
      const projectData = getProjectData(projectId);
      
      // Get the project image path
      const projectImagePath = getProjectImagePath(projectId);
      
      // Populate modal content
      modalTitle.textContent = projectData.title;
      modalContent.innerHTML = `
        <div class="modal-image">
          <img src="${projectImagePath}" alt="${projectData.title}">
        </div>

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
      
      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });
  
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
 * Get project image path by ID
 */
function getProjectImagePath(projectId) {
  const imagePaths = {
    '1': '/static/images/projects/ecommerce.svg',
    '2': '/static/images/projects/chat-app.svg',
    '3': '/static/images/projects/dashboard.svg',
    '4': '/static/images/projects/api-gateway.svg',
    '5': '/static/images/projects/todo-app.svg',
    '6': '/static/images/projects/cms.svg'
  };
  
  return imagePaths[projectId] || '/static/images/projects/ecommerce.svg';
}

/**
 * Get project data by ID
 * In a real application, this would fetch data from a database or API
 */
function getProjectData(projectId) {
  const projects = {
    '1': {
      title: 'E-Commerce Microservices',
      description: 'A robust e-commerce platform built with a microservices architecture using Python and Django. The system handles product catalog, inventory management, user authentication, and order processing through separate services that communicate via REST APIs.',
      technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Docker', 'Redis', 'Celery'],
      features: [
        'Microservices architecture with separate concerns',
        'JWT authentication and authorization',
        'Asynchronous processing with Celery for order handling',
        'Advanced search functionality with ElasticSearch',
        'Comprehensive test suite with 90%+ coverage'
      ]
    },
    '2': {
      title: 'Real-time Chat Application',
      description: 'A real-time chat application built with Flask and WebSockets. This application supports private messaging, group chats, and real-time notifications. It uses Flask-SocketIO for WebSocket connections and Redis for message queuing and delivery.',
      technologies: ['Python', 'Flask', 'Flask-SocketIO', 'Redis', 'SQLAlchemy', 'JavaScript', 'HTMX'],
      features: [
        'Real-time messaging with WebSockets',
        'End-to-end message encryption',
        'User presence indicators',
        'Message read receipts',
        'File and image sharing capabilities',
        'Responsive UI with HTMX for dynamic updates'
      ]
    },
    '3': {
      title: 'Data Analysis Dashboard',
      description: 'A data visualization dashboard for business intelligence built with Django and Chart.js. This application ingests data from multiple sources, processes it with pandas, and presents it through interactive charts and graphs.',
      technologies: ['Python', 'Django', 'Pandas', 'NumPy', 'Chart.js', 'PostgreSQL', 'Celery'],
      features: [
        'Interactive data visualization with Chart.js',
        'Scheduled data imports from multiple sources',
        'Data manipulation and analysis with pandas',
        'Export capabilities to various formats (PDF, Excel, CSV)',
        'Custom report generation based on user criteria'
      ]
    },
    '4': {
      title: 'API Gateway Service',
      description: 'A high-performance API gateway service built with FastAPI that routes requests to appropriate microservices, handles authentication, rate limiting, and provides API documentation with OpenAPI. This service is a central component in a larger microservices ecosystem.',
      technologies: ['Python', 'FastAPI', 'Pydantic', 'Redis', 'Docker', 'JWT', 'OpenAPI'],
      features: [
        'Request routing to appropriate services',
        'Authentication and authorization',
        'Rate limiting and request throttling',
        'Request/response transformation',
        'Comprehensive logging and monitoring',
        'Auto-generated API documentation'
      ]
    },
    '5': {
      title: 'HTMX-Powered TODO Application',
      description: 'A modern TODO application built with Flask and HTMX for a SPA-like experience without complex JavaScript frameworks. This application demonstrates how server-side rendering can be combined with HTMX to create rich, interactive experiences.',
      technologies: ['Python', 'Flask', 'HTMX', 'SQLite', 'AlpineJS', 'TailwindCSS'],
      features: [
        'Real-time updates with HTMX',
        'Inline editing of tasks',
        'Drag-and-drop reordering',
        'Task categorization and filtering',
        'Responsive design that works on mobile devices',
        'Minimal JavaScript usage, mostly server-side processing'
      ]
    },
    '6': {
      title: 'Content Management System',
      description: 'A flexible content management system built with Django that supports custom content types, user roles, and workflows. This CMS is designed to be extended with plugins and can be used as a headless CMS with its RESTful API.',
      technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'React', 'Redis'],
      features: [
        'Custom content type definitions',
        'Advanced user permission system',
        'Content workflows and approval processes',
        'Version history and content rollbacks',
        'Content scheduling and publishing',
        'Headless CMS capabilities with REST API'
      ]
    }
  };
  
  return projects[projectId] || {
    title: 'Project Details',
    description: 'Project information not available.',
    technologies: [],
    features: []
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
  
  if (!typewriterElement) return;
  
  const phrases = [
    'Python Backend Developer',
    'Django Expert',
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
