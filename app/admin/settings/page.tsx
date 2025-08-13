"use client";

import { useState } from 'react';
import { 
  FiSave, 
  FiGlobe, 
  FiDollarSign, 
  FiTruck, 
  FiMail, 
  FiShield,
  FiUsers,
  FiPackage,
  FiCreditCard,
  FiBell,
  FiMonitor,
  FiDatabase
} from 'react-icons/fi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'Now Store',
    storeDescription: 'Premium E-commerce Experience',
    storeEmail: 'support@nowstore.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Commerce Street, Business District, City, State 12345',
    timezone: 'America/New_York',
    currency: 'USD',
    language: 'en'
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 50,
    standardShippingCost: 5.99,
    expressShippingCost: 12.99,
    internationalShippingCost: 25.99,
    maxShippingDays: 7,
    allowInternational: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    applePayEnabled: false,
    googlePayEnabled: false,
    allowCashOnDelivery: true,
    requirePaymentConfirmation: false
  });

  const [emailSettings, setEmailSettings] = useState({
    orderConfirmation: true,
    shippingUpdates: true,
    marketingEmails: false,
    newsletterSignup: true,
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'noreply@nowstore.com',
    smtpPassword: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    requirePhoneVerification: false,
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8
  });

  const tabs = [
    { id: 'general', name: 'General', icon: FiGlobe },
    { id: 'shipping', name: 'Shipping', icon: FiTruck },
    { id: 'payment', name: 'Payment', icon: FiCreditCard },
    { id: 'email', name: 'Email', icon: FiMail },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'users', name: 'Users', icon: FiUsers },
    { id: 'products', name: 'Products', icon: FiPackage },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'appearance', name: 'Appearance', icon: FiMonitor },
    { id: 'advanced', name: 'Advanced', icon: FiDatabase }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Store Name
          </label>
          <input
            type="text"
            value={generalSettings.storeName}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeName: e.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Store Email
          </label>
          <input
            type="email"
            value={generalSettings.storeEmail}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Store Phone
          </label>
          <input
            type="tel"
            value={generalSettings.storePhone}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, storePhone: e.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Currency
          </label>
          <select
            value={generalSettings.currency}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, currency: e.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="AUD">AUD (A$)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Timezone
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="Europe/Paris">Paris (CET)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Language
          </label>
          <select
            value={generalSettings.language}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Store Description
        </label>
        <textarea
          value={generalSettings.storeDescription}
          onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeDescription: e.target.value }))}
          rows={3}
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Store Address
        </label>
        <textarea
          value={generalSettings.storeAddress}
          onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeAddress: e.target.value }))}
          rows={3}
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        />
      </div>
    </div>
  );

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Free Shipping Threshold ($)
          </label>
          <input
            type="number"
            value={shippingSettings.freeShippingThreshold}
            onChange={(e) => setShippingSettings(prev => ({ ...prev, freeShippingThreshold: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Standard Shipping Cost ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={shippingSettings.standardShippingCost}
            onChange={(e) => setShippingSettings(prev => ({ ...prev, standardShippingCost: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Express Shipping Cost ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={shippingSettings.expressShippingCost}
            onChange={(e) => setShippingSettings(prev => ({ ...prev, expressShippingCost: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            International Shipping Cost ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={shippingSettings.internationalShippingCost}
            onChange={(e) => setShippingSettings(prev => ({ ...prev, internationalShippingCost: Number(e.target.value) }))}
            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={shippingSettings.allowInternational}
            onChange={(e) => setShippingSettings(prev => ({ ...prev, allowInternational: e.target.checked }))}
            className="rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            Allow International Shipping
          </span>
        </label>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={paymentSettings.stripeEnabled}
            onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripeEnabled: e.target.checked }))}
            className="rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            Enable Stripe Payments
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={paymentSettings.paypalEnabled}
            onChange={(e) => setPaymentSettings(prev => ({ ...prev, paypalEnabled: e.target.checked }))}
            className="rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            Enable PayPal Payments
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={paymentSettings.applePayEnabled}
            onChange={(e) => setPaymentSettings(prev => ({ ...prev, applePayEnabled: e.target.checked }))}
            className="rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            Enable Apple Pay
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={paymentSettings.googlePayEnabled}
            onChange={(e) => setPaymentSettings(prev => ({ ...prev, googlePayEnabled: e.target.checked }))}
            className="rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            Enable Google Pay
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={paymentSettings.allowCashOnDelivery}
            onChange={(e) => setPaymentSettings(prev => ({ ...prev, allowCashOnDelivery: e.target.checked }))}
            className="rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            Allow Cash on Delivery
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={paymentSettings.requirePaymentConfirmation}
            onChange={(e) => setPaymentSettings(prev => ({ ...prev, requirePaymentConfirmation: e.target.checked }))}
            className="rounded border-neutral-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            Require Payment Confirmation
          </span>
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'shipping':
        return renderShippingSettings();
      case 'payment':
        return renderPaymentSettings();
      default:
        return (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              Settings for this section are coming soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Settings</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <FiSave className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
              {tabs.find(tab => tab.id === activeTab)?.name} Settings
            </h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
