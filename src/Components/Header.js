import React from 'react';
import logo from '../images/app-logo.png'
function Header() {
  return (
      <div className="header">
      <img
        src={logo}
        alt="El Mezcladito"
        title="Playlist Generator"
      />
    </div>
  );
}

export default Header;
