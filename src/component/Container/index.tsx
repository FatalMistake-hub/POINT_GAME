import { useEffect } from "react";
import { AppState, AppStateHandlers } from "../../hook/useAppState";
import usePointManager from "../../hook/usePointManager";
import "./container.css";
import PointItem from "./Point";
interface Props extends AppState, AppStateHandlers {}

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
  const {
    pointList,
    setPointList,
    isLose,
    currentPoint,
    listTimeoutRef,
    clearPoint,
    generateRandomPoint,
  } = usePointManager(point, autoPlay, setRunning, setIsSuccess);

  useEffect(() => {
    if (point > 0 && running && timing === 0) {
      generateRandomPoint();
    }
  }, [point, running, timing, generateRandomPoint]);

  useEffect(() => {
    if (autoPlay && running) {
      clearPoint(currentPoint.current + 1);
    } else if (!autoPlay) {
      listTimeoutRef.current.forEach(clearTimeout);
    }
  }, [autoPlay, running, clearPoint]);

  useEffect(() => {
    if (
      !pointList.some((item) => item.status !== "deleted") &&
      running &&
      timing > 0
    ) {
      setRunning(false);
      setIsSuccess(true);
      setAutoPlay(false);
    }
  }, [pointList, running, timing, setRunning, setIsSuccess, setAutoPlay]);

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
