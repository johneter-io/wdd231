export function displaySubmission() {
    const summary = document.querySelector('#summary');
    if (!summary) return;

    const params = new URLSearchParams(window.location.search);

    const labels = {
        fullname: 'Name',
        email: 'Email Address',
        goal: 'Primary Goal',
        experience: 'Experience Level',
        message: 'Message'
    };

    let hasData = false;

    for (const [key, label] of Object.entries(labels)) {
        const value = params.get(key);
        if (value) {
            hasData = true;
            summary.insertAdjacentHTML('beforeend', `
                <dt>${label}</dt>
                <dd>${escapeHTML(value)}</dd>
            `);
        }
    }

    if (!hasData) {
        summary.insertAdjacentHTML('beforeend', '<p>No submission data found.</p>');
    }
}

// Basic security function to prevent code injection in forms
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}