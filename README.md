🌍 GlobeTrotter
GlobeTrotter is a premium, high-fidelity travel management application.
It bridges the gap between complex itinerary planning and real-time expense tracking, providing a seamless "all-in-one" experience for the modern traveler.
🚀 Key Modules
💸 Financial Suite (budget.js)
The newly implemented budget engine provides deep insights into travel spending:
Real-time Analytics: Visualizes data using dynamic charts (Pie/Donut) to categorize expenses.

Burn Rate Tracking: Monitoring tools to ensure "Total Spent" doesn't exceed the trip ceiling.

Smart Categorization: Automatically groups costs into Flights, Lodging, Transit, and Dining.

🛠️ State Management (store.js)
The app utilizes a centralized state architecture to ensure data consistency across the Dashboard, Budget, and Settings views.

Single Source of Truth: All trip data (T1, T2, etc.) is managed via a unified store.

Reactive Updates: UI components automatically re-render when the budget state is modified.

🏗️ Architecture & Data Flow
To understand how the budget module interacts with the core application, refer to the flow below:

User Input: User adds an expense via the Budget UI.

State Update: store.js processes the new entry and updates the trip object.

Visual Render: budget.js listens for changes and updates the SVG progress bars and Chart.js instances.

🛠️ Installation & Setup
Clone the Repository

Bash
Local Environment Since GlobeTrotter uses ES6 modules, it must be run via a local server:

Bash
# If using Python
python -m http.server 8080

# If using Node.js
npx http-server .
Access the App Navigate to http://localhost:8080 in your browser.

📈 Roadmap
[x] Phase 1: Core Itinerary Engine.

[x] Phase 2: Premium Budget & Expenses Module.

[x] Phase 3: User Settings & Profile Persistence.

[ ] Phase 4: Multi-currency support with live API exchange rates.

[ ] Phase 5: PDF Export for Expense Reports.
