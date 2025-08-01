import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function CategoryManagement() {
  type Category = { id: number; name: string };
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*');
    if (!error) setCategories(data || []);
    setLoading(false);
  }

  async function handleCreate() {
    const { error } = await supabase.from('categories').insert([
      { name: form.name }
    ]);
    if (!error) {
      setForm({ name: '' });
      fetchCategories();
    }
  }

  async function handleUpdate(id: number) {
    const { error } = await supabase.from('categories').update({
      name: form.name
    }).eq('id', id);
    if (!error) {
      setEditingId(null);
      setForm({ name: '' });
      fetchCategories();
    }
  }

  async function handleDelete(id: number) {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) fetchCategories();
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setForm({ name: category.name });
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>
      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Category Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        {editingId ? (
          <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdate(editingId)}>Update</button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>Add</button>
        )}
        {editingId && (
          <button className="ml-2 px-4 py-2" onClick={() => { setEditingId(null); setForm({ name: '' }); }}>Cancel</button>
        )}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: Category) => (
              <tr key={category.id}>
                <td className="py-2 px-4">{category.name}</td>
                <td className="py-2 px-4">
                  <button className="mr-2 text-blue-500" onClick={() => startEdit(category)}>Edit</button>
                  <button className="text-red-500" onClick={() => handleDelete(category.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
