import React from 'react';
import logo from '../layouts/logo.png';

const Logo = () => {
  return (
    <div style={{ position: 'absolute', top: '0.88vw', left: '2.08vw' }}>
      <img src={logo} alt="IIIT Hyderabad Logo" style={{ width: '12.23vw', height: '6.25vw' }} />
    </div>
  );
}

/*

function Logo() {
  return (
    <div style={{ position: 'absolute', top: '17px', left: '40px', right: '1645px' }}>
      <img src={logo} alt="IIIT Hyderabad Logo" style={{ width: 235, height: 120 }} />
    </div>
  );
}

*/

export default Logo;