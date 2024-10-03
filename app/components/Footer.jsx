"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-purple-500 hover:text-purple-100 transition-colors duration-300 text-xs sm:text-sm"
  >
    {children}
  </Link>
);

const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-gray-200 p-1.5 rounded-full transition-colors duration-300 bg-purple-600"
  >
    <Icon size={20} />
  </a>
);

export default function Footer() {
  return (
    <footer className="text-purple-500 rounded-t-3xl p-4 sm:p-6 lg:p-8 bg-black relative z-10">
      <div className="p-6 border-purple-600 border-2 rounded-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              HAVE A PROJECT ?
            </h2>
            <p className="text-lg sm:text-xl mb-4">Lets Talk About it !</p>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Useful Links
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <FooterLink href="/">HOME</FooterLink>
              <FooterLink href="/refund-policy">
                REFUND & RETURN POLICY
              </FooterLink>
              <FooterLink href="/privacy-policy">PRIVACY STATEMENT</FooterLink>
              <FooterLink href="/terms-and-conditions">
                TERMS OF SERVICE
              </FooterLink>
              <FooterLink href="/contactus">CONTACT US</FooterLink>
            </div>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">SOCIAL</h3>
            <div className="flex gap-4 mb-6">
              <SocialIcon Icon={Facebook} href="https://facebook.com" />
              <SocialIcon Icon={Instagram} href="https://twitter.com" />
              <SocialIcon Icon={Youtube} href="https://youtube.com" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              GET IN TOUCH
            </h3>
            <p className="mb-2 text-sm sm:text-base">
              support@bartergram.co or Fill in the{" "}
              <Link
                href="/contactus"
                className="text-yellow-300 hover:underline"
                onClick={() => {
                  sessionStorage.setItem("IsCareerFormOpen", "YES");
                }}
              >
                Hiring Form
              </Link>
            </p>
            <p className="text-sm sm:text-base">Contact Us : +917506109507</p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm">
          <p>Copyright © 2024 | Powered by Bartergram</p>
        </div>
      </div>
    </footer>
  );
}
