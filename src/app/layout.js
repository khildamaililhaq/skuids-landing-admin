import ClientThemeProvider from '../components/ThemeProvider';
import PageTransition from '../components/PageTransition';
import IntlProvider from '../components/IntlProvider';
import "./globals.css";

export const metadata = {
  title: "Ekacita - Platform Streaming Profesional",
  description: "Bergabunglah dengan platform streaming profesional Ekacita dan mulai hasilkan pendapatan dari live streaming Anda hari ini.",
  keywords: "streaming, platform live, streaming host, penghasilan streaming, chamet, poppo",
  authors: [{ name: "Ekacita" }],
  creator: "Ekacita",
  publisher: "Ekacita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ekacita.live'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Ekacita - Platform Streaming Profesional",
    description: "Bergabunglah dengan platform streaming profesional Ekacita dan mulai hasilkan pendapatan dari live streaming Anda hari ini.",
    url: "https://ekacita.live",
    siteName: "Ekacita",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ekacita - Platform Streaming Profesional",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekacita - Platform Streaming Profesional",
    description: "Bergabunglah dengan platform streaming profesional Ekacita dan mulai hasilkan pendapatan dari live streaming Anda hari ini.",
    images: ["/og-image.jpg"],
  },
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
};

// Font loading moved to _document.js equivalent
const fontLink = {
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css2?family=Bemio:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
  crossOrigin: 'anonymous',
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skuids",
    "description": "Live streaming host recruitment agency partnering with Chamet and Poppo to provide professional hosting services for online platforms.",
    "url": "https://skuids.live",
    "logo": "https://skuids.live/logo.svg",
    "image": "https://skuids.live/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "Indonesia"
    },
    "sameAs": [
      "https://www.facebook.com/skuids",
      "https://www.instagram.com/skuids"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Host Recruitment",
          "description": "Recruiting professional live streaming hosts for Chamet and Poppo"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Streaming Talent Management",
          "description": "Managing and training live streaming talent"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Partner Host Services",
          "description": "Providing hosts for official partners Chamet and Poppo"
        }
      }
    ]
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link {...fontLink} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <IntlProvider>
          <ClientThemeProvider>
            <PageTransition>
              {children}
            </PageTransition>
          </ClientThemeProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
