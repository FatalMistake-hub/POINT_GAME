import { POINT_SIZE } from "../component/Container/Point";
import { Point } from "../types";
import { useCallback, useRef, useState } from "react";

const CONTAINER_HEIGHT = 768;
const CONTAINER_WIDTH = 1024;
const MAX_POSITION_X = CONTAINER_WIDTH - POINT_SIZE;
const MAX_POSITION_Y = CONTAINER_HEIGHT - POINT_SIZE;

const usePointManager = (
  point: number,
  autoPlay: boolean,
  setRunning: (running: boolean) => void,
  setIsSuccess: (isSuccess: boolean) => void
) => {
  const currentPoint = useRef(0);
  const listTimeoutRef = useRef<NodeJS.Timeout[]>([]);
  const [pointList, setPointList] = useState<Point[]>([]);
  const [isLose, setIsLose] = useState(false);

  const handleLoseCondition = () => {
    setIsLose(true);
    listTimeoutRef.current.forEach(clearTimeout);
    setRunning(false);
    setIsSuccess(false);
  };

  const handleUpdateStatusPoint = (
    value: number,
    status: "active" | "removing" | "deleted"
  ) => {
    setPointList((prev) =>
      prev.map((point) =>
        point.value === value ? { ...point, status } : point
      )
    );
  };

  const clearPoint = useCallback(
    (value: number) => {
      handleUpdateStatusPoint(value, "removing");
      if (value === currentPoint.current + 1) {
        currentPoint.current++;
        const timeOutClearPoint = setTimeout(() => {
          handleUpdateStatusPoint(value, "deleted");
        }, 3000);
        listTimeoutRef.current.push(timeOutClearPoint);

        if (autoPlay) {
          const timeOutAutoPlay = setTimeout(() => clearPoint(value + 1), 1000);
          listTimeoutRef.current.push(timeOutAutoPlay);
        }
      } else {
        handleLoseCondition();
      }
    },
    [autoPlay]
  );

  const generateRandomPoint = useCallback(() => {
    // reset game state
    listTimeoutRef.current.forEach(clearTimeout);
    listTimeoutRef.current = [];
    setIsLose(false);
    currentPoint.current = 0;

    // generate new point list
    const newPointList: Point[] = Array.from({ length: point }, (_, i) => ({
      x: Math.floor(Math.random() * MAX_POSITION_X),
      y: Math.floor(Math.random() * MAX_POSITION_Y),
      value: i + 1,
      status: "active",
    }));
    setPointList(newPointList);
  }, [point]);

  return {
    pointList,
    setPointList,
    isLose,
    currentPoint,
    listTimeoutRef,
    clearPoint,
    generateRandomPoint,
  };
};
export default usePointManager;
