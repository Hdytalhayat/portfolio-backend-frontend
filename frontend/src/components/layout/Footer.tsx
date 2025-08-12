import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center" style={{ backgroundColor: 'var(--secondary)', color: 'var(--card)' }}>
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Hidayatul Hayat. All rights reserved.</p>
        <p className="mt-2 text-sm opacity-80">Built with passion</p>
      </div>
    </footer>
  );
};

export default Footer;