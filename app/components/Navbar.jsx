'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({ href, text, isActive }) => (
  <Link 
    href={href} 
    className={`px-4 py-2 rounded-full transition-colors duration-300 ${
      isActive 
        ? 'text-[#FFFF00] font-bold' // Exact yellow from the brand icon
        : 'text-[#8A2BE2] hover:text-[#9370DB]' // Purple color similar to the brand icon
    }`}
  >
    {text}
  </Link>
)

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', text: 'HOME' },
    { href: '/projects', text: 'OUR PROJECTS' },
    { href: '/services', text: 'OUR SERVICES' },
    { href: '/contactus', text: 'CONTACT US' },
    { href: '/aboutus', text: 'ABOUT US' },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-4 bg-[#4B0082] bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
            {navItems.map((item) => (
              <NavItem 
                key={item.href} 
                href={item.href} 
                text={item.text} 
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}