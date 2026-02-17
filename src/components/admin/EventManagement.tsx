import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CATEGORIES = ['Workshop', 'Tasting', 'Class', 'Celebration', 'Community', 'Special'];

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity: number;
  price: number;
  image: string;
}

export default function EventManagement() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Sourdough Workshop',
      description: 'Learn to make authentic sourdough bread',
      date: '2024-02-20',
      time: '10:00',
      location: 'Main Store',
      category: 'Workshop',
      capacity: 20,
      price: 45,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400',
      registrations: 12
    }
  ]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<EventFormData>({
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '10:00',
      location: 'Main Store',
      category: 'Workshop',
      capacity: 20,
      price: 0,
      image: ''
    }
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      if (editingId) {
        // Update existing
        setEvents(events.map(e =>
          e.id === editingId
            ? { ...e, ...data }
            : e
        ));
        toast.success('Event updated');
        setEditingId(null);
      } else {
        // Create new
        const newEvent = {
          id: Math.max(...events.map(e => e.id), 0) + 1,
          ...data,
          registrations: 0
        };
        setEvents([newEvent, ...events]);
        toast.success('Event created');
      }
      reset();
      setIsExpanded(false);
    } catch (error) {
      toast.error('Failed to save event');
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
      toast.success('Event deleted');
    }
  };

  const handleEdit = (event: typeof events[0]) => {
    setEditingId(event.id);
    setIsExpanded(true);
    reset({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      capacity: event.capacity,
      price: event.price,
      image: event.image
    });
  };

  const isUpcoming = (eventDate: string) => {
    return new Date(eventDate) > new Date();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Event Management</h3>
          <p className="text-gray-600">Create and manage events</p>
        </div>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            setEditingId(null);
            reset();
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition"
        >
          {isExpanded ? 'Cancel' : '+ New Event'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              placeholder="Event Title"
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
            {...register('description', { required: 'Description is required' })}
            placeholder="Event Description"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                {...register('date', { required: 'Date is required' })}
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                {...register('time')}
                type="time"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register('location')}
              type="text"
              placeholder="Location"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              {...register('capacity', { min: 1 })}
              type="number"
              placeholder="Capacity"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              {...register('price', { min: 0 })}
              type="number"
              placeholder="Price ($)"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <input
            {...register('image')}
            type="url"
            placeholder="Image URL"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition font-semibold"
          >
            {editingId ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Events ({events.length})</h4>
        {events.length === 0 ? (
          <p className="text-gray-600">No events yet. Create your first one!</p>
        ) : (
          <div className="grid gap-4">
            {events.map(event => (
              <div key={event.id} className="border rounded-lg p-4 hover:border-amber-300 transition">
                <div className="flex gap-4">
                  {event.image && (
                    <img src={event.image} alt={event.title} className="w-24 h-24 rounded object-cover" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-900">{event.title}</h5>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      {isUpcoming(event.date) && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Upcoming</span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-2 text-sm text-gray-500">
                      <span>📅 {event.date} at {event.time}</span>
                      <span>📍 {event.location}</span>
                      <span>👥 {event.registrations}/{event.capacity}</span>
                      <span>💰 ${event.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
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
