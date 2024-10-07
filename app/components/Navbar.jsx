"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavItem = ({ href, text, isActive, onClick, isMobile }) => (
  <Link
    href={href}
    className={`px-4 py-2 rounded-full transition-colors duration-300 font-black font-sans ${
      isActive ? "text-[#FFFF00]" : "text-white hover:text-[#9370DB]"
    } ${isMobile ? "text-3xl py-4" : ""}`}
    onClick={onClick}
  >
    {text}
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", text: "HOME" },
    { href: "/projects", text: "OUR PROJECTS" },
    { href: "/services", text: "OUR SERVICES" },
    { href: "/aboutus", text: "ABOUT US" },
    { href: "/contactus", text: "CONTACT US" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 z-40 w-full max-md:bg-black/50 max-md:backdrop-blur-sm pb-2.5 mt-1.5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between md:justify-center h-16">
          {/* Logo (visible only on mobile when menu is collapsed) */}
          <div className="md:hidden flex items-center md:pt-2.5">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Site Logo"
                width={52}
                height={52}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4 bg-[#4B0082] bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                text={item.text}
                isActive={pathname === item.href}
              />
            ))}
          </div>

          {/* Hamburger menu for mobile (now on the right side) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#FFFF00] p-2 rounded-md bg-[#4B0082] hover:bg-[#3a006b] transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} className="stroke-current" />
              ) : (
                <Menu size={24} className="stroke-current" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden fixed inset-0 bg-[#4B0082] bg-opacity-95 backdrop-blur-lg transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "opacity-100 visible h-screen"
                : "opacity-0 invisible"
            }`}
          >
            <div className="flex flex-col items-start justify-center h-screen px-8 py-16 space-y-6">
              {/* Close button for mobile menu */}
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-[#FFFF00] p-2 rounded-md hover:bg-[#3a006b] transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={24} className="stroke-current" />
              </button>
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  text={item.text}
                  isActive={pathname === item.href}
                  onClick={() => setIsMenuOpen(false)}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
