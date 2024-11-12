import { memo, useEffect, useRef, useState } from "react";
import { Point } from "../../../types";
export const POINT_SIZE = 48;
const PointItem = ({
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
  const interval = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (status === "removing") {
      interval.current = setInterval(() => {
        setTimeLeft((prev) => prev - 100);
        setOpacity((prev) => prev - 0.03);
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
        backgroundColor: status === "removing" ? "salmon" : "white",
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
      {status === "removing" && (
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
};
export default memo(PointItem, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
