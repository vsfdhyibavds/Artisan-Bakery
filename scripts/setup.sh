#!/bin/bash

# Setup script for the bakery project

echo "🥖 Setting up Artisan Bakery Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env 2>/dev/null || echo "VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here" > .env
    echo "📝 Please update the .env file with your Supabase credentials"
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

echo "🎉 Setup complete! You can now run:"
echo "  npm run dev    - Start development server"
echo "  npm run build  - Build for production"
echo "  npm run preview - Preview production build"

echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your Supabase credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:5173 to view the application"