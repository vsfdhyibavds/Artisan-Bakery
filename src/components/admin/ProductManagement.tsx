import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProductManagement() {
  type Product = { id: number; name: string; price: number; stock: number; category?: string };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', stock: '', category: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data || []);
    setLoading(false);
  }

  async function handleCreate() {
    const { error } = await supabase.from('products').insert([
      { name: form.name, price: Number(form.price), stock: Number(form.stock), category: form.category }
    ]);
    if (!error) {
      setForm({ name: '', price: '', stock: '', category: '' });
      fetchProducts();
    }
  }

  async function handleUpdate(id: number) {
    const { error } = await supabase.from('products').update({
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category
    }).eq('id', id);
    if (!error) {
      setEditingId(null);
      setForm({ name: '', price: '', stock: '', category: '' });
      fetchProducts();
    }
  }

  async function handleDelete(id: number) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
      category: product.category || ''
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
        />
        {editingId ? (
          <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate(editingId)}>Update</button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>Add</button>
        )}
        {editingId && (
          <button className="ml-2 px-4 py-2" onClick={() => { setEditingId(null); setForm({ name: '', price: '', stock: '', category: '' }); }}>Cancel</button>
        )}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">${product.price}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">
                  <button className="mr-2 text-blue-500" onClick={() => startEdit(product)}>Edit</button>
                  <button className="text-red-500" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
