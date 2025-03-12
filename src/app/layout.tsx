import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meveddet Derneği",
  description: "Meveddet Derneği resmi web sitesi. Duyurular, etkinlikler ve iletişim bilgileri.",
  keywords: "meveddet, dernek, yardım, sosyal sorumluluk, bağış, etkinlik",
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
  openGraph: {
    title: "Meveddet Derneği",
    description: "Meveddet Derneği resmi web sitesi. Duyurular, etkinlikler ve iletişim bilgileri.",
    url: "https://www.meveddetdernegi.org",
    siteName: "Meveddet Derneği",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meveddet Derneği",
    description: "Meveddet Derneği resmi web sitesi. Duyurular, etkinlikler ve iletişim bilgileri.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <WhatsAppButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
