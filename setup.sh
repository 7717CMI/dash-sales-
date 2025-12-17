#!/bin/bash
# Development setup script

echo "🚀 Sales Projection Dashboard Setup"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build for production
echo ""
echo "🔨 Building for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Next steps:"
    echo "  Development:  npm run dev"
    echo "  Production:   npm start"
    echo "  Build:        npm run build"
    echo ""
    echo "📖 Visit http://localhost:3000 to view the dashboard"
else
    echo "❌ Build failed"
    exit 1
fi

