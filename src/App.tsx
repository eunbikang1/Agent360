import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Agent360Dashboard from './components/Agent360Dashboard';
import Branch360Dashboard from './components/Branch360Dashboard';
// import Branch360DashboardAlt from './components/Branch360DashboardAlt';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 기본 경로는 Agent360Dashboard로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/agent" replace />} />

          {/* Agent360Dashboard - 지점장용 일일 브리핑 */}
          <Route path="/agent" element={<Agent360Dashboard />} />

          {/* Branch360Dashboard - 지점 상세 분석 */}
          <Route path="/branch/:agency/:branchName" element={<Branch360Dashboard />} />

          {/* Branch360DashboardAlt - 지점 상세 분석 (대안 레이아웃) */}
          {/* <Route path="/branch-alt/:agency/:branchName" element={<Branch360DashboardAlt />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;