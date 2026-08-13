/* ==========================================================================
   STACKLY RECRUITMENT AGENCY - JOBS PAGE JAVASCRIPT
   Handles Job Search Filtering, Detail Expansion & GSAP Animations.
   ========================================================================== */

console.log('🚀 js/jobs.js loaded');

function runJobsInit() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    initJobFilters();
    initJobDetailDrawers();
    initJobsAnimations();

    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 200);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runJobsInit);
} else {
    runJobsInit();
}

window.handleJobSearchSubmit = function(e) {
    if (e) e.preventDefault();
    const searchInput = document.getElementById('jobSearchInput');
    const locationSelect = document.getElementById('jobLocationSelect');
    const categorySelect = document.getElementById('jobCategorySelect');

    if (searchInput && locationSelect && categorySelect) {
        if (searchInput.value.trim() !== '' && locationSelect.value !== '' && categorySelect.value !== '') {
            window.location.href = '404.html';
        }
    }
};

function setupCustomDropdown(triggerId, menuId, selectedTextId, hiddenInputId, onSelectCallback) {
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
            trigger.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
            if (onSelectCallback) onSelectCallback();
        });
    });

    document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !menu.contains(e.target)) {
            trigger.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
        }
    });
}

function initJobFilters() {
    const searchInput = document.getElementById('jobSearchInput');
    const locationSelect = document.getElementById('jobLocationSelect');
    const categorySelect = document.getElementById('jobCategorySelect');
    const jobRows = document.querySelectorAll('.job-row-card');

    if (!jobRows.length) return;

    function filterJobs() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const locVal = locationSelect ? locationSelect.value.toLowerCase() : 'all';
        const catVal = categorySelect ? categorySelect.value.toLowerCase() : 'all';

        jobRows.forEach(row => {
            const title = row.getAttribute('data-title') || '';
            const location = row.getAttribute('data-location') || '';
            const category = row.getAttribute('data-category') || '';
            const textContent = row.textContent.toLowerCase();

            const matchesQuery = !query || textContent.includes(query) || title.toLowerCase().includes(query);
            const matchesLoc = locVal === 'all' || !locVal || location.toLowerCase().includes(locVal);
            const matchesCat = catVal === 'all' || !catVal || category.toLowerCase().includes(catVal);

            if (matchesQuery && matchesLoc && matchesCat) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    }

    setupCustomDropdown('jobLocationTrigger', 'jobLocationMenu', 'jobLocationSelectedText', 'jobLocationSelect', filterJobs);
    setupCustomDropdown('jobCategoryTrigger', 'jobCategoryMenu', 'jobCategorySelectedText', 'jobCategorySelect', filterJobs);

    if (searchInput) searchInput.addEventListener('input', filterJobs);
}

function initJobDetailDrawers() {
    const toggleBtns = document.querySelectorAll('.job-detail-toggle');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const row = btn.closest('.job-row-card');
            if (!row) return;
            const drawer = row.querySelector('.job-detail-drawer');
            if (drawer) {
                const isActive = drawer.classList.contains('active');
                drawer.classList.toggle('active');
                btn.textContent = isActive ? 'View Details' : 'Hide Details';
            }
        });
    });
}

function initJobsAnimations() {
    if (!document.querySelector('#jobsHero') || typeof gsap === 'undefined') return;

    // Hero Section Side-Sliding Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9, clearProps: 'all' } });
    heroTl.from('#jobsHero .section-badge', { x: -60, opacity: 0, duration: 0.65 })
          .from('#jobsHero .section-title', { x: 75, opacity: 0, duration: 0.85 }, '-=0.4')
          .from('#jobsHero .section-subtitle', { x: -60, opacity: 0, duration: 0.75 }, '-=0.5')
          .from('.job-search-box', { x: -75, opacity: 0, duration: 0.85 }, '-=0.4');

    let jobsMm = gsap.matchMedia();

    // Desktop Side-Sliding Animations for ALL Sections and Cards
    jobsMm.add("(min-width: 768px)", () => {
        // 1. Featured Roles Section Header & Rows
        if (document.querySelector('.job-list-container')) {
            gsap.from('#openRoles .section-header', {
                scrollTrigger: { trigger: '#openRoles .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const rows = document.querySelectorAll('.job-row-card');
            rows.forEach((row, index) => {
                const slideX = (index % 2 === 0) ? -75 : 75;
                gsap.from(row, {
                    scrollTrigger: { trigger: row, start: 'top 88%' },
                    x: slideX,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        }

        // 2. Fast-Track Application Process Section & Cards
        if (document.querySelector('#applicationProcess')) {
            gsap.from('#applicationProcess .section-header', {
                scrollTrigger: { trigger: '#applicationProcess .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const processCards = document.querySelectorAll('.job-process-card');
            processCards.forEach((card, index) => {
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

        // 3. Candidate Benefits Split Section & Cards
        if (document.querySelector('#benefits')) {
            gsap.from('#benefits .section-header', {
                scrollTrigger: { trigger: '#benefits .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#benefits .story-image-wrapper', {
                scrollTrigger: { trigger: '#benefits .story-image-wrapper', start: 'top 88%' },
                x: -75,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const benefitCards = document.querySelectorAll('.benefit-card');
            benefitCards.forEach((card, index) => {
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

        // 4. Candidate Placement Stories / Testimonials Section
        if (document.querySelector('#candidateQuotes')) {
            gsap.from('#candidateQuotes .section-header', {
                scrollTrigger: { trigger: '#candidateQuotes .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#candidateQuotes .about-quote-box', {
                scrollTrigger: { trigger: '#candidateQuotes .about-quote-box', start: 'top 88%' },
                x: -80,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // 5. CTA Banner Section
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
    jobsMm.add("(max-width: 767px)", () => {
        const rows = document.querySelectorAll('.job-row-card');
        rows.forEach((row, index) => {
            const xVal = (index % 2 === 0) ? -40 : 40;
            gsap.from(row, {
                scrollTrigger: { trigger: row, start: 'top 90%' },
                x: xVal,
                opacity: 0,
                duration: 0.75,
                ease: 'power2.out',
                clearProps: 'all'
            });
        });

        const processCards = document.querySelectorAll('.job-process-card');
        processCards.forEach((card, index) => {
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

        const benefitCards = document.querySelectorAll('.benefit-card');
        benefitCards.forEach((card, index) => {
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
