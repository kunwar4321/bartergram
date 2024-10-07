import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import SplashScreen from "./components/SplashScreen";
import "./globals.css";

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
      <body>
        <SplashScreen />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
