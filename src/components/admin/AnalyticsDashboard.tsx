import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    inventoryLow: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      // Fetch total orders
      const { data: orders } = await supabase
        .from('orders')
        .select('id, total_price');
      // Fetch total customers
      const { data: customers } = await supabase
        .from('customers')
        .select('id');
      // Fetch inventory low
      const { data: products } = await supabase
        .from('products')
        .select('id, stock')
        .lt('stock', 10);
      setStats({
        totalOrders: orders?.length || 0,
        totalRevenue: orders?.reduce((sum: number, o: { total_price?: number }) => sum + (o.total_price || 0), 0) || 0,
        totalCustomers: customers?.length || 0,
        inventoryLow: products?.length || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Analytics Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
            <p className="text-2xl">{stats.totalOrders}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
            <p className="text-2xl">${stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
            <p className="text-2xl">{stats.totalCustomers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Products Low in Stock</h2>
            <p className="text-2xl">{stats.inventoryLow}</p>
          </div>
        </div>
      )}
    </div>
  );
}
