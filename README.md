# Elimu Platform (Effective-40)

Elimu Platform is a modern, responsive web-based education management system designed to streamline data entry and analytics for schools. It allows administrators to track performance metrics, manage institution data, and visualize academic results dynamically.

The project is built as a **Progressive Web App (PWA)**, allowing users to install it on their devices for a native-like experience.

## 🚀 Features

-   **User Authentication**: Secure Login and Registration system using Firebase Auth.
-   **Dashboard**: A centralized hub showing key metrics like Total Schools, Average Mean Score, and Candidate counts.
-   **Data Entry**:
    -   **Institutions**: Manage school details.
    -   **Overall Performance**: Track performance metrics.
    -   **Gender Analysis**: Separate data entry for Boys and Girls.
    -   **Subject Analysis**: Detailed breakdowns by subject.
-   **Analytics**: Visual reports and charts (tables) to analyze trends and performance.
-   **Interactive Chatbot**: A built-in assistant widget for quick help and navigation.
-   **PWA Support**: Installable on Android/iOS/Desktop with offline caching capabilities via Service Workers.
-   **Responsive Design**: Fully responsive UI tailored for Desktops, Tablets, and Mobile devices.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3 (Custom Design), JavaScript (ES6+)
-   **Backend / Cloud**: Firebase (Authentication, Realtime Database)
-   **Icons**: Boxicons, Google Material Symbols
-   **Deployment**: Static Hosting (compatible with Firebase Hosting, Vercel, Netlify, etc.)

## 📂 Project Structure

```
elimuPlatform/
├── index.html          # Landing page (Login/Register)
├── dashboard.html      # Main dashboard with quick stats
├── institutions.html   # Data entry for school details
├── overall.html        # Overall performance data entry
├── boys.html           # Boys' performance data entry
├── girls.html          # Girls' performance data entry
├── subjects.html       # Subject-wise data entry
├── analytics.html      # Reports and data visualization
├── auth.js             # Firebase configuration and authentication logic
├── layout.js           # dynamic Sidebar, Topbar, and Chatbot injection
├── style.css           # Global styles and responsive design
├── sw.js               # Service Worker for PWA functionality
├── manifest.json       # PWA Manifest configuration
└── images/             # Assets and app icons
```

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/elimu-platform.git
    cd elimu-platform
    ```

2.  **Configure Firebase:**
    -   Create a project in the [Firebase Console](https://console.firebase.google.com/).
    -   Enable **Authentication** (Email/Password).
    -   Create a **Realtime Database**.
    -   Update `auth.js` (or the script tags in HTML files if directly embedded) with your own Firebase config object:
        ```javascript
        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
          databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_PROJECT_ID.appspot.com",
          messagingSenderId: "YOUR_SENDER_ID",
          appId: "YOUR_APP_ID"
        };
        ```

3.  **Run Locally:**
    You can use any static file server. For example, using `http-server`:
    ```bash
    npx http-server .
    ```
    Open your browser and navigate to `http://127.0.0.1:8080`.

## 📱 Installing as an App (PWA)

1.  Open the application in a supported browser (Chrome, Edge, Safari).
2.  **Desktop**: Look for the "Install" icon in the address bar.
3.  **Mobile (Android)**: Tap the menu (three dots) > "Add to Home screen" or "Install App".
4.  **Mobile (iOS)**: Tap the "Share" button > "Add to Home Screen".

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
