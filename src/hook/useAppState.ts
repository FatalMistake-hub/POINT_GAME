// useAppState.ts
import { useState } from "react";

export interface AppState {
  point: number;
  isSuccess?: boolean;
  running: boolean;
  timing: number;
}

export interface AppStateHandlers {
  setPoint: (point: number) => void;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTiming: React.Dispatch<React.SetStateAction<number>>;
}

export const useAppState = (): [AppState, AppStateHandlers] => {
  const [point, setPoint] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [running, setRunning] = useState<boolean>(false);
  const [timing, setTiming] = useState<number>(0);

  return [
    { point, isSuccess, running, timing },
    { setPoint, setIsSuccess, setRunning, setTiming },
  ];
};
