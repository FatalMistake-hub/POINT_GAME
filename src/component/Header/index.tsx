import React from "react";
import "./header.css";
type Props = {};

export default function Header({}: Props) {
  return (
    <div className="header">
      <h2 className="header__tittle">LET'S PLAY</h2>
      <div className="header__config">
        <div className="header__config-label">
          <span>Points:</span>
        </div>
        <div className="header__config-input">
          <input
            type="number"
            placeholder="."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
          />
        </div>
      </div>
      <div className="header__time">
        <div className="header__time-label">
          <span>Time:</span>
        </div>
        <div className="header__time-value">
          <span>s</span>
        </div>
      </div>
      <div className="header__restart">
        <button
          className="header__restart-button"
          onClick={() => {
            console.log("Restart");
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
