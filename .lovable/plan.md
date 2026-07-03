# Refactor de design — Aceleriq

Sistema mais leve, publicitário e organizado. Preto continua como âncora, mas deixa de ser fundo dominante. Cinza claro passa a comandar, verde vira sinal (não decoração).

## Direção aprovada
- **Paleta Grafite Suave**: `#0a0a0a` (âncora), `#2a2d31` (cinza escuro), `#e6e8eb` (cinza claro dominante), `#22c55e` (verde sinal)
- **Tipografia**: Space Grotesk (headings) + DM Sans (body)
- **Energia**: Agência Criativa — assimetria, escalas variadas, blocos ocasionais, portfolio publicitário
- **Almir**: personagem 3D estilo Pixar substituindo qualquer foto/menção literal

## 1. Design tokens (`src/styles.css`)
Reescrever tokens semânticos:
- `--background` migra de preto puro para off-black `#0f1012` com seções alternando para superfície clara `#e6e8eb` + preto tipográfico
- Introduzir `--surface-light`, `--surface-muted`, `--ink` (preto tipográfico sobre cinza claro)
- Reduzir opacidade/intensidade dos efeitos ambientes (grain, scanlines, orbs) em ~40%
- Radius padrão sobe de `0` / bordas duras para `12px` / `20px` em cards principais
- Remover glow verde exagerado; verde vira accent pontual (CTAs, sublinhados, dots de status)
- Sombras trocam neon-shadow por sombras suaves realistas

## 2. AmbientBackdrop
- Base migra de preto profundo para gradiente grafite muito sutil
- Grid wireframe cai para opacity `0.03`
- Orbs neon reduzidos a 1 (não 3), com blur maior e opacidade baixa
- Remover scanline duplo; manter apenas 1 muito discreto ou remover

## 3. Header
- Remover borda dura, usar apenas blur + linha fina cinza clara
- Reduzir peso do CTA "Fazer Diagnóstico" (ghost com borda verde em vez de bloco cheio)

## 4. Home — seções principais
- Alternar bandas claras (cinza `#e6e8eb` com tipografia preta) e escuras (grafite)
- Hero: menos "quadradão" — headline maior, respiro lateral maior, KPIs em linha assimétrica em vez de grid rígido
- "Comece por aqui": cards com radius grande, sombra suave, um card destacado (assimétrico)
- Sections com bordas 1px cinza em vez de borders duras pretas

## 5. Cards de serviço e ServicePageLayout
- Radius `16-20px`, borda `1px` sutil, hover suave (translate-y + shadow) em vez de neon
- Ícones em círculo cinza claro com traço preto (não caixa quadrada verde)
- Numeração dos processos em serifa/display grande cinza-claro como elemento gráfico (não caixa)

## 6. Substituir Almir (foto → personagem 3D)
- Gerar avatar Pixar-style em `src/assets/almir-3d.png` (transparent bg) via imagegen premium
- Aplicar onde houver referência ao fundador (Sobre, seções institucionais, depoimento se houver)
- Se hoje não existe foto renderizada, adicionar bloco "Quem lidera" na página Sobre com o personagem em destaque

## 7. Footer, botões, formulários
- Botão primário: preto sólido com sublinhado verde no hover (menos "gaming")
- Inputs: fundo cinza claro `#f2f4f5`, borda `#d9dcdf`, foco verde fino
- Footer: fundo grafite claro com tipografia preta (inverter atual)

## Escopo do que muda
Arquivos principais:
- `src/styles.css` (tokens + utilitários)
- `src/components/site/AmbientBackdrop.tsx`
- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`
- `src/components/site/Sections.tsx`
- `src/components/site/ServicePageLayout.tsx`
- `src/components/site/heroes/*` (ajustes de contraste)
- `src/routes/sobre-a-aceleriq.tsx` (Almir 3D)
- `src/routes/index.tsx` (hero, "Comece por aqui")
- Gerar `src/assets/almir-3d.png`

## Fora do escopo
- Copy estratégica das páginas de serviço (preservada)
- Estrutura de rotas e SEO
- Backend / dados
- Fluxos de formulário

## Entrega
Em uma leva única: tokens → backdrop → header/footer → home → serviços → Almir. Build + validação visual no final.
