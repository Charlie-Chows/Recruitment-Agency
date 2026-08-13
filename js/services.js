/* ==========================================================================
   STACKLY RECRUITMENT AGENCY - SERVICES PAGE JAVASCRIPT
   Handles Practice Accordions, Estimator Widget & Services GSAP Animations.
   ========================================================================== */

console.log('🚀 js/services.js loaded');

function runServicesInit() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    initPracticeAccordion();
    initCalculator();
    initServicesAnimations();

    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 200);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runServicesInit);
} else {
    runServicesInit();
}

function initPracticeAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function initCalculator() {
    const roleType = document.getElementById('roleType');
    const expLevel = document.getElementById('expLevel');
    const expVal = document.getElementById('expVal');
    const salaryEstimate = document.getElementById('salaryEstimate');
    const timeEstimate = document.getElementById('timeEstimate');

    const trigger = document.getElementById('roleDropdownTrigger');
    const menu = document.getElementById('roleDropdownMenu');
    const selectedText = document.getElementById('roleSelectedText');
    const dropdown = document.getElementById('roleCustomDropdown');

    if (trigger && menu) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = menu.classList.contains('active') || (dropdown && dropdown.classList.contains('open'));

            if (isOpen) {
                menu.classList.remove('active');
                if (dropdown) dropdown.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                menu.classList.add('active');
                if (dropdown) dropdown.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });

        const options = menu.querySelectorAll('.custom-dropdown-option');
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                if (selectedText) selectedText.textContent = opt.textContent;
                if (roleType) roleType.value = opt.getAttribute('data-value');
                menu.classList.remove('active');
                if (dropdown) dropdown.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
                calculate();
            });
        });

        document.addEventListener('click', (e) => {
            if (dropdown && !dropdown.contains(e.target)) {
                menu.classList.remove('active');
                if (dropdown) dropdown.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function calculate() {
        if (!expLevel || !salaryEstimate || !timeEstimate) return;
        const years = parseInt(expLevel.value, 10);
        const multiplier = parseFloat(roleType ? roleType.value : 1.2);

        if (expVal) expVal.textContent = `${years} ${years === 1 ? 'Year' : 'Years'}`;

        const baseSalary = 75000;
        const salary = Math.round((baseSalary + (years * 12000)) * multiplier);
        salaryEstimate.textContent = `$${salary.toLocaleString()}`;

        let days = 14;
        if (years > 8) days += 5;
        if (multiplier > 1.2) days += 4;
        timeEstimate.textContent = `${days} Days`;
    }

    if (expLevel) {
        expLevel.addEventListener('input', calculate);
        expLevel.addEventListener('change', calculate);
    }
    calculate();
}

function initServicesAnimations() {
    if (!document.querySelector('#servicesHero') || typeof gsap === 'undefined') return;

    // Hero Section Entrance Side-Sliding Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9, clearProps: 'all' } });
    heroTl.from('#servicesHero .section-badge', { x: -60, opacity: 0, duration: 0.65 })
          .from('#servicesHero .section-title', { x: 75, opacity: 0, duration: 0.85 }, '-=0.4')
          .from('#servicesHero .section-subtitle', { x: -60, opacity: 0, duration: 0.75 }, '-=0.5');

    let servicesMm = gsap.matchMedia();

    // Desktop Side-Sliding Animations
    servicesMm.add("(min-width: 768px)", () => {
        // Practice Accordions
        if (document.querySelector('#practices')) {
            gsap.from('#practices .section-header', {
                scrollTrigger: { trigger: '#practices .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#practices .story-image-wrapper', {
                scrollTrigger: { trigger: '#practices .story-image-wrapper', start: 'top 88%' },
                x: -75,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const accItems = document.querySelectorAll('.accordion-item');
            accItems.forEach((item, index) => {
                const slideX = (index % 2 === 0) ? 75 : -75;
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

        // Calculator Section
        if (document.querySelector('#calculator')) {
            gsap.from('#calculator .section-header', {
                scrollTrigger: { trigger: '#calculator .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#calculator .calc-card', {
                scrollTrigger: { trigger: '#calculator .calc-card', start: 'top 88%' },
                x: -75,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#calculator .story-image-wrapper', {
                scrollTrigger: { trigger: '#calculator .story-image-wrapper', start: 'top 88%' },
                x: 75,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // SLA Commitments Cards
        if (document.querySelector('#commitments')) {
            gsap.from('#commitments .section-header', {
                scrollTrigger: { trigger: '#commitments .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#commitments .story-image-wrapper', {
                scrollTrigger: { trigger: '#commitments .story-image-wrapper', start: 'top 88%' },
                x: -75,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const slaCards = document.querySelectorAll('#commitments .sla-card');
            slaCards.forEach((card, index) => {
                const slideX = (index % 2 === 0) ? 75 : -75;
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

        // Case Studies Grid
        if (document.querySelector('#caseStudies')) {
            gsap.from('#caseStudies .section-header', {
                scrollTrigger: { trigger: '#caseStudies .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const caseCards = document.querySelectorAll('.case-card');
            caseCards.forEach((card, index) => {
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

        // CTA Banner
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

    // Mobile Side-Sliding Animations
    servicesMm.add("(max-width: 767px)", () => {
        const accItems = document.querySelectorAll('.accordion-item');
        accItems.forEach((item, index) => {
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

        const caseCards = document.querySelectorAll('.case-card');
        caseCards.forEach((card, index) => {
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
