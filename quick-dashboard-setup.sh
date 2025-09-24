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
echo "  • Branch Detail: http://localhost:3000/branch/:agency/:branchName (지점 360° 상세 뷰)"
echo ""
echo "✨ Latest Features (Updated):"
echo "  • Korean insurance dashboard with KPI tracking"
echo "  • Interactive branch rankings with sorting capabilities"
echo "  • Progress bars with expected progress indicators and tooltips"
echo "  • Branch 360° detailed view with comprehensive analytics"
echo "  • Product sales characteristics with visual metrics and sortable columns"
echo "  • Manager contribution analysis and goal achievement tracking"
echo "  • Agent ranking system with TOP5 display and full 47-agent modal"
echo "  • Comprehensive agent data with commission months and performance tracking"
echo "  • Distinction between 신규위촉 (newly commissioned) and 신규가동 (newly active) agents"
echo "  • Consistent data across all views - no random data generation"
echo "  • Sortable product table with APE and contract count columns"
echo "  • Responsive design with Tailwind CSS"
echo "  • Modal dialogs with detailed branch data and filtering"
echo "  • Real-time calculations with Korean currency formatting"
echo "  • CSV download functionality for reports (UTF-8 BOM support)"
echo "  • Resizable modal windows for better UX"
echo "  • Multi-alert system with priority-based categorization (🔴위험, 🟢기회, 🔵변화)"
echo "  • Enhanced header layout with two-layer design"
echo "  • Unified date format display (YYYY.MM.DD)"
echo "  • Search functionality with temporary state (filters apply only on button click)"
echo "  • Period filter integration in branch detail view"
echo "  • Dynamic agency and branch selection with proper data consistency"
echo "  • Dynamic month selection affecting monthly performance trend charts"
echo "  • Separated customer characteristics and contract characteristics cards"
echo "  • Contract characteristics: monthly premium, payment period, main/rider ratios"
echo "  • Dynamic chart titles based on selected period (e.g., '2025년 월별 실적', '9월 일별 실적')"
echo "  • Limited daily charts to 30 days maximum for better visual consistency"
echo "  • Unified 'APE' terminology across all chart toggles"
echo "  • Enhanced card layouts with visual separators and improved spacing"
echo "  • Active agent filtering: '전체 설계사' → '전체 가동 설계사' with proper filtering"
echo "  • Management activity card with accordion UI (expandable/collapsible)"
echo "  • Current month emphasis and 6-month historical data display"
echo "  • Intuitive directional arrows (↓/↑) for expand/collapse actions"
echo "  • Smooth transition animations for better user experience"
echo "  • Unit display formatting for insurance premiums and contract counts"
echo "  • Right-aligned unit labels matching table structure"
echo "  • Decimal formatting for MMP values (one decimal place)"
echo "  • Consistent data across ranking and modal views"
echo ""

npm start