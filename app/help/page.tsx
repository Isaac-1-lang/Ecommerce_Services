"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiSearch, 
  FiHelpCircle, 
  FiShoppingCart, 
  FiTruck, 
  FiRefreshCw, 
  FiCreditCard, 
  FiShield, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink
} from 'react-icons/fi';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I track my order?',
    answer: 'You can track your order by logging into your account and visiting the "Orders" section, or by using the tracking number provided in your order confirmation email. You can also track your order without logging in by entering your order number and email address on our tracking page.',
    category: 'orders'
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. Items must be unused and in their original packaging. Some items may have different return policies due to their nature (e.g., electronics, personal care items). Please check the product page for specific return information.',
    category: 'returns'
  },
  {
    id: '3',
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) and overnight shipping are also available for select items. International shipping times vary by location and can take 7-14 business days.',
    category: 'shipping'
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and gift cards. We also offer financing options through our partner providers for qualifying purchases.',
    category: 'payment'
  },
  {
    id: '5',
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers. All transactions are processed through secure payment gateways that comply with PCI DSS standards.',
    category: 'security'
  },
  {
    id: '6',
    question: 'How do I create an account?',
    answer: 'You can create an account by clicking the "Sign Up" button in the top navigation. You\'ll need to provide your email address, create a password, and verify your email. You can also create an account during checkout.',
    category: 'account'
  },
  {
    id: '7',
    question: 'Can I cancel my order?',
    answer: 'You can cancel your order within 1 hour of placing it if it hasn\'t been processed for shipping yet. Once an order is being processed, you\'ll need to contact our customer service team to request cancellation.',
    category: 'orders'
  },
  {
    id: '8',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Some items may not be available for international shipping due to restrictions or regulations.',
    category: 'shipping'
  }
];

const helpCategories = [
  {
    id: 'orders',
    name: 'Orders & Tracking',
    icon: FiShoppingCart,
    description: 'Track orders, view order history, and manage your purchases',
    color: 'bg-primary/10 text-primary'
  },
  {
    id: 'shipping',
    name: 'Shipping & Delivery',
    icon: FiTruck,
    description: 'Shipping options, delivery times, and tracking information',
    color: 'bg-success/10 text-success'
  },
  {
    id: 'returns',
    name: 'Returns & Refunds',
    icon: FiRefreshCw,
    description: 'Return policies, refund processing, and exchanges',
    color: 'bg-warning/10 text-warning'
  },
  {
    id: 'payment',
    name: 'Payment & Billing',
    icon: FiCreditCard,
    description: 'Payment methods, billing questions, and financing options',
    color: 'bg-info/10 text-info'
  },
  {
    id: 'security',
    name: 'Security & Privacy',
    icon: FiShield,
    description: 'Account security, data protection, and privacy policies',
    color: 'bg-danger/10 text-danger'
  },
  {
    id: 'account',
    name: 'Account & Profile',
    icon: FiUser,
    description: 'Account management, profile settings, and preferences',
    color: 'bg-secondary/10 text-secondary'
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiHelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">Help Center</h1>
          </div>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Find answers to common questions and get the support you need
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">How can we help you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                  selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {faq.question}
                  </h3>
                  {expandedFAQ === faq.id ? (
                    <FiChevronUp className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-neutral-400" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Still need help?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Our customer support team is here to help you with any questions or concerns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiMail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Email Support</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Get a response within 24 hours
              </p>
              <Link
                href="mailto:support@nowstore.com"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                support@nowstore.com
                <FiExternalLink className="h-4 w-4" />
              </Link>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiPhone className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Phone Support</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Available Mon-Fri, 9AM-6PM EST
              </p>
              <Link
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 text-success hover:text-success/80 transition-colors"
              >
                +1 (555) 123-4567
                <FiExternalLink className="h-4 w-4" />
              </Link>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Live Chat</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Chat with us in real-time
              </p>
              <button className="inline-flex items-center gap-2 text-warning hover:text-warning/80 transition-colors">
                Start Chat
                <FiExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/contact"
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-soft border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">Contact Us</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Get in touch</p>
            </Link>
            <Link
              href="/returns"
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-soft border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">Returns</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Return policy</p>
            </Link>
            <Link
              href="/shipping"
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-soft border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">Shipping</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Shipping info</p>
            </Link>
            <Link
              href="/privacy"
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-soft border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">Privacy</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Privacy policy</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
