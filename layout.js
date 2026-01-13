// LAYOUT.JS - Shared Sidebar & Topbar Injection

(function () {
    // 1. Check if user is logged in (Simple check, auth.js handles real auth)
    // We assume auth.js is running and will redirect if needed.

    // 2. Inject Stylesheet if not present (optional, but ensures consistent styles)
    // document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="style.css">');

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

})();
