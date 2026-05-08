// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.pillar-card, .service-card, .process-step, .about-text, .section-header'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const blueprintOverlay = document.querySelector('.blueprint-overlay');
    
    if (heroBackground && blueprintOverlay) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        blueprintOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter Animation for Statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Form Validation (if contact form is added)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Loading State Management
function showLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.classList.add('loading');
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    };
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--brushed-gold) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// Contact Form Handling with EmailJS
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    
    // Initialize EmailJS
    (function() {
        emailjs.init("YOUR_PUBLIC_KEY", {
            publicKey: "YOUR_PUBLIC_KEY"
        });
    })();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.pillar-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate form
    const errors = validateContactForm(data);
    
    if (errors.length > 0) {
        displayFormErrors(errors);
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.form-submit');
    const resetButton = showLoadingState(submitButton);
    
    // Send email using EmailJS
    const emailParams = {
        to_email: 'info@eduvisoryconsulting.com',
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        school: data.school || 'Not provided',
        service: getServiceName(data.service),
        message: data.message
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            showFormSuccess(form);
            
            // Reset form
            form.reset();
            
            // Reset button state
            resetButton();
            
            // Optional: Send to WhatsApp
            sendToWhatsApp(data);
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            showFormError(form, 'Failed to send message. Please try again or contact us directly.');
            
            // Reset button state
            resetButton();
        });
}

function validateContactForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
    }
    
    // Email validation
    if (!data.email || !isValidEmail(data.email)) {
        errors.push({ field: 'email', message: 'Please provide a valid email address' });
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push({ field: 'phone', message: 'Please provide a valid phone number' });
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation for Indian numbers
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function displayFormErrors(errors) {
    errors.forEach(error => {
        const formGroup = document.querySelector(`#${error.field}`).closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = error.message;
            formGroup.classList.add('error');
        }
    });
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const formGroups = document.querySelectorAll('.form-group');
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}

function showFormSuccess(form) {
    const successMessage = form.querySelector('.form-success');
    if (successMessage) {
        successMessage.style.display = 'flex';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function sendToWhatsApp(data) {
    const phoneNumber = '919100629646'; // The same number from the footer
    const message = encodeURIComponent(
        `New Contact Form Submission:\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || 'Not provided'}\n` +
        `School: ${data.school || 'Not provided'}\n` +
        `Service: ${getServiceName(data.service)}\n\n` +
        `Message:\n${data.message}`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

function getServiceName(serviceValue) {
    const services = {
        'new-school-setup': 'New School Setup Consulting',
        'school-sops': 'School SOPs & Policies',
        'teacher-training': 'Teacher Training Programs',
        'operations-advisory': 'School Operations Advisory',
        'general': 'General Inquiry'
    };
    
    return services[serviceValue] || 'Not specified';
}

// Error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'LINK') {
        console.warn(`Failed to load resource: ${e.target.src || e.target.href}`);
    }
});

// Performance optimization - Lazy loading for images (if images are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

console.log('Eduvisory Consulting website loaded successfully!');
