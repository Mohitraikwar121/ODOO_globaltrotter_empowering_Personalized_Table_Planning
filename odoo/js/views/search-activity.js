import { Sidebar } from '../components/sidebar.js';

export function render(container) {
    const activities = [
        { id: 'a1', title: 'Blue Lagoon Spa', type: 'Relaxation', price: 80, rating: 4.8, image: 'https://images.unsplash.com/photo-1534723387799-738947f6735e?w=800', time: '4h' },
        { id: 'a2', title: 'Northern Lights Tour', type: 'Adventure', price: 120, rating: 4.9, image: 'https://images.unsplash.com/photo-1540327341386-b452818617ca?w=800', time: '5h' },
        { id: 'a3', title: 'Sushi Making Class', type: 'Food', price: 90, rating: 4.7, image: 'https://images.unsplash.com/photo-1599307767316-77f8d14d33a1?w=800', time: '3h' },
        { id: 'a4', title: 'Volcano Hike', type: 'Adventure', price: 50, rating: 4.6, image: 'https://images.unsplash.com/photo-1442129188373-cf6772714529?w=800', time: '6h' },
        { id: 'a5', title: 'City Bike Tour', type: 'Tours', price: 35, rating: 4.5, image: 'https://images.unsplash.com/photo-1498632662283-a75d1656a84d?w=800', time: '2h' },
        { id: 'a6', title: 'Wine Tasting', type: 'Food', price: 65, rating: 4.8, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800', time: '2h' },
    ];

    const html = `
    <div class="layout-app">
        ${Sidebar('')}
        
        <main class="app-main">
            <header class="section-header">
                <div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.25rem;">Find Activities</h1>
                    <p style="color: var(--text-muted);">Uncover the best experiences for your trip.</p>
                </div>
            </header>

            <!-- Filters -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <button class="badge badge-primary" style="font-size: 0.9rem; padding: 0.5rem 1rem; border: none; cursor: pointer;">All</button>
                <button class="badge" style="background: var(--bg-surface-alt); color: var(--text-main); font-size: 0.9rem; padding: 0.5rem 1rem; border: none; cursor: pointer;">Adventure</button>
                <button class="badge" style="background: var(--bg-surface-alt); color: var(--text-main); font-size: 0.9rem; padding: 0.5rem 1rem; border: none; cursor: pointer;">Food & Drink</button>
                <button class="badge" style="background: var(--bg-surface-alt); color: var(--text-main); font-size: 0.9rem; padding: 0.5rem 1rem; border: none; cursor: pointer;">Relaxation</button>
                <button class="badge" style="background: var(--bg-surface-alt); color: var(--text-main); font-size: 0.9rem; padding: 0.5rem 1rem; border: none; cursor: pointer;">Tours</button>
            </div>

            <div class="grid-cards">
                ${activities.map(act => `
                    <div class="card" style="padding: 0; display: flex; flex-direction: column;">
                        <img src="${act.image}" style="width: 100%; height: 160px; object-fit: cover;">
                        
                        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                <h3 style="font-size: 1.1rem; line-height: 1.3;">${act.title}</h3>
                                <div style="display: flex; align-items: center; gap: 0.25rem; font-weight: 600; font-size: 0.9rem;">
                                    <span class="iconify" data-icon="ph:star-fill" style="color: #FCC419;"></span>
                                    ${act.rating}
                                </div>
                            </div>
                            
                            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
                                ${act.type} • ${act.time}
                            </div>
                            
                            <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 700; font-size: 1.1rem;">$${act.price}</span>
                                <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.875rem;">
                                    <span class="iconify" data-icon="ph:plus"></span> Add
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </main>
    </div>
    `;

    container.innerHTML = html;
}
