// LAYOUT.JS - Shared Sidebar & Topbar Injection

(function () {
    // 1. Check if user is logged in (Simple check, auth.js handles real auth)
    // We assume auth.js is running and will redirect if needed.

    // 2. Inject Stylesheet if not present (optional, but ensures consistent styles)
    // document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="style.css">');

    // Inject PWA Manifest and Theme Color
    if (!document.querySelector('link[rel="manifest"]')) {
        document.head.insertAdjacentHTML('beforeend', '<link rel="manifest" href="manifest.json">');
        document.head.insertAdjacentHTML('beforeend', '<meta name="theme-color" content="#ff9800">');
    }

    // 3. Define the Sidebar HTML
    const sidebarHTML = `
    <nav class="sidebar">
        <div class="brand">
            <i class='bx bxs-graduation'></i>
            <span>MoE.</span>
        </div>
        <ul class="side-menu">
            <li><a href="dashboard.html" id="link-dashboard"><i class='bx bxs-dashboard'></i><span>Dashboard</span></a></li>
            <li><a href="institutions.html" id="link-institutions"><i class='bx bxs-school'></i><span>Institutions</span></a></li>
            <li><a href="overall.html" id="link-overall"><i class='bx bxs-bar-chart-alt-2'></i><span>Overall</span></a></li>
            <li><a href="boys.html" id="link-boys"><i class='bx bx-male-sign'></i><span>Boys</span></a></li>
            <li><a href="girls.html" id="link-girls"><i class='bx bx-female-sign'></i><span>Girls</span></a></li>
            <li><a href="subjects.html" id="link-subjects"><i class='bx bxs-book'></i><span>Subjects</span></a></li>
            <li><a href="analytics.html" id="link-analytics"><i class='bx bxs-pie-chart-alt-2'></i><span>Analytics</span></a></li>
        </ul>
        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="user-avatar"><i class='bx bxs-user'></i></div>
                <span id="userNameDisplay">Admin</span>
            </div>
            <button class="btn-sidebar-logout" id="sidebarLogout"><i class='bx bx-log-out'></i><span>Logout</span></button>
        </div>
    </nav>
    `;

    // 4. Wrap existing body content in .main-content if not already
    // We assume the page has specific content. We want to prepend the sidebar to BODY
    // and wrap the rest. OR, we can just prepend Sidebar and let CSS `margin-left` handle the rest.
    // CSS `body.dashboard-body` is display:flex. 

    // Apply dashboard-body class
    document.body.classList.add('dashboard-body');

    // Rename wrappers to avoid conflicts if needed, but we'll try to just prepend sidebar
    // However, for correct spacing, we typically want the content inside a div
    // We will assume the pages will be refactored to have a <div class="main-content">
    // If not, we can try to wrap everything currently in body (except scripts)

    // STRATEGY: The pages currently have `nav` (top) and `div.page-wrap`. 
    // We will REMOVE the old nav and inject sidebar.

    const oldNav = document.querySelector('nav:not(.sidebar)');
    if (oldNav) oldNav.remove();

    // Inject Sidebar
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // 5. Highlight Active Link
    const path = window.location.pathname.split('/').pop() || 'dashboard.html';
    const activeLink = document.querySelector(`.side-menu a[href="${path}"]`);
    if (activeLink) activeLink.classList.add('active');

    // 6. Handle Logout
    const logoutBtn = document.getElementById('sidebarLogout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (window.auth) {
                window.auth.signOut().then(() => window.location.href = 'index.html');
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // 7. Update User Name (if available in local storage or auth)
    const userEmail = localStorage.getItem('userEmail'); // Assuming we store this on login
    if (userEmail) {
        document.getElementById('userNameDisplay').textContent = userEmail.split('@')[0];
    }

    // 8. Inject Top Header (Breadcrumbs)
    // We need to look for .main-content to prepend this.
    // If the page doesn't have .main-content yet, we might need to rely on the manual refactor of the page HTML.
    // But we can try to find `.page-wrap` and insert it there.
    const contentArea = document.querySelector('.main-content') || document.querySelector('.page-wrap');
    if (contentArea) {
        const instName = localStorage.getItem('institution') || 'Select Institution';
        const pageName = activeLink ? activeLink.querySelector('span').textContent : 'Page';

        const headerHTML = `
        <div class="top-header">
            <div class="breadcrumbs">App <span>/</span> ${pageName}</div>
            <div class="current-school-badge">${instName}</div>
        </div>
        `;
        contentArea.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // 9. Inject Chatbot Widget
    const chatbotHTML = `
    <button class="chatbot-toggler">
        <span class="material-symbols-rounded">mode_comment</span>
        <span class="material-symbols-outlined" style="display: none;">close</span>
    </button>
    <div class="chatbot">
        <header>
            <h2>Assistant</h2>
            <span class="close-btn material-symbols-outlined">close</span>
        </header>
        <ul class="chatbox">
            <li class="chat incoming">
                <span class="material-symbols-outlined">smart_toy</span>
                <p>Hi there 👋<br>How can I help you today?</p>
            </li>
        </ul>
        <div class="chat-input">
            <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
            <span id="send-btn" class="material-symbols-rounded">send</span>
        </div>
    </div>
    <!-- Google Symbols for Icons if not present (using Boxicons mostly but chatbot design uses Symbols or we can map to Boxicons) -->
    <!-- Let's use Boxicons since project uses them, to avoid extra loads. I'll replace classes in JS injection below or just handle it now -->
    `;

    // REPLACING ICONS WITH BOXICONS for consistency
    const chatbotHTMLFixed = `
    <button class="chatbot-toggler">
        <i class='bx bxs-message-rounded-dots'></i>
        <i class='bx bx-x' style="display: none;"></i>
    </button>
    <div class="chatbot">
        <header>
            <h2>Assistant</h2>
            <span class="close-btn"><i class='bx bx-x'></i></span>
        </header>
        <ul class="chatbox">
            <li class="chat incoming">
                <span><i class='bx bxs-bot'></i></span>
                <p>Hi there 👋<br>How can I help you today?</p>
            </li>
        </ul>
        <div class="chat-input">
            <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
            <span id="send-btn"><i class='bx bxs-send'></i></span>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTMLFixed);

    // 10. Chatbot Logic
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; // Variable to store user's message
    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        // Create a chat <li> element with passed message and className
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span><i class='bx bxs-bot'></i></span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi; // return chat <li> element
    }

    const generateResponse = (chatElement) => {
        const messageElement = chatElement.querySelector("p");
        const lowerMsg = userMessage.toLowerCase();
        let response = "I'm just a demo assistant. I can't process complex requests yet.";

        // Simple Simulated Response Logic
        if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
            response = "Hello! I'm here to help you manage your school data.";
        } else if (lowerMsg.includes("save") || lowerMsg.includes("data")) {
            // Check if they are trying to save specific data via chat?
            // For now, give a generic helpful message but also acknowledge we saved their "input"
            response = "I've saved your message to the database. For official records, please use the forms.";
        } else if (lowerMsg.includes("dashboard")) {
            response = "You can navigate to the Dashboard using the sidebar menu.";
        } else if (lowerMsg.includes("error") || lowerMsg.includes("bug")) {
            response = "I'm sorry to hear that. Please contact support or refresh the page.";
        } else {
            response = "I have received your input and saved it to our records.";
        }

        // Simulate typing delay
        setTimeout(() => {
            messageElement.textContent = response;
            chatbox.scrollTo(0, chatbox.scrollHeight);

            // Save BOT response to Firebase
            if (window.db && window.auth && window.auth.currentUser) {
                const userId = window.auth.currentUser.uid;
                window.db.ref('chatLogs/' + userId).push({
                    sender: 'bot',
                    message: response,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });
            }
        }, 600);
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return;

        // Clear the input textarea and set its height to default
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Save USER message to Firebase
        if (window.db && window.auth) {
            const user = window.auth.currentUser;
            if (user) {
                const userId = user.uid;
                window.db.ref('chatLogs/' + userId).push({
                    sender: 'user',
                    message: userMessage,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });
            } else {
                console.warn("User not authenticated; chat not saved.");
            }
        }

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

})();
