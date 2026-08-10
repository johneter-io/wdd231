export async function loadFeaturedResources() {
    const grid = document.querySelector('#featured-grid');
    if (!grid) return;

    try {
        const response = await fetch('data/resources.json');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const featured = shuffle(data.resources).slice(0, 3);

        grid.innerHTML = featured.map(item => `
            <article class="resource-card">
                <img src="${item.image}" alt="${item.title} cover" loading="lazy" width="240" height="360">
                <div class="resource-card-text">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="thehub.html" class="btn-small">View</a>
                </div>
            </article>
        `).join('');

    } catch (error) {
        console.error('Failed to load featured resources:', error);
        grid.innerHTML = '<p>Unable to load resources right now.</p>';
    }
}

function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}