// assets/js/dashboard.js
// Dashboard with 6 different charts

// Protect this page
requireAuth();

// Display username
document.getElementById('username').textContent = sessionStorage.getItem('username') || 'User';

// Global data store
let data = {
  dishes: [],
  tables: [],
  employees: [],
  reservations: [],
  orders: []
};

// Load data and initialize dashboard
async function initDashboard() {
  try {
    const response = await fetch('../data/db.json');
    data = await response.json();
    
    // Update statistics cards
    updateStats();
    
    // Create all charts
    createDishCategoryChart();
    createTableStatusChart();
    createOrdersTimeChart();
    createReservationsChart();
    createRevenueChart();
    createEmployeeChart();
    
  } catch (error) {
    console.error('Error loading data:', error);
    alert('Error loading dashboard data. Make sure you are using a web server (Live Server).');
  }
}

// Update statistics cards
function updateStats() {
  document.getElementById('statDishes').textContent = data.dishes?.length || 0;
  document.getElementById('statTables').textContent = data.tables?.length || 0;
  document.getElementById('statEmployees').textContent = data.employees?.length || 0;
  document.getElementById('statOrders').textContent = data.orders?.length || 0;
}

// Chart 1: Pie Chart - Dishes by Category
function createDishCategoryChart() {
  const categories = {};
  data.dishes.forEach(dish => {
    categories[dish.category] = (categories[dish.category] || 0) + 1;
  });
  
  const ctx = document.getElementById('chartDishesCategory').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: [
          '#667eea', '#764ba2', '#f093fb', '#4facfe',
          '#43e97b', '#fa709a', '#fee140', '#30cfd0'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Chart 2: Doughnut Chart - Table Status
function createTableStatusChart() {
  const status = {};
  data.tables.forEach(table => {
    status[table.status] = (status[table.status] || 0) + 1;
  });
  
  const ctx = document.getElementById('chartTableStatus').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(status),
      datasets: [{
        data: Object.values(status),
        backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#6c757d']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Chart 3: Line Chart - Orders Over Time
function createOrdersTimeChart() {
  // Group orders by date
  const ordersByDate = {};
  data.orders.forEach(order => {
    const date = order.createdAt.split('T')[0];
    ordersByDate[date] = (ordersByDate[date] || 0) + 1;
  });
  
  const sortedDates = Object.keys(ordersByDate).sort();
  
  const ctx = document.getElementById('chartOrdersTime').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedDates,
      datasets: [{
        label: 'Number of Orders',
        data: sortedDates.map(date => ordersByDate[date]),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Chart 4: Polar Area Chart - Reservation Status
function createReservationsChart() {
  const status = {};
  data.reservations.forEach(res => {
    status[res.status] = (status[res.status] || 0) + 1;
  });
  
  const ctx = document.getElementById('chartReservations').getContext('2d');
  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: Object.keys(status),
      datasets: [{
        data: Object.values(status),
        backgroundColor: [
          'rgba(102, 126, 234, 0.7)',
          'rgba(118, 75, 162, 0.7)',
          'rgba(240, 147, 251, 0.7)',
          'rgba(79, 172, 254, 0.7)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Chart 5: Bar Chart - Revenue by Dish (Horizontal)
function createRevenueChart() {
  // Calculate revenue per dish
  const dishRevenue = {};
  
  data.orders.forEach(order => {
    order.items.forEach(item => {
      const dish = data.dishes.find(d => d.id === item.dishId);
      if (dish) {
        const revenue = item.qty * item.unitPrice;
        dishRevenue[dish.name] = (dishRevenue[dish.name] || 0) + revenue;
      }
    });
  });
  
  // Get top 10
  const sorted = Object.entries(dishRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  const ctx = document.getElementById('chartRevenue').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(item => item[0]),
      datasets: [{
        label: 'Revenue (MAD)',
        data: sorted.map(item => item[1]),
        backgroundColor: '#667eea'
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}

// Chart 6: Bar Chart - Employee Activity (Orders handled)
function createEmployeeChart() {
  const employeeOrders = {};
  
  data.orders.forEach(order => {
    const employee = data.employees.find(e => e.id === order.employeeId);
    if (employee) {
      employeeOrders[employee.fullName] = (employeeOrders[employee.fullName] || 0) + 1;
    }
  });
  
  const ctx = document.getElementById('chartEmployees').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(employeeOrders),
      datasets: [{
        label: 'Orders Handled',
        data: Object.values(employeeOrders),
        backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Initialize dashboard when page loads
initDashboard();