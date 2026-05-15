import type { FeedCategory } from "./blog-feeds";
import coverIa from "@/assets/blog-cover-ia.jpg";
import coverAuto from "@/assets/blog-cover-automacao.jpg";
import coverTrafego from "@/assets/blog-cover-trafego.jpg";
import coverMkt from "@/assets/blog-cover-marketing.jpg";
import coverVendas from "@/assets/blog-cover-vendas.jpg";
import coverCrescimento from "@/assets/blog-cover-crescimento.jpg";

const MAP: Record<FeedCategory, string> = {
  ia: coverIa,
  automacao: coverAuto,
  trafego: coverTrafego,
  marketing: coverMkt,
  vendas: coverVendas,
  crescimento: coverCrescimento,
};

export function categoryCover(category: FeedCategory): string {
  return MAP[category] ?? coverIa;
}
