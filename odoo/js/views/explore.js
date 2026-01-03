import { Sidebar } from '../components/sidebar.js';
import { store } from '../store.js';

export function render(container) {
    const destinations = [
        { id: 'd1', name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', cost: '$$$', type: 'Cultural' },
        { id: 'd2', name: 'Reykjavik', country: 'Iceland', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800', cost: '$$$$', type: 'Adventure' },
        { id: 'd3', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', cost: '$$$', type: 'Relaxing' },
        { id: 'd4', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', cost: '$', type: 'Tropical' },
        { id: 'd5', name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', cost: '$$$$', type: 'Urban' },
        { id: 'd6', name: 'Cape Town', country: 'South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800', cost: '$$', type: 'Adventure' },
    ];

    const html = `
    <div class="layout-app">
        ${Sidebar('/explore')}
        
        <main class="app-main">
            <header class="section-header">
                <div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.25rem;">Explore Destinations</h1>
                    <p style="color: var(--text-muted);">Find the perfect place for your next story.</p>
                </div>
                <div class="input-group" style="width: 300px; margin-bottom: 0;">
                    <input type="text" class="input-field" placeholder="Search cities, countries...">
                </div>
            </header>

            <!-- Filters -->
            <div style="display: flex; gap: 0.75rem; margin-bottom: 2rem; overflow-x: auto; padding-bottom: 0.5rem;">
                <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">All</button>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Tropical</button>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Urban</button>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Adventure</button>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Relaxing</button>
            </div>

            <div class="grid-cards">
                ${destinations.map(dest => `
                    <div class="card" style="padding: 0; position: relative;">
                        <img src="${dest.image}" style="width: 100%; height: 220px; object-fit: cover;">
                        <span class="badge badge-primary" style="position: absolute; top: 1rem; left: 1rem; background: rgba(0,0,0,0.6); color: white; backdrop-filter: blur(4px);">${dest.country}</span>
                        
                        <div style="padding: 1.25rem;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                <h3 style="font-size: 1.25rem;">${dest.name}</h3>
                                <span class="badge badge-teal">${dest.cost}</span>
                            </div>
                            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Known for its ${dest.type.toLowerCase()} vibes and stunning views.</p>
                            
                            <button class="btn btn-outline" style="width: 100%; border-color: var(--bg-surface-alt); background: var(--bg-surface-alt);">
                                <span class="iconify" data-icon="ph:plus-circle"></span>
                                Add to Trip
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </main>
    </div>
    `;

    container.innerHTML = html;
}
