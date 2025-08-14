import { FiUser, FiMapPin, FiBell, FiShield, FiTruck, FiSave, FiEdit } from 'react-icons/fi';

export default function DeliverySettingsPage() {
  // Mock settings data - replace with real data from backend
  const profileData = {
    name: 'John Delivery',
    email: 'john.delivery@example.com',
    phone: '+1 (555) 123-4567',
    vehicle: 'Ford Transit Van',
    licensePlate: 'ABC-1234',
    serviceArea: 'Downtown, Midtown, Uptown',
    experience: '3 years',
    availability: 'Monday - Friday, 8 AM - 6 PM'
  };

  const notificationSettings = {
    newDeliveries: true,
    routeUpdates: true,
    customerMessages: false,
    systemAlerts: true,
    performanceReports: true,
    weatherAlerts: true
  };

  const deliveryPreferences = {
    maxDeliveriesPerDay: 20,
    preferredRouteType: 'fastest',
    autoAcceptDeliveries: false,
    allowNightDeliveries: false,
    requireSignature: true,
    contactlessDelivery: true
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Settings</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage your account and delivery preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
            <FiSave className="h-4 w-4 inline mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Profile Information</h2>
          <button className="p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
            <FiEdit className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              defaultValue={profileData.name}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              defaultValue={profileData.email}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Phone Number
            </label>
            <input 
              type="tel" 
              defaultValue={profileData.phone}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Vehicle Type
            </label>
            <input 
              type="text" 
              defaultValue={profileData.vehicle}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              License Plate
            </label>
            <input 
              type="text" 
              defaultValue={profileData.licensePlate}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Service Area
            </label>
            <input 
              type="text" 
              defaultValue={profileData.serviceArea}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-6">
          <FiBell className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Notification Preferences</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">New Deliveries</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Get notified when new deliveries are assigned</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notificationSettings.newDeliveries} className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Route Updates</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Receive real-time route optimization updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notificationSettings.routeUpdates} className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Customer Messages</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Get notified of customer messages and requests</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notificationSettings.customerMessages} className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">System Alerts</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Important system notifications and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notificationSettings.systemAlerts} className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Performance Reports</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Weekly and monthly performance summaries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notificationSettings.performanceReports} className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Weather Alerts</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Weather conditions affecting deliveries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notificationSettings.weatherAlerts} className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Preferences */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-6">
          <FiTruck className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Delivery Preferences</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Maximum Deliveries Per Day
            </label>
            <select 
              defaultValue={deliveryPreferences.maxDeliveriesPerDay}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              <option value={15}>15 deliveries</option>
              <option value={20}>20 deliveries</option>
              <option value={25}>25 deliveries</option>
              <option value={30}>30 deliveries</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Preferred Route Type
            </label>
            <select 
              defaultValue={deliveryPreferences.preferredRouteType}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              <option value="fastest">Fastest Route</option>
              <option value="shortest">Shortest Route</option>
              <option value="avoid-tolls">Avoid Tolls</option>
              <option value="avoid-highways">Avoid Highways</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">Auto-Accept Deliveries</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Automatically accept new delivery assignments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={deliveryPreferences.autoAcceptDeliveries} className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">Allow Night Deliveries</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Accept deliveries after 6 PM</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={deliveryPreferences.allowNightDeliveries} className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">Require Signature</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Always require customer signature for delivery</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={deliveryPreferences.requireSignature} className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">Contactless Delivery</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Prefer contactless delivery when possible</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={deliveryPreferences.contactlessDelivery} className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-6">
          <FiShield className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Security & Privacy</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">Change Password</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Update your account password</p>
            </div>
            <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              Change
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">Two-Factor Authentication</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              Enable
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">Location Sharing</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Control how your location is shared during deliveries</p>
            </div>
            <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-soft border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Account Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="px-4 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors text-left">
            <p className="font-medium">Download Data</p>
            <p className="text-sm">Export your delivery history and data</p>
          </button>
          
          <button className="px-4 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors text-left">
            <p className="font-medium">Deactivate Account</p>
            <p className="text-sm">Temporarily deactivate your delivery account</p>
          </button>
          
          <button className="px-4 py-3 bg-error/10 text-error-600 rounded-lg hover:bg-error/20 transition-colors text-left">
            <p className="font-medium">Delete Account</p>
            <p className="text-sm">Permanently delete your account and data</p>
          </button>
          
          <button className="px-4 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors text-left">
            <p className="font-medium">Contact Support</p>
            <p className="text-sm">Get help with account issues</p>
          </button>
        </div>
      </div>
    </div>
  );
}
