import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meveddet | Meveddet Derneği",
  description: "Meveddet Derneği resmi web sitesi. Meveddet, tasavvuf, manevi değerler, kültürel miras, sosyal sorumluluk, yardım, bağış ve etkinlikler hakkında bilgi alın.",
  keywords: "meveddet, meveddet derneği, tasavvuf, manevi değerler, kültürel miras, sosyal sorumluluk, yardım, bağış, etkinlik, dernek, vakıf, islami kuruluş, dini dernek, manevi dernek, tasavvuf derneği, meveddet vakfı, meveddet derneği istanbul, meveddet derneği etkinlikleri, meveddet derneği duyuruları, meveddet derneği iletişim",
  authors: [{ name: "Meveddet Derneği" }],
  creator: "Meveddet Derneği",
  publisher: "Meveddet Derneği",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.meveddetdernegi.org"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Meveddet | Meveddet Derneği",
    description: "Meveddet Derneği resmi web sitesi. Meveddet, tasavvuf, manevi değerler, kültürel miras, sosyal sorumluluk, yardım, bağış ve etkinlikler hakkında bilgi alın.",
    url: "https://www.meveddetdernegi.org",
    siteName: "Meveddet Derneği",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Meveddet Derneği Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meveddet | Meveddet Derneği",
    description: "Meveddet Derneği resmi web sitesi. Meveddet, tasavvuf, manevi değerler, kültürel miras, sosyal sorumluluk, yardım, bağış ve etkinlikler hakkında bilgi alın.",
    images: ['/logo.png'],
    creator: "@meveddetdernegi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <meta name="author" content="Meveddet Derneği" />
        <meta name="copyright" content="Meveddet Derneği" />
        <meta name="theme-color" content="#7C3AED" />
        <meta name="generator" content="Meveddet Derneği" />
        <meta name="distribution" content="Meveddet Derneği" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <WhatsAppButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
