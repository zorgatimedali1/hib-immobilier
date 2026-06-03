import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Save, ArrowLeft, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';
import api from '@/lib/api';
import { propertySchema } from '@/lib/validators';
import type { PropertyRecord, PropertyFormData, PropertyStatus, PropertyType } from '@/types';
import { STATUS_LABELS, TYPE_LABELS, AMENITY_OPTIONS } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ImageUploader from '@/components/ImageUploader';

const statusOptions = Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }));
const typeOptions = Object.entries(TYPE_LABELS).map(([value, label]) => ({ value, label }));

export default function PropertyForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEdit = !!id;

  const [form, setForm] = useState<PropertyFormData>({
    slug: '', status: 'a_vendre', type: 'appartement', price: '', total_area: '',
    typology: '', location_fr: '', location_ar: '', title_fr: '', title_ar: '',
    description_fr: '', description_ar: '', virtual_tour_url: '', is_featured: false, amenities: [],
  });
  const [existingImages, setExistingImages] = useState<PropertyRecord['property_images']>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [translatedAr, setTranslatedAr] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/properties/${id}`)
      .then(({ data }) => {
        const p: PropertyRecord = data.data ?? data;
        setForm({
          slug: p.slug,
          status: p.status,
          type: p.type,
          price: p.price?.toString() ?? '',
          total_area: p.total_area.toString(),
          typology: p.typology ?? '',
          location_fr: p.location_fr,
          location_ar: p.location_ar,
          title_fr: p.title_fr,
          title_ar: p.title_ar,
          description_fr: p.description_fr,
          description_ar: p.description_ar,
          virtual_tour_url: p.virtual_tour_url ?? '',
          is_featured: p.is_featured,
          amenities: p.amenities,
        });
        if (p.title_ar) setTranslatedAr(true);
        setExistingImages(p.property_images);
      })
      .catch(() => toast.error(t('form.loadError', lang)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (key: keyof PropertyFormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = propertySchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      toast.error(t('form.validationError', lang));
      return;
    }

    setSaving(true);
    const payload = {
      ...parsed.data,
      price: parsed.data.price ? Number(parsed.data.price) : null,
      total_area: Number(parsed.data.total_area),
      price_per_meter: null,
      virtual_tour_url: parsed.data.virtual_tour_url || null,
      typology: parsed.data.typology || null,
    };

    try {
      if (isEdit) {
        await api.put(`/properties/${id}`, payload);
        toast.success(t('form.updated', lang));
        navigate('/dashboard/properties');
      } else {
        const { data } = await api.post('/properties', payload);
        const newId = data.data?.id ?? data.id;
        toast.success(t('form.created', lang));
        setCreatedId(newId);
        setExistingImages([]);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
      setTranslatedAr(true);
    } catch {
      toast.error(t('form.saveError', lang));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-[#94A3B8]">{t('dashboard.loading', lang)}</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/dashboard/properties')}
            className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-magenta transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            {t('form.back', lang)}
          </button>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            {isEdit ? t('form.edit', lang) : t('form.add', lang)}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Slug & Status */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
          <h2 className="text-base font-semibold text-[#0F172A]">{t('form.general', lang)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="slug" label={t('form.slug', lang)} value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} error={errors.slug} />
            <Select
              id="status"
              label={t('form.status', lang)}
              options={statusOptions}
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value as PropertyStatus)}
              error={errors.status}
            />
            <Select
              id="type"
              label={t('form.type', lang)}
              options={typeOptions}
              value={form.type}
              onChange={(e) => handleChange('type', e.target.value as PropertyType)}
              error={errors.type}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="price" label={t('form.price', lang)} type="number" value={form.price} onChange={(e) => handleChange('price', e.target.value)} error={errors.price} />
            <Input id="total_area" label={t('form.area', lang)} type="number" value={form.total_area} onChange={(e) => handleChange('total_area', e.target.value)} error={errors.total_area} />
            <Input id="typology" label={t('form.typology', lang)} value={form.typology} onChange={(e) => handleChange('typology', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="virtual_tour_url" label={t('form.virtualTour', lang)} value={form.virtual_tour_url} onChange={(e) => handleChange('virtual_tour_url', e.target.value)} />
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="is_featured"
                checked={form.is_featured}
                onChange={(e) => handleChange('is_featured', e.target.checked)}
                className="size-4 rounded border-[#E2E8F0] text-magenta focus:ring-magenta"
              />
              <label htmlFor="is_featured" className="text-sm font-medium text-[#0F172A]">{t('form.featured', lang)}</label>
            </div>
          </div>
        </div>

        {/* Localized Titles & Locations - FR only + auto AR preview */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#0F172A]">{t('form.localization', lang)}</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-leaf/10 text-leaf text-xs font-medium">
              <Languages size={14} />
              Traduction AR automatique
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-magenta uppercase tracking-wide">{t('form.french', lang)}</p>
              <Input id="title_fr" label={t('form.titleFr', lang)} value={form.title_fr} onChange={(e) => handleChange('title_fr', e.target.value)} error={errors.title_fr} />
              <Input id="location_fr" label={t('form.locationFr', lang)} value={form.location_fr} onChange={(e) => handleChange('location_fr', e.target.value)} error={errors.location_fr} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-leaf uppercase tracking-wide" dir="rtl">{t('form.arabic', lang)}</p>
              <p className="text-sm text-[#94A3B8] border border-dashed border-[#E2E8F0] rounded-lg px-3 py-2.5 min-h-[2.5rem]" dir="rtl">
                {translatedAr ? form.title_ar || '—' : 'Traduit automatiquement après l\'enregistrement'}
              </p>
              <p className="text-sm text-[#94A3B8] border border-dashed border-[#E2E8F0] rounded-lg px-3 py-2.5 min-h-[2.5rem]" dir="rtl">
                {translatedAr ? form.location_ar || '—' : 'Traduit automatiquement après l\'enregistrement'}
              </p>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#0F172A]">{t('form.descriptions', lang)}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1.5 block">{t('form.descFr', lang)}</label>
              <textarea
                value={form.description_fr}
                onChange={(e) => handleChange('description_fr', e.target.value)}
                rows={5}
                className={`w-full px-3 py-2 rounded-lg border bg-white text-sm text-[#0F172A] resize-none focus:outline-none focus:ring-2 focus:ring-magenta ${errors.description_fr ? 'border-red-400' : 'border-[#E2E8F0]'}`}
              />
              {errors.description_fr && <span className="text-xs text-red-500">{errors.description_fr}</span>}
            </div>
            <div>
              <label className="text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1.5 block" dir="rtl">{t('form.descAr', lang)}</label>
              <textarea
                value={form.description_ar}
                readOnly
                rows={5}
                dir="rtl"
                placeholder="Traduit automatiquement après l'enregistrement"
                className="w-full px-3 py-2 rounded-lg border border-dashed border-[#E2E8F0] bg-[#FAFAFA] text-sm text-[#94A3B8] resize-none cursor-default"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
          <h2 className="text-base font-semibold text-[#0F172A]">{t('form.amenities', lang)}</h2>
          <div className="flex flex-wrap gap-2">
            {AMENITY_OPTIONS.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  form.amenities.includes(amenity)
                    ? 'bg-magenta text-white border-magenta'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-magenta/50'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
          <h2 className="text-base font-semibold text-[#0F172A]">{t('form.images', lang)}</h2>
          {isEdit ? (
            <ImageUploader propertyId={id!} existingImages={existingImages} onUploaded={() => window.location.reload()} />
          ) : createdId ? (
            <ImageUploader propertyId={createdId} onUploaded={() => window.location.reload()} />
          ) : (
            <p className="text-sm text-[#64748B]">{t('form.imagesLater', lang)}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-12">
          <Button variant="secondary" type="button" onClick={() => navigate('/dashboard/properties')}>
            {t('form.cancel', lang)}
          </Button>
          <Button type="submit" loading={saving}>
            <Save size={16} />
            {isEdit ? t('form.save', lang) : t('form.create', lang)}
          </Button>
        </div>
      </form>
    </div>
  );
}
