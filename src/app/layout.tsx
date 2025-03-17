import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer/footer";


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
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
