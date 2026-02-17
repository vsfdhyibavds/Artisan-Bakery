import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CATEGORIES = ['Recipes', 'News', 'Tips & Tricks', 'Events', 'Featured', 'Behind the Scenes'];

interface BlogFormData {
  title: string;
  excerpt: string;
  image: string;
  content: string;
  category: string;
  author: string;
  readTime: number;
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Sourdough Mastery',
      excerpt: 'Learn the secrets to perfect sourdough...',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400',
      category: 'Recipes',
      author: 'Chef Maria',
      date: '2024-01-15',
      readTime: 5
    }
  ]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<BlogFormData>({
    defaultValues: {
      title: '',
      excerpt: '',
      image: '',
      content: '',
      category: 'Recipes',
      author: 'Admin',
      readTime: 5
    }
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      if (editingId) {
        // Update existing
        setBlogs(blogs.map(b =>
          b.id === editingId
            ? { ...b, ...data, date: b.date }
            : b
        ));
        toast.success('Blog post updated');
        setEditingId(null);
      } else {
        // Create new
        const newBlog = {
          id: Math.max(...blogs.map(b => b.id), 0) + 1,
          ...data,
          date: new Date().toISOString().split('T')[0]
        };
        setBlogs([newBlog, ...blogs]);
        toast.success('Blog post created');
      }
      reset();
      setIsExpanded(false);
    } catch (error) {
      toast.error('Failed to save blog post');
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this blog post?')) {
      setBlogs(blogs.filter(b => b.id !== id));
      toast.success('Blog post deleted');
    }
  };

  const handleEdit = (blog: typeof blogs[0]) => {
    setEditingId(blog.id);
    setIsExpanded(true);
    // Reset form with blog data
    reset({
      title: blog.title,
      excerpt: blog.excerpt,
      image: blog.image,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      content: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Blog Management</h3>
          <p className="text-gray-600">Manage blog posts and articles</p>
        </div>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            setEditingId(null);
            reset();
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition"
        >
          {isExpanded ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              placeholder="Post Title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <select
              {...register('category')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <textarea
            {...register('excerpt', { required: 'Excerpt is required' })}
            placeholder="Post Excerpt (short summary)"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />

          <textarea
            {...register('content', { required: 'Content is required' })}
            placeholder="Full Post Content"
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register('image')}
              type="url"
              placeholder="Image URL"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              {...register('author')}
              type="text"
              placeholder="Author Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              {...register('readTime', { min: 1 })}
              type="number"
              placeholder="Read Time (min)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition font-semibold"
          >
            {editingId ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Posts ({blogs.length})</h4>
        {blogs.length === 0 ? (
          <p className="text-gray-600">No blog posts yet. Create your first one!</p>
        ) : (
          <div className="grid gap-4">
            {blogs.map(blog => (
              <div key={blog.id} className="border rounded-lg p-4 hover:border-amber-300 transition">
                <div className="flex gap-4">
                  {blog.image && (
                    <img src={blog.image} alt={blog.title} className="w-24 h-24 rounded object-cover" />
                  )}
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">{blog.title}</h5>
                    <p className="text-sm text-gray-600">{blog.excerpt}</p>
                    <div className="flex gap-2 mt-2 text-xs text-gray-500">
                      <span>{blog.category}</span>
                      <span>•</span>
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
