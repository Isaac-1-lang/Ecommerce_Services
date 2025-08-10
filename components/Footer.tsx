"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMail, FiArrowRight, FiMapPin, FiPhone, FiMail as FiEmail } from "react-icons/fi";
import { FOOTER_LINKS, SOCIAL_LINKS, SITE_CONFIG, TRUST_INDICATORS } from "../constants";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: Implement newsletter subscription
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-muted border-t border-border mt-auto">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-display">
              Stay Updated with Now Store
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest product updates, exclusive offers, and shopping tips delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <FiArrowRight className="h-4 w-4" />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-success text-sm mt-3">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="py-8 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_INDICATORS.map((indicator) => (
              <div key={indicator.id} className="text-center">
                <div className="text-3xl mb-2">{indicator.icon}</div>
                <h4 className="font-medium text-foreground mb-1">{indicator.name}</h4>
                <p className="text-sm text-muted-foreground">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary font-display mb-4 block">
              {SITE_CONFIG.name}
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              {SITE_CONFIG.tagline}. We&apos;re committed to providing you with the best shopping experience, 
              quality products, and exceptional customer service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiMapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiEmail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{SITE_CONFIG.email}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="p-2 rounded-full bg-muted-foreground/20 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Business</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.business.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</span>
              <span>•</span>
              <span>Business Hours: {SITE_CONFIG.businessHours}</span>
            </div>
            
            <nav className="flex items-center gap-6 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
