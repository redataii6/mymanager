// assets/js/app.js
// Main application initialization and shared functions

// ============================================
// Global Configuration
// ============================================
const APP_CONFIG = {
  name: 'MyManager',
  version: '1.0.0',
  apiUrl: '../data/db.json',
  itemsPerPage: 10
};

// ============================================
// Data Loading Helper
// ============================================
// Shared function to load database
async function loadDatabase() {
  try {
    const response = await fetch(APP_CONFIG.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to load database');
    }
    return await response.json();
  } catch (error) {
    console.error('Database loading error:', error);
    throw error;
  }
}

// ============================================
// Global Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Show username if logged in
  const usernameEl = document.getElementById('username');
  if (usernameEl && sessionStorage.getItem('username')) {
    usernameEl.textContent = sessionStorage.getItem('username');
  }

  // Add active class to current page link
  highlightCurrentPage();
});

// ============================================
// Navigation Helper
// ============================================
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================
// Confirmation Dialog Helper
// ============================================
function confirmAction(message) {
  return confirm(message);
}

// ============================================
// Status Badge Helper
// ============================================
function getStatusBadgeClass(status) {
  const statusMap = {
    // Table status
    'free': 'bg-success',
    'occupied': 'bg-warning',
    'reserved': 'bg-info',
    'maintenance': 'bg-secondary',
    
    // Order status
    'pending': 'bg-warning',
    'preparing': 'bg-info',
    'ready': 'bg-primary',
    'delivered': 'bg-success',
    'completed': 'bg-success',
    'cancelled': 'bg-danger',
    
    // Reservation status
    'confirmed': 'bg-success',
    'seated': 'bg-info',
    
    // Employee status
    'active': 'bg-success',
    'inactive': 'bg-secondary',
    
    // Availability
    'available': 'bg-success',
    'unavailable': 'bg-danger'
  };
  
  return statusMap[status.toLowerCase()] || 'bg-secondary';
}

// ============================================
// Date Formatting Helpers
// ============================================
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatDateTime(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatTime(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ============================================
// Currency Formatting
// ============================================
function formatCurrency(amount, currency = 'MAD') {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return `${amount.toFixed(2)} ${currency}`;
}

// ============================================
// Phone Formatting
// ============================================
function formatPhone(phone) {
  if (!phone) return 'N/A';
  // Simple formatting for Moroccan numbers
  return phone.replace(/(\+212)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
}

// ============================================
// Search/Filter Helper
// ============================================
function searchInObject(obj, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  return Object.values(obj).some(value => {
    if (value === null || value === undefined) return false;
    return String(value).toLowerCase().includes(searchTerm);
  });
}

// ============================================
// Console Info
// ============================================
console.log(`%c${APP_CONFIG.name} v${APP_CONFIG.version}`, 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cRestaurant Management System', 'color: #666; font-size: 12px;');