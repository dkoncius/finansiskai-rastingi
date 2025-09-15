// Smooth scrolling function
function scrollToRegistration() {
    const registrationSection = document.getElementById('reg');
    if (registrationSection) {
        registrationSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// FAQ toggle function
function toggleFAQ(questionElement) {
    const faqItem = questionElement.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Lecturer Accordion toggle function
function toggleLecturerAccordion(headerElement) {
    const accordionItem = headerElement.closest('.accordion-item');
    const isActive = accordionItem.classList.contains('active');
    
    // Close all other accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

// Mobile Menu toggle function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (mobileMenu.classList.contains('active')) {
        // Close menu
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    } else {
        // Open menu
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
    }
}


// Add smooth scrolling to all CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToRegistration();
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.learn-item, .after-item, .tool-item, .why-item, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add click tracking for analytics (placeholder)
    function trackEvent(eventName, element) {
        console.log(`Event tracked: ${eventName}`, element);
        // Here you would typically send data to your analytics service
        // Example: gtag('event', eventName, { element: element });
    }

    // Track button clicks
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', this.textContent.trim());
        });
    });

    // Track pricing card interactions
    pricingCards.forEach((card, index) => {
        const planName = card.querySelector('.plan-title').textContent;
        card.addEventListener('click', function() {
            trackEvent('pricing_card_click', planName);
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Hero content animation removed - no height transformation needed
    });

    // Hero section parallax effect removed - no height transformation needed

    // Add counter animation for investment amount
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = `~€${Math.floor(start).toLocaleString()}`;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = `~€${target.toLocaleString()}`;
            }
        }
        
        updateCounter();
    }

    // Animate investment counter when it comes into view
    const investmentCounter = document.querySelector('.section-title:contains("Viso investicijose")');
    if (investmentCounter) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, 1600000);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(investmentCounter);
    }

    // Add mobile menu functionality (if needed)
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.style.display = 'none';
        
        header.appendChild(menuButton);
        
        menuButton.addEventListener('click', function() {
            // Toggle mobile menu
            document.body.classList.toggle('mobile-menu-open');
        });
        
        // Show/hide mobile menu button based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
            } else {
                menuButton.style.display = 'none';
                document.body.classList.remove('mobile-menu-open');
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    createMobileMenu();

    // Add form validation (if registration forms are added)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    // Add lazy loading for images
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

    lazyLoadImages();

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            // Check if click is outside the mobile menu and not on the menu button
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #75C12D';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add error handling for failed image loads
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }

    // Add service worker registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential use in other scripts
window.scrollToRegistration = scrollToRegistration;
window.toggleLecturerAccordion = toggleLecturerAccordion;
window.toggleMobileMenu = toggleMobileMenu;
window.trackEvent = function(eventName, element) {
    console.log(`Event tracked: ${eventName}`, element);
};
