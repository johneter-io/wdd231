const currentYear = document.querySelector("#currentyear");
const lastModification = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModification.textContent = `Last Modifiaction: ${document.lastModified}`;
