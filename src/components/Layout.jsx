import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AIChat from './AIChat';
import AIGuidedTour from './AIGuidedTour';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-mesh text-foreground transition-colors duration-500">
      <Navbar />
      <main className="pt-28 pb-16 px-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <AIChat />
      <AIGuidedTour />
    </div>
  );
};

export default Layout;
