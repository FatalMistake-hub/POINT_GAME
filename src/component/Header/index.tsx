import React, { useEffect, useState } from "react";
import "./header.css";
type Props = {
  isSuccess?: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  running?: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  timing: number;
  setTiming: React.Dispatch<React.SetStateAction<number>>;
};

export default function Header({
  point,
  setPoint,
  timing,
  setTiming,
  isSuccess,
  setIsSuccess,
  running,
  setRunning,
}: Props) {
  
  function getGameMessage() {
    if (isSuccess === undefined || running) {
      return {
        message: "LET'S PLAY",
        value: "info",
      };
    }
    return isSuccess
      ? {
          message: "YOU WIN",
          value: "success",
        }
      : {
          message: "GAME OVER",
          value: "error",
        };
  }
  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      interval = setInterval(() => {
        setTiming((prev) => prev + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, isSuccess]);
  return (
    <div className="header">
      <h2 className={`header__tittle ${getGameMessage().value}`}>
        {getGameMessage().message}
      </h2>
      <div className="header__config">
        <div className="header__config-label">
          <span>Points:</span>
        </div>
        <div className="header__config-input">
          <input
            type="number"
            placeholder="Enter point"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
              setPoint(parseInt(e.target.value));
            }}
            min={0}
            max={10000}
            value={point}
          />
        </div>
      </div>
      <div className="header__time">
        <div className="header__time-label">
          <span>Time:</span>
        </div>
        <div className="header__time-value">
          <span>{(timing / 1000).toFixed(1)}s</span>
        </div>
      </div>
      <div className="header__restart">
        <button
          className="header__restart-button"
          onClick={() => {
            setRunning(true);
            setTiming(0);
          }}
        >
          {(isSuccess === undefined && !running) ? "Play" : "Restart"}
        </button>
      </div>
    </div>
  );
}
