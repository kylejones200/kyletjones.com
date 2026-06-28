// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
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
        // Fallback list (used if projects.json fails to load)
        const fallbackProjects = [
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
                meta: 'Open Source',
                description: 'Companion site for the Python stats package with docs/examples.'
            },
            {
                title: 'pygeomodeling (GitHub)',
                url: 'https://github.com/kylejones200/pygeomodeling',
                icon: '🗺️',
                meta: 'Open Source',
                description: 'Geospatial modeling experiments and utilities in Python (repository).'
            },
            {
                title: 'pygeomodeling (Docs)',
                url: 'https://kylejones200.github.io/pygeomodeling/',
                icon: '🗺️',
                meta: 'Open Source',
                description: 'Geospatial modeling experiments and utilities in Python (documentation).'
            },
            {
                title: 'pydca',
                url: 'https://kylejones200.github.io/pydca/',
                icon: '📈',
                meta: 'Open Source',
                description: 'Data-centric analysis tools and notebooks.'
            },
            {
                title: 'PM Simulation',
                url: 'https://kylejones200.github.io/pm_simulation/',
                icon: '🧩',
                meta: 'Personal Project',
                description: 'Interactive simulation for project management scenarios.'
            },
            {
                title: 'PM Earned Value',
                url: 'https://kylejones200.github.io/pm_earned_value/',
                icon: '📊',
                meta: 'Personal Project',
                description: 'Tools and visualizations for earned value management.'
            }
        ];

        function renderProjects(projects) {
            projectsGrid.innerHTML = '';
            projects.forEach(p => {
                const item = document.createElement('div');
                item.className = 'writing-item';

                const contentDiv = document.createElement('div');
                contentDiv.className = 'writing-content';

                const h3 = document.createElement('h3');
                h3.textContent = p.title || 'Untitled Project';

                const meta = document.createElement('p');
                meta.className = 'writing-meta';
                meta.textContent = p.meta || '';

                const desc = document.createElement('p');
                desc.textContent = p.description || '';

                // Handle both new nested URLs format and old single URL format (backwards compatibility)
                let links = [];
                if (p.urls) {
                    // New format: nested URLs object
                    if (p.urls.github) {
                        links.push({ url: p.urls.github, label: 'GitHub →', type: 'github' });
                    }
                    if (p.urls.pypi) {
                        links.push({ url: p.urls.pypi, label: 'PyPI →', type: 'pypi' });
                    }
                    if (p.urls.docs) {
                        links.push({ url: p.urls.docs, label: 'Docs →', type: 'docs' });
                    }
                } else if (p.url) {
                    // Old format: single URL (backwards compatibility)
                    links.push({ url: p.url, label: 'Open →', type: 'link' });
                }

                // Create links container
                const linksContainer = document.createElement('div');
                if (links.length > 1) {
                    linksContainer.className = 'project-links';
                }

                links.forEach(linkData => {
                    const link = document.createElement('a');
                    link.href = linkData.url;
                    link.target = '_blank';
                    link.className = 'btn btn-outline';
                    link.textContent = linkData.label;
                    link.setAttribute('aria-label', `Open ${linkData.type} for ${p.title} in a new tab`);
                    link.rel = 'noopener noreferrer';
                    linksContainer.appendChild(link);
                });

                contentDiv.appendChild(h3);
                if (meta.textContent) contentDiv.appendChild(meta);
                if (desc.textContent) contentDiv.appendChild(desc);
                if (links.length > 0) {
                    contentDiv.appendChild(linksContainer);
                }

                item.appendChild(contentDiv);

                projectsGrid.appendChild(item);
            });
        }

        // Try to load from projects.json; fallback to hardcoded list on error
        fetch('projects.json', { cache: 'no-store' })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length) {
                    renderProjects(data);
                } else {
                    renderProjects(fallbackProjects);
                }
            })
            .catch(() => {
                renderProjects(fallbackProjects);
            });
    }

    // Render Videos (Systems I've Built) dynamically
    const videosGrid = document.getElementById('videos-grid');
    if (videosGrid) {
        const channelUrl = 'https://www.youtube.com/user/kyletjones3/videos';

        const fallbackVideos = [
            {
                title: 'Wind Turbine Predictive Maintenance on Databricks',
                label: 'Cloud data platform demo for time-series analytics, reliability workflows, and applied machine learning.',
                url: 'https://www.youtube.com/watch?v=qVax9iP24r8',
                thumbnail: 'https://i.ytimg.com/vi/qVax9iP24r8/hqdefault.jpg'
            },
            {
                title: 'Predictive Maintenance App',
                label: 'Industrial AI demo for asset monitoring, operational signals, and maintenance decisions.',
                url: channelUrl
            },
            {
                title: 'Crude Assay Project',
                label: 'Energy data product demo for crude characterization, refinery context, and decision support.',
                url: channelUrl
            }
        ];

        function renderVideos(videos) {
            videosGrid.innerHTML = '';
            videos.forEach(v => {
                const card = document.createElement('a');
                card.className = 'video-card';
                card.href = v.url || channelUrl;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
                card.setAttribute('aria-label', `Watch ${v.title || 'demo'} on YouTube in a new tab`);

                const thumb = document.createElement('div');
                thumb.className = 'video-thumb';
                if (v.thumbnail) {
                    const img = document.createElement('img');
                    img.src = v.thumbnail;
                    img.alt = '';
                    img.loading = 'lazy';
                    thumb.appendChild(img);
                } else {
                    thumb.classList.add('video-thumb-placeholder');
                }
                const play = document.createElement('span');
                play.className = 'video-play';
                play.setAttribute('aria-hidden', 'true');
                play.textContent = '▶';
                thumb.appendChild(play);

                const content = document.createElement('div');
                content.className = 'video-content';

                const h3 = document.createElement('h3');
                h3.textContent = v.title || 'Untitled Demo';

                const label = document.createElement('p');
                label.textContent = v.label || '';

                content.appendChild(h3);
                if (label.textContent) content.appendChild(label);

                card.appendChild(thumb);
                card.appendChild(content);
                videosGrid.appendChild(card);
            });
        }

        fetch('videos.json', { cache: 'no-store' })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load videos.json (${res.status})`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length) {
                    renderVideos(data);
                } else {
                    renderVideos(fallbackVideos);
                }
            })
            .catch(() => {
                renderVideos(fallbackVideos);
            });
    }

    // Render Articles dynamically
    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        function renderArticles(articles) {
            articlesGrid.innerHTML = '';

            // Only published articles (publish: true)
            const publishedArticles = (articles || []).filter(article => article.publish === true || article.publish === 'true');

            // No live essays yet — hide the whole section rather than show a placeholder.
            if (publishedArticles.length === 0) {
                const section = document.getElementById('articles');
                if (section) section.style.display = 'none';
                return;
            }

            // Sort articles by date (newest first)
            const sortedArticles = [...publishedArticles].sort((a, b) => {
                const dateA = new Date(a.date || '1970-01-01');
                const dateB = new Date(b.date || '1970-01-01');
                return dateB - dateA;
            });

            sortedArticles.forEach(article => {
                const item = document.createElement('div');
                item.className = 'article-item';

                const contentDiv = document.createElement('div');
                contentDiv.className = 'article-item-content';

                const h3 = document.createElement('h3');
                h3.textContent = article.title || 'Untitled Article';

                const meta = document.createElement('p');
                meta.className = 'article-item-meta';
                
                const metaParts = [];
                if (article.date) {
                    const date = new Date(article.date);
                    metaParts.push(date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
                }
                if (article.type) {
                    metaParts.push(article.type);
                }
                if (article.category) {
                    metaParts.push(article.category);
                }
                meta.textContent = metaParts.join(' • ');

                const desc = document.createElement('p');
                desc.className = 'article-item-description';
                desc.textContent = article.description || article.excerpt || '';

                const link = document.createElement('a');
                link.className = 'btn btn-outline';
                if (article.url) {
                    // External (e.g. Medium) article — open in a new tab
                    link.href = article.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.textContent = article.source ? `Read on ${article.source} →` : 'Read Article →';
                    link.setAttribute('aria-label', `Read ${article.title || 'article'}${article.source ? ' on ' + article.source : ''} in a new tab`);
                } else {
                    link.href = `article.html?slug=${encodeURIComponent(article.slug)}`;
                    link.textContent = 'Read Article →';
                    link.setAttribute('aria-label', `Read ${article.title || 'article'}`);
                }

                contentDiv.appendChild(h3);
                if (meta.textContent) contentDiv.appendChild(meta);
                if (desc.textContent) contentDiv.appendChild(desc);
                contentDiv.appendChild(link);

                item.appendChild(contentDiv);
                articlesGrid.appendChild(item);
            });
        }

        // Load articles from articles.json
        fetch('articles.json', { cache: 'no-store' })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load articles.json (${res.status})`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    renderArticles(data);
                } else {
                    renderArticles([]);
                }
            })
            .catch(() => {
                renderArticles([]);
            });
    }

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section-title, .hero-content, .about-content, .skill-item, .writing-item, .article-item, .video-card, .domain-chips, .proof-bar, .contact-content');
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

});
