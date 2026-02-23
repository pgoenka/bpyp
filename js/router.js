const pageId = document.body.getAttribute('data-page');

async function initRouter() {
    if (pageId === 'registration') {
        renderRegistration();
    } else {
        try {
            const response = await fetch(`data/${pageId}.json`);
            if (!response.ok) throw new Error('Data not found');
            const data = await response.json();
            routeRender(pageId, data);
        } catch (err) {
            document.getElementById('app-content').innerHTML = `<p>Error loading content.</p>`;
        }
    }
}