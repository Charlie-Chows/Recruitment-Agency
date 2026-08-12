/* ==========================================================================
   HUMANDECK RECRUITMENT AGENCY - JAVASCRIPT & GSAP ANIMATIONS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    // Initialize Mobile Navigation Toggle
    initMobileNav();
    // Initialize GSAP Animations
    initHeroAnimations();
    initScrollAnimations();
    // Initialize Interactive Widgets
    initDashboardTabs();
    initCalculator();
});

/* --------------------------------------------------------------------------
   1. Responsive Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const body = document.body;
    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const isActive = mobileDrawer.classList.contains('active');
            if (isActive) {
                mobileDrawer.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            } else {
                mobileDrawer.classList.add('active');
                mobileToggle.classList.add('active');
                body.classList.add('no-scroll');
            }
        });

        
        // Close menu when clicking any mobile navigation link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
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
    // Reveal Service & Bento Cards with smooth slide-up
    if (document.querySelector('.bento-grid')) {
        gsap.from('.bento-card', {
            scrollTrigger: {
                trigger: '.bento-grid',
                start: 'top 85%'
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
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
                const xOffset = (index % 2 === 0) ? -75 : 75;
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
    if (!roleType || !expLevel) return;
    function updateCalc() {
        const years = parseInt(expLevel.value, 10);
        const multiplier = parseFloat(roleType.value);
        expVal.textContent = `${years} Year${years > 1 ? 's' : ''}`;
        // Base salary calculation
        const base = 75000 + (years * 11000);
        const finalSalary = Math.round(base * multiplier);
        salaryEst.textContent = `$${finalSalary.toLocaleString()}`;
        // Turnaround time calculation based on experience level
        const days = Math.max(7, Math.round(10 + (years * 0.8)));
        timeEst.textContent = `${days} Days`;
    }
     roleType.addEventListener('change', updateCalc);
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