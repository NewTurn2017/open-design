/**
 * Build a fully-formed product webpage that demonstrates a design system in
 * action — not just a list of tokens, but a real-feeling marketing /
 * product page (nav, hero, social proof, feature grid, dashboard preview,
 * pricing, testimonials, FAQ, CTA, footer) styled entirely from the
 * tokens we extract from the system's DESIGN.md.
 *
 * Same parsing utilities as design-system-preview.js — kept inline rather
 * than imported so the two views can evolve independently.
 */

export function renderDesignSystemShowcase(id, raw) {
  const titleMatch = /^#\s+(.+?)\s*$/m.exec(raw);
  const rawTitle = titleMatch?.[1] ?? id;
  const title = cleanTitle(rawTitle);
  const subtitle = extractSubtitle(raw) || '실제 제품 화면처럼 렌더링한 디자인 시스템입니다.';
  const colors = extractColors(raw);
  const fonts = extractFonts(raw);

  const bg =
    pickColor(colors, ['page background', 'background', 'canvas', 'paper', 'bg ', 'page bg'])
    ?? '#ffffff';
  const fg =
    pickColor(colors, ['heading', 'foreground', 'ink', 'fg', 'text', 'navy', 'graphite'])
    ?? '#0a0a0a';
  const accent =
    pickColor(colors, ['primary brand', 'brand primary', 'primary', 'brand', 'accent'])
    ?? firstNonNeutral(colors)
    ?? '#2f6feb';
  const accent2 =
    pickColor(colors, ['secondary', 'tertiary', 'highlight', 'support'])
    ?? secondNonNeutral(colors, accent)
    ?? accent;
  const muted = pickColor(colors, ['muted', 'subtle', 'caption', 'meta', 'neutral']) ?? '#666666';
  const border = pickColor(colors, ['border', 'divider', 'rule', 'stroke']) ?? '#e6e6e6';
  const surface =
    pickColor(colors, ['surface', 'card', 'background-secondary', 'panel', 'elevated'])
    ?? mixSurface(bg);

  const display = fonts.display ?? fonts.heading ?? "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  const body = fonts.body ?? display;
  const mono = fonts.mono ?? "ui-monospace, 'JetBrains Mono', monospace";

  const accentFg = pickReadableForeground(accent);
  const accent2Fg = pickReadableForeground(accent2);

  const productName = title;
  const tagline = oneLine(subtitle).slice(0, 120);

  return `<!doctype html>
<html lang="ko-KR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(productName)} — 쇼케이스</title>
  <style>
    :root {
      --bg: ${bg};
      --fg: ${fg};
      --accent: ${accent};
      --accent-fg: ${accentFg};
      --accent-2: ${accent2};
      --accent-2-fg: ${accent2Fg};
      --muted: ${muted};
      --border: ${border};
      --surface: ${surface};
      --display: ${display};
      --body: ${body};
      --mono: ${mono};
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--body);
      line-height: 1.6;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 28px; }

    /* Nav */
    .nav {
      position: sticky; top: 0; z-index: 30;
      background: rgba(255,255,255,0.7);
      backdrop-filter: saturate(180%) blur(14px);
      border-bottom: 1px solid var(--border);
    }
    .nav-row {
      display: flex; align-items: center; gap: 32px;
      height: 64px;
    }
    .brand { display: flex; align-items: center; gap: 10px; font-family: var(--display); font-weight: 700; font-size: 17px; letter-spacing: -0.01em; }
    .brand-mark {
      width: 26px; height: 26px; border-radius: 7px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
    }
    .nav-links { display: flex; gap: 22px; font-size: 14px; color: var(--muted); }
    .nav-links a:hover { color: var(--fg); }
    .nav-spacer { flex: 1; }
    .nav-cta {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--fg); color: var(--bg);
      padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 500;
    }
    .nav-link-cta { color: var(--fg); font-weight: 500; font-size: 14px; }

    /* Hero */
    .hero { padding: 96px 0 72px; }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--mono); font-size: 12px; color: var(--muted);
      text-transform: uppercase; letter-spacing: 0.08em;
      padding: 6px 12px; border: 1px solid var(--border); border-radius: 999px;
      background: var(--surface);
      margin-bottom: 24px;
    }
    .hero-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
    .hero h1 {
      font-family: var(--display);
      font-size: clamp(44px, 6.6vw, 84px);
      line-height: 1.02;
      letter-spacing: -0.025em;
      margin: 0 0 22px;
      max-width: 18ch;
      font-weight: 700;
    }
    .hero h1 em { font-style: normal; background: linear-gradient(120deg, var(--accent), var(--accent-2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .hero p.lede {
      font-size: 19px; color: var(--muted);
      max-width: 56ch; margin: 0 0 36px;
    }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .btn {
      font: inherit; cursor: pointer; border-radius: 10px;
      padding: 13px 22px; font-size: 14.5px; font-weight: 500;
      border: 1px solid transparent; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
    .btn-primary:hover { filter: brightness(1.06); }
    .btn-ghost { background: transparent; color: var(--fg); border-color: var(--border); }
    .btn-ghost:hover { background: var(--surface); }
    .hero-meta { display: flex; gap: 24px; margin-top: 44px; color: var(--muted); font-size: 13px; }
    .hero-meta span strong { color: var(--fg); font-weight: 600; }

    /* Logo strip */
    .logos { padding: 36px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .logos-label { font-size: 12px; color: var(--muted); text-align: center; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 18px; }
    .logos-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 44px; align-items: center; opacity: 0.85; }
    .logo-pill { font-family: var(--display); font-weight: 700; font-size: 17px; letter-spacing: -0.01em; color: var(--muted); }

    /* 기능 grid */
    .section { padding: 96px 0; }
    .section-eyebrow { font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px; color: var(--accent); margin-bottom: 12px; }
    .section-title { font-family: var(--display); font-size: clamp(32px, 4.2vw, 48px); letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 18px; max-width: 22ch; font-weight: 700; }
    .section-lede { color: var(--muted); font-size: 17px; max-width: 56ch; margin: 0 0 48px; }
    .features {
      display: grid; gap: 18px;
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 920px) { .features { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .features { grid-template-columns: 1fr; } }
    .feature {
      background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
      padding: 26px; display: flex; flex-direction: column; gap: 12px;
    }
    .feature-icon {
      width: 36px; height: 36px; border-radius: 8px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: var(--accent-fg);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 700;
    }
    .feature h3 { font-family: var(--display); font-size: 18px; margin: 0; letter-spacing: -0.01em; }
    .feature p { color: var(--muted); margin: 0; font-size: 14.5px; line-height: 1.55; }

    /* 제품 preview / dashboard mock */
    .preview-wrap { padding-top: 24px; padding-bottom: 96px; }
    .preview-frame {
      background: var(--surface); border: 1px solid var(--border); border-radius: 18px;
      padding: 14px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.06), 0 12px 30px rgba(0,0,0,0.04);
    }
    .preview-titlebar { display: flex; gap: 6px; padding: 4px 8px 12px; }
    .preview-titlebar span { width: 10px; height: 10px; border-radius: 50%; background: var(--border); }
    .preview-app {
      background: var(--bg); border: 1px solid var(--border); border-radius: 12px;
      display: grid; grid-template-columns: 220px 1fr; min-height: 440px; overflow: hidden;
    }
    .preview-side { background: var(--surface); border-right: 1px solid var(--border); padding: 18px 14px; display: flex; flex-direction: column; gap: 4px; }
    .side-link { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; font-size: 13.5px; color: var(--muted); }
    .side-link.active { background: var(--bg); color: var(--fg); font-weight: 500; box-shadow: inset 0 0 0 1px var(--border); }
    .side-link .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
    .side-section { font-family: var(--mono); text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; color: var(--muted); padding: 14px 10px 6px; }
    .preview-main { padding: 22px 24px; display: flex; flex-direction: column; gap: 22px; }
    .preview-head { display: flex; align-items: center; justify-content: space-between; }
    .preview-head h4 { font-family: var(--display); font-size: 22px; margin: 0; letter-spacing: -0.01em; }
    .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .kpi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
    .kpi .label { font-size: 11.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
    .kpi .value { font-family: var(--display); font-size: 24px; font-weight: 700; margin-top: 4px; letter-spacing: -0.01em; }
    .kpi .delta { font-family: var(--mono); font-size: 11.5px; margin-top: 2px; color: var(--accent); }
    .chart-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 18px; }
    .chart-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
    .chart-head .title { font-weight: 600; font-size: 14px; }
    .chart-head .meta { font-family: var(--mono); font-size: 11px; color: var(--muted); }
    .chart svg { width: 100%; height: 160px; display: block; }
    .preview-row-2 { display: grid; grid-template-columns: 1.6fr 1fr; gap: 14px; }
    .list-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; }
    .list-row { display: grid; grid-template-columns: 1fr auto auto; gap: 12px; padding: 12px 16px; border-top: 1px solid var(--border); align-items: center; }
    .list-row:first-of-type { border-top: none; }
    .list-row .name { font-weight: 500; font-size: 13.5px; }
    .list-row .meta { font-family: var(--mono); font-size: 11.5px; color: var(--muted); }
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 500; background: var(--bg); border: 1px solid var(--border); color: var(--muted); }
    .badge.up { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 30%, transparent); }
    .list-card .head { display: flex; justify-content: space-between; align-items: baseline; padding: 14px 16px; border-bottom: 1px solid var(--border); }
    .list-card .head h5 { margin: 0; font-size: 14px; }

    /* 가격 */
    .pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
    @media (max-width: 920px) { .pricing { grid-template-columns: 1fr; } }
    .price-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
      padding: 28px; display: flex; flex-direction: column; gap: 18px;
    }
    .price-card.featured {
      background: var(--fg); color: var(--bg); border-color: var(--fg);
    }
    .price-card.featured .muted, .price-card.featured h3, .price-card.featured .price { color: var(--bg); }
    .price-card .tier-name { font-family: var(--display); font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
    .price-card .price { font-family: var(--display); font-size: 44px; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
    .price-card .price small { font-size: 14px; color: var(--muted); font-weight: 400; }
    .price-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14.5px; }
    .price-card li::before { content: "✓"; color: var(--accent); margin-right: 8px; font-weight: 700; }
    .price-card.featured li::before { color: var(--accent-2); }

    /* Testimonials */
    .quotes { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    @media (max-width: 760px) { .quotes { grid-template-columns: 1fr; } }
    .quote { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 26px; display: flex; flex-direction: column; gap: 18px; }
    .quote p { font-size: 17px; line-height: 1.55; margin: 0; font-family: var(--display); letter-spacing: -0.01em; }
    .quote-author { display: flex; align-items: center; gap: 12px; }
    .quote-author .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent-2)); }
    .quote-author .name { font-weight: 600; font-size: 13.5px; }
    .quote-author .role { font-size: 12.5px; color: var(--muted); }

    /* FAQ */
    .faq { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; }
    @media (max-width: 760px) { .faq { grid-template-columns: 1fr; } }
    .faq-item { padding: 18px 0; border-top: 1px solid var(--border); }
    .faq-item h4 { margin: 0 0 6px; font-family: var(--display); font-size: 17px; letter-spacing: -0.01em; }
    .faq-item p { margin: 0; color: var(--muted); font-size: 14.5px; }

    /* CTA */
    .cta {
      margin: 48px 0 96px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: var(--accent-fg);
      border-radius: 24px;
      padding: 64px 56px;
      display: grid;
      grid-template-columns: 1.4fr auto;
      gap: 32px;
      align-items: center;
    }
    @media (max-width: 760px) { .cta { grid-template-columns: 1fr; padding: 36px; } }
    .cta h2 { font-family: var(--display); font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.02em; margin: 0 0 10px; line-height: 1.1; max-width: 22ch; }
    .cta p { margin: 0; opacity: 0.92; font-size: 16px; max-width: 50ch; }
    .cta .btn { background: var(--accent-fg); color: var(--accent); border: none; }
    .cta .btn-secondary { background: transparent; color: var(--accent-fg); border: 1px solid color-mix(in srgb, var(--accent-fg) 35%, transparent); }

    /* Footer */
    footer { border-top: 1px solid var(--border); padding: 36px 0 56px; color: var(--muted); font-size: 13.5px; }
    .footer-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 32px; }
    @media (max-width: 760px) { .footer-row { grid-template-columns: 1fr 1fr; } }
    .footer-col h6 { color: var(--fg); font-family: var(--display); font-size: 13.5px; margin: 0 0 12px; font-weight: 600; }
    .footer-col a { display: block; padding: 4px 0; }
    .footer-col a:hover { color: var(--fg); }
    .footer-bottom { display: flex; justify-content: space-between; padding-top: 24px; border-top: 1px solid var(--border); }
  </style>
</head>
<body>
  <header class="nav">
    <div class="container nav-row">
      <a class="brand" href="#"><span class="brand-mark"></span>${escapeHtml(productName)}</a>
      <nav class="nav-links">
        <a href="#features">제품</a>
        <a href="#preview">Workspace</a>
        <a href="#pricing">가격</a>
        <a href="#faq">문서</a>
        <a href="#faq">고객</a>
      </nav>
      <div class="nav-spacer"></div>
      <a class="nav-link-cta" href="#">Sign in</a>
      <a class="nav-cta" href="#">Get started →</a>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <div class="hero-eyebrow"><span class="dot"></span>${escapeHtml(productName)} · 라이브 미리보기</div>
        <h1><em>${escapeHtml(productName)}</em>답게 느껴지도록 만드는 시스템.</h1>
        <p class="lede">${escapeHtml(tagline)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#">무료로 시작하기 →</a>
          <a class="btn btn-ghost" href="#preview">실제 화면 보기</a>
        </div>
        <div class="hero-meta">
          <span><strong>4.9</strong> · App Store 평점</span>
          <span><strong>SOC 2</strong> · Type II 준수</span>
          <span><strong>120k+</strong> 활성 팀</span>
        </div>
      </div>
    </section>

    <section class="logos">
      <div class="container">
        <div class="logos-label">중요한 일을 출시하는 팀들이 신뢰합니다</div>
        <div class="logos-row">
          <span class="logo-pill">Northwind</span>
          <span class="logo-pill">Pioneer</span>
          <span class="logo-pill">Lattice</span>
          <span class="logo-pill">Atlas Co.</span>
          <span class="logo-pill">Voltage</span>
          <span class="logo-pill">Foundry</span>
        </div>
      </div>
    </section>

    <section class="section" id="features">
      <div class="container">
        <div class="section-eyebrow">기능</div>
        <h2 class="section-title">빠른 팀에 필요한 모든 기본 요소.</h2>
        <p class="section-lede">${escapeHtml(productName)}의 토큰만으로 스타일링된 시스템입니다 — 팔레트, 타이포그래피, 표면, 모션까지. 어떤 제품에 넣어도 고유한 인상이 유지됩니다.</p>
        <div class="features">
          ${featureCard('★', '조합되는 토큰', '색상, 타이포, 간격, 깊이를 한 번 정의하고 마케팅 히어로부터 테이블 행까지 모든 표면에서 재사용합니다.')}
          ${featureCard('◐', '라이트와 다크를 함께 설계', '모든 컴포넌트가 두 모드를 함께 제공합니다. 어느 맥락에서도 액센트는 또렷하고, 기본 대비는 WCAG AA를 만족합니다.')}
          ${featureCard('⌘', '데스크톱 우선, 모바일도 정직하게', '12컬럼 데스크톱 그리드가 밀도와 리듬을 잃지 않고 집중된 단일 컬럼으로 접힙니다.')}
          ${featureCard('▣', '프로덕션급 기본 요소', '버튼과 입력 같은 기본 요소부터 데이터 테이블, 커맨드 바, 빈 상태처럼 핵심을 지탱하는 요소까지 40개 이상의 컴포넌트.')}
          ${featureCard('↗', '핸드오프를 고려한 설계', '모든 스펙에 Figma 프레임, 코드 스니펫, 해야 할 것/하지 말아야 할 것 쌍이 포함되어 엔지니어가 추측할 필요가 없습니다.')}
          ${featureCard('∞', '진화하도록 설계', '토큰은 semver 방식으로 버전 관리됩니다. 팔레트 변경은 한 파일로 배포되고 컴포넌트 코드는 건드리지 않습니다.')}
        </div>
      </div>
    </section>

    <section class="preview-wrap" id="preview">
      <div class="container">
        <div class="section-eyebrow">프로덕션 화면</div>
        <h2 class="section-title">완전히 스타일링된 워크스페이스.</h2>
        <p class="section-lede">앱에서 사용할 동일한 컴포넌트 라이브러리를 ${escapeHtml(productName)} 토큰으로 렌더링한 화면입니다.</p>
        <div class="preview-frame">
          <div class="preview-titlebar"><span></span><span></span><span></span></div>
          <div class="preview-app">
            <aside class="preview-side">
              <div class="brand" style="margin-bottom: 14px;"><span class="brand-mark"></span>${escapeHtml(productName)}</div>
              <a class="side-link active"><span class="dot"></span>개요</a>
              <a class="side-link">고객</a>
              <a class="side-link">파이프라인</a>
              <a class="side-link">리포트</a>
              <a class="side-link">자동화</a>
              <div class="side-section">워크스페이스</div>
              <a class="side-link">성장</a>
              <a class="side-link">라이프사이클</a>
              <a class="side-link">재무</a>
            </aside>
            <div class="preview-main">
              <div class="preview-head">
                <h4>개요</h4>
                <span class="badge up">↑ 이번 주 12.4%</span>
              </div>
              <div class="kpi-row">
                ${kpi('MRR', '$184,210', '+8.2%')}
                ${kpi('활성 조직', '2,914', '+121')}
                ${kpi('전환율', '4.6%', '+0.4 pp')}
                ${kpi('순 리텐션', '113%', '+2 pp')}
              </div>
              <div class="chart-card">
                <div class="chart-head">
                  <span class="title">매출 · 최근 12주</span>
                  <span class="meta">USD · 주간</span>
                </div>
                <div class="chart">
                  ${inlineLineChart()}
                </div>
              </div>
              <div class="preview-row-2">
                <div class="list-card">
                  <div class="head">
                    <h5>상위 계정</h5>
                    <span class="badge">전체 보기</span>
                  </div>
                  ${listRow('Northwind Trading', '연간 · 북미', '$48,200', 'up')}
                  ${listRow('Pioneer Robotics', '분기 · EMEA', '$31,890', 'up')}
                  ${listRow('Atlas Cooperative', '연간 · APAC', '$22,400', '')}
                  ${listRow('Foundry Group', '월간 · 북미', '$14,750', 'up')}
                </div>
                <div class="list-card">
                  <div class="head">
                    <h5>활동</h5>
                    <span class="badge">실시간</span>
                  </div>
                  ${activityRow('갱신 완료', 'Lattice · 11분 전')}
                  ${activityRow('체험 시작', 'Voltage · 22분 전')}
                  ${activityRow('플랜 업그레이드', 'Pioneer · 1시간 전')}
                  ${activityRow('인보이스 결제됨', 'Atlas · 2시간 전')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="pricing" style="padding-top: 24px;">
      <div class="container">
        <div class="section-eyebrow">가격</div>
        <h2 class="section-title">1명부터 1,000명 규모의 팀까지.</h2>
        <p class="section-lede">팀의 출시 방식에 맞는 플랜을 선택하세요. 모든 플랜에는 전체 토큰 시스템이 포함됩니다.</p>
        <div class="pricing">
          ${priceCard('스타터', '$0', '영구 무료', ['단일 사용자', '모든 핵심 토큰', '최대 3개 프로젝트', '커뮤니티 지원'])}
          ${priceCard('팀', '$24', '좌석당 / 월', ['무제한 프로젝트', '실시간 공동 편집', '브랜드 테마', '우선 이메일 지원'], true)}
          ${priceCard('엔터프라이즈', '맞춤형', '볼륨 가격', ['SSO + SCIM', '감사 로그', '맞춤 토큰 스키마', '전담 성공 매니저'])}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-eyebrow">고객</div>
        <h2 class="section-title">완성도를 중시하는 팀이 사랑하는 경험.</h2>
        <div class="quotes">
          ${quote('"Our marketing site, our app, and our internal dashboards finally feel like the same product. The token system is doing all the work."', 'Mira Okafor', 'Head of Design · Pioneer')}
          ${quote('"We swapped our entire design language in an afternoon. Nothing broke. That’s the line, and we crossed it."', 'Caleb Renner', 'Engineering Lead · Northwind')}
        </div>
      </div>
    </section>

    <section class="section" id="faq" style="padding-top: 24px;">
      <div class="container">
        <div class="section-eyebrow">FAQ</div>
        <h2 class="section-title">자주 묻는 질문.</h2>
        <div class="faq">
          ${faq('Figma 라이브러리인가요, 코드 라이브러리인가요, 둘 다인가요?', '둘 다입니다. 토큰은 하나의 진실 공급원에서 Figma 스타일과 코드 생성 파이프라인으로 동시에 흐릅니다.')}
          ${faq('우리만의 브랜드 테마를 배포할 수 있나요?', '네. 토큰 파일을 포크해 팔레트와 타입 스택을 바꾸면 모든 컴포넌트가 자동으로 다시 스킨됩니다.')}
          ${faq('접근성은 어떤가요?', '모든 표면의 색상 대비가 WCAG AA를 만족합니다. 컴포넌트에는 포커스 링, ARIA 역할, 키보드 처리가 포함됩니다.')}
          ${faq('다크 모드는 어떻게 처리하나요?', '모든 토큰에는 짝이 되는 다크 값이 있습니다. 시스템은 문서 레벨에서 전환되며 컴포넌트별 오버라이드가 필요 없습니다.')}
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="cta">
          <div>
            <h2>마침내 완성된 느낌의 제품을 출시하세요.</h2>
            <p>오늘 바로 앱에 시스템을 적용하세요. 첫 프로젝트는 무료입니다.</p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a class="btn btn-primary" href="#">무료로 시작하기</a>
            <a class="btn btn-secondary" href="#">세일즈 문의</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-row">
        <div class="footer-col">
          <div class="brand" style="margin-bottom: 12px;"><span class="brand-mark"></span>${escapeHtml(productName)}</div>
          <p style="margin: 0; max-width: 38ch;">${escapeHtml(tagline)}</p>
        </div>
        <div class="footer-col"><h6>제품</h6><a href="#">기능</a><a href="#">가격</a><a href="#">변경 내역</a><a href="#">로드맵</a></div>
        <div class="footer-col"><h6>회사</h6><a href="#">소개</a><a href="#">고객</a><a href="#">채용</a><a href="#">보도자료</a></div>
        <div class="footer-col"><h6>리소스</h6><a href="#">문서</a><a href="#">상태</a><a href="#">브랜드</a><a href="#">문의</a></div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${escapeHtml(productName)}. 모든 권리 보유.</span>
        <span>쇼케이스 원본: <code style="font-family: var(--mono);">design-systems/${escapeHtml(id)}/DESIGN.md</code></span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function featureCard(icon, title, body) {
  return `<div class="feature">
    <div class="feature-icon">${escapeHtml(icon)}</div>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
  </div>`;
}

function kpi(label, value, delta) {
  return `<div class="kpi">
    <div class="label">${escapeHtml(label)}</div>
    <div class="value">${escapeHtml(value)}</div>
    <div class="delta">${escapeHtml(delta)}</div>
  </div>`;
}

function listRow(name, meta, value, status) {
  const badge = status === 'up' ? '<span class="badge up">↑</span>' : '<span class="badge">·</span>';
  return `<div class="list-row">
    <div>
      <div class="name">${escapeHtml(name)}</div>
      <div class="meta">${escapeHtml(meta)}</div>
    </div>
    <div class="meta">${escapeHtml(value)}</div>
    ${badge}
  </div>`;
}

function activityRow(name, meta) {
  return `<div class="list-row">
    <div>
      <div class="name">${escapeHtml(name)}</div>
      <div class="meta">${escapeHtml(meta)}</div>
    </div>
    <div></div>
    <span class="badge">●</span>
  </div>`;
}

function priceCard(name, price, sub, features, featured) {
  return `<div class="price-card${featured ? ' featured' : ''}">
    <div class="tier-name">${escapeHtml(name)}</div>
    <div class="price">${escapeHtml(price)} <small>${escapeHtml(sub)}</small></div>
    <ul>${features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
    <a class="btn ${featured ? 'btn-primary' : 'btn-ghost'}" href="#" style="${featured ? 'background: var(--accent); color: var(--accent-fg); border-color: var(--accent);' : ''}">Choose ${escapeHtml(name)}</a>
  </div>`;
}

function quote(text, name, role) {
  return `<div class="quote">
    <p>${escapeHtml(text)}</p>
    <div class="quote-author">
      <div class="avatar"></div>
      <div>
        <div class="name">${escapeHtml(name)}</div>
        <div class="role">${escapeHtml(role)}</div>
      </div>
    </div>
  </div>`;
}

function faq(q, a) {
  return `<div class="faq-item">
    <h4>${escapeHtml(q)}</h4>
    <p>${escapeHtml(a)}</p>
  </div>`;
}

function inlineLineChart() {
  // Deterministic numbers so the chart looks specific (12 weekly data points).
  const data = [38, 44, 41, 52, 49, 61, 58, 67, 71, 76, 82, 88];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 720;
  const h = 160;
  const padX = 8;
  const padY = 14;
  const stepX = (w - padX * 2) / (data.length - 1);
  const norm = (v) => padY + (h - padY * 2) * (1 - (v - min) / (max - min));
  const points = data.map((v, i) => `${padX + i * stepX},${norm(v).toFixed(1)}`).join(' ');
  const area = `${padX},${h} ${points} ${w - padX},${h}`;
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <defs>
      <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <polygon points="${area}" fill="url(#lg)"/>
    <polyline points="${points}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${data.map((v, i) => `<circle cx="${padX + i * stepX}" cy="${norm(v).toFixed(1)}" r="${i === data.length - 1 ? 4 : 0}" fill="var(--accent)"/>`).join('')}
  </svg>`;
}

function extractSubtitle(raw) {
  const lines = raw.split(/\r?\n/);
  const h1 = lines.findIndex((l) => /^#\s+/.test(l));
  if (h1 === -1) return '';
  const after = lines.slice(h1 + 1);
  const nextHeading = after.findIndex((l) => /^#{1,6}\s+/.test(l));
  const window = (nextHeading === -1 ? after : after.slice(0, nextHeading))
    .join('\n')
    .replace(/^>\s*Category:.*$/gim, '')
    .replace(/^>\s*/gm, '')
    .trim();
  return window.split(/\n\n/)[0]?.slice(0, 240) ?? '';
}

function extractColors(raw) {
  const colors = [];
  const seen = new Set();
  function push(name, value) {
    const cleanName = name.replace(/[*_`]+/g, '').replace(/\s+/g, ' ').trim();
    if (!cleanName || cleanName.length > 60) return;
    const v = normalizeHex(value);
    const key = `${cleanName.toLowerCase()}|${v}`;
    if (seen.has(key)) return;
    seen.add(key);
    colors.push({ name: cleanName, value: v });
  }
  const reA = /^[\s>*-]*\**\s*([A-Za-z][A-Za-z0-9 /&()+_-]{1,40}?)\s*\**\s*[:：]\s*`?(#[0-9a-fA-F]{3,8})/gm;
  let m;
  while ((m = reA.exec(raw)) !== null) push(m[1], m[2]);
  const reB = /\*\*([A-Za-z][A-Za-z0-9 /&()+_-]{1,40}?)\*\*\s*\(?\s*`?(#[0-9a-fA-F]{3,8})/g;
  while ((m = reB.exec(raw)) !== null) push(m[1], m[2]);
  return colors;
}

function extractFonts(raw) {
  const out = {};
  const re = /^[\s>*-]*\**\s*([A-Za-z][A-Za-z /]{1,30}?)\s*\**\s*[:：]\s*`?([^`\n]+?)`?$/gm;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const label = m[1].toLowerCase();
    const value = m[2].trim().replace(/[*_`]+$/g, '').trim();
    if (!/[a-zA-Z]/.test(value)) continue;
    if (value.startsWith('#')) continue;
    if (/display|heading|h1|title/.test(label) && !out.display) out.display = value;
    else if (/body|text|paragraph|copy/.test(label) && !out.body) out.body = value;
    else if (/mono|code/.test(label) && !out.mono) out.mono = value;
  }
  return out;
}

function pickColor(colors, hints) {
  for (const hint of hints) {
    const needle = hint.toLowerCase();
    const found = colors.find((c) => c.name.toLowerCase().includes(needle));
    if (found) return found.value;
  }
  return null;
}

function firstNonNeutral(colors) {
  for (const c of colors) {
    const v = c.value.replace('#', '').toLowerCase();
    if (v.length !== 6) continue;
    const r = parseInt(v.slice(0, 2), 16);
    const g = parseInt(v.slice(2, 4), 16);
    const b = parseInt(v.slice(4, 6), 16);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat > 0.25) return c.value;
  }
  return null;
}

function secondNonNeutral(colors, exclude) {
  let seen = false;
  for (const c of colors) {
    const v = c.value.replace('#', '').toLowerCase();
    if (v.length !== 6) continue;
    const r = parseInt(v.slice(0, 2), 16);
    const g = parseInt(v.slice(2, 4), 16);
    const b = parseInt(v.slice(4, 6), 16);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat > 0.25) {
      if (c.value === exclude || (!seen)) { seen = true; continue; }
      return c.value;
    }
  }
  return null;
}

function pickReadableForeground(hex) {
  const n = normalizeHex(hex);
  if (n.length !== 7) return '#ffffff';
  const r = parseInt(n.slice(1, 3), 16);
  const g = parseInt(n.slice(3, 5), 16);
  const b = parseInt(n.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0a0a0a' : '#ffffff';
}

function mixSurface(bg) {
  const n = normalizeHex(bg);
  if (n.length !== 7) return '#fafafa';
  const r = parseInt(n.slice(1, 3), 16);
  const g = parseInt(n.slice(3, 5), 16);
  const b = parseInt(n.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Lift dark backgrounds; tint light backgrounds slightly cooler.
  const adjust = lum < 0.4 ? 16 : -8;
  const fix = (v) => Math.max(0, Math.min(255, v + adjust)).toString(16).padStart(2, '0');
  return `#${fix(r)}${fix(g)}${fix(b)}`;
}

function normalizeHex(hex) {
  let h = hex.toLowerCase();
  if (h.length === 4) {
    h = '#' + h.slice(1).split('').map((c) => c + c).join('');
  }
  return h;
}

function cleanTitle(raw) {
  return String(raw).replace(/^Design System (Inspired by|for)\s+/i, '').trim();
}

function oneLine(s) {
  return String(s).replace(/\s+/g, ' ').trim();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  );
}
