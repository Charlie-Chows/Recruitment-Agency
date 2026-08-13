/* ==========================================================================
   STACKLY RECRUITMENT AGENCY - COMMON / GLOBAL JAVASCRIPT
   Handles Mobile Nav Drawer, Modals, and Footer Newsletter.
   ========================================================================== */

console.log('🚀 js/common.js loaded');

// Global Mobile Menu Handlers
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

    // Smoothly close menu and animate drawer when clicking any mobile navigation link
    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            
            window.closeMobileMenu();

            if (!href || href === '#' || href.startsWith('javascript:')) {
                e.preventDefault();
                return;
            }

            let currentPath = window.location.pathname.split('/').pop().toLowerCase();
            if (!currentPath) currentPath = 'index.html';
            let targetPath = href.split('/').pop().toLowerCase();
            if (!targetPath) targetPath = 'index.html';

            if (currentPath === targetPath) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                e.preventDefault();
                setTimeout(() => {
                    window.location.href = href;
                }, 350);
            }
        });
    });
}

// Modal Handlers
function openModal(modalId) {
    if (modalId === 'loginModal' || modalId === 'signupModal' || modalId === 'challengeModal' || modalId === 'getStartedModal') {
        window.location.href = '404.html';
        return;
    }
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('active');
}

// Footer Newsletter Handler
function handleNewsletterSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    const error = document.getElementById('newsletterError');

    if (!input) return;

    const val = input.value.trim();
    if (val && val.includes('@') && val.includes('.')) {
        if (error) error.style.display = 'none';
        alert('Thank you for subscribing to Stackly Tech Talent Insights!');
        input.value = '';
    } else {
        if (error) error.style.display = 'block';
    }
}

// Initialize common navigation on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
});
