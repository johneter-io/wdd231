function handleHamburger() {
    const navBar = document.getElementById(`nav-bar`);
    const hamburger = document.getElementById(`hamburger`);

    if (!hamburger) return;

    hamburger.addEventListener(`click`, () => {
        navBar.classList.toggle(`open`);
        hamburger.textContent = navBar.classList.contains(`open`) ? `✕` : `☰`;
    });
}

handleHamburger();