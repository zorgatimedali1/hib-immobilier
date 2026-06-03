export type Lang = 'fr' | 'ar';

const translations: Record<string, { fr: string; ar: string }> = {
  // Sidebar
  'sidebar.title': { fr: 'HIBISCUS', ar: 'هيبيسكوس' },
  'sidebar.subtitle': { fr: 'Administration', ar: 'الإدارة' },
  'sidebar.dashboard': { fr: 'Dashboard', ar: 'لوحة القيادة' },
  'sidebar.properties': { fr: 'Biens', ar: 'العقارات' },
  'sidebar.analytics': { fr: 'Analytiques', ar: 'التحليلات' },
  'sidebar.logout': { fr: 'Déconnexion', ar: 'تسجيل الخروج' },

  // Login
  'login.title': { fr: 'Hibiscus Admin', ar: 'هيبيسكوس المشرف' },
  'login.subtitle': { fr: 'Connectez-vous pour accéder au panneau', ar: 'سجل الدخول للوصول إلى لوحة التحكم' },
  'login.email': { fr: 'Email', ar: 'البريد الإلكتروني' },
  'login.password': { fr: 'Mot de passe', ar: 'كلمة المرور' },
  'login.submit': { fr: 'Se connecter', ar: 'تسجيل الدخول' },
  'login.connected': { fr: 'Connecté', ar: 'تم الاتصال' },

  // Dashboard
  'dashboard.title': { fr: 'Dashboard', ar: 'لوحة القيادة' },
  'dashboard.subtitle': { fr: "Vue d'ensemble de vos biens et statistiques", ar: 'نظرة عامة على عقاراتك وإحصائياتك' },
  'dashboard.newProperty': { fr: 'Nouveau bien', ar: 'عقار جديد' },
  'dashboard.totalProperties': { fr: 'Total biens', ar: 'إجمالي العقارات' },
  'dashboard.featured': { fr: 'Biens en vedette', ar: 'العقارات المميزة' },
  'dashboard.avgPrice': { fr: 'Prix moyen', ar: 'متوسط السعر' },
  'dashboard.whatsappClicks': { fr: 'Clics WhatsApp', ar: 'نقرات واتساب' },
  'dashboard.recentProperties': { fr: 'Derniers biens', ar: 'آخر العقارات' },
  'dashboard.loading': { fr: 'Chargement...', ar: 'جار التحميل...' },
  'dashboard.registered': { fr: 'enregistrés', ar: 'مسجل' },

  // Properties
  'properties.title': { fr: 'Gestion des biens', ar: 'إدارة العقارات' },
  'properties.count': { fr: 'bien(s) enregistré(s)', ar: 'عقار(ات) مسجل(ة)' },
  'properties.add': { fr: 'Ajouter un bien', ar: 'إضافة عقار' },
  'properties.headerTitle': { fr: 'Titre', ar: 'العنوان' },
  'properties.headerType': { fr: 'Type', ar: 'النوع' },
  'properties.headerStatus': { fr: 'Statut', ar: 'الحالة' },
  'properties.headerPrice': { fr: 'Prix', ar: 'السعر' },
  'properties.loadError': { fr: 'Erreur chargement des biens', ar: 'خطأ في تحميل العقارات' },
  'properties.deleted': { fr: 'Bien supprimé', ar: 'تم حذف العقار' },
  'properties.deleteError': { fr: 'Erreur lors de la suppression', ar: 'خطأ أثناء الحذف' },
  'properties.deleteTitle': { fr: 'Supprimer le bien', ar: 'حذف العقار' },
  'properties.deleteConfirm': { fr: 'Êtes-vous sûr de vouloir supprimer', ar: 'هل أنت متأكد من حذف' },
  'properties.deleteIrreversible': { fr: 'Cette action est irréversible.', ar: 'هذا الإجراء لا رجعة فيه.' },

  // PropertyForm
  'form.back': { fr: 'Retour aux biens', ar: 'العودة إلى العقارات' },
  'form.edit': { fr: 'Modifier le bien', ar: 'تعديل العقار' },
  'form.add': { fr: 'Ajouter un bien', ar: 'إضافة عقار' },
  'form.general': { fr: 'Informations générales', ar: 'معلومات عامة' },
  'form.slug': { fr: 'Slug', ar: 'الرابط المختصر' },
  'form.status': { fr: 'Statut', ar: 'الحالة' },
  'form.type': { fr: 'Type', ar: 'النوع' },
  'form.price': { fr: 'Prix (TND)', ar: 'السعر (د.ت)' },
  'form.area': { fr: 'Surface (m²)', ar: 'المساحة (م²)' },
  'form.typology': { fr: 'Typologie', ar: 'النمط' },
  'form.virtualTour': { fr: 'URL visite virtuelle', ar: 'رابط الجولة الافتراضية' },
  'form.featured': { fr: 'En vedette', ar: 'مميز' },
  'form.localization': { fr: 'Localisation & titres', ar: 'الموقع والعناوين' },
  'form.french': { fr: 'Français', ar: 'الفرنسية' },
  'form.arabic': { fr: 'العربية', ar: 'العربية' },
  'form.titleFr': { fr: 'Titre FR', ar: 'العنوان (فرنسي)' },
  'form.locationFr': { fr: 'Localisation FR', ar: 'الموقع (فرنسي)' },
  'form.titleAr': { fr: 'Titre AR', ar: 'العنوان (عربي)' },
  'form.locationAr': { fr: 'Localisation AR', ar: 'الموقع (عربي)' },
  'form.descriptions': { fr: 'Descriptions', ar: 'الوصف' },
  'form.descFr': { fr: 'Description FR', ar: 'الوصف (فرنسي)' },
  'form.descAr': { fr: 'الوصف AR', ar: 'الوصف (عربي)' },
  'form.amenities': { fr: 'Équipements', ar: 'التجهيزات' },
  'form.images': { fr: 'Images', ar: 'الصور' },
  'form.imagesLater': { fr: 'Les images pourront être ajoutées après la création du bien.', ar: 'يمكن إضافة الصور بعد إنشاء العقار.' },
  'form.cancel': { fr: 'Annuler', ar: 'إلغاء' },
  'form.save': { fr: 'Enregistrer', ar: 'حفظ' },
  'form.create': { fr: 'Créer le bien', ar: 'إنشاء العقار' },
  'form.updated': { fr: 'Bien mis à jour', ar: 'تم تحديث العقار' },
  'form.created': { fr: 'Bien créé', ar: 'تم إنشاء العقار' },
  'form.saveError': { fr: 'Erreur lors de la sauvegarde', ar: 'خطأ أثناء الحفظ' },
  'form.validationError': { fr: 'Veuillez corriger les erreurs', ar: 'يرجى تصحيح الأخطاء' },
  'form.loadError': { fr: 'Impossible de charger le bien', ar: 'تعذر تحميل العقار' },

  // Analytics
  'analytics.title': { fr: 'Analytiques', ar: 'التحليلات' },
  'analytics.subtitle': { fr: 'Suivi des clics WhatsApp et interactions', ar: 'تتبع نقرات واتساب والتفاعلات' },
  'analytics.totalClicks': { fr: 'Total clics WhatsApp', ar: 'إجمالي نقرات واتساب' },
  'analytics.frClicks': { fr: 'Clics Français', ar: 'النقرات الفرنسية' },
  'analytics.arClicks': { fr: 'Clics Arabe', ar: 'النقرات العربية' },
  'analytics.langDistribution': { fr: 'Répartition par langue', ar: 'التوزيع حسب اللغة' },
  'analytics.clicks': { fr: 'clic(s)', ar: 'نقرة (نقرات)' },
  'analytics.dailyClicks': { fr: 'Clics par jour', ar: 'النقرات حسب اليوم' },
  'analytics.noData': { fr: 'Aucune donnée', ar: 'لا توجد بيانات' },

  // DataTable
  'datatable.loading': { fr: 'Chargement...', ar: 'جار التحميل...' },
  'datatable.empty': { fr: 'Aucune donnée', ar: 'لا توجد بيانات' },

  // ConfirmDialog
  'dialog.cancel': { fr: 'Annuler', ar: 'إلغاء' },
  'dialog.delete': { fr: 'Supprimer', ar: 'حذف' },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}

export function getDir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
