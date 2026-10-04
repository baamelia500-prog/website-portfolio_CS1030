/*
 * Loads the shared navigation bar into every page.
 * Needs these two lines:
 *   <div id="site-nav"></div>
 *   <script src="js/include.js" defer></script>
 */

/** Marks the link for the current page so it looks selected. */
function markActiveLink(container) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    for (const link of container.querySelectorAll('.nav-link')) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    }
}

/** Fetches nav.html and puts it inside #site-nav. */
async function loadNav() {
    const mount = document.querySelector('#site-nav');
    if (!mount) {
        return;
    }

    try {
        const response = await fetch('nav.html');
        if (!response.ok) {
            throw new Error(`nav.html returned status ${response.status}`);
        }

        mount.innerHTML = await response.text();
        markActiveLink(mount);
    } catch (error) {
        console.error('[site] Could not load nav.html. Are you using a web server?', error);
    }
}

loadNav();
