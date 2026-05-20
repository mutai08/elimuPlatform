// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjwM3I1afnA1hKeuhC4FndPC00suUiKHQ",
    authDomain: "effective40-64d24.firebaseapp.com",
    databaseURL: "https://effective40-64d24-default-rtdb.firebaseio.com",
    projectId: "effective40-64d24",
    storageBucket: "effective40-64d24.firebasestorage.app",
    messagingSenderId: "99811191192",
    appId: "1:99811191192:web:096d9fb7d2958b875523ed",
    measurementId: "G-JVNFJ8JY53"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Global Instances
window.auth = firebase.auth();
window.db = firebase.database();

// For convenience in scripts that expect 'auth' and 'db' variables
const auth = window.auth;
const db = window.db;

// Auth State Listener & Route Protection
auth.onAuthStateChanged(user => {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const urlParams = new URLSearchParams(window.location.search);

    // If logout param is present, sign out and stop (don't redirect)
    if (urlParams.get('logout') === 'true') {
        if (user) {
            console.log("Forcing logout via query param");
            auth.signOut().then(() => {
                // Remove the param to clean up URL
                window.history.replaceState({}, document.title, window.location.pathname);
                window.location.reload();
            });
        }
        return;
    }

    const protectedPages = [
        "institutions.html",
        "boys.html",
        "girls.html",
        "overall.html",
        "subjects.html",
        "analytics.html"
    ];

    // If user is NOT logged in and tries to access a protected page
    if (!user && protectedPages.includes(page)) {
        console.warn("Unauthorized access. Redirecting to login.");
        window.location.href = "index.html";
    }

    // If user IS logged in and is on the login page (index.html)
    if (user && (page === "index.html" || page === "")) {
        console.log("User logged in. Redirecting to dashboard.");
        window.location.href = "dashboard.html";
    }
});

