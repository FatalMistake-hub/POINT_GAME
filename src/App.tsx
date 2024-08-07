import { useState } from "react";
import "./App.css";
import Container from "./component/Container";
import Header from "./component/Header";

function App() {
  // const time = useRef()
  const [point, setPoint] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [running, setRunning] = useState<boolean>(false);

  return (
    <>
      <div className="main">
        <Header
          point={point}
          setPoint={setPoint}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          running={running}
          setRunning={setRunning}
          />
        <Container point={point}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          setPoint={setPoint} 
          running={running}
          setRunning={setRunning}
          />
      </div>
    </>
  );
}

export default App;
