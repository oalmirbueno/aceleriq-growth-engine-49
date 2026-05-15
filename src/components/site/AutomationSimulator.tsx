import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, RotateCw, MessageSquare, Sparkles, Database, Send, Webhook } from "lucide-react";

type NodeKind = "trigger" | "ia" | "crm" | "whatsapp";
type NodeDef = { kind: NodeKind; label: string; sub: string; Icon: any; color: string };

const PALETTE: NodeDef[] = [
  { kind: "trigger", label: "Gatilho", sub: "Form / Webhook / Lead novo", Icon: Webhook, color: "oklch(60% 0.2 250)" },
  { kind: "ia", label: "IA Qualificadora", sub: "GPT-5 · ICP A/B/C", Icon: Sparkles, color: "oklch(85% 0.2 145)" },
  { kind: "crm", label: "CRM", sub: "Pipedrive / HubSpot / RD", Icon: Database, color: "oklch(75% 0.16 65)" },
  { kind: "whatsapp", label: "WhatsApp", sub: "Mensagem personalizada", Icon: MessageSquare, color: "oklch(78% 0.18 155)" },
];

const SCRIPT: Record<NodeKind, string[]> = {
  trigger: ["✓ Lead capturado", "Origem: Meta Ads", "UTM: campanha-q4-frio"],
  ia: ["Analisando perfil...", "ICP: A · score 87/100", "Encaminhar para SDR sênior"],
  crm: ["Card criado · pipeline Inbound", "Tag: hot-lead", "Owner: Camila R."],
  whatsapp: ["Mensagem enviada às 14:02", "Resposta em 38s", "Reunião agendada terça 16h ✓"],
};

export function AutomationSimulator() {
  const [flow, setFlow] = useState<NodeKind[]>(["trigger", "ia", "crm", "whatsapp"]);
  const [active, setActive] = useState<number>(-1);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    for (let i = 0; i < flow.length; i++) {
      setActive(i);
      await new Promise((r) => setTimeout(r, 1100));
    }
    await new Promise((r) => setTimeout(r, 800));
    setRunning(false);
  };

  const reset = () => { setActive(-1); setRunning(false); };

  const addNode = (k: NodeKind) => { if (!running) setFlow((f) => [...f, k]); };
  const removeNode = (i: number) => { if (!running) setFlow((f) => f.filter((_, idx) => idx !== i)); };

  return (
    <section className="relative px-6 lg:px-16 py-20 md:py-28 border-t border-border/60 max-w-[1600px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
          ⚙ Sandbox
        </div>
        <div className="lg:col-span-10">
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
            Monte seu <em className="italic font-light text-primary">próprio fluxo</em>.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
            Adicione nós, clique em executar e veja a automação rodar ao vivo.
            Esse é exatamente o tipo de pipeline que entregamos em produção.
          </p>
        </div>
      </div>

      {/* Palette */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            ＋ Adicionar:
          </span>
          {PALETTE.map((p) => (
            <button
              key={p.kind}
              onClick={() => addNode(p.kind)}
              disabled={running}
              className="group inline-flex items-center gap-2 border border-border bg-card/40 px-3 py-1.5 text-[11px] uppercase tracking-widest hover:border-primary/60 hover:bg-card transition-all disabled:opacity-40"
            >
              <p.Icon className="h-3 w-3" style={{ color: p.color }} />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:ml-auto sm:flex-row sm:items-center">
          <button
            onClick={reset}
            disabled={running}
            className="inline-flex items-center justify-center gap-1.5 border border-border px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all disabled:opacity-40"
          >
            <RotateCw className="h-3 w-3" />
            Reset
          </button>
          <button
            onClick={run}
            disabled={running || flow.length === 0}
            className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:translate-y-0"
          >
            <Play className="h-3 w-3" />
            {running ? "Executando..." : "Executar"}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="relative min-h-[280px] overflow-hidden border border-border bg-card/20 p-6"
          style={{
            backgroundImage: "radial-gradient(oklch(100% 0 0 / 0.04) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-6">
            {flow.map((kind, i) => {
              const def = PALETTE.find((p) => p.kind === kind)!;
              const isActive = active === i;
              const isDone = active > i;
              return (
                <div key={i} className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
                  <motion.button
                    onClick={() => removeNode(i)}
                    whileHover={{ scale: 1.02 }}
                    animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                    transition={isActive ? { duration: 0.6, repeat: Infinity } : {}}
                    className="group relative flex w-full md:w-[180px] flex-col items-start gap-2 border bg-background/80 p-4 backdrop-blur-md transition-all"
                    style={{
                      borderColor: isActive || isDone ? def.color : "oklch(25% 0 0 / 0.8)",
                      boxShadow: isActive ? `0 0 24px ${def.color}` : "none",
                    }}
                    disabled={running}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-md"
                        style={{ background: `${def.color}22`, color: def.color }}
                      >
                        <def.Icon className="h-4 w-4" />
                      </div>
                      {isDone && (
                        <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: def.color }}>
                          ✓ ok
                        </span>
                      )}
                      {isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                            style={{ background: def.color }} />
                          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: def.color }} />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-[12px] font-bold uppercase tracking-wider text-foreground">
                        {def.label}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{def.sub}</div>
                    </div>
                    {!running && (
                      <span className="absolute -right-1.5 -top-1.5 hidden h-4 w-4 items-center justify-center rounded-full border border-border bg-background text-[10px] text-muted-foreground group-hover:flex md:flex">
                        ×
                      </span>
                    )}
                  </motion.button>
                  {i < flow.length - 1 && <Connector active={isDone || isActive} />}
                </div>
              );
            })}
            {flow.length === 0 && (
              <div className="w-full text-center font-mono text-xs uppercase tracking-widest text-muted-foreground/50 py-12">
                Adicione nós para construir seu fluxo
              </div>
            )}
          </div>
        </div>

        {/* Console */}
        <div className="border border-border bg-[#050505] p-4 font-mono text-[11px]">
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
            <span className="uppercase tracking-widest text-primary">// console</span>
            <span className="flex h-1.5 w-1.5">
              <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-primary opacity-60" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          </div>
          <div className="space-y-1.5 text-foreground/80">
            <AnimatePresence mode="popLayout">
              {flow.slice(0, Math.max(active + 1, 0)).map((k, i) => (
                <motion.div
                  key={`${k}-${i}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-0.5"
                >
                  <div className="text-primary">{`> step ${i + 1}: ${PALETTE.find(p => p.kind === k)?.label}`}</div>
                  {SCRIPT[k].map((line, j) => (
                    <div key={j} className="pl-3 text-foreground/70">{line}</div>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>
            {active === -1 && (
              <div className="text-muted-foreground/50">
                Aguardando execução…
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
        <Send className="h-3 w-3" />
        Versão simplificada do que rodamos em produção: n8n + GPT-5 + WhatsApp Business API + CRM
      </div>
    </section>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="relative h-px w-12 overflow-hidden bg-border">
      <motion.div
        animate={active ? { x: ["-100%", "100%"] } : { x: "-100%" }}
        transition={{ duration: 0.8, repeat: active ? Infinity : 0, ease: "linear" }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
}
