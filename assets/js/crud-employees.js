// assets/js/crud-employees.js
requireAuth();
document.getElementById('username').textContent = sessionStorage.getItem('username');

let allEmployees = [];
let filteredEmployees = [];
let currentPage = 1;
const itemsPerPage = 10;
let sortColumn = 'fullName';
let sortDirection = 'asc';
let deleteId = null;
let employeeModal, deleteModal;

document.addEventListener('DOMContentLoaded', async function() {
  employeeModal = new bootstrap.Modal(document.getElementById('employeeModal'));
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  await loadEmployees();
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('roleFilter').addEventListener('change', applyFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
});

async function loadEmployees() {
  try {
    const data = await loadDatabase();
    allEmployees = data.employees || [];
    applyFilters();
  } catch (error) {
    console.error('Error loading employees:', error);
    document.getElementById('employeesTableBody').innerHTML = 
      '<tr><td colspan="6" class="text-center text-danger">Error loading data</td></tr>';
  }
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const role = document.getElementById('roleFilter').value;
  const status = document.getElementById('statusFilter').value;
  
  filteredEmployees = allEmployees.filter(emp => {
    const matchSearch = emp.fullName.toLowerCase().includes(search) || 
                       emp.id.toLowerCase().includes(search) ||
                       emp.email.toLowerCase().includes(search);
    const matchRole = !role || emp.role === role;
    const matchStatus = !status || emp.active.toString() === status;
    return matchSearch && matchRole && matchStatus;
  });
  
  currentPage = 1;
  renderTable();
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('roleFilter').value = '';
  document.getElementById('statusFilter').value = '';
  applyFilters();
}

function sortTable(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  
  filteredEmployees.sort((a, b) => {
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
  const pageData = filteredEmployees.slice(start, end);
  const tbody = document.getElementById('employeesTableBody');
  
  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No employees found</td></tr>';
    return;
  }
  
  tbody.innerHTML = pageData.map(emp => `
    <tr>
      <td><strong>${emp.fullName}</strong></td>
      <td><span class="badge bg-info">${emp.role.replace('_', ' ')}</span></td>
      <td>${emp.phone}</td>
      <td>${formatCurrency(emp.salary)}</td>
      <td><span class="badge ${emp.active ? 'bg-success' : 'bg-secondary'}">${emp.active ? 'Active' : 'Inactive'}</span></td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="viewDetails('${emp.id}')">👁️ View</button>
        <button class="btn btn-sm btn-warning" onclick="openEditModal('${emp.id}')">✏️ Edit</button>
        <button class="btn btn-sm btn-danger" onclick="openDeleteModal('${emp.id}')">🗑️ Delete</button>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('showingInfo').textContent = `${start + 1}-${Math.min(end, filteredEmployees.length)}`;
  document.getElementById('totalInfo').textContent = filteredEmployees.length;
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
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
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTable();
  }
  return false;
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add New Employee';
  document.getElementById('employeeForm').reset();
  document.getElementById('employeeId').value = '';
  employeeModal.show();
}

function openEditModal(id) {
  const emp = allEmployees.find(e => e.id === id);
  if (!emp) return;
  
  document.getElementById('modalTitle').textContent = 'Edit Employee';
  document.getElementById('employeeId').value = emp.id;
  document.getElementById('employeeName').value = emp.fullName;
  document.getElementById('employeeRole').value = emp.role;
  document.getElementById('employeePhone').value = emp.phone;
  document.getElementById('employeeEmail').value = emp.email;
  document.getElementById('employeeSalary').value = emp.salary;
  document.getElementById('employeeActive').checked = emp.active;
  employeeModal.show();
}

function saveEmployee() {
  const id = document.getElementById('employeeId').value;
  const emp = {
    id: id || 'emp_' + Date.now(),
    fullName: document.getElementById('employeeName').value,
    role: document.getElementById('employeeRole').value,
    phone: document.getElementById('employeePhone').value,
    email: document.getElementById('employeeEmail').value,
    salary: parseFloat(document.getElementById('employeeSalary').value),
    active: document.getElementById('employeeActive').checked,
    hireDate: id ? allEmployees.find(e => e.id === id).hireDate : new Date().toISOString().split('T')[0]
  };
  
  if (id) {
    const index = allEmployees.findIndex(e => e.id === id);
    allEmployees[index] = emp;
  } else {
    allEmployees.push(emp);
  }
  
  employeeModal.hide();
  applyFilters();
  alert('Employee saved successfully!');
}

function openDeleteModal(id) {
  const emp = allEmployees.find(e => e.id === id);
  if (!emp) return;
  deleteId = id;
  document.getElementById('deleteItemName').textContent = emp.fullName;
  deleteModal.show();
}

function confirmDelete() {
  allEmployees = allEmployees.filter(e => e.id !== deleteId);
  deleteModal.hide();
  applyFilters();
  alert('Employee deleted successfully!');
}

function viewDetails(id) {
  window.location.href = `employees-detail.html?id=${id}`;
}

function exportToCSV() {
  const headers = ['ID', 'Name', 'Role', 'Phone', 'Email', 'Salary', 'Status', 'Hire Date'];
  const rows = filteredEmployees.map(emp => [
    emp.id, emp.fullName, emp.role, emp.phone, emp.email, emp.salary, 
    emp.active ? 'Active' : 'Inactive', emp.hireDate
  ]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'employees_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}