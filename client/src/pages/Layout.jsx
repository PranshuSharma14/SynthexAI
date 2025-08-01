import { SignIn, useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen">

      <nav className="w-full h-16 px-8 flex items-center justify-between border-b border-gray-200">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-15 cursor-pointer"
          onClick={() => navigate('/')}
        />
        {
          sidebar ? (
            <X onClick={() => setSidebar(false)} className="w-6 h-6 sm:hidden text-gray-600" />
          ) : (
            <Menu onClick={() => setSidebar(true)} className="w-6 h-6 sm:hidden text-gray-600" />
          )
        }
      </nav>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">

        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Page Content */}
        <div className="flex-1 bg-[#F4F7FB] p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
