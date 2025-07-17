# Artisan Bakery - Complete Full-Stack Application

A modern, responsive web application for an artisan bakery with complete backend integration, authentication, and e-commerce functionality.

## 🚀 **Auto-Configuration Features**

### **Supabase Auto-Setup**
The application automatically detects and configures Supabase from multiple sources:

1. **Environment Variables** (highest priority)
2. **Local Storage** (user configured)
3. **Demo Mode** (fallback for development)

### **Platform Detection**
- Automatically detects deployment platform (Netlify, Vercel, localhost)
- Configures appropriate settings for each environment
- Handles environment variables seamlessly

## 🛠️ **Quick Setup**

### **Option 1: Automatic Setup**
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Click the "Setup" button in the header to configure Supabase
5. Enter your Supabase credentials or use demo mode

### **Option 2: Manual Configuration**
1. Create a `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
2. Run `npm install && npm run dev`

### **Option 3: Demo Mode**
- The app works out of the box with mock data
- No configuration required for development
- Perfect for testing and demonstration

## 🗄️ **Database Features**

### **Complete Schema**
- **Products** - Full catalog with categories, pricing, allergens
- **Orders** - Complete order management system
- **Customers** - User profiles and authentication
- **Events** - Workshop and class management
- **Blog** - Content management system
- **Testimonials** - Customer review system

### **Security**
- Row Level Security (RLS) on all tables
- User-based data access policies
- Secure authentication with Supabase Auth

## 🔧 **Backend Integration**

### **Real-time Features**
- Live order status updates
- Real-time inventory management
- Instant notifications

### **E-commerce**
- Shopping cart with persistence
- Order processing workflow
- Custom cake builder
- Payment integration ready

### **Content Management**
- Blog post management
- Event registration system
- Newsletter subscriptions
- Customer testimonials

## 🎯 **Key Features**

### **For Customers**
- Browse products by category
- Add items to cart
- Create custom cakes
- Register for events
- Leave testimonials
- Subscribe to newsletter

### **For Business**
- Order management
- Inventory tracking
- Customer management
- Event scheduling
- Content publishing
- Analytics ready

## 🚀 **Deployment**

### **Netlify**
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### **Vercel**
```bash
npm run build
# Deploy with Vercel CLI or GitHub integration
```

### **Docker**
```bash
docker-compose up --build
```

## 🔐 **Environment Variables**

### **Required for Production**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Optional Integrations**
```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_GOOGLE_MAPS_API_KEY=your_maps_key
VITE_GOOGLE_ANALYTICS_ID=your_analytics_id
```

## 📱 **Progressive Web App**

- Responsive design for all devices
- Offline capability ready
- Fast loading with optimized assets
- SEO optimized

## 🧪 **Development**

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript checking

### **Development Features**
- Hot Module Replacement
- TypeScript support
- Tailwind CSS
- React Query for state management
- Zustand for client state

## 🎨 **Design System**

- **Colors**: Primary (brown tones), Accent (warm yellow)
- **Typography**: Inter + Playfair Display
- **Components**: Modular and reusable
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📊 **State Management**

- **Server State**: React Query (TanStack Query)
- **Client State**: Zustand stores
- **Authentication**: Supabase Auth
- **Cart**: Persistent with localStorage

## 🔒 **Security**

- Environment variable validation
- Input sanitization
- XSS protection
- CSRF protection
- Secure headers in production

## 📈 **Performance**

- Code splitting
- Lazy loading
- Image optimization
- Bundle optimization
- Caching strategies

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

MIT License - see LICENSE file for details

## 🆘 **Support**

- Check the setup guide above
- Use the in-app Supabase setup tool
- Review the demo mode for testing
- Check environment variable configuration

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Supabase**