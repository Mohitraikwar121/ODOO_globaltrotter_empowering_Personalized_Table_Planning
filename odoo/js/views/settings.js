import { store } from '../store.js';
import { Sidebar } from '../components/sidebar.js';

export function render(container) {
    const user = store.state.user || { name: '', email: '', bio: '', avatar: '' };

    const html = `
    <div class="layout-app">
        ${Sidebar('/settings')}
        
        <main class="app-main">
            <header class="section-header">
                <div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.25rem;">Settings</h1>
                    <p style="color: var(--text-muted);">Manage your profile and preferences.</p>
                </div>
            </header>

            <div style="max-width: 600px;">
                
                <!-- Profile Card -->
                <div class="card" style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1.5rem;">Public Profile</h3>
                    
                    <div style="display: flex; align-items: start; gap: 2rem; margin-bottom: 2rem;">
                        <div style="position: relative;">
                            <img src="${user.avatar}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid var(--bg-surface-alt);">
                            <button class="btn btn-icon-only" style="position: absolute; bottom: 0; right: 0; background: var(--color-primary); color: white; width: 32px; height: 32px; padding: 0;">
                                <span class="iconify" data-icon="ph:camera-fill"></span>
                            </button>
                        </div>
                        <div style="flex: 1;">
                            <div class="input-group">
                                <label class="input-label">Display Name</label>
                                <input type="text" class="input-field" value="${user.name}">
                            </div>
                            <div class="input-group" style="margin-bottom: 0;">
                                <label class="input-label">Bio</label>
                                <textarea class="input-field" rows="3">${user.bio}</textarea>
                                <div style="text-align: right; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Brief description for your shared trips.</div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end;">
                        <button class="btn btn-primary">Save Changes</button>
                    </div>
                </div>

                <!-- App Preferences -->
                 <div class="card">
                    <h3 style="margin-bottom: 1.5rem;">Preferences</h3>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--bg-surface-alt);">
                        <div>
                            <div style="font-weight: 600;">Dark Mode</div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Switch between light and dark themes</div>
                        </div>
                         <!-- Toggle Switch Mock -->
                        <div style="width: 44px; height: 24px; background: var(--bg-surface-alt); border-radius: 12px; position: relative; cursor: pointer;">
                            <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; box-shadow: var(--shadow-sm);"></div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
                        <div>
                            <div style="font-weight: 600;">Currency</div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Default currency for new trips</div>
                        </div>
                        <select class="input-field" style="width: auto; padding: 0.5rem 2rem 0.5rem 1rem;">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                        </select>
                    </div>
                </div>

                <div style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid var(--bg-surface-alt);">
                    <button class="btn btn-outline" style="color: var(--color-accent); border-color: var(--bg-surface-alt);">
                        Log Out
                    </button>
                </div>

            </div>
        </main>
    </div>
    `;

    container.innerHTML = html;
}
