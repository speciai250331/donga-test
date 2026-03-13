import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import {
  AdminLayout, DashboardPage, DiagnosticManagePage,
  ResultsPage, DepartmentsPage, TrendsPage,
  ReportsPage, QuestionsPage, SettingsPage,
} from './components/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="diagnostic" element={<DiagnosticManagePage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="trends" element={<TrendsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
