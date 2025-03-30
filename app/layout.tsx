// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css"; // Import global styles
import Header from "@/app/components/shared/Header"; // Make sure Header is imported

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snapshot Finance",
  description: "Analyse your subscription spending.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header is included here, rendered on every page */}
        <Header />
        {/* Page content is rendered here */}
        {children}
        {/* Optional Footer could go here */}
      </body>
    </html>
  );
}