// assets/js/i18n.js
// Simple internationalization system

const translations = {
  en: {
    dashboard: 'Dashboard',
    dishes: 'Dishes',
    tables: 'Tables',
    employees: 'Employees',
    reservations: 'Reservations',
    orders: 'Orders',
    logout: 'Logout',
    search: 'Search',
    filter: 'Filter',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    actions: 'Actions',
    status: 'Status',
    total: 'Total',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  fr: {
    dashboard: 'Tableau de bord',
    dishes: 'Plats',
    tables: 'Tables',
    employees: 'Employés',
    reservations: 'Réservations',
    orders: 'Commandes',
    logout: 'Déconnexion',
    search: 'Rechercher',
    filter: 'Filtrer',
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    actions: 'Actions',
    status: 'Statut',
    total: 'Total',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    dishes: 'الأطباق',
    tables: 'الطاولات',
    employees: 'الموظفون',
    reservations: 'الحجوزات',
    orders: 'الطلبات',
    logout: 'تسجيل الخروج',
    search: 'بحث',
    filter: 'تصفية',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    actions: 'الإجراءات',
    status: 'الحالة',
    total: 'المجموع',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجاح'
  }
};

// Get current language from session or default to English
function getCurrentLang() {
  return sessionStorage.getItem('language') || 'en';
}

// Set language
function setLanguage(lang) {
  sessionStorage.setItem('language', lang);
  
  // Apply RTL for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }
  
  // Reload page to apply translations
  location.reload();
}

// Get translation
function t(key) {
  const lang = getCurrentLang();
  return translations[lang][key] || key;
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', function() {
  const langSelect = document.getElementById('langSelect');
  
  if (langSelect) {
    // Set current language
    langSelect.value = getCurrentLang();
    
    // Listen for changes
    langSelect.addEventListener('change', function() {
      setLanguage(this.value);
    });
  }
  
  // Apply current language direction
  const currentLang = getCurrentLang();
  if (currentLang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  }
});