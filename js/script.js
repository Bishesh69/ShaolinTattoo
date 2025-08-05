/**
 * Ink Masters Tattoo Shop - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Gallery Filtering
    initGalleryFilter();
    
    // Gallery Modal
    initGalleryModal();
    
    // Form Validation
    initFormValidation();
    
    // Contact Form Validation
    initContactForm();
    
    // Theme Toggle
    initThemeToggle();
    
    // Logo Scroll to Top
    initLogoScrollToTop();
    
    // Ensure gallery is visible on page load
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryGrid.style.opacity = '1';
        galleryGrid.style.transform = 'translateY(0) translateZ(0)';
    }
});

/**
 * Initialize Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navItems = document.querySelectorAll('nav ul li');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (menuToggle && nav) {
        // Add index to nav items for staggered animation
        navItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
        
        menuToggle.addEventListener('click', function() {
            toggleMenu();
        });
        
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });
    }
    
    // Function to toggle menu state
    function toggleMenu() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu when escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    }


/**
 * Initialize Gallery Filtering
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Show all gallery items regardless of category
    if (galleryItems.length) {
        galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
        });
    }
    
    // Keep the All Styles button functionality for consistency
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // All buttons should already be active since we only have one
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // No filtering needed as we're showing all items
                if (galleryGrid) {
                    // Apply a subtle animation effect when clicking the button
                    galleryGrid.style.willChange = 'transform';
                    galleryGrid.style.transform = 'translateY(5px) translateZ(0)';
                    
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            galleryGrid.style.transform = 'translateY(0) translateZ(0)';
                            
                            setTimeout(() => {
                                galleryGrid.style.willChange = 'auto';
                            }, 300);
                        }, 30);
                    });
                }
            });
        });
    }
}

/**
 * Initialize Gallery Modal
 */
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    
    if (galleryItems.length && modal) {
        const modalImage = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        const modalClose = document.querySelector('.modal-close');
        const modalContent = document.querySelector('.modal-content');
        
        // Pre-process gallery items to improve performance
        galleryItems.forEach(item => {
            // Add passive flag to event listeners for better performance
            item.style.willChange = 'auto';
            // Preload images for smoother transitions
            const img = item.querySelector('img');
            if (img) {
                img.loading = 'lazy';
            }
        });
        
        // Function to open modal with content
        const openModalWithContent = (item) => {
            const category = item.getAttribute('data-category');
            const placeholderText = item.querySelector('.placeholder-image').textContent;
            
            // Set modal content
            const itemImg = item.querySelector('img');
            if (itemImg && modalImage) {
                modalImage.src = itemImg.src;
                modalImage.alt = itemImg.alt || placeholderText;
            }
            
            modalCaption.innerHTML = '';
            
            // Enhanced caption with title only
            const titleEl = document.createElement('h4');
            titleEl.textContent = placeholderText;
            modalCaption.appendChild(titleEl);
            
            const descEl = document.createElement('p');
            descEl.textContent = 'Tattoo design';
            modalCaption.appendChild(descEl);
            
            // Show modal
            modal.style.display = 'block';
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        };
        
        // Enable click event for gallery items to open modal
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                openModalWithContent(this);
            }, { passive: true });
        });
        
        // Close modal when X is clicked
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
        
        // Navigate through gallery with arrow keys
        document.addEventListener('keydown', (e) => {
            if (modal.style.display !== 'block') return;
            
            const visibleItems = Array.from(galleryItems).filter(item => 
                getComputedStyle(item).display !== 'none'
            );
            
            if (visibleItems.length <= 1) return;
            
            // Find current item index
            const currentCategory = modalCaption.querySelector('p')?.textContent.split(' ')[0];
            const currentTitle = modalCaption.querySelector('h4')?.textContent;
            
            const currentIndex = visibleItems.findIndex(item => {
                const category = item.getAttribute('data-category');
                const title = item.querySelector('.placeholder-image').textContent;
                return category === currentCategory && title === currentTitle;
            });
            
            if (currentIndex === -1) return;
            
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % visibleItems.length;
            } else if (e.key === 'ArrowLeft') {
                nextIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            } else {
                return;
            }
            
            const nextItem = visibleItems[nextIndex];
            
            // Add transition effect
            if (modalContent) {
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    openModalWithContent(nextItem);
                    modalContent.style.opacity = '1';
                }, 200);
            } else {
                openModalWithContent(nextItem);
            }
        });
        
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

/**
 * Shared Form Validation Setup
 * This function sets up validation for any form by attaching event listeners and validation logic
 */
function setupFormValidation(form, formInputs, submitButton, successText) {
    // Add validation on blur for each input
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateInput(this);
        });
        
        // Also validate on input change after initial blur
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
    
    // Form submission with animation
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Validate all inputs
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        // Prevent submission if form is invalid
        if (!isValid) {
            event.preventDefault();
            
            // Scroll to first invalid input with smooth animation
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Shake submit button to indicate error
            if (submitButton) {
                submitButton.classList.add('shake');
                setTimeout(() => {
                    submitButton.classList.remove('shake');
                }, 600);
            }
        } else {
            // Add success animation if form is valid
            if (submitButton) {
                submitButton.classList.add('success');
                submitButton.textContent = successText || 'Submitting...';
            }
        }
    });
    
    // Add CSS for animations if not already in stylesheet
    if (!document.getElementById('form-animations')) {
        const style = document.createElement('style');
        style.id = 'form-animations';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-10px); }
                40%, 80% { transform: translateX(10px); }
            }
            .shake {
                animation: shake 0.6s ease-in-out;
            }
            .success {
                background-color: #28a745 !important;
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            }
            .error-message {
                opacity: 0;
                transform: translateY(-10px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            .error-message.show {
                opacity: 1;
                transform: translateY(0);
            }
            .focused label {
                color: var(--color-primary);
            }
            .has-error label {
                color: #ff3b30;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Input validation function
    function validateInput(input) {
        const value = input.value.trim();
        const id = input.id;
        let isValid = true;
        let errorMessage = '';
        
        // Skip validation for non-required empty fields
        if (value === '' && !input.required) {
            markValid(input);
            return true;
        }
        
        // Check if empty for required fields
        if (value === '' && input.required) {
            isValid = false;
            errorMessage = 'This field is required';
        } else {
            // Specific validation based on input type or id
            switch (id) {
                case 'email':
                case 'contact-email':
                    if (!isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'phone':
                case 'contact-phone':
                    if (!/^\d{10,15}$/.test(value.replace(/[\s()-]/g, ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
                case 'date':
                    // Basic date validation
                    if (value && !isValidDate(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid future date';
                    }
                    break;
                case 'description':
                    // Ensure minimum length for description
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Please provide more details (at least 10 characters)';
                    }
                    break;
                case 'terms':
                    if (!input.checked) {
                        isValid = false;
                        errorMessage = 'You must agree to the terms';
                    }
                    break;
            }
        }
        
        // Update UI based on validation with animation
        if (!isValid) {
            markInvalid(input, errorMessage);
        } else {
            markValid(input);
        }
        
        return isValid;
    }
    
    // Helper functions for form validation with enhanced UI feedback
    function markInvalid(field, message) {
        field.classList.add('invalid');
        field.parentElement.classList.add('has-error');
        
        // Create or update error message with animation
        let errorMessage = field.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
        
        errorMessage.textContent = message;
        
        // Add animation class
        setTimeout(() => {
            errorMessage.classList.add('show');
        }, 10);
    }
    
    function markValid(field) {
        field.classList.remove('invalid');
        field.parentElement.classList.remove('has-error');
        
        // Remove error message if it exists with fade out animation
        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.classList.remove('show');
            // Wait for animation to complete before removing
            setTimeout(() => {
                errorMessage.remove();
            }, 300);
        }
    }
}

/**
 * Initialize Form Validation
 */
function initFormValidation() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        const formInputs = bookingForm.querySelectorAll('input, textarea, select');
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        
        // Setup form validation and event listeners
        setupFormValidation(bookingForm, formInputs, submitButton, 'Booking...');
    }
}

/**
 * Helper validation functions used by setupFormValidation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidDate(dateString) {
    // Check if date is in the future
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
    
    return inputDate instanceof Date && !isNaN(inputDate) && inputDate >= today;
}

/**
 * Initialize Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollThreshold = heroHeight * 0.7; // 70% of hero height
        
        // Function to update header style based on scroll position
        function updateHeaderOnScroll() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Initial check on page load
        updateHeaderOnScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', updateHeaderOnScroll);
    }
}

/**
 * Initialize Contact Form Validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Setup form validation and event listeners
        setupFormValidation(contactForm, formInputs, submitButton, 'Sending...');
    }
}

/**
 * Initialize Theme Toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set the initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Toggle the theme
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            
            // Update the theme attribute
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save the preference
            localStorage.setItem('theme', newTheme);
            
            // Add animation class
            document.body.classList.add('theme-transition');
            
            // Remove animation class after transition completes
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    }
}

/**
 * Initialize Logo Scroll to Top
 */
function initLogoScrollToTop() {
    // Find all logo elements (both in header and mobile menu)
    const logoElements = document.querySelectorAll('.logo, .logo a, .logo img');
    
    logoElements.forEach(logo => {
        logo.addEventListener('click', function(event) {
            // Prevent default link behavior if it's an anchor tag
            event.preventDefault();
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}