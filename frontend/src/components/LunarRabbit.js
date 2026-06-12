import React from 'react';
import '../styles/LunarRabbit.css';

function LunarRabbit() {
  return (
    <div className="lunar-rabbit">
      <div className="rabbit-container">
        <div className="rabbit-head">
          <div className="rabbit-ears">
            <div className="ear-left"></div>
            <div className="ear-right"></div>
          </div>
          <div className="rabbit-face">
            <div className="eyes">
              <div className="eye eye-left"></div>
              <div className="eye eye-right"></div>
            </div>
            <div className="nose"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="rabbit-body"></div>
      </div>
      <div className="luna-name">Luna 🌙</div>
    </div>
  );
}

export default LunarRabbit;