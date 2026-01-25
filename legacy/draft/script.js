/**
 * Portfolio Application
 * Handles all JavaScript functionality for the legacy portfolio
 */

// ========== Configuration ==========
const CONFIG = {
    cvPath: './cv.json', // Local path - not root
    formEndpoint: 'https://formsubmit.co/ajax/narainkarthik812@gmail.com',
    iconCDN: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons',
    scrollOffset: 80,
    debounceDelay: 50,
    navVisibilityThreshold: 100,
    scrollToTopThreshold: 300
};

// ========== Utility Functions ==========
const Utils = {
    /**
     * Sanitize text to prevent XSS attacks
     */
    sanitizeHtml: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Extract icon name from icon string
     */
    getIconName: (icon) => {
        return icon ? icon.split(':')[1] || 'dev' : 'dev';
    },

    /**
     * Build icon URL from icon name
     */
    getIconUrl: (iconName) => {
        return `${CONFIG.iconCDN}/${iconName}.svg`;
    },

    /**
     * Debounce function to limit function calls
     */
    debounce: (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }
};

// ========== DOM Cache ==========
const DOM = {
    skillsContainer: null,
    projectsContainer: null,
    themeToggle: null,
    navbar: null,
    scrollToTop: null,
    navLinks: null,
    sections: null,
    contactForm: null,

    /**
     * Initialize DOM references
     */
    init() {
        this.skillsContainer = document.getElementById('skills-container');
        this.projectsContainer = document.getElementById('projects-container');
        this.themeToggle = document.getElementById('theme-toggle');
        this.navbar = document.querySelector('.navbar');
        this.scrollToTop = document.querySelector('.scroll-to-top');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.contactForm = document.getElementById('contact-form');
        return this;
    }
};

// ========== Skill Renderer ==========
const SkillRenderer = {
    categories: {},

    /**
     * Initialize skill categories
     */
    init(skills) {
        this.categories = {
            all: skills,
            frontend: skills.filter(s => s.keywords && s.keywords.some(k => k.toLowerCase().includes('frontend'))),
            backend: skills.filter(s => s.keywords && s.keywords.some(k => k.toLowerCase().includes('backend'))),
            devops: skills.filter(s => s.keywords && (s.keywords.some(k => k.toLowerCase().includes('cloud')) || s.keywords.some(k => k.toLowerCase().includes('container')))),
            tools: skills.filter(s => !s.keywords || !s.keywords.some(k => ['frontend', 'backend', 'cloud', 'container'].some(cat => k.toLowerCase().includes(cat))))
        };
    },

    /**
     * Render skills for a given category
     */
    render(category = 'all') {
        const skills = this.categories[category] || this.categories.all;
        DOM.skillsContainer.innerHTML = '';

        skills.forEach((skill, index) => {
            const skillEl = this.createSkillElement(skill, index);
            DOM.skillsContainer.appendChild(skillEl);
        });
    },

    /**
     * Create a skill element
     */
    createSkillElement(skill, index) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item slide-in';
        skillDiv.style.animationDelay = `${index * 0.05}s`;

        const iconName = Utils.getIconName(skill.icon);
        const iconUrl = Utils.getIconUrl(iconName);

        skillDiv.innerHTML = `
            <img src="${iconUrl}" alt="${Utils.sanitizeHtml(skill.name)}" style="width: 48px; height: 48px; filter: brightness(0) saturate(100%); transition: filter 0.3s ease;" />
            <div class="skill-name">${Utils.sanitizeHtml(skill.name)}</div>
            <div class="skill-level">${Utils.sanitizeHtml(skill.level)}</div>
        `;

        return skillDiv;
    }
};

// ========== Project Renderer ==========
const ProjectRenderer = {
    categories: {},

    /**
     * Initialize project categories
     */
    init(projects) {
        this.categories = {
            all: projects,
            web: projects.filter(p => {
                const stack = Object.keys(p.stack).join(' ').toLowerCase();
                return stack.includes('react') || stack.includes('express') || stack.includes('mongodb');
            }),
            tools: projects.filter(p => {
                const name = p.name.toLowerCase();
                return name.includes('emoji') || name.includes('card') || name.includes('readme');
            }),
            featured: projects.filter(p => p.isActive).slice(0, 3)
        };
    },

    /**
     * Render projects for a given category
     */
    render(category = 'all') {
        const projects = this.categories[category] || this.categories.all;
        DOM.projectsContainer.innerHTML = '';

        if (projects.length === 0) {
            DOM.projectsContainer.innerHTML = '<div class="text-center text-slate-600 dark:text-slate-400 py-8">No projects in this category</div>';
            return;
        }

        projects.forEach((project, index) => {
            const projectEl = this.createProjectElement(project, index);
            DOM.projectsContainer.appendChild(projectEl);
        });
    },

    /**
     * Create a project element
     */
    createProjectElement(project, index) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'minimal-project-card slide-in';
        projectDiv.style.animationDelay = `${index * 0.05}s`;

        const techStack = Object.entries(project.stack).slice(0, 4);
        const techHtml = techStack.map(([tech, icon]) => {
            const iconName = Utils.getIconName(icon);
            const iconUrl = Utils.getIconUrl(iconName);
            return `<div class="minimal-tech-badge"><img src="${iconUrl}" alt="${Utils.sanitizeHtml(tech)}" /><span>${Utils.sanitizeHtml(tech)}</span></div>`;
        }).join('');

        const links = [
            project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="minimal-project-link"><i class="ri-external-link-line"></i> Live Demo</a>` : '',
            project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="minimal-project-link"><i class="ri-github-fill"></i> Source</a>` : ''
        ].filter(Boolean).join('');

        projectDiv.innerHTML = `
            <div class="project-minimal-header">
                <h3 class="project-minimal-title">${Utils.sanitizeHtml(project.name)}</h3>
                ${project.isActive ? '<div class="project-minimal-status">● Active</div>' : ''}
            </div>
            <div class="project-minimal-desc">${Utils.sanitizeHtml(project.description)}</div>
            <div class="project-minimal-stack">${techHtml}</div>
            <div class="project-minimal-links">${links}</div>
        `;

        return projectDiv;
    }
};

// ========== Tab Manager ==========
const TabManager = {
    /**
     * Initialize skill category tabs
     */
    initSkillTabs(renderer) {
        document.querySelectorAll('.skills-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.updateTabState(btn);
                renderer.render(btn.dataset.category);
            });
        });
    },

    /**
     * Initialize project category tabs
     */
    initProjectTabs(renderer) {
        document.querySelectorAll('.projects-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.updateTabState(btn);
                renderer.render(btn.dataset.projectCategory);
            });
        });
    },

    /**
     * Update active tab state
     */
    updateTabState(activeBtn) {
        const buttons = activeBtn.parentElement.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.classList.remove('active', 'bg-blue-50', 'dark:bg-slate-800', 'text-blue-600', 'dark:text-blue-400', 'border-blue-600');
            btn.classList.add('text-slate-600', 'dark:text-slate-400', 'border-transparent');
        });
        activeBtn.classList.add('active', 'bg-blue-50', 'dark:bg-slate-800', 'text-blue-600', 'dark:text-blue-400', 'border-blue-600');
        activeBtn.classList.remove('text-slate-600', 'dark:text-slate-400', 'border-transparent');
    }
};

// ========== Navigation Setup ==========
function initializeNavigation() {
    document.addEventListener('scroll', Utils.debounce(() => {
        // Show/hide navbar on scroll
        if (window.scrollY > CONFIG.navVisibilityThreshold) {
            DOM.navbar.classList.add('visible');
        } else {
            DOM.navbar.classList.remove('visible');
        }

        // Update active navigation link
        updateActiveNavLink();

        // Show/hide scroll to top button
        if (window.scrollY > CONFIG.scrollToTopThreshold) {
            DOM.scrollToTop.classList.add('visible');
        } else {
            DOM.scrollToTop.classList.remove('visible');
        }
    }, CONFIG.debounceDelay));

    // Smooth scroll navigation
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Scroll to top button
    DOM.scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Update active nav link based on current scroll position
 */
function updateActiveNavLink() {
    DOM.sections.forEach(section => {
        const sectionTop = section.offsetTop - CONFIG.scrollOffset;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            DOM.navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// ========== Theme Setup ==========
function initializeTheme() {
    DOM.themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme or use system preference
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        DOM.themeToggle.checked = true;
    }
}

// ========== Contact Form Setup ==========
function initializeContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(DOM.contactForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(CONFIG.formEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Message sent successfully! I will get back to you soon.');
                DOM.contactForm.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Error sending message. Please try again or email me directly.');
        }
    });
}

// ========== Intersection Observer Setup ==========
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// ========== Load CV Data and Initialize App ==========
async function loadCVData() {
    try {
        console.log('Loading CV from:', CONFIG.cvPath);
        const response = await fetch(CONFIG.cvPath);
        
        if (!response.ok) {
            throw new Error(`Failed to load CV data: ${response.status} ${response.statusText}`);
        }

        const cvData = await response.json();
        
        console.log('CV loaded successfully. Skills:', cvData.skills?.length, 'Projects:', cvData.projects?.length);

        // Validate CV data structure
        if (!cvData.skills || !cvData.projects) {
            throw new Error('Invalid CV data structure. Missing skills or projects.');
        }

        // Initialize renderers
        SkillRenderer.init(cvData.skills);
        ProjectRenderer.init(cvData.projects);

        // Render initial data
        SkillRenderer.render('all');
        ProjectRenderer.render('all');

        // Initialize tab managers
        TabManager.initSkillTabs(SkillRenderer);
        TabManager.initProjectTabs(ProjectRenderer);
        
        console.log('Portfolio data loaded and rendered successfully');
    } catch (error) {
        console.error('Error loading CV data:', error);
        
        // Display user-friendly error message
        const errorMsg = `<div style="padding: 2rem; text-align: center; color: #dc2626; background: #fee2e2; border-radius: 8px;">
            <p><strong>Error loading portfolio data</strong></p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">${error.message}</p>
        </div>`;
        
        if (DOM.skillsContainer) {
            DOM.skillsContainer.innerHTML = errorMsg;
        }
        if (DOM.projectsContainer) {
            DOM.projectsContainer.innerHTML = errorMsg;
        }
    }
}

// ========== Main Initialization ==========
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize DOM references
    DOM.init();

    // Load CV data and initialize renderers
    await loadCVData();

    // Initialize all features
    initializeNavigation();
    initializeTheme();
    initializeContactForm();
    initializeIntersectionObserver();
});
