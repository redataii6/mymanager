// assets/js/crud-orders.js
requireAuth();
document.getElementById('username').textContent = sessionStorage.getItem('username');

let allOrders = [];
let allTables = [];
let allEmployees = [];
let allDishes = [];
let filteredOrders = [];
let currentPage = 1;
const itemsPerPage = 10;
let sortColumn = 'createdAt';
let sortDirection = 'desc';
let deleteId = null;
let orderModal, deleteModal;
let orderItemsCount = 0;

document.addEventListener('DOMContentLoaded', async function() {
  orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  await loadOrders();
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
  document.getElementById('tableFilter').addEventListener('change', applyFilters);
});

async function loadOrders() {
  try {
    const data = await loadDatabase();
    allOrders = data.orders || [];
    allTables = data.tables || [];
    allEmployees = data.employees || [];
    allDishes = data.dishes || [];
    
    // Populate filters
    const tableFilter = document.getElementById('tableFilter');
    tableFilter.innerHTML = '<option value="">All Tables</option>' +
      allTables.map(table => `<option value="${table.id}">Table ${table.number}</option>`).join('');
    
    applyFilters();
  } catch (error) {
    console.error('Error loading orders:', error);
    document.getElementById('ordersTableBody').innerHTML = 
      '<tr><td colspan="7" class="text-center text-danger">Error loading data</td></tr>';
  }
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const status = document.getElementById('statusFilter').value;
  const table = document.getElementById('tableFilter').value;
  
  filteredOrders = allOrders.filter(order => {
    const matchSearch = order.id.toLowerCase().includes(search) || 
                       order.tableId.toLowerCase().includes(search);
    const matchStatus = !status || order.status === status;
    const matchTable = !table || order.tableId === table;
    return matchSearch && matchStatus && matchTable;
  });
  
  currentPage = 1;
  renderTable();
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('statusFilter').value = '';
  document.getElementById('tableFilter').value = '';
  applyFilters();
}

function sortTable(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  
  filteredOrders.sort((a, b) => {
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
  const pageData = filteredOrders.slice(start, end);
  const tbody = document.getElementById('ordersTableBody');
  
  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No orders found</td></tr>';
    return;
  }
  
  tbody.innerHTML = pageData.map(order => {
    const table = allTables.find(t => t.id === order.tableId);
    const employee = allEmployees.find(e => e.id === order.employeeId);
    
    return `
      <tr>
        <td><strong>${order.id}</strong></td>
        <td>${table ? `Table ${table.number}` : order.tableId}</td>
        <td>${employee ? employee.fullName : order.employeeId}</td>
        <td><strong>${formatCurrency(order.total)}</strong></td>
        <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
        <td>${formatDateTime(order.createdAt)}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewDetails('${order.id}')">👁️ View</button>
          <button class="btn btn-sm btn-warning" onclick="openEditModal('${order.id}')">✏️ Edit</button>
          <button class="btn btn-sm btn-danger" onclick="openDeleteModal('${order.id}')">🗑️ Delete</button>
        </td>
      </tr>
    `;
  }).join('');
  
  document.getElementById('showingInfo').textContent = `${start + 1}-${Math.min(end, filteredOrders.length)}`;
  document.getElementById('totalInfo').textContent = filteredOrders.length;
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
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
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTable();
  }
  return false;
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add New Order';
  document.getElementById('orderForm').reset();
  document.getElementById('orderId').value = '';
  
  // Populate dropdowns
  document.getElementById('tableId').innerHTML = '<option value="">Select table</option>' +
    allTables.map(t => `<option value="${t.id}">Table ${t.number}</option>`).join('');
  document.getElementById('employeeId').innerHTML = '<option value="">Select employee</option>' +
    allEmployees.filter(e => e.active).map(e => `<option value="${e.id}">${e.fullName}</option>`).join('');
  
  // Reset order items
  document.getElementById('orderItems').innerHTML = '';
  orderItemsCount = 0;
  addOrderItem();
  
  orderModal.show();
}

function addOrderItem() {
  const container = document.getElementById('orderItems');
  const itemId = `item_${orderItemsCount++}`;
  
  const itemHtml = `
    <div class="row mb-2" id="${itemId}">
      <div class="col-md-6">
        <select class="form-select item-dish" onchange="updateOrderTotal()">
          <option value="">Select dish</option>
          ${allDishes.filter(d => d.isAvailable).map(dish => 
            `<option value="${dish.id}" data-price="${dish.price}">${dish.name} (${formatCurrency(dish.price)})</option>`
          ).join('')}
        </select>
      </div>
      <div class="col-md-3">
        <input type="number" class="form-control item-qty" placeholder="Qty" min="1" value="1" onchange="updateOrderTotal()">
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control item-price" placeholder="Price" readonly>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-sm btn-danger" onclick="removeOrderItem('${itemId}')">×</button>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', itemHtml);
}

function removeOrderItem(itemId) {
  document.getElementById(itemId).remove();
  updateOrderTotal();
}

function updateOrderTotal() {
  const items = document.getElementById('orderItems').children;
  let total = 0;
  
  for (let item of items) {
    const dishSelect = item.querySelector('.item-dish');
    const qtyInput = item.querySelector('.item-qty');
    const priceInput = item.querySelector('.item-price');
    
    if (dishSelect.value) {
      const price = parseFloat(dishSelect.selectedOptions[0].getAttribute('data-price'));
      const qty = parseInt(qtyInput.value) || 1;
      priceInput.value = price.toFixed(2);
      total += price * qty;
    }
  }
  
  document.getElementById('orderTotal').textContent = formatCurrency(total);
}

function openEditModal(id) {
  const order = allOrders.find(o => o.id === id);
  if (!order) return;
  
  document.getElementById('modalTitle').textContent = 'Edit Order';
  document.getElementById('orderId').value = order.id;
  document.getElementById('tableId').innerHTML = '<option value="">Select table</option>' +
    allTables.map(t => `<option value="${t.id}" ${t.id === order.tableId ? 'selected' : ''}>Table ${t.number}</option>`).join('');
  document.getElementById('employeeId').innerHTML = '<option value="">Select employee</option>' +
    allEmployees.map(e => `<option value="${e.id}" ${e.id === order.employeeId ? 'selected' : ''}>${e.fullName}</option>`).join('');
  document.getElementById('status').value = order.status;
  document.getElementById('notes').value = order.notes || '';
  
  // Load order items
  document.getElementById('orderItems').innerHTML = '';
  orderItemsCount = 0;
  order.items.forEach(item => {
    addOrderItem();
    const lastItem = document.getElementById('orderItems').lastElementChild;
    lastItem.querySelector('.item-dish').value = item.dishId;
    lastItem.querySelector('.item-qty').value = item.qty;
    lastItem.querySelector('.item-price').value = item.unitPrice;
  });
  
  updateOrderTotal();
  orderModal.show();
}

function saveOrder() {
  const id = document.getElementById('orderId').value;
  
  // Get order items
  const itemsElements = document.getElementById('orderItems').children;
  const items = [];
  
  for (let item of itemsElements) {
    const dishId = item.querySelector('.item-dish').value;
    const qty = parseInt(item.querySelector('.item-qty').value);
    const unitPrice = parseFloat(item.querySelector('.item-price').value);
    
    if (dishId && qty > 0) {
      items.push({ dishId, qty, unitPrice });
    }
  }
  
  if (items.length === 0) {
    alert('Please add at least one item to the order');
    return;
  }
  
  const total = items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
  
  const order = {
    id: id || 'ord_' + Date.now(),
    tableId: document.getElementById('tableId').value,
    employeeId: document.getElementById('employeeId').value,
    status: document.getElementById('status').value,
    items: items,
    total: total,
    notes: document.getElementById('notes').value,
    createdAt: id ? allOrders.find(o => o.id === id).createdAt : new Date().toISOString()
  };
  
  if (id) {
    const index = allOrders.findIndex(o => o.id === id);
    allOrders[index] = order;
  } else {
    allOrders.push(order);
  }
  
  orderModal.hide();
  applyFilters();
  alert('Order saved successfully!');
}

function openDeleteModal(id) {
  const order = allOrders.find(o => o.id === id);
  if (!order) return;
  deleteId = id;
  document.getElementById('deleteItemName').textContent = `${order.id} - ${formatCurrency(order.total)}`;
  deleteModal.show();
}

function confirmDelete() {
  allOrders = allOrders.filter(o => o.id !== deleteId);
  deleteModal.hide();
  applyFilters();
  alert('Order deleted successfully!');
}

function viewDetails(id) {
  window.location.href = `orders-detail.html?id=${id}`;
}

function exportToCSV() {
  const headers = ['ID', 'Table', 'Employee', 'Status', 'Total', 'Date', 'Items Count'];
  const rows = filteredOrders.map(order => [
    order.id, order.tableId, order.employeeId, order.status, 
    order.total, order.createdAt, order.items.length
  ]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'orders_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}