import { store } from '../store.js';
import { Sidebar } from '../components/sidebar.js';

export function render(container) {
    const trips = store.getTrips();
    const upcoming = trips.filter(t => t.status !== 'completed');
    const past = trips.filter(t => t.status === 'completed');

    const renderTripCard = (trip) => `
        <a href="#/trip/${trip.id}" class="card" style="padding: 0; display: block; text-decoration: none; color: inherit;">
            <div style="position: relative;">
                <img src="${trip.coverImage}" style="width: 100%; height: 200px; object-fit: cover;">
                <span class="badge ${trip.status === 'upcoming' ? 'badge-primary' : 'badge-orange'}" 
                      style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.9);">
                    ${trip.status.toUpperCase()}
                </span>
            </div>
            <div style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <h3 style="font-size: 1.25rem;">${trip.name}</h3>
                    <div style="font-weight: 600; color: var(--color-primary);">$${trip.budget}</div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
                    <span class="iconify" data-icon="ph:calendar-blank"></span>
                    ${trip.startDate} - ${trip.endDate}
                </div>

                <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--text-light);">
                    <span>${trip.itinerary ? trip.itinerary.length : 0} Days Planned</span>
                    •
                    <span>${trip.travelers || 1} Travelers</span>
                </div>
            </div>
        </a>
    `;

    const html = `
    <div class="layout-app">
        ${Sidebar('/trips')}
        
        <main class="app-main">
            <header class="section-header">
                <div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.25rem;">My Trips</h1>
                    <p style="color: var(--text-muted);">All your adventures in one place.</p>
                </div>
                <a href="#/create-trip" class="btn btn-primary">
                    <span class="iconify" data-icon="ph:plus"></span>
                    Plan New Trip
                </a>
            </header>

            <section style="margin-bottom: 3rem;">
                <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span class="iconify" data-icon="ph:airplane-takeoff" style="color: var(--color-primary);"></span>
                    Upcoming Adventures
                </h2>
                ${upcoming.length > 0 ? `
                    <div class="grid-cards">
                        ${upcoming.map(renderTripCard).join('')}
                    </div>
                ` : `
                    <div style="text-align: center; padding: 4rem; background: var(--bg-surface-alt); border-radius: var(--radius-lg);">
                        <p style="color: var(--text-muted);">No upcoming trips planned yet.</p>
                    </div>
                `}
            </section>

            <section>
                <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span class="iconify" data-icon="ph:clock-counter-clockwise" style="color: var(--text-muted);"></span>
                    Past Trips
                </h2>
                ${past.length > 0 ? `
                    <div class="grid-cards">
                        ${past.map(renderTripCard).join('')}
                    </div>
                ` : `
                    <p style="color: var(--text-muted);">No history yet. Go make some memories!</p>
                `}
            </section>
        </main>
    </div>
    `;

    container.innerHTML = html;
}
