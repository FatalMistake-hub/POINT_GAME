import React, { useEffect } from "react";
import "./container.css";
import { Point } from "../../types";
type Props = {
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  isSuccess?: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  running?: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
};
const POINT_SIZE = 48;
export default function Container({
  point,
  setPoint,
  isSuccess,
  setIsSuccess,
  running,
  setRunning,
}: Props) {
  const [currentPoint, setCurrentPoint] = React.useState<number>(0);
  const [pointList, setPointList] = React.useState<Point[]>([]);
  const clearPoint = (value: number) => {
    if (value !== currentPoint + 1) {
      setIsSuccess(false);
      return;
    }
    setCurrentPoint((prev) => prev + 1);
    setPointList((prev) => prev.filter((point) => point.value !== value));
    if (currentPoint + 1 === point) {
      setIsSuccess(true);
    }
  };

  const generateRandomPoint = () => {
    const pointList: Point[] = [];
    const containerHeight = 1024;
    const containerWidth = 768;
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
    setCurrentPoint(0);
    point > 0 && generateRandomPoint();
  }, [point]);
  return (
    <div className="container">
      {pointList.map((point, index) => (
        <div
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
          onClick={() => clearPoint(point.value)}
        >
          {point.value}
        </div>
      ))}
    </div>
  );
}
