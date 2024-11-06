import React, { useEffect, useRef, useState } from "react";
import "./container.css";
import { Point } from "../../types";
import { AppState, AppStateHandlers } from "../../hook/useAppState";
interface Props extends AppState, AppStateHandlers {}

const POINT_SIZE = 48;
const CONTAINER_HEIGHT = 768;
const CONTAINER_WIDTH = 1024;
const MAX_POSITION_X = CONTAINER_WIDTH - POINT_SIZE;
const MAX_POSITION_Y = CONTAINER_HEIGHT - POINT_SIZE;

export default function Container({
  point,
  timing,
  setIsSuccess,
  running,
  setRunning,
  autoPlay,
  setAutoPlay,
}: Props) {
  const currentPoint = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pointList, setPointList] = React.useState<Point[]>([]);
  const clearPoint = (value: number) => {
    if (value === currentPoint.current + 1) {
      currentPoint.current++;
      document.getElementById(value.toString())?.classList.add("removed");
      pointList.find((point) => point.value === value)!.status = "removed";
      setTimeout(() => {
        setPointList((prev) => prev.filter((point) => point.value !== value));
      }, 3000);
      if (autoPlay) {
        timeoutRef.current = setTimeout(
          () => clearPoint(currentPoint.current + 1),
          3000
        );
      } else {
        timeoutRef.current && clearTimeout(timeoutRef.current);
        return;
      }
      if (currentPoint.current === point) {
        setRunning(false);
        setIsSuccess(true);
        setAutoPlay(false);
        return;
      }
    } else {
      setRunning(false);
      setIsSuccess(false);
    }
  };

  const generateRandomPoint = () => {
    currentPoint.current = 0;
    const pointList: Point[] = [];
    for (let i = 0; i < point; i++) {
      const x = Math.floor(Math.random() * MAX_POSITION_X);
      const y = Math.floor(Math.random() * MAX_POSITION_Y);
      pointList.push({ x, y, value: i + 1, status: "active" });
    }
    setPointList(pointList);
  };
  useEffect(() => {
    point > 0 && running && timing === 0 && generateRandomPoint();
  }, [point, running, timing]);
  useEffect(() => {
    if (autoPlay && running) {
      clearPoint(currentPoint.current + 1);
    } else {
      setRunning(false);
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [autoPlay, running]);
  return (
    <div className="container">
      {pointList
        .sort((a, b) => b.value - a.value)
        .map((point, index) => (
          <PointItem
            {...point}
            index={index}
            key={point.value}
            handleClick={() => {
              running && clearPoint(point.value);
            }}
          />
        ))}
    </div>
  );
}
const PointItem = ({
  x,
  y,
  value,
  status,
  index,
  handleClick,
}: Point & { index: number; handleClick: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(3000);
  useEffect(() => {
    if (status === "removed") {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 10);
        if (timeLeft === 0) {
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [status]);
  return (
    <div
      id={value.toString()}
      className="point"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        position: "absolute",
        width: `${POINT_SIZE}px`,
        height: `${POINT_SIZE}px`,
        borderRadius: "50%",
        zIndex: `${index + 1}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2px",
        opacity: status === "removed" ? `${timeLeft / 3000}` : 1,
      }}
      onClick={handleClick}
    >
      <span style={{ color: "black" }}>{value}</span>
      {status === "removed" && (
        <span
          style={{
            color: "white",
          }}
        >
          {(timeLeft / 1000).toFixed(1)}s
        </span>
      )}
    </div>
  );
};
