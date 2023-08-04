import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route
import { Home } from "./component/home";
import { Create } from "./component/create";

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <BrowserRouter> {/* Use BrowserRouter instead of Router */}
      <Routes>
        <Route path="/create" element={<Create/>} />
        <Route path="/" element={<Home/>} />
        {/* <Route path="/create" component={Create} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
