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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Se o elemento entrou na tela (está visível)
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else { 
            entry.target.classList.remove('visible'); 
        }
    });
});

// Seleciona todos os elementos que tiverem a classe "hidden"
const hiddenElements = document.querySelectorAll('.card-content.hidden');

// Manda o observador vigiar cada um deles
hiddenElements.forEach((el) => observer.observe(el));

// Efeito de máquina de escrever com destaque em "Wesley"
function typeWriterEffect() {
    const target = document.querySelector('.typing-target');
    const cursor = document.querySelector('.cursor');
    
    // Se não achar os elementos, para a função (evita erros)
    if (!target || !cursor) return;

    const text = target.getAttribute('data-text');
    let charIndex = 0;
    const typingSpeed = 100; // Velocidade em milissegundos (menor = mais rápido)

    function type() {
    if (charIndex < text.length) {
        target.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    }else 
        {
            cursor.classList.add('done'); 
        }
    }

    // Inicia a digitação com um pequeno atraso inicial
    setTimeout(type, 500);
}

// Chama a função quando o site carregar
document.addEventListener('DOMContentLoaded', typeWriterEffect);