import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }: ConfirmDialogProps) {
  const { lang } = useLanguage();

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-[#475569] mb-6">{message}</p>
      <div className="flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {t('dialog.cancel', lang)}
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {t('dialog.delete', lang)}
        </Button>
      </div>
    </Modal>
  );
}
