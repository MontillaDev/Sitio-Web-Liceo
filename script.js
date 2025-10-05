document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarNav = document.getElementById('sidebar-nav');

    // Alterna el menú al hacer clic en el botón
    menuToggle.addEventListener('click', () => {
        sidebarNav.classList.toggle('open');
    });

    // Cierra el menú si se hace clic en un enlace
    sidebarNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sidebarNav.classList.remove('open');
        }); 
    });
});

// ===== CARRUSEL AUTOMÁTICO - COMPATIBLE CON TU CÓDIGO EXISTENTE =====
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.setupControls();
        this.startAutoPlay();
        this.setupPauseOnHover();
    }
    
    setupControls() {
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }
    
    setupPauseOnHover() {
        const carousel = document.querySelector('.carousel-container');
        
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            carousel.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
            
            carousel.addEventListener('touchstart', () => {
                this.stopAutoPlay();
            });
        }
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        this.restartAutoPlay();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.totalSlides) {
            nextIndex = 0;
        }
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.totalSlides - 1;
        }
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// ===== INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrusel
    new Carousel();
});

// ===== CORRECCIONES ESPECÍFICAS PARA MÓVILES =====
function adjustCarouselForMobile() {
    const carouselSection = document.querySelector('.carousel-section');
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth <= 768 && carouselSection) {
        // Forzar el ancho completo en móviles
        carouselSection.style.width = '100vw';
        carouselSection.style.maxWidth = '100vw';
        carouselSection.style.marginLeft = '0';
        carouselSection.style.marginRight = '0';
        
        // Prevenir cualquier desplazamiento
        document.body.style.overflowX = 'hidden';
    }
}

// Ejecutar al cargar y al redimensionar
document.addEventListener('DOMContentLoaded', function() {
    adjustCarouselForMobile();
    new Carousel(); // Tu carrusel existente
});

window.addEventListener('resize', adjustCarouselForMobile);
window.addEventListener('orientationchange', adjustCarouselForMobile);