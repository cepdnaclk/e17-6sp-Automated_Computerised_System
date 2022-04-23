import React from 'react';
import '../../styles/TopBar.css';

export default function NavBar() {
  return (
    <div>
      <nav className="header-nav-bar">
        <div className="header-logo">
          <img className="site-logo" src="/logo.jpg" alt="logo" />
        </div>
      </nav>
    </div>
  );
}
