// Load and render article
document.addEventListener('DOMContentLoaded', function() {
    // Get slug from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        document.getElementById('article-body').innerHTML = '<p>No article specified. <a href="index.html">Go back home</a>.</p>';
        return;
    }

    // Load articles.json to find the article
    fetch('articles.json', { cache: 'no-store' })
        .then(res => {
            if (!res.ok) throw new Error(`Failed to load articles.json (${res.status})`);
            return res.json();
        })
        .then(articles => {
            const article = articles.find(a => a.slug === slug);
            
            if (!article) {
                document.getElementById('article-body').innerHTML = '<p>Article not found. <a href="index.html">Go back home</a>.</p>';
                return;
            }

            // Check if article is published
            if (article.publish !== true && article.publish !== 'true') {
                document.getElementById('article-body').innerHTML = '<p>This article is not yet published. <a href="index.html">Go back home</a>.</p>';
                return;
            }

            // Update page metadata
            document.getElementById('article-title').textContent = `${article.title} - Kyle T. Jones`;
            document.getElementById('meta-title').content = `${article.title} - Kyle T. Jones`;
            document.getElementById('meta-description').content = article.description || article.excerpt || 'Article by Kyle T. Jones';
            document.getElementById('og-title').content = article.title;
            document.getElementById('og-description').content = article.description || article.excerpt || 'Article by Kyle T. Jones';
            document.getElementById('og-url').content = `https://kyletjones.com/article.html?slug=${slug}`;
            document.getElementById('twitter-title').content = article.title;
            document.getElementById('twitter-description').content = article.description || article.excerpt || 'Article by Kyle T. Jones';
            document.getElementById('twitter-url').content = `https://kyletjones.com/article.html?slug=${slug}`;

            // Update article heading
            document.getElementById('article-heading').textContent = article.title;

            // Update article meta
            const metaDiv = document.getElementById('article-meta');
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
            metaDiv.textContent = metaParts.join(' • ');

            // Load and render markdown content
            const markdownPath = article.path || `content/${article.type || 'posts'}/${article.filename || `${article.date || ''}-${slug}.md`}`;
            
            fetch(markdownPath, { cache: 'no-store' })
                .then(res => {
                    if (!res.ok) throw new Error(`Failed to load article: ${res.status}`);
                    return res.text();
                })
                .then(markdown => {
                    // Parse frontmatter if present
                    let content = markdown;
                    let frontMatter = {};
                    
                    if (markdown.startsWith('---')) {
                        const frontMatterEnd = markdown.indexOf('---', 3);
                        if (frontMatterEnd !== -1) {
                            const frontMatterText = markdown.substring(3, frontMatterEnd).trim();
                            content = markdown.substring(frontMatterEnd + 3).trim();
                            
                            // Simple YAML frontmatter parsing
                            frontMatterText.split('\n').forEach(line => {
                                const colonIndex = line.indexOf(':');
                                if (colonIndex > 0) {
                                    const key = line.substring(0, colonIndex).trim();
                                    let value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
                                    
                                    // Handle boolean values
                                    if (value.toLowerCase() === 'true') {
                                        value = true;
                                    } else if (value.toLowerCase() === 'false') {
                                        value = false;
                                    }
                                    
                                    frontMatter[key] = value;
                                }
                            });
                        }
                    }

            // Check frontmatter for publish flag (overrides articles.json if present)
            if (frontMatter.hasOwnProperty('publish')) {
                if (frontMatter.publish !== true && frontMatter.publish !== 'true') {
                    document.getElementById('article-body').innerHTML = '<p>This article is not yet published. <a href="index.html">Go back home</a>.</p>';
                    return;
                }
            }

                    // Render markdown to HTML using marked.js
                    if (typeof marked !== 'undefined') {
                        // Configure marked options
                        marked.setOptions({
                            breaks: true,
                            gfm: true
                        });
                        
                        const html = marked.parse(content);
                        document.getElementById('article-body').innerHTML = html;
                        
                        // Process images to use relative paths if needed
                        const articleBody = document.getElementById('article-body');
                        const images = articleBody.querySelectorAll('img');
                        images.forEach(img => {
                            if (img.src && !img.src.startsWith('http')) {
                                // Make image paths relative to site root
                                const imgSrc = img.getAttribute('src');
                                if (imgSrc.startsWith('./') || !imgSrc.startsWith('/')) {
                                    // Adjust path based on article location
                                    img.src = `assets/images/${imgSrc.replace('./', '')}`;
                                }
                            }
                        });
                    } else {
                        document.getElementById('article-body').innerHTML = '<p>Markdown parser not loaded. Please refresh the page.</p>';
                    }
                })
                .catch(err => {
                    console.error('Error loading article:', err);
                    document.getElementById('article-body').innerHTML = `<p>Error loading article: ${err.message}. <a href="index.html">Go back home</a>.</p>`;
                });
        })
        .catch(err => {
            console.error('Error loading articles index:', err);
            document.getElementById('article-body').innerHTML = `<p>Error loading articles: ${err.message}. <a href="index.html">Go back home</a>.</p>`;
        });
});

