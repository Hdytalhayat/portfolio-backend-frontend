import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  FaMoon, FaSun
} from 'react-icons/fa';
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for sticky navbar
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false); // Close menu on navigation
  };
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-opacity-80 backdrop-blur-sm" style={{ backgroundColor: 'var(--bg)' }}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" onClick={() => handleScrollTo('about')} className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
            #hdytalhayat
          </a>
          <div className="hidden md:flex space-x-8">
            <a href="#about" onClick={() => handleScrollTo('about')} className="hover:text-primary transition">About</a>
            <a href="#techstack" onClick={() => handleScrollTo('techstack')} className="hover:text-primary transition">TechStack</a>
            <a href="#projects" onClick={() => handleScrollTo('projects')} className="hover:text-primary transition">Projects</a>
            <a href="#contact" onClick={() => handleScrollTo('contact')} className="hover:text-primary transition">Contact</a>
          </div>
          <div className="flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none">
                {theme === 'light' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
            </button>

            <button className="md:hidden ml-4" onClick={() => setMobileMenuOpen(true)}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-8 text-xl text-white">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-2xl">
            <i className="fas fa-times"></i>
          </button>
          <a href="#about" onClick={() => handleScrollTo('about')} className="py-2">About</a>
          <a href="#techstack" onClick={() => handleScrollTo('techstack')} className="py-2">TechStack</a>
          <a href="#projects" onClick={() => handleScrollTo('projects')} className="py-2">Projects</a>
          <a href="#contact" onClick={() => handleScrollTo('contact')} className="py-2">Contact</a>
        </div>
      )}
    </>
  );
};

export default Navbar;