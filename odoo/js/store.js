import { MOCK_DATA } from './mock-api.js';

class Store {
    constructor() {
        this.state = {
            user: null,
            trips: [],
            currentTrip: null,
            theme: 'light' // default
        };
        this.listeners = [];
        this.STORAGE_KEY = 'globetrotter_data_v1';
    }

    init() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.state = JSON.parse(stored);
            console.log('📦 Data loaded from LocalStorage');
        } else {
            console.log('✨ First run: Seeding mock data');
            this.seed();
        }

        // Apply theme on init
        this.applyTheme();
    }

    seed() {
        this.state.user = MOCK_DATA.user;
        this.state.trips = MOCK_DATA.trips;
        this.state.theme = 'light';
        this.save();
    }

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        this.notify();
    }

    // --- Theme Management ---

    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.save();
    }

    applyTheme() {
        const theme = this.state.theme || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }

    // --- Actions ---

    login(email, password) {
        // Mock login - accepts any email for demo purposes
        // Ideally checking against seed user, but for hackathon demo we just ensure it returns true
        if (!this.state.user) this.seed();
        return Promise.resolve(this.state.user);
    }

    logout() {
        // effectively just a reload or clear user in a real app
        // for this demo we might just keep data and redirect
    }

    getTrips() {
        return this.state.trips;
    }

    getTrip(id) {
        return this.state.trips.find(t => t.id === id);
    }

    addTrip(trip) {
        this.state.trips.unshift(trip);
        this.save();
    }

    // --- Publisher/Subscriber for reactive UI ---
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(l => l(this.state));
    }
}

export const store = new Store();
