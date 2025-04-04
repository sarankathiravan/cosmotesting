// COSMO - Professional Space-themed T-Shirts Website JavaScript

// ======== Initialization ========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize star field
    createStars();

    // Init smooth scrolling
    initSmoothScrolling();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize counters
    initCounters();
    
    // Initialize header behavior
    initHeaderBehavior();
    
    // Initialize collection carousel
    initProductCarousel();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize wishlist functionality
    initWishlist();
    
    // Initialize product page if we're on the product page
    initProductPage();
    
    // Initialize modals AFTER fixing product page navigation
    initModals();
    
    // Setup event listeners for new features
    setupEventListeners();
    
    // Check if we need to scroll to a section (coming from product page)
    if (!document.querySelector('.product-page') && sessionStorage.getItem('scrollToSection')) {
        // This needs to run after the page has fully loaded and smooth scrolling is initialized
        window.addEventListener('load', function() {
            const sectionId = sessionStorage.getItem('scrollToSection');
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Use locomotive scroll if available
                setTimeout(() => {
                    if (window.locomotiveScroll) {
                        window.locomotiveScroll.scrollTo(section);
                    } else {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                    // Clear the stored section
                    sessionStorage.removeItem('scrollToSection');
                }, 1500); // Longer delay to ensure everything is loaded
            }
        });
    }
    
    // Add mobile optimizations
    optimizeMobileView();
    
    // Handle orientation changes
    window.addEventListener('resize', function() {
        optimizeMobileView();
    });
    
    // Initialize the responsive handlers
    handleResponsiveLayout();
    
    // Fix viewport height issues on mobile browsers
    fixMobileViewportHeight();
});

// ======== Preloader ========
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    if (loader && loaderProgress) {
        // Simulate loading progress - faster progression
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25; // Increased from 10 to 25
            if (progress > 100) progress = 100;
            
            loaderProgress.style.width = `${progress}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                
                // Hide loader after a shorter delay
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.classList.add('loaded');
                    
                    // Start intro animations
                    startIntroAnimations();
                }, 200); // Reduced from 500ms to 200ms
            }
        }, 100); // Reduced from 200ms to 100ms
    }
}

// ======== Intro Animations ========
function startIntroAnimations() {
    // Animate hero elements
    const heroText = document.querySelector('.hero-text');
    const heroCta = document.querySelector('.hero-cta');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(50px)';
        setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease, transform 1s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroCta.style.transition = 'opacity 1s ease, transform 1s ease';
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 700);
    }
    
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '0';
        setTimeout(() => {
            scrollIndicator.style.transition = 'opacity 1s ease';
            scrollIndicator.style.opacity = '0.8';
        }, 1500);
    }
}

// ======== Custom Cursor ========
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    
    if (cursor && cursorOuter && cursorInner) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Set cursor position with slight delay for outer cursor
            cursorInner.style.transform = `translate(${x}px, ${y}px)`;
            
            // Add a slight delay to the outer cursor
            setTimeout(() => {
                cursorOuter.style.transform = `translate(${x}px, ${y}px)`;
            }, 50);
        });
        
        // Add hover effect to clickable elements
        const clickables = document.querySelectorAll('a, button, .product-card, .color-selector, .social-link, .option-btn, input, .thumbnail, .close-btn');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
        
        // Show cursor only when moved
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
    }
}

// ======== Star Field Creation ========
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const shootingStars = document.querySelector('.shooting-stars');
    
    if (starsContainer) {
        // Clear existing stars
        starsContainer.innerHTML = '';
        
        // Create stars with random positions
        for (let i = 0; i < 300; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100;
            
            // Random size (small for stars)
            const size = Math.random() * 2 + 1;
            
            // Random opacity and delay for twinkling effect
            const opacity = Math.random() * 0.7 + 0.3;
            const delay = Math.random() * 10;
            const duration = Math.random() * 3 + 3;
            
            star.style.left = `${xPos}%`;
            star.style.top = `${yPos}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = opacity;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    if (shootingStars) {
        // Create shooting stars periodically
        setInterval(() => {
            createShootingStar(shootingStars);
        }, 4000);
    }
}

function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    // Random position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    // Random angle
    const angle = Math.random() * 45 - 45; // Between -45 and 0 degrees
    
    // Style the shooting star
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.width = `${Math.random() * 100 + 50}px`;
    shootingStar.style.height = '2px';
    shootingStar.style.background = 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))';
    shootingStar.style.transform = `rotate(${angle}deg)`;
    shootingStar.style.opacity = '0';
    shootingStar.style.position = 'absolute';
    shootingStar.style.zIndex = '1';
    shootingStar.style.boxShadow = '0 0 10px rgba(255,255,255,0.5)';
    
    container.appendChild(shootingStar);
    
    // Animate the shooting star
    setTimeout(() => {
        shootingStar.style.transition = 'transform 1s linear, opacity 0.2s ease-in, opacity 0.5s ease-out 0.5s';
        shootingStar.style.opacity = '1';
        shootingStar.style.transform = `rotate(${angle}deg) translateX(-1000px)`;
        
        // Remove after animation completes
        setTimeout(() => {
            shootingStar.remove();
        }, 1500);
    }, 10);
}

// ======== Smooth Scrolling (Locomotive Scroll) ========
function initSmoothScrolling() {
    if (typeof LocomotiveScroll !== 'undefined') {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 1,
            lerp: 0.05,
            smartphone: {
                smooth: false
            },
            tablet: {
                smooth: false
            }
        });
        
        // Update scroll on window resize
        window.addEventListener('resize', () => scroll.update());
        
        // Handle scroll-to links
        document.querySelectorAll('[data-scroll-to]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                scroll.scrollTo(document.querySelector(target));
            });
        });
        
        // Initialize scroll triggers for animations
        initScrollTriggers(scroll);
        
        // Make locomotiveScroll globally accessible
        window.locomotiveScroll = scroll;
    } else {
        // Fallback for browsers without Locomotive Scroll
        initBasicScrollEffects();
    }
}

// ======== Basic Scroll Effects (Fallback) ========
function initBasicScrollEffects() {
    // Parallax Effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for hero title
        const parallaxTitle = document.querySelector('.glitch-text');
        if (parallaxTitle) {
            parallaxTitle.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // Planets parallax
        const planets = document.querySelectorAll('.planet');
        planets.forEach(planet => {
            const speed = parseFloat(planet.getAttribute('data-speed') || 0.1);
            planet.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Handle scroll-based animations
        document.querySelectorAll('.fade-in').forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
        
        document.querySelectorAll('.slide-in-left, .slide-in-right').forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// ======== ScrollTrigger Animations ========
function initScrollTriggers(scroll) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize locomotive scroll with ScrollTrigger
        scroll.on('scroll', ScrollTrigger.update);
        
        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
        });
        
        // Product cards stagger animation
        gsap.from('.product-card', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.products-wrapper',
                scroller: '[data-scroll-container]',
                start: 'top 80%',
            }
        });
        
        // Timeline animation
        gsap.from('.timeline-item', {
            opacity: 0,
            y: 30,
            stagger: 0.3,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.timeline',
                scroller: '[data-scroll-container]',
                start: 'top 70%',
            }
        });
        
        // Customize steps animation
        gsap.from('.customize-step', {
            x: -50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.customize-steps',
                scroller: '[data-scroll-container]',
                start: 'top 70%',
            }
        });
        
        // About section image animation
        gsap.from('.about-image-wrapper', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.about-container',
                scroller: '[data-scroll-container]',
                start: 'top 70%',
            }
        });
        
        // Stats counter animation
        ScrollTrigger.create({
            trigger: '.about-stats',
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            onEnter: () => {
                initCounters();
            }
        });
        
        // Contact animations
        gsap.from('.contact-method', {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.contact-methods',
                scroller: '[data-scroll-container]',
                start: 'top 80%',
            }
        });
        
        // Social links animation
        gsap.from('.social-link', {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.social-links',
                scroller: '[data-scroll-container]',
                start: 'top 90%',
            }
        });
        
        // Update ScrollTrigger when locomotive scroll updates
        scroll.on('scroll', () => {
            ScrollTrigger.update();
        });
        
        // Refresh ScrollTrigger on page resize
        ScrollTrigger.addEventListener('refreshInit', () => scroll.update());
        
        // After setup, refresh ScrollTrigger
        ScrollTrigger.refresh();
    }
}

// ======== Scroll Animations (without GSAP) ========
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.product-card, .timeline-item, .customize-step, .value-item, .stat-item, .social-link, .contact-method');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(element => {
            observer.observe(element);
        });
    }
}

// ======== Counters Animation ========
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        const speed = 2000 / target; // Adjust duration based on target value
        
        function updateCount() {
            if (count < target) {
                count++;
                counter.innerText = count;
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target;
            }
        }
        
        updateCount();
    });
}

// ======== Header Behavior ========
function initHeaderBehavior() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Global state to track mobile menu status
window.COSMO = window.COSMO || {};
COSMO.mobileNavInitialized = false;
COSMO.mobileMenuOpen = false;

// Completely revamped mobile navigation function
function initMobileNav(forceInit = false) {
    // Get the required elements
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Exit if elements don't exist
    if (!mobileToggle || !navLinks) return;
    
    // Create clean handlers without event listener buildup
    mobileToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Direct functions to handle menu state
    function forceCloseMenu() {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (navLinks.classList.contains('active')) {
            // Close menu
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            setTimeout(() => {
                if (!navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }, 300);
            document.body.style.overflow = '';
        } else {
            // Open menu
            mobileToggle.classList.add('active');
            navLinks.style.display = 'flex';
            // Small delay to ensure display change takes effect before adding active class
            setTimeout(() => {
                navLinks.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Clean up existing handler by replacing with new element and adding fresh handler
    const newToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
    newToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking navigation links
    navLinks.querySelectorAll('a').forEach(link => {
        // Skip wishlist button on main page to avoid closing menu when just viewing wishlist
        if (link.id === 'wishlistBtn' && !document.querySelector('.product-page')) {
            return;
        }
        
        link.addEventListener('click', forceCloseMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !newToggle.contains(e.target)) {
            forceCloseMenu();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            forceCloseMenu();
        }
    });
    
    // Handle resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            // Reset to default styles for desktop
            forceCloseMenu();
            navLinks.style.display = '';
        }
    });
    
    // Ensure menu starts closed on all pages
    forceCloseMenu();
    
    // For product pages, handle special case on load
    if (document.querySelector('.product-page') || forceInit) {
        window.addEventListener('load', function() {
            forceCloseMenu();
        });
    }
}

// Fix hamburger menu error on product page
function fixProductPageMobileNav() {
    // Simplify by directly targeting both pages with same initialization
    initMobileNav(true); // Force reinitialize for product pages
}

// ======== Product Carousel ========
function initProductCarousel() {
    const carousel = document.querySelector('.products-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        // Get all cards
        const cards = Array.from(carousel.querySelectorAll('.product-card'));
        
        // Current position and visible cards (responsive)
        let currentPosition = 0;
        let visibleCards = getVisibleCardCount();
        
        function getVisibleCardCount() {
            // Responsive: determine visible cards based on screen width
            if (window.innerWidth < 576) return 1;
            if (window.innerWidth < 992) return 2;
            return 3;
        }
        
        function updateCarousel() {
            // Set transform for carousel to show current position
            cards.forEach((card, index) => {
                if (index >= currentPosition && index < currentPosition + visibleCards) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update button states
            prevBtn.style.opacity = currentPosition > 0 ? '1' : '0.5';
            nextBtn.style.opacity = currentPosition + visibleCards < cards.length ? '1' : '0.5';
        }
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPosition + visibleCards < cards.length) {
                currentPosition++;
                updateCarousel();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            visibleCards = getVisibleCardCount();
            updateCarousel();
        });
        
        // Initialize carousel
        updateCarousel();
    }
}

// ======== Modal Management ========
function initModals() {
    // Get all modals and modal triggers
    const modals = document.querySelectorAll('.modal');
    const allProductsBtn = document.getElementById('allProductsBtn');
    const customizeBtn = document.getElementById('customizeBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Check if we need to reopen the All Products modal after returning from a product page
    if (sessionStorage.getItem('openAllProductsModal') === 'true') {
        const allProductsModal = document.getElementById('allProductsModal');
        if (allProductsModal) {
            openModal(allProductsModal);
            // Clear the flag once the modal is reopened
            sessionStorage.removeItem('openAllProductsModal');
            
            // Ensure wishlist status is updated in the modal
            initAllProductsWishlist();
        }
    }
    
    // Add event listeners
    if (allProductsBtn) {
        allProductsBtn.addEventListener('click', () => {
            const modal = document.getElementById('allProductsModal');
            openModal(modal);
            
            // Initialize wishlist in this modal
            initAllProductsWishlist();
        });
    }
    
    if (customizeBtn) {
        customizeBtn.addEventListener('click', () => {
            const modal = document.getElementById('customizeModal');
            openModal(modal);
        });
    }
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
            // Only prevent default on index page, not product page
            if (!document.querySelector('.product-page')) {
                e.preventDefault();
                
                const modal = document.getElementById('wishlistModal');
                
                // Populate wishlist with current items before opening
                populateWishlistModal();
                
                openModal(modal);
            }
        });
    }
    
    // Close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Click outside to close
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Add click handlers for products in the all products modal
    setupAllProductsModalLinks();
}

// Setup All Products Modal Links
function setupAllProductsModalLinks() {
    const productLinks = document.querySelectorAll('.products-grid .product-tile a');
    
    productLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Store state that All Products modal was open
            sessionStorage.setItem('openAllProductsModal', 'true');
        });
    });
    
    // Clear any listeners that might interfere with navigation
    clearNavigationInterference();
}

// Clear interference with navigation 
function clearNavigationInterference() {
    // Check if we're on product page
    if (document.querySelector('.product-page')) {
        // Find all elements that might have global click handlers
        const allModals = document.querySelectorAll('.modal');
        const allModalTriggers = document.querySelectorAll('[id$="Btn"]'); // All buttons that might trigger modals
        
        // Fix the all products button specifically
        const allProductsBtn = document.getElementById('allProductsBtn');
        if (allProductsBtn) {
            const newAllProductsBtn = allProductsBtn.cloneNode(true);
            if (allProductsBtn.parentNode) {
                allProductsBtn.parentNode.replaceChild(newAllProductsBtn, allProductsBtn);
            }
        }
        
        // Add a specific check to intercept clicks on the document and prevent default modal opening behavior
        document.addEventListener('click', function(e) {
            // If on product page and click is on a navigation link (except wishlist)
            if (document.querySelector('.product-page') && 
                e.target.closest('.nav-links a') && 
                !e.target.closest('#wishlistBtn')) {
                
                // If the link is to a section on index.html, let it proceed
                const link = e.target.closest('.nav-links a');
                const href = link && link.getAttribute('href');
                if (href && href.includes('index.html#')) {
                    // This is a legitimate navigation - let it proceed
                    return true;
                }
                
                // If this is some other kind of navigation trigger, stop event propagation
                // to prevent modals from capturing it
                e.stopPropagation();
            }
        }, true); // Use capture phase to run before other handlers
    }
}

function openModal(modal) {
    if (modal) {
        // Show modal
        modal.style.display = 'flex';
        
        // Force reflow
        void modal.offsetWidth;
        
        // Add show class for animation
        modal.classList.add('show');
        
        // Lock body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        // Remove show class to start animation
        modal.classList.remove('show');
        
        // Hide after animation completes
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Restore body scroll if no other modals are open
            const openModals = document.querySelectorAll('.modal.show');
            if (openModals.length === 0) {
                document.body.style.overflow = '';
            }
        }, 500);
    }
}

function populateQuickviewModal(card, modal) {
    if (!card || !modal) return;
    
    // Get product data from card
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;
    const description = card.querySelector('.product-description').textContent;
    const imageSrc = card.querySelector('img').src;
    
    // Set data in modal
    modal.querySelector('#modalProductTitle').textContent = title;
    modal.querySelector('#modalProductPrice').textContent = price;
    modal.querySelector('#modalProductDesc p').textContent = description;
    modal.querySelector('#modalMainImg').src = imageSrc;
    
    // Update thumbnails
    const thumbnails = modal.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        // First thumbnail should show product image
        if (thumb.classList.contains('active')) {
            thumb.querySelector('img').src = imageSrc;
        }
    });
    
    // Setup thumbnail click handlers
    setupThumbnailHandlers(modal);
    setupQuantityHandlers(modal);
}

function setupThumbnailHandlers(modal) {
    const thumbnails = modal.querySelectorAll('.thumbnail');
    const mainImg = modal.querySelector('#modalMainImg');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked thumbnail
            thumb.classList.add('active');
            
            // Update main image
            const imgSrc = thumb.getAttribute('data-img');
            if (imgSrc && mainImg) {
                mainImg.src = imgSrc;
            }
        });
    });
}

function setupQuantityHandlers(modal) {
    const minusBtn = modal.querySelector('.quantity-btn.minus');
    const plusBtn = modal.querySelector('.quantity-btn.plus');
    const input = modal.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && input) {
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value < parseInt(input.getAttribute('max'))) {
                input.value = value + 1;
            }
        });
        
        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            const min = parseInt(input.getAttribute('min'));
            const max = parseInt(input.getAttribute('max'));
            
            if (isNaN(value) || value < min) {
                input.value = min;
            } else if (value > max) {
                input.value = max;
            }
        });
    }
}

// ======== T-shirt Customizer ========
// Function kept for reference but no longer called
function initTshirtCustomizer() {
    // This function is no longer used since color selectors have been removed
    console.log("T-shirt color customizer has been disabled");
}

// ======== Wishlist Functionality ========
function initWishlist() {
    // Initialize wishlist in localStorage if it doesn't exist
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify([]));
    }
    
    // Update wishlist count
    updateWishlistCount();
    
    // Initialize wishlist buttons
    initWishlistButtons();
    
    // Initialize wishlist dropdown
    initWishlistDropdown();
}

function initWishlistButtons() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        const productId = btn.getAttribute('data-product-id');
        
        // Check if product is in wishlist and update button state
        if (isInWishlist(productId)) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
            
            // Update text if it's the large button on product page
            if (btn.classList.contains('large') && btn.querySelector('span')) {
                btn.querySelector('span').textContent = 'Remove from Wishlist';
            }
        }
        
        // Remove existing event listener to prevent duplicates
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add click event to the new button
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = newBtn.getAttribute('data-product-id');
            toggleWishlistItem(productId);
        });
    });
}

function toggleWishlistItem(productId) {
    // Get current wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Check if product is already in wishlist
    const index = wishlist.indexOf(productId);
    const isAdding = index === -1;
    
    if (isAdding) {
        // Add to wishlist
        wishlist.push(productId);
        showNotification('Product added to wishlist', 'success');
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showNotification('Product removed from wishlist', 'info');
    }
    
    // Update localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update UI - using a slight delay to ensure DOM is updated
    setTimeout(() => {
        updateWishlistCount();
        updateAllWishlistButtons();
        updateWishlistDropdown();
        
        // Update modal if open
        populateWishlistModal();
    }, 10);
    
    return isAdding; // Return whether item was added or removed
}

function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.includes(productId);
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const count = wishlist.length;
    
    // Update count in nav
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = count;
        
        // Add bump animation
        wishlistCount.classList.remove('bump');
        // Force reflow
        void wishlistCount.offsetWidth;
        wishlistCount.classList.add('bump');
    }
}

function updateAllWishlistButtons() {
    // Get current wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Update all wishlist buttons on the page
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const btnProductId = btn.getAttribute('data-product-id');
        if (btnProductId) {
            updateWishlistButtonsState(btnProductId, wishlist.includes(btnProductId));
        }
    });
}

function updateWishlistButtonsState(productId, isActive) {
    const allBtns = document.querySelectorAll(`.wishlist-btn[data-product-id="${productId}"]`);
    
    allBtns.forEach(btn => {
        // Remove any existing animation classes first
        btn.classList.remove('active', 'depop');
        
        if (isActive) {
            // Add to wishlist - add active class and use heartPulse animation
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
            
            // Update text if it's the large button on product page
            if (btn.classList.contains('large') && btn.querySelector('span')) {
                btn.querySelector('span').textContent = 'Remove from Wishlist';
            }
        } else {
            // Remove from wishlist - add depop class and use heartDepop animation
            btn.classList.add('depop');
            
            // Reset after animation completes
            setTimeout(() => {
                btn.classList.remove('depop');
            }, 300);
            
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
            
            // Update text if it's the large button on product page
            if (btn.classList.contains('large') && btn.querySelector('span')) {
                btn.querySelector('span').textContent = 'Add to Wishlist';
            }
        }
    });
}

function renderWishlistItems() {
    const wishlistItems = document.querySelector('.wishlist-items');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlistItems) return;
    
    // Clear current items
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        // Show empty wishlist message
        wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="far fa-heart empty-icon"></i>
                <p>Your wishlist is empty</p>
                <p class="empty-subtitle">Explore our collection and add your favorite items</p>
                <a href="index.html#collection" class="cosmic-btn primary-btn">
                    <span class="btn-text">EXPLORE COLLECTION</span>
                </a>
            </div>
        `;
        return;
    }
    
    // Products data (in a real implementation, this would be fetched from an API)
    const products = {
        '1': {
            name: 'Galaxy Explorer',
            price: '$29.99',
            image: 'images/tshirt1.jpg'
        },
        '2': {
            name: 'Nebula Dream',
            price: '$32.99',
            image: 'images/tshirt2.jpg'
        },
        '3': {
            name: 'Space Explorer',
            price: '$34.99',
            image: 'images/tshirt3.jpg'
        },
        '4': {
            name: 'Planetary Voyage',
            price: '$28.99',
            image: 'images/tshirt4.jpg'
        },
        '5': {
            name: 'Astral Drift',
            price: '$31.99',
            image: 'images/tshirt5.jpg'
        },
        '6': {
            name: 'Lunar Phase',
            price: '$27.99',
            image: 'images/tshirt6.jpg'
        },
        '7': {
            name: 'Cosmic Ray',
            price: '$29.99',
            image: 'images/tshirt7.jpg'
        },
        '8': {
            name: 'Dark Matter',
            price: '$33.99',
            image: 'images/tshirt8.jpg'
        }
    };
    
    // Add items to wishlist
    wishlist.forEach(productId => {
        const product = products[productId];
        
        if (product) {
            const itemHTML = `
                <div class="wishlist-item" data-product-id="${productId}">
                    <div class="wishlist-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="wishlist-item-info">
                        <h3 class="wishlist-item-title">${product.name}</h3>
                        <p class="wishlist-item-price">${product.price}</p>
                        <div class="wishlist-item-actions">
                            <a href="product.html?id=${productId}" class="cosmic-btn small-btn">View Details</a>
                            <button class="remove-wishlist-btn" data-product-id="${productId}">
                                <i class="fas fa-times"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            wishlistItems.innerHTML += itemHTML;
        }
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-product-id');
            toggleWishlistItem(productId);
            updateWishlistButtonsState(productId, false);
            updateWishlistCount();
            renderWishlistItems();
            showNotification('Item removed from wishlist!');
        });
    });
}

// ======== Setup Event Listeners ========
function setupEventListeners() {
    // Explore button click
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const collectionSection = document.getElementById('collection');
            if (collectionSection) {
                // If using locomotive scroll
                if (window.locomotiveScroll) {
                    window.locomotiveScroll.scrollTo(collectionSection);
                } else {
                    // Fallback
                    collectionSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
    
    // All Products button in empty wishlist
    const exploreFromWishlist = document.getElementById('exploreFromWishlist');
    if (exploreFromWishlist) {
        exploreFromWishlist.addEventListener('click', () => {
            closeModal(document.getElementById('wishlistModal'));
            setTimeout(() => {
                const collectionSection = document.getElementById('collection');
                if (collectionSection) {
                    // If using locomotive scroll
                    if (window.locomotiveScroll) {
                        window.locomotiveScroll.scrollTo(collectionSection);
                    } else {
                        // Fallback
                        collectionSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 500);
        });
    }
}

// ======== Google Form Handlers ========
function setupGoogleFormHandlers() {
    // Listen for messages from Google Form iframe
    window.addEventListener('message', function(event) {
        // Check for messages from Google Forms iframe
        if (event.data && event.data.formSubmitted) {
            // Close modal after successful submission
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
            
            // Show success message
            showNotification('Your form has been submitted successfully!');
        }
    });
}

// ======== Notification System ========
function showNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.classList.add('notification');
        document.body.appendChild(notification);
    }
    
    // Add type class (success, error, info)
    notification.className = 'notification';
    notification.classList.add(type);
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ======== Product Page Functionality ========
function initProductPage() {
    if (document.querySelector('.product-page')) {
        // First, fix the mobile navigation
        fixProductPageMobileNav();
        
        // Initialize product page specific functionality
        initProductTabs();
        initThumbnailNavigation();
        initQuantityControls();
        initImageZoom();
        setupBuyNowButton();
        
        // Get the product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            // Load product details
            loadProductDetails(productId);
            
            // Load related products
            loadRelatedProducts(productId);
        }
        
        // Fix product page navigation
        fixProductPageNavigation();
    }
}

function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
    
    // Handle size guide link click
    const sizeGuideLink = document.querySelector('.size-guide-link');
    if (sizeGuideLink) {
        sizeGuideLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Activate sizing tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-tab="sizing"]').classList.add('active');
            
            // Show sizing tab content
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.getElementById('sizing-tab').classList.add('active');
            
            // Scroll to the tab section
            document.querySelector('.product-details-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

function initThumbnailNavigation() {
    // Thumbnail click handler
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const imgSrc = this.getAttribute('data-img');
            if (imgSrc) {
                const mainImage = document.getElementById('main-product-image');
                if (mainImage) {
                    mainImage.src = imgSrc;
                    
                    // Reset zoom result if active
                    const zoomResult = document.querySelector('.image-zoom-result');
                    if (zoomResult) {
                        zoomResult.style.backgroundImage = `url(${imgSrc})`;
                    }
                    
                    // Update fullscreen button to use this image source
                    const fullscreenBtn = document.querySelector('.fullscreen-btn');
                    if (fullscreenBtn) {
                        // Update the click handler to use the new image
                        fullscreenBtn.onclick = function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const fullscreenModal = document.getElementById('image-fullscreen-modal');
                            const fullscreenImage = document.getElementById('fullscreen-image');
                            
                            if (fullscreenModal && fullscreenImage) {
                                // Set current image as the fullscreen image
                                fullscreenImage.src = imgSrc;
                                fullscreenImage.alt = mainImage.alt + ' (Fullscreen)';
                                
                                // Open the modal
                                openModal(fullscreenModal);
                            }
                        };
                    }
                }
            }
        });
    });
    
    // Thumbnail navigation buttons
    const prevBtn = document.querySelector('.thumbnail-controls .prev');
    const nextBtn = document.querySelector('.thumbnail-controls .next');
    const thumbnailSlider = document.querySelector('.thumbnail-images');
    
    if (prevBtn && nextBtn && thumbnailSlider) {
        let position = 0;
        const itemWidth = 90; // Width of thumbnail + gap
        const visibleItems = Math.floor(thumbnailSlider.offsetWidth / itemWidth);
        const maxPosition = Math.max(0, thumbnails.length - visibleItems);
        
        prevBtn.addEventListener('click', () => {
            if (position > 0) {
                position--;
                updateSliderPosition();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (position < maxPosition) {
                position++;
                updateSliderPosition();
            }
        });
        
        function updateSliderPosition() {
            thumbnailSlider.style.transform = `translateX(-${position * itemWidth}px)`;
        }
    }
}

function initQuantityControls() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > parseInt(quantityInput.min)) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < parseInt(quantityInput.max)) {
                quantityInput.value = currentValue + 1;
            }
        });
        
        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            const min = parseInt(quantityInput.min);
            const max = parseInt(quantityInput.max);
            
            if (isNaN(value) || value < min) {
                quantityInput.value = min;
            } else if (value > max) {
                quantityInput.value = max;
            }
        });
    }
}

function initImageZoom() {
    const mainImage = document.querySelector('.main-image');
    const zoomLens = document.querySelector('.zoom-lens');
    const zoomResult = document.querySelector('.image-zoom-result');
    const img = document.getElementById('main-product-image');
    
    if (mainImage && zoomLens && zoomResult && img) {
        // Add fullscreen button overlay to the main image
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'fullscreen-btn';
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.title = 'View full image';
        mainImage.appendChild(fullscreenBtn);
        
        // Create fullscreen modal for the image
        if (!document.getElementById('image-fullscreen-modal')) {
            const fullscreenModal = document.createElement('div');
            fullscreenModal.id = 'image-fullscreen-modal';
            fullscreenModal.className = 'modal';
            fullscreenModal.innerHTML = `
                <div class="modal-content fullscreen-image-modal">
                    <span class="close-btn">&times;</span>
                    <div class="fullscreen-image-container">
                        <img id="fullscreen-image" src="" alt="Product fullscreen view">
                    </div>
                </div>
            `;
            document.body.appendChild(fullscreenModal);
            
            // Add close functionality
            const closeBtn = fullscreenModal.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                closeModal(fullscreenModal);
            });
            
            // Click outside to close
            fullscreenModal.addEventListener('click', (e) => {
                if (e.target === fullscreenModal) {
                    closeModal(fullscreenModal);
                }
            });
        }
        
        // Add click handler to the fullscreen button
        fullscreenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const fullscreenModal = document.getElementById('image-fullscreen-modal');
            const fullscreenImage = document.getElementById('fullscreen-image');
            
            // Set current image as the fullscreen image
            fullscreenImage.src = img.src;
            fullscreenImage.alt = img.alt + ' (Fullscreen)';
            
            // Open the modal
            openModal(fullscreenModal);
        });
        
        // Make the whole image clickable to view fullscreen
        mainImage.addEventListener('click', (e) => {
            // Only trigger if clicking on the image itself, not the lens or buttons
            if (e.target === img) {
                fullscreenBtn.click();
            }
        });
        
        // Wait for image to load
        img.onload = function() {
            const imgRect = img.getBoundingClientRect();
            
            // Set background for zoom result
            zoomResult.style.backgroundImage = `url(${img.src})`;
            zoomResult.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
            
            // Handle mouse move on main image
            mainImage.addEventListener('mousemove', (e) => {
                // Get cursor position
                const rect = mainImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Lens size
                const lensWidth = zoomLens.offsetWidth;
                const lensHeight = zoomLens.offsetHeight;
                
                // Position lens
                let lensX = x - lensWidth / 2;
                let lensY = y - lensHeight / 2;
                
                // Boundary check
                if (lensX < 0) lensX = 0;
                if (lensY < 0) lensY = 0;
                if (lensX > rect.width - lensWidth) lensX = rect.width - lensWidth;
                if (lensY > rect.height - lensHeight) lensY = rect.height - lensHeight;
                
                // Update lens position
                zoomLens.style.left = `${lensX}px`;
                zoomLens.style.top = `${lensY}px`;
                
                // Calculate background position for zoom result
                const backgroundX = -(lensX * 2);
                const backgroundY = -(lensY * 2);
                
                zoomResult.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
            });
            
            // Handle mouse enter/leave
            mainImage.addEventListener('mouseenter', () => {
                zoomLens.style.opacity = '1';
                zoomResult.style.opacity = '1';
            });
            
            mainImage.addEventListener('mouseleave', () => {
                zoomLens.style.opacity = '0';
                zoomResult.style.opacity = '0';
            });
        };
    }
}

function setupBuyNowButton() {
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product details to pass to the form
            const productTitle = document.getElementById('product-title')?.textContent || '';
            const productPrice = document.getElementById('product-price')?.textContent || '';
            const productId = this.getAttribute('data-product-id') || 
                              document.getElementById('product-wishlist-btn')?.getAttribute('data-product-id') || '1';
            
            // Google Forms URL - replace with your actual Google Form URL
            const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfD9JhzXQPZboXGO-MN5I7qQNEapQe4Em27HYLCkxIZwDY05Q/viewform';
            
            // Add query parameters to pre-fill the form
            const formUrl = `${googleFormUrl}?usp=pp_url&entry.2005620554=${encodeURIComponent(productTitle)}&entry.1045781291=${encodeURIComponent(productPrice)}&entry.1065046570=${encodeURIComponent(productId)}`;
            
            // Open the form in a new tab
            window.open(formUrl, '_blank');
            
            // Show success notification
            showNotification('Redirecting to order form...', 'info');
        });
    }
}

function loadProductDetails(productId) {
    // In a real implementation, this would fetch from an API
    // For demo purposes, we'll use hardcoded data
    const products = {
        '1': {
            name: 'Galaxy Explorer',
            price: '$29.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'Explore the depths of the Milky Way with this cosmic design that showcases the beauty of our galaxy. Made with high-quality materials for comfort and durability.',
            images: ['images/tshirt1.jpg', 'images/tshirt1-alt1.jpg', 'images/tshirt1-alt2.jpg']
        },
        '2': {
            name: 'Nebula Dream',
            price: '$32.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'Vibrant nebula patterns crafted from quality materials. The Nebula Dream T-shirt showcases the colorful beauty of interstellar clouds where stars are born.',
            images: ['images/tshirt2.jpg', 'images/tshirt2-alt1.jpg', 'images/tshirt2-alt2.jpg']
        },
        '3': {
            name: 'Space Explorer',
            price: '$34.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'For the brave souls seeking cosmic adventures. This design captures the spirit of exploration with bold graphics and comfortable fit.',
            images: ['images/tshirt3.jpg', 'images/tshirt3-alt1.jpg', 'images/tshirt3-alt2.jpg']
        },
        '4': {
            name: 'Planetary Voyage',
            price: '$28.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'Travel through our solar system with this unique design featuring all planets in our solar system with vibrant colors and detailed illustrations.',
            images: ['images/tshirt4.jpg', 'images/tshirt4-alt1.jpg', 'images/tshirt4-alt2.jpg']
        },
        '5': {
            name: 'Astral Drift',
            price: '$31.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'Navigate the cosmos with this star-inspired design that maps constellations across a deep space background on comfortable fabric.',
            images: ['images/tshirt5.jpg', 'images/tshirt5-alt1.jpg', 'images/tshirt5-alt2.jpg']
        },
        '6': {
            name: 'Lunar Phase',
            price: '$27.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'Celebrate the beauty of lunar cycles with this elegant design showcasing the different phases of the moon in striking detail on quality fabric.',
            images: ['images/tshirt6.jpg', 'images/tshirt6-alt1.jpg', 'images/tshirt6-alt2.jpg']
        },
        '7': {
            name: 'Cosmic Ray',
            price: '$29.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'Inspired by the high-energy particles that traverse space, Cosmic Ray features dynamic light streaks on a black tee that seems to pulse with energy.',
            images: ['images/tshirt7.jpg', 'images/tshirt7-alt1.jpg', 'images/tshirt7-alt2.jpg']
        },
        '8': {
            name: 'Dark Matter',
            price: '$33.99',
            badge: 'New',
            category: 'Cosmic T-Shirt',
            description: 'Embrace the unknown with this enigmatic cosmic design that represents the mysterious dark matter that makes up most of our universe.',
            images: ['images/tshirt8.jpg', 'images/tshirt8-alt1.jpg', 'images/tshirt8-alt2.jpg']
        }
    };
    
    const product = products[productId];
    if (product) {
        // Update page title
        document.title = `${product.name} - COSMO`;
        
        // Update breadcrumb
        const breadcrumb = document.getElementById('product-breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = product.name;
        }
        
        // Update product details
        const titleElement = document.getElementById('product-title');
        const priceElement = document.getElementById('product-price');
        const badgeElement = document.getElementById('product-badge');
        const descriptionElement = document.getElementById('product-description');
        const wishlistBtn = document.getElementById('product-wishlist-btn');
        const buyNowBtn = document.getElementById('buyNowBtn');
        const mainImage = document.getElementById('main-product-image');
        
        if (titleElement) titleElement.textContent = product.name;
        if (priceElement) priceElement.textContent = product.price;
        if (badgeElement) badgeElement.textContent = product.badge;
        if (descriptionElement) descriptionElement.innerHTML = `<p>${product.description}</p>`;
        
        // Update wishlist button
        if (wishlistBtn) {
            wishlistBtn.setAttribute('data-product-id', productId);
            // Check if product is in wishlist and update button state
            updateWishlistButtonsState(productId, isInWishlist(productId));
        }
        
        // Update Buy Now button with product ID
        if (buyNowBtn) {
            buyNowBtn.setAttribute('data-product-id', productId);
        }
        
        // Update images
        if (mainImage) {
            mainImage.src = product.images[0];
            mainImage.alt = product.name;
        }
        
        // Update thumbnails if available
        const thumbnails = document.querySelectorAll('.thumbnail');
        product.images.forEach((img, idx) => {
            if (idx < thumbnails.length) {
                thumbnails[idx].setAttribute('data-img', img);
                thumbnails[idx].querySelector('img').src = img;
                thumbnails[idx].querySelector('img').alt = `${product.name} - View ${idx + 1}`;
            }
        });
    } else {
        console.error(`Product with ID ${productId} not found`);
        // Redirect to default product if the product doesn't exist
        if (window.location.search) {
            window.location.href = 'product.html?id=1';
        }
    }
}

// Load related products with random selection
function loadRelatedProducts(currentProductId) {
    const relatedGrid = document.querySelector('.related-grid');
    if (!relatedGrid) return;
    
    // Clear existing products
    relatedGrid.innerHTML = '';
    
    // Product database - you can expand this as needed
    const allProducts = [
        {
            id: '1',
            name: 'Galaxy Explorer',
            price: '$29.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt1.jpg',
            description: 'Explore the depths of the Milky Way with this cosmic design'
        },
        {
            id: '2',
            name: 'Nebula Dream',
            price: '$32.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt2.jpg',
            description: 'Vibrant nebula patterns crafted from quality materials'
        },
        {
            id: '3',
            name: 'Space Explorer',
            price: '$34.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt3.jpg',
            description: 'For the brave souls seeking cosmic adventures'
        },
        {
            id: '4',
            name: 'Planetary Voyage',
            price: '$28.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt4.jpg',
            description: 'Travel through our solar system with this unique design'
        },
        {
            id: '5',
            name: 'Astral Drift',
            price: '$31.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt5.jpg',
            description: 'Navigate the cosmos with this star-inspired design'
        },
        {
            id: '6',
            name: 'Lunar Phase',
            price: '$27.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt6.jpg',
            description: 'Celebrate the beauty of lunar cycles with this elegant design'
        },
        {
            id: '7',
            name: 'Cosmic Ray',
            price: '$29.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt7.jpg',
            description: 'Capture the power of cosmic energy with this vibrant design'
        },
        {
            id: '8',
            name: 'Dark Matter',
            price: '$33.99',
            category: 'Cosmic T-Shirt',
            image: 'images/tshirt8.jpg',
            description: 'Embrace the unknown with this enigmatic cosmic design'
        }
    ];
    
    // Filter out the current product
    const availableProducts = allProducts.filter(product => product.id !== currentProductId);
    
    // Shuffle array to get random products
    const shuffledProducts = availableProducts.sort(() => 0.5 - Math.random());
    
    // Take 3 random products
    const selectedProducts = shuffledProducts.slice(0, 3);
    
    // Create and add product tiles
    selectedProducts.forEach(product => {
        const productTile = document.createElement('div');
        productTile.className = 'product-tile';
        productTile.setAttribute('data-product-id', product.id);
        
        productTile.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-hover-overlay">
                    <a href="product.html?id=${product.id}" class="view-product-btn">VIEW PRODUCT</a>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-description">${product.description}</div>
                <div class="product-bottom">
                    <p class="product-price">${product.price}</p>
                    <button class="wishlist-btn" data-product-id="${product.id}"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        
        relatedGrid.appendChild(productTile);
    });
    
    // Initialize wishlist buttons on the newly added products
    initWishlistButtons();
}

// ======== Wishlist Dropdown ========
function initWishlistDropdown() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    if (wishlistBtn) {
        // Create dropdown if it doesn't exist
        if (!document.querySelector('.wishlist-dropdown')) {
            const dropdown = document.createElement('div');
            dropdown.className = 'wishlist-dropdown';
            wishlistBtn.appendChild(dropdown);
            
            // Populate wishlist dropdown
            updateWishlistDropdown();
            
            // Prevent click on wishlistBtn from triggering default action or bubbling
            wishlistBtn.addEventListener('click', function(e) {
                // Only prevent default on product page to avoid modal opening
                if (document.querySelector('.product-page')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    }
}

function updateWishlistDropdown() {
    const dropdown = document.querySelector('.wishlist-dropdown');
    
    if (dropdown) {
        // Get wishlist from localStorage
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        // Clear dropdown content
        dropdown.innerHTML = '';
        
        if (wishlist.length === 0) {
            // Empty wishlist message
            dropdown.innerHTML = `
                <div class="wishlist-dropdown-empty">
                    <i class="far fa-heart"></i>
                    <p>Your wishlist is empty</p>
                </div>
            `;
        } else {
            // Add items to dropdown
            wishlist.forEach(productId => {
                const productInfo = getProductInfo(productId);
                if (productInfo) {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'wishlist-dropdown-item';
                    itemElement.innerHTML = `
                        <div class="wishlist-dropdown-image">
                            <img src="${productInfo.image}" alt="${productInfo.name}">
                        </div>
                        <div class="wishlist-dropdown-info">
                            <div class="wishlist-dropdown-title">${productInfo.name}</div>
                            <div class="wishlist-dropdown-price">${productInfo.price}</div>
                            <a href="#" class="wishlist-dropdown-remove" data-product-id="${productId}">Remove</a>
                        </div>
                    `;
                    dropdown.appendChild(itemElement);
                }
            });
            
            // Add view all button
            const footer = document.createElement('div');
            footer.className = 'wishlist-dropdown-footer';
            footer.innerHTML = `
                <button class="cosmic-btn primary-btn" id="viewWishlistBtn">
                    <span class="btn-text">VIEW WISHLIST</span>
                </button>
            `;
            dropdown.appendChild(footer);
        }
        
        // Add click handlers for all remove buttons
        dropdown.querySelectorAll('.wishlist-dropdown-remove').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const productId = this.getAttribute('data-product-id');
                toggleWishlistItem(productId);
            });
        });
        
        // Add click handler for view all button
        const viewWishlistBtn = dropdown.querySelector('#viewWishlistBtn');
        if (viewWishlistBtn) {
            viewWishlistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const wishlistModal = document.getElementById('wishlistModal');
                if (wishlistModal) {
                    openModal(wishlistModal);
                    populateWishlistModal();
                }
            });
        }
    }
}

function getProductInfo(productId) {
    // Sample product data - replace with actual product data retrieval
    const products = {
        '1': { name: 'Galaxy Explorer', price: '$29.99', image: 'images/tshirt1.jpg' },
        '2': { name: 'Nebula Dream', price: '$32.99', image: 'images/tshirt2.jpg' },
        '3': { name: 'Space Explorer', price: '$34.99', image: 'images/tshirt3.jpg' },
        '4': { name: 'Planetary Voyage', price: '$28.99', image: 'images/tshirt4.jpg' },
        '5': { name: 'Astral Drift', price: '$31.99', image: 'images/tshirt5.jpg' },
        '6': { name: 'Lunar Phase', price: '$27.99', image: 'images/tshirt6.jpg' },
        '7': { name: 'Cosmic Ray', price: '$29.99', image: 'images/tshirt7.jpg' },
        '8': { name: 'Dark Matter', price: '$33.99', image: 'images/tshirt8.jpg' }
    };
    
    return products[productId];
}

// Fix navigation on product page
function fixProductPageNavigation() {
    // Get all navigation links on product page
    const navLinks = document.querySelectorAll('.product-page .nav-links a');
    
    navLinks.forEach(link => {
        // Skip wishlist button
        if (link.id === 'wishlistBtn') return;
        
        // Check if href contains index.html#section
        const href = link.getAttribute('href');
        if (href && href.includes('index.html#')) {
            // Create completely new link to remove all event listeners
            const newLink = document.createElement('a');
            newLink.href = href;
            newLink.innerHTML = link.innerHTML;
            newLink.className = link.className;
            
            // Direct navigation without any interception
            newLink.onclick = function(e) {
                // Store the section to scroll to when index page loads
                const hash = href.split('#')[1];
                if (hash) {
                    sessionStorage.setItem('scrollToSection', hash);
                }
                
                // Let the default navigation happen
                return true;
            };
            
            // Replace the old link
            link.parentNode.replaceChild(newLink, link);
        }
    });
    
    // Additional check to prevent any modal from opening when nav links are clicked
    document.addEventListener('click', function(e) {
        // If clicked element is a navigation link in product page
        if (e.target.closest('.product-page .nav-links a') && 
            !e.target.closest('#wishlistBtn')) {
            // Don't let event bubble up to triggers that might open modals
            e.stopPropagation();
        }
    }, true); // Use capture phase to run before other handlers
}

// Helper function to populate the wishlist modal
function populateWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    if (modal) {
        renderWishlistItems();
    }
}

// Initialize wishlist items in all products modal
function initAllProductsWishlist() {
    const productsModal = document.getElementById('allProductsModal');
    if (!productsModal) return;
    
    // Get all wishlist buttons in the modal
    const modalWishlistBtns = productsModal.querySelectorAll('.wishlist-btn');
    
    // Initialize each button
    modalWishlistBtns.forEach(btn => {
        const productId = btn.getAttribute('data-product-id');
        
        // Check if in wishlist
        if (isInWishlist(productId)) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        }
        
        // Remove existing event and add new one
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = newBtn.getAttribute('data-product-id');
            toggleWishlistItem(productId);
        });
    });
}

// Add mobile detection and optimization
function isMobile() {
    return window.innerWidth <= 768;
}

// Make product descriptions more accessible on mobile
function optimizeMobileView() {
    if (isMobile()) {
        // Adjust product cards for better touch interaction
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Only trigger if not clicking on a button or link
                if (!e.target.closest('button') && !e.target.closest('a')) {
                    // Find and click the view product button
                    const viewBtn = this.querySelector('.view-product-btn');
                    if (viewBtn) {
                        e.preventDefault();
                        viewBtn.click();
                    }
                }
            });
        });
        
        // Ensure wishlist buttons are easily tappable
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.style.padding = '12px';
        });
        
        // Adjust modal content for mobile
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.style.maxHeight = '90vh';
            modal.style.overflowY = 'auto';
        });
    }
}

// Better responsive handling
window.addEventListener('resize', function() {
    handleResponsiveLayout();
});

// Function to handle responsive layout adjustments
function handleResponsiveLayout() {
    const width = window.innerWidth;
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    // Reset mobile menu on resize to desktop
    if (width > 992 && navLinks && mobileToggle) {
        navLinks.style.display = '';
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Adjust product card layouts
    adjustProductCards();
    
    // Fix hero height for different devices
    adjustHeroHeight();
}

// Optimize product cards for different screen sizes
function adjustProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const width = window.innerWidth;
    
    if (!productCards.length) return;
    
    // Add index attributes to nav links for staggered animation
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    if (width <= 576) {
        // Extra adjustments for small screens
        productCards.forEach(card => {
            const description = card.querySelector('.product-description');
            if (description) {
                description.style.webkitLineClamp = '2';
            }
        });
    } else {
        // Reset for larger screens
        productCards.forEach(card => {
            const description = card.querySelector('.product-description');
            if (description) {
                description.style.webkitLineClamp = '3';
            }
        });
    }
}

// Adjust hero section height based on screen size and orientation
function adjustHeroHeight() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const height = window.innerHeight;
    const width = window.innerWidth;
    const isLandscape = width > height;
    
    if (isLandscape && height < 600) {
        // Short landscape mode (like phones in landscape)
        heroSection.style.height = 'auto';
        heroSection.style.minHeight = '500px';
        heroSection.style.padding = '10rem 0';
    } else if (height > 800) {
        // Taller screens
        heroSection.style.height = '100vh';
        heroSection.style.padding = '0';
    } else {
        // Default
        heroSection.style.height = 'auto';
        heroSection.style.minHeight = '100vh';
        heroSection.style.padding = '12rem 0 6rem';
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the responsive handlers
    handleResponsiveLayout();
    
    // Fix viewport height issues on mobile browsers
    fixMobileViewportHeight();
});

// Fix the "100vh" issue on mobile browsers
function fixMobileViewportHeight() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update on resize and orientation change
    window.addEventListener('resize', () => {
        // Same logic as above
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // Update on orientation change (for iOS)
    window.addEventListener('orientationchange', () => {
        // Same logic as above, with a slight delay to ensure accurate measurement
        setTimeout(() => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });
} 