import { store } from '../store.js';

export function Sidebar(activePath = '/') {
    const links = [
        { icon: 'ph:squares-four-fill', text: 'Dashboard', path: '#/' },
        { icon: 'ph:airplane-tilt-fill', text: 'My Trips', path: '#/trips' },
        { icon: 'ph:plus-circle-fill', text: 'Create Trip', path: '#/create-trip' },
        { icon: 'ph:compass-fill', text: 'Explore', path: '#/explore' },
        { icon: 'ph:gear-six-fill', text: 'Settings', path: '#/settings' }
    ];

    const listItems = links.map(link => {
        const isActive = activePath === link.path.substring(1) || (link.path === '#/' && activePath === '');
        // simple check: if activePath starts with /create-trip, highlight it
        const isSelected = activePath === link.path.substring(1);

        return `
            <li>
                <a href="${link.path}" class="nav-link ${isSelected ? 'active' : ''}" 
                   style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: var(--radius-md); color: ${isSelected ? 'var(--color-primary)' : 'var(--text-muted)'}; background: ${isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent'}; font-weight: ${isSelected ? '600' : '500'}; transition: all 0.2s;">
                    <span class="iconify" data-icon="${link.icon}" style="font-size: 1.25rem;"></span>
                    ${link.text}
                </a>
            </li>
        `;
    }).join('');

    return `
        <div class="app-sidebar">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2.5rem; padding-left: 0.5rem;">
                <div style="width: 32px; height: 32px; background: var(--gradient-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
                     <span class="iconify" data-icon="ph:airplane-tilt-fill"></span>
                </div>
                <h2 style="font-size: 1.25rem; font-weight: 700; background: var(--gradient-dark); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">GlobeTrotter</h2>
            </div>
            
            <nav style="flex: 1;">
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${listItems}
                </ul>
            </nav>

            <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--bg-surface-alt);">
                <button onclick="window.toggleAppTheme()" class="nav-link" style="width: 100%; display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: transparent; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.9rem; text-align: left; font-family: var(--font-body);">
                    <span id="theme-toggle-icon" class="iconify" data-icon="${store.state.theme === 'dark' ? 'ph:sun-fill' : 'ph:moon-fill'}" style="font-size: 1.25rem;"></span>
                    <span>${store.state.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                
                <a href="#/login" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; color: var(--text-muted); font-size: 0.9rem;">
                    <span class="iconify" data-icon="ph:sign-out"></span>
                    Log Out
                </a>
            </div>
        </div>
    `;
}
