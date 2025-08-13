"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiMapPin, FiPhone, FiMail, FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { SITE_CONFIG } from "../constants";

interface FooterProps {
  variant?: 'default' | 'admin' | 'delivery' | 'employee';
}

export default function Footer({ variant = 'default' }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com' },
    { name: 'Facebook', icon: FiFacebook, url: 'https://facebook.com' },
    { name: 'Instagram', icon: FiInstagram, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com' },
  ];

  const quickLinks = [
    { name: 'About Us', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'Help Center', url: '/help' },
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Shipping Info', url: '/shipping' },
    { name: 'Deals', url: '/deals' },
    { name: 'New Arrivals', url: '/new-arrivals' },
    { name: 'Brands', url: '/brands' },
  ];

  const customerServiceLinks = [
    { name: 'Help Center', url: '/help' },
    { name: 'Contact Us', url: '/contact' },
    { name: 'Returns', url: '/returns' },
    { name: 'Shipping Info', url: '/shipping' },
  ];

  // Different footer styles based on variant
  const getFooterStyle = () => {
    switch (variant) {
      case 'admin':
        return 'bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 ml-64';
      case 'delivery':
        return 'bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 ml-64';
      case 'employee':
        return 'bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 ml-64';
      default:
        return 'bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700';
    }
  };

  const getContainerStyle = () => {
    switch (variant) {
      case 'admin':
      case 'delivery':
      case 'employee':
        return 'max-w-full px-6';
      default:
        return 'max-w-6xl px-4 sm:px-6 lg:px-8';
    }
  };

  // Simplified footer for admin/delivery/employee pages
  if (variant !== 'default') {
    return (
      <footer className={`${getFooterStyle()} mt-auto`}>
        <div className={`mx-auto ${getContainerStyle()} py-6`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Company Info */}
            <div className="flex items-center gap-3">
              <Link href="/" className="text-lg font-bold text-primary">
                {SITE_CONFIG.name}
              </Link>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Professional Dashboard
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-6 text-xs">
              <Link href="/help" className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors cursor-pointer">
                Help
              </Link>
              <Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors cursor-pointer">
                Contact
              </Link>
              <Link href="/privacy" className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors cursor-pointer">
                Privacy
              </Link>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>System Online</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Full footer for main pages
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-neutral-200 dark:border-neutral-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold text-primary mb-3 block">
              {SITE_CONFIG.name}
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              Quality products and exceptional customer service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FiMapPin className="h-4 w-4 text-primary" />
                <span className="text-xs text-neutral-700 dark:text-neutral-300">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FiPhone className="h-4 w-4 text-primary" />
                <span className="text-xs text-neutral-700 dark:text-neutral-300">{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FiMail className="h-4 w-4 text-primary" />
                <span className="text-xs text-neutral-700 dark:text-neutral-300">{SITE_CONFIG.email}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4 text-sm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors block py-1 cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              {customerServiceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Subscribe
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-background text-neutral-800 dark:text-neutral-200 text-sm"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-3 py-2 rounded-md font-semibold hover:opacity-90 transition text-sm"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <p className="text-success text-xs mt-2">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-6 text-sm text-center text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
