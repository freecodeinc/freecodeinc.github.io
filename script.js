document.addEventListener('DOMContentLoaded', function() {

    // --- Typewriter Animation ---
    const textElement = document.querySelector('.typewriter-text');
    if (textElement) {
        const fullText = textElement.textContent;
        textElement.textContent = ''; // Clear the visible element for typing

        let charIndex = 0;
        const typingSpeed = 55;

        function typeCharacterForElement() {
            if (charIndex < fullText.length) {
                const typed = fullText.substring(0, charIndex + 1);
                textElement.textContent = (charIndex % 12 <= 3) ? typed + "|" : typed;
                charIndex++;
                setTimeout(typeCharacterForElement, typingSpeed);
            } else {
                textElement.textContent = fullText;
            }
        }
        typeCharacterForElement();
    }

    // --- Responsive Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');

            if (!isOpen) {
                // Opening: ensure any closing state is cleared and show menu
                mobileNav.classList.remove('closing');
                mobileNav.classList.add('open');
                hamburger.classList.add('open');
            } else {
                // Closing: play CSS closing animation, then hide after transition
                mobileNav.classList.add('closing');
                mobileNav.classList.remove('open');
                // animate hamburger back to three bars
                hamburger.classList.remove('open');

                const onTransitionEnd = (e) => {
                    // wait for max-height/opacity transition to finish
                    if (e.propertyName === 'max-height' || e.propertyName === 'opacity') {
                        mobileNav.classList.remove('closing');
                        // ensure the element becomes truly hidden to assist accessibility
                        mobileNav.removeEventListener('transitionend', onTransitionEnd);
                    }
                };

                // Make sure visibility stays visible during animation so it can animate
                mobileNav.style.visibility = 'visible';
                mobileNav.addEventListener('transitionend', onTransitionEnd);
            }
        });
    }

    // --- NEW: Check and adjust layout for typewriter text ---
    function checkTypewriterLayout() {
        const placeholder = document.querySelector('.typewriter-placeholder');
        const container = document.querySelector('.horizontal');
        if (!placeholder || !container) return;

        // Temporarily remove the 'stacked' class to measure the text in its default horizontal layout
        container.classList.remove('stacked');

        const fontSize = 65;
        const lineHeight = 1.5;
        const maxLines = 3;
        // Calculate the height of a single line to determine the threshold
        const maxAllowedHeight = fontSize * lineHeight * maxLines;

        // Check if the placeholder's rendered height exceeds the limit for 3 lines
        if (placeholder.scrollHeight > maxAllowedHeight) {
            // If it does, apply the stacked layout
            container.classList.add('stacked');
        }
    }

    // Check the layout on initial page load
    checkTypewriterLayout();
    // Re-check the layout whenever the window is resized
    window.addEventListener('resize', checkTypewriterLayout);

});