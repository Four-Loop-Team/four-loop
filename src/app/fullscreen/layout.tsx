import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Tokens Presentation - Four Loop Digital',
  description:
    'Interactive presentation showcasing Four Loop Digital design tokens system',
};

export default function PresentationRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; overflow: hidden; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
