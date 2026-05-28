import type { FeedCategory } from "./blog-feeds";
import coverIa from "@/assets/blog-cover-agentes-ia.jpg";
import coverAuto from "@/assets/blog-cover-whatsapp-automacao.jpg";
import coverTrafego from "@/assets/blog-cover-trafego-curitiba.jpg";
import coverMkt from "@/assets/blog-cover-metodo-acelera.jpg";
import coverVendas from "@/assets/blog-cover-maquina-aquisicao.jpg";
import coverCrescimento from "@/assets/hero-ia.jpg";

const MAP: Record<FeedCategory, string> = {
  ia_automacao: coverIa,
  marketing: coverMkt,
  trafego: coverTrafego,
  comercial: coverVendas,
  locais: coverAuto,
  processos: coverCrescimento,
};

export function categoryCover(category: FeedCategory): string {
  return MAP[category] || coverIa;
}
