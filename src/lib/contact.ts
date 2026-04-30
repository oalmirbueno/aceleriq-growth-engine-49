export const WHATSAPP_NUMBER = "5541997483429";
export const WHATSAPP_DISPLAY = "(41) 99748-3429";
export const EMAIL = "contato@aceleriq.com.br";
export const INSTAGRAM_HANDLE = "@aceleriq";
export const INSTAGRAM_URL = "https://instagram.com/aceleriq";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Aceleriq e quero conversar sobre o Diagnóstico Estratégico Gratuito.";
