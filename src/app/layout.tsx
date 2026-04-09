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
  description: "YouOut is a premium video sharing platform for creators and viewers. Watch the latest trends, discover new music, and join a global community.",
  keywords: ["video sharing", "youout", "streaming", "content creators", "watch videos"],
  authors: [{ name: "YouOut Team" }],
  openGraph: {
    title: "YouOut - Experience Video Like Never Before",
    description: "Watch and share high-quality videos on YouOut.",
    url: "https://youout.vercel.app",
    siteName: "YouOut",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouOut",
    description: "Experience the next generation of video sharing.",
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
