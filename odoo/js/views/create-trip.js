import { store } from '../store.js';
import { Sidebar } from '../components/sidebar.js';

export function render(container) {
    const html = `
    <div class="layout-app">
        ${Sidebar('/create-trip')}
        
        <main class="app-main">
            <header class="section-header">
                <div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.25rem;">Plan a New Trip</h1>
                    <p style="color: var(--text-muted);">Start your journey by defining the basics.</p>
                </div>
            </header>

            <div style="max-width: 600px;">
                <form id="create-trip-form" class="card">
                    <div style="margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">Trip Details</h3>
                        
                        <div class="input-group">
                            <label class="input-label">Trip Name</label>
                            <input type="text" name="name" class="input-field" placeholder="e.g. Summer in Italy" required>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Destination</label>
                            <input type="text" name="location" class="input-field" placeholder="e.g. Rome, Italy" required>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="input-group">
                                <label class="input-label">Start Date</label>
                                <input type="date" name="startDate" class="input-field" required>
                            </div>
                            <div class="input-group">
                                <label class="input-label">End Date</label>
                                <input type="date" name="endDate" class="input-field" required>
                            </div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Cover Image URL (Optional)</label>
                            <input type="url" name="coverImage" id="image-url" class="input-field" placeholder="https://..." value="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80">
                        </div>

                        <!-- Image Preview -->
                        <div id="image-preview" style="height: 200px; background: var(--bg-surface-alt); border-radius: var(--radius-md); overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 1rem;">
                        <a href="#/" class="btn btn-ghost">Cancel</a>
                        <button type="submit" class="btn btn-primary">
                            Create Trip
                            <span class="iconify" data-icon="ph:arrow-right-bold"></span>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
    `;

    container.innerHTML = html;

    // Logic
    const form = container.querySelector('#create-trip-form');
    const imgInput = container.querySelector('#image-url');
    const imgPreview = container.querySelector('#image-preview');

    // Live preview
    imgInput.addEventListener('input', (e) => {
        const url = e.target.value;
        if (url) {
            imgPreview.innerHTML = `<img src="${url}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='https://via.placeholder.com/600x200?text=Invalid+Image'">`;
        } else {
            imgPreview.innerHTML = `<span style="color: var(--text-muted);">No image selected</span>`;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const newTrip = {
            id: 't' + Date.now(),
            name: formData.get('name'),
            location: formData.get('location'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            coverImage: formData.get('coverImage') || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80',
            status: 'planning',
            budget: 0,
            spent: 0,
            currency: 'USD',
            itinerary: []
        };

        store.addTrip(newTrip);

        // Use a slight delay or just go
        window.location.hash = '/trip/' + newTrip.id;
    });
}
