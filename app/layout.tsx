import type { Metadata } from "next";
import { Source_Sans_3, Playfair_Display, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";
import { MainNav } from "@/components/layout/MainNav";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";


const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '600', '700', '900'],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '700', '900'],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "Portal do Sudoeste | Notícias de Poções e Região",
  description: "O maior portal de notícias do sudoeste baiano. Informação com credibilidade sobre Poções, Jequié, Vitória da Conquista e muito mais.",
  keywords: ["notícias", "sudoeste baiano", "poções", "jequié", "vitória da conquista", "portal do sudoeste"],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import { AdminBar } from "@/components/admin/AdminBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${sourceSans.variable} ${playfair.variable} ${sourceSerif.variable} font-sans antialiased text-brand-blue-primary flex flex-col min-h-screen`}>
        <AdminBar />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientLayoutWrapper
            nav={<MainNav />}
            ticker={<NewsTicker />}
            header={<SiteHeader />}
            footer={<SiteFooter />}
          >
            {children}
          </ClientLayoutWrapper>

        </ThemeProvider>
      </body>
    </html>
  );
}
