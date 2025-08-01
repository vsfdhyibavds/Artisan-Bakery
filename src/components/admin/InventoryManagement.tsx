import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Product {
  id: string;
  name: string;
  stock: number;
}

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('products')
        .select('id, name, stock')
        .order('name');
      if (error) setError(error.message);
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleStockChange = async (id: string, newStock: number) => {
    const { error } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', id);
    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
      );
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-left">Update</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    min={0}
                    defaultValue={product.stock}
                    className="border rounded px-2 py-1 w-20"
                    onBlur={(e) => {
                      const value = Number(e.target.value);
                      if (value !== product.stock) handleStockChange(product.id, value);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
