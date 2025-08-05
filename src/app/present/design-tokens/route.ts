import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const markdownPath = path.join(
      process.cwd(),
      'src/content/presentations/design-tokens.md'
    );
    const markdownContent = await fs.readFile(markdownPath, 'utf8');
    const slides = markdownContent.split('---').map((slide) => slide.trim());

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design Tokens Presentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; overflow: hidden; font-family: system-ui, -apple-system, sans-serif; }

    .presentation {
      width: 100vw; height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: white; position: relative; overflow: hidden;
    }

    .slide {
      width: 100%; height: calc(100% - 120px); display: none;
      align-items: center; justify-content: center; padding: 4rem;
    }
    .slide.active { display: flex; }
    .slide-content { max-width: 1200px; width: 100%; }
    .slide.title .slide-content { text-align: center; }

    h1 {
      font-size: 4rem; font-weight: 800; margin-bottom: 2rem;
      background: linear-gradient(45deg, #e2e891, #ffffff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #e2e891; }
    p { font-size: 1.4rem; line-height: 1.6; margin-bottom: 1rem; opacity: 0.9; }
    .mono { font-family: monospace; font-weight: 700; font-size: 1.8rem; }

    .code-block {
      background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.2); margin: 2rem 0;
    }
    pre { font-size: 1.2rem; line-height: 1.6; margin: 0; font-family: monospace; }

    .controls {
      position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
      background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(20px);
      display: flex; align-items: center; justify-content: space-between; padding: 0 3rem;
      border-top: 2px solid rgba(255, 255, 255, 0.1);
    }

    .slide-counter { font-size: 1.2rem; font-weight: 600; opacity: 0.9; }
    .dots { display: flex; gap: 1rem; align-items: center; }
    .dot {
      width: 12px; height: 12px; border-radius: 50%; border: none;
      background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s;
    }
    .dot.active { background: #e2e891; transform: scale(1.2); }

    button {
      background: rgba(255,255,255,0.2); border: none; color: white;
      padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;
      font-size: 1rem; font-weight: 600;
    }
    button:disabled { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.4); }
    button.primary { background: #e2e891; color: #000; font-weight: 700; }

    .exit-btn { position: absolute; top: 2rem; right: 2rem; }
    .nav-buttons { display: flex; gap: 1rem; }
  </style>
</head>
<body>
  <div class="presentation">
    ${slides
      .map(
        (slide, index) => `
      <div class="slide ${index === 0 ? 'active title' : ''}" data-slide="${index}">
        <div class="slide-content">${parseSlide(slide)}</div>
      </div>
    `
      )
      .join('')}

    <div class="controls">
      <div class="slide-counter"><span id="current">1</span> of ${slides.length}</div>
      <div class="dots">
        ${slides.map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" onclick="goTo(${i})"></button>`).join('')}
      </div>
      <div class="nav-buttons">
        <button id="prev" onclick="prev()" disabled>Previous</button>
        <button id="next" onclick="next()" class="primary">Next</button>
        <button onclick="fullscreen()">Fullscreen (F)</button>
      </div>
    </div>
    <button class="exit-btn" onclick="location.href='/demo/presentations'">Exit</button>
  </div>

  <script>
    let current = 0;
    const total = ${slides.length};

    function show(i) {
      document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
      document.querySelector('[data-slide="' + i + '"]').classList.add('active');
      document.getElementById('current').textContent = i + 1;
      document.querySelectorAll('.dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
      document.getElementById('prev').disabled = i === 0;
      document.getElementById('next').disabled = i === total - 1;
      document.getElementById('next').classList.toggle('primary', i < total - 1);
    }

    function next() { if (current < total - 1) show(++current); }
    function prev() { if (current > 0) show(--current); }
    function goTo(i) { current = i; show(current); }
    function fullscreen() { document.documentElement.requestFullscreen(); }

    document.addEventListener('keydown', e => {
      switch(e.key) {
        case 'ArrowRight': case ' ': e.preventDefault(); next(); break;
        case 'ArrowLeft': e.preventDefault(); prev(); break;
        case 'f': case 'F': e.preventDefault(); fullscreen(); break;
        case 'Escape': e.preventDefault(); location.href='/demo/presentations'; break;
        default:
          const n = parseInt(e.key);
          if (n >= 1 && n <= total) { e.preventDefault(); goTo(n-1); }
      }
    });
  </script>
</body>
</html>`;

    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch {
    return new NextResponse('Presentation not found', { status: 404 });
  }
}

function parseSlide(content: string): string {
  return content
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const t = line.trim();
      if (t.startsWith('# ')) return '<h1>' + t.slice(2) + '</h1>';
      if (t.startsWith('## ')) return '<h2>' + t.slice(3) + '</h2>';
      if (t.startsWith('**') && t.endsWith('**'))
        return '<p class="mono">' + t.slice(2, -2) + '</p>';
      if (content.includes('```css') || content.includes('```scss')) {
        const match = content.match(/```(?:css|scss)([\s\S]*?)```/);
        return match
          ? '<div class="code-block"><pre>' + match[1].trim() + '</pre></div>'
          : '';
      }
      if (t && !t.startsWith('```')) return '<p>' + t + '</p>';
      return '';
    })
    .filter(Boolean)
    .join('');
}
