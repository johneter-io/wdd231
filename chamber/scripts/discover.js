import { discoverItems } from '../data/items.mjs';

document.addEventListener("DOMContentLoaded", () => {
    displayVisitMessage();
    renderDiscoverCards(discoverItems);
});

// 1. Managing the visit message using localStorage
function displayVisitMessage() {
    const messageContainer = document.getElementById("visit-message");
    if (!messageContainer) return;

    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();
    const msInDay = 86400000; // 1000ms * 60s * 60m * 24h

    if (!lastVisit) {
        messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = now - parseInt(lastVisit, 10);

        if (timeDifference < msInDay) {
            messageContainer.textContent = "Back so soon! Awesome!";
        } else {
            const daysAgo = Math.floor(timeDifference / msInDay);
            const dayText = daysAgo === 1 ? "day" : "days";
            messageContainer.textContent = `You last visited ${daysAgo} ${dayText} ago.`;
        }
    }

    // Update the last visit date with the current time
    localStorage.setItem("lastVisitDate", now.toString());
}

// 2. Generating the 8 cards according to the assignment's strict requirements
function renderDiscoverCards(items) {
    const gridContainer = document.getElementById("discover-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    items.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add("discover-card");
        // Assigning an area identifier for Grid Template Areas (e.g., card1, card2...)
        card.style.gridArea = `card${index + 1}`;

        // Required HTML structure: h2 -> figure (img) -> address -> p -> button
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button">Learn More</button>
        `;

        gridContainer.appendChild(card);
    });
}