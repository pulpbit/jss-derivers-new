/* ==========================================================================
   JSS DRIVERS INDIA - LUXURY PREMIUM INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PRE-LOADER DISMISS
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Allow scrolling after preloader fades out
                document.body.style.overflowY = 'auto';
            }, 800); // Elegant delay to appreciate monogram
        });
    }

    // 2. STICKY HEADER
    const header = document.querySelector('.header');
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Trigger once on load in case page is refreshed halfway

    // 3. MOBILE MENU DRAWER
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openMenu = () => {
        mobileDrawer.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeMenu = () => {
        mobileDrawer.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Release scroll
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 4. SCROLL FADE-IN ANIMATIONS (INTERSECTION OBSERVER)
    const animatableElements = document.querySelectorAll(
        '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, ' +
        '.fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3, .fade-in-up-delay-4'
    );

    const animationObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing after animating once to preserve performance
                observer.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);

    animatableElements.forEach(element => {
        animationObserver.observe(element);
    });

    // 5. NAVIGATION LINK ACTIVE STATE SYNC
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpyObserverOptions = {
        threshold: 0.35,
        rootMargin: '-90px 0px -20% 0px' // Offset header height
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyObserverOptions);

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });

    // 6. ACCORDION FAQ LOGIC (EXCLUSIVE EXPAND)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const answer = currentItem.querySelector('.faq-answer');
            const isActive = currentItem.classList.contains('active');

            // Close all other accordion items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
            });

            // Toggle current item
            if (!isActive) {
                currentItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 7. GOOGLE REVIEWS SLIDER / CAROUSEL
    const track = document.getElementById('testimonialTrack');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const prevBtn = document.getElementById('prevReviewBtn');
    const nextBtn = document.getElementById('nextReviewBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentIndex = 0;
    let autoPlayTimer = null;
    const autoPlayInterval = 6000; // 6 seconds slide duration

    const updateSlider = (index) => {
        // Bounds checking
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        
        // Translate slide track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    };

    // Build dots dynamically
    if (dotsContainer && slides.length > 0) {
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                updateSlider(idx);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
    }

    const nextSlide = () => {
        updateSlider(currentIndex + 1);
    };

    const prevSlide = () => {
        updateSlider(currentIndex - 1);
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    const startAutoPlay = () => {
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    };

    const stopAutoPlay = () => {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Auto-play control on hover
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
        startAutoPlay();
    }

    // 8. BACK TO TOP BUTTON
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    const handleScrollBackToTop = () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    if (backToTopBtn) {
        window.addEventListener('scroll', handleScrollBackToTop);
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. SIMULATED BOOKING ANALYTICS & HOOKS
    const bookingButtons = document.querySelectorAll('a[href^="tel:"], a[href*="wa.me"]');
    bookingButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const isPhone = this.getAttribute('href').startsWith('tel:');
            const type = isPhone ? 'Phone Call' : 'WhatsApp Message';
            const value = this.getAttribute('href');
            console.log(`[JSS Analytics Triggered]: User clicked to initiate booking via ${type} (${value})`);
        });
    });

});
