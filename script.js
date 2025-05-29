
// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
  // Add animation classes to elements
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    header.classList.add('fade-in');
    observer.observe(header);
  });

  const solutionCards = document.querySelectorAll('.solution-card');
  solutionCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  const industryCards = document.querySelectorAll('.industry-card');
  industryCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  const caseStudyCards = document.querySelectorAll('.case-study-card');
  caseStudyCards.forEach((card, index) => {
    card.classList.add('slide-in-left');
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
  });

  const aboutText = document.querySelector('.about-text');
  const aboutValues = document.querySelector('.about-values');
  if (aboutText && aboutValues) {
    aboutText.classList.add('slide-in-left');
    aboutValues.classList.add('slide-in-right');
    observer.observe(aboutText);
    observer.observe(aboutValues);
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.classList.add('fade-in');
    observer.observe(contactForm);
  }
});

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typewriter effect
window.addEventListener('load', () => {
  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typeWriter(typewriterElement, text, 80);
  }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Form validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm(formData) {
  const errors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  return errors;
}

function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorElement = field.parentElement.querySelector('.error-message');
  
  field.style.borderColor = '#e53e3e';
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

function clearError(fieldName) {
  const field = document.getElementById(fieldName);
  const errorElement = field.parentElement.querySelector('.error-message');
  
  field.style.borderColor = '#e2e8f0';
  errorElement.classList.remove('show');
}

function clearAllErrors() {
  const fields = ['name', 'email', 'message'];
  fields.forEach(clearError);
}

// Real-time validation
document.getElementById('name').addEventListener('input', () => clearError('name'));
document.getElementById('email').addEventListener('input', () => clearError('email'));
document.getElementById('message').addEventListener('input', () => clearError('message'));

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  clearAllErrors();
  
  const errors = validateForm(formData);
  
  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([field, message]) => {
      showError(field, message);
    });
    return;
  }
  
  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    contactForm.style.opacity = '0';
    contactForm.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      successMessage.classList.add('show');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
        contactForm.reset();
        contactForm.style.opacity = '1';
        contactForm.style.transform = 'scale(1)';
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 3000);
    }, 300);
  }, 1500);
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground) {
    const speed = scrolled * 0.5;
    heroBackground.style.transform = `translateY(${speed}px)`;
  }
});

// Add loading animation to page
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Enhanced hover effects for cards
document.querySelectorAll('.solution-card, .industry-card, .case-study-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add smooth reveal animation for elements
function revealElements() {
  const elements = document.querySelectorAll('.fade-in:not(.visible), .slide-in-left:not(.visible), .slide-in-right:not(.visible)');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealElements);

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
  revealElements();
  updateActiveNavLink();
});

// Console welcome message
console.log('%c🚀 Welcome to Grad Vec AI!', 'color: #00c897; font-size: 24px; font-weight: bold;');
console.log('%cTransforming Data into Intelligence', 'color: #002244; font-size: 16px;');
