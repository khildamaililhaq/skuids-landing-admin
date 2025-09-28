import ClientThemeProvider from '../components/ThemeProvider';
import PageTransition from '../components/PageTransition';
import "./globals.css";

export const metadata = {
  title: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia | Teh Tarik Berasa",
  description: "Temukan Teh Tarik Indonesia asal Bekasi, Teh Tarik Malaysia asli, Teh Bahagia premium, dan berbagai Minuman Greentea Kemasan, Minuman Rasa Kemasan di Happy Jasmine. Rasakan perpaduan sempurna antara tradisi dan cita rasa dengan Teh Tarik Berasa signature kami.",
  keywords: "happytea, happy jasmine, teh tarik, teh tarik berasa, teh malaysia, teh premium, teh tarik asli, Teh Tarik Indonesia, Tah Tarik Cup, teh Tarik, Minuman Greentea Kemasan, Minuman Rasa Kemasan, Minuman Thattea Kemasan, Minuman Coklat Kemasan, happyjasmine, happy tea, happy tea jasmine, happyteajasmine",
  authors: [{ name: "Happy Jasmine" }],
  creator: "Happy Jasmine",
  publisher: "Happy Jasmine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://happyjasmine.co'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia",
    description: "Rasakan Teh Tarik Indonesia asal Bekasi, Teh Tarik Malaysia asli, Teh Bahagia premium, dan berbagai Minuman Greentea Kemasan di Happy Jasmine. Perpaduan sempurna antara tradisi dan cita rasa.",
    url: "https://happyjasmine.co",
    siteName: "Happy Jasmine",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia",
    description: "Rasakan Teh Tarik Indonesia asal Bekasi, Teh Tarik Malaysia asli, Teh Bahagia premium, dan berbagai Minuman Greentea Kemasan di Happy Jasmine.",
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
    "name": "Happy Jasmine",
    "description": "Produsen Teh Tarik Indonesia asal Bekasi, Teh Tarik premium, Teh Bahagia, dan berbagai Minuman Greentea Kemasan, Minuman Rasa Kemasan",
    "url": "https://happyjasmine.co",
    "logo": "https://happyjasmine.co/logo.svg",
    "image": "https://happyjasmine.co/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bekasi",
      "addressCountry": "Indonesia"
    },
    "sameAs": [
      "https://www.facebook.com/happyjasmine",
      "https://www.instagram.com/happyjasmine"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Teh Tarik Indonesia",
          "description": "Teh Tarik asli dengan cita rasa Indonesia"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Minuman Greentea Kemasan",
          "description": "Minuman greentea kemasan premium"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Minuman Coklat Kemasan",
          "description": "Minuman coklat kemasan berkualitas"
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
        <ClientThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
