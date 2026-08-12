/* ==========================================================================
   HUMANDECK RECRUITMENT AGENCY - JAVASCRIPT & GSAP ANIMATIONS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    // Initialize Mobile Navigation Toggle
    initMobileNav();
    // Initialize GSAP Animations
    initHeroAnimations();
    initScrollAnimations();
    // Initialize Interactive Widgets
    initDashboardTabs();
    initCalculator();
    initAboutAnimations();
    initServicesAnimations();
});

/* --------------------------------------------------------------------------
   1. Responsive Mobile Menu Drawer
   -------------------------------------------------------------------------- */
window.toggleMobileMenu = function(e) {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const body = document.body;
    const html = document.documentElement;

    if (!mobileToggle || !mobileDrawer) return;

    const isActive = mobileDrawer.classList.contains('active');
    if (isActive) {
        mobileDrawer.classList.remove('active');
        mobileToggle.classList.remove('active');
        body.classList.remove('no-scroll');
        html.classList.remove('no-scroll');
    } else {
        mobileDrawer.classList.add('active');
        mobileToggle.classList.add('active');
        body.classList.add('no-scroll');
        html.classList.add('no-scroll');
    }
};

window.closeMobileMenu = function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const body = document.body;
    const html = document.documentElement;

    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (body) body.classList.remove('no-scroll');
    if (html) html.classList.remove('no-scroll');
};

function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (!mobileToggle || !mobileDrawer) return;

    mobileToggle.onclick = window.toggleMobileMenu;

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeMobileMenu();
    });

    // Close menu when clicking any mobile navigation link
    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            window.closeMobileMenu();

            if (!href || href === '#' || href.startsWith('javascript:')) return;

            let currentPath = window.location.pathname.split('/').pop().toLowerCase();
            if (!currentPath) currentPath = 'index.html';
            let targetPath = href.split('/').pop().toLowerCase();
            if (!targetPath) targetPath = 'index.html';

            if (currentPath === targetPath) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                e.preventDefault();
                window.location.href = href;
            }
        });
    });
}

/* --------------------------------------------------------------------------
   2. GSAP Hero Section Animations (Reference Design Polish)
   -------------------------------------------------------------------------- */
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    // Entrance animation for header & hero elements
    tl.from('.site-header', { y: -50, opacity: 0, duration: 0.8 })
      .from('.hero-title span', { y: 40, opacity: 0, stagger: 0.15 }, '-=0.4')
      .from('.hero-subtext', { y: 20, opacity: 0 }, '-=0.6')
      .from('.hero-cta-wrapper', { y: 20, opacity: 0 }, '-=0.5')
      .from('.candidate-card-purple', { scale: 0.8, opacity: 0, duration: 0.8 }, '-=0.8')
      .from('.candidate-card-blue', { scale: 0.8, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.rating-widget-card', { x: -30, opacity: 0 }, '-=0.5')
      .from('.challenges-status-card', { y: 30, opacity: 0 }, '-=0.5')
      .from('.floating-avatars-group img', { scale: 0, opacity: 0, stagger: 0.1 }, '-=0.4');
       // Continuous smooth floating motion (levitation) for reference visual cards
    gsap.to('.gsap-float', {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    gsap.to('.gsap-float-delayed', {
        y: 10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
    });
    gsap.to('.gsap-card-float', {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
        gsap.to('.gsap-card-float-2', {
        y: 8,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

/* --------------------------------------------------------------------------
   3. GSAP Scroll Triggered Animations across 10 Sections
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    // Reveal Section Titles on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    // Reveal Service & Bento Cards with mobile-only side sliding and desktop entrance
    const bentoCards = document.querySelectorAll('.bento-card');
    if (bentoCards.length > 0) {
        let bentoMm = gsap.matchMedia();

        // Mobile View (< 768px): Alternating left & right sliding animations per card
        bentoMm.add("(max-width: 767px)", () => {
            bentoCards.forEach((card, index) => {
                const xOffset = (index % 2 === 0) ? -30 : 30;
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                    },
                    x: xOffset,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        });

        // Desktop View (>= 768px): Original desktop staggered entrance
        bentoMm.add("(min-width: 768px)", () => {
            gsap.from('.bento-card', {
                scrollTrigger: {
                    trigger: '.bento-grid',
                    start: 'top 85%'
                },
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });
        });
    }
    // Reveal Dashboard Items with staggered smooth entrance effect
    if (document.querySelector('.dashboard-list')) {
        gsap.from('.dash-item', {
            scrollTrigger: {
                trigger: '.dashboard-list',
                start: 'top 85%'
            },
            y: 25,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            clearProps: 'all'
        });
    }

    // Reveal Hot Career Job Cards with dynamic side-sliding animations
    const jobCards = document.querySelectorAll('.job-card');
    if (jobCards.length > 0) {
        let mm = gsap.matchMedia();

        // Mobile View (< 768px): Alternating left & right sliding animations per card
        mm.add("(max-width: 767px)", () => {
            jobCards.forEach((card, index) => {
                const xOffset = (index % 2 === 0) ? -30 : 30;
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                    },
                    x: xOffset,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        });

        // Desktop View (>= 768px): Dynamic side entrance for outer cards & center lift
        mm.add("(min-width: 768px)", () => {
            jobCards.forEach((card, index) => {
                const xOffset = index === 0 ? -60 : (index === jobCards.length - 1 ? 60 : 0);
                const yOffset = index === 1 ? 35 : 0;
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: '.jobs-grid',
                        start: 'top 85%',
                    },
                    x: xOffset,
                    y: yOffset,
                    opacity: 0,
                    duration: 0.85,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        });
    }
    // Reveal AI Matching Step Cards - Mobile Only Side Sliding Effects
    const darkStepCards = document.querySelectorAll('.dark-step-card');
    if (darkStepCards.length > 0) {
        let stepMm = gsap.matchMedia();
        // Mobile View (< 768px): Alternating left & right sliding animations per card
        stepMm.add("(max-width: 767px)", () => {
            darkStepCards.forEach((card, index) => {
                const xOffset = (index % 2 === 0) ? -30 : 30;
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                    },
                    x: xOffset,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        });
    }

    // Reveal Process Steps
    gsap.from('.process-step', {
        scrollTrigger: {
            trigger: '#processTimeline',
            start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    });
}

/* --------------------------------------------------------------------------
   4. Interactive Challenge Dashboard Filters
   -------------------------------------------------------------------------- */
function initDashboardTabs() {
    const tabs = document.querySelectorAll('.dash-tab');
    const items = document.querySelectorAll('.dash-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.getAttribute('data-target');
            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-cat') === category) {
                    item.style.display = 'flex';
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(item, 
                            { opacity: 0, y: 15 },
                            { opacity: 1, y: 0, duration: 0.35, clearProps: 'transform,opacity' }
                        );
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. Interactive Salary & Cost Calculator
   -------------------------------------------------------------------------- */
function initCalculator() {
    const roleType = document.getElementById('roleType');
    const expLevel = document.getElementById('expLevel');
    const expVal = document.getElementById('expVal');
    const salaryEst = document.getElementById('salaryEstimate');
    const timeEst = document.getElementById('timeEstimate');
    const customDropdown = document.getElementById('roleCustomDropdown');
    const dropdownTrigger = document.getElementById('roleDropdownTrigger');
    const dropdownText = document.getElementById('roleSelectedText');
    const dropdownOptions = document.querySelectorAll('.custom-dropdown-option');

    if (!roleType || !expLevel) return;

    function updateCalc() {
        const years = parseInt(expLevel.value, 10);
        const multiplier = parseFloat(roleType.value || 1.2);
        expVal.textContent = `${years} Year${years > 1 ? 's' : ''}`;

        // Base salary calculation
        const base = 75000 + (years * 11000);
        const finalSalary = Math.round(base * multiplier);
        salaryEst.textContent = `$${finalSalary.toLocaleString()}`;

        // Turnaround time calculation based on experience level
        const days = Math.max(7, Math.round(10 + (years * 0.8)));
        timeEst.textContent = `${days} Days`;
    }

    // Custom Dropdown Interactive Behavior
    if (customDropdown && dropdownTrigger) {
        dropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = customDropdown.classList.contains('open');
            customDropdown.classList.toggle('open');
            dropdownTrigger.setAttribute('aria-expanded', !isOpen);
        });

        dropdownOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                const val = option.getAttribute('data-value');
                roleType.value = val;
                dropdownText.textContent = option.textContent.replace('✓', '').trim();
                
                customDropdown.classList.remove('open');
                dropdownTrigger.setAttribute('aria-expanded', 'false');
                updateCalc();
            });
        });

        // Close dropdown when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!customDropdown.contains(e.target)) {
                customDropdown.classList.remove('open');
                dropdownTrigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    expLevel.addEventListener('input', updateCalc);
    updateCalc();
}
/* --------------------------------------------------------------------------
   6. Mouse Spotlight Glow Effect
   -------------------------------------------------------------------------- */
function initBentoSpotlight() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Call Spotlight on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initBentoSpotlight();
});

/* --------------------------------------------------------------------------
   7. Newsletter Validation & 404 Redirect
   -------------------------------------------------------------------------- */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    const errorMsg = document.getElementById('newsletterError');
    if (!input) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value.trim())) {
        if (errorMsg) errorMsg.style.display = 'none';
        window.location.href = '404.html';
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
    }
}
function toggleProcess(type) {
    const btnEmployers = document.getElementById('btnEmployers');
    const btnCandidates = document.getElementById('btnCandidates');
    const timeline = document.getElementById('processTimeline');
    if (type === 'employers') {
        btnEmployers.className = 'btn btn-dark proc-btn active';
        btnCandidates.className = 'btn btn-outline proc-btn';
        timeline.innerHTML = `
            <div class="process-step">
                <div class="step-num">01</div>
                <h4>Discovery & Challenge Scope</h4>
                <p>We analyze your team requirements, technical needs, and timeline to craft tailored candidate benchmarks.</p>
            </div>
            <div class="process-step">
                <div class="step-num">02</div>
                <h4>AI Sourcing & Screening</h4>
                <p>Our talent network is queried with automated skill evaluations and video interviews.</p>
            </div>
            <div class="process-step">
                <div class="step-num">03</div>
                <h4>Hand-Picked Shortlist</h4>
                <p>Receive top 3 vetted profiles complete with assessment scoring and cultural fit matrix.</p>
            </div>
            <div class="process-step">
                <div class="step-num">04</div>
                <h4>Seamless Offer & Onboard</h4>
                <p>We manage offer negotiation, background compliance checks, and integration support.</p>
            </div>
        `;
    } else {
         btnEmployers.className = 'btn btn-outline proc-btn';
        btnCandidates.className = 'btn btn-dark proc-btn active';
        timeline.innerHTML = `
            <div class="process-step">
                <div class="step-num">01</div>
                <h4>Submit Profile / Resume</h4>
                <p>Upload your CV or portfolio for instant AI matching with our exclusive tier-1 hiring partners.</p>
            </div>
            <div class="process-step">
                <div class="step-num">02</div>
                <h4>Talent Challenge & Screening</h4>
                <p>Complete a short asynchronous assessment to highlight your core strengths.</p>
            </div>
            <div class="process-step">
                <div class="step-num">03</div>
                <h4>Direct Client Interviews</h4>
                <p>Fast-track directly to final round conversations with hiring decision-makers.</p>
            </div>
            <div class="process-step">
                <div class="step-num">04</div>
                <h4>Land Your Ideal Role</h4>
                <p>Receive top-of-market compensation packages with dedicated career transition advice.</p>
            </div>
        `;
    }
    gsap.from('#processTimeline .process-step', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    });
}
/* --------------------------------------------------------------------------
   7. Modal Window Handlers
   -------------------------------------------------------------------------- */
function openModal(modalId) {
    if (modalId === 'loginModal' || modalId === 'signupModal' || modalId === 'challengeModal' || modalId === 'getStartedModal') {
        window.location.href = '404.html';
        return;
    }
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

/* --------------------------------------------------------------------------
   8. GSAP ScrollTrigger Animations & Stat Counters for About Page
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length || typeof gsap === 'undefined') return;

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const format = counter.getAttribute('data-format') || '';

        const obj = { value: 0 };

        gsap.to(obj, {
            value: target,
            duration: 2.0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 88%',
                once: true
            },
            onUpdate: () => {
                let currentVal = decimals > 0 ? obj.value.toFixed(decimals) : Math.round(obj.value);
                if (format === 'comma') {
                    currentVal = parseInt(currentVal, 10).toLocaleString();
                }
                counter.textContent = `${currentVal}${suffix}`;
            }
        });
    });
}

function initAboutAnimations() {
    initStatCounters();
    if (!document.querySelector('#aboutHero') || typeof gsap === 'undefined') return;

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
    heroTl.from('.about-hero-banner .section-badge', { y: -20, opacity: 0, duration: 0.6 })
          .from('.about-hero-banner .section-title', { y: 25, opacity: 0, duration: 0.8 }, '-=0.4')
          .from('.about-hero-banner .section-subtitle', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');

    let aboutMm = gsap.matchMedia();

    aboutMm.add("(min-width: 768px)", () => {
        if (document.querySelector('#ourStory')) {
            gsap.from('#ourStory .story-image-wrapper', {
                scrollTrigger: { trigger: '#ourStory', start: 'top 82%' },
                x: -50,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#ourStory .story-content-col', {
                scrollTrigger: { trigger: '#ourStory', start: 'top 82%' },
                x: 50,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        if (document.querySelector('#methodology')) {
            gsap.from('#methodology .story-image-wrapper', {
                scrollTrigger: { trigger: '#methodology', start: 'top 80%' },
                x: -45,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('.feature-list-item', {
                scrollTrigger: { trigger: '#methodology', start: 'top 80%' },
                x: 45,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        if (document.querySelector('.team-grid')) {
            gsap.from('#leadership .team-card', {
                scrollTrigger: { trigger: '.team-grid', start: 'top 82%' },
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.85,
                ease: 'back.out(1.2)',
                clearProps: 'all'
            });
        }
    });

    aboutMm.add("(max-width: 767px)", () => {
        if (document.querySelector('#ourStory')) {
            gsap.from('#ourStory .story-image-wrapper', {
                scrollTrigger: { trigger: '#ourStory', start: 'top 85%' },
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                clearProps: 'all'
            });

            gsap.from('#ourStory .story-content-col', {
                scrollTrigger: { trigger: '#ourStory .story-content-col', start: 'top 85%' },
                x: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                clearProps: 'all'
            });
        }

        if (document.querySelector('#methodology')) {
            gsap.from('#methodology .story-image-wrapper', {
                scrollTrigger: { trigger: '#methodology', start: 'top 85%' },
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                clearProps: 'all'
            });

            const featureItems = document.querySelectorAll('.feature-list-item');
            featureItems.forEach((item, index) => {
                const xVal = (index % 2 === 0) ? -30 : 30;
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: 'top 88%' },
                    x: xVal,
                    opacity: 0,
                    duration: 0.75,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            });
        }

        if (document.querySelector('.team-grid')) {
            const teamCards = document.querySelectorAll('#leadership .team-card');
            teamCards.forEach((card, index) => {
                const xVal = (index % 2 === 0) ? -30 : 30;
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 88%' },
                    x: xVal,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            });
        }
    });
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

/* --------------------------------------------------------------------------
   9. GSAP ScrollTrigger Animations for Services Page
   -------------------------------------------------------------------------- */
function initServicesAnimations() {
    initPracticeAccordion();
    if (!document.querySelector('#servicesHero') || typeof gsap === 'undefined') return;

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
    heroTl.from('#servicesHero .section-badge', { y: -20, opacity: 0, duration: 0.6 })
          .from('#servicesHero .section-title', { y: 25, opacity: 0, duration: 0.8 }, '-=0.4')
          .from('#servicesHero .section-subtitle', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');

    let servicesMm = gsap.matchMedia();

    servicesMm.add("(min-width: 768px)", () => {
        if (document.querySelector('#practices')) {
            gsap.from('#practices .story-image-wrapper', {
                scrollTrigger: { trigger: '#practices', start: 'top 82%' },
                x: -45,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#practices .accordion-item', {
                scrollTrigger: { trigger: '#practices', start: 'top 82%' },
                x: 45,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        if (document.querySelector('#calculator')) {
            gsap.from('#calculator .calc-card', {
                scrollTrigger: { trigger: '#calculator', start: 'top 82%' },
                x: -45,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#calculator .story-image-wrapper', {
                scrollTrigger: { trigger: '#calculator', start: 'top 82%' },
                x: 45,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        if (document.querySelector('.case-grid')) {
            gsap.from('.case-card', {
                scrollTrigger: { trigger: '.case-grid', start: 'top 82%' },
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }
    });

    servicesMm.add("(max-width: 767px)", () => {
        if (document.querySelector('.accordion-list')) {
            const accItems = document.querySelectorAll('.accordion-item');
            accItems.forEach((item, index) => {
                const xVal = (index % 2 === 0) ? -30 : 30;
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: 'top 88%' },
                    x: xVal,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            });
        }

        if (document.querySelector('.case-grid')) {
            const caseCards = document.querySelectorAll('.case-card');
            caseCards.forEach((card, index) => {
                const xVal = (index % 2 === 0) ? -30 : 30;
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 88%' },
                    x: xVal,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            });
        }
    });
}