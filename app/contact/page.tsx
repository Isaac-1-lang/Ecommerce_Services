"use client";

import { useState } from 'react';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiMessageSquare, 
  FiSend,
  FiCheckCircle
} from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Us',
      content: '123 Commerce Street, Business District, City, State 12345',
      link: 'https://maps.google.com',
      linkText: 'Get Directions'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      linkText: 'Call Now'
    },
    {
      icon: FiMail,
      title: 'Email Us',
      content: 'support@nowstore.com',
      link: 'mailto:support@nowstore.com',
      linkText: 'Send Email'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
      link: null,
      linkText: null
    }
  ];

  const supportTopics = [
    {
      title: 'Order Support',
      description: 'Help with orders, tracking, and delivery',
      email: 'orders@nowstore.com'
    },
    {
      title: 'Technical Support',
      description: 'Website issues and technical problems',
      email: 'tech@nowstore.com'
    },
    {
      title: 'Returns & Refunds',
      description: 'Return policies and refund processing',
      email: 'returns@nowstore.com'
    },
    {
      title: 'General Inquiries',
      description: 'General questions and feedback',
      email: 'info@nowstore.com'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We're here to help! Get in touch with us for any questions, support, or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-soft border border-neutral-200 dark:border-neutral-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <FiMessageSquare className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Send us a Message
              </h2>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <FiCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Get in Touch
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                        {info.content}
                      </p>
                      {info.link && (
                        <a
                          href={info.link}
                          className="inline-block mt-2 text-primary hover:text-primary-600 font-medium transition-colors"
                        >
                          {info.linkText}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Topics */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                Need Specific Help?
              </h3>
              <div className="space-y-4">
                {supportTopics.map((topic, index) => (
                  <div key={index} className="border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                      {topic.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {topic.description}
                    </p>
                    <a
                      href={`mailto:${topic.email}`}
                      className="text-sm text-primary hover:text-primary-600 font-medium transition-colors"
                    >
                      {topic.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Find quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                How long does shipping take?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                What is your return policy?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                We offer a 30-day return policy for most items. Some restrictions apply to electronics and personal care items.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Do you ship internationally?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Yes, we ship to most countries. Shipping costs and delivery times vary by location.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                How can I track my order?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                You'll receive a tracking number via email once your order ships. You can also track it in your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
