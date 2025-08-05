/**
 * FAQ Accordion Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initFaqAccordion();
});

/**
 * Initialize FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
        
        // Accessibility enhancements
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            // Add appropriate ARIA attributes
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            const answerId = `faq-answer-${Math.random().toString(36).substring(2, 11)}`;
            const answer = question.nextElementSibling;
            
            if (answer) {
                answer.id = answerId;
                question.setAttribute('aria-controls', answerId);
            }
            
            // Handle keyboard navigation
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
            
            // Update ARIA attributes on toggle
            question.addEventListener('click', () => {
                const isExpanded = question.parentElement.classList.contains('active');
                question.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            });
        });
    }
}