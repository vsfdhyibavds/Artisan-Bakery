import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Edit, Save, X, ImagePlus, KeyRound, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../stores/authStore';

function PasswordChange({ onChange }: { onChange: () => void }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ oldPassword: string; newPassword: string }>();
  const onSubmit = async () => {
    // TODO: Integrate with Supabase password change
    alert('Password change submitted!');
    reset();
    onChange();
  };
  return (
    <form onSubmit={handleSubmit(() => onSubmit())} className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Change Password</h3>
      <input {...register('oldPassword', { required: 'Current password required' })} type="password" placeholder="Current Password" className="border p-2 w-full rounded" />
      {errors.oldPassword && <p className="text-red-500 text-xs">{errors.oldPassword.message}</p>}
      <input {...register('newPassword', { required: 'New password required' })} type="password" placeholder="New Password" className="border p-2 w-full rounded" />
      {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword.message}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Change Password</button>
    </form>
  );
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

function useOrders(userId: string | null) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    supabase
      .from('orders')
      .select('*')
      .eq('customer_id', userId)
      .order('created_at', { ascending: false })
      .then((response: { data: any[]; error: any }) => {
        const { data, error } = response;
        if (!error && data) setOrders(data);
        setLoading(false);
      });
  }, [userId]);

  return { orders, loading };
}

export default function Profile() {
  const { user, customer, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  // Use avatarUrl from customer if available, else fallback
  const [avatarUrl, setAvatarUrl] = useState((customer && 'avatar_url' in customer ? (customer as any).avatar_url : '') || '');
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: customer?.first_name || '',
      lastName: customer?.last_name || '',
      email: customer?.email || user?.email || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      city: customer?.city || '',
      zipCode: customer?.zip_code || '',
    }
  });
  const { orders, loading } = useOrders(user?.id ?? null);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You need to be signed in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ProfileFormData) => {
    const success = await updateProfile({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      zip_code: data.zipCode,
      avatar_url: avatarUrl,
    });
    if (success) {
      setIsEditing(false);
    }
  };
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });
    if (error) {
      alert('Failed to upload image: ' + error.message);
      return;
    }
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    if (urlData?.publicUrl) {
      setAvatarUrl(urlData.publicUrl);
      // Optionally update profile immediately
      await updateProfile({ avatar_url: urlData.publicUrl });
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold text-center"
          >
            My Profile
          </motion.h1>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-primary-50 dark:bg-primary-900/20 px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={avatarUrl || '/default-avatar.png'} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-4 border-primary-600" />
                    {isEditing && (
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-primary-600 p-2 rounded-full text-white"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        <ImagePlus className="w-4 h-4" />
                      </button>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={avatarInputRef}
                      style={{ display: 'none' }}
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {customer?.first_name} {customer?.last_name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Member since {new Date(user.created_at).getFullYear()}
                    </p>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={() => setShowPasswordChange((v) => !v)}
                  className="ml-4 flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <KeyRound className="w-4 h-4" />
                  Change Password
                </button>
                {/* Admin controls example */}
                {user?.role === 'admin' && (
                  <button className="ml-4 flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
                    <Shield className="w-4 h-4" />
                    Admin Controls
                  </button>
                )}
              </div>
            </div>

            {/* Profile Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        {...register('firstName', { required: 'First name is required' })}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        {...register('lastName', { required: 'Last name is required' })}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        {...register('phone', { required: 'Phone number is required' })}
                        type="tel"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Address Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Street Address
                      </label>
                      <input
                        {...register('address')}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City
                        </label>
                        <input
                          {...register('city')}
                          type="text"
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code
                        </label>
                        <input
                          {...register('zipCode')}
                          type="text"
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
              {/* Password Change Section */}
              {showPasswordChange && <PasswordChange onChange={() => setShowPasswordChange(false)} />}
              {/* Order History Section */}
              {!loading && orders.length > 0 && (
                <section className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Order History</h3>
                  <ul>
                    {orders.map(order => (
                      <li key={order.id} className="border-b py-2 flex justify-between items-center">
                        <span>
                          #{order.id} - {order.created_at?.slice(0, 10)} - ${order.total_price}
                        </span>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                          onClick={() => {/* TODO: Implement reorder logic */}}
                        >
                          Reorder
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}