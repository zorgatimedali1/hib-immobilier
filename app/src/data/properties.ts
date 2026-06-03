import type { Property, Testimonial, Service, Stat, NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { path: '/', label: { fr: 'Accueil', ar: 'الرئيسية' } },
  { path: '/a-propos', label: { fr: 'A propos', ar: 'من نحن' } },
  { path: '/biens', label: { fr: 'Biens immobiliers', ar: 'العقارات' } },
  { path: '/contact', label: { fr: 'Contact', ar: 'اتصل بنا' } },
];

export const properties: Property[] = [
  {
    id: 'penthouse-les-jardins',
    title: { fr: 'Penthouse Les Jardins de Carthage', ar: 'بنتهاوس حدائق قرطاج' },
    location: { fr: 'Les Jardins de Carthage, Tunis', ar: 'حدائق قرطاج، تونس' },
    type: 'penthouse',
    status: 'sale',
    price: 2850000,
    priceUnit: 'total',
    surface: 420,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    description: {
      fr: 'Somptueux penthouse de 420 m2 offrant une vue panoramique sur toute la ville de Tunis. Composé de 4 suites parentales, d\'un vaste salon avec double hauteur sous plafond, d\'une cuisine equipee avec cellier, et d\'une terrasse de 150 m2 avec piscine privee. Prestations haut de gamme : marbre importe, domotique, climatisation centralisee, 3 places de parking et 2 caves. Residence securisee avec gardien, ascenseur privatif et jardins paysagers.',
      ar: 'بنتهاوس فاخر بمساحة 420 متر مربع مع إطلالة بانورامية على مدينة تونس. يتكون من 4 أجنحة رئيسية، وصالون واسع بسقف مزدوج الارتفاع، ومطبخ مجهاز بمخزن، وتراس بمساحة 150 متر مربع مع مسبح خاص. تشطيبات راقية: رخام مستورد، منزل ذكي، تكييف مركزي، 3 مواقف سيارات وقاعتين. إقامة آمنة مع حارس، مصعد خاص وحدائق منسقة.'
    },
    amenities: ['Piscine', 'Terrasse', 'Vue panoramique', 'Parking', 'Cave', 'Ascenseur', 'Gardien', 'Climatisation', 'Domotique'],
    images: ['/images/property-1.jpg', '/images/hero-1.jpg', '/images/property-6.jpg'],
    featured: true,
    virtualTourUrl: 'https://my.matterport.com/show/?m=virtual-tour-demo',
    createdAt: '2025-11-15',
  },
  {
    id: 'villa-sidi-bou-said',
    title: { fr: 'Villa traditionnelle Sidi Bou Said', ar: 'فيلا تقليدية سيدي بو سعيد' },
    location: { fr: 'Sidi Bou Said, Tunis', ar: 'سيدي بو سعيد، تونس' },
    type: 'villa',
    status: 'sale',
    price: 1950000,
    priceUnit: 'total',
    surface: 350,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 4,
    description: {
      fr: 'Magnifique villa d\'architecte de style neo-mediterraneen dans le prestigieux village de Sidi Bou Said. 350 m2 habitable sur un terrain de 800 m2 avec jardin paysager, patio interieur avec fontaine et terrasse vue mer. 5 chambres dont 2 suites, salon marocain, salle a manger, cuisine professionnelle. Materiaux nobles : zellige, tadlakt, fer forge. Proximite immediate du centre village et de la plage.',
      ar: 'فيلا معمارية رائعة على الطراز المتوسطي الحديث في قرية سيدي بو سعيد المرموقة. 350 متر مربع مساحة قابلة للسكنى على أرض 800 متر مربع مع حديقة منسقة، وفناء داخلي بنافورة وتراس بإطلالة على البحر. 5 غرف نوم منها 2 جناح، وصالون مغربي، وغرفة طعام، ومطبخ احترافي. مواد نبيلة: زليج، تدلاكت، حديد مطاوع. بالقرب من مركز القرية والشاطئ.'
    },
    amenities: ['Jardin', 'Terrasse vue mer', 'Patio', 'Fontaine', 'Salon marocain', 'Parking', 'Cheminee', 'Cave'],
    images: ['/images/property-2.jpg', '/images/hero-3.jpg'],
    featured: true,
    createdAt: '2025-10-20',
  },
  {
    id: 'bureau-centre-urbain',
    title: { fr: 'Open space Centre Urbain Nord', ar: 'مساحة مفتوحة المركز الحضري الشمالي' },
    location: { fr: 'Centre Urbain Nord, Tunis', ar: 'المركز الحضري الشمالي، تونس' },
    type: 'commercial',
    status: 'rent',
    price: 8500,
    priceUnit: 'month',
    surface: 280,
    rooms: 4,
    bedrooms: 0,
    bathrooms: 2,
    description: {
      fr: 'Superbe espace de bureaux de 280 m2 en plein coeur du Centre Urbain Nord. Open space modulable avec 4 bureaux individuels, salle de reunion vitree, reception, kitchenette et 2 sanitaires. Prestations de qualite : faux plafond avec LED, climatisation VRV, baies vitrees, double vitrage, systeme d\'alarme. Immeuble de standing avec ascenseur, parking souterrain et conciergerie. Ideal pour siege social ou startup.',
      ar: 'مساحة مكاتب رائعة بمساحة 280 متر مربع في قلب المركز الحضري الشمالي. مساحة مفتوحة قابلة للتعديل مع 4 مكاتب فردية، وغرفة اجتماعات زجاجية، واستقبال، ومطبخ صغير وحمامين. تشطيبات عالية الجودة: سقف معلق مع إضاءة LED، تكييف VRV، واجهات زجاجية، زجاج مزدوج، نظام إنذار. مبنى راقٍ مع مصف، موقف سيارات تحت الأرض وخدمة استقبال. مثالي لمقر شركة أو شركة ناشئة.'
    },
    amenities: ['Open space', 'Salle de reunion', 'Reception', 'Kitchenette', 'Climatisation', 'Ascenseur', 'Parking', 'Alarme'],
    images: ['/images/property-3.jpg'],
    featured: true,
    createdAt: '2025-12-01',
  },
  {
    id: 'appartement-la-marsa',
    title: { fr: 'Appartement S+3 Vue Mer La Marsa', ar: 'شقة S+3 إطلالة بحر المرسى' },
    location: { fr: 'La Marsa, Tunis', ar: 'المرسى، تونس' },
    type: 'apartment',
    status: 'sale',
    price: 720000,
    priceUnit: 'total',
    surface: 165,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    description: {
      fr: 'Bel appartement S+3 de 165 m2 dans une residence neuve a La Marsa. Triple exposition avec vue mer depuis le salon et les chambres. Sejour de 45 m2 donnant sur une terrasse de 20 m2, cuisine americaine equipee, 3 chambres avec placards dont une suite parentale avec dressing et salle d\'eau. 2 garages en sous-sol. Residence avec piscine commune, jardin et gardien.',
      ar: 'شقة S+3 رائعة بمساحة 165 متر مربع في إقامة جديدة بالمرسى. إطلالات ثلاثية مع منظر للبحر من الصالون والغرف. صالون بمساحة 45 متر مربع يفتح على تراس بمساحة 20 متر مربع، مطبخ أمريكي مجهز، 3 غرف نوم مع خزائن منها جناح رئيسي مع غرفة ملابس وحمام. موقفان للسيارات في الطابق السفلي. إقامة مع مسبح مشترك، حديقة وحارس.'
    },
    amenities: ['Vue mer', 'Terrasse', 'Piscine', 'Parking', 'Dressing', 'Climatisation', 'Gardien', 'Ascenseur'],
    images: ['/images/property-4.jpg', '/images/property-6.jpg'],
    featured: false,
    createdAt: '2025-09-10',
  },
  {
    id: 'terrain-hammamet',
    title: { fr: 'Terrain constructible Hammamet Sud', ar: 'أرض قابلة للبناء حمامات الجنوب' },
    location: { fr: 'Hammamet Sud, Nabeul', ar: 'حمامات الجنوب، نابل' },
    type: 'land',
    status: 'sale',
    price: 450000,
    priceUnit: 'total',
    surface: 1500,
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
    description: {
      fr: 'Terrain de 1500 m2 en zone urbaine constructible a Hammamet Sud, a 800m de la plage. Le terrain est viabilise (eau, electricite, gaz, telephone) et clos de murs. Permis de construire accepte pour une villa de 400 m2. Vue degagee sur la mer et les collines environnantes. Acces direct par route goudronnee. Cadastre en regle.',
      ar: 'أرض بمساحة 1500 متر مربع في منطقة حضرية قابلة للبناء بحمامات الجنوب، على بعد 800 متر من الشاطئ. الأرض مجهزة (ماء، كهرباء، غاز، هاتف) ومسورة. رخصة بناء مقبولة لفيلا بمساحة 400 متر مربع. إطلالة مفتوحة على البحر والتلال المحيطة. وصول مباشر عبر طريق معبد. سجل عقاري منتظم.'
    },
    amenities: ['Viable', 'Clos', 'Vue mer', 'Acces route', 'Permis de construire'],
    images: ['/images/property-5.jpg'],
    featured: false,
    createdAt: '2025-08-05',
  },
  {
    id: 'duplex-gammarth',
    title: { fr: 'Duplex haut standing Gammarth', ar: 'دوبلكس راقي بجالطة' },
    location: { fr: 'Gammarth, Tunis', ar: 'جالطة، تونس' },
    type: 'duplex',
    status: 'rent',
    price: 5500,
    priceUnit: 'month',
    surface: 220,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 3,
    description: {
      fr: 'Splendide duplex de 220 m2 dans une residence de grand standing a Gammarth. Rez-de-chaussee : salon double, salle a manger, cuisine equipee, chambre avec salle d\'eau, terrasse et jardin privatif. Etage : 2 suites parentales avec dressing et salle de bain, balcon. Prestations luxueuses : parquets en chene, marbre de Carrare, cuisine Bulthaup, home cinema. Residence avec piscine, tennis, salle de fitness et spa.',
      ar: 'دوبلكس رائع بمساحة 220 متر مربع في إقامة فاخرة بجالطة. الطابق الأرضي: صالون مزدوج، غرفة طعام، مطبخ مجهز، غرفة نوم مع حمام، تراس وحديقة خاصة. الطابق العلوي: جناحان رئيسيان مع غرفة ملابس وحمام، شرفة. تشطيبات فاخرة: باركيه بلوط، رخام كارارا، مطبخ بولتوب، سينما منزلية. إقامة مع مسبح، ملعب تنس، صالة رياضية وسبا.'
    },
    amenities: ['Jardin privatif', 'Terrasse', 'Piscine', 'Tennis', 'Spa', 'Fitness', 'Parking', 'Home cinema', 'Dressing'],
    images: ['/images/property-6.jpg', '/images/hero-1.jpg'],
    featured: false,
    createdAt: '2025-11-25',
  },
  {
    id: 'local-commercial-lac',
    title: { fr: 'Local commercial Le Lac Tunis', ar: 'محلات تجارية بحيرة تونس' },
    location: { fr: 'Le Lac, Tunis', ar: 'البحيرة، تونس' },
    type: 'commercial',
    status: 'rent',
    price: 4200,
    priceUnit: 'month',
    surface: 120,
    rooms: 2,
    bedrooms: 0,
    bathrooms: 1,
    description: {
      fr: 'Local commercial de 120 m2 en emplacement numero 1 au Lac de Tunis. Belle vitrine de 8m de lineraire facade, hauteur sous plafond de 4m. Surface de vente de 90 m2, reserve de 20 m2, sanitaire. Climatisation centrale, alarme, stores electriques. Forte visibilite et passage. Parking facile. Ideal pour boutique, showroom ou concept store.',
      ar: 'محل تجاري بمساحة 120 متر مربع في موقع متميز رقم 1 ببحيرة تونس. واجهة زجاجية جميلة بعرض 8 أمتار، وسقف بارتفاع 4 أمتار. مساحة بيع 90 متر مربع، مخزن 20 متر مربع، حمام. تكييف مركزي، إنذار، ستائر كهربائية. رؤية وحركة مرور قوية. موقف سيارات سهل. مثالي لمتجر، صالة عرض أو متجر مفاهيمي.'
    },
    amenities: ['Vitrine', 'Reserve', 'Climatisation', 'Alarme', 'Stores electriques', 'Parking'],
    images: ['/images/property-7.jpg'],
    featured: false,
    createdAt: '2025-07-18',
  },
  {
    id: 'villa-hammamet',
    title: { fr: 'Villa pieds dans l\'eau Hammamet', ar: 'فيلا على الشاطئ حمامات' },
    location: { fr: 'Hammamet, Nabeul', ar: 'حمامات، نابل' },
    type: 'villa',
    status: 'sale',
    price: 3200000,
    priceUnit: 'total',
    surface: 480,
    rooms: 10,
    bedrooms: 6,
    bathrooms: 5,
    description: {
      fr: 'Exceptionnelle villa contemporaine de 480 m2 pieds dans l\'eau a Hammamhet. Acces direct a une plage privee. Villa composee d\'un vaste salon, salle a manger, cuisine professionnelle, 6 suites avec terrasse privative, home cinema, salle de sport, hammam. Exterieur : piscine a debordement, pool house, jardin paysager d\'1 hectare avec acces mer. Garage 4 voitures. Securite 24h/24.',
      ar: 'فيلا معاصرة استثنائية بمساحة 480 متر مربع مباشرة على البحر بحمامات. وصول مباشر إلى شاطئ خاص. الفيلا تتكون من صالون واسع، غرفة طعام، مطبخ احترافي، 6 أجنحة مع تراس خاص، سينما منزلية، صالة رياضية، حمام بخار. الخارج: مسبح لا متناهي، بيت المسبح، حديقة منسقة بمساحة هكتار مع وصول إلى البحر. مرآب 4 سيارات. أمن 24/24.'
    },
    amenities: ['Plage privee', 'Piscine', 'Pool house', 'Home cinema', 'Fitness', 'Hammam', 'Jardin', 'Garage', 'Securite 24/7'],
    images: ['/images/property-8.jpg', '/images/hero-3.jpg'],
    featured: true,
    virtualTourUrl: 'https://my.matterport.com/show/?m=virtual-tour-demo',
    createdAt: '2025-06-30',
  },
  {
    id: 'appartement-ariana',
    title: { fr: 'Appartement S+2 Residence neuve Ariana', ar: 'شقة S+2 إقامة جديدة بأريانة' },
    location: { fr: 'Ariana, Tunis', ar: 'أريانة، تونس' },
    type: 'apartment',
    status: 'sale',
    price: 385000,
    priceUnit: 'total',
    surface: 110,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    description: {
      fr: 'Bel appartement S+2 de 110 m2 dans une nouvelle residence a Ariana. Salon spacieux avec balcon, cuisine equipee moderne, 2 chambres avec placards integres, salle de bain avec baignoire. Prestations : chauffage central, double vitrage, videophone, ascenseur. Residence securisee avec parking souterrain, jardin et aire de jeux pour enfants. Proche de toutes commodites.',
      ar: 'شقة S+2 بمساحة 110 متر مربع في إقامة جديدة بأريانة. صالون فسيح مع شرفة، مطبخ مجهز حديث، غرفتا نوم مع خزائن مدمجة، حمام ببانيو. تشطيبات: تدفئة مركزية، زجاج مزدوج، هاتف بالفيديو، مصعد. إقامة آمنة مع موقف سيارات تحت الأرض، حديقة ومنطقة ألعاب للأطفال. بالقرب من جميع المرافق.'
    },
    amenities: ['Balcon', 'Parking', 'Jardin', 'Ascenseur', 'Chauffage central', 'Double vitrage', 'Aire de jeux'],
    images: ['/images/property-9.jpg'],
    featured: false,
    createdAt: '2025-10-08',
  },
  {
    id: 'entrepot-charguia',
    title: { fr: 'Entrepot logistique Zone Charguia', ar: 'مستودع لوجستي منطقة الشرقية' },
    location: { fr: 'Zone industrielle Charguia, Tunis', ar: 'المنطقة الصناعية الشرقية، تونس' },
    type: 'commercial',
    status: 'rent',
    price: 12000,
    priceUnit: 'month',
    surface: 2500,
    rooms: 5,
    bedrooms: 0,
    bathrooms: 4,
    description: {
      fr: 'Entrepot logistique de 2500 m2 en zone industrielle Charguia 2. Hauteur sous plafond de 10m, quais de dechargement avec niveleurs, portes sectionnelles, sol industriel anti-poussiere. Bureaux de 200 m2 climatises avec sanitaires. Securite incendie, eclairage LED, camera de surveillance. Acces poids lourds. Zone franche a proximite. Ideal pour distribution, e-commerce ou stockage.',
      ar: 'مستودع لوجستي بمساحة 2500 متر مربع في المنطقة الصناعية الشرقية 2. سقف بارتفاع 10 أمتار، رصيف تفريغ مع منصات توازن، أبواب سيكشنال، أرضية صناعية مضادة للغبار. مكاتب بمساحة 200 متر مربع مكيفة مع مرافق صحية. أمن ضد الحريق، إضاءة LED، كاميرات مراقبة. وصول مركبات ثقيلة. منطقة حرة بالقرب. مثالي للتوزيع، التجارة الإلكترونية أو التخزين.'
    },
    amenities: ['Quais dechargement', 'Bureaux', 'Climatisation', 'Securite incendie', 'LED', 'Surveillance', 'Acces poids lourds'],
    images: ['/images/property-10.jpg'],
    featured: false,
    createdAt: '2025-05-12',
  },
  {
    id: 'terrain-lot3-hammamet-nord',
    title: { fr: 'Terrain Constructible Lot N°3 - Hammamet Nord', ar: 'أرض قابلة للبناء القطعة رقم 3 - حمامات الشمال' },
    location: { fr: 'Hammamet Nord, pres Hotels La Badira & Le Sultan, Nabeul', ar: 'حمامات الشمال، بالقرب من فنادق لاباديرا والسلطان، نابل' },
    type: 'land',
    status: 'sale',
    price: 1297600,
    priceUnit: 'total',
    surface: 811,
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
    description: {
      fr: 'Terrain constructible de 811 m2, Lot N°3, situe a Hammamet Nord a proximite immediate des hotels La Badira et Le Sultan. Plan de partage a l\'amiable disponible. Superficie : 811 m2. Prix au m2 : 1600 DT. Signature du bon de visite obligatoire. Agence Agrabee N°1454. Contact : +216 25 900 448.',
      ar: 'أرض قابلة للبناء بمساحة 811 متر مربع، القطعة رقم 3، تقع في حمامات الشمال بالقرب من فنادق لاباديرا والسلطان. خطة تقسيم ودية متاحة. المساحة: 811 متر مربع. السعر للمتر المربع: 1600 د.ت. توقيع بطاقة الزيارة إلزامي. وكالة معتمدة رقم 1454. هاتف: 900 448 25 216+.'
    },
    amenities: ['Plan de partage dispo', 'Bon de visite obligatoire', 'Proche hotels La Badira & Le Sultan', 'Zone urbanisee'],
    images: ['/images/property-5.jpg'],
    featured: true,
    createdAt: '2026-06-01',
  },
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
