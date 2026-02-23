const pageId = document.body.getAttribute('data-page');

async function initRouter() {
    if (pageId === 'registration') {
        renderRegistration();
    } else {
        try {
            // If we are on the details page, fetch committees.json. Otherwise, fetch the normal page data.
            const dataFile = pageId === 'committee-details' ? 'committees' : pageId;
            
            const response = await fetch(`data/${dataFile}.json`);
            if (!response.ok) throw new Error('Data not found');
            const data = await response.json();
            
            routeRender(pageId, data);
        } catch (err) {
            document.getElementById('app-content').innerHTML = `<p>Error loading content.</p>`;
            console.error(err);
        }
    }
}