// App.tsx
import "./App.css";
import Container from "./component/Container";
import Header from "./component/Header";
import { useAppState } from "./hook/useAppState";

function App() {
  const [state, handlers] = useAppState();
  window.document.title = "Point Game";
  return (
    <div className="main">
      <Header {...state} {...handlers} />
      <Container {...state} {...handlers} />
    </div>
  );
}

export default App;