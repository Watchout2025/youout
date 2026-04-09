import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import MobileNav from "@/components/MobileNav";
import { SidebarProvider } from "@/context/SidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "YouOut - Experience Video Like Never Before",
    template: "%s | YouOut"
  },
  description: "YouOut – Watch free movies and TV shows online in HD. Stream the latest releases in 4K, Hindi, English, BluRay and more.",
  keywords: ["Youout", "Youout App", "watch movies online", "free movies", "watch TV shows", "HD movies", "4K movies", "Hindi movies", "English movies", "BluRay", "stream online", "YouOut"],
  authors: [{ name: "YouOut Team" }],
  icons: {
    icon: "https://www.youtube.com/favicon.ico",
    shortcut: "https://www.youtube.com/favicon.ico",
    apple: "https://www.youtube.com/favicon.ico",
  },
  openGraph: {
    title: "YouOut - Experience Video Like Never Before",
    description: "YouOut – Watch free movies and TV shows online in HD. Stream the latest releases in 4K, Hindi, English, BluRay and more.",
    url: "https://youout.vercel.app",
    siteName: "YouOut",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouOut",
    description: "YouOut – Watch free movies and TV shows online in HD. Stream the latest releases in 4K, Hindi, English, BluRay and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f0f0f] text-white`}
      >
        <SidebarProvider>
          <Navbar />
          <div className="pt-14 pb-12 md:pb-0">
            <Sidebar />
            <MainContent>
              {children}
            </MainContent>
          </div>
          <MobileNav />
        </SidebarProvider>
      </body>
    </html>
  );
}
