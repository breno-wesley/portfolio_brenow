let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Scrollando para baixo
        header.classList.add('hidden');
    } else {
        // Scrollando para cima
        header.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Enable hover-like effect on touch devices for .card-content
function setupCardTouchHandlers(){
    const cards = document.querySelectorAll('.card-content');
    if(!cards || cards.length === 0) return;

    cards.forEach(card => {
        // Pointer events cover mouse, pen and touch where supported
        card.addEventListener('pointerenter', (e) => {
            if (e.pointerType !== 'touch') card.classList.add('is-active');
        });
        card.addEventListener('pointerleave', (e) => {
            if (e.pointerType !== 'touch') card.classList.remove('is-active');
        });

        // Pointer down/up for mouse/pen/touch to provide immediate feedback
        card.addEventListener('pointerdown', (e) => {
            // Always add active on down to provide tactile feedback
            card.classList.add('is-active');
        }, {passive: true});
        card.addEventListener('pointerup', () => card.classList.remove('is-active'));
        card.addEventListener('pointercancel', () => card.classList.remove('is-active'));

        // Fallback for older browsers: keep touch handlers
        card.addEventListener('touchstart', () => card.classList.add('is-active'), {passive: true});
        const removeActive = () => card.classList.remove('is-active');
        card.addEventListener('touchend', removeActive);
        card.addEventListener('touchcancel', removeActive);
    });
}

// Init handlers when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCardTouchHandlers);
} else {
    setupCardTouchHandlers();
}
