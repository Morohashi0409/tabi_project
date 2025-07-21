import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Map, Trophy, User, Camera } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'ホーム' },
    { path: '/map', icon: Map, label: 'マップ' },
    { path: '/achievements', icon: Trophy, label: '実績' },
    { path: '/gallery', icon: Camera, label: 'ギャラリー' },
    { path: '/profile', icon: User, label: 'プロフィール' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-[#F39C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2E86C1] to-[#F39C12] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-[#1B2E57]">TabiTabi</span>
            </Link>
            <div className="text-sm text-gray-600 font-medium">発見の旅路</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-2">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#2E86C1] bg-blue-50 scale-105'
                      : 'text-gray-600 hover:text-[#2E86C1] hover:bg-blue-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1 font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;