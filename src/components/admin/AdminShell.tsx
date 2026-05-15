import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { verifyAdminPassword } from "@/lib/backlinks.functions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  Search,
  Users,
  Link2,
  Lock,
  LogOut,
  ScanSearch,
  Sparkles,
} from "lucide-react";

const PASSWORD_KEY = "aceleriq_admin_password";

interface AdminCtx {
  password: string;
  logout: () => void;
}

const Ctx = createContext<AdminCtx | null>(null);

export function useAdmin(): AdminCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdmin precisa estar dentro de AdminShell");
  return v;
}

const NAV = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/conteudo", label: "Conteúdo IA", icon: Sparkles },
  { to: "/admin/seo", label: "SEO", icon: Search },
  { to: "/admin/indexacao", label: "Indexação", icon: ScanSearch },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/backlinks", label: "Backlinks", icon: Link2 },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const [password, setPassword] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const verify = useServerFn(verifyAdminPassword);
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.sessionStorage.getItem(PASSWORD_KEY);
    if (saved) setPassword(saved);
  }, []);

  const verifyMut = useMutation({
    mutationFn: async (pw: string) => verify({ data: { password: pw } }),
    onSuccess: (_data, pw) => {
      window.sessionStorage.setItem(PASSWORD_KEY, pw);
      setPassword(pw);
      toast.success("Bem-vindo de volta.");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Falha ao autenticar."),
  });

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(PASSWORD_KEY);
    setPassword(null);
  }, []);

  if (!password) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm border border-white/10 bg-white/[0.02] p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-4 w-4 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Aceleriq · Admin
            </span>
          </div>
          <h1 className="text-2xl font-display font-semibold mb-2">Painel restrito</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Informe a senha de administrador para continuar.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) verifyMut.mutate(input.trim());
            }}
            className="space-y-3"
          >
            <Input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="••••••••"
              autoFocus
            />
            <Button type="submit" className="w-full" disabled={verifyMut.isPending}>
              {verifyMut.isPending ? "Verificando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Ctx.Provider value={{ password, logout }}>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 border-r border-white/10 bg-background/80 flex-col sticky top-0 h-screen">
          <div className="px-5 py-6 border-b border-white/10">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-1">
              Aceleriq
            </div>
            <div className="text-sm font-display font-semibold">Painel admin</div>
          </div>
          <nav className="flex-1 py-4 px-2 space-y-0.5">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-white/10 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              ← Voltar ao site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-3 w-3" /> Sair
            </button>
          </div>
        </aside>

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 inset-x-0 z-30 bg-background/95 backdrop-blur border-b border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-xs whitespace-nowrap px-3 py-1.5 ${
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <main className="flex-1 min-w-0 pt-14 md:pt-0">{children}</main>
      </div>
    </Ctx.Provider>
  );
}
