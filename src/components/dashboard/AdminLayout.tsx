import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 240, padding: 32, background: '#F8FAFB' }}>
        <Outlet />
      </main>
    </div>
  );
};
