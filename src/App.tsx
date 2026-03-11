import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { AdminLayout, DashboardPage, DiagnosticManagePage, PlaceholderPage } from './components/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Diagnostic Assessment (standalone) */}
        <Route path="/diagnostic" element={<DiagnosticPage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="diagnostic" element={<DiagnosticManagePage />} />
          <Route path="results" element={<PlaceholderPage title="진단 결과" />} />
          <Route path="departments" element={<PlaceholderPage title="부서별 현황" />} />
          <Route path="trends" element={<PlaceholderPage title="추이 분석" />} />
          <Route path="reports" element={<PlaceholderPage title="리포트" />} />
          <Route path="questions" element={<PlaceholderPage title="문항 관리" />} />
          <Route path="settings" element={<PlaceholderPage title="시스템 설정" />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
