import { CardHeader } from '@material-ui/core';
import React from 'react';
import logo from '../images/app-logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header__img">
        <img
          src={logo}
          alt="El Mezcladito"
          title="Playlist Generator"
        />
      </div>
    </header>
  );
}

export default Header;
