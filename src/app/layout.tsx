import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className={"antialiased"}>
        <Header />
        <div className="relative">
          <main className="relative z-50 min-h-[100vh] bg-white">
            {children}
          </main>
          <Footer className="sticky bottom-0 z-10" />
        </div>
      </body>
    </html>
  );
}
