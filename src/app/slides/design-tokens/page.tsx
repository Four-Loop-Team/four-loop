import MarkdownPresentation from '@/components/MarkdownPresentation';
import { promises as fs } from 'fs';
import path from 'path';

export default async function DesignTokensPresentation() {
  // Read the markdown file
  const markdownPath = path.join(
    process.cwd(),
    'src/content/presentations/design-tokens.md'
  );
  const markdownContent = await fs.readFile(markdownPath, 'utf8');

  return (
    <MarkdownPresentation
      markdownContent={markdownContent}
      title='Design Tokens System'
    />
  );
}
