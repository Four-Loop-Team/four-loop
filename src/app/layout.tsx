import { poppins } from '@/app/ui/fonts';
import { Navigation, SkipNavigationLink } from '@/components/layout';
import { MuiThemeProvider } from '@/components/system';
import { ThemeProvider } from '@/components/ThemeProvider';
import { homeMetadata } from '@/lib/metadata';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  renderStructuredData,
} from '@/lib/structured-data';
import type { Metadata, Viewport } from 'next';
import './ui/styles/_global.scss';

export const metadata: Metadata = homeMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang='en'>
      <head>
        {/* Favicon and touch icons */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />

        {/* Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: renderStructuredData(organizationSchema),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: renderStructuredData(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        style={{
          backgroundColor: 'var(--color-background)',
          minHeight: '100vh',
        }}
      >
        <ThemeProvider defaultTheme='auto'>
          <SkipNavigationLink />
          <MuiThemeProvider>
            <Navigation />
            <main
              id='main-content'
              style={{
                backgroundColor: 'var(--color-background)',
                minHeight: '100vh',
              }}
            >
              {children}
            </main>
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
