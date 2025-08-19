import { poppins } from '@/app/ui/fonts';
import { Navigation, SkipNavigationLink } from '@/components/layout';
import { SphereLoader } from '@/components/layout/SphereLoader/SphereLoader';
import BrandThemeProvider from '@/components/system/BrandThemeProvider/BrandThemeProvider';
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

        {/* Preload Material-UI icons to prevent FOUC - load synchronously before JS */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons&display=block'
          rel='stylesheet'
          // Load synchronously to prevent FOUC
        />

        {/* Preload background sphere images to prevent flash on load */}
        <link rel='preload' as='image' href='/top-sphere.png' />
        <link rel='preload' as='image' href='/right-sphere.png' />

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
      <body className={`${poppins.variable} antialiased layout-body`}>
        <SphereLoader />
        <ThemeProvider defaultTheme='auto'>
          <SkipNavigationLink />
          <BrandThemeProvider>
            <Navigation />
            <main id='main-content' className='layout-main'>
              {children}
            </main>
          </BrandThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
