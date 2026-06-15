import React from 'react';
import { Home, User, Settings, LogOut, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white shadow-lg">
      {/* Logo Section */}
      <div className="flex h-20 items-center justify-center border-b border-gray-800 text-2xl font-bold text-blue-500">
        MyDashboard
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2 p-4">
        <SidebarItem icon={<Home size={20} />} label="Dashboard" />
        <SidebarItem icon={<BarChart2 size={20} />} label="Analytics" />
        <SidebarItem icon={<User size={20} />} label="Profile" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" />
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-800">
        <SidebarItem icon={<LogOut size={20} />} label="Logout" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <a
    href="#"
    className="flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-blue-600 hover:text-white"
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

export default Sidebar;