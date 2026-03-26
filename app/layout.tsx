import type { Metadata } from "next";
import {Geist, Geist_Mono, IBM_Plex_Serif, Mona_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "sonner";

const ibmPlexSerif= IBM_Plex_Serif({
    variable: "--font-ibm-plex-serif",
    subsets: ['latin'],
    weight:['400', '500', '600', '700'],
    display: 'swap'
});


const monaSans= Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ['latin'],
    display: 'swap'
})

export const metadata: Metadata = {
  title: "EchoBooks",
  description: "EchoBooks is an audiobook app that lets users listen to books anytime, anywhere with immersive audio narration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
    <html lang="en">
      <body
        className={`${ibmPlexSerif.variable} ${monaSans.variable} relative font-sans antialiased`}
      >
      <Navbar />
        {children}
      <Toaster richColors toastOptions={{}} />
      </body>
    </html>
      </ClerkProvider>
  );
}
