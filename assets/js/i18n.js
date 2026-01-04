// assets/js/i18n.js
// Complete internationalization with full Arabic support

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    dishes: 'Dishes',
    tables: 'Tables',
    employees: 'Employees',
    reservations: 'Reservations',
    orders: 'Orders',
    logout: 'Logout',
    
    // Common Actions
    search: 'Search',
    filter: 'Filter',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    reset: 'Reset',
    export: 'Export',
    
    // Table Headers
    actions: 'Actions',
    status: 'Status',
    total: 'Total',
    name: 'Name',
    price: 'Price',
    category: 'Category',
    
    // Messages
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    noData: 'No data found',
    
    // Dashboard
    dashboardOverview: 'Dashboard Overview',
    totalDishes: 'Total Dishes',
    totalTables: 'Total Tables',
    totalEmployees: 'Employees',
    totalOrders: 'Total Orders',
    
    // Dishes
    dishesManagement: 'Dishes Management',
    allDishes: 'All Dishes',
    addDish: 'Add Dish',
    editDish: 'Edit Dish',
    dishDetails: 'Dish Details',
    available: 'Available',
    unavailable: 'Unavailable',
    
    // Tables
    tablesManagement: 'Tables Management',
    allTables: 'All Tables',
    addTable: 'Add Table',
    tableNumber: 'Table Number',
    seats: 'Seats',
    free: 'Free',
    occupied: 'Occupied',
    reserved: 'Reserved',
    
    // Employees
    employeesManagement: 'Employees Management',
    allEmployees: 'All Employees',
    addEmployee: 'Add Employee',
    role: 'Role',
    phone: 'Phone',
    active: 'Active',
    inactive: 'Inactive',
    
    // Reservations
    reservationsManagement: 'Reservations Management',
    allReservations: 'All Reservations',
    addReservation: 'Add Reservation',
    customer: 'Customer',
    guests: 'Guests',
    dateTime: 'Date & Time',
    
    // Orders
    ordersManagement: 'Orders Management',
    allOrders: 'All Orders',
    addOrder: 'Add Order',
    table: 'Table',
    employee: 'Employee',
    pending: 'Pending',
    preparing: 'Preparing',
    completed: 'Completed'
  },
  
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    dishes: 'Plats',
    tables: 'Tables',
    employees: 'Employés',
    reservations: 'Réservations',
    orders: 'Commandes',
    logout: 'Déconnexion',
    
    // Common Actions
    search: 'Rechercher',
    filter: 'Filtrer',
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    reset: 'Réinitialiser',
    export: 'Exporter',
    
    // Table Headers
    actions: 'Actions',
    status: 'Statut',
    total: 'Total',
    name: 'Nom',
    price: 'Prix',
    category: 'Catégorie',
    
    // Messages
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    noData: 'Aucune donnée trouvée',
    
    // Dashboard
    dashboardOverview: 'Aperçu du tableau de bord',
    totalDishes: 'Total des plats',
    totalTables: 'Total des tables',
    totalEmployees: 'Employés',
    totalOrders: 'Total des commandes',
    
    // Dishes
    dishesManagement: 'Gestion des plats',
    allDishes: 'Tous les plats',
    addDish: 'Ajouter un plat',
    editDish: 'Modifier le plat',
    dishDetails: 'Détails du plat',
    available: 'Disponible',
    unavailable: 'Indisponible',
    
    // Tables
    tablesManagement: 'Gestion des tables',
    allTables: 'Toutes les tables',
    addTable: 'Ajouter une table',
    tableNumber: 'Numéro de table',
    seats: 'Places',
    free: 'Libre',
    occupied: 'Occupée',
    reserved: 'Réservée',
    
    // Employees
    employeesManagement: 'Gestion des employés',
    allEmployees: 'Tous les employés',
    addEmployee: 'Ajouter un employé',
    role: 'Rôle',
    phone: 'Téléphone',
    active: 'Actif',
    inactive: 'Inactif',
    
    // Reservations
    reservationsManagement: 'Gestion des réservations',
    allReservations: 'Toutes les réservations',
    addReservation: 'Ajouter une réservation',
    customer: 'Client',
    guests: 'Invités',
    dateTime: 'Date et heure',
    
    // Orders
    ordersManagement: 'Gestion des commandes',
    allOrders: 'Toutes les commandes',
    addOrder: 'Ajouter une commande',
    table: 'Table',
    employee: 'Employé',
    pending: 'En attente',
    preparing: 'En préparation',
    completed: 'Terminé'
  },
  
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    dishes: 'الأطباق',
    tables: 'الطاولات',
    employees: 'الموظفون',
    reservations: 'الحجوزات',
    orders: 'الطلبات',
    logout: 'تسجيل الخروج',
    
    // Common Actions
    search: 'بحث',
    filter: 'تصفية',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    reset: 'إعادة تعيين',
    export: 'تصدير',
    
    // Table Headers
    actions: 'الإجراءات',
    status: 'الحالة',
    total: 'المجموع',
    name: 'الاسم',
    price: 'السعر',
    category: 'الفئة',
    
    // Messages
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجاح',
    noData: 'لا توجد بيانات',
    
    // Dashboard
    dashboardOverview: 'نظرة عامة على لوحة التحكم',
    totalDishes: 'إجمالي الأطباق',
    totalTables: 'إجمالي الطاولات',
    totalEmployees: 'الموظفون',
    totalOrders: 'إجمالي الطلبات',
    
    // Dishes
    dishesManagement: 'إدارة الأطباق',
    allDishes: 'جميع الأطباق',
    addDish: 'إضافة طبق',
    editDish: 'تعديل الطبق',
    dishDetails: 'تفاصيل الطبق',
    available: 'متاح',
    unavailable: 'غير متاح',
    
    // Tables
    tablesManagement: 'إدارة الطاولات',
    allTables: 'جميع الطاولات',
    addTable: 'إضافة طاولة',
    tableNumber: 'رقم الطاولة',
    seats: 'المقاعد',
    free: 'فارغة',
    occupied: 'مشغولة',
    reserved: 'محجوزة',
    
    // Employees
    employeesManagement: 'إدارة الموظفين',
    allEmployees: 'جميع الموظفين',
    addEmployee: 'إضافة موظف',
    role: 'الدور',
    phone: 'الهاتف',
    active: 'نشط',
    inactive: 'غير نشط',
    
    // Reservations
    reservationsManagement: 'إدارة الحجوزات',
    allReservations: 'جميع الحجوزات',
    addReservation: 'إضافة حجز',
    customer: 'العميل',
    guests: 'الضيوف',
    dateTime: 'التاريخ والوقت',
    
    // Orders
    ordersManagement: 'إدارة الطلبات',
    allOrders: 'جميع الطلبات',
    addOrder: 'إضافة طلب',
    table: 'الطاولة',
    employee: 'الموظف',
    pending: 'قيد الانتظار',
    preparing: 'قيد التحضير',
    completed: 'مكتمل'
  }
};

// Get current language from session or default to English
function getCurrentLang() {
  return sessionStorage.getItem('language') || 'en';
}

// Set language and apply RTL for Arabic
function setLanguage(lang) {
  sessionStorage.setItem('language', lang);
  
  const html = document.documentElement;
  
  // Apply RTL for Arabic
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    document.body.classList.add('rtl');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', lang);
    document.body.classList.remove('rtl');
  }
  
  // Apply translations to page
  applyTranslations();
}

// Get translation for a key
function t(key) {
  const lang = getCurrentLang();
  return translations[lang][key] || translations['en'][key] || key;
}

// Apply translations to elements with data-i18n attribute
function applyTranslations() {
  const lang = getCurrentLang();
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang][key];
    
    if (translation) {
      // Handle different element types
      if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
        element.placeholder = translation;
      } else if (element.tagName === 'INPUT' && element.value !== undefined) {
        element.value = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  const langSelect = document.getElementById('langSelect');
  
  if (langSelect) {
    // Set current language in dropdown
    const currentLang = getCurrentLang();
    langSelect.value = currentLang;
    
    // Apply language settings
    setLanguage(currentLang);
    
    // Listen for language changes
    langSelect.addEventListener('change', function() {
      setLanguage(this.value);
    });
  }
});