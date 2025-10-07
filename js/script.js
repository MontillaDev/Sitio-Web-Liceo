function fixLayoutIssues() {
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100%';
    
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    const carouselSection = document.querySelector('.carousel-section');
    if (carouselSection && window.innerWidth <= 768) {
        carouselSection.style.width = '100%';
        carouselSection.style.marginLeft = '0';
        carouselSection.style.marginRight = '0';
        carouselSection.style.paddingLeft = '0';
        carouselSection.style.paddingRight = '0';
    }
}

// Carrusel
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

// Menu lateral
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarNav = document.getElementById('sidebar-nav');
    
    if (menuToggle && sidebarNav) {
        menuToggle.addEventListener('click', function() {
            sidebarNav.classList.toggle('open');
        });
        
        document.addEventListener('click', function(event) {
            if (!sidebarNav.contains(event.target) && !menuToggle.contains(event.target)) {
                sidebarNav.classList.remove('open');
            }
        });
        
        const navLinks = sidebarNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebarNav.classList.remove('open');
            });
        });
    }
    new Carousel();

    fixLayoutIssues();
});

window.addEventListener('resize', fixLayoutIssues);
window.addEventListener('orientationchange', fixLayoutIssues);
window.addEventListener('load', fixLayoutIssues);