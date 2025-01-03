import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SessionWrapper from "./session-wrapper";
import ThemeDataProvider from "@/components/providers/theme-color-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import StoreProvider from "@/components/providers/store-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Ontime | Eznet",
  description:
    "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Ontime | Eznet",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontime | Eznet",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={GeistSans.className}>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ThemeDataProvider>
                {children}
              </ThemeDataProvider>
            </ThemeProvider>
          </StoreProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
