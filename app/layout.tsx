import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = {
  title: "Rizki Sundara — Full Stack Software Engineer",
  description: "Software engineer in Jakarta. Enterprise applications, backend engineering, business process automation, and independent products Catatin and LAGAKAMI.",
  openGraph: { title: "Rizki Sundara — Software Engineer", description: "Selected work, professional experience, and independent software products.", type: "website", locale: "en_US", siteName: "Rizki Sundara" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#101615" };
export default function RootLayout({ children }: {children: ReactNode}) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body>{children}</body></html>;
}
