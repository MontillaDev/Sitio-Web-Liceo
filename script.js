(function () {'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        // Función de ajustes de layout: movida aquí para asegurar que el DOM ya está cargado.
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

        // Ejecutar al cargar y al cambiar tamaño/orientación
        fixLayoutIssues();
        window.addEventListener('resize', fixLayoutIssues);
        window.addEventListener('orientationchange', fixLayoutIssues);
        window.addEventListener('load', fixLayoutIssues);
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar-nav');
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                sidebar.classList.toggle('open');
            });
            // Cerrar el menú si se hace click fuera del mismo (UX común en menús laterales)
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && e.target !== menuToggle) {
                    sidebar.classList.remove('open');
                }
            });
            // Si el usuario pulsa un enlace del nav, cerramos el sidebar
            sidebar.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => sidebar.classList.remove('open')));
        }
        const slides = Array.from(document.querySelectorAll('.slide'));
        const indicators = Array.from(document.querySelectorAll('.indicator'));
        const carouselEl = document.querySelector('.carousel');
        if (!slides.length) return;

        // Asegurar que haya una slide activa por defecto
        if (!slides.some(s => s.classList.contains('active'))) {
            slides[0].classList.add('active');
            indicators[0]?.classList.add('active');
        }

        let idx = slides.findIndex(s => s.classList.contains('active'));
        if (idx < 0) idx = 0;
        let timer = null;
        let anim = false;

        // Cambia de slide con normalización de índice y manejo más robusto de la animación
        const setSlide = (i) => {
            const target = (i + slides.length) % slides.length;
            if (anim || target === idx) return;
            anim = true;

            // quitar estado anterior
            slides[idx].classList.remove('active');
            indicators[idx]?.classList.remove('active');

            // aplicar nuevo índice y estado
            idx = target;
            slides[idx].classList.add('active');
            indicators[idx]?.classList.add('active');

            // reinicia autoplay para que el usuario vea la interacción
            restart();

            // Esperar al 'transitionend' de la slide (con fallback por si no hay transición)
            let called = false;
            const onEnd = () => {
                if (called) return; called = true;
                slides[idx].removeEventListener('transitionend', onEnd);
                anim = false;
            };
            slides[idx].addEventListener('transitionend', onEnd);
            // Fallback: después de 900ms aseguramos desbloquear la animación
            setTimeout(() => { if (!called) { slides[idx].removeEventListener('transitionend', onEnd); anim = false; } }, 900);
        };

        const step = (n) => setSlide(idx + n);

        // Controles prev/next
        document.querySelector('.carousel-control.prev')?.addEventListener('click', () => step(-1));
        document.querySelector('.carousel-control.next')?.addEventListener('click', () => step(1));
        indicators.forEach((ind, i) => ind.addEventListener('click', () => setSlide(i)));

        // autoplay
        const start = () => {
            stop();
            timer = setInterval(() => step(1), 5000);
        };
        const stop = () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };
        const restart = () => {
            stop();
            start();
        };

        // Pausar autoplay al pasar el ratón sobre el carrusel y reanudar al salir
        carouselEl?.addEventListener('mouseenter', stop);
        carouselEl?.addEventListener('mouseleave', start);

        // Navegación por teclado: ignorar inputs, textareas y elementos contentEditable
        window.addEventListener('keydown', (e) => {
            const el = document.activeElement;
            if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
        });

        // Iniciar autoplay
        start();
    });
})();