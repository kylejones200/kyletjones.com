// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved dark mode preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Render Projects dynamically
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        const projects = [
            {
                title: 'Education',
                url: 'https://kylejones200.github.io/education/',
                icon: '🎓',
                meta: 'Personal Project',
                description: 'Notes, resources, and experiments in learning design.'
            },
            {
                title: 'Our Table',
                url: 'https://kylejones200.github.io/our_table/',
                icon: '🍽️',
                meta: 'Personal Project',
                description: 'A small project exploring community and conversation prompts.'
            },
            {
                title: 'ML4U',
                url: 'https://kylejones200.github.io/ml4u/',
                icon: '🤖',
                meta: 'Personal Project',
                description: 'Machine learning resources and utilities for practical use.'
            },
            {
                title: '48 Hours',
                url: 'https://kylejones200.github.io/48_hours/',
                icon: '⏱️',
                meta: 'Personal Project',
                description: 'Rapid prototyping challenges completed in two days.'
            },
            {
                title: 'real-simple-stats',
                url: 'https://kylejones200.github.io/real_simple_stats/',
                icon: '🐍',
                meta: 'Personal Project',
                description: 'Companion site for the Python stats package with docs/examples.'
            },
            {
                title: 'pygeomodeling',
                url: 'https://kylejones200.github.io/pygeomodeling/',
                icon: '🗺️',
                meta: 'Personal Project',
                description: 'Geospatial modeling experiments and utilities in Python.'
            },
            {
                title: 'pydca',
                url: 'https://kylejones200.github.io/pydca/',
                icon: '📈',
                meta: 'Personal Project',
                description: 'Data-centric analysis tools and notebooks.'
            }
        ];

        projects.forEach(p => {
            const item = document.createElement('div');
            item.className = 'writing-item';

            const iconDiv = document.createElement('div');
            iconDiv.className = 'writing-icon';
            iconDiv.textContent = p.icon;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'writing-content';

            const h3 = document.createElement('h3');
            h3.textContent = p.title;

            const meta = document.createElement('p');
            meta.className = 'writing-meta';
            meta.textContent = p.meta;

            const desc = document.createElement('p');
            desc.textContent = p.description;

            const link = document.createElement('a');
            link.href = p.url;
            link.target = '_blank';
            link.className = 'btn btn-outline';
            link.textContent = 'Open →';
            link.setAttribute('aria-label', `Open project ${p.title} in a new tab`);
            link.rel = 'noopener noreferrer';

            contentDiv.appendChild(h3);
            contentDiv.appendChild(meta);
            contentDiv.appendChild(desc);
            contentDiv.appendChild(link);

            item.appendChild(iconDiv);
            item.appendChild(contentDiv);

            projectsGrid.appendChild(item);
        });
    }

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section-title, .hero-content, .about-content, .skill-item, .writing-item, .contact-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create mailto link with form data
            const subject = encodeURIComponent(`Message from ${name} via kyletjones.com`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:kyle@kyletjones.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showFormMessage('Thank you! Your email client should open with the message ready to send.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // For now, just show a message (you can integrate with a newsletter service later)
            showFormMessage('Thanks for your interest! Newsletter signup will be available soon.', 'info');
            
            // Reset form
            this.reset();
        });
    }

    // Form message display
    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        // Accessibility: announce via screen readers
        messageDiv.setAttribute('role', 'status');
        messageDiv.setAttribute('aria-live', 'polite');
        messageDiv.setAttribute('aria-atomic', 'true');
        
        // Find the form that was submitted
        const activeForm = document.activeElement.closest('form');
        if (activeForm) {
            activeForm.appendChild(messageDiv);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }

    // Typing animation for hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            // No animation; render immediately
            heroName.textContent = text;
            heroName.style.borderRight = 'none';
        } else {
            heroName.textContent = '';
            heroName.style.borderRight = '2px solid white';

            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    heroName.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        heroName.style.borderRight = 'none';
                    }, 1000);
                }
            }

            // Start typing animation after a short delay
            setTimeout(typeWriter, 1000);
        }
    }
});
