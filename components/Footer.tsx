"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiMapPin, FiPhone, FiMail, FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { SITE_CONFIG } from "../constants";

export default function Footer() {
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
  ];

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="py-8 border-b border-neutral-200 dark:border-neutral-700">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Get updates and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-1 text-sm"
              >
                Subscribe
                <FiArrowRight className="h-3 w-3" />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-success text-xs mt-2">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
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
                  className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-primary hover:text-white transition-colors"
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
                  className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors block py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Business Hours & Status */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4 text-sm">Store Info</h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Business Hours</p>
                <p className="text-xs text-neutral-700 dark:text-neutral-300">{SITE_CONFIG.businessHours}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Status</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-neutral-700 dark:text-neutral-300">Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-center text-xs text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}