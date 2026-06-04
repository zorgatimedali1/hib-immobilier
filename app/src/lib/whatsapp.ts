const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/public`
  : '/api/public';

export function trackWhatsappClick(propertyId?: string | null) {
  const detected_lang = document.documentElement.lang || 'fr';
  const body: Record<string, string | null> = { detected_lang };
  if (propertyId) body.property_id = propertyId;

  fetch(`${API_BASE}/leads/whatsapp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export function openWhatsapp(propertyName?: string, propertyId?: string | null) {
  trackWhatsappClick(propertyId);

  const lang = document.documentElement.lang || 'fr';
  const messages: Record<string, string> = {
    fr: "Bonjour, je viens du site web Hibiscus Immobiliere et je suis interesse par l'annonce",
    ar: 'مرحباً، أتيت من موقع هيبيسكوس العقارية وأنا مهتم بالإعلان',
  };
  const baseMsg = messages[lang] || messages.fr;
  const text = propertyName ? `${baseMsg}: ${propertyName}` : baseMsg;
  const url = `https://wa.me/21625900448?text=${encodeURIComponent(text)}`;

  window.open(url, '_blank', 'noopener');
}
