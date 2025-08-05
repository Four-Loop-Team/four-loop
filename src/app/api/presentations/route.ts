import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const presentations = [
  {
    title: 'Design Tokens System',
    filename: 'design-tokens',
    markdownPath: 'src/content/presentations/design-tokens.md',
  },
  {
    title: 'Design Tokens: Complete Guide',
    filename: 'design-tokens-presentation',
    markdownPath: 'docs/presentations/Design-Tokens-Presentation.md',
  },
  {
    title: 'Design System Overview',
    filename: 'design-system',
    markdownPath: 'docs/DESIGN_SYSTEM.md',
  },
  {
    title: 'Color Guidelines',
    filename: 'color-guidelines',
    markdownPath: 'docs/COLOR_GUIDELINES.md',
  },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filename = url.searchParams.get('filename');

  const presentation = presentations.find((p) => p.filename === filename);
  if (!presentation) {
    return new NextResponse('Presentation not found', { status: 404 });
  }

  try {
    const markdownPath = path.join(process.cwd(), presentation.markdownPath);
    const markdownContent = await fs.readFile(markdownPath, 'utf8');

    const html = generateRevealHTML(presentation, markdownContent);
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch {
    return new NextResponse('Error generating presentation', { status: 500 });
  }
}

function generateRevealHTML(
  presentation: { title: string; filename: string },
  markdownContent: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${presentation.title}</title>
  <link rel="stylesheet" href="/lib/reveal/reveal.css">
  <link rel="stylesheet" href="/lib/reveal/theme/black.css">
  <style>
    .reveal { font-family: system-ui, -apple-system, sans-serif; }
    .reveal h1 {
      color: #e2e891; font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem;
      background: linear-gradient(45deg, #e2e891, #ffffff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .reveal h2 { color: #e2e891; font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
    .exit-btn {
      position: fixed; top: 20px; right: 20px; z-index: 1000;
      background: #e2e891; color: #000; border: none; padding: 10px 20px;
      border-radius: 5px; font-weight: bold; cursor: pointer;
    }
    .exit-btn:hover { background: #d4d480; }
  </style>
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section data-markdown>
        <textarea data-template>
${markdownContent}
        </textarea>
      </section>
    </div>
  </div>
  <button class="exit-btn" onclick="window.location.href='/demo/presentations'">Exit</button>
  <script src="/lib/reveal/reveal.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      controls: true,
      progress: true,
      center: false,
      transition: 'slide',
      slideNumber: true
    });
  </script>
</body>
</html>`;
}
