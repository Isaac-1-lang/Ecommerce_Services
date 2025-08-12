"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiMapPin, FiPhone, FiMail as FiEmail } from "react-icons/fi";
import { FOOTER_LINKS, SOCIAL_LINKS, SITE_CONFIG, TRUST_INDICATORS } from "../constants";

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

  return (
    <footer className="bg-highlight border-t border-neutral-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="py-8 border-b border-neutral-200">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              Stay Updated
            </h3>
            <p className="text-neutral-600 mb-4 text-sm">
              Get updates and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-1 text-sm"
              >
                Subscribe
                <FiArrowRight className="h-4 w-4" />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-success text-sm mt-2">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="py-6 border-b border-neutral-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_INDICATORS.map((indicator) => (
              <div key={indicator.id} className="text-center">
                <div className="text-2xl mb-1">{indicator.icon}</div>
                <h4 className="font-medium text-neutral-800 text-sm mb-1">{indicator.name}</h4>
                <p className="text-xs text-neutral-600">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-primary mb-3 block">
              {SITE_CONFIG.name}
            </Link>
            <p className="text-neutral-600 mb-4 text-sm leading-relaxed max-w-sm">
              {SITE_CONFIG.tagline}. Quality products and exceptional customer service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-neutral-700">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 text-primary" />
                <span className="text-sm text-neutral-700">{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEmail className="h-4 w-4 text-primary" />
                <span className="text-sm text-neutral-700">{SITE_CONFIG.email}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-base">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-neutral-800 mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-neutral-800 mb-3 text-sm">Support</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="font-semibold text-neutral-800 mb-3 text-sm">Business</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.business.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-neutral-600">
              <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</span>
              <span className="hidden sm:inline text-neutral-400">•</span>
              <span>Hours: {SITE_CONFIG.businessHours}</span>
            </div>
            
            <div className="flex items-center gap-4">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className="text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}