# 🍽️ MyManager - Restaurant Backoffice Management System

A comprehensive backoffice application for managing restaurant operations, built with Vanilla JavaScript, HTML5, and CSS3.

## 👥 Team Members

- **[Your Name]** - Student ID: [ID] - [Email]
- **[Team Member 2]** - Student ID: [ID] - [Email]
- **[Team Member 3]** - Student ID: [ID] - [Email]

## 📋 Project Description

MyManager is a complete restaurant management backoffice system that allows administrators to manage dishes, tables, employees, reservations, and orders. The application features a responsive design, comprehensive CRUD operations, and an interactive dashboard with multiple data visualizations.

## 🎯 Features

### Core Functionalities

✅ **5 CRUD Entities:**

1. **Dishes** - Manage menu items with categories and pricing
2. **Tables** - Track table availability and seating capacity
3. **Employees** - Manage staff information and roles
4. **Reservations** - Handle customer reservations
5. **Orders** - Process and track customer orders

✅ **Dashboard with 6 Charts:**

- Pie Chart: Dishes by Category
- Doughnut Chart: Table Status Distribution
- Line Chart: Orders Over Time
- Polar Area Chart: Reservation Status
- Horizontal Bar Chart: Revenue by Dish
- Bar Chart: Employee Activity

✅ **Advanced Features:**

- 🔐 Login/Logout system (admin/admin)
- 🔍 Search and filter functionality
- 📊 Sort by multiple columns
- 📄 Export to CSV
- 📑 Export details to PDF
- 🌐 Internationalization (English, French, Arabic)
- 📱 Fully responsive design
- ⏱️ Pagination for large datasets
- ✅ Form validation
- 🗑️ Delete confirmation modals

## 🛠️ Technologies Used

### Core Technologies

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with modern features (Flexbox, Grid)
- **Vanilla JavaScript** - All logic and interactivity (ES6+)

### Libraries & Frameworks

- **Bootstrap 5.3.3** - UI framework and responsive design
- **Chart.js 4.4.0** - Data visualization and charts
- **jsPDF 2.5.1** - PDF generation for reports

### Development Tools

- **Git** - Version control
- **GitHub** - Repository hosting
- **VS Code** - Code editor
- **Live Server** - Development server

## 📁 Project Structure

```
MyManager/
├── index.html                      # Entry point (redirects to login)
├── login.html                      # Login page
├── dashboard.html                  # Main dashboard with charts
├── data/
│   └── db.json                     # Mock database
├── assets/
│   ├── css/
│   │   └── style.css               # Custom styles
│   ├── js/
│   │   ├── auth.js                 # Authentication logic
│   │   ├── dashboard.js            # Dashboard charts
│   │   ├── crud-dishes.js          # Dishes CRUD operations
│   │   ├── i18n.js                 # Internationalization
│   │   └── utils.js                # Utility functions
│   └── images/
│       └── logo.png                # Company logo
├── pages/
│   ├── dishes.html                 # Dishes management
│   ├── dishes-detail.html          # Dish details
│   ├── tables.html                 # Tables management
│   ├── employees.html              # Employees management
│   ├── reservations.html           # Reservations management
│   └── orders.html                 # Orders management
└── README.md                       # This file
```

## 🚀 Installation & Setup

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Live Server extension for VS Code (or any local web server)

### Steps to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/[your-username]/mymanager.git
cd mymanager
```

2. **Open with Live Server**

   - Open the project folder in VS Code
   - Right-click on `login.html`
   - Select "Open with Live Server"

3. **Login**
   - Username: `admin`
   - Password: `admin`

### Important Note

⚠️ The application must be run through a web server (not `file://` protocol) due to CORS restrictions when loading JSON data.

## 📊 Data Source

The application uses a local JSON file (`data/db.json`) to simulate a backend database. In a production environment, this would be replaced with actual API calls to a backend server.

### Data Structure

```json
{
  "dishes": [
    {
      "id": "dish_001",
      "name": "Margherita",
      "category": "Pizza",
      "price": 55,
      "isAvailable": true,
      "createdAt": "2026-01-03"
    }
  ],
  "tables": [...],
  "employees": [...],
  "reservations": [...],
  "orders": [...]
}
```

## 🌐 Deployment

The application is deployed and accessible at:

**Live Demo:** [https://your-username.github.io/mymanager](https://your-username.github.io/mymanager)

### Deployment Instructions (GitHub Pages)

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Deploy application"
git push origin main
```

2. **Enable GitHub Pages**

   - Go to repository Settings
   - Navigate to Pages section
   - Select `main` branch as source
   - Save and wait for deployment

3. **Alternative: Vercel/Netlify**
   - Connect your GitHub repository
   - Deploy with one click
   - Automatic deployments on push

## 📖 Usage Guide

### For Administrators

1. **Dashboard**

   - View overall statistics
   - Analyze data through 6 different charts
   - Quick overview of restaurant operations

2. **Managing Dishes**

   - Add new dishes with category and pricing
   - Edit existing dishes
   - View detailed information
   - Export data to CSV or PDF
   - Mark dishes as available/unavailable

3. **Managing Tables**

   - Track table status (free, occupied, reserved)
   - View seating capacity
   - Update table information

4. **Managing Employees**

   - Add staff members
   - Assign roles
   - Track active employees

5. **Managing Reservations**

   - Create new reservations
   - Confirm or cancel reservations
   - View customer information

6. **Managing Orders**
   - Process new orders
   - Track order status
   - View order details and totals

## 🔧 Development Guidelines

### Code Organization

- All JavaScript is modular and well-commented
- CSS follows BEM-like naming conventions
- HTML uses semantic elements

### Best Practices Followed

- ✅ Clean, readable code
- ✅ Consistent naming conventions
- ✅ Error handling for async operations
- ✅ Responsive design principles
- ✅ Accessibility considerations
- ✅ Cross-browser compatibility

### Adding New Features

1. **Add a New Entity**

   - Create HTML page in `/pages/`
   - Create corresponding JS file in `/assets/js/`
   - Add data structure in `db.json`
   - Update navigation menu

2. **Add a New Chart**
   - Edit `assets/js/dashboard.js`
   - Add canvas element in `dashboard.html`
   - Use Chart.js documentation for chart types

## 🐛 Known Issues & Future Improvements

### Current Limitations

- Data is not persisted (changes lost on page refresh)
- No real backend integration
- Limited user roles (only admin)

### Planned Improvements

- [ ] Backend API integration
- [ ] Real-time data updates
- [ ] Advanced user authentication with JWT
- [ ] Role-based access control
- [ ] Email notifications
- [ ] Advanced reporting features
- [ ] Dark mode toggle

## 📚 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [JavaScript.info](https://javascript.info/)

## 🤝 Contributing

This is an academic project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of the JavaScript course at [Your University Name].

## 📞 Contact

- **Project Link:** [https://github.com/your-username/mymanager](https://github.com/your-username/mymanager)
- **Email:** your.email@example.com

## 🙏 Acknowledgments

- Teacher: [Professor Name]
- Course: JavaScript & Web Development
- Institution: [Your University]
- Academic Year: 2025-2026

---

**Last Updated:** January 3, 2026
**Version:** 1.0.0
**Status:** ✅ Completed
