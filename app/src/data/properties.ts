import type { Testimonial, Service, Stat, NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { path: '/', label: { fr: 'Accueil', ar: 'الرئيسية' } },
  { path: '/a-propos', label: { fr: 'A propos', ar: 'من نحن' } },
  { path: '/biens', label: { fr: 'Biens immobiliers', ar: 'العقارات' } },
  { path: '/contact', label: { fr: 'Contact', ar: 'اتصل بنا' } },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: { fr: 'Karim Ben Ali', ar: 'كريم بن علي' },
    role: { fr: 'Entrepreneur', ar: 'رائد أعمال' },
    content: {
      fr: 'Hibiscus Immobiliere nous a accompagnes dans l\'achat de notre villa a Sidi Bou Said. Un service impeccable, une equipe professionnelle et reactive. Ils ont su comprendre nos besoins et nous proposer des biens correspondant parfaitement a nos attentes. Je les recommande vivement.',
      ar: 'هيبيسكوس العقارية رافقتنا في شراء فيلتنا بسيدي بو سعيد. خدمة لا تشوبها شائبة، وفريق محترف وسريع الاستجابة. لقد فهموا احتياجاتنا واقترحوا علينا عقارات تتوافق تماماً مع توقعاتنا. أنصح بهم بشدة.'
    },
    avatar: '/images/avatar-1.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: { fr: 'Leila Trabelsi', ar: 'ليلى الطرابلسي' },
    role: { fr: 'Directrice commerciale', ar: 'مديرة تجارية' },
    content: {
      fr: 'J\'ai loue un appartement a La Marsa via Hibiscus Immobiliere. La qualite du service etait exceptionnelle du premier contact jusqu\'a la remise des cles. L\'equipe est disponible, transparente sur les prix et tres arrangeante. Une experience sans stress !',
      ar: 'أجرت شقة بالمرسى عبر هيبيسكوس العقارية. كانت جودة الخدمة استثنائية من أول اتصال حتى تسليم المفاتيح. الفريق متاح، وشفاف في الأسعار ومتعاون للغاية. تجربة خالية من التوتر!'
    },
    avatar: '/images/avatar-2.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: { fr: 'Mohamed Haddad', ar: 'محمد الحداد' },
    role: { fr: 'Investisseur immobilier', ar: 'مستثمر عقاري' },
    content: {
      fr: 'En tant qu\'investisseur, j\'ai travaille avec plusieurs agences immobilieres mais Hibiscus Immobiliere se demarque par leur connaissance du marche et leur reseau. Ils m\'ont aide a constituer un portefeuille de 4 biens locatifs performants en moins d\'un an. Merci a toute l\'equipe !',
      ar: 'بصفتي مستثمراً، عملت مع عدة وكالات عقارية لكن هيبيسكوس العقارية تتميز بمعرفتها بالسوق وشبكتها. ساعدوني في بناء محفظة من 4 عقارات إيجارية مربحة في أقل من سنة. شكراً للفريق بأكمله!'
    },
    avatar: '/images/avatar-3.jpg',
    rating: 5,
  },
];

export const services: Service[] = [
  {
    id: '1',
    icon: 'Search',
    title: { fr: 'Recherche personnalisee', ar: 'بحث مخصص' },
    description: {
      fr: 'Nous analysons vos besoins et votre budget pour vous proposer les biens qui vous correspondent parfaitement, en vous faisant gagner un temps precieux.',
      ar: 'نحلل احتياجاتك وميزانيتك لنقترح عليك العقارات التي تناسبك تماماً، مما يوفر لك وقتاً ثميناً.'
    },
  },
  {
    id: '2',
    icon: 'FileCheck',
    title: { fr: 'Conseil juridique', ar: 'استشارة قانونية' },
    description: {
      fr: 'Nos experts vous accompagnent dans toutes les demarches administratives et juridiques, de l\'offre d\'achat jusqu\'a la signature chez le notaire.',
      ar: 'يرافقك خبراؤنا في جميع الإجراءات الإدارية والقانونية، من عرض الشراء حتى التوقيع لدى الموثق.'
    },
  },
  {
    id: '3',
    icon: 'TrendingUp',
    title: { fr: 'Estimation gratuite', ar: 'تقييم مجاني' },
    description: {
      fr: 'Beneficiez d\'une estimation precise de votre bien immobilier basee sur une analyse approfondie du marche local et des tendances actuelles.',
      ar: 'احصل على تقييم دقيق لعقارك بناءً على تحليل معمق للسوق المحلي والاتجاهات الحالية.'
    },
  },
  {
    id: '4',
    icon: 'ShieldCheck',
    title: { fr: 'Gestion locative', ar: 'إدارة الإيجارات' },
    description: {
      fr: 'Nous assurons la gestion complete de vos biens locatifs : recherche de locataires, etat des lieux, encaissement des loyers et suivi des travaux.',
      ar: 'نضمن إدارة كاملة لعقاراتك الإيجارية: البحث عن المستأجرين، جرد الممتلكات، تحصيل الإيجارات ومتابعة الأعمال.'
    },
  },
];

export const stats: Stat[] = [
  { id: '1', icon: 'Calendar', value: 15, suffix: '+', label: { fr: 'Annees d\'experience', ar: 'سنة خبرة' }, color: 'magenta' },
  { id: '2', icon: 'Building2', value: 850, suffix: '+', label: { fr: 'Biens vendus', ar: 'عقار مباع' }, color: 'green' },
  { id: '3', icon: 'Users', value: 1200, suffix: '+', label: { fr: 'Clients satisfaits', ar: 'عميل راضٍ' }, color: 'magenta' },
  { id: '4', icon: 'Home', value: 320, suffix: '', label: { fr: 'Biens en portefeuille', ar: 'عقار في المحفظة' }, color: 'green' },
];
