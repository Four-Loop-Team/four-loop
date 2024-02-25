import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { inter } from '@/app/ui/fonts';
import './ui/styles/_global.scss';

export const metadata: Metadata = {
  title: 'Four Loop Digital',
  description: 'Digital Consulting Services',
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='ui/images/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='ui/images/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='ui/images/favicon-16x16.png'
      />
      {/* <link rel='manifest' href='/site.webmanifest' /> */}
      <link
        rel='mask-icon'
        href='ui/images/safari-pinned-tab.svg'
        color='#5bbad5'
      />
      <meta name='msapplication-TileColor' content='#da532c' />
      {/* <meta name='theme-color' content='#ffffff'></meta> */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
