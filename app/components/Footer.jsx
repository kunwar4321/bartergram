'use client'
import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Youtube } from 'lucide-react'

const FooterLink = ({ href, children }) => (
  <Link href={href} className="text-purple-300 hover:text-purple-100 transition-colors duration-300">
    {children}
  </Link>
)

const SocialIcon = ({ Icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-100 transition-colors duration-300">
    <Icon size={24} />
  </a>
)

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-purple-300 rounded-t-3xl p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">HAVE A PROJECT ?</h2>
          <p className="text-xl mb-4">Lets Talk About it !</p>
          <h3 className="text-2xl font-semibold mb-2">Useful Links</h3>
          <div className="flex flex-wrap gap-4">
            <FooterLink href="/">HOME</FooterLink>
            <FooterLink href="/refund-policy">REFUND & RETURN POLICY</FooterLink>
            <FooterLink href="/privacy">PRIVACY STATEMENT</FooterLink>
            <FooterLink href="/terms">TERMS OF SERVICE</FooterLink>
            <FooterLink href="/contactus">CONTACT US</FooterLink>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">SOCIAL</h3>
          <div className="flex gap-4 mb-6">
            <SocialIcon Icon={Facebook} href="https://facebook.com" />
            <SocialIcon Icon={Twitter} href="https://twitter.com" />
            <SocialIcon Icon={Youtube} href="https://youtube.com" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text">GET IN TOUCH</h3>
          <p className="mb-2">
            support@bartergram.co or Fill in the{' '}
            <Link href="/contactus" className="text-yellow-300 hover:underline">
              Hiring Form
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>Copyright © 2024 | Powered by Bartergram</p>
      </div>
    </footer>
  )
}