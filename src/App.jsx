import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExamplePage from "./pages/ExamplePage/ExamplePage";
import HomePage from "./pages/HomePage/HomePage";

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route index element={<ExamplePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
