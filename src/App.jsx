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
import RegistroAperturaPage from './pages/AperturasPage/RegistroAperturaPage/RegistroAperturaPAge';
import ListadoAperturaPage from './pages/AperturasPage/ListadoAperturaPage/ListadoAperturaPage';
import BootstrapUI from './components/Bootstrap';
import NotificationProvider from './components/Bootstrap/NotificationContext';

function App() {
  return (
    <BrowserRouter>
      <BootstrapUI>
        <div className="App container-fluid p-0 position-relative">
          {/* header */}
          <div className="row m-0 justify-content-center">
            <Navbar />
            <div className="col-md-2 p-0 pt-5">
              <Sidebar />
            </div>
            <NotificationProvider>
              <div className="col-md-10 pt-md-5 p-0 main-content">

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

                  <Route path='/aperturas/registrarApertura' element={<RegistroAperturaPage />} />
                  <Route path='/aperturas/listaAperturas' element={<ListadoAperturaPage />} />
                </Routes>
              </div>
            </NotificationProvider>
          </div>
        </div>
      </BootstrapUI>
    </BrowserRouter>
  );
}

export default App;
