import React, { useEffect } from "react";
import { AppState, AppStateHandlers } from "../../hook/useAppState";
import "./header.css";

interface Props extends AppState, AppStateHandlers {}

const GAME_MESSAGES = {
  play: { message: "LET'S PLAY", value: "info" },
  win: { message: "YOU WIN", value: "success" },
  lose: { message: "GAME OVER", value: "error" },
};

const getGameMessage = (isSuccess: boolean | undefined, running: boolean) => {
  if (isSuccess === undefined || running) {
    return GAME_MESSAGES.play;
  }
  return isSuccess ? GAME_MESSAGES.win : GAME_MESSAGES.lose;
};

export default function Header({
  point,
  setPoint,
  timing,
  setTiming,
  isSuccess,
  running,
  setRunning,
  autoPlay,
  setAutoPlay,
}: Props) {
  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      interval = window.setInterval(() => {
        setTiming((prev) => prev + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, isSuccess, setTiming]);

  const { message, value } = getGameMessage(isSuccess, running);

  return (
    <div className="header">
      <h2 className={`header__title ${value}`}>{message}</h2>
      <div className="header__config">
        <div className="header__config-label">
          <span>Points:</span>
        </div>
        <div className="header__config-input">
          <input
            type="number"
            placeholder="Enter point"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = Math.min(parseInt(e.target.value, 10), 2000);
              setPoint(value);
            }}
            min={0}
            max={2000}
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
          {isSuccess === undefined && !running ? "Play" : "Restart"}
        </button>
        {running && (
          <button
            className="header__restart-button"
            onClick={() => {
              setAutoPlay((prev) => !prev);
              setRunning(true);
            }}
          >
            {autoPlay ? "Auto Play On" : "Auto Play Off"}
          </button>
        )}
      </div>
    </div>
  );
}
