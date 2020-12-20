import React from 'react';
import loaderGif from '../images/loader.gif'


function Loader() {
  return (
      <div className="loader">
      <img src={loaderGif}
      alt="Cargando"
      />
      <h3>Mezclando un poquito...</h3>
    </div>
  );
}

export default Loader;
