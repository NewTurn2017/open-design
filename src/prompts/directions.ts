/**
 * Built-in design direction library.
 *
 * Distilled from huashu-design's "5 schools × 20 philosophies" idea: when
 * the user hasn't specified a brand and selected "Pick a direction for me"
 * in the discovery form, the agent emits a *second* `<question-form>` whose
 * radio options are these 5 schools. Each school carries a concrete spec —
 * fonts, palette in OKLch, mood keywords, real-world references — that the
 * agent then encodes into the active CSS `:root` tokens before generating.
 *
 * The library has TWO purposes:
 *
 *   1. Render-time: the prompt embeds these as choices the user picks from.
 *      One radio click → a deterministic palette + type stack, no model
 *      improvisation.
 *   2. Build-time: once chosen, the agent sees the full spec (palette
 *      values, font stacks, layout posture, mood) inline in its system
 *      prompt and binds the seed template's `:root` to those values.
 *
 * Adding a new direction: append to `DESIGN_DIRECTIONS` and it shows up in
 * the picker automatically. Keep them visually *distinct* — two near-
 * identical directions defeat the purpose.
 */

export interface DesignDirection {
  /** kebab-case id, also the form-option label after `: ` */
  id: string;
  /** Short user-facing label, shown in the radio. ≤ 56 chars including the dash list. */
  label: string;
  /** One-paragraph mood description shown to the user as `help`. */
  mood: string;
  /** References / exemplars — real magazines, products, designers. */
  references: string[];
  /** Headline (display) font stack. CSS-ready. */
  displayFont: string;
  /** Body font stack. CSS-ready. */
  bodyFont: string;
  /** Optional mono override; falls back to ui-monospace. */
  monoFont?: string;
  /** Six palette values in OKLch — bind directly to seed `:root`. */
  palette: {
    bg: string;
    surface: string;
    fg: string;
    muted: string;
    border: string;
    accent: string;
  };
  /** Layout posture cues for the agent. Concrete, not vague. */
  posture: string[];
}

export const DESIGN_DIRECTIONS: DesignDirection[] = [
  {
    id: 'editorial-monocle',
    label: '에디토리얼 — Monocle / FT 매거진',
    mood:
      '인쇄 잡지 같은 분위기. 넉넉한 여백, 큰 세리프 헤드라인, 오프화이트 종이와 잉크, 하나의 따뜻한 액센트로 절제된 팔레트. 자신감 있고 차분하게 지적인 인상.',
    references: ['Monocle', 'The Financial Times Weekend', 'NYT Magazine', 'It\'s Nice That'],
    displayFont: "'Iowan Old Style', 'Charter', Georgia, serif",
    bodyFont:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    palette: {
      bg:      'oklch(97% 0.012 80)',     // off-white paper
      surface: 'oklch(99% 0.005 80)',
      fg:      'oklch(20% 0.02 60)',      // ink
      muted:   'oklch(48% 0.015 60)',
      border:  'oklch(89% 0.012 80)',
      accent:  'oklch(58% 0.16 35)',      // warm rust / clay
    },
    posture: [
      'serif display, sans body, mono for metadata only',
      'no shadows, no rounded cards — borders + whitespace do the work',
      'one decisive image, cropped only at the bottom',
      'kicker / eyebrow in mono uppercase, one accent color, used at most twice',
    ],
  },
  {
    id: 'modern-minimal',
    label: '모던 미니멀 — Linear / Vercel',
    mood:
      '조용하고 정밀한 소프트웨어 네이티브 톤. 시스템 폰트, 거의 무채색에 가까운 팔레트, 하나의 선명한 액센트. UI 장식은 사라지고 콘텐츠만 또렷하게 남습니다.',
    references: ['Linear', 'Vercel', 'Notion 2024', 'Stripe docs'],
    displayFont:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
    bodyFont:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
    palette: {
      bg:      'oklch(99% 0.002 240)',
      surface: 'oklch(100% 0 0)',
      fg:      'oklch(18% 0.012 250)',
      muted:   'oklch(54% 0.012 250)',
      border:  'oklch(92% 0.005 250)',
      accent:  'oklch(58% 0.18 255)',     // cobalt
    },
    posture: [
      'tight letter-spacing on display sizes (-0.02em)',
      'hairline borders only, no shadows except dropdowns/modals',
      'mono numerics with `font-variant-numeric: tabular-nums`',
      'sticky frosted nav, content-led layouts (no hero illustrations)',
      'one accent: links + primary CTA, nothing else',
    ],
  },
  {
    id: 'warm-soft',
    label: '따뜻하고 부드러움 — Stripe pre-2020 / Headspace',
    mood:
      '크림색 배경, 부드러운 액센트, 완만한 라운드. 귀엽기보다는 친근한, 사려 깊은 제품 매거진처럼 읽힙니다. 핀테크, 웰니스, 인디 SaaS에 잘 맞습니다.',
    references: ['Stripe pre-2020', 'Headspace', 'Substack', 'Mercury'],
    displayFont:
      "'Tiempos Headline', 'Newsreader', 'Iowan Old Style', Georgia, serif",
    bodyFont:
      "'Söhne', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    palette: {
      bg:      'oklch(97% 0.018 70)',     // warm cream
      surface: 'oklch(99% 0.008 70)',
      fg:      'oklch(22% 0.02 50)',
      muted:   'oklch(50% 0.018 50)',
      border:  'oklch(90% 0.014 70)',
      accent:  'oklch(64% 0.13 28)',      // terracotta
    },
    posture: [
      'serif display, soft sans body',
      'gentle radii (12–16px), no hard 0px corners on content cards',
      'single accent used for primary CTA + one editorial flourish (a quote mark, a stat)',
      'soft inner glow on hero cards rather than drop shadows',
      'avoid icons; use real screenshots / photographs / illustrations',
    ],
  },
  {
    id: 'tech-utility',
    label: '테크 / 유틸리티 — Datadog / GitHub',
    mood:
      '데이터 밀도가 높고 모노스페이스와 잘 맞으며 다크/라이트 그리드에 적합합니다. 분위기보다 단위 면적당 정보량을 원하는 엔지니어와 운영자를 위한 방향입니다.',
    references: ['Datadog', 'GitHub', 'Cloudflare dashboard', 'Sentry'],
    displayFont:
      "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif",
    bodyFont:
      "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif",
    monoFont: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace",
    palette: {
      bg:      'oklch(98% 0.005 250)',
      surface: 'oklch(100% 0 0)',
      fg:      'oklch(22% 0.02 240)',
      muted:   'oklch(50% 0.018 240)',
      border:  'oklch(90% 0.008 240)',
      accent:  'oklch(58% 0.16 145)',     // signal green
    },
    posture: [
      'sans display + sans body (one family) is OK here — utility trumps editorial',
      'tabular numerics everywhere, mono for code / IDs / hashes',
      'dense tables with hairline borders, no row striping',
      'inline status pills (success / warn / danger) with restrained tinted backgrounds',
      'avoid: hero images, oversized headlines, marketing copy — show the product instead',
    ],
  },
  {
    id: 'brutalist-experimental',
    label: '브루탈리스트 / 실험적 — Are.na / Yale',
    mood:
      '강한 타이포그래피와 드러나는 그리드. 시스템 산세리프와 거대한 세리프 하나. 의도적인 거침을 자신감으로 씁니다. 아트, 인디, 에이전시, 선언문형 페이지에 좋습니다.',
    references: ['Are.na', 'Yale Center for British Art', 'mschf', 'Read.cv'],
    displayFont:
      "'Times New Roman', 'Iowan Old Style', Georgia, serif",
    bodyFont:
      "ui-monospace, 'IBM Plex Mono', 'JetBrains Mono', Menlo, monospace",
    palette: {
      bg:      'oklch(96% 0.004 100)',    // off-white printer paper
      surface: 'oklch(100% 0 0)',
      fg:      'oklch(15% 0.02 100)',
      muted:   'oklch(40% 0.02 100)',
      border:  'oklch(15% 0.02 100)',     // borders are full-strength fg
      accent:  'oklch(60% 0.22 25)',      // hot red
    },
    posture: [
      'display = serif at extreme sizes (clamp(80px, 12vw, 200px))',
      'body = monospace — yes, monospace as body, deliberately',
      'borders are full-strength fg (1.5–2px), not muted greys',
      'asymmetric layouts: one column 70%, the other 30%',
      'almost no border-radius (0–2px). No shadows. No gradients.',
      'underline links, no hover decoration — let the typography carry it',
    ],
  },
];

/**
 * Render the direction-picker form body for emission as a `<question-form>`.
 * Uses the `direction-cards` question type so the UI renders each option
 * as a rich card (palette swatches + type sample + mood blurb + refs)
 * instead of a plain radio. Falls back gracefully — older clients that
 * don't recognise `direction-cards` treat it as text.
 */
export function renderDirectionFormBody(): string {
  const cards = DESIGN_DIRECTIONS.map((d) => ({
    id: d.id,
    label: d.label,
    mood: d.mood,
    references: d.references,
    palette: [
      d.palette.bg,
      d.palette.surface,
      d.palette.border,
      d.palette.muted,
      d.palette.fg,
      d.palette.accent,
    ],
    displayFont: d.displayFont,
    bodyFont: d.bodyFont,
  }));

  const form = {
    description:
      '맞출 브랜드가 없다면 시각 방향을 선택하세요. 각 방향에는 실제 팔레트, 폰트 스택, 레이아웃 자세가 포함됩니다. 아래에서 액센트를 덮어쓸 수 있습니다.',
    questions: [
      {
        id: 'direction',
        label: '방향',
        type: 'direction-cards',
        required: true,
        options: DESIGN_DIRECTIONS.map((d) => d.id),
        cards,
      },
      {
        id: 'accent_override',
        label: '액센트 재지정(선택 사항)',
        type: 'text',
        placeholder:
          '예: "코발트 대신 모스 그린 사용", "오렌지는 브랜드 느낌이 너무 강해서 제외"',
      },
    ],
  };

  return JSON.stringify(form, null, 2);
}

/**
 * The block we splice into the system prompt so the agent has each
 * direction's full spec inline (palette, fonts, posture). Used by the
 * discovery prompt to teach the agent *how* to bind a chosen direction
 * onto the seed template's `:root` variables.
 */
export function renderDirectionSpecBlock(): string {
  const lines: string[] = [
    '## Direction library — bind into `:root` when the user picks one',
    '',
    'Each direction below carries a CSS-ready palette (OKLch values) and font stacks. When the user selects one in the direction-form, replace the seed template\'s `:root` block with that direction\'s palette and font stacks **verbatim** — do not improvise. Posture cues describe how that direction *behaves* (border weight, radius, accent budget); honour them in the layout choices.',
    '',
  ];
  for (const d of DESIGN_DIRECTIONS) {
    lines.push(`### ${d.label}  \`(id: ${d.id})\``);
    lines.push('');
    lines.push(`**Mood:** ${d.mood}`);
    lines.push('');
    lines.push(`**References:** ${d.references.join(', ')}.`);
    lines.push('');
    lines.push('**Palette (drop into `:root`):**');
    lines.push('');
    lines.push('```css');
    lines.push(`:root {`);
    lines.push(`  --bg:      ${d.palette.bg};`);
    lines.push(`  --surface: ${d.palette.surface};`);
    lines.push(`  --fg:      ${d.palette.fg};`);
    lines.push(`  --muted:   ${d.palette.muted};`);
    lines.push(`  --border:  ${d.palette.border};`);
    lines.push(`  --accent:  ${d.palette.accent};`);
    lines.push('');
    lines.push(`  --font-display: ${d.displayFont};`);
    lines.push(`  --font-body:    ${d.bodyFont};`);
    if (d.monoFont) lines.push(`  --font-mono:    ${d.monoFont};`);
    lines.push(`}`);
    lines.push('```');
    lines.push('');
    lines.push('**Posture:**');
    for (const p of d.posture) lines.push(`- ${p}`);
    lines.push('');
  }
  return lines.join('\n');
}

/** Look up a direction by its `label` (what the user sees in the form). */
export function findDirectionByLabel(label: string): DesignDirection | undefined {
  const trimmed = label.trim();
  return DESIGN_DIRECTIONS.find((d) => d.label === trimmed || d.id === trimmed);
}
