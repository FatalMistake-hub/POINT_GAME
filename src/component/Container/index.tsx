import React, { useEffect, useRef } from "react";
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
}: Props) {
  const currentPoint = useRef<number>(0);
  const [pointList, setPointList] = React.useState<Point[]>([]);
  const clearPoint = (value: number) => {
    if (value === currentPoint.current + 1) {
      document.getElementById(value.toString())?.classList.add("removed");
      currentPoint.current++;
      setTimeout(
        () =>
          setPointList((prev) => prev.filter((point) => point.value !== value)),
        500
      );

      if (currentPoint.current === point) {
        setRunning(false);
        setIsSuccess(true);
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
      pointList.push({ x, y, value: i + 1 });
    }
    setPointList(pointList);
  };
  useEffect(() => {
    point > 0 && running && timing === 0 && generateRandomPoint();
  }, [point, running, timing]);
  return (
    <div className="container">
      {pointList
        .sort((a, b) => b.value - a.value)
        .map((point, index) => (
          <div
            id={point.value.toString()}
            key={point.value}
            className="point"
            style={{
              top: `${point.y}px`,
              left: `${point.x}px`,
              position: "absolute",
              width: `${POINT_SIZE}px`,
              height: `${POINT_SIZE}px`,
              borderRadius: "50%",
              zIndex: `${index + 1}`,
            }}
            onClick={() => {
              running && clearPoint(point.value);
            }}
          >
            {point.value}
          </div>
        ))}
    </div>
  );
}
