import { store } from '../store.js';

// Standalone render function, no sidebar import needed if we want full screen, 
// but let's keep the layout consistent or use a simplified header.

export function render(container, params) {
    // For demo, we simulate "fetching" a shared trip. 
    // In reality this might be a fresh fetch. We'll use the store logic for now.
    const tripId = params.id || store.getTrips()[0].id;
    const trip = store.getTrip(tripId);

    if (!trip) {
        container.innerHTML = '<p>Trip not found.</p>';
        return;
    }

    // Flatten activities for a summary list
    const totalActivities = trip.itinerary ? trip.itinerary.reduce((acc, day) => acc + day.activities.length, 0) : 0;

    const html = `
    <div style="background: var(--bg-body); min-height: 100vh; padding-bottom: 4rem;">
        
        <!-- Shared Header -->
        <nav style="padding: 1rem 2rem; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 50; border-bottom: 1px solid var(--bg-surface-alt);">
            <div style="font-weight: 700; font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
                <span class="iconify" data-icon="ph:airplane-tilt-fill" style="color: var(--color-primary);"></span>
                GlobeTrotter
            </div>
            <div>
                <a href="#/create-trip" class="btn btn-outline" style="margin-right: 0.5rem;">Create Your Own</a>
                <a href="#/login" class="btn btn-primary">Sign Up</a>
            </div>
        </nav>

        <header style="padding: 4rem 2rem; text-align: center; background: linear-gradient(to bottom, white, var(--bg-body));">
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem; border: 4px solid white; box-shadow: var(--shadow-md);">
                    <img src="${store.state.user ? store.state.user.avatar : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}" style="width: 100%; height: 100%;">
                </div>
                <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${trip.name}</h1>
                <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">
                    Check out this ${trip.itinerary.length}-day trip to <strong>${trip.location}</strong> planned by ${store.state.user ? store.state.user.name : 'Felix'}.
                </p>

                <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 3rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${trip.itinerary.length}</div>
                        <div style="font-size: 0.875rem; color: var(--text-muted);">Days</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-secondary);">${totalActivities}</div>
                        <div style="font-size: 0.875rem; color: var(--text-muted);">Activities</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-accent);">$${trip.budget}</div>
                        <div style="font-size: 0.875rem; color: var(--text-muted);">Est. Cost</div>
                    </div>
                </div>

                <button class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem; box-shadow: var(--shadow-float);">
                    <span class="iconify" data-icon="ph:copy-simple"></span>
                    Copy Itinerary to My Planning
                </button>
            </div>
        </header>

        <div class="container" style="max-width: 800px;">
            <div class="card" style="padding: 2rem;">
                <h3 style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--bg-surface-alt);">Itinerary Preview</h3>
                
                ${trip.itinerary && trip.itinerary.map(day => `
                    <div style="margin-bottom: 2rem;">
                        <h4 style="font-size: 1.1rem; color: var(--color-primary); margin-bottom: 1rem;">Day ${day.day}: ${day.location}</h4>
                        <div style="border-left: 2px solid var(--bg-surface-alt); padding-left: 1.5rem;">
                            ${day.activities.map(act => `
                                <div style="margin-bottom: 1rem; position: relative;">
                                    <div style="position: absolute; left: -29px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: var(--text-light);"></div>
                                    <div style="font-weight: 600;">${act.title}</div>
                                    <div style="color: var(--text-muted); font-size: 0.9rem;">${act.type}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

    </div>
    `;

    container.innerHTML = html;
}
