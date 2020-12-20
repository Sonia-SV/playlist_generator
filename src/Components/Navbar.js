import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Spotify de Miriam y Sonia
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);
export default NavBar;
