// Rotating Background Images for Hero Section - Specific School/Student/Classroom
const heroBackgroundImages = [
    'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/542883/pexels-photo-542883.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/836722/pexels-photo-836722.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/5212652/pexels-photo-5212652.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6',
    'https://images.pexels.com/photos/5373290/pexels-photo-5373290.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&sat=0.6'
];

let currentImageIndex = 0;
let isTransitioning = false;
const heroBackground = document.querySelector('.hero-background');

function rotateHeroBackground() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Create sophisticated transition with scale and blur effects
    heroBackground.style.transform = 'scale(1.1)';
    heroBackground.style.filter = 'blur(8px)';
    heroBackground.style.opacity = '0.3';
    
    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % heroBackgroundImages.length;
        const nextImage = new Image();
        nextImage.onload = function() {
            heroBackground.style.backgroundImage = `url('${heroBackgroundImages[currentImageIndex]}')`;
            
            // Sophisticated fade in with reverse effects
            setTimeout(() => {
                heroBackground.style.transform = 'scale(1)';
                heroBackground.style.filter = 'blur(0px)';
                heroBackground.style.opacity = '1';
                
                setTimeout(() => {
                    isTransitioning = false;
                }, 800);
            }, 100);
        };
        nextImage.src = heroBackgroundImages[currentImageIndex];
    }, 600);
}

// Initialize with first image
window.addEventListener('load', () => {
    if (heroBackground) {
        heroBackground.style.backgroundImage = `url('${heroBackgroundImages[0]}')`;
        heroBackground.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        heroBackground.style.transform = 'scale(1)';
        heroBackground.style.filter = 'blur(0px)';
        heroBackground.style.opacity = '1';
        
        // Start rotation after 3 seconds
        setTimeout(() => {
            setInterval(rotateHeroBackground, 6000);
        }, 3000);
    }
});

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

// Contact Form Handling with Web3Forms
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    
    // Initialize Web3Forms
    if (typeof w3f !== 'undefined') {
        w3f.init({
            formId: 'YOUR_FORM_ID'
        });
    }
    
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
    
    // Web3Forms handles submission automatically
    // Just show success message after form submission
    setTimeout(() => {
        // Show success message
        showFormSuccess(form);
        
        // Reset form
        form.reset();
        
        // Reset button state
        resetButton();
        
        // Optional: Send to WhatsApp
        sendToWhatsApp(data);
        
    }, 2000);
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

// Blog Article Display Function
function showBlogArticle(articleId) {
    const articles = {
        'school-growth': {
            title: '5 Essential Strategies for School Growth in 2026',
            content: `
                <h2>5 Essential Strategies for School Growth in 2026</h2>
                <p><strong>Introduction:</strong> In today's competitive educational landscape, schools need strategic approaches to achieve sustainable growth. Based on our experience working with over 100+ educational institutions, we've identified five key strategies that successful schools are implementing.</p>
                
                <h3>1. Digital Transformation Integration</h3>
                <p>Schools that successfully integrate digital tools see 40% higher student engagement rates. This includes implementing learning management systems, digital assessment tools, and parent communication platforms.</p>
                
                <h3>2. Teacher Development Programs</h3>
                <p>Investing in continuous teacher training leads to 25% improvement in student outcomes. Focus on modern teaching methodologies, classroom management, and subject-specific training.</p>
                
                <h3>3. Data-Driven Decision Making</h3>
                <p>Schools using educational data analytics make better-informed decisions about curriculum, resource allocation, and student support interventions.</p>
                
                <h3>4. Community Engagement</h3>
                <p>Strong parent and community involvement correlates with higher student achievement and school reputation. Regular communication, parent workshops, and community events are essential.</p>
                
                <h3>5. Brand Building and Marketing</h3>
                <p>Professional branding and strategic marketing help schools attract quality students and build long-term reputation in the education sector.</p>
                
                <p><strong>Conclusion:</strong> Implementing these strategies requires careful planning and execution. Eduvisory Consulting helps schools develop customized growth plans based on their unique needs and goals.</p>
            `
        },
        'teacher-training': {
            title: 'Transforming Teaching: Modern Training Approaches',
            content: `
                <h2>Transforming Teaching: Modern Training Approaches</h2>
                <p><strong>Introduction:</strong> The educational landscape is rapidly evolving, and teacher training must adapt to meet new challenges. Modern approaches focus on practical skills, technology integration, and student-centered learning methodologies.</p>
                
                <h3>Blended Learning Methodologies</h3>
                <p>Teachers today must master both traditional classroom techniques and digital teaching tools. Blended learning combines face-to-face instruction with online resources, creating a more engaging learning environment.</p>
                
                <h3>Assessment and Feedback Strategies</h3>
                <p>Modern assessment goes beyond traditional tests. Teachers need skills in formative assessment, project-based evaluation, and providing constructive feedback that drives student improvement.</p>
                
                <h3>Classroom Management 2.0</h3>
                <p>Today's classrooms require innovative management approaches that respect student autonomy while maintaining productive learning environments. This includes conflict resolution, inclusive teaching practices, and emotional intelligence.</p>
                
                <h3>Technology Integration</h3>
                <p>Teachers must be comfortable with educational technology tools, learning management systems, and digital content creation. This includes understanding data privacy and digital citizenship.</p>
                
                <h3>Professional Learning Communities</h3>
                <p>Collaborative learning among teachers creates a culture of continuous improvement. Professional learning communities provide support, share best practices, and foster innovation.</p>
                
                <p><strong>Conclusion:</strong> Effective teacher training is an ongoing process, not a one-time event. Schools that invest in continuous professional development see significant improvements in teaching quality and student outcomes.</p>
            `
        },
        'digital-learning': {
            title: 'Digital Transformation in Education: A Complete Guide',
            content: `
                <h2>Digital Transformation in Education: A Complete Guide</h2>
                <p><strong>Introduction:</strong> Digital transformation is no longer optional for schools—it's essential for survival and growth. This comprehensive guide helps educational institutions navigate the digital landscape successfully.</p>
                
                <h3>Infrastructure Development</h3>
                <p>The foundation of digital transformation includes reliable internet connectivity, adequate device access, and robust network security. Schools need to invest in hardware, software, and technical support.</p>
                
                <h3>Learning Management Systems</h3>
                <p>Modern LMS platforms streamline course delivery, assignment management, and student progress tracking. Choose systems that integrate with existing tools and scale with your needs.</p>
                
                <h3>Digital Curriculum Development</h3>
                <p>Transform traditional curriculum into engaging digital content. This includes interactive lessons, multimedia resources, and adaptive learning paths that cater to different learning styles.</p>
                
                <h3>Teacher Training and Support</h3>
                <p>Teachers need comprehensive training and ongoing support to effectively use digital tools. Provide professional development, technical assistance, and peer mentoring programs.</p>
                
                <h3>Data Security and Privacy</h3>
                <p>Protect student data and ensure compliance with educational privacy regulations. Implement robust security measures and establish clear data governance policies.</p>
                
                <h3>Parent and Student Portals</h3>
                <p>Create dedicated portals for parents and students to access grades, assignments, and communication tools. This improves transparency and engagement.</p>
                
                <p><strong>Conclusion:</strong> Digital transformation is a journey, not a destination. Start with a clear strategy, prioritize based on impact and feasibility, and continuously evaluate and adjust your approach.</p>
            `
        },
        'leadership': {
            title: 'Building Strong Educational Leadership Teams',
            content: `
                <h2>Building Strong Educational Leadership Teams</h2>
                <p><strong>Introduction:</strong> Effective leadership is the cornerstone of educational excellence. Strong leadership teams drive school improvement, teacher satisfaction, and student success.</p>
                
                <h3>Vision and Mission Development</h3>
                <p>Great leaders articulate a clear vision that inspires stakeholders and guides decision-making. This involves collaborative goal-setting and regular review of progress toward objectives.</p>
                
                <h3>Distributed Leadership Models</h3>
                <p>Modern educational leadership isn't about top-down control. Distributed leadership empowers teachers, staff, and even students to take ownership of school improvement initiatives.</p>
                
                <h3>Communication Excellence</h3>
                <p>Effective leaders communicate clearly, consistently, and compassionately. This includes regular updates, active listening, and creating channels for feedback and dialogue.</p>
                
                <h3>Change Management</h3>
                <p>Educational leaders must navigate constant change while maintaining stability. This requires strategic planning, stakeholder engagement, and flexibility in implementation.</p>
                
                <h3>Professional Development Leadership</h3>
                <p>Leaders must champion continuous learning for themselves and their staff. This includes identifying training needs, providing resources, and modeling lifelong learning behaviors.</p>
                
                <h3>Community Relationship Building</h3>
                <p>Strong leaders build bridges with parents, community organizations, and educational partners. These relationships provide resources, support, and opportunities for students.</p>
                
                <p><strong>Conclusion:</strong> Educational leadership is both an art and a science. Invest in leadership development, create supportive structures, and celebrate leadership successes throughout your organization.</p>
            `
        },
        'student-success': {
            title: 'Data-Driven Approaches to Student Success',
            content: `
                <h2>Data-Driven Approaches to Student Success</h2>
                <p><strong>Introduction:</strong> Educational data provides powerful insights into student learning, allowing schools to personalize instruction and improve outcomes. Learn how to leverage data effectively.</p>
                
                <h3>Academic Performance Monitoring</h3>
                <p>Track student progress through regular assessments, standardized tests, and classroom performance data. Use this information to identify learning gaps and intervention needs.</p>
                
                <h3>Attendance and Engagement Analytics</h3>
                <p>Monitor attendance patterns, participation rates, and engagement indicators. Early identification of disengagement allows for timely interventions.</p>
                
                <h3>Behavioral and Social-Emotional Data</h3>
                <p>Collect data on student behavior, social interactions, and emotional well-being. This holistic view supports comprehensive student development.</p>
                
                <h3>Learning Analytics Platforms</h3>
                <p>Implement systems that track student interactions with digital learning resources. This data helps identify learning preferences and effective teaching strategies.</p>
                
                <h3>Predictive Analytics for Early Intervention</h3>
                <p>Use statistical models to predict students at risk of academic difficulties. Early warning systems enable proactive support before problems escalate.</p>
                
                <h3>Data-Informed Instructional Planning</h3>
                <p>Teachers should use assessment data to differentiate instruction, adjust pacing, and select appropriate teaching strategies for diverse learner needs.</p>
                
                <p><strong>Conclusion:</strong> Data-driven decision making transforms educational outcomes. Invest in data systems, train staff in data analysis, and create a culture that uses evidence to guide practice.</p>
            `
        },
        'curriculum': {
            title: 'Curriculum Design for 21st Century Learning',
            content: `
                <h2>Curriculum Design for 21st Century Learning</h2>
                <p><strong>Introduction:</strong> Modern curriculum design must prepare students for an uncertain future while maintaining academic rigor and educational excellence.</p>
                
                <h3>Core Competencies Integration</h3>
                <p>21st century skills—critical thinking, creativity, collaboration, and communication—should be integrated across all subject areas, not taught in isolation.</p>
                
                <h3>Project-Based Learning Framework</h3>
                <p>Design curriculum around meaningful projects that connect to real-world applications. This approach increases engagement and develops practical skills.</p>
                
                <h3>Interdisciplinary Connections</h3>
                <p>Break down subject silos by creating interdisciplinary units that show how different fields of knowledge connect and interact.</p>
                
                <h3>Technology Integration</h3>
                <p>Curriculum should naturally incorporate digital tools and resources. This includes digital literacy, computational thinking, and responsible technology use.</p>
                
                <h3>Personalized Learning Paths</h3>
                <p>Design curriculum that allows for student choice and differentiation based on learning styles, interests, and readiness levels.</p>
                
                <h3>Assessment Alignment</h3>
                <p>Ensure that assessments directly measure intended learning outcomes. Use varied assessment methods to capture different types of learning and skills.</p>
                
                <h3>Cultural Relevance and Global Perspectives</h3>
                <p>Curriculum should reflect diverse perspectives and prepare students for global citizenship. Include multicultural content and international viewpoints.</p>
                
                <p><strong>Conclusion:</strong> Curriculum design is an ongoing process of refinement and improvement. Regularly review outcomes, gather stakeholder feedback, and adjust to meet changing student needs.</p>
            `
        }
    };
    
    const article = articles[articleId];
    if (!article) return;
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'blog-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="blog-modal">
            <div class="blog-modal-content">
                <button class="blog-modal-close" onclick="closeBlogModal()">&times;</button>
                <div class="blog-modal-body">
                    ${article.content}
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modalOverlay);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeBlogModal();
        }
    });
}

function closeBlogModal() {
    const modalOverlay = document.querySelector('.blog-modal-overlay');
    if (modalOverlay) {
        modalOverlay.remove();
        document.body.style.overflow = '';
    }
}

console.log('Eduvisory Consulting website loaded successfully!');
