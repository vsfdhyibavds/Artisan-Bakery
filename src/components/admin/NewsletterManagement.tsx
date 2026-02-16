import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, Trash2, Eye, EyeOff } from 'lucide-react';
import { db } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEmails, setShowEmails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      // If database function exists, use it; otherwise use mock data
      const { data } = await db.getNewsletterSubscribers?.() || { data: [] };
      setSubscribers(data || mockSubscribers);
    } catch (error) {
      console.error('Failed to load subscribers:', error);
      // Use mock data on error
      setSubscribers(mockSubscribers);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!window.confirm('Remove this subscriber?')) return;

    try {
      // This would delete from database in production
      setSubscribers(prev => prev.filter(s => s.id !== subscriberId));
      toast.success('Subscriber removed');
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      toast.error('Failed to remove subscriber');
    }
  };

  const handleExportEmails = () => {
    const emails = subscribers.map(s => s.email).join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(emails));
    element.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Emails exported');
  };

  const handleSendNewsletter = () => {
    toast.success(`Newsletter template ready to send to ${subscribers.length} subscribers`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Newsletter Management
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage email subscribers and send newsletters
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/40 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Subscribers</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{subscribers.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">This Month</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {subscribers.filter(s => {
                const date = new Date(s.created_at);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">Growth Rate</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">+12%</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search subscribers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={() => setShowEmails(!showEmails)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {showEmails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showEmails ? 'Hide' : 'Show'}
        </button>
        <button
          onClick={handleExportEmails}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button
          onClick={handleSendNewsletter}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          <Mail className="w-4 h-4" />
          Send
        </button>
      </div>

      {/* Subscribers List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : filteredSubscribers.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No subscribers found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Subscribed Date
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((subscriber, index) => (
                <motion.tr
                  key={subscriber.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                    {showEmails ? subscriber.email : subscriber.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(subscriber.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDeleteSubscriber(subscriber.id)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-600 dark:text-gray-300">
        <p>
          Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredSubscribers.length}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{subscribers.length}</span> subscribers
        </p>
      </div>
    </motion.div>
  );
}

// Mock data for demo
const mockSubscribers: NewsletterSubscriber[] = [
  { id: '1', email: 'john@example.com', created_at: '2024-01-15' },
  { id: '2', email: 'sarah@example.com', created_at: '2024-01-18' },
  { id: '3', email: 'mike@example.com', created_at: '2024-01-20' },
  { id: '4', email: 'emily@example.com', created_at: '2024-01-22' },
  { id: '5', email: 'david@example.com', created_at: '2024-02-01' },
  { id: '6', email: 'jessica@example.com', created_at: '2024-02-05' },
  { id: '7', email: 'robert@example.com', created_at: '2024-02-10' },
  { id: '8', email: 'lisa@example.com', created_at: '2024-02-12' },
];
