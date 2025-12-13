import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Configuration des fonts
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"], // Ajout de 800 pour les titres très gras
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

// Configuration Viewport (Séparé des metadata dans Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

// Metadata SEO globale
export const metadata: Metadata = {
  metadataBase: new URL("https://orea.ci"), // INDISPENSABLE pour que les images OG fonctionnent
  title: {
    default: "ORÉA | L'annuaire beauté premium en Côte d'Ivoire",
    template: "%s | ORÉA",
  },
  description:
    "La première plateforme digitale dédiée à l'excellence de la beauté en Côte d'Ivoire. Coiffure, maquillage, soins : trouvez et réservez les meilleurs talents d'Abidjan.",
  keywords: [
    "beauté Abidjan",
    "coiffure Côte d'Ivoire",
    "maquilleuse mariage Abidjan",
    "salon de beauté Abidjan",
    "onglerie",
    "barber shop",
    "braids",
    "nattes collées",
    "ORÉA",
  ],
  authors: [{ name: "ORÉA" }],
  creator: "ORÉA",
  publisher: "ORÉA",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "https://orea.ci",
    siteName: "ORÉA",
    title: "ORÉA | Révélez votre éclat",
    description:
      "Trouvez les meilleurs professionnels de la beauté en Côte d'Ivoire. Une sélection rigoureuse pour des prestations d'exception.",
    images: [
      {
        url: "/og-image.jpg", // Assurez-vous d'avoir une image 'public/og-image.jpg' (1200x630px)
        width: 1200,
        height: 630,
        alt: "ORÉA - Annuaire Beauté Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORÉA | L'annuaire beauté premium",
    description: "Trouvez les meilleurs professionnels de la beauté en Côte d'Ivoire.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${lato.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground font-sans selection:bg-gold/20 selection:text-anthracite">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}