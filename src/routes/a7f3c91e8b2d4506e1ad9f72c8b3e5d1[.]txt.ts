import { createFileRoute } from "@tanstack/react-router";
import { INDEXNOW_KEY } from "@/lib/indexnow.server";

// Arquivo de verificação de propriedade do IndexNow.
// Servido em /a7f3c91e8b2d4506e1ad9f72c8b3e5d1.txt — conteúdo deve ser
// exatamente a chave (sem quebras de linha, sem aspas).

export const Route = createFileRoute("/a7f3c91e8b2d4506e1ad9f72c8b3e5d1.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(INDEXNOW_KEY, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        }),
    },
  },
});
