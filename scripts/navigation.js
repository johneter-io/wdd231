function handleHamburger() {
    const hamburger = document.getElementById(`hamburger`);
    const navBar = document.getElementById(`nav-bar`);

    if (!hamburger) return;

    hamburger.addEventListener(`click`, () => {
        navBar.classList.toggle(`open`);
        hamburger.textContent = navBar.classList.contains(`open`) ? `✕` : `☰`;
    });
}

handleHamburger();