import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import SplashScreen from "./components/SplashScreen";
import "./globals.css";

import localFont from "next/font/local";

export const lemonMilk = localFont({
  src: [
    {
      path: "../public/fonts/lemonpink/LEMONMILK-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/lemonpink/LEMONMILK-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/lemonpink/LEMONMILK-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/lemonpink/LEMONMILK-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/lemonpink/LEMONMILK-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/lemonpink/LEMONMILK-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/lemonpink/LEMONMILK-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/lemonpink/LEMONMILK-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-lemon-milk",
  display: "swap",
});

import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Bartergram",
  description: "A creative digital media agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={`${inter.className} ${lemonMilk.variable}`}>
        <SplashScreen />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
