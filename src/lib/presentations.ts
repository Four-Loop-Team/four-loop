import { promises as fs } from 'fs';
import path from 'path';

interface PresentationMeta {
  title: string;
  description: string;
  duration: string;
  topics: string[];
  filename: string;
  markdownPath: string;
}

// Define presentations that should be available
export const presentations: PresentationMeta[] = [
  {
    title: 'Design Tokens System',
    description:
      'Comprehensive overview of our design token system, including brand colors, typography scale, and implementation guidelines.',
    duration: '15-20 minutes',
    topics: [
      'Design Tokens',
      'Brand Colors',
      'Typography',
      'CSS/SCSS Implementation',
    ],
    filename: 'design-tokens',
    markdownPath: 'src/content/presentations/design-tokens.md',
  },
  {
    title: 'Design System Overview',
    description:
      "Complete guide to Four Loop's design system architecture, components, and best practices.",
    duration: '25-30 minutes',
    topics: ['Design System', 'Components', 'Architecture', 'Best Practices'],
    filename: 'design-system',
    markdownPath: 'docs/DESIGN_SYSTEM.md',
  },
  {
    title: 'Design Tokens (PowerPoint Ready)',
    description:
      'Executive-friendly presentation of design tokens with business context and implementation strategy.',
    duration: '10-15 minutes',
    topics: [
      'Business Value',
      'Design Tokens',
      'Implementation Strategy',
      'ROI',
    ],
    filename: 'design-tokens-powerpoint',
    markdownPath: 'docs/presentations/Design-Tokens-PowerPoint-Ready.md',
  },
  {
    title: 'Color Guidelines',
    description:
      'Detailed exploration of our brand color palette, usage guidelines, and accessibility considerations.',
    duration: '15-20 minutes',
    topics: [
      'Brand Colors',
      'Accessibility',
      'Usage Guidelines',
      'Color Theory',
    ],
    filename: 'color-guidelines',
    markdownPath: 'docs/COLOR_GUIDELINES.md',
  },
  {
    title: 'Styling Architecture',
    description:
      'Technical deep-dive into our styling system architecture, methodology, and implementation patterns.',
    duration: '30-35 minutes',
    topics: [
      'CSS Architecture',
      'Methodology',
      'Best Practices',
      'Performance',
    ],
    filename: 'styling-architecture',
    markdownPath: 'docs/STYLING_ARCHITECTURE_PROPOSAL.md',
  },
];

export async function generateRevealPresentation(
  presentation: PresentationMeta
): Promise<string> {
  try {
    const markdownPath = path.join(process.cwd(), presentation.markdownPath);
    const markdownContent = await fs.readFile(markdownPath, 'utf8');

    // Parse markdown into slides (split by --- or ## headers)
    const slides = parseMarkdownToSlides(markdownContent, presentation.title);

    return generateRevealHTML(presentation, slides);
  } catch (error) {
    console.error(
      `Failed to generate presentation for ${presentation.filename}:`,
      error
    );
    return generateErrorPresentation(presentation);
  }
}

function parseMarkdownToSlides(content: string, title: string): string[] {
  // Split by --- first (explicit slide breaks)
  let slides = content.split('---').map((slide) => slide.trim());

  // If no explicit breaks, split by ## headers
  if (slides.length === 1) {
    const lines = content.split('\n');
    let currentSlide = '';
    const parsedSlides: string[] = [];

    for (const line of lines) {
      if (line.startsWith('## ') && currentSlide.trim()) {
        parsedSlides.push(currentSlide.trim());
        currentSlide = line;
      } else {
        currentSlide += line + '\n';
      }
    }

    if (currentSlide.trim()) {
      parsedSlides.push(currentSlide.trim());
    }

    slides = parsedSlides;
  }

  // Add title slide if not present
  if (!slides[0]?.includes(title)) {
    slides.unshift(`# ${title}\n\nFour Loop Digital Brand Standards`);
  }

  return slides;
}

function parseSlideContent(content: string): string {
  return content
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const t = line.trim();
      if (t.startsWith('# ')) return `<h1>${t.slice(2)}</h1>`;
      if (t.startsWith('## ')) return `<h2>${t.slice(3)}</h2>`;
      if (t.startsWith('### ')) return `<h3>${t.slice(4)}</h3>`;
      if (t.startsWith('**') && t.endsWith('**'))
        return `<p class="mono">${t.slice(2, -2)}</p>`;

      // Handle code blocks
      if (t.startsWith('```')) {
        const lang = t.slice(3);
        return `<pre><code class="${lang}">`;
      }
      if (t === '```') return '</code></pre>';

      // Handle lists
      if (t.startsWith('- ')) return `<li>${t.slice(2)}</li>`;
      if (t.startsWith('* ')) return `<li>${t.slice(2)}</li>`;

      // Regular paragraphs
      if (t && !t.startsWith('<') && !t.includes('```')) return `<p>${t}</p>`;

      return t;
    })
    .join('\n');
}

function generateRevealHTML(
  presentation: PresentationMeta,
  slides: string[]
): string {
  const slideElements = slides
    .map((slide, index) => {
      const isTitle = index === 0;
      const parsedContent = parseSlideContent(slide);

      // Check if slide should have sub-slides (contains multiple ## headers)
      const headers = slide
        .split('\n')
        .filter((line) => line.startsWith('## '));

      if (headers.length > 1 && !isTitle) {
        // Create vertical slides
        const sections = slide.split(/(?=## )/g).filter((s) => s.trim());
        return `
        <section>
          ${sections
            .map(
              (section) => `
            <section>
              ${parseSlideContent(section)}
            </section>
          `
            )
            .join('')}
        </section>
      `;
      } else {
        return `
        <section${isTitle ? ' class="title"' : ''}>
          ${parsedContent}
        </section>
      `;
      }
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${presentation.title}</title>

  <link rel="stylesheet" href="../lib/reveal/reveal.css">
  <link rel="stylesheet" href="../lib/reveal/theme/black.css">

  <style>
    .reveal { font-family: system-ui, -apple-system, sans-serif; }
    .reveal .slides { text-align: left; }
    .reveal .slides section { text-align: left; }
    .reveal .slides section.title { text-align: center; }

    .reveal h1 {
      color: #e2e891; font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem;
      background: linear-gradient(45deg, #e2e891, #ffffff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; text-align: center;
    }
    .reveal h2 { color: #e2e891; font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
    .reveal h3 { color: #e2e891; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.8rem; }
    .reveal p { font-size: 1.3rem; line-height: 1.6; margin-bottom: 1rem; color: #fff; }
    .reveal .subtitle { font-size: 1.5rem; color: #ccc; margin-bottom: 2rem; }
    .reveal .mono { font-family: monospace; font-weight: 700; font-size: 1.5rem; color: #e2e891; }

    .reveal pre {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;
      font-size: 1.1rem; line-height: 1.4;
    }
    .reveal code { color: #e2e891; }
    .reveal ul, .reveal ol { margin-left: 2rem; }
    .reveal li { margin-bottom: 0.5rem; }

    .reveal .progress { color: #e2e891; }
    .reveal .controls { color: #e2e891; }
    .reveal .slide-number { color: #e2e891; }
    .reveal .backgrounds { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }

    .exit-btn {
      position: fixed; top: 20px; right: 20px; background: rgba(255,255,255,0.2);
      border: none; color: white; padding: 0.75rem 1.5rem; border-radius: 8px;
      cursor: pointer; font-size: 1rem; font-weight: 600; z-index: 1000;
    }
    .exit-btn:hover { background: rgba(255,255,255,0.3); }
  </style>
</head>
<body>
  <div class="reveal">
    <div class="slides">
      ${slideElements}
    </div>
  </div>

  <button class="exit-btn" onclick="exitPresentation()">Exit</button>

  <script src="../lib/reveal/reveal.js"></script>
  <script>
    Reveal.initialize({
      hash: true, controls: true, progress: true, center: false,
      transition: 'slide', backgroundTransition: 'fade',
      keyboard: {
        70: function() { Reveal.toggleFullscreen(); },
        27: function() { exitPresentation(); }
      },
      controlsTutorial: true, controlsLayout: 'bottom-right',
      controlsBackArrows: 'faded', display: 'block', embedded: false,
      slideNumber: true, slideNumberFormat: '%c of %t'
    });

    function exitPresentation() {
      if (window.opener) { window.close(); }
      else { window.location.href = '/demo/presentations'; }
    }
  </script>
</body>
</html>`;
}

function generateErrorPresentation(presentation: PresentationMeta): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error - ${presentation.title}</title>
  <link rel="stylesheet" href="../lib/reveal/reveal.css">
  <link rel="stylesheet" href="../lib/reveal/theme/black.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section class="title">
        <h1>Presentation Error</h1>
        <p>Could not load: ${presentation.title}</p>
        <p>Please check that the markdown file exists at:</p>
        <code>${presentation.markdownPath}</code>
      </section>
    </div>
  </div>
  <script src="../lib/reveal/reveal.js"></script>
  <script>Reveal.initialize();</script>
</body>
</html>`;
}
