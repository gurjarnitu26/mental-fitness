// Mental Health Website - Complete Interactive Features
// Single Page Application with routing, animations, and interactive components

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initPageRouting();
    initSmoothScrolling();
    initScrollAnimations();
    initFAQToggle();
    init3DCardEffects();
    initScrollIndicator();
    initParallaxEffects();
    initLoadingAnimations();
    initMobileMenu();
    initContactForm();
    initMeditationTimers();
    initTestimonialsSlider();
    
    // Page Routing System
    function initPageRouting() {
        const navLinks = document.querySelectorAll('.nav-links a[data-page]');
        const pages = document.querySelectorAll('.page');
        
        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                showPage(targetPage);
                
                // Update URL hash
                window.location.hash = targetPage;
                
                // Close mobile menu if open
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                if (mobileToggle && navLinks) {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
        
        // Handle initial page load
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
        
        // Handle browser back/forward
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                showPage(hash);
            }
        });
    }
    
    function showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.nav-links a[data-page]');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    
                    // Add smooth scroll class to html
                    document.documentElement.classList.add('smooth-scroll');
                    
                    // Calculate offset for fixed header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Add fade-in class and observe elements
        const elementsToAnimate = document.querySelectorAll('.stat, .resource-card, .meditation-card, .testimonial-card, .value-card, .faq-item, .sign-card, .care-tip, .preview-card');
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // FAQ Toggle functionality
    function initFAQToggle() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        });
    }
    
    // Enhanced 3D card effects with mouse tracking
    function init3DCardEffects() {
        const cards = document.querySelectorAll('.card-3d');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'none';
            });
            
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transition = 'transform 0.3s ease';
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }
    
    // Scroll indicator functionality
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const aboutSection = document.querySelector('#about');
                const headerHeight = document.querySelector('header').offsetHeight;
                
                if (aboutSection) {
                    window.scrollTo({
                        top: aboutSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
            
            // Hide scroll indicator after scrolling
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                
                if (scrolled > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '0.8';
                }
            });
        }
    }
    
    // Parallax effects for background elements
    function initParallaxEffects() {
        const heroShape = document.querySelector('.hero-shape');
        
        if (heroShape) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                heroShape.style.transform = `translate(-50%, -50%) translateY(${rate}px)`;
            });
        }
    }
    
    // Loading animations
    function initLoadingAnimations() {
        // Add loading class to elements
        const elementsToLoad = document.querySelectorAll('section');
        elementsToLoad.forEach(el => el.classList.add('loading'));
        
        // Trigger loaded state after a short delay
        setTimeout(() => {
            elementsToLoad.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('loaded');
                }, index * 100);
            });
        }, 300);
    }
    
    // Mobile menu functionality
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', function() {
                mobileToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking on a link
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function() {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }
    
    // Contact form validation and submission
    function initContactForm() {
        const form = document.getElementById('counselingForm');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateCounselingForm()) {
                    submitCounselingForm();
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
        }
    }
    
    function validateCounselingForm() {
        const form = document.getElementById('counselingForm');
        const name = form.querySelector('#counseling-name');
        const email = form.querySelector('#counseling-email');
        const privacy = form.querySelector('#counseling-privacy');
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            showFieldError(name, 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showFieldError(name, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showFieldError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate privacy checkbox
        if (!privacy.checked) {
            showFieldError(privacy, 'You must agree to the privacy policy');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'name':
                if (!value) {
                    showFieldError(field, 'Name is required');
                } else if (value.length < 2) {
                    showFieldError(field, 'Name must be at least 2 characters');
                } else {
                    showFieldSuccess(field);
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    showFieldError(field, 'Email is required');
                } else if (!emailRegex.test(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                } else {
                    showFieldSuccess(field);
                }
                break;
        }
    }
    
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function showFieldSuccess(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function submitCounselingForm() {
        const form = document.getElementById('counselingForm');
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Clear all field states
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error', 'success');
                const errorElement = group.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Request Submitted Successfully!</h3>
                <p>Thank you for reaching out. We'll connect you with mental health resources in your area within 24 hours.</p>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    // Meditation Timer Functionality
    function initMeditationTimers() {
        const startButtons = document.querySelectorAll('.start-meditation-btn');
        
        startButtons.forEach(button => {
            button.addEventListener('click', function() {
                const duration = parseInt(this.getAttribute('data-duration'));
                const card = this.closest('.meditation-card');
                const timerDisplay = card.querySelector('.timer-display');
                const startBtn = card.querySelector('.start-meditation-btn');
                
                // Hide start button and show timer
                startBtn.style.display = 'none';
                timerDisplay.style.display = 'flex';
                
                // Start the timer
                startMeditationTimer(card, duration);
            });
        });
        
        // Handle pause/stop buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('pause-btn')) {
                const card = e.target.closest('.meditation-card');
                pauseMeditationTimer(card);
            } else if (e.target.classList.contains('stop-btn')) {
                const card = e.target.closest('.meditation-card');
                stopMeditationTimer(card);
            }
        });
    }
    
    function startMeditationTimer(card, duration) {
        const timer = card.querySelector('.timer-progress');
        const minutesSpan = card.querySelector('.minutes');
        const secondsSpan = card.querySelector('.seconds');
        const pauseBtn = card.querySelector('.pause-btn');
        
        let timeLeft = duration;
        let isPaused = false;
        
        // Store timer data on the card
        card.timerData = {
            timeLeft: timeLeft,
            totalDuration: duration,
            isPaused: isPaused,
            interval: null
        };
        
        function updateTimer() {
            if (card.timerData.isPaused) return;
            
            const minutes = Math.floor(card.timerData.timeLeft / 60);
            const seconds = card.timerData.timeLeft % 60;
            
            minutesSpan.textContent = minutes.toString().padStart(2, '0');
            secondsSpan.textContent = seconds.toString().padStart(2, '0');
            
            // Update progress circle
            const progress = ((card.timerData.totalDuration - card.timerData.timeLeft) / card.timerData.totalDuration) * 283;
            timer.style.strokeDashoffset = 283 - progress;
            
            if (card.timerData.timeLeft <= 0) {
                completeMeditation(card);
                return;
            }
            
            card.timerData.timeLeft--;
        }
        
        // Start the timer
        card.timerData.interval = setInterval(updateTimer, 1000);
        updateTimer();
    }
    
    function pauseMeditationTimer(card) {
        if (card.timerData) {
            card.timerData.isPaused = !card.timerData.isPaused;
            const pauseBtn = card.querySelector('.pause-btn');
            pauseBtn.textContent = card.timerData.isPaused ? 'Resume' : 'Pause';
        }
    }
    
    function stopMeditationTimer(card) {
        if (card.timerData && card.timerData.interval) {
            clearInterval(card.timerData.interval);
        }
        
        const timerDisplay = card.querySelector('.timer-display');
        const startBtn = card.querySelector('.start-meditation-btn');
        const pauseBtn = card.querySelector('.pause-btn');
        
        // Reset display
        timerDisplay.style.display = 'none';
        startBtn.style.display = 'block';
        pauseBtn.textContent = 'Pause';
        
        // Reset timer
        const timer = card.querySelector('.timer-progress');
        const minutesSpan = card.querySelector('.minutes');
        const secondsSpan = card.querySelector('.seconds');
        
        timer.style.strokeDashoffset = 283;
        minutesSpan.textContent = Math.floor(card.timerData.totalDuration / 60).toString().padStart(2, '0');
        secondsSpan.textContent = '00';
        
        delete card.timerData;
    }
    
    function completeMeditation(card) {
        if (card.timerData && card.timerData.interval) {
            clearInterval(card.timerData.interval);
        }
        
        // Show completion message
        const completionMessage = document.createElement('div');
        completionMessage.className = 'meditation-completion';
        completionMessage.innerHTML = `
            <div class="completion-content">
                <i class="fas fa-heart"></i>
                <h3>Meditation Complete!</h3>
                <p>Great job! You've completed your meditation session.</p>
                <button class="cta-button primary" onclick="this.closest('.meditation-completion').remove()">
                    Continue
                </button>
            </div>
        `;
        
        document.body.appendChild(completionMessage);
        
        // Reset timer display
        setTimeout(() => {
            stopMeditationTimer(card);
        }, 1000);
    }
    
    // Testimonials Slider
    function initTestimonialsSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto-advance slides
        setInterval(nextSlide, 5000);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }
    
    // Enhanced header behavior on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Auto-hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Statistics counter animation
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat h3');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            if (text.includes('in') || text.includes('%')) {
                // Extract number for animation
                const number = text.match(/\d+/);
                if (number) {
                    const finalNumber = parseInt(number[0]);
                    animateNumber(stat, finalNumber, text);
                }
            }
        });
    }
    
    function animateNumber(element, finalNumber, originalText) {
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                element.textContent = originalText;
                clearInterval(timer);
            } else {
                const displayNumber = Math.floor(currentNumber);
                element.textContent = originalText.replace(/\d+/, displayNumber);
            }
        }, 50);
    }
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Add CSS for scrolled header state and success message
    const style = document.createElement('style');
    style.textContent = `
        header {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        header.scrolled {
            background: rgba(45, 55, 72, 0.98);
            box-shadow: 0 2px 20px rgba(0,0,0,0.2);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .success-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        
        .success-content i {
            font-size: 3rem;
            color: #48bb78;
            margin-bottom: 1rem;
        }
        
        .success-content h3 {
            color: #2d3748;
            margin-bottom: 0.5rem;
        }
        
        .success-content p {
            color: #4a5568;
            margin: 0;
        }
        
        .meditation-completion {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        }
        
        .completion-content {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        
        .completion-content i {
            font-size: 3rem;
            color: #4a90e2;
            margin-bottom: 1rem;
        }
        
        .completion-content h3 {
            color: #2d3748;
            margin-bottom: 0.5rem;
        }
        
        .completion-content p {
            color: #4a5568;
            margin-bottom: 1.5rem;
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .loading.loaded {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Utility function for smooth animations
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// Error handling for browser compatibility
window.addEventListener('error', function(e) {
    console.warn('Minor script error handled:', e.message);
});