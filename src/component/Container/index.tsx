import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
  setTiming,
  isSuccess,
  setIsSuccess,
  running,
  setRunning,
  autoPlay,
  setAutoPlay,
}: Props) {
  const currentPoint = useRef(0);
  const listTimeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [pointList, setPointList] = React.useState<Point[]>([]);
  const [isLose, setIsLose] = useState(false);

  const clearPoint = useCallback((value: number) => {
    let timeOutClearPoint: ReturnType<typeof setTimeout> | null = null;
    let timeOutClearPointe: ReturnType<typeof setTimeout> | null = null;
    setPointList((prev) => {
      return prev.map((point) =>
        point.value === value ? { ...point, status: "removed" } : point
      );
    });
    if (value === currentPoint.current + 1) {
      currentPoint.current++;
      timeOutClearPoint = setTimeout(() => {
        setPointList((prev) => {
          return prev.map((point) =>
            point.value === value ? { ...point, status: "deleted" } : point
          );
        });
      }, 3000);
      if (autoPlay) {
        timeOutClearPointe = setTimeout(() => clearPoint(value + 1), 1000);
      }
      listTimeoutRef.current.push(timeOutClearPoint);
      timeOutClearPointe && listTimeoutRef.current.push(timeOutClearPointe);
    } else {
      setIsLose(true);
      listTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      setRunning(false);
      setIsSuccess(false);
    }
  }, [ autoPlay, listTimeoutRef, setPointList, setRunning, setIsSuccess]);

  const generateRandomPoint = () => {
    listTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    setIsLose(false);
    currentPoint.current = 0;
    setPointList([]);
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
    } else if (!autoPlay) {
      listTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    }
    return () => {
      listTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [autoPlay]);
  if (
    !pointList.some((item) => item.status !== "deleted") &&
    running &&
    timing > 0
  ) {
    setRunning(false);
    setIsSuccess(true);
    setAutoPlay(false);
  }
  return (
    <>
      <div className="container">
        {pointList
          .sort((a, b) => b.value - a.value)
          .map((pointItem, index) => (
            <PointItem
              {...pointItem}
              index={index}
              isLose={isLose}
              handleClick={() => {
                running && clearPoint(pointItem.value);
              }}
              setPointList={setPointList}
            />
          ))}
      </div>
      {currentPoint.current + 1 <= point && (
        <p
          style={{
            textAlign: "left",
          }}
        >
          next point: {currentPoint.current + 1}
        </p>
      )}
    </>
  );
}
const PointItem = memo(
  ({
    x,
    y,
    value,
    status,
    index,
    handleClick,
    isLose,
    setPointList,
  }: Point & {
    index: number;
    handleClick: () => void;
    isLose: boolean;
    setPointList: React.Dispatch<React.SetStateAction<Point[]>>;
  }) => {
    const [timeLeft, setTimeLeft] = useState(3000);
    const [opacity, setOpacity] = useState(1);
    const interval = useRef<any>();
    useEffect(() => {
      if (status === "removed") {
        interval.current = setInterval(() => {
          setTimeLeft((prev) => prev - 100);
          setOpacity((prev) => prev - 0.005);
        }, 100);
      } else {
        setOpacity(1);
        setTimeLeft(3000);
      }
      if (timeLeft <= 0) {
        setPointList((prev) => {
          return prev.map((point) =>
            point.value === value ? { ...point, status: "deleted" } : point
          );
        });
      }
      return () => {
        interval && clearInterval(interval.current);
      };
    }, [status, timeLeft, interval]);
    useEffect(() => {
      if (isLose) {
        interval && clearInterval(interval.current);
      }
    }, [interval, isLose]);
    if (status === "deleted") return null;
    return (
      <div
        id={value.toString()}
        className="point"
        style={{
          backgroundColor:
            status === "removed" ? "salmon" : "white",
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
          opacity,
        }}
        onClick={handleClick}
      >
        <span style={{ color: "black" }}>{value}</span>
        {status === "removed" && (
          <span
            style={{
              color: "black",
            }}
          >
            {(timeLeft / 1000).toFixed(1)}s
          </span>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }
);
