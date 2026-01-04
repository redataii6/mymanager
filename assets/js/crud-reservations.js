// assets/js/crud-reservations.js
requireAuth();
document.getElementById('username').textContent = sessionStorage.getItem('username');

let allReservations = [];
let allTables = [];
let filteredReservations = [];
let currentPage = 1;
const itemsPerPage = 10;
let sortColumn = 'dateTime';
let sortDirection = 'desc';
let deleteId = null;
let reservationModal, deleteModal;

document.addEventListener('DOMContentLoaded', async function() {
  reservationModal = new bootstrap.Modal(document.getElementById('reservationModal'));
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  await loadReservations();
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
  document.getElementById('dateFilter').addEventListener('change', applyFilters);
});

async function loadReservations() {
  try {
    const data = await loadDatabase();
    allReservations = data.reservations || [];
    allTables = data.tables || [];
    
    // Populate table dropdown
    const tableSelect = document.getElementById('tableId');
    tableSelect.innerHTML = '<option value="">Select table</option>' +
      allTables.map(table => `<option value="${table.id}">Table ${table.number} (${table.seats} seats)</option>`).join('');
    
    applyFilters();
  } catch (error) {
    console.error('Error loading reservations:', error);
    document.getElementById('reservationsTableBody').innerHTML = 
      '<tr><td colspan="6" class="text-center text-danger">Error loading data</td></tr>';
  }
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const status = document.getElementById('statusFilter').value;
  const date = document.getElementById('dateFilter').value;
  
  filteredReservations = allReservations.filter(res => {
    const matchSearch = res.customerName.toLowerCase().includes(search) || 
                       res.id.toLowerCase().includes(search) ||
                       res.customerPhone.includes(search);
    const matchStatus = !status || res.status === status;
    const matchDate = !date || res.dateTime.startsWith(date);
    return matchSearch && matchStatus && matchDate;
  });
  
  currentPage = 1;
  renderTable();
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('statusFilter').value = '';
  document.getElementById('dateFilter').value = '';
  applyFilters();
}

function sortTable(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  
  filteredReservations.sort((a, b) => {
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
  const pageData = filteredReservations.slice(start, end);
  const tbody = document.getElementById('reservationsTableBody');
  
  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No reservations found</td></tr>';
    return;
  }
  
  tbody.innerHTML = pageData.map(res => {
    const table = allTables.find(t => t.id === res.tableId);
    const tableInfo = table ? `Table ${table.number}` : res.tableId;
    
    return `
      <tr>
        <td><strong>${res.customerName}</strong><br><small>${res.customerPhone}</small></td>
        <td>${formatDateTime(res.dateTime)}</td>
        <td><span class="badge bg-secondary">${res.guests} guests</span></td>
        <td>${tableInfo}</td>
        <td><span class="badge ${getStatusBadgeClass(res.status)}">${res.status}</span></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewDetails('${res.id}')">👁️ View</button>
          <button class="btn btn-sm btn-warning" onclick="openEditModal('${res.id}')">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="openDeleteModal('${res.id}')">🗑️ Delete</button>
        </td>
      </tr>
    `;
  }).join('');
  
  document.getElementById('showingInfo').textContent = `${start + 1}-${Math.min(end, filteredReservations.length)}`;
  document.getElementById('totalInfo').textContent = filteredReservations.length;
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
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
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTable();
  }
  return false;
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add New Reservation';
  document.getElementById('reservationForm').reset();
  document.getElementById('reservationId').value = '';
  reservationModal.show();
}

function openEditModal(id) {
  const res = allReservations.find(r => r.id === id);
  if (!res) return;
  
  document.getElementById('modalTitle').textContent = 'Edit Reservation';
  document.getElementById('reservationId').value = res.id;
  document.getElementById('customerName').value = res.customerName;
  document.getElementById('customerPhone').value = res.customerPhone;
  document.getElementById('customerEmail').value = res.customerEmail || '';
  document.getElementById('tableId').value = res.tableId;
  document.getElementById('dateTime').value = res.dateTime.slice(0, 16);
  document.getElementById('guests').value = res.guests;
  document.getElementById('status').value = res.status;
  document.getElementById('notes').value = res.notes || '';
  reservationModal.show();
}

function saveReservation() {
  const id = document.getElementById('reservationId').value;
  const res = {
    id: id || 'res_' + Date.now(),
    customerName: document.getElementById('customerName').value,
    customerPhone: document.getElementById('customerPhone').value,
    customerEmail: document.getElementById('customerEmail').value,
    tableId: document.getElementById('tableId').value,
    dateTime: document.getElementById('dateTime').value + ':00',
    guests: parseInt(document.getElementById('guests').value),
    status: document.getElementById('status').value,
    notes: document.getElementById('notes').value,
    createdAt: id ? allReservations.find(r => r.id === id).createdAt : new Date().toISOString()
  };
  
  if (id) {
    const index = allReservations.findIndex(r => r.id === id);
    allReservations[index] = res;
  } else {
    allReservations.push(res);
  }
  
  reservationModal.hide();
  applyFilters();
  alert('Reservation saved successfully!');
}

function openDeleteModal(id) {
  const res = allReservations.find(r => r.id === id);
  if (!res) return;
  deleteId = id;
  document.getElementById('deleteItemName').textContent = `${res.customerName} - ${formatDateTime(res.dateTime)}`;
  deleteModal.show();
}

function confirmDelete() {
  allReservations = allReservations.filter(r => r.id !== deleteId);
  deleteModal.hide();
  applyFilters();
  alert('Reservation deleted successfully!');
}

function viewDetails(id) {
  window.location.href = `reservations-detail.html?id=${id}`;
}

function exportToCSV() {
  const headers = ['ID', 'Customer', 'Phone', 'Email', 'Table', 'Date & Time', 'Guests', 'Status', 'Notes'];
  const rows = filteredReservations.map(res => [
    res.id, res.customerName, res.customerPhone, res.customerEmail || '', 
    res.tableId, res.dateTime, res.guests, res.status, res.notes || ''
  ]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'reservations_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}