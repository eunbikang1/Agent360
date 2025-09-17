#!/bin/bash

# Korean Insurance Dashboard - Quick Setup Script
# This script sets up the complete Korean insurance dashboard with all dependencies

echo "🏢 Setting up Korean Insurance Dashboard..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Start the development server
echo "🚀 Starting development server..."
echo "Dashboard will be available at: http://localhost:3000"
echo ""
echo "📋 Available Routes:"
echo "  • Main Dashboard: http://localhost:3000 (통합 인사이트 뷰)"
echo "  • Branch Detail: http://localhost:3000/branch/:branchName (지점 360° 상세 뷰)"
echo ""
echo "✨ Features included:"
echo "  • Korean insurance dashboard with KPI tracking"
echo "  • Interactive branch rankings with sorting capabilities"
echo "  • Progress bars with expected progress indicators and tooltips"
echo "  • Branch 360° detailed view with comprehensive analytics"
echo "  • Product sales characteristics with visual metrics"
echo "  • Manager contribution analysis and goal achievement tracking"
echo "  • Responsive design with Tailwind CSS"
echo "  • Modal dialogs with detailed branch data and filtering"
echo "  • Real-time calculations with Korean currency formatting"
echo ""

npm start