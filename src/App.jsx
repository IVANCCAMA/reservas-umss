import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from './components/Fixed/Sidebar/Sidebar';
import Navbar from './components/Fixed/Navbar/Navbar';
import ListadoMateriasPage from './pages/MateriasPage/ListadoMateriasPage/ListadoMateriasPage';
import SubirMatariasPage from './pages/MateriasPage/SubirMatariasPage/SubirMatariasPage';
import ListadoAmbientesPage from './pages/AmbientesPage/ListadoAmbientesPage/ListadoAmbientesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid p-0">
        {/* header */}
        <div className="row m-0 justify-content-center">
          <Navbar />
          <div className="col-md-2 p-0 pt-5">
            <Sidebar />
          </div>
          <div className="col-md-10 pt-md-5 p-0 main-content">
            <Routes>
              <Route path="/" index element={<HomePage />} />
              <Route path="/materias/listaMaterias" element={<ListadoMateriasPage />} />
              <Route path="/materias/subir-materia" element={<SubirMatariasPage />} />
              <Route path="/ambientes/listaAmbientes" element={<ListadoAmbientesPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
