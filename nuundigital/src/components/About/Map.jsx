import React from 'react';
import './Map.css';

const Map = () => {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          className="gmap_iframe"
          width="371" // Fixed width in pixels
          height="242" // Fixed height in pixels
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=371&height=242&hl=en&q=8.54207° N, 39.26934° E&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          title="NuunDigital Location"
        ></iframe>
        <a href="https://sprunkin.com/">Sprunki Phases</a>
      </div>
    </div>
  );
};

export default Map;