import { initMenu } from './menu.js';
import { loadFeaturedResources } from './featured.js';
import { initGallery } from './gallery.js';
import { displaySubmission } from './thankyou.js';
import { displayCurrentYear } from './dates.js';

initMenu();
initGallery();
displayCurrentYear();

// Fills in the submission date if the field exists (Contact Page)
const submissionInput = document.querySelector('#submissionDate');
if (submissionInput) {
    submissionInput.value = new Date().toISOString();
}

// Thank You Page
if (document.querySelector('#summary')) {
    displaySubmission();
}

// Home Page
if (document.querySelector('#featured-grid')) {
    loadFeaturedResources();
}