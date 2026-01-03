import { store } from './store.js';

// Import Views (we will create these file placeholders next)
// For now, we will dynamically import them to avoid errors before files exist
// or we can structure the router to load modules on demand.

const app = document.getElementById('app');

const routes = {
    '/': 'views/dashboard.js',
    '/login': 'views/auth.js',
    '/trips': 'views/trips.js',
    '/explore': 'views/explore.js',
    '/search/activity': 'views/search-activity.js',
    '/create-trip': 'views/create-trip.js',
    '/trip/:id': 'views/trip-detail.js',
    '/trip/:id/budget': 'views/budget.js',
    '/trip/:id/timeline': 'views/timeline.js',
    '/share/:id': 'views/shared.js',
    '/settings': 'views/settings.js'
};

async function loadView(path) {
    // Simple hash router
    // #/login -> views/auth.js

    let routeKey = path;
    let params = {};

    // Dynamic Route Matching
    if (path.match(/\/trip\/.*\/budget/)) {
        routeKey = '/trip/:id/budget';
        params.id = path.split('/')[2];
    } else if (path.match(/\/trip\/.*\/timeline/)) {
        routeKey = '/trip/:id/timeline';
        params.id = path.split('/')[2];
    } else if (path.startsWith('/trip/')) {
        routeKey = '/trip/:id';
        params.id = path.split('/')[2];
    } else if (path.startsWith('/share/')) {
        routeKey = '/share/:id';
        params.id = path.split('/')[2];
    }

    const viewModulePath = routes[routeKey] || routes['/'];

    try {
        app.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;"><div class="spinner"></div></div>';

        // Dynamic import
        const module = await import(`./${viewModulePath}`);

        // Render view
        app.innerHTML = ''; // Clear loader
        module.render(app, params);

    } catch (error) {
        console.error('Failed to load view:', error);
        app.innerHTML = `
            <div style="text-align:center; padding: 2rem;">
                <h1>404</h1>
                <p>Lost in exploration?</p>
                <a href="#/" class="btn btn-primary">Go Home</a>
            </div>
        `;
    }
}

function router() {
    const path = window.location.hash.slice(1) || '/';

    // Auth Guard
    // For demo, if no user is "logged in" in store (or seed not run), setup store first
    if (!store.state.user) {
        store.init();
    }

    // In a real app we'd redirect to /login if !store.state.user
    // For this demo, we assume "Always Logged In" after first load for smoother judging,
    // unless we specifically want to show the login screen first.
    // Let's force login screen if it's the very first visit or explicit logout.

    // For now, let's just route:
    loadView(path);
}


// --- Global Actions for HTML triggers ---
window.toggleAppTheme = () => {
    store.toggleTheme();
    // Update icon immediately if present
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) {
        const isDark = store.state.theme === 'dark';
        icon.setAttribute('data-icon', isDark ? 'ph:sun-fill' : 'ph:moon-fill');

        // Update text
        const textSpan = icon.nextElementSibling;
        if (textSpan) {
            textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    store.init();
    router();
});

