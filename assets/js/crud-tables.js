// assets/js/crud-tables.js
requireAuth();
document.getElementById('username').textContent = sessionStorage.getItem('username');

let allTables = [];
let filteredTables = [];
let currentPage = 1;
const itemsPerPage = 10;
let sortColumn = 'number';
let sortDirection = 'asc';
let deleteId = null;
let tableModal, deleteModal;

document.addEventListener('DOMContentLoaded', async function() {
  tableModal = new bootstrap.Modal(document.getElementById('tableModal'));
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  await loadTables();
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
  document.getElementById('locationFilter').addEventListener('change', applyFilters);
});

async function loadTables() {
  try {
    const data = await loadDatabase();
    allTables = data.tables || [];
    applyFilters();
  } catch (error) {
    console.error('Error loading tables:', error);
    document.getElementById('tablesTableBody').innerHTML = 
      '<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>';
  }
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const status = document.getElementById('statusFilter').value;
  const location = document.getElementById('locationFilter').value;
  
  filteredTables = allTables.filter(table => {
    const matchSearch = table.number.toString().includes(search) || 
                       table.id.toLowerCase().includes(search) ||
                       table.location.toLowerCase().includes(search);
    const matchStatus = !status || table.status === status;
    const matchLocation = !location || table.location === location;
    return matchSearch && matchStatus && matchLocation;
  });
  
  currentPage = 1;
  renderTable();
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('statusFilter').value = '';
  document.getElementById('locationFilter').value = '';
  applyFilters();
}

function sortTable(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  
  filteredTables.sort((a, b) => {
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

function renderTable() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredTables.slice(start, end);
  const tbody = document.getElementById('tablesTableBody');
  
  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">No tables found</td></tr>';
    return;
  }
  
  tbody.innerHTML = pageData.map(table => `
    <tr>
      <td><strong>Table ${table.number}</strong></td>
      <td><span class="badge bg-secondary">${table.seats} seats</span></td>
      <td>${table.location}</td>
      <td><span class="badge ${getStatusBadgeClass(table.status)}">${table.status}</span></td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="viewDetails('${table.id}')">👁️ View</button>
        <button class="btn btn-sm btn-warning" onclick="openEditModal('${table.id}')">✏️ Edit</button>
        <button class="btn btn-sm btn-danger" onclick="openDeleteModal('${table.id}')">🗑️ Delete</button>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('showingInfo').textContent = `${start + 1}-${Math.min(end, filteredTables.length)}`;
  document.getElementById('totalInfo').textContent = filteredTables.length;
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredTables.length / itemsPerPage);
  const pagination = document.getElementById('paginationControls');
  let html = '';
  
  html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
    <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a></li>`;
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }
  
  html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
    <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a></li>`;
  pagination.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredTables.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTable();
  }
  return false;
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add New Table';
  document.getElementById('tableForm').reset();
  document.getElementById('tableId').value = '';
  tableModal.show();
}

function openEditModal(id) {
  const table = allTables.find(t => t.id === id);
  if (!table) return;
  
  document.getElementById('modalTitle').textContent = 'Edit Table';
  document.getElementById('tableId').value = table.id;
  document.getElementById('tableNumber').value = table.number;
  document.getElementById('tableSeats').value = table.seats;
  document.getElementById('tableLocation').value = table.location;
  document.getElementById('tableStatus').value = table.status;
  tableModal.show();
}

function saveTable() {
  const id = document.getElementById('tableId').value;
  const table = {
    id: id || 'table_' + Date.now(),
    number: parseInt(document.getElementById('tableNumber').value),
    seats: parseInt(document.getElementById('tableSeats').value),
    location: document.getElementById('tableLocation').value,
    status: document.getElementById('tableStatus').value,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  if (id) {
    const index = allTables.findIndex(t => t.id === id);
    allTables[index] = table;
  } else {
    allTables.push(table);
  }
  
  tableModal.hide();
  applyFilters();
  alert('Table saved successfully!');
}

function openDeleteModal(id) {
  const table = allTables.find(t => t.id === id);
  if (!table) return;
  deleteId = id;
  document.getElementById('deleteItemName').textContent = `Table ${table.number}`;
  deleteModal.show();
}

function confirmDelete() {
  allTables = allTables.filter(t => t.id !== deleteId);
  deleteModal.hide();
  applyFilters();
  alert('Table deleted successfully!');
}

function viewDetails(id) {
  window.location.href = `tables-detail.html?id=${id}`;
}

function exportToCSV() {
  const headers = ['ID', 'Number', 'Seats', 'Location', 'Status', 'Created At'];
  const rows = filteredTables.map(table => [
    table.id, table.number, table.seats, table.location, table.status, table.createdAt
  ]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tables_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}