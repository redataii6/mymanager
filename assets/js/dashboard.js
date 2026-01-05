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

// Logo Colors
const colors = {
  primary: '#3a86ff',
  secondary: '#8338ec',
  accent: '#ffbe0b',
  success: '#2ecc71',
  warning: '#ffbe0b',
  danger: '#fb5607',
  info: '#4cc9f0',
  palette: ['#3a86ff', '#8338ec', '#ffbe0b', '#fb5607', '#4cc9f0', '#ff006e', '#3a0ca3', '#7209b7']
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
        backgroundColor: colors.palette
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
        backgroundColor: [colors.success, colors.warning, colors.danger, '#6c757d']
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
        borderColor: colors.primary,
        backgroundColor: 'rgba(58, 134, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointHoverRadius: 6
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
          'rgba(58, 134, 255, 0.7)',
          'rgba(131, 56, 236, 0.7)',
          'rgba(255, 190, 11, 0.7)',
          'rgba(251, 86, 7, 0.7)'
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
        backgroundColor: colors.primary,
        borderRadius: 8
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
        backgroundColor: colors.palette,
        borderRadius: 8
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
