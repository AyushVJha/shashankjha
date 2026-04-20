import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advocate Shashank Shekhar Jha | Supreme Court of India",
  description:
    "Official website of Advocate Shashank Shekhar Jha — Supreme Court lawyer, PIL filer, TV panelist, and constitutional rights advocate. Fighting for justice across India.",
  keywords: [
    "Shashank Shekhar Jha",
    "Supreme Court Advocate",
    "PIL",
    "Public Interest Litigation",
    "Indian Lawyer",
    "Constitutional Rights",
    "Hindu Advocacy",
    "Supreme Court of India",
    "shashankjha.in",
  ],
  authors: [{ name: "Shashank Shekhar Jha" }],
  creator: "Shashank Shekhar Jha",
  metadataBase: new URL("https://shashankjha.in"),
  openGraph: {
    title: "Advocate Shashank Shekhar Jha | Supreme Court of India",
    description:
      "Official website of Advocate Shashank Shekhar Jha — Supreme Court lawyer, PIL filer, TV panelist, and constitutional rights advocate.",
    url: "https://shashankjha.in",
    siteName: "Shashank Shekhar Jha",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Advocate Shashank Shekhar Jha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advocate Shashank Shekhar Jha | Supreme Court of India",
    description:
      "Supreme Court lawyer, PIL filer, TV panelist. Fighting for constitutional rights and justice.",
    creator: "@shashank_ssj",
    images: ["/images/og-image.jpg"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shashank Shekhar Jha",
  jobTitle: "Advocate, Supreme Court of India",
  url: "https://shashankjha.in",
  sameAs: [
    "https://twitter.com/shashank_ssj",
    "https://instagram.com/shashank.ssj",
  ],
  description:
    "Advocate Shashank Shekhar Jha is a practicing lawyer before the Supreme Court of India, known for filing impactful PILs on constitutional and social matters.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Constitutional Law",
    "Public Interest Litigation",
    "Criminal Litigation",
    "Corporate Law",
    "Consumer Protection",
    "Cyber Law",
  ],
};

const jsonLdLegalService = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Advocate Shashank Shekhar Jha — Legal Services",
  url: "https://shashankjha.in",
  description:
    "Legal services including PIL filing, criminal litigation, constitutional remedies, corporate disputes, and consumer protection across Indian courts.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  provider: {
    "@type": "Person",
    name: "Shashank Shekhar Jha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegalService) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
