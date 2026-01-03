import { store } from '../store.js';
import { Sidebar } from '../components/sidebar.js';

export function render(container, params) {
    const tripId = params.id || store.getTrips()[0].id;
    const trip = store.getTrip(tripId);

    if (!trip) {
        container.innerHTML = '<p>Trip not found.</p>';
        return;
    }

    // Flatten itinerary for timeline
    const activities = trip.itinerary ? trip.itinerary.flatMap(day =>
        day.activities.map(act => ({ ...act, dayDate: day.date, dayNum: day.day }))
    ) : [];

    const html = `
    <div class="layout-app">
        ${Sidebar('')}
        
        <main class="app-main">
            <header class="section-header">
                <div>
                     <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">
                        <a href="#/trip/${trip.id}" style="hover: underline;">${trip.name}</a>
                        <span class="iconify" data-icon="ph:caret-right"></span>
                        <span>Timeline</span>
                    </div>
                    <h1 style="font-size: 1.75rem;">Trip Timeline</h1>
                </div>
            </header>

            <div class="card" style="max-width: 800px; padding: 2rem;">
                <div style="position: relative; padding-left: 2rem; border-left: 2px solid var(--bg-surface-alt);">
                    
                    <!-- Start Node -->
                    <div style="position: absolute; left: -9px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--color-primary); border: 2px solid white;"></div>
                    <div style="margin-bottom: 2rem;">
                        <div style="font-weight: 700; font-size: 1.1rem; color: var(--color-primary);">Trip Starts</div>
                        <div style="color: var(--text-muted); font-size: 0.9rem;">${trip.startDate} • ${trip.location}</div>
                    </div>

                    ${activities.map(act => `
                        <div style="position: relative; margin-bottom: 2rem;">
                            <div style="position: absolute; left: -39px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: var(--bg-surface-alt); border: 2px solid white;"></div>
                            
                            <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md); position: relative;">
                                <span style="position: absolute; top: 1rem; right: 1rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">${act.time}</span>
                                <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">${act.title}</h4>
                                <div style="font-size: 0.875rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
                                    <span class="iconify" data-icon="ph:calendar-blank"></span>
                                    Day ${act.dayNum} (${act.dayDate})
                                </div>
                            </div>
                        </div>
                    `).join('')}

                    <!-- End Node -->
                    <div style="position: absolute; left: -9px; bottom: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--color-accent); border: 2px solid white;"></div>
                     <div>
                        <div style="font-weight: 700; font-size: 1.1rem; color: var(--color-accent);">Trip Ends</div>
                        <div style="color: var(--text-muted); font-size: 0.9rem;">${trip.endDate}</div>
                    </div>

                </div>
            </div>
        </main>
    </div>
    `;

    container.innerHTML = html;
}
