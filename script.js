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