import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: 'Aksh Patel - QA Automation Engineer | Portfolio',
  description: 'QA Automation Engineer specializing in Playwright, Selenium, and test architecture. Building production-grade testing frameworks at Lumos Learning.',
  keywords: [
    'QA Automation',
    'Playwright',
    'Selenium',
    'Test Engineer',
    'Quality Assurance',
    'Test Automation',
    'Software Testing',
    'India',
  ],
  authors: [
    {
      name: 'Aksh Patel',
      url: 'https://yourdomain.com',
    },
  ],
  creator: 'Aksh Patel',
  publisher: 'Aksh Patel',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://yourdomain.com',
    title: 'Aksh Patel - QA Automation Engineer',
    description: 'Portfolio of QA automation engineer specializing in Playwright and Selenium',
    siteName: 'Aksh Patel Portfolio',
    images: [
      {
        url: 'https://yourdomain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aksh Patel QA Automation Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aksh Patel - QA Automation Engineer',
    description: 'QA Automation Engineer | Playwright | Selenium | Test Architecture',
    images: ['https://yourdomain.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-slate-900 text-slate-50 antialiased">
        {children}
        
        {/* Global Analytics (uncomment and add your ID) */}
        {/* <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_ID', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}
      </body>
    </html>
  );
}
