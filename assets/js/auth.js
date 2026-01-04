// assets/js/auth.js
// Simple authentication system

// Check if user is logged in
function isLoggedIn() {
  return sessionStorage.getItem('isAuthenticated') === 'true';
}

// Login function
function login(username, password) {
  // Static credentials as required
  if (username === 'admin' && password === 'admin') {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('username', username);
    return true;
  }
  return false;
}

// Logout function
function logout() {
  sessionStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('username');
  window.location.href = 'login.html';
}

// Protect pages (call this at the start of each protected page)
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

// Login form handler (for login.html)
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (login(username, password)) {
      window.location.href = 'dashboard.html';
    } else {
      errorMsg.textContent = 'Invalid username or password. Try admin/admin';
      errorMsg.classList.remove('d-none');
    }
  });
}

// Logout button handler (for dashboard and other pages)
document.addEventListener('DOMContentLoaded', function() {
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', logout);
  }
});