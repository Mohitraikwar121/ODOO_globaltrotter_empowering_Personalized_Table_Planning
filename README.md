🌍 GlobeTrotter

> A premium, high-fidelity travel management suite.
> GlobeTrotter bridges complex itinerary planning with real-time expense tracking, giving modern travelers an all-in-one command center for their journeys.

⚡ Quick Features
💸 Financial Suite:** Dynamic budget tracking, smart expense categorization, and real-time burn rate analytics.
🛠️ Centralized State Architecture:** Reactive, single-source-of-truth data flow across all views.
📊 Visual Analytics:** High-fidelity progress tracking and dynamic Chart.js visualizations.
🚀 Zero-Build Setup:** Built with modern ES6 modules—no heavy bundlers required to get started.

🏗️ Architecture & Data Flow
GlobeTrotter relies on a centralized store (`store.js`) to keep the Dashboard, Budget, and Settings views perfectly in sync.

┌─────────────────┐       dispatch action      ┌──────────────────┐
│   User Action   │ ─────────────────────────> │   store.js       │
│  (Budget UI)    │                            │  (Central State) │
└─────────────────┘                            └────────┬─────────┘
                                                        │
                                                        │ updates trip data (e.g. T1, T2)
                                                        ▼
┌─────────────────┐      re-renders SVGs &     ┌──────────────────┐
│  UI Component   │ <───────────────────────── │   budget.js      │
│  (Visuals/DOM)  │      Chart.js instances    │  (Analytics Engine)
└─────────────────┘                            └──────────────────┘


🚀 Key Modules

💸 Financial Suite (`budget.js`)

Real-time Analytics: Visualizes spending habits using dynamic Pie and Donut charts.
Burn Rate Tracking: Live safety buffers that notify you before exceeding your trip ceiling.
Smart Categorization: Automatic grouping into standard travel buckets: `Flights`, `Lodging`, `Transit`, and `Dining`.

### 🛠️ State Management (`store.js`)
Single Source of Truth:** Centralized state tree managing trip metadata, active itineraries, and budget allocations.
Reactive Updates:** Subscribed UI components re-render automatically whenever state mutations occur.

💻 Installation & Local Development

1. Clone the repository
2. Run a local server
3. Open the app
Navigate to `http://localhost:8080` in your web browser.

📈 Roadmap
| Status | Phase | Description |
|    |   |       |
| ✅ | Phase 1 | Core Itinerary Engine |
| ✅ | Phase 2 | Premium Budget & Expenses Module |
| ✅ | Phase 3 | User Settings & Profile Persistence |
| 🚧 | Phase 4 | Multi-currency support with live exchange rate API |
| 📋 | Phase 5 | PDF Export for Expense Reports & Receipts |

Clone the repository

Navigate to the project directory

Install dependencies

Start the development server
