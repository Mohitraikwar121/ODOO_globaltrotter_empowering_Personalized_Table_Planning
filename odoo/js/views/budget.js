import { store } from '../store.js';
import { Sidebar } from '../components/sidebar.js';

export function render(container, params) {
    // In a real app we would get ID from params, but here we might default to the first active trip if no ID
    // Parsing ID from hash manually if not passed correctly or just use the first trip for demo of the "View"
    const tripId = params.id || store.getTrips()[0].id;
    const trip = store.getTrip(tripId);

    if (!trip) {
        container.innerHTML = '<p>Trip not found. <a href="#/">Go Home</a></p>';
        return;
    }

    // Mock category data since our basic implementation might not have granular costs per category calculated per trip yet
    const categories = [
        { name: 'Flights', amount: 1200, color: 'var(--color-primary)' },
        { name: 'Accommodation', amount: 800, color: '#8B5CF6' },
        { name: 'Food & Dining', amount: 450, color: '#F97316' },
        { name: 'Activities', amount: 300, color: '#14B8A6' },
        { name: 'Transport', amount: 150, color: '#F43F5E' },
    ];

    const totalSpent = categories.reduce((acc, curr) => acc + curr.amount, 0);
    const budget = trip.budget || 3000;
    const progress = Math.min((totalSpent / budget) * 100, 100);

    // Conic gradient for pie chart
    // We'll calculate degrees for each slice
    let currentDeg = 0;
    const gradientParts = categories.map(cat => {
        const deg = (cat.amount / totalSpent) * 360;
        const part = `${cat.color} ${currentDeg}deg ${currentDeg + deg}deg`;
        currentDeg += deg;
        return part;
    }).join(', ');

    // Fallback if no spending
    const pieBackground = totalSpent > 0 ? `conic-gradient(${gradientParts})` : '#E2E8F0';

    const html = `
    <div class="layout-app">
        ${Sidebar('')} <!-- No active link highlight for sub-pages or pass parent -->
        
        <main class="app-main">
            <header class="section-header">
                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">
                        <a href="#/trip/${trip.id}" style="hover: underline;">${trip.name}</a>
                        <span class="iconify" data-icon="ph:caret-right"></span>
                        <span>Finances</span>
                    </div>
                    <h1 style="font-size: 1.75rem;">Budget & Expenses</h1>
                </div>
                <button class="btn btn-primary">
                    <span class="iconify" data-icon="ph:plus"></span>
                    Add Expense
                </button>
            </header>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                
                <!-- Left Column: Overview & Breakdown -->
                <div>
                    <!-- Total Budget Card -->
                    <div class="card" style="margin-bottom: 2rem; background: var(--gradient-dark); color: white;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
                            <div>
                                <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 0.25rem;">Total Budget</div>
                                <div style="font-size: 2.5rem; font-weight: 700;">$${budget.toLocaleString()}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 0.25rem;">Remaining</div>
                                <div style="font-size: 1.5rem; font-weight: 600;">$${(budget - totalSpent).toLocaleString()}</div>
                            </div>
                        </div>

                        <!-- Progress Bar -->
                        <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; font-size: 0.875rem; opacity: 0.9;">
                            <span>Spent: $${totalSpent.toLocaleString()}</span>
                            <span>${Math.round(progress)}%</span>
                        </div>
                        <div style="height: 12px; background: rgba(255,255,255,0.2); border-radius: 6px; overflow: hidden;">
                            <div style="height: 100%; width: ${progress}%; background: var(--color-accent); border-radius: 6px;"></div>
                        </div>
                    </div>

                    <!-- Category Breakdown -->
                    <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Spending by Category</h3>
                    <div class="card" style="padding: 0; overflow: hidden;">
                         ${categories.map(cat => {
        const pct = ((cat.amount / totalSpent) * 100).toFixed(1);
        return `
                                <div style="display: flex; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid var(--bg-surface-alt);">
                                    <div style="width: 12px; height: 12px; border-radius: 50%; background: ${cat.color}; margin-right: 1rem;"></div>
                                    <div style="flex: 1; font-weight: 500;">${cat.name}</div>
                                    <div style="margin-right: 2rem; color: var(--text-muted);">${pct}%</div>
                                    <div style="font-weight: 600;">$${cat.amount}</div>
                                </div>
                             `;
    }).join('')}
                    </div>
                </div>

                <!-- Right Column: Visual & Trends -->
                <div>
                    <div class="card" style="height: auto; text-align: center; padding: 2rem;">
                        <h3 style="margin-bottom: 1.5rem;">Cost Distribution</h3>
                        
                        <!-- CSS Pie Chart -->
                        <div style="width: 200px; height: 200px; border-radius: 50%; background: ${pieBackground}; margin: 0 auto; position: relative;">
                            <!-- Inner hole for donut effect -->
                            <div style="position: absolute; inset: 40px; background: var(--bg-surface); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Top Expense</div>
                                <div style="font-weight: 700; color: var(--color-primary);">Flights</div>
                            </div>
                        </div>

                        <div style="margin-top: 2rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;">
                            <!-- Legend chips -->
                            ${categories.map(cat => `
                                <span style="display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; padding: 0.25rem 0.5rem; background: var(--bg-surface-alt); border-radius: 4px;">
                                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${cat.color};"></span>
                                    ${cat.name}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="card" style="margin-top: 1.5rem; background: #FFF7ED; border-color: #FED7AA; color: #9A3412;">
                        <div style="display: flex; gap: 0.75rem;">
                            <span class="iconify" data-icon="ph:lightbulb-fill" style="font-size: 1.5rem;"></span>
                            <div>
                                <h4 style="font-weight: 600; margin-bottom: 0.25rem;">Budget Tip</h4>
                                <p style="font-size: 0.9rem; line-height: 1.4;">
                                    Accommodation accounts for 27% of your budget. Consider looking for hostels or booking in advance to save ~10%.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </div>
    `;

    container.innerHTML = html;
}
