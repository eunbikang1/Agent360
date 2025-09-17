# Korean Insurance Dashboard

A comprehensive Korean insurance dashboard built with React and TypeScript, featuring real-time KPI tracking, branch performance analytics, and interactive data visualization.

## 🏢 Features

### Main Dashboard (통합 인사이트 뷰)
- **KPI Tracking**: Real-time monitoring of goal achievement rates, designer activity, and mobile contract rates
- **Branch Rankings**: Interactive "우수지점 TOP 5" with detailed modal view
- **Progress Indicators**: Visual progress bars with expected progress lines
- **Responsive Design**: Optimized for desktop and mobile viewing

### Branch Detail View (지점 360° 상세 뷰)
- **Detailed Analytics**: Comprehensive branch performance metrics
- **Goal Achievement**: Progress tracking with expected vs actual performance
- **Interactive Charts**: Visual representation of performance data
- **Manager Contribution**: Detailed breakdown of manager and branch contributions

### Interactive Features
- **Sortable Tables**: Click column headers to sort by different criteria
- **Modal Dialogs**: Detailed view of all 160 branches with filtering
- **Navigation**: Seamless routing between main dashboard and branch details
- **Real-time Updates**: Dynamic data calculations and formatting

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Quick Setup (Recommended)**
   ```bash
   ./quick-dashboard-setup.sh
   ```

2. **Manual Setup**
   ```bash
   npm install
   npm start
   ```

3. **Access the Dashboard**
   - Main Dashboard: http://localhost:3000
   - Branch Detail: http://localhost:3000/branch/[branch-name]

## 📋 Available Routes

| Route | Description | Korean Name |
|-------|-------------|-------------|
| `/` | Main Dashboard | 통합 인사이트 뷰 |
| `/branch/:branchName` | Branch Detail View | 지점 360° 상세 뷰 |

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Build Tool**: Create React App

## 📊 Dashboard Components

### Main Dashboard Features
- **Goal Achievement Tracking** (목표달성률)
- **Designer Activity Monitoring** (설계사 가동률)
- **Mobile Contract Rates** (모바일 청약률)
- **Branch Performance Rankings** (우수지점 TOP 5)
- **Comprehensive Branch Modal** (전체 지점 현황)

### Branch Detail Features
- **Performance Metrics** (실적 현황)
- **Goal Progress Visualization** (목표 달성 진도)
- **Manager Contribution Analysis** (지점장 기여도)
- **Design & Contract Analytics** (설계 & 청약 분석)

## 🎨 UI/UX Features

- **Clean Design**: Modern, professional interface
- **Korean Typography**: Optimized for Korean text display
- **Color Coding**: Intuitive color schemes for different data types
- **Responsive Layout**: Grid-based responsive design
- **Interactive Elements**: Hover effects and smooth transitions

## 📈 Data Features

- **Real-time Calculations**: Dynamic percentage and currency formatting
- **Sorting Capabilities**: Multi-column sorting with visual indicators
- **Progress Tracking**: Expected vs actual progress visualization
- **Currency Formatting**: Intelligent Korean currency display (만원, 억원)

## 🔧 Development

### Available Scripts

- `npm start` - Runs the development server at http://localhost:3000
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Project Structure
```
src/
├── components/
│   ├── Agent360Dashboard.tsx    # Main dashboard component
│   └── Branch360Dashboard.tsx   # Branch detail component
├── App.tsx                      # Main app with routing
└── index.css                    # Global styles with Tailwind
```

### Key Components
- **Agent360Dashboard**: Main dashboard with KPI cards and branch rankings
- **Branch360Dashboard**: Detailed branch view with comprehensive analytics
- **Interactive Modals**: Full-screen branch data exploration
- **Progress Bars**: Custom progress indicators with expected progress lines

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop**: Full-featured experience with all interactive elements
- **Tablet**: Adapted layouts with touch-friendly interfaces
- **Mobile**: Streamlined views with essential information

## 🌟 Key Highlights

- **Korean Business Logic**: Designed specifically for Korean insurance industry
- **Performance Optimized**: Efficient rendering and state management
- **User-Friendly**: Intuitive navigation and clear data presentation
- **Extensible**: Modular component architecture for easy expansion

## 📄 License

This project is licensed under the MIT License.

## 🤖 Generated with [Claude Code](https://claude.ai/code)

This dashboard was developed with assistance from Claude Code, Anthropic's AI coding assistant.
