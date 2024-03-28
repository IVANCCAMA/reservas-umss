import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExamplePage from './pages/ExamplePage/ExamplePage';
import HomePage from './pages/HomePage/HomePage';
import ListadoAmbientesPage from './pages/AmbientesPage/ListadoAmbientesPage/ListadoAmbientesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<ExamplePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/ambientes/lista" element={<ListadoAmbientesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
