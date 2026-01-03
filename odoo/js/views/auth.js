import { store } from '../store.js';

export function render(container) {
    const html = `
    <div class="layout-auth">
        <div class="card" style="width: 100%; max-width: 420px; text-align: center; border: 1px solid rgba(255,255,255,0.8); background: rgba(255,255,255,0.9); backdrop-filter: blur(20px);">
            
            <div style="margin-bottom: 2rem;">
                <div style="width: 60px; height: 60px; background: var(--gradient-primary); border-radius: 16px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white;">
                    <span class="iconify" data-icon="ph:airplane-tilt-fill" style="font-size: 32px;"></span>
                </div>
                <h1 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Welcome to GlobeTrotter</h1>
                <p style="color: var(--text-muted);">Plan your next adventure in style.</p>
            </div>

            <div id="auth-forms">
                <!-- Login Form -->
                <form id="login-form">
                    <div class="input-group">
                        <label class="input-label" style="text-align: left;">Email Address</label>
                        <input type="email" class="input-field" placeholder="you@example.com" value="alex@globetrotter.io">
                    </div>
                    <div class="input-group">
                        <label class="input-label" style="text-align: left;">Password</label>
                        <input type="password" class="input-field" placeholder="••••••••" value="password">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Start Exploring
                        <span class="iconify" data-icon="ph:arrow-right-bold"></span>
                    </button>
                    
                    <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
                        New here? <a href="#" id="toggle-signup" style="color: var(--color-primary); font-weight: 600;">Create an account</a>
                    </p>
                </form>

                <!-- Signup Form (Hidden initially) -->
                <form id="signup-form" class="hidden">
                    <div class="input-group">
                        <label class="input-label" style="text-align: left;">Full Name</label>
                        <input type="text" class="input-field" placeholder="Jane Doe">
                    </div>
                    <div class="input-group">
                        <label class="input-label" style="text-align: left;">Email Address</label>
                        <input type="email" class="input-field" placeholder="you@example.com">
                    </div>
                    <div class="input-group">
                        <label class="input-label" style="text-align: left;">Password</label>
                        <input type="password" class="input-field" placeholder="Create a password">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Sign Up
                        <span class="iconify" data-icon="ph:sparkle-fill"></span>
                    </button>
                    
                    <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
                        Already have an account? <a href="#" id="toggle-login" style="color: var(--color-primary); font-weight: 600;">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
    `;

    container.innerHTML = html;

    // Logic
    const loginForm = container.querySelector('#login-form');
    const signupForm = container.querySelector('#signup-form');
    const toggleSignup = container.querySelector('#toggle-signup');
    const toggleLogin = container.querySelector('#toggle-login');

    toggleSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    toggleLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<div class="spinner"></div>';
        btn.disabled = true;

        // Simulate API delay
        setTimeout(async () => {
            await store.login();
            window.location.hash = '/'; // Go to dashboard
        }, 1000);
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Same logic for demo
        store.login();
        window.location.hash = '/';
    });
}
