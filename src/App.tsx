import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Agent360Dashboard from './components/Agent360Dashboard';
import Branch360Dashboard from './components/Branch360Dashboard';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;