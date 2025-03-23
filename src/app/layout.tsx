import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "I-Fineart",
  description: "Created with Frontend Tribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased bg-black text-white"}>
        <Header />
        <main className="relative z-10 min-h-[100vh] bg-black text-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
