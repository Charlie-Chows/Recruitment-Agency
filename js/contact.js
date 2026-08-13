/* ==========================================================================
   STACKLY RECRUITMENT AGENCY - CONTACT PAGE JAVASCRIPT
   Handles Form Submission, Auto-Clear on Back Navigation, FAQs & GSAP.
   ========================================================================== */

console.log('🚀 js/contact.js loaded');

function runContactInit() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    initContactForm();
    initFAQAccordion();
    initContactAnimations();
    
    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 200);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runContactInit);
} else {
    runContactInit();
}

// Clear contact form automatically when navigating back via browser history
window.addEventListener('pageshow', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        const selectedText = document.getElementById('contactInquirySelectedText');
        if (selectedText) selectedText.textContent = 'Select Inquiry Type';
        const hiddenInput = document.getElementById('contactInquirySelect');
        if (hiddenInput) hiddenInput.value = '';
        const errSpan = document.getElementById('contactInquiryError');
        if (errSpan) errSpan.style.display = 'none';
    }
});

function setupCustomDropdown(triggerId, menuId, selectedTextId, hiddenInputId) {
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);
    const selectedText = document.getElementById(selectedTextId);
    const hiddenInput = document.getElementById(hiddenInputId);

    if (!trigger || !menu) return;

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.custom-dropdown-menu').forEach(m => {
            if (m !== menu) m.classList.remove('active');
        });
        trigger.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('active');
    });

    const options = menu.querySelectorAll('.custom-dropdown-option');
    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            if (selectedText) selectedText.textContent = opt.textContent;
            const val = opt.getAttribute('data-value');
            if (hiddenInput) hiddenInput.value = val;
            const errSpan = document.getElementById('contactInquiryError');
            if (errSpan) errSpan.style.display = 'none';
            trigger.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !menu.contains(e.target)) {
            trigger.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
        }
    });
}

function initContactForm() {
    setupCustomDropdown('contactInquiryTrigger', 'contactInquiryMenu', 'contactInquirySelectedText', 'contactInquirySelect');

    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const hiddenInput = document.getElementById('contactInquirySelect');
        const errSpan = document.getElementById('contactInquiryError');

        if (hiddenInput && !hiddenInput.value) {
            if (errSpan) errSpan.style.display = 'block';
            return;
        }

        if (errSpan) errSpan.style.display = 'none';
        form.reset();
        window.location.href = '404.html';
    });
}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function initContactAnimations() {
    if (!document.querySelector('#contactHero') || typeof gsap === 'undefined') return;

    // 1. Direct Executive Channels Hero Side-Sliding Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9, clearProps: 'all' } });
    heroTl.from('#contactHero .section-badge', { x: -65, opacity: 0, duration: 0.65 })
          .from('#contactHero .section-title', { x: 75, opacity: 0, duration: 0.85 }, '-=0.4')
          .from('#contactHero .section-subtitle', { x: -65, opacity: 0, duration: 0.75 }, '-=0.5');

    let contactMm = gsap.matchMedia();

    // Desktop Side-Sliding Animations
    contactMm.add("(min-width: 768px)", () => {
        // Direct Executive Channels Office Hub Cards (Individual Side-Sliding)
        if (document.querySelector('.office-hubs-grid')) {
            const officeCards = document.querySelectorAll('.office-card');
            officeCards.forEach((card, index) => {
                const slideX = (index % 2 === 0) ? -75 : 75;
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 88%' },
                    x: slideX,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        }

        // 2. Contact Form & Sidebar Split
        if (document.querySelector('.contact-split-grid')) {
            gsap.from('#inquiryForm .section-header', {
                scrollTrigger: { trigger: '#inquiryForm .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('.contact-form-card', {
                scrollTrigger: { trigger: '.contact-form-card', start: 'top 88%' },
                x: -75,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('.info-sidebar-card', {
                scrollTrigger: { trigger: '.info-sidebar-card', start: 'top 88%' },
                x: 75,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // 3. Map Section Side-Sliding
        if (document.querySelector('#mapLocation')) {
            gsap.from('#mapLocation .section-header', {
                scrollTrigger: { trigger: '#mapLocation .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('.map-container-card', {
                scrollTrigger: { trigger: '.map-container-card', start: 'top 88%' },
                x: -80,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // 4. EVERY FAQ Accordion Item Slides in from Side as User Scrolls
        if (document.querySelector('.faq-container')) {
            gsap.from('#faq .section-header', {
                scrollTrigger: { trigger: '#faq .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
                const slideX = (index % 2 === 0) ? -75 : 75;
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: 'top 88%' },
                    x: slideX,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        }

        // 5. EVERY SLA Commitments Card Slides in from Side as User Scrolls
        if (document.querySelector('#commitments')) {
            gsap.from('#commitments .section-header', {
                scrollTrigger: { trigger: '#commitments .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const slaCards = document.querySelectorAll('#commitments .sla-card');
            slaCards.forEach((card, index) => {
                const slideX = (index % 2 === 0) ? -75 : 75;
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 88%' },
                    x: slideX,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        }

        // 6. CTA Banner Side-Sliding
        if (document.querySelector('.cta-banner-section')) {
            gsap.from('.cta-banner-section .cta-box', {
                scrollTrigger: { trigger: '.cta-banner-section', start: 'top 88%' },
                x: -75,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }
    });

    // Mobile Side-Sliding Animations for Individual Cards & FAQs
    contactMm.add("(max-width: 767px)", () => {
        const officeCards = document.querySelectorAll('.office-card');
        officeCards.forEach((card, index) => {
            const xVal = (index % 2 === 0) ? -40 : 40;
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 90%' },
                x: xVal,
                opacity: 0,
                duration: 0.75,
                ease: 'power2.out',
                clearProps: 'all'
            });
        });

        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            const xVal = (index % 2 === 0) ? -40 : 40;
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 90%' },
                x: xVal,
                opacity: 0,
                duration: 0.75,
                ease: 'power2.out',
                clearProps: 'all'
            });
        });

        const slaCards = document.querySelectorAll('#commitments .sla-card');
        slaCards.forEach((card, index) => {
            const xVal = (index % 2 === 0) ? -40 : 40;
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 90%' },
                x: xVal,
                opacity: 0,
                duration: 0.75,
                ease: 'power2.out',
                clearProps: 'all'
            });
        });
    });
}
