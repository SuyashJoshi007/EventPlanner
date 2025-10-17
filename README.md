# Event Planner App

A **modern and responsive web application** built with **Vite** and **React** to seamlessly plan, manage, and track your events.

---

## 🧐 About The Project

The **Event Planner App** is a high-performance **single-page application (SPA)** designed to simplify the process of **organizing events**.  
From creating events and managing guest lists to tracking RSVPs in real-time, this app provides a **centralized, intuitive, and efficient platform**.

Built using a **modern tech stack**, it delivers a **fast**, **responsive**, and **user-friendly** experience across all devices.

---

## ✨ Key Features

- **🗓️ Create & Manage Events:**  
  Easily set up new events with essential details such as date, time, location, and description.

- **👥 Guest List Management:**  
  Add guests, send invitations, and manage attendance statuses effortlessly.

- **⚡ Real-time RSVP Tracking:**  
  Instantly view guest responses and track engagement.

- **📊 Interactive Dashboard:**  
  Gain insights into upcoming and past events with a clean and interactive dashboard.

- **📱 Responsive Design:**  
  Fully functional and optimized for both **desktop** and **mobile** experiences.

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Build Tool** | [Vite](https://vitejs.dev/) – A next-generation frontend tool offering blazing-fast development and hot module replacement (HMR). |
| **Framework** | [React.js](https://react.dev/) – A declarative and efficient JavaScript library for building dynamic user interfaces. |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) – Beautiful, accessible, and customizable UI components built with Tailwind CSS and Radix UI. |
| **Linting** | [ESLint](https://eslint.org/) – Ensures consistent code style and catches potential issues early. |
| **Deployment** | [Vercel](https://vercel.com/) – A cloud platform for seamless deployment and hosting of modern frontend projects. |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### 📋 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version **18** or later)
- npm (comes with Node.js)

---

### 🧩 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/event-planner-app.git

    Navigate to the project directory

cd event-planner-app

Install dependencies

    npm install

📜 Available Scripts

In the project directory, you can run:
Command	Description
npm run dev	Runs the app in development mode.
Open http://localhost:5173
to view it in your browser.
npm run build	Builds the app for production and outputs to the dist folder.
npm run lint	Runs ESLint to check for code style and quality issues.
npm run preview	Serves the production build locally to test before deployment.
☁️ Deployment

This project is configured for easy deployment using Vercel.

To deploy:

    Push your project to a Git repository (GitHub, GitLab, or Bitbucket).

    Go to Vercel

    and import the project.

    Vercel will automatically detect the Vite configuration and handle deployment.

    Once deployed, you’ll get a live URL where your app is accessible.
```
## 📂 Folder Structure

event-planner-app/
├── public/ # Static assets (favicon, images, etc.)
├── src/
│ ├── components/ # Reusable UI components (e.g., Navbar, Button, Modal)
│ ├── pages/ # Page-level components (Home, Dashboard, EventDetails)
│ ├── context/ # Global state management using React Context API
│ ├── hooks/ # Custom React hooks for modular logic
│ ├── utils/ # Utility functions and helper modules
│ ├── App.jsx # Root component defining routes and layout
│ ├── main.jsx # Application entry point (ReactDOM rendering)
│ └── index.css # Global styles and Tailwind imports
├── .eslintrc.cjs # ESLint configuration for code quality
├── package.json # Project metadata and dependencies
├── vite.config.js # Vite build and development configuration
└── README.md # Project documentation
```


🧩 Future Enhancements

    📅 Calendar integration for better event visualization

    🔔 Email & SMS notifications for event reminders

    💬 Chat feature for guest communication

    📈 Analytics dashboard for engagement tracking

    ☁️ Integration with Google Calendar and Outlook

🧑‍💻 Contributing

Contributions are welcome!
If you'd like to contribute:

    Fork the repository

    Create a new feature branch

git checkout -b feature/YourFeature

Commit your changes

git commit -m "Add your message here"

Push to your branch

    git push origin feature/YourFeature

    Open a Pull Request

📄 License

Distributed under the MIT License.
See LICENSE.txt
for more information.
