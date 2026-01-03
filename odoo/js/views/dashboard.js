import { store } from '../store.js';
import { Sidebar } from '../components/sidebar.js';
import { geminiAssistant } from '../ai-assistant.js';

export function render(container) {
    const user = store.state.user;
    const trips = store.getTrips();
    const upcomingTrips = trips.filter(t => t.status === 'upcoming');
    const pastTrips = trips.filter(t => t.status === 'completed');

    const nextTrip = upcomingTrips[0];

    // Stats
    const stats = [
        { label: 'Upcoming', value: upcomingTrips.length, icon: 'ph:calendar-check', color: 'text-blue-500' },
        { label: 'Countries', value: 12, icon: 'ph:globe-hemisphere-west', color: 'text-teal-500' }, // mock global stat
        { label: 'Memories', value: 84, icon: 'ph:image', color: 'text-rose-500' }
    ];

    const html = `
    <div class="layout-app">
        ${Sidebar('/')}
        
        <main class="app-main">
            <!-- Header -->
            <header class="section-header">
                <div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.25rem;">Hello, ${user ? user.name.split(' ')[0] : 'Explorer'}! 👋</h1>
                    <p style="color: var(--text-muted);">Ready to plan your next adventure?</p>
                </div>
                <div style="display: flex; items-align: center; gap: 1rem;">
                    <img src="${user ? user.avatar : ''}" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; box-shadow: var(--shadow-sm);" alt="Profile">
                </div>
            </header>

            <!-- Quick Stats -->
            <section style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
                ${stats.map(stat => `
                    <div class="card" style="padding: 1.25rem; display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--bg-surface-alt); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--text-main);">
                            <span class="iconify" data-icon="${stat.icon}"></span>
                        </div>
                        <div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${stat.value}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">${stat.label}</div>
                        </div>
                    </div>
                `).join('')}
            </section>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                <!-- Main Content Column -->
                <div>
                    <!-- Next Trip Hero -->
                    ${nextTrip ? `
                    <section style="margin-bottom: 2.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1rem;">
                            <h2 style="font-size: 1.25rem;">Your Next Adventure</h2>
                        </div>
                        <div class="card" style="padding: 0; display: flex; overflow: hidden; height: 240px; position: relative;">
                            <img src="${nextTrip.coverImage}" style="width: 45%; object-fit: cover;" alt="${nextTrip.name}">
                            <div style="padding: 2rem; flex: 1; display: flex; flex-direction: column; justify-content: center;">
                                <span class="badge badge-primary" style="align-self: flex-start; margin-bottom: 0.75rem;">${nextTrip.days || 10} Days To Go</span>
                                <h3 style="font-size: 1.75rem; margin-bottom: 0.5rem;">${nextTrip.name}</h3>
                                <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                                    <span class="iconify" data-icon="ph:map-pin"></span>
                                    ${nextTrip.location}
                                </div>
                                <a href="#/trip/${nextTrip.id}" class="btn btn-primary" style="align-self: flex-start;">
                                    View Itinerary
                                    <span class="iconify" data-icon="ph:arrow-right"></span>
                                </a>
                            </div>
                        </div>
                    </section>
                    ` : `
                    <section style="margin-bottom: 2.5rem; text-align: center; padding: 3rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 2px dashed var(--bg-surface-alt);">
                        <h3>No upcoming trips</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Time to start planning something new!</p>
                        <a href="#/create-trip" class="btn btn-primary">Create New Trip</a>
                    </section>
                    `}

                    <!-- Recommended / Inspiration -->
                    <section>
                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h2 style="font-size: 1.25rem;">Popular Destinations</h2>
                            <a href="#/explore" class="btn btn-ghost" style="font-size: 0.875rem;">See All</a>
                        </div>
                        <div class="grid-cards">
                            ${store.state.user ? [
            { name: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', price: '$2,200', tag: 'Trending' },
            { name: 'Reykjavik, Iceland', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800', price: '$3,500', tag: 'Adventure' },
            { name: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', price: '$2,800', tag: 'Relaxing' }
        ].map(dest => `
                                <div class="card" style="padding: 0; cursor: pointer;">
                                    <div style="position: relative;">
                                        <img src="${dest.img}" style="width: 100%; height: 200px; object-fit: cover;">
                                        <span class="badge badge-teal" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.9);">${dest.tag}</span>
                                    </div>
                                    <div style="padding: 1.25rem;">
                                        <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;">${dest.name}</h4>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
                                            <span style="color: var(--text-muted); font-size: 0.9rem;">Est. Cost</span>
                                            <span style="font-weight: 600; color: var(--color-primary);">${dest.price}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('') : ''}
                        </div>
                    </section>
                </div>

                <!-- Sticky Sidebar / Widgets -->
                <aside>
                    <!-- Budget Widget -->
                    <div class="card" style="margin-bottom: 2rem;">
                         <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Trip Budget</h3>
                         <div style="display: flex; align-items: center; justify-content: center; position: relative; width: 150px; height: 150px; margin: 0 auto;">
                            <!-- Simple SVG Donut Chart -->
                            <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" stroke-width="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-dasharray="60, 100" />
                            </svg>
                            <div style="position: absolute; text-align: center;">
                                <div style="font-size: 1.25rem; font-weight: 700;">60%</div>
                                <div style="font-size: 0.7rem; color: var(--text-muted);">Spent</div>
                            </div>
                         </div>
                         <div style="margin-top: 1rem; text-align: center;">
                            <p style="font-size: 0.9rem; color: var(--text-muted);">${nextTrip ? nextTrip.name : 'Total Saved'}</p>
                            <p style="font-weight: 600;">$${nextTrip ? nextTrip.spent : 0} / $${nextTrip ? nextTrip.budget : 0}</p>
                         </div>
                    </div>

                    <!-- Create CTA -->
                    <div class="card" style="background: var(--gradient-sunset); color: white; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">✈️</div>
                        <h3 style="margin-bottom: 0.5rem;">New Trip?</h3>
                        <p style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 1.5rem;">Start planning your next dream vacation today.</p>
                        <a href="#/create-trip" class="btn" style="background: white; color: #F43F5E; width: 100%;">Let's Go</a>
                    </div>
                </aside>
            </div>
        </main>

        <!-- AI Assistant -->
        <div class="ai-assistant" title="Click to speak">
            <img src="img/ai-avatar.png" alt="AI Assistant">
            <div class="ai-assistant-tooltip">Plan with Gemini! 🤖 (Click me)</div>
        </div>

    </div>
    `;

    container.innerHTML = html;

    // Initialize Voice Assistant
    geminiAssistant.attachToAvatar('.ai-assistant');
}
