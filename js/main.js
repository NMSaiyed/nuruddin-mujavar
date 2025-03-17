/**
 * Main JavaScript for Portfolio Dashboard
 * Handles navigation, theme toggle, tab switching, and content filtering
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar functionality
    initSidebar();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize section navigation
    initSectionNavigation();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize skill progress bars animation
    initSkillBars();
    
    // Initialize form validation
    initContactForm();
    
    // Initialize page load animations
    initPageLoadAnimation();
});

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Toggle sidebar on menu button click
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            // For mobile, toggle expanded class
            if (window.innerWidth <= 992) {
                sidebar.classList.toggle('expanded');
            } else {
                // For desktop, toggle collapsed class
                sidebar.classList.toggle('collapsed');
                
                // Update main content margin
                const mainContent = document.querySelector('.main-content');
                if (sidebar.classList.contains('collapsed')) {
                    mainContent.style.marginLeft = '80px'; // Collapsed width
                } else {
                    mainContent.style.marginLeft = '280px'; // Expanded width
                }
            }
        });
        
        // Close expanded sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 992 && 
                sidebar.classList.contains('expanded') &&
                !sidebar.contains(event.target) &&
                event.target !== menuToggle) {
                sidebar.classList.remove('expanded');
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth <= 992) {
            // Mobile layout
            sidebar.classList.remove('collapsed');
            if (!sidebar.classList.contains('expanded')) {
                mainContent.style.marginLeft = '80px';
            }
        } else {
            // Desktop layout
            sidebar.classList.remove('expanded');
            if (sidebar.classList.contains('collapsed')) {
                mainContent.style.marginLeft = '80px';
            } else {
                mainContent.style.marginLeft = '280px';
            }
        }
    });
}

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
        
        // Toggle theme on checkbox change
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/**
 * Initialize section navigation
 */
function initSectionNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav ul li a');
    const sections = document.querySelectorAll('.content-section');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and their parent li elements
            navLinks.forEach(item => {
                item.parentElement.classList.remove('active');
            });
            
            // Add active class to clicked link's parent li
            this.parentElement.classList.add('active');
            
            // Get the target section id
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close mobile menu if open
            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth <= 992 && sidebar.classList.contains('expanded')) {
                sidebar.classList.remove('expanded');
            }
            
            // Update URL hash
            window.location.hash = targetId;
        });
    });
    
    // Handle initial load and hash changes
    function handleHashChange() {
        let hash = window.location.hash;
        
        if (hash && hash.length > 1) {
            // Remove # from hash
            hash = hash.substring(1);
            
            // Find the matching navigation link
            const targetLink = document.querySelector(`.sidebar-nav ul li a[href="#${hash}"]`);
            if (targetLink) {
                // Trigger click on the link to navigate to that section
                targetLink.click();
            } else {
                // Default to first section if hash doesn't match any section
                if (navLinks[0]) {
                    navLinks[0].click();
                }
            }
        } else {
            // Default to first section if no hash
            if (navLinks[0]) {
                navLinks[0].click();
            }
        }
    }
    
    // Set initial section based on URL hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
}

/**
 * Initialize project filtering
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        
                        // Add animation
                        card.classList.add('animate');
                        setTimeout(() => {
                            card.classList.remove('animate');
                        }, 500);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Initialize skill bars animation
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    // Animate skill bars when they come into view
    if (skillBars.length) {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Get the width from inline style
                        const width = entry.target.style.width;
                        
                        // Temporarily set width to 0 to enable animation
                        entry.target.style.width = '0%';
                        
                        // Trigger animation by setting the width back after a small delay
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 50);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Observe each skill bar
            skillBars.forEach(bar => {
                observer.observe(bar);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            skillBars.forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    }
}

/**
 * Initialize contact form validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Simple validation
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            } else {
                clearError(subject);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                clearError(message);
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate API request
                setTimeout(() => {
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    contactForm.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
}

/**
 * Show error message for form field
 * @param {HTMLElement} input - Form input element
 * @param {string} message - Error message
 */
function showError(input, message) {
    // Get parent element
    const formGroup = input.parentElement;
    
    // Remove any existing error message
    clearError(input);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Add error message to form group
    formGroup.appendChild(errorElement);
}

/**
 * Clear error message for form field
 * @param {HTMLElement} input - Form input element
 */
function clearError(input) {
    // Get parent element
    const formGroup = input.parentElement;
    
    // Remove error class from input
    input.classList.remove('error');
    
    // Remove error message if it exists
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Initialize animations when page loads
 */
function initPageLoadAnimation() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.metric-card, .project-card, .timeline-item, .education-card, .certification-card');
    
    if ('IntersectionObserver' in window && animatedElements.length) {
        // Options for the observer
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class
                    entry.target.classList.add('animate-in');
                    
                    // Stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe each element
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate-in');
        });
    }
    
    // Add animation styles
    addAnimationStyles();
}

/**
 * Add animation styles dynamically
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .metric-card, .project-card, .timeline-item, .education-card, .certification-card {
            opacity: 0;
        }
        
        .animate-in {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        .metric-card:nth-child(1) { animation-delay: 0.1s; }
        .metric-card:nth-child(2) { animation-delay: 0.2s; }
        .metric-card:nth-child(3) { animation-delay: 0.3s; }
        .metric-card:nth-child(4) { animation-delay: 0.4s; }
        
        .project-card:nth-child(odd) { animation-delay: 0.2s; }
        .project-card:nth-child(even) { animation-delay: 0.3s; }
        
        .timeline-item:nth-child(1) { animation-delay: 0.1s; }
        .timeline-item:nth-child(2) { animation-delay: 0.2s; }
        .timeline-item:nth-child(3) { animation-delay: 0.3s; }
        
        .education-card:nth-child(1) { animation-delay: 0.1s; }
        .education-card:nth-child(2) { animation-delay: 0.2s; }
        
        .certification-card:nth-child(1) { animation-delay: 0.2s; }
        .certification-card:nth-child(2) { animation-delay: 0.3s; }
        .certification-card:nth-child(3) { animation-delay: 0.4s; }
    `;
    document.head.appendChild(style);
} 