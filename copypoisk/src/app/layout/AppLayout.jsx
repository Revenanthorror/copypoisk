import { Outlet } from 'react-router-dom';
import TopBar from '@/widgets/TopBar';

export default function AppLayout() {
  return (
    <>
      <TopBar />
      <main style={{ padding: '20px', minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </main>
    </>
  );
}