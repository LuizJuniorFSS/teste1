document.addEventListener('DOMContentLoaded', () => {
    // Animação de rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Adiciona classe de animação ao carregar a página
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);

    // Efeito de paralaxe no hero aprimorado com otimização para dispositivos móveis
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Verifica se é um iPhone ou dispositivo móvel para ajustar o efeito
        const isIPhone = /iPhone/.test(navigator.userAgent);
        const isMobile = window.innerWidth <= 400;
        
        // Reduz a intensidade do efeito em dispositivos móveis
        const scrollFactor = (isIPhone || isMobile) ? 0.3 : 0.5;
        const scrollValue = scrolled * scrollFactor;
        
        // Aplica transformação com menor intensidade em dispositivos móveis
        hero.style.transform = `translate3d(0, ${scrollValue}px, 0)`;
        
        // Ajusta o efeito de opacidade para dispositivos móveis
        const opacityFactor = (isIPhone || isMobile) ? 900 : 700;
        const opacity = Math.max(1 - scrolled / opacityFactor, 0);
        heroContent.style.opacity = opacity;
    });

    // Animação de entrada dos cards de eventos com efeito escalonado otimizado para iPhone
    // Detecta se é um iPhone ou dispositivo móvel
    const isIPhone = /iPhone/.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 400;
    
    // Ajusta as opções do observer para melhor desempenho em dispositivos móveis
    const observerOptions = {
        threshold: isIPhone || isMobile ? 0.05 : 0.1,
        rootMargin: isIPhone || isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona um pequeno atraso para iPhone para melhorar o desempenho
                if (isIPhone || isMobile) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 50);
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.event-card').forEach((card, index) => {
        card.style.opacity = '0';
        // Reduz a distância de transformação para iPhone/dispositivos móveis
        const transformDistance = isIPhone || isMobile ? '30px' : '50px';
        card.style.transform = `translateY(${transformDistance})`;
        // Reduz o tempo de transição para iPhone/dispositivos móveis para melhor desempenho
        const transitionDuration = isIPhone || isMobile ? 0.5 : 0.6;
        // Reduz o atraso entre elementos para iPhone/dispositivos móveis
        const delayMultiplier = isIPhone || isMobile ? 0.05 : 0.1;
        card.style.transition = `all ${transitionDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * delayMultiplier}s`;
        observer.observe(card);
    });
    
    // Aplicar o mesmo efeito para outros elementos com otimização para iPhone
    document.querySelectorAll('.day-container, .invitation, .contact-content').forEach((element, index) => {
        element.style.opacity = '0';
        // Reduz a distância de transformação para iPhone/dispositivos móveis
        const transformDistance = isIPhone || isMobile ? '30px' : '50px';
        element.style.transform = `translateY(${transformDistance})`;
        // Reduz o tempo de transição para iPhone/dispositivos móveis
        const transitionDuration = isIPhone || isMobile ? 0.6 : 0.7;
        // Reduz o atraso entre elementos para iPhone/dispositivos móveis
        const delayMultiplier = isIPhone || isMobile ? 0.08 : 0.15;
        element.style.transition = `all ${transitionDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * delayMultiplier}s`;
        observer.observe(element);
    });
    
    // Adicionar classe para controlar a animação
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.event-card, .day-container, .invitation, .contact-content').forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('visible')) {
                el.classList.add('visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Efeito de hover 3D aprimorado nos cards com otimização para iPhone
    document.querySelectorAll('.event-card, .invitation, .contact-content').forEach(card => {
        // Detecta se é um iPhone ou dispositivo móvel
        const isIPhone = /iPhone/.test(navigator.userAgent);
        const isMobile = window.innerWidth <= 768;
        
        // Adiciona efeito de toque para dispositivos móveis
        if (isIPhone || isMobile) {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale3d(0.98, 0.98, 0.98)';
                card.style.transition = 'transform 0.2s ease';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = 'scale3d(1, 1, 1)';
            });
        }
        
        card.addEventListener('mousemove', (e) => {
            // Desativa efeito 3D em dispositivos móveis, mas mantém um efeito mais leve para iPhone 14 Pro
            if (window.innerWidth <= 400) return;
            if (window.innerWidth <= 768 && window.innerWidth > 400) {
                // Efeito reduzido para tablets e dispositivos médios
                card.style.transform = 'scale3d(1.01, 1.01, 1.01)';
                return;
            }
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reduz a intensidade do efeito para melhor desempenho
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            // Efeito de luz
            const shine = card.querySelector('.card-shine') || document.createElement('div');
            if (!card.querySelector('.card-shine')) {
                shine.classList.add('card-shine');
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.right = '0';
                shine.style.bottom = '0';
                shine.style.pointerEvents = 'none';
                shine.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)';
                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(shine);
            } else {
                shine.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)';
            }

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Mover elementos internos para efeito de profundidade
            const eventTime = card.querySelector('.event-time');
            if (eventTime) {
                eventTime.style.transform = `translateZ(20px) scale(1.03)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            
            const eventTime = card.querySelector('.event-time');
            if (eventTime) {
                eventTime.style.transform = 'translateZ(0) scale(1)';
            }
            
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.background = 'none';
            }
        });
    });

    // Animação do texto de destaque com efeito de brilho
    const highlight = document.querySelector('.highlight');
    let hue = 0;
    let direction = 1;
    let scale = 1;

    function animateHighlight() {
        // Efeito de cor pulsante mais suave
        hue = (hue + 0.5) % 360;
        
        // Efeito de pulsar suave
        scale += 0.0005 * direction;
        if (scale >= 1.03) direction = -1;
        if (scale <= 0.97) direction = 1;
        
        highlight.style.transform = `scale(${scale})`;
        highlight.style.boxShadow = `0 5px 15px rgba(${Math.sin(hue) * 50 + 150}, ${Math.cos(hue) * 50 + 150}, 255, 0.2)`;
        requestAnimationFrame(animateHighlight);
    }

    animateHighlight();
    
    // Adicionar efeito de partículas ao fundo da seção de convite
    const invitation = document.querySelector('.invitation');
    if (invitation) {
        const particles = document.createElement('div');
        particles.classList.add('particles');
        particles.style.position = 'absolute';
        particles.style.top = '0';
        particles.style.left = '0';
        particles.style.width = '100%';
        particles.style.height = '100%';
        particles.style.pointerEvents = 'none';
        particles.style.zIndex = '0';
        invitation.style.position = 'relative';
        invitation.style.overflow = 'hidden';
        invitation.insertBefore(particles, invitation.firstChild);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 255, ${Math.random() * 0.2 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particles.appendChild(particle);
        }
    }
});
