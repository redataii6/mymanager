// assets/js/crud-dishes.js
// Complete CRUD operations for Dishes

requireAuth();
document.getElementById('username').textContent = sessionStorage.getItem('username');

// Global variables
let allDishes = [];
let filteredDishes = [];
let currentPage = 1;
const itemsPerPage = 10;
let sortColumn = 'id';
let sortDirection = 'asc';
let deleteId = null;

// Modals
let dishModal, deleteModal;

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
  // Initialize Bootstrap modals
  dishModal = new bootstrap.Modal(document.getElementById('dishModal'));
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  
  // Load data
  await loadDishes();
  
  // Setup filters
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('categoryFilter').addEventListener('change', applyFilters);
  document.getElementById('availabilityFilter').addEventListener('change', applyFilters);
});

// Load dishes from JSON
async function loadDishes() {
  try {
    const response = await fetch('../data/db.json');
    const data = await response.json();
    allDishes = data.dishes || [];
    
    // Populate category filter
    const categories = [...new Set(allDishes.map(d => d.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
    
    applyFilters();
  } catch (error) {
    console.error('Error loading dishes:', error);
    document.getElementById('dishesTableBody').innerHTML = 
      `<tr><td colspan="6" class="text-center text-danger">${t('error_loading_data')}</td></tr>`;
  }
}

// Apply filters and search
function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const availability = document.getElementById('availabilityFilter').value;
  
  filteredDishes = allDishes.filter(dish => {
    const matchSearch = dish.name.toLowerCase().includes(search) || 
                       dish.id.toLowerCase().includes(search);
    const matchCategory = !category || dish.category === category;
    const matchAvailability = !availability || 
                             dish.isAvailable.toString() === availability;
    
    return matchSearch && matchCategory && matchAvailability;
  });
  
  currentPage = 1;
  renderTable();
}

// Reset all filters
function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = '';
  document.getElementById('availabilityFilter').value = '';
  applyFilters();
}

// Sort table
function sortTable(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  
  filteredDishes.sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
  
  renderTable();
}

// Render table with pagination
function renderTable() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredDishes.slice(start, end);
  
  const tbody = document.getElementById('dishesTableBody');
  
  if (pageData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">${t('no_dishes_found')}</td></tr>`;
    return;
  }
  
  tbody.innerHTML = pageData.map(dish => `
    <tr>
      <td>${dish.id}</td>
      <td>${dish.name}</td>
      <td><span class="badge bg-info">${dish.category}</span></td>
      <td>${dish.price} MAD</td>
      <td>
        <span class="badge ${dish.isAvailable ? 'bg-success' : 'bg-danger'}">
          ${dish.isAvailable ? t('available') : t('unavailable')}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="viewDetails('${dish.id}')">
          👁️ ${t('view')}
        </button>
        <button class="btn btn-sm btn-warning" onclick="openEditModal('${dish.id}')">
          ✏️ ${t('edit')}
        </button>
        <button class="btn btn-sm btn-danger" onclick="openDeleteModal('${dish.id}')">
          🗑️ ${t('delete')}
        </button>
      </td>
    </tr>
  `).join('');
  
  // Update pagination info
  document.getElementById('showingInfo').textContent = 
    `${start + 1}-${Math.min(end, filteredDishes.length)}`;
  document.getElementById('totalInfo').textContent = filteredDishes.length;
  
  // Render pagination controls
  renderPagination();
}

// Render pagination
function renderPagination() {
  const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);
  const pagination = document.getElementById('paginationControls');
  
  let html = '';
  
  // Previous button
  html += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">${t('previous')}</a>
    </li>
  `;
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>
      `;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }
  
  // Next button
  html += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">${t('next')}</a>
    </li>
  `;
  
  pagination.innerHTML = html;
}

// Change page
function changePage(page) {
  const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTable();
  }
  return false;
}

// Open create modal
function openCreateModal() {
  document.getElementById('modalTitle').textContent = t('add_dish');
  document.getElementById('dishForm').reset();
  document.getElementById('dishId').value = '';
  dishModal.show();
}

// Open edit modal
function openEditModal(id) {
  const dish = allDishes.find(d => d.id === id);
  if (!dish) return;
  
  document.getElementById('modalTitle').textContent = t('edit_dish');
  document.getElementById('dishId').value = dish.id;
  document.getElementById('dishName').value = dish.name;
  document.getElementById('dishCategory').value = dish.category;
  document.getElementById('dishPrice').value = dish.price;
  document.getElementById('dishAvailable').checked = dish.isAvailable;
  
  dishModal.show();
}

// Save dish (create or update)
function saveDish() {
  const id = document.getElementById('dishId').value;
  const dish = {
    id: id || 'dish_' + Date.now(),
    name: document.getElementById('dishName').value,
    category: document.getElementById('dishCategory').value,
    price: parseFloat(document.getElementById('dishPrice').value),
    isAvailable: document.getElementById('dishAvailable').checked,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  if (id) {
    // Update existing
    const index = allDishes.findIndex(d => d.id === id);
    allDishes[index] = dish;
  } else {
    // Create new
    allDishes.push(dish);
  }
  
  dishModal.hide();
  applyFilters();
  
  // Show success message
  alert(t('success_save'));
}

// Open delete modal
function openDeleteModal(id) {
  const dish = allDishes.find(d => d.id === id);
  if (!dish) return;
  
  deleteId = id;
  document.getElementById('deleteItemName').textContent = dish.name;
  deleteModal.show();
}

// Confirm delete
function confirmDelete() {
  allDishes = allDishes.filter(d => d.id !== deleteId);
  deleteModal.hide();
  applyFilters();
  alert(t('success_delete'));
}

// View details
function viewDetails(id) {
  window.location.href = `dishes-detail.html?id=${id}`;
}

// Export to CSV
function exportToCSV() {
  const headers = [t('id'), t('name'), t('category'), t('price'), t('available'), t('date')];
  const rows = filteredDishes.map(dish => [
    dish.id,
    dish.name,
    dish.category,
    dish.price,
    dish.isAvailable ? t('yes') : t('no'),
    dish.createdAt
  ]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  // Download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dishes_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}
