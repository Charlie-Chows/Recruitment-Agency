/* ==========================================================================
   STACKLY RECRUITMENT AGENCY - HOMEPAGE JAVASCRIPT
   Handles Bento Spotlight, Homepage Tabs, Calculator Widget & GSAP.
   ========================================================================== */

console.log('🚀 js/home.js loaded');

function runHomeInit() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    initBentoSpotlight();
    initHeroAnimations();
    initScrollAnimations();
    initDashboardTabs();
    initCalculator();

    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 200);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runHomeInit);
} else {
    runHomeInit();
}

function initBentoSpotlight() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function initHeroAnimations() {
    if (typeof gsap === 'undefined' || !document.querySelector('.hero-section')) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9, clearProps: 'all' } });
    
    tl.from('.title-row-1, .title-row-2, .title-row-3', { x: -60, opacity: 0, stagger: 0.15, duration: 0.85 })
      .from('.hero-subtext', { x: -50, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-cta-wrapper', { x: -50, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-right-visual', { opacity: 0, x: 60, duration: 0.8, clearProps: 'all' }, '-=0.6');
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    let homeMm = gsap.matchMedia();

    // Desktop Side-Sliding Animations for Homepage
    homeMm.add("(min-width: 768px)", () => {
        // Section 2: Bento Grid
        if (document.querySelector('.bento-grid')) {
            const cards = document.querySelectorAll('.bento-card');
            cards.forEach((card, index) => {
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

        // Section 3: Process Timeline
        if (document.querySelector('#processTimeline')) {
            const steps = document.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                const slideX = (index % 2 === 0) ? -75 : 75;
                gsap.from(step, {
                    scrollTrigger: { trigger: step, start: 'top 88%' },
                    x: slideX,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        }

        // Section 4: Active Hiring Challenges Dashboard
        if (document.querySelector('#challenges')) {
            gsap.from('#challenges .section-header', {
                scrollTrigger: { trigger: '#challenges .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('.challenge-dashboard-container', {
                scrollTrigger: { trigger: '.challenge-dashboard-container', start: 'top 88%' },
                x: 75,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // Section 6: Hot Careers Grid
        if (document.querySelector('#jobs')) {
            gsap.from('#jobs .section-header', {
                scrollTrigger: { trigger: '#jobs .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const jobCards = document.querySelectorAll('#jobs .job-card');
            jobCards.forEach((card, index) => {
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

        // Section 8: Calculator Section Entrance Side-Sliding
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
        }

        // CTA Banner Section
        if (document.querySelector('.cta-banner-section')) {
            gsap.from('.cta-banner-section .cta-box, .cta-banner-section .container', {
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
    homeMm.add("(max-width: 767px)", () => {
        if (document.querySelector('.bento-grid')) {
            const cards = document.querySelectorAll('.bento-card');
            cards.forEach((card, index) => {
                const xVal = (index % 2 === 0) ? -45 : 45;
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 90%' },
                    x: xVal,
                    opacity: 0,
                    duration: 0.75,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            });
        }
    });
}

function initDashboardTabs() {
    const tabs = document.querySelectorAll('.dash-tab');
    const items = document.querySelectorAll('.dash-item');

    if (!tabs.length || !items.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            items.forEach(item => {
                const cat = item.getAttribute('data-cat');
                if (target === 'all' || cat === target) {
                    item.style.display = 'flex';
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(item, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' });
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
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
