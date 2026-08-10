export async function initGallery() {
    const gallery = document.querySelector('#gallery');
    if (!gallery) return; // Exit si pas sur la page The Hub

    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('#resource-modal');
    const modalClose = document.querySelector('#modal-close');

    let resources = [];

    try {
        const response = await fetch('data/resources.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        resources = data.resources;
    } catch (error) {
        gallery.innerHTML = `<p class="gallery-loading">Sorry, the resources could not be loaded. Please try again later.</p>`;
        console.error('Failed to load resources.json:', error);
        return;
    }

    // Restores the last selected filter (local storage)
    const savedFilter = localStorage.getItem('selectedCategory') || 'all';

    function renderGallery(category) {
        const filtered = category === 'all'
            ? resources
            : resources.filter(item => item.category === category);

        gallery.innerHTML = filtered.map(item => `
            <article class="resource-card" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title} cover" loading="lazy" width="240" height="340">
                <div class="resource-card-text">
                    <h3>${item.title}</h3>
                    <p>${item.format} · ${item.level}</p>
                    <p>${item.price}</p>
                </div>
            </article>
        `).join('');

        gallery.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', () => openModal(card.dataset.id));
        });
    }

    function openModal(id) {
        if (!modal) return;
        const item = resources.find(r => r.id === Number(id));
        if (!item) return;

        const modalImg = document.querySelector('#modal-image');
        if (modalImg) {
            modalImg.src = item.image;
            modalImg.alt = `${item.title} cover`;
        }

        document.querySelector('#modal-title').textContent = item.title;
        document.querySelector('#modal-format').textContent = `Format: ${item.format}`;
        document.querySelector('#modal-level').textContent = `Level: ${item.level}`;
        document.querySelector('#modal-price').textContent = `Price: ${item.price}`;
        document.querySelector('#modal-description').textContent = item.description;

        modal.hidden = false;
    }

    // Gestion de la fermeture de la modal en toute sécurité
    if (modal && modalClose) {
        modalClose.addEventListener('click', () => modal.hidden = true);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.hidden = true;
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hidden) modal.hidden = true;
        });
    }

    // Filter Management
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            localStorage.setItem('selectedCategory', category);
            renderGallery(category);
        });
    });

    // Enables the correct button on load based on local storage
    filterButtons.forEach(btn => {
        if (btn.dataset.category === savedFilter) {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });

    renderGallery(savedFilter);
}