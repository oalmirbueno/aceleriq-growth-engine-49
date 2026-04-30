import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
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
      <DialogContent className="max-w-lg overflow-hidden border-border bg-card p-0">
        <div className="relative p-7 md:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <span className="label-eyebrow flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            Diagnóstico · em ativação
          </span>

          <DialogHeader className="mt-3 space-y-2 text-left">
            <DialogTitle className="font-display text-2xl font-semibold leading-tight">
              Estamos calibrando a ferramenta inteligente.
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              Em poucos dias o Diagnóstico de Maturidade em Crescimento e IA
              entra no ar. Enquanto isso, fale direto com o time — você sai
              da conversa com 3 alavancas claras de crescimento.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Button
              asChild
              className="h-11 flex-1 rounded-md bg-primary text-[13px] font-semibold text-primary-foreground btn-interactive"
            >
              <a href={whatsappLink(msg)} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp · {WHATSAPP_DISPLAY}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 rounded-md border-border bg-transparent text-[13px] font-semibold hover:bg-card"
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
