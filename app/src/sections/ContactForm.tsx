import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactForm() {
  const { t } = useI18n();
  const ref = useScrollReveal<HTMLDivElement>({ y: 30 });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleFormFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSending(false);
    setSent(true);
    toast.success(t('contact.form.success'));

    // Reset form
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const inputClass = 'w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] bg-white focus:border-magenta focus:ring-2 focus:ring-magenta/10 outline-none transition-all placeholder:text-[#94A3B8]';

  return (
    <section className="py-16 md:py-20 bg-lightalt">
      <div className="container-main">
        <div ref={ref} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-card p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">
              {t('contact.form.title')}
            </h2>

            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle size={48} className="text-leaf mb-4" />
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  {t('contact.form.success')}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormFieldChange}
                      required
                      className={inputClass}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormFieldChange}
                      required
                      className={inputClass}
                      placeholder="jean@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleFormFieldChange}
                      className={inputClass}
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      {t('contact.form.subject')} *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleFormFieldChange}
                      required
                      className={inputClass}
                      placeholder="Achat d'un appartement"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleFormFieldChange}
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-magenta hover:bg-magenta-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm uppercase tracking-wider py-4 rounded-lg transition-all duration-300"
                >
                  {sending ? (
                    <>
                      <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact.form.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
