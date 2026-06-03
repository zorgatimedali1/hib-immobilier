import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

const imageFolder = path.resolve(__dirname, '../../../app/public/images');

const statusMap: Record<string, string> = {
  sale: 'a_vendre',
  rent: 'a_louer',
};

const typeMap: Record<string, string> = {
  penthouse: 'appartement',
  apartment: 'appartement',
  villa: 'villa',
  land: 'terrain',
  commercial: 'local_commercial',
  duplex: 'appartement',
};

const properties = [
  {
    id: 'penthouse-les-jardins',
    slug: 'penthouse-les-jardins',
    status: 'sale',
    type: 'penthouse',
    price: 2850000,
    total_area: 420,
    location_fr: 'Les Jardins de Carthage, Tunis',
    location_ar: 'حدائق قرطاج، تونس',
    title_fr: 'Penthouse Les Jardins de Carthage',
    title_ar: 'بنتهاوس حدائق قرطاج',
    description_fr: 'Somptueux penthouse de 420 m2 offrant une vue panoramique sur toute la ville de Tunis. Composé de 4 suites parentales, d\'un vaste salon avec double hauteur sous plafond, d\'une cuisine equipee avec cellier, et d\'une terrasse de 150 m2 avec piscine privee. Prestations haut de gamme : marbre importe, domotique, climatisation centralisee, 3 places de parking et 2 caves. Residence securisee avec gardien, ascenseur privatif et jardins paysagers.',
    description_ar: 'بنتهاوس فاخر بمساحة 420 متر مربع مع إطلالة بانورامية على مدينة تونس. يتكون من 4 أجنحة رئيسية، وصالون واسع بسقف مزدوج الارتفاع، ومطبخ مجهد بمخزن، وتراس بمساحة 150 متر مربع مع مسبح خاص. تشطيبات راقية: رخام مستورد، منزل ذكي، تكييف مركزي، 3 مواقف سيارات وقاعتين. إقامة آمنة مع حارس، مصعد خاص وحدائق منسقة.',
    virtual_tour_url: 'https://my.matterport.com/show/?m=virtual-tour-demo',
    is_featured: true,
    amenities: ['Piscine', 'Terrasse', 'Vue panoramique', 'Parking', 'Cave', 'Ascenseur', 'Gardien', 'Climatisation', 'Domotique'],
    images: ['property-1.jpg', 'hero-1.jpg', 'property-6.jpg'],
    createdAt: '2025-11-15',
  },
  {
    id: 'villa-sidi-bou-said',
    slug: 'villa-sidi-bou-said',
    status: 'sale',
    type: 'villa',
    price: 1950000,
    total_area: 350,
    location_fr: 'Sidi Bou Said, Tunis',
    location_ar: 'سيدي بو سعيد، تونس',
    title_fr: 'Villa traditionnelle Sidi Bou Said',
    title_ar: 'فيلا تقليدية سيدي بو سعيد',
    description_fr: 'Magnifique villa d\'architecte de style neo-mediterraneen dans le prestigieux village de Sidi Bou Said. 350 m2 habitable sur un terrain de 800 m2 avec jardin paysager, patio interieur avec fontaine et terrasse vue mer. 5 chambres dont 2 suites, salon marocain, salle a manger, cuisine professionnelle. Materiaux nobles : zellige, tadlakt, fer forge. Proximite immediate du centre village et de la plage.',
    description_ar: 'فيلا معمارية رائعة على الطراز المتوسطي الحديث في قرية سيدي بو سعيد المرموقة. 350 متر مربع مساحة قابلة للسكنى على أرض 800 متر مربع مع حديقة منسقة، وفناء داخلي بنافورة وتراس بإطلالة على البحر. 5 غرف نوم منها 2 جناح، وصالون مغربي، وغرفة طعام، ومطبخ احترافي. مواد نبيلة: زليج، تدلاكت، حديد مطاوع. بالقرب من مركز القرية والشاطئ.',
    virtual_tour_url: null,
    is_featured: true,
    amenities: ['Jardin', 'Terrasse vue mer', 'Patio', 'Fontaine', 'Salon marocain', 'Parking', 'Cheminee', 'Cave'],
    images: ['property-2.jpg', 'hero-3.jpg'],
    createdAt: '2025-10-20',
  },
  {
    id: 'bureau-centre-urbain',
    slug: 'bureau-centre-urbain',
    status: 'rent',
    type: 'commercial',
    price: 8500,
    total_area: 280,
    location_fr: 'Centre Urbain Nord, Tunis',
    location_ar: 'المركز الحضري الشمالي، تونس',
    title_fr: 'Open space Centre Urbain Nord',
    title_ar: 'مساحة مفتوحة المركز الحضري الشمالي',
    description_fr: 'Superbe espace de bureaux de 280 m2 en plein coeur du Centre Urbain Nord. Open space modulable avec 4 bureaux individuels, salle de reunion vitree, reception, kitchenette et 2 sanitaires. Prestations de qualite : faux plafond avec LED, climatisation VRV, baies vitrees, double vitrage, systeme d\'alarme. Immeuble de standing avec ascenseur, parking souterrain et conciergerie. Ideal pour siege social ou startup.',
    description_ar: 'مساحة مكاتب رائعة بمساحة 280 متر مربع في قلب المركز الحضري الشمالي. مساحة مفتوحة قابلة للتعديل مع 4 مكاتب فردية، وغرفة اجتماعات زجاجية، واستقبال، ومطبخ صغير وحمامين. تشطيبات عالية الجودة: سقف معلق مع إضاءة LED، تكييف VRV، واجهات زجاجية، زجاج مزدوج، نظام إنذار. مبنى راقٍ مع مصف، موقف سيارات تحت الأرض وخدمة استقبال. مثالي لمقر شركة أو شركة ناشئة.',
    virtual_tour_url: null,
    is_featured: true,
    amenities: ['Open space', 'Salle de reunion', 'Reception', 'Kitchenette', 'Climatisation', 'Ascenseur', 'Parking', 'Alarme'],
    images: ['property-3.jpg'],
    createdAt: '2025-12-01',
  },
  {
    id: 'appartement-la-marsa',
    slug: 'appartement-la-marsa',
    status: 'sale',
    type: 'apartment',
    price: 720000,
    total_area: 165,
    location_fr: 'La Marsa, Tunis',
    location_ar: 'المرسى، تونس',
    title_fr: 'Appartement S+3 Vue Mer La Marsa',
    title_ar: 'شقة S+3 إطلالة بحر المرسى',
    description_fr: 'Bel appartement S+3 de 165 m2 dans une residence neuve a La Marsa. Triple exposition avec vue mer depuis le salon et les chambres. Sejour de 45 m2 donnant sur une terrasse de 20 m2, cuisine americaine equipee, 3 chambres avec placards dont une suite parentale avec dressing et salle d\'eau. 2 garages en sous-sol. Residence avec piscine commune, jardin et gardien.',
    description_ar: 'شقة S+3 رائعة بمساحة 165 متر مربع في إقامة جديدة بالمرسى. إطلالات ثلاثية مع منظر للبحر من الصالون والغرف. صالون بمساحة 45 متر مربع يفتح على تراس بمساحة 20 متر مربع، مطبخ أمريكي مجهز، 3 غرف نوم مع خزائن منها جناح رئيسي مع غرفة ملابس وحمام. موقفان للسيارات في الطابق السفلي. إقامة مع مسبح مشترك، حديقة وحارس.',
    virtual_tour_url: null,
    is_featured: false,
    amenities: ['Vue mer', 'Terrasse', 'Piscine', 'Parking', 'Dressing', 'Climatisation', 'Gardien', 'Ascenseur'],
    images: ['property-4.jpg', 'property-6.jpg'],
    createdAt: '2025-09-10',
  },
  {
    id: 'terrain-hammamet',
    slug: 'terrain-hammamet',
    status: 'sale',
    type: 'land',
    price: 450000,
    total_area: 1500,
    location_fr: 'Hammamet Sud, Nabeul',
    location_ar: 'حمامات الجنوب، نابل',
    title_fr: 'Terrain constructible Hammamet Sud',
    title_ar: 'أرض قابلة للبناء حمامات الجنوب',
    description_fr: 'Terrain de 1500 m2 en zone urbaine constructible a Hammamet Sud, a 800m de la plage. Le terrain est viabilise (eau, electricite, gaz, telephone) et clos de murs. Permis de construire accepte pour une villa de 400 m2. Vue degagee sur la mer et les collines environnantes. Acces direct par route goudronnee. Cadastre en regle.',
    description_ar: 'أرض بمساحة 1500 متر مربع في منطقة حضرية قابلة للبناء بحمامات الجنوب، على بعد 800 متر من الشاطئ. الأرض مجهزة (ماء، كهرباء، غاز، هاتف) ومسورة. رخصة بناء مقبولة لفيلا بمساحة 400 متر مربع. إطلالة مفتوحة على البحر والتلال المحيطة. وصول مباشر عبر طريق معبد. سجل عقاري منتظم.',
    virtual_tour_url: null,
    is_featured: false,
    amenities: ['Viable', 'Clos', 'Vue mer', 'Acces route', 'Permis de construire'],
    images: ['property-5.jpg'],
    createdAt: '2025-08-05',
  },
  {
    id: 'duplex-gammarth',
    slug: 'duplex-gammarth',
    status: 'rent',
    type: 'duplex',
    price: 5500,
    total_area: 220,
    location_fr: 'Gammarth, Tunis',
    location_ar: 'جالطة، تونس',
    title_fr: 'Duplex haut standing Gammarth',
    title_ar: 'دوبلكس راقي بجالطة',
    description_fr: 'Splendide duplex de 220 m2 dans une residence de grand standing a Gammarth. Rez-de-chaussee : salon double, salle a manger, cuisine equipee, chambre avec salle d\'eau, terrasse et jardin privatif. Etage : 2 suites parentales avec dressing et salle de bain, balcon. Prestations luxueuses : parquets en chene, marbre de Carrare, cuisine Bulthaup, home cinema. Residence avec piscine, tennis, salle de fitness et spa.',
    description_ar: 'دوبلكس رائع بمساحة 220 متر مربع في إقامة فاخرة بجالطة. الطابق الأرضي: صالون مزدوج، غرفة طعام، مطبخ مجهز، غرفة نوم مع حمام، تراس وحديقة خاصة. الطابق العلوي: جناحان رئيسيان مع غرفة ملابس وحمام، شرفة. تشطيبات فاخرة: باركيه بلوط، رخام كارارا، مطبخ بولتوب، سينما منزلية. إقامة مع مسبح، ملعب تنس، صالة رياضية وسبا.',
    virtual_tour_url: null,
    is_featured: false,
    amenities: ['Jardin privatif', 'Terrasse', 'Piscine', 'Tennis', 'Spa', 'Fitness', 'Parking', 'Home cinema', 'Dressing'],
    images: ['property-6.jpg', 'hero-1.jpg'],
    createdAt: '2025-11-25',
  },
  {
    id: 'local-commercial-lac',
    slug: 'local-commercial-lac',
    status: 'rent',
    type: 'commercial',
    price: 4200,
    total_area: 120,
    location_fr: 'Le Lac, Tunis',
    location_ar: 'البحيرة، تونس',
    title_fr: 'Local commercial Le Lac Tunis',
    title_ar: 'محلات تجارية بحيرة تونس',
    description_fr: 'Local commercial de 120 m2 en emplacement numero 1 au Lac de Tunis. Belle vitrine de 8m de lineraire facade, hauteur sous plafond de 4m. Surface de vente de 90 m2, reserve de 20 m2, sanitaire. Climatisation centrale, alarme, stores electriques. Forte visibilite et passage. Parking facile. Ideal pour boutique, showroom ou concept store.',
    description_ar: 'محل تجاري بمساحة 120 متر مربع في موقع متميز رقم 1 ببحيرة تونس. واجهة زجاجية جميلة بعرض 8 أمتار، وسقف بارتفاع 4 أمتار. مساحة بيع 90 متر مربع، مخزن 20 متر مربع، حمام. تكييف مركزي، إنذار، ستائر كهربائية. رؤية وحركة مرور قوية. موقف سيارات سهل. مثالي لمتجر، صالة عرض أو متجر مفاهيمي.',
    virtual_tour_url: null,
    is_featured: false,
    amenities: ['Vitrine', 'Reserve', 'Climatisation', 'Alarme', 'Stores electriques', 'Parking'],
    images: ['property-7.jpg'],
    createdAt: '2025-07-18',
  },
  {
    id: 'villa-hammamet',
    slug: 'villa-hammamet',
    status: 'sale',
    type: 'villa',
    price: 3200000,
    total_area: 480,
    location_fr: 'Hammamet, Nabeul',
    location_ar: 'حمامات، نابل',
    title_fr: "Villa pieds dans l'eau Hammamet",
    title_ar: 'فيلا على الشاطئ حمامات',
    description_fr: 'Exceptionnelle villa contemporaine de 480 m2 pieds dans l\'eau a Hammamhet. Acces direct a une plage privee. Villa composee d\'un vaste salon, salle a manger, cuisine professionnelle, 6 suites avec terrasse privative, home cinema, salle de sport, hammam. Exterieur : piscine a debordement, pool house, jardin paysager d\'1 hectare avec acces mer. Garage 4 voitures. Securite 24h/24.',
    description_ar: 'فيلا معاصرة استثنائية بمساحة 480 متر مربع مباشرة على البحر بحمامات. وصول مباشر إلى شاطئ خاص. الفيلا تتكون من صالون واسع، غرفة طعام، مطبخ احترافي، 6 أجنحة مع تراس خاص، سينما منزلية، صالة رياضية، حمام بخار. الخارج: مسبح لا متناهي، بيت المسبح، حديقة منسقة بمساحة هكتار مع وصول إلى البحر. مرآب 4 سيارات. أمن 24/24.',
    virtual_tour_url: 'https://my.matterport.com/show/?m=virtual-tour-demo',
    is_featured: true,
    amenities: ['Plage privee', 'Piscine', 'Pool house', 'Home cinema', 'Fitness', 'Hammam', 'Jardin', 'Garage', 'Securite 24/7'],
    images: ['property-8.jpg', 'hero-3.jpg'],
    createdAt: '2025-06-30',
  },
  {
    id: 'appartement-ariana',
    slug: 'appartement-ariana',
    status: 'sale',
    type: 'apartment',
    price: 385000,
    total_area: 110,
    location_fr: 'Ariana, Tunis',
    location_ar: 'أريانة، تونس',
    title_fr: 'Appartement S+2 Residence neuve Ariana',
    title_ar: 'شقة S+2 إقامة جديدة بأريانة',
    description_fr: 'Bel appartement S+2 de 110 m2 dans une nouvelle residence a Ariana. Salon spacieux avec balcon, cuisine equipee moderne, 2 chambres avec placards integres, salle de bain avec baignoire. Prestations : chauffage central, double vitrage, videophone, ascenseur. Residence securisee avec parking souterrain, jardin et aire de jeux pour enfants. Proche de toutes commodites.',
    description_ar: 'شقة S+2 بمساحة 110 متر مربع في إقامة جديدة بأريانة. صالون فسيح مع شرفة، مطبخ مجهز حديث، غرفتا نوم مع خزائن مدمجة، حمام ببانيو. تشطيبات: تدفئة مركزية، زجاج مزدوج، هاتف بالفيديو، مصعد. إقامة آمنة مع موقف سيارات تحت الأرض، حديقة ومنطقة ألعاب للأطفال. بالقرب من جميع المرافق.',
    virtual_tour_url: null,
    is_featured: false,
    amenities: ['Balcon', 'Parking', 'Jardin', 'Ascenseur', 'Chauffage central', 'Double vitrage', 'Aire de jeux'],
    images: ['property-9.jpg'],
    createdAt: '2025-10-08',
  },
  {
    id: 'entrepot-charguia',
    slug: 'entrepot-charguia',
    status: 'rent',
    type: 'commercial',
    price: 12000,
    total_area: 2500,
    location_fr: 'Zone industrielle Charguia, Tunis',
    location_ar: 'المنطقة الصناعية الشرقية، تونس',
    title_fr: 'Entrepot logistique Zone Charguia',
    title_ar: 'مستودع لوجستي منطقة الشرقية',
    description_fr: 'Entrepot logistique de 2500 m2 en zone industrielle Charguia 2. Hauteur sous plafond de 10m, quais de dechargement avec niveleurs, portes sectionnelles, sol industriel anti-poussiere. Bureaux de 200 m2 climatises avec sanitaires. Securite incendie, eclairage LED, camera de surveillance. Acces poids lourds. Zone franche a proximite. Ideal pour distribution, e-commerce ou stockage.',
    description_ar: 'مستودع لوجستي بمساحة 2500 متر مربع في المنطقة الصناعية الشرقية 2. سقف بارتفاع 10 أمتار، رصيف تفريغ مع منصات توازن، أبواب سيكشنال، أرضية صناعية مضادة للغبار. مكاتب بمساحة 200 متر مربع مكيفة مع مرافق صحية. أمن ضد الحريق، إضاءة LED، كاميرات مراقبة. وصول مركبات ثقيلة. منطقة حرة بالقرب. مثالي للتوزيع، التجارة الإلكترونية أو التخزين.',
    virtual_tour_url: null,
    is_featured: false,
    amenities: ['Quais dechargement', 'Bureaux', 'Climatisation', 'Securite incendie', 'LED', 'Surveillance', 'Acces poids lourds'],
    images: ['property-10.jpg'],
    createdAt: '2025-05-12',
  },
  {
    id: 'terrain-lot3-hammamet-nord',
    slug: 'terrain-lot3-hammamet-nord',
    status: 'sale',
    type: 'land',
    price: 1297600,
    total_area: 811,
    location_fr: 'Hammamet Nord, pres Hotels La Badira & Le Sultan, Nabeul',
    location_ar: 'حمامات الشمال، بالقرب من فنادق لاباديرا والسلطان، نابل',
    title_fr: 'Terrain Constructible Lot N°3 - Hammamet Nord',
    title_ar: 'أرض قابلة للبناء القطعة رقم 3 - حمامات الشمال',
    description_fr: 'Terrain constructible de 811 m2, Lot N°3, situe a Hammamet Nord a proximite immediate des hotels La Badira et Le Sultan. Plan de partage a l\'amiable disponible. Superficie : 811 m2. Prix au m2 : 1600 DT. Signature du bon de visite obligatoire. Agence Agrabee N°1454. Contact : +216 25 900 448.',
    description_ar: 'أرض قابلة للبناء بمساحة 811 متر مربع، القطعة رقم 3، تقع في حمامات الشمال بالقرب من فنادق لاباديرا والسلطان. خطة تقسيم ودية متاحة. المساحة: 811 متر مربع. السعر للمتر المربع: 1600 د.ت. توقيع بطاقة الزيارة إلزامي. وكالة معتمدة رقم 1454. هاتف: 900 448 25 216+.',
    virtual_tour_url: null,
    is_featured: true,
    amenities: ['Plan de partage dispo', 'Bon de visite obligatoire', 'Proche hotels La Badira & Le Sultan', 'Zone urbanisee'],
    images: ['property-5.jpg'],
    createdAt: '2026-06-01',
  },
];

async function uploadImage(propertyId: string, filename: string, order: number) {
  const filePath = path.join(imageFolder, filename);
  const file = await fs.readFile(filePath);
  const storagePath = `properties/${propertyId}/${Date.now()}-${filename}`;

  const { error: uploadError } = await supabase.storage
    .from('property-media')
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from('property-media').getPublicUrl(storagePath);
  if (!data || !data.publicUrl) {
    throw new Error(`Failed to retrieve public URL for ${storagePath}`);
  }

  const { error: insertError } = await supabase
    .from('property_images')
    .insert([
      {
        property_id: propertyId,
        image_url: data.publicUrl,
        display_order: order,
        is_cover: order === 1,
      },
    ]);

  if (insertError) {
    throw insertError;
  }

  return data.publicUrl;
}

async function seed() {
  console.log('Starting Supabase seed...');

  for (const property of properties) {
    const payload = {
      slug: property.slug,
      status: statusMap[property.status] ?? 'a_vendre',
      type: typeMap[property.type] ?? 'appartement',
      price: property.price,
      price_per_meter: null,
      total_area: property.total_area,
      typology: null,
      location_fr: property.location_fr,
      location_ar: property.location_ar,
      title_fr: property.title_fr,
      title_ar: property.title_ar,
      description_fr: property.description_fr,
      description_ar: property.description_ar,
      virtual_tour_url: property.virtual_tour_url,
      is_featured: property.is_featured,
      amenities: property.amenities,
      created_at: new Date(property.createdAt).toISOString(),
    };

    console.log(`Creating property ${property.slug}...`);
    const { data: createdProperty, error: createError } = await supabase
      .from('properties')
      .upsert([payload], { onConflict: 'slug' })
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    const propertyId = createdProperty.id;
    console.log(`  property id = ${propertyId}`);

    for (let index = 0; index < property.images.length; index += 1) {
      const filename = property.images[index];
      console.log(`  uploading image ${filename}...`);
      await uploadImage(propertyId, filename, index + 1);
    }
  }

  console.log('Supabase seed complete.');
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
