// Simple Hamburger Menu Toggle for Responsive Layouts
const menuToggle = document.querySelector('#menu');
const navBar = document.querySelector('#navbar');

menuToggle.addEventListener('click', () => {
    navBar.classList.toggle('open');

    // Check if the menu is open and swap the icon
    if (navBar.classList.contains('open')) {
        menuToggle.innerHTML = '&times;';
    } else {
        menuToggle.innerHTML = '&#9776;';
    }
});

// ===========================

const currentDate = document.getElementById(`currentYear`);
const lastModification = document.getElementById(`lastModified`);

currentDate.textContent = new Date().getFullYear();
lastModification.textContent = `Last Modification: ${document.lastModified}`;