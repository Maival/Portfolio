// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initSummaryAnimations();

    initAnimations();
    initScrollEffects();
    initNavbar();
    initFormHandling();
    initParallax();

});

// Initialize Hero Reference Section Animations
function initSummaryAnimations() {
    // Hero left content animation
    gsap.to('.hero-ref-left', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
            trigger: '.hero-reference',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Hero right laptop animation
    gsap.to('.hero-ref-right', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
        scrollTrigger: {
            trigger: '.hero-reference',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Laptop 3D rotation on scroll
    gsap.to('.laptop-3d', {
        rotateY: 15,
        rotateX: -5,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-reference',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Dynamic rotating messages with typing animation - Different messages for JS and Java
    const jsMessages = [
        'Consistency is key',
        'Code is like humor.',
        'Create opportunities.',
        'Full Stack Developer',
        'Clean code matters.'
    ];

    const javaMessages = [
        'Java Developer',
        'Write once, run anywhere',
        'Keep it simple.',
        'Java is robust.',
        'Object Oriented.'
    ];

    let currentJsIndex = 0;
    let currentJavaIndex = 0;

    // Track typing state per element
    const typingStates = new Map();

    function typeMessage(message, element, callback) {
        if (typingStates.get(element)) return;
        typingStates.set(element, true);
        element.textContent = '';
        element.style.opacity = '1';
        element.classList.remove('typing-complete');

        // Add quotes around the message
        const fullMessage = `'${message}'`;
        let charIndex = 0;
        let timeoutId = null;

        function typeChar() {
            if (charIndex < fullMessage.length) {
                element.textContent += fullMessage[charIndex];
                charIndex++;
                timeoutId = setTimeout(typeChar, 50); // 50ms per character
            } else {
                typingStates.set(element, false);
                element.classList.add('typing-complete');
                if (callback) callback();
            }
        }

        typeChar();
    }

    function eraseMessage(element, callback) {
        if (typingStates.get(element)) return;
        typingStates.set(element, true);
        const currentText = element.textContent;
        let charIndex = currentText.length;
        let timeoutId = null;

        function eraseChar() {
            if (charIndex > 0) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                timeoutId = setTimeout(eraseChar, 30); // Faster erasing
            } else {
                typingStates.set(element, false);
                if (callback) callback();
            }
        }

        eraseChar();
    }

    function updateMessages() {
        const jsMessageEl = document.getElementById('jsMessage');
        const javaMessageEl = document.getElementById('javaMessage');

        if (!jsMessageEl || !javaMessageEl) return;

        const jsMessage = jsMessages[currentJsIndex];
        const javaMessage = javaMessages[currentJavaIndex];

        // Erase both messages simultaneously
        let eraseComplete = 0;
        const onEraseComplete = () => {
            eraseComplete++;
            if (eraseComplete === 2) {
                // Both erased, now type different messages
                let typeComplete = 0;
                const onTypeComplete = () => {
                    typeComplete++;
                    if (typeComplete === 2) {
                        // Both typed, wait before next message
                        setTimeout(() => {
                            currentJsIndex = (currentJsIndex + 1) % jsMessages.length;
                            currentJavaIndex = (currentJavaIndex + 1) % javaMessages.length;
                            updateMessages();
                        }, 3000); // Show message for 3 seconds
                    }
                };

                // Type different messages in each
                typeMessage(jsMessage, jsMessageEl, onTypeComplete);
                typeMessage(javaMessage, javaMessageEl, onTypeComplete);
            }
        };

        eraseMessage(jsMessageEl, onEraseComplete);
        eraseMessage(javaMessageEl, onEraseComplete);
    }

    // Initialize code typing animation
    function initCodeTyping() {
        const jsMessageEl = document.getElementById('jsMessage');
        const javaMessageEl = document.getElementById('javaMessage');

        if (!jsMessageEl || !javaMessageEl) return;

        // Start with first messages - type different messages
        const firstJsMessage = jsMessages[0];
        const firstJavaMessage = javaMessages[0];
        let typeComplete = 0;
        const onTypeComplete = () => {
            typeComplete++;
            if (typeComplete === 2) {
                // Both typed, start cycling after initial message
                setTimeout(() => {
                    currentJsIndex = 1;
                    currentJavaIndex = 1;
                    updateMessages();
                }, 3000);
            }
        };

        typeMessage(firstJsMessage, jsMessageEl, onTypeComplete);
        typeMessage(firstJavaMessage, javaMessageEl, onTypeComplete);
    }

    // Initialize code typing after page load
    setTimeout(() => {
        initCodeTyping();
    }, 1500);

    // Laptop mouse interaction
    const laptopContainer = document.querySelector('.laptop-3d-container');
    if (laptopContainer) {
        laptopContainer.addEventListener('mousemove', (e) => {
            const rect = laptopContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = -((y - centerY) / centerY) * 10;

            gsap.to('.laptop-3d', {
                rotateY: rotateY,
                rotateX: rotateX,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        laptopContainer.addEventListener('mouseleave', () => {
            gsap.to('.laptop-3d', {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // Section title 3D animation - handled in initSkills3DAnimations

    // About section animations
    gsap.to('.about-left', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.to('.about-right', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });


}



// Initialize all animations
function initAnimations() {
    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl.to('.hero-name', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    })
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.hero-stats', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.stat-fill', {
            width: function (index, target) {
                return target.dataset.progress + '%';
            },
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.2
        }, '-=0.5');

    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // About section text animations
    gsap.utils.toArray('.about-text p').forEach((p, index) => {
        gsap.to(p, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.2,
            scrollTrigger: {
                trigger: p,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Skill cards animations
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Experience card animation
    gsap.to('.experience-card', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.experience-card',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });



    // DSA Skills animations
    gsap.utils.toArray('.dsa-category').forEach((category, index) => {
        gsap.to(category, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Timeline items animations
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Project cards animations
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.15,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Projects title animation
    gsap.to('.projects-title', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.projects-title',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });

    // Education items animations
    gsap.utils.toArray('.education-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });



    // Contact form animation
    gsap.to('.contact-form-container', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-form-container',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
}

// Initialize scroll effects
function initScrollEffects() {
    // Smooth scroll snapping
    document.documentElement.style.scrollSnapType = 'y proximity';

    // Add scroll snap to sections
    gsap.utils.toArray('section').forEach(section => {
        section.style.scrollSnapAlign = 'start';
        section.style.scrollSnapStop = 'always';
    });

    // Parallax effect for hero section
    gsap.to('.hero::before', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            gsap.to(navbar, {
                y: -100,
                duration: 0.3,
                ease: 'power2.inOut'
            });
        } else {
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
                ease: 'power2.inOut'
            });
        }

        lastScroll = currentScroll;
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}



// Initialize parallax effects
function initParallax() {
    // 3D Parallax for summary section
    gsap.to('.summary-content', {
        rotateX: -5,
        rotateY: 2,
        ease: 'none',
        scrollTrigger: {
            trigger: '.summary',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Parallax for hero background
    gsap.to('.hero', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 3D Parallax for hero content
    gsap.to('.hero-content', {
        rotateX: 3,
        rotateY: -2,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // 3D Parallax for project cards - Removed to match clean 2D design
    /*
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.to(card, {
            y: index % 2 === 0 ? -30 : 30,
            rotateY: index % 2 === 0 ? 2 : -2,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    */

    // 3D Parallax for skill cards
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.to(card, {
            rotateY: (index % 4) * 2 - 3,
            rotateX: (index % 2) * 1,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
            }
        });
    });
}


// Form handling
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Animation on submit
            const button = form.querySelector('.cta-button');
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Reset form
                    form.reset();

                    // Show success message (you can customize this)
                    const successMsg = document.createElement('div');
                    successMsg.textContent = 'Message sent successfully!';
                    successMsg.style.cssText = `
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        background: var(--accent-yellow-green);
                        color: var(--primary-dark);
                        padding: 1rem 2rem;
                        border-radius: 8px;
                        font-weight: 600;
                        z-index: 10000;
                        box-shadow: 0 4px 20px rgba(184, 233, 148, 0.5);
                    `;
                    document.body.appendChild(successMsg);

                    gsap.from(successMsg, {
                        x: 100,
                        opacity: 0,
                        duration: 0.3
                    });

                    setTimeout(() => {
                        gsap.to(successMsg, {
                            x: 100,
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => successMsg.remove()
                        });
                    }, 3000);
                }
            });
        });
    }
}

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', function () {


    // Skill cards hover effect
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.05,
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.02,
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });



    // Nav links hover effect
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            gsap.to(this, {
                y: -2,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', function () {
            gsap.to(this, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
});


// Performance optimization: Use requestAnimationFrame for scroll events
let ticking = false;

function updateOnScroll() {
    // Scroll-based animations are handled by GSAP ScrollTrigger
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Intersection Observer for additional performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Show button after 50px scroll
            if (window.scrollY > 50) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            // Disable scroll snap temporarily for smooth GSAP scroll
            document.documentElement.style.scrollSnapType = 'none';

            gsap.to(window, {
                duration: 1.0,
                scrollTo: { y: 0 },
                ease: 'power2.inOut',
                onComplete: () => {
                    // Re-enable scroll snap after animation completes
                    document.documentElement.style.scrollSnapType = 'y proximity';
                }
            });
        });
    }

    // Fix for Contact link scroll offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                // Disable scroll snap for smooth navigation
                document.documentElement.style.scrollSnapType = 'none';

                gsap.to(window, {
                    duration: 1.0,
                    scrollTo: { y: offsetPosition },
                    ease: 'power2.inOut',
                    onComplete: () => {
                        document.documentElement.style.scrollSnapType = 'y proximity';
                    }
                });
            }
        });
    });
});
