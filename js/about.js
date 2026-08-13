/* ==========================================================================
   STACKLY RECRUITMENT AGENCY - ABOUT PAGE JAVASCRIPT
   Handles Stat Counters, Growth Timeline & GSAP ScrollTrigger Animations.
   ========================================================================== */

console.log('🚀 js/about.js loaded');

function runAboutInit() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    initAboutAnimations();

    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 200);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAboutInit);
} else {
    runAboutInit();
}

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

    // 1. Hero Side-Sliding Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9, clearProps: 'all' } });
    heroTl.from('.about-hero-banner .section-badge', { x: -60, opacity: 0, duration: 0.65 })
          .from('.about-hero-banner .section-title', { x: 75, opacity: 0, duration: 0.85 }, '-=0.4')
          .from('.about-hero-banner .section-subtitle', { x: -60, opacity: 0, duration: 0.75 }, '-=0.5');

    let aboutMm = gsap.matchMedia();

    // Desktop Side-Sliding Animations
    aboutMm.add("(min-width: 768px)", () => {
        // Our Story Section
        if (document.querySelector('#ourStory')) {
            gsap.from('#ourStory .story-image-wrapper', {
                scrollTrigger: { trigger: '#ourStory', start: 'top 82%' },
                x: -75,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from('#ourStory .story-content-col', {
                scrollTrigger: { trigger: '#ourStory', start: 'top 82%' },
                x: 75,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // Methodology Section
        if (document.querySelector('#methodology')) {
            gsap.from('#methodology .story-image-wrapper', {
                scrollTrigger: { trigger: '#methodology', start: 'top 80%' },
                x: -75,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const featureItems = document.querySelectorAll('.feature-list-item');
            featureItems.forEach((item, index) => {
                const slideX = (index % 2 === 0) ? 75 : -75;
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: 'top 88%' },
                    x: slideX,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            });
        }

        // Company Evolution Vertical Growth Timeline Animation
        if (document.querySelector('#growthJourney')) {
            gsap.from('#growthJourney .section-header', {
                scrollTrigger: { trigger: '#growthJourney .section-header', start: 'top 88%' },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const timelineItems = document.querySelectorAll('.timeline-item-vertical');
            timelineItems.forEach((item, index) => {
                const slideX = (index % 2 === 0) ? -75 : 75;
                
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: 'top 88%' },
                    x: slideX,
                    opacity: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    clearProps: 'all'
                });

                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    gsap.from(dot, {
                        scrollTrigger: { trigger: item, start: 'top 88%' },
                        scale: 0,
                        opacity: 0,
                        duration: 0.6,
                        delay: 0.2,
                        ease: 'back.out(1.7)',
                        clearProps: 'all'
                    });
                }
            });
        }

        // Leadership Team Grid
        if (document.querySelector('.team-grid')) {
            gsap.from('#leadership .section-header', {
                scrollTrigger: { trigger: '#leadership .section-header', start: 'top 88%' },
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            const teamCards = document.querySelectorAll('#leadership .team-card');
            teamCards.forEach((card, index) => {
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
    aboutMm.add("(max-width: 767px)", () => {
        if (document.querySelector('#growthJourney')) {
            const timelineItems = document.querySelectorAll('.timeline-item-vertical');
            timelineItems.forEach((item, index) => {
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
        }

        if (document.querySelector('.team-grid')) {
            const teamCards = document.querySelectorAll('#leadership .team-card');
            teamCards.forEach((card, index) => {
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
        }
    });
}
