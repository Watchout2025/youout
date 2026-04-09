import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import MobileNav from "@/components/MobileNav";
import { SidebarProvider } from "@/context/SidebarContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageProgressBar from "@/components/PageProgressBar";
import { Suspense } from "react";

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
    default: "YouOut - Watch Movies, TV Shows, Animes & Dramas Online",
    template: "%s | YouOut"
  },
  description: "YouOut is Video Sharing Platform Let lets you share Videos Anonymously with the world.",
  keywords: ["Youout", "Youout App", "watch movies online", "free movies", "watch TV shows", "HD movies", "4K movies", "Hindi movies", "English movies", "BluRay", "stream online", "YouOut"],
  authors: [{ name: "YouOut" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://youout.vercel.app/",
  },
  icons: {
    icon: "https://www.youtube.com/favicon.ico",
    shortcut: "https://www.youtube.com/favicon.ico",
    apple: "https://www.youtube.com/favicon.ico",
  },
  openGraph: {
    title: "YouOut – Watch Free Movies & TV Shows Online",
    description: "Stream thousands of movies and TV shows for free in HD. 4K, Hindi, English, BluRay and more on YouOut.",
    url: "https://youout.vercel.app/",
    siteName: "YouOut",
    images: [
      {
        url: "https://www.youtube.com/img/desktop/yt_1200.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouOut",
    description: "YouOut – Watch free movies and TV shows online in HD. Stream the latest releases in 4K, Hindi, English, BluRay and more.",
    images: ["https://www.youtube.com/img/desktop/yt_1200.png"],
  },
};

export const viewport = {
  themeColor: "#0f0f0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={null}>
              <PageProgressBar />
            </Suspense>
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
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
