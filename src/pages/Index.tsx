
import React, { useEffect, useRef } from 'react';

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    const toggleMenu = () => {
      hamburger?.classList.toggle('active');
      navMenu?.classList.toggle('active');
    };

    hamburger?.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
      });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (this as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Hero typewriter effect
    const typewriterText = "Transforming Data into Intelligence";
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
      let i = 0;
      const typeWriter = () => {
        if (i < typewriterText.length) {
          typewriterElement.textContent += typewriterText.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(() => {
        typewriterElement.textContent = '';
        typeWriter();
      }, 500);
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = (document.getElementById('name') as HTMLInputElement).value.trim();
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();
        
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
          error.textContent = '';
        });
        
        if (!name) {
          const nameError = document.querySelector('#name + .error-message');
          if (nameError) nameError.textContent = 'Name is required';
          isValid = false;
        }
        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          const emailError = document.querySelector('#email + .error-message');
          if (emailError) emailError.textContent = 'Valid email is required';
          isValid = false;
        }
        
        if (!message) {
          const messageError = document.querySelector('#message + .error-message');
          if (messageError) messageError.textContent = 'Message is required';
          isValid = false;
        }
        
        if (isValid) {
          // Hide form and show success message
          contactForm.style.display = 'none';
          successMessage?.classList.add('show');
        }
      });
    }

    // Cleanup function
    return () => {
      hamburger?.removeEventListener('click', toggleMenu);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/lovable-uploads/1a81ddf7-1f67-41b3-86a3-79cd76fa6979.png" alt="Grad Vec AI Logo" className="logo-image" />
            <span className="logo-text">Grad Vec AI</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#solutions" className="nav-link">Solutions</a></li>
            <li><a href="#industries" className="nav-link">Industries</a></li>
            <li><a href="#case-studies" className="nav-link">Case Studies</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#contact" className="nav-link contact-btn">Contact</a></li>
          </ul>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-background"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="typewriter"></span>
            </h1>
            <p className="hero-subtitle">
              Grad Vec AI helps organizations embed AI to drive real results
            </p>
            <div className="hero-buttons">
              <a href="#solutions" className="btn btn-primary">Explore Our Solutions</a>
              <a href="#contact" className="btn btn-outline">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions Section */}
      <section id="solutions" className="solutions">
        <div className="container">
          <div className="section-header">
            <h2>AI Solutions</h2>
            <p>Comprehensive AI services tailored to your business needs</p>
          </div>
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="card-icon">🎯</div>
              <h3>AI Strategy & Roadmapping</h3>
              <p>Develop comprehensive AI strategies aligned with your business objectives and technical capabilities.</p>
            </div>
            <div className="solution-card">
              <div className="card-icon">🧠</div>
              <h3>Custom AI Model Development</h3>
              <p>Build tailored machine learning models designed specifically for your unique use cases and data.</p>
            </div>
            <div className="solution-card">
              <div className="card-icon">⚡</div>
              <h3>AI Automation</h3>
              <p>Automate repetitive tasks and workflows to increase efficiency and reduce operational costs.</p>
            </div>
            <div className="solution-card">
              <div className="card-icon">📊</div>
              <h3>AI-Driven Analytics</h3>
              <p>Transform raw data into actionable insights with advanced analytics and predictive modeling.</p>
            </div>
            <div className="solution-card">
              <div className="card-icon">💬</div>
              <h3>Chatbots & NLP Interfaces</h3>
              <p>Create intelligent conversational interfaces that understand and respond naturally to users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="industries">
        <div className="container">
          <div className="section-header">
            <h2>Industries We Serve</h2>
            <p>Delivering AI solutions across diverse sectors</p>
          </div>
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon">🏭</div>
              <h3>Manufacturing</h3>
              <p>Optimize production, quality control, and supply chain management</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">🏥</div>
              <h3>Healthcare</h3>
              <p>Enhance patient care, diagnostics, and operational efficiency</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">💰</div>
              <h3>Finance</h3>
              <p>Improve risk assessment, fraud detection, and investment strategies</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">🛒</div>
              <h3>Retail</h3>
              <p>Personalize customer experiences and optimize inventory management</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">🚚</div>
              <h3>Logistics</h3>
              <p>Streamline operations, route optimization, and demand forecasting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="case-studies">
        <div className="container">
          <div className="section-header">
            <h2>Case Studies</h2>
            <p>Real-world success stories from our AI implementations</p>
          </div>
          <div className="case-studies-grid">
            <div className="case-study-card">
              <div className="case-study-header">
                <h3>Manufacturing Efficiency Boost</h3>
                <span className="case-study-tag">Manufacturing</span>
              </div>
              <p>Implemented predictive maintenance AI that reduced equipment downtime by 40% and increased overall production efficiency by 25% for a leading automotive manufacturer.</p>
              <div className="case-study-metrics">
                <div className="metric">
                  <span className="metric-value">40%</span>
                  <span className="metric-label">Downtime Reduction</span>
                </div>
                <div className="metric">
                  <span className="metric-value">25%</span>
                  <span className="metric-label">Efficiency Increase</span>
                </div>
              </div>
            </div>
            <div className="case-study-card">
              <div className="case-study-header">
                <h3>Healthcare Diagnostic Enhancement</h3>
                <span className="case-study-tag">Healthcare</span>
              </div>
              <p>Developed an AI-powered diagnostic assistant that improved early disease detection accuracy by 30% while reducing diagnosis time by 50% in clinical settings.</p>
              <div className="case-study-metrics">
                <div className="metric">
                  <span className="metric-value">30%</span>
                  <span className="metric-label">Accuracy Improvement</span>
                </div>
                <div className="metric">
                  <span className="metric-value">50%</span>
                  <span className="metric-label">Time Reduction</span>
                </div>
              </div>
            </div>
            <div className="case-study-card">
              <div className="case-study-header">
                <h3>Financial Risk Management</h3>
                <span className="case-study-tag">Finance</span>
              </div>
              <p>Created a sophisticated fraud detection system that identified 95% of fraudulent transactions while reducing false positives by 60% for a major financial institution.</p>
              <div className="case-study-metrics">
                <div className="metric">
                  <span className="metric-value">95%</span>
                  <span className="metric-label">Fraud Detection</span>
                </div>
                <div className="metric">
                  <span className="metric-value">60%</span>
                  <span className="metric-label">False Positive Reduction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-header">
                <h2>About Grad Vec AI</h2>
                <p>Empowering organizations with intelligent solutions</p>
              </div>
              <div className="about-description">
                <p>At Grad Vec AI, we believe that artificial intelligence should be accessible, practical, and transformative. Our mission is to bridge the gap between cutting-edge AI technology and real-world business applications.</p>
                <p>Founded by a team of experienced data scientists, engineers, and business strategists, we combine deep technical expertise with practical business acumen to deliver AI solutions that drive measurable results.</p>
                <p>We're committed to ethical AI development, ensuring that our solutions not only improve efficiency and decision-making but also respect privacy, fairness, and transparency.</p>
              </div>
            </div>
            <div className="about-values">
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <h3>Precision</h3>
                <p>We deliver targeted AI solutions that address your specific challenges with surgical precision.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🚀</div>
                <h3>Innovation</h3>
                <p>We stay at the forefront of AI research to bring you the most advanced and effective technologies.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h3>Partnership</h3>
                <p>We work as an extension of your team, ensuring long-term success and continuous improvement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p>Ready to transform your business with AI? Let's start the conversation.</p>
          </div>
          <div className="contact-content">
            <form id="contact-form" className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" required />
                <span className="error-message"></span>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
                <span className="error-message"></span>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows={5} required></textarea>
                <span className="error-message"></span>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
            <div id="success-message" className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for your interest. We'll get back to you within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/lovable-uploads/1a81ddf7-1f67-41b3-86a3-79cd76fa6979.png" alt="Grad Vec AI Logo" className="footer-logo" />
              <span className="logo-text">Grad Vec AI</span>
              <p>Transforming Data into Intelligence</p>
            </div>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#solutions">Solutions</a>
              <a href="#industries">Industries</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Grad Vec AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
