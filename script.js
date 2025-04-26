// Script para melhorar a experiência visual do site

document.addEventListener('DOMContentLoaded', function() {
    // Remover o loader quando a página estiver carregada
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
    }, 800);

    // Adicionar efeito de scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar efeito de animação para elementos quando eles entram na viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.day-container, .invitation-content, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar elementos com opacidade 0 para animação
    document.querySelectorAll('.day-container, .invitation-content, .section-header').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // Executar a animação no carregamento inicial e no scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez no carregamento inicial

    // Adicionar efeito de parallax no hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });

    // Adicionar efeito de hover nos cards de eventos
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = 'rgba(66, 153, 225, 0.08)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '';
        });
    });
});
