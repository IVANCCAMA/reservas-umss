import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from './components/Fixed/Sidebar/Sidebar';
import Navbar from './components/Fixed/Navbar/Navbar';
import ListadoMateriasPage from './pages/MateriasPage/ListadoMateriasPage/ListadoMateriasPage';
import ListadoAmbientesPage from './pages/AmbientesPage/ListadoAmbientesPage/ListadoAmbientesPage';
import FichaInformacionAmbientePage from './pages/AmbientesPage/FichaInformacionAmbientePage/FichaInformacionAmbientePage';
import RegistroAmbientePage from './pages/AmbientesPage/RegistroAmbientePage/RegistroAmbientePage';
import RegistroReservaPage from './pages/ReservasPage/RegistroReservaPage/RegistroReservaPage';
import AmbientesDisponiblesPage from './pages/ReservasPage/RegistroReservaPage/AmbientesDisponiblesPage';
import ListadoReservasPage from './pages/ReservasPage/ListadoReservasPage/ListadoReservasPage';
import ModalProvider from './components/Bootstrap/ModalContext';
import EditarAmbientePage from './pages/AmbientesPage/EditarAmbientePage/EditarAmbientePage';

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

            <ModalProvider>
              <Routes>
                <Route path="/" index element={<HomePage />} />

                <Route path="/ambientes/registrarAmbiente" element={<RegistroAmbientePage />} />
                <Route path="/ambientes/listaAmbientes" element={<ListadoAmbientesPage />} />
                <Route
                  path="/ambientes/listaAmbientes/fichaAmbiente/:id_ambiente"
                  element={<FichaInformacionAmbientePage />}
                />

                <Route path="/materias/listaMaterias" element={<ListadoMateriasPage />} />

                <Route path="/reservas/reservarAmbiente" element={<RegistroReservaPage />} />

                <Route
                  path="/reservas/reservarAmbiente/ambientesDisponibles"
                  element={<AmbientesDisponiblesPage />}
                />

                <Route path="/reservas/listaReservas" element={<ListadoReservasPage />} />
                <Route path="/ambientes/listaAmbientes/editar" element={<EditarAmbientePage />}/>
              </Routes>
            </ModalProvider>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
