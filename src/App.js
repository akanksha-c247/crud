import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route
import { Home } from "./component/home";
import { Create } from "./component/create";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/create" element={<Create/>} />
        <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
