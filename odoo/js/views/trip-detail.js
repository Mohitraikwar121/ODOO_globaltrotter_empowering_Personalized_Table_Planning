import { store } from '../store.js';
import { Sidebar } from '../components/sidebar.js';

export function render(container, params) {
    const trip = store.getTrip(params.id);

    if (!trip) {
        container.innerHTML = '<p>Trip not found</p>';
        return;
    }

    // Helper to get day name
    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    // Group activities by date/day if not already (mock data is structured by day, but let's assume flat list for flexibility or stick to structure)
    // Mock data structure: trip.itinerary = [ { day: 1, date: '...', location: '...', activities: [...] } ]

    // Generate empty days if itinerary is sparse or just show what's there
    // For demo, we stick to what's in the itinerary array.

    const renderActivity = (act) => {
        let icon = 'ph:circle';
        let colorClass = 'text-gray-500';
        let bgClass = 'bg-gray-100';

        if (act.type === 'transport') { icon = 'ph:airplane-tilt'; colorClass = 'text-blue-500'; bgClass = 'bg-blue-50'; }
        if (act.type === 'lodging') { icon = 'ph:house-line'; colorClass = 'text-purple-500'; bgClass = 'bg-purple-50'; }
        if (act.type === 'food') { icon = 'ph:fork-knife'; colorClass = 'text-orange-500'; bgClass = 'bg-orange-50'; }
        if (act.type === 'activity') { icon = 'ph:camera'; colorClass = 'text-teal-500'; bgClass = 'bg-teal-50'; }

        return `
        <div class="card" style="padding: 1rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; cursor: grab; border-left: 4px solid transparent; transition: all 0.2s;">
            <div style="cursor: grab; color: var(--text-light);">
                <span class="iconify" data-icon="ph:dots-six-vertical" style="font-size: 1.25rem;"></span>
            </div>
            <div style="width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;" class="${colorClass} ${bgClass}"> <!-- Tailwind mock classes handled via inline or ignore -->
                <span class="iconify" data-icon="${icon}" style="color: inherit;"></span>
            </div>
            <div style="flex: 1;">
                <h4 style="font-size: 1rem; margin-bottom: 0.125rem;">${act.title}</h4>
                <div style="font-size: 0.875rem; color: var(--text-muted);">${act.time} • ${act.type.charAt(0).toUpperCase() + act.type.slice(1)}</div>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: 600;">$${act.cost}</div>
            </div>
        </div>
        `;
    };

    const renderDay = (dayItem) => `
        <div style="margin-bottom: 2.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; position: sticky; top: 0; background: var(--bg-body); z-index: 5; padding: 0.5rem 0;">
                <div>
                    <h3 style="font-size: 1.25rem; font-weight: 700;">Day ${dayItem.day} <span style="font-weight: 400; color: var(--text-muted); font-size: 1rem; margin-left: 0.5rem;">${getDayName(dayItem.date)}</span></h3>
                    <div style="font-size: 0.875rem; color: var(--color-primary);">${dayItem.location}</div>
                </div>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                    <span class="iconify" data-icon="ph:plus"></span>
                    Add Activity
                </button>
            </div>
            <div class="day-activities">
                ${dayItem.activities.length > 0 ? dayItem.activities.map(renderActivity).join('') :
            '<p style="color: var(--text-light); font-style: italic; padding: 1rem; border: 1px dashed var(--bg-surface-alt); border-radius: 8px; text-align: center;">No activities planned yet.</p>'}
            </div>
        </div>
    `;

    const html = `
    <div class="layout-app">
        ${Sidebar('')}
        
        <main class="app-main" style="padding: 0;">
            <!-- Hero Header -->
            <div style="height: 240px; position: relative;">
                <img src="${trip.coverImage}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);"></div>
                <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; color: white;">
                    <div class="container" style="max-width: 1000px; margin: 0;">
                        <span class="badge badge-primary" style="background: white; color: var(--color-primary); margin-bottom: 0.5rem; display: inline-block;">${trip.status.toUpperCase()}</span>
                        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${trip.name}</h1>
                        <div style="display: flex; gap: 1.5rem; font-size: 1rem; opacity: 0.9;">
                            <span style="display: flex; align-items: center; gap: 0.5rem;">
                                <span class="iconify" data-icon="ph:map-pin"></span> ${trip.location}
                            </span>
                            <span style="display: flex; align-items: center; gap: 0.5rem;">
                                <span class="iconify" data-icon="ph:calendar"></span> ${trip.startDate} - ${trip.endDate}
                            </span>
                            <span style="display: flex; align-items: center; gap: 0.5rem;">
                                <span class="iconify" data-icon="ph:currency-circle-dollar"></span> Budget: $${trip.budget}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div style="max-width: 1000px; padding: 2rem;">
                <!-- Tabs -->
                <div style="display: flex; gap: 2rem; border-bottom: 1px solid var(--bg-surface-alt); margin-bottom: 2rem;">
                    <a href="#/trip/${trip.id}" class="tab-link active" style="padding-bottom: 1rem; border-bottom: 2px solid var(--color-primary); color: var(--color-primary); font-weight: 600;">Itinerary</a>
                    <a href="#/trip/${trip.id}/budget" class="tab-link" style="padding-bottom: 1rem; color: var(--text-muted);">Budget</a>
                    <a href="#/trip/${trip.id}/timeline" class="tab-link" style="padding-bottom: 1rem; color: var(--text-muted);">Timeline</a>
                    <a href="#/settings" class="tab-link" style="padding-bottom: 1rem; color: var(--text-muted);">Settings</a>
                </div>

                <!-- Itinerary Builder -->
                <div id="itinerary-content">
                    ${trip.itinerary && trip.itinerary.length > 0 ?
            trip.itinerary.map(renderDay).join('') :
            `
                        <div style="text-align: center; padding: 4rem;">
                            <h3>Let's start planning!</h3>
                            <button class="btn btn-primary" style="margin-top: 1rem;">Add First Day</button>
                        </div>
                        `
        }
                </div>
            </div>
        </main>
    </div>
    <style>
        .bg-blue-50 { background-color: #EFF6FF; }
        .bg-purple-50 { background-color: #FAF5FF; }
        .bg-orange-50 { background-color: #FFF7ED; }
        .bg-teal-50 { background-color: #F0FDFA; }
        
        .text-blue-500 { color: #3B82F6; }
        .text-purple-500 { color: #8B5CF6; }
        .text-orange-500 { color: #F97316; }
        .text-teal-500 { color: #14B8A6; }
    </style>
    `;

    container.innerHTML = html;
}
