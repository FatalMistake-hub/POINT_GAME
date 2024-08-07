import React, { useEffect, useState } from "react";
import "./header.css";
type Props = {
  isSuccess?: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  running?: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
};

export default function Header({
  point,
  setPoint,
  isSuccess,
  setIsSuccess,
  running,
  setRunning,
}: Props) {
  const [timing, setTiming] = useState<number>(0);
  function getGameMessage() {
    if (isSuccess === undefined) {
      return "LET'S PLAY";
    }
    return isSuccess ? "You win" : "Game over";
  }
  useEffect(() => {
    if (!running) {
      setTiming(0);
    }
    let interval: number | undefined;
    if (running) {
      interval = setInterval(() => {
        setTiming((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running,isSuccess]);
  return (
    <div className="header">
      <h2 className="header__tittle">{getGameMessage()}</h2>
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
            value={point}
          />
        </div>
      </div>
      <div className="header__time">
        <div className="header__time-label">
          <span>Time:</span>
        </div>
        <div className="header__time-value">
          <span>{timing}s</span>
        </div>
      </div>
      <div className="header__restart">
        <button
          className="header__restart-button"
          onClick={() => {
            setRunning(true);
            setTiming(0);
            setIsSuccess(undefined);
          }}
        >
          {!running ? "Play" : "Restart"}
        </button>
      </div>
    </div>
  );
}
