import React, { useEffect, useRef } from "react";
import "./container.css";
import { Point } from "../../types";
type Props = {
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  isSuccess?: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  running?: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timing: number;
  setTiming: React.Dispatch<React.SetStateAction<number>>;
};
const POINT_SIZE = 48;
export default function Container({
  point,
  setPoint,
  timing,
  setTiming,
  isSuccess,
  setIsSuccess,
  running,
  setRunning,
}: Props) {
  const currentPoint = useRef<number>(0);
  const [pointList, setPointList] = React.useState<Point[]>([]);
  const clearPoint = (value: number) => {
    if (value === currentPoint.current + 1) {
      currentPoint.current++;
      setPointList((prev) => prev.filter((point) => point.value !== value));
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
    const containerHeight = 768;
    const containerWidth = 1024;
    const maxPositionX = containerWidth - POINT_SIZE;
    const maxPositionY = containerHeight - POINT_SIZE;
    for (let i = 0; i < point; i++) {
      const x = Math.floor(Math.random() * maxPositionX);
      const y = Math.floor(Math.random() * maxPositionY);
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
              backgroundColor: "salmon",
              position: "absolute",
              width: `${POINT_SIZE}px`,
              height: `${POINT_SIZE}px`,
              borderRadius: "50%",
              zIndex: `${index + 1}`,
            }}
            onClick={() => {
              document.getElementById(point.value.toString())?.classList.add("removed");
              running && setTimeout(() => clearPoint(point.value), 500);
            }}
          >
            {point.value}
          </div>
        ))}
    </div>
  );
}
