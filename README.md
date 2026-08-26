<div align="center">

# 🌍 GlobeTrotter

**A premium, high-fidelity travel management suite for modern travelers.**

GlobeTrotter brings itinerary planning, budget management, expense tracking, and travel analytics together in one unified command center.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Build](https://img.shields.io/badge/build-zero--config-lightgrey)
![Made with](https://img.shields.io/badge/made%20with-JavaScript%20ES6-yellow)

[Features](#-core-features) • [Architecture](#️-architecture) • [Installation](#-installation--local-development) • [Roadmap](#️-roadmap) • [Contributing](#-contributing)

</div>


## 📖 Table of Contents

- [Why GlobeTrotter?](#-why-globetrotter)
- [Core Features](#-core-features)
- [Architecture](#️-architecture)
- [Data Flow](#-data-flow)
- [Key Modules](#-key-modules)
- [Financial Analytics](#-financial-analytics)
- [Design Philosophy](#-design-philosophy)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Local Development](#-installation--local-development)
- [Example Workflow](#-example-workflow)
- [Roadmap](#️-roadmap)
- [Future Vision](#-future-vision)
- [Data & Privacy](#-data--privacy)
- [Development Principles](#-development-principles)
- [Project Highlights](#-project-highlights)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support-the-project)


## ✨ Why GlobeTrotter?

Managing a trip often means switching between multiple apps for itinerary planning, expense tracking, budget management, spending analysis, and travel preferences.

GlobeTrotter unifies these workflows into a single, cohesive experience — so you spend less time juggling tools and more time planning your trip.

| Without GlobeTrotter | With GlobeTrotter |
|---|---|
| 🗂️ Scattered notes and spreadsheets | 🗺️ One itinerary, always in sync |
| 💸 Manual expense math | 💳 Automatic categorization & burn-rate tracking |
| 📉 No visibility into spending trends | 📊 Real-time visual analytics |
| 🔀 Data drift between tools | 🛠️ Single source of truth via `store.js` |


## ⚡ Core Features

### 🗺️ Smart Itinerary Management
- Organize trips and destinations in one place
- Manage active itineraries
- Track trip progress
- Maintain centralized trip metadata

### 💸 Premium Financial Suite
- Dynamic trip budget tracking
- Real-time expense monitoring
- Automatic expense categorization
- Burn-rate analytics
- Budget safety-buffer indicators
- Visual spending breakdowns

### 📊 Visual Analytics
- Interactive Chart.js visualizations
- Dynamic pie and donut charts
- Spending distribution analysis
- Budget utilization tracking
- Real-time analytics synchronized with application state

### 🛠️ Centralized State Architecture
GlobeTrotter follows a single-source-of-truth architecture using a centralized `store.js`. All major views consume synchronized application state, preventing inconsistent data between:


Dashboard → Budget → Settings → Itinerary


### ⚡ Zero-Build Architecture
Built using modern ES6 modules, GlobeTrotter runs without a heavy frontend build pipeline — making it lightweight, easy to understand, easy to deploy, simple to develop locally, and suitable for static hosting.

---

## 🏗️ Architecture

GlobeTrotter separates application state, business logic, and UI rendering to maintain a predictable, one-directional data flow.


                         ┌───────────────────────┐
                         │      User Action      │
                         │   Budget / Settings   │
                         └──────────┬────────────┘
                                    │
                                    │ dispatch(action)
                                    ▼
                         ┌───────────────────────┐
                         │       store.js        │
                         │  Central State Store  │
                         └──────────┬────────────┘
                                    │
                          State Updates / Events
                                    │
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
     ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
     │   Dashboard    │   │   budget.js    │   │   Settings UI  │
     │   View Layer   │   │ Analytics / UI │   │   Preferences  │
     └────────────────┘   └───────┬────────┘   └────────────────┘
                                   │
                                   ▼
                         ┌───────────────────────┐
                         │   Chart.js / DOM      │
                         │   Dynamic Rendering   │
                         └───────────────────────┘


## 🔄 Data Flow

1. **User performs an action** (e.g. adds an expense, edits a budget).
2. **The action is dispatched** to `store.js`.
3. **The centralized store updates** the relevant trip data.
4. **Subscribers receive** the updated state.
5. **UI components re-render** automatically.
6. **Charts and analytics reflect** the latest data.

This approach keeps the application predictable, synchronized, and maintainable — no manual state syncing between views.


## 📦 Key Modules

### 💸 `budget.js` — The Financial Analytics Engine

**Responsibilities:**
- Calculate budget utilization
- Track expenses
- Categorize transactions
- Calculate burn rate
- Generate spending analytics
- Update Chart.js visualizations
- Display budget safety indicators

**Smart Categorization**

Expenses are grouped into standardized travel categories:

| Category | Examples |
|---|---|
| ✈️ Flights | Airfare, airport fees |
| 🏨 Lodging | Hotels, hostels, stays |
| 🚕 Transit | Taxis, metro, buses |
| 🍽️ Dining | Restaurants, cafés, food |

### 🛠️ `store.js` — The Single Source of Truth

The store manages:
- Trip metadata
- Active itinerary
- Budget allocations
- Expense records
- User preferences
- Application state

**Reactive Updates**

Instead of individual components maintaining independent copies of data, everything flows through one predictable pipeline:


User Action → dispatch() → store.js → State Update → Subscribers → UI Re-render


This minimizes synchronization problems and makes application behavior easier to reason about.


## 📊 Financial Analytics

GlobeTrotter provides real-time visibility into travel spending.

### Budget Utilization


Total Budget
     │
     ├── Spent
     │
     └── Remaining


### Burn Rate

The burn-rate system helps travelers identify when spending is increasing too quickly relative to their available trip budget.

**Example:**

| Metric | Value |
|---|---|
| Budget | ₹1,00,000 |
| Spent | ₹72,000 |
| Remaining | ₹28,000 |
| Utilization | 🟧 72% |

The interface surfaces safety indicators before spending exceeds the planned ceiling.


## 🎨 Design Philosophy

GlobeTrotter follows a premium dashboard aesthetic focused on:

- Clear visual hierarchy
- Minimal interface clutter
- High information density
- Responsive interactions
- Data-driven visualizations
- Consistent component behavior

The goal: make complex travel and financial information understandable at a glance.


## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Responsive styling & visual design |
| JavaScript ES6+ | Application logic |
| ES6 Modules | Modular architecture |
| Chart.js | Financial visualization |
| Local Storage | Client-side persistence |
| SVG / DOM | Dynamic UI rendering |


## 📁 Project Structure

GlobeTrotter/
│
├── index.html
│
├── css/
│   ├── styles.css
│   └── components.css
│
├── js/
│   ├── store.js
│   ├── budget.js
│   ├── dashboard.js
│   ├── settings.js
│   └── app.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md


> The exact structure may vary depending on the implementation.

---

## 🚀 Installation & Local Development

### 1. Clone the Repository


git clone <repository-url>
cd GlobeTrotter


### 2. Start a Local Server

Because GlobeTrotter uses ES6 modules, it should be served through a local HTTP server rather than opened directly via `file://`.


python -m http.server 8080


Or use the **Live Server** extension in VS Code.

### 3. Open the Application

Navigate to:


http://localhost:8080

## 💡 Example Workflow

Create Trip
    ↓
Add Destinations
    ↓
Set Travel Budget
    ↓
Record Expenses
    ↓
Automatic Categorization
    ↓
Analyze Spending
    ↓
Monitor Burn Rate
    ↓
Adjust Travel Decisions


## 🗺️ Roadmap

| Status | Phase | Description |
|---|---|---|
| ✅ | Phase 1 | Core Itinerary Engine |
| ✅ | Phase 2 | Premium Budget & Expenses Module |
| ✅ | Phase 3 | User Settings & Profile Persistence |
| 🚧 | Phase 4 | Multi-currency support with live exchange-rate API |
| 📋 | Phase 5 | PDF export for expense reports & receipts |
| 📋 | Phase 6 | Advanced travel analytics & spending predictions |
| 📋 | Phase 7 | Cloud synchronization & multi-device support |
| 📋 | Phase 8 | Collaborative trip planning |


## 🔮 Future Vision

GlobeTrotter is designed to evolve from a travel dashboard into a complete personal travel operating system. Future capabilities could include:

- 🌐 Multi-currency expense management
- 💱 Live exchange-rate conversion
- 🤖 AI-powered travel recommendations
- 📈 Predictive spending analysis
- 🧾 Receipt scanning and OCR
- 📄 Automated PDF expense reports
- ☁️ Cloud synchronization
- 👥 Collaborative trip planning
- 🔔 Budget threshold notifications
- 🗺️ Intelligent destination planning


## 🔐 Data & Privacy

GlobeTrotter is designed with a **local-first approach**, allowing core trip and expense information to remain on the user's device.

As cloud synchronization and external APIs are introduced, the architecture can be extended with authentication, secure APIs, and encrypted data storage.


## 🧪 Development Principles

GlobeTrotter emphasizes:

- Single Source of Truth
- Separation of Concerns
- Modular JavaScript
- Reactive UI Updates
- Reusable Components
- Minimal Dependencies
- Progressive Enhancement
- Maintainable Architecture


## 📈 Project Highlights

| | |
|---|---|
| ⚡ **Lightweight** | No large frontend framework or mandatory build pipeline |
| 🧠 **Architecture-focused** | Centralized state management keeps application data synchronized |
| 📊 **Data-driven** | Chart.js transforms raw expenses into meaningful financial insights |
| 🎯 **User-focused** | The interface prioritizes information travelers need while making decisions |
| 🚀 **Extensible** | Modular architecture makes it easy to add APIs, auth, cloud storage, and AI features later |


## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Implement your changes
4. Test locally
5. Commit your changes (`git commit -m 'Add your feature'`)
6. Open a Pull Request


## 📄 License

This project is currently available for educational and development purposes.

> Add your preferred open-source license here, such as MIT, if you intend to distribute the project under an open-source license.


## ⭐ Support the Project

If you find GlobeTrotter useful or interesting:

⭐ Star the repository · 🍴 Fork the project · 🐛 Report issues · 💡 Suggest improvements · 🤝 Contribute

<div align="center">

### 🌍 GlobeTrotter

*Plan smarter. Spend smarter. Travel better.*
**Your journey, organized in one place.**

</div>
