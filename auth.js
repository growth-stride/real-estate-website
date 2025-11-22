// Authentication utility functions

// Check if user is authenticated
async function checkAuthStatus() {
    try {
        const response = await fetch('/auth/status', {
            credentials: 'include'
        });
        const data = await response.json();
        return data.isAuthenticated ? data.user : null;
    } catch (error) {
        console.error('Error checking auth:', error);
        return null;
    }
}

// Initialize user button in navbar
async function initializeUserButton() {
    const user = await checkAuthStatus();
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    // Remove existing user button if any
    const existingUserBtn = document.getElementById('user-button-container');
    if (existingUserBtn) {
        existingUserBtn.remove();
    }
    
    // Create user button container
    const userButtonContainer = document.createElement('li');
    userButtonContainer.id = 'user-button-container';
    userButtonContainer.style.marginLeft = 'auto';
    
    if (user) {
        // User is logged in - show profile button
        userButtonContainer.innerHTML = `
            <button class="user-profile-btn" onclick="toggleUserSidebar()">
                <img src="${user.profilePicture || 'https://via.placeholder.com/40'}" 
                     alt="${user.name}" 
                     class="user-avatar">
                <span class="user-name-nav">${user.name.split(' ')[0]}</span>
            </button>
        `;
    } else {
        // User is not logged in - show login button
        userButtonContainer.innerHTML = `
            <a href="/auth/google" class="login-btn" title="Login with Google">
                <span class="login-icon">👤</span>
            </a>
        `;
    }
    
    navLinks.appendChild(userButtonContainer);
    
    // Create sidebar if user is logged in
    if (user) {
        createUserSidebar(user);
    }
}

// Create user sidebar
function createUserSidebar(user) {
    // Remove existing sidebar if any
    const existingSidebar = document.getElementById('user-sidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }
    
    const sidebar = document.createElement('div');
    sidebar.id = 'user-sidebar';
    sidebar.className = 'user-sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-overlay" onclick="toggleUserSidebar()"></div>
        <div class="sidebar-content">
            <div class="sidebar-header">
                <button class="sidebar-close" onclick="toggleUserSidebar()">✕</button>
            </div>
            
            <div class="sidebar-user-info">
                <img src="${user.profilePicture || 'https://via.placeholder.com/80'}" 
                     alt="${user.name}" 
                     class="sidebar-avatar">
                <h3 class="sidebar-user-name">${user.name}</h3>
                <p class="sidebar-user-email">${user.email}</p>
            </div>
            
            <nav class="sidebar-nav">
                <a href="#" class="sidebar-nav-item">
                    <span class="nav-icon">🏠</span>
                    <span>My Properties</span>
                </a>
                <a href="#" class="sidebar-nav-item">
                    <span class="nav-icon">❤️</span>
                    <span>Favorites</span>
                </a>
                <a href="#" class="sidebar-nav-item">
                    <span class="nav-icon">🔔</span>
                    <span>Notifications</span>
                </a>
                <a href="sell.html" class="sidebar-nav-item">
                    <span class="nav-icon">➕</span>
                    <span>List Property</span>
                </a>
                <a href="#" class="sidebar-nav-item">
                    <span class="nav-icon">⚙️</span>
                    <span>Settings</span>
                </a>
            </nav>
            
            <div class="sidebar-footer">
                <button class="logout-btn" onclick="logout()">
                    <span class="logout-icon">🚪</span>
                    Logout
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(sidebar);
}

// Toggle sidebar
function toggleUserSidebar() {
    const sidebar = document.getElementById('user-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Logout function
async function logout() {
    try {
        const response = await fetch('/auth/logout', {
            credentials: 'include'
        });
        
        if (response.ok) {
            // Redirect to home page
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Failed to logout. Please try again.');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeUserButton();
});
