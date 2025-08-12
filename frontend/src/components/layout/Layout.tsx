// src/components/layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet will render the child route element, e.g., <HomePage /> */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;