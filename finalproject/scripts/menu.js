export function initMenu() {
    const menuBtn = document.querySelector('#menu');
    const navbar = document.querySelector('#navbar');

    if (!menuBtn || !navbar) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Closes the menu automatically when a link is clicked
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close the menu using the Esc key (keyboard accessibility)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
        }
    });
}