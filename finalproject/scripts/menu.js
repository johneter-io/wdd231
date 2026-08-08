export function initMenu() {
    const menuBtn = document.querySelector('#menu');
    const navbar = document.querySelector('#navbar');

    if (!menuBtn || !navbar) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
        menuBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.innerHTML = '&#9776;';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.innerHTML = '&#9776;';
            menuBtn.focus();
        }
    });
}