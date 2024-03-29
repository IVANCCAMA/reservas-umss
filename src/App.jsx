import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExamplePage from "./pages/ExamplePage/ExamplePage";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Fixed/Sidebar/Sidebar";
import Navbar from "./components/Fixed/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App sub-page-complete">
        <Navbar />
        <Sidebar />

        <Routes>
          <Route index element={<ExamplePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
