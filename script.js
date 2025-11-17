(function () {'use strict';
    document.addEventListener('DOMContentLoaded', () => {
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
        let idx = 0;
        let timer = null;
        let anim = false;
        const setSlide = (i) => {
            if (anim || i === idx) return;
            anim = true;

            // quitar estado anterior
            slides[idx].classList.remove('active');
            indicators[idx]?.classList.remove('active');

            // normalizar indice
            idx = (i + slides.length) % slides.length;

            // aplicar nuevo estado
            slides[idx].classList.add('active');
            indicators[idx]?.classList.add('active');

            // reinicia autoplay para que el usuario vea la interaccion
            restart();

            setTimeout(() => (anim = false), 800);
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
    });
})();