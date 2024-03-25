import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import StartScreen from "./pages/StartScreen.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StartScreen />} />
        <Route path="/workout" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
