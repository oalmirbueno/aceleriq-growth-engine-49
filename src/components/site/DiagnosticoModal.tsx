import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Sparkles } from "lucide-react";
import {
  EMAIL,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/contact";

export function DiagnosticoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const msg =
    "Olá! Quero fazer o Diagnóstico de Maturidade em Crescimento e IA da Aceleriq.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden border-border/60 bg-gradient-card p-0">
        <div className="relative p-6 md:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </span>
            <div>
              <DialogHeader className="space-y-1 text-left">
                <DialogTitle className="font-display text-xl">
                  Diagnóstico em ativação
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Estamos finalizando a calibração da ferramenta inteligente.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Em poucos dias o <span className="text-foreground">Diagnóstico de Maturidade
            em Crescimento e IA</span> entra no ar — uma análise de 12 perguntas que
            classifica seu estágio e entrega recomendações personalizadas.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Enquanto isso, fale direto com nosso time — você sai dessa conversa
            com 3 alavancas claras de crescimento.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 flex-1 rounded-full bg-gradient-cta font-semibold text-lime-foreground shadow-glow-lime hover:opacity-95"
            >
              <a href={whatsappLink(msg)} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 flex-1 rounded-full border-border bg-surface/60 font-semibold hover:bg-surface"
            >
              <a href={`mailto:${EMAIL}?subject=Diagnóstico%20Aceleriq`}>
                <Mail className="h-4 w-4" />
                E-mail
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
