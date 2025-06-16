#!/bin/bash

# Deployment script for the bakery project

echo "🚀 Deploying Artisan Bakery Project..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build the project
echo "🏗️  Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build successful!"

# Optional: Run preview to test the build
if [ "$1" = "--preview" ]; then
    echo "👀 Starting preview server..."
    npm run preview
fi

echo "🎉 Deployment ready! The dist/ directory contains the built application."