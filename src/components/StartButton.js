import React from 'react';
import '../styles/startButton.css'; 

function StartButton(props) {
  return (
    <button className="startButton" onClick={props.onClick} disabled={props.disabled}>
      <div
        style={{
          position: 'absolute',
          top: '0.78vw',
          bottom: '0.72vw',
          left: '6.19vw',
          color: '#FCFCFC',
          fontFamily: 'Montserrat',
          fontSize: '1.14vw',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: 'normal',
          letterSpacing: '-0.04vw',
        }}
      >
        Start
      </div>
    </button>
  );
}

/*function StartButton() {
  return (
    <div className="startButton">
      <div
        style={{
          position: 'absolute',
          top: '15px',
          bottom: '14px',
          left: '119px',
          color: '#FCFCFC',
          fontFamily: 'Montserrat',
          fontSize: '22px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: 'normal',
          letterSpacing: '-0.88px',
        }}
      >
        Start
      </div>
    </div>
  );
}*/

export default StartButton;
