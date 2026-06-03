import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';
import api from '@/lib/api';
import type { PropertyRecord, PropertyStatus } from '@/types';
import { STATUS_LABELS, TYPE_LABELS } from '@/types';
import DataTable from '@/components/ui/DataTable';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ConfirmDialog from '@/components/ConfirmDialog';

const statusBadge: Record<PropertyStatus, 'magenta' | 'leaf' | 'red' | 'amber'> = {
  a_vendre: 'magenta',
  a_louer: 'amber',
  vendu: 'red',
  loue: 'leaf',
};

export default function Properties() {
  const { lang } = useLanguage();
  const [properties, setProperties] = useState<PropertyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [deleteTarget, setDeleteTarget] = useState<PropertyRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProperties = async () => {
    try {
      const { data } = await api.get('/properties');
      setProperties(data.data ?? []);
    } catch {
      toast.error(t('properties.loadError', lang));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => {
    const arr = [...properties];
    arr.sort((a, b) => {
      const aVal = (a as any)[sortKey] ?? '';
      const bVal = (b as any)[sortKey] ?? '';
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [properties, sortKey, sortDir]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/properties/${deleteTarget.id}`);
      toast.success(t('properties.deleted', lang));
      setDeleteTarget(null);
      fetchProperties();
    } catch {
      toast.error(t('properties.deleteError', lang));
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: 'image',
      header: '',
      render: (p: PropertyRecord) => (
        p.property_images?.[0]
          ? <img src={p.property_images[0].image_url} alt="" className="size-10 rounded-lg object-cover" />
          : <div className="size-10 rounded-lg bg-[#F1F5F9]" />
      ),
    },
    {
      key: 'title_fr',
      header: t('properties.headerTitle', lang),
      sortable: true,
      render: (p: PropertyRecord) => (
        <div>
          <p className="text-sm font-medium text-[#0F172A]">{p.title_fr}</p>
          <p className="text-xs text-[#64748B]">{p.location_fr}</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: t('properties.headerType', lang),
      sortable: true,
      render: (p: PropertyRecord) => (
        <span className="text-sm text-[#475569]">{TYPE_LABELS[p.type]}</span>
      ),
    },
    {
      key: 'status',
      header: t('properties.headerStatus', lang),
      sortable: true,
      render: (p: PropertyRecord) => (
        <Badge variant={statusBadge[p.status]}>{STATUS_LABELS[p.status]}</Badge>
      ),
    },
    {
      key: 'price',
      header: t('properties.headerPrice', lang),
      sortable: true,
      render: (p: PropertyRecord) => (
        <span className="text-sm font-semibold text-[#0F172A]">
          {p.price ? `${p.price.toLocaleString()} TND` : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      render: (p: PropertyRecord) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/dashboard/properties/${p.id}/edit`}
            className="size-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:text-magenta transition-colors"
          >
            <Pencil size={14} />
          </Link>
          <button
            type="button"
            onClick={() => setDeleteTarget(p)}
            className="size-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">{t('properties.title', lang)}</h1>
          <p className="text-sm text-[#64748B] mt-1">{properties.length} {t('properties.count', lang)}</p>
        </div>
        <Link to="/dashboard/properties/new">
          <Button>
            <Plus size={16} />
            {t('properties.add', lang)}
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={sorted}
        keyExtractor={(p) => p.id}
        onSort={handleSort}
        sortKey={sortKey}
        sortDir={sortDir}
        loading={loading}
        loadingText={t('datatable.loading', lang)}
        emptyText={t('datatable.empty', lang)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={t('properties.deleteTitle', lang)}
        message={`${t('properties.deleteConfirm', lang)} "${deleteTarget?.title_fr}" ? ${t('properties.deleteIrreversible', lang)}`}
        loading={deleting}
      />
    </div>
  );
}
