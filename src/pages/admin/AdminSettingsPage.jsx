import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { settingsService } from '../../services/settingsService';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: '',
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    whatsappDefaultMessage: '',
    freeShippingThreshold: 500,
    standardShippingFee: 49
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsService.getSettings().then((res) => {
      setSettings(res.data);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await settingsService.updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert(err.message || 'Error updating settings');
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Store & WhatsApp Settings
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure business contact info, threshold rules for free shipping, and WhatsApp support.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>Website settings successfully saved!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-6 text-xs">
        <h3 className="font-serif font-bold text-base text-gray-900 border-b border-gray-100 pb-3">
          1. General Business Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Company / Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Support Phone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Official Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Office & Nursery Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
            />
          </div>
        </div>

        <h3 className="font-serif font-bold text-base text-gray-900 border-b border-gray-100 pb-3 pt-4">
          2. Floating WhatsApp Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-gray-700 block mb-1">
              WhatsApp Number (with country code, e.g. 919348354248)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">
              Prefilled Message for Customers
            </label>
            <input
              type="text"
              value={settings.whatsappDefaultMessage}
              onChange={(e) => setSettings({ ...settings, whatsappDefaultMessage: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
            />
          </div>
        </div>

        <h3 className="font-serif font-bold text-base text-gray-900 border-b border-gray-100 pb-3 pt-4">
          3. Shipping & Cash on Delivery Thresholds
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-gray-700 block mb-1">
              Free Delivery Order Minimum (₹)
            </label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) =>
                setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">
              Standard Courier Fee if Below Threshold (₹)
            </label>
            <input
              type="number"
              value={settings.standardShippingFee}
              onChange={(e) =>
                setSettings({ ...settings, standardShippingFee: Number(e.target.value) })
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

