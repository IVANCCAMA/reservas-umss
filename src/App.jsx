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

import LoginPage from './pages/LoginPage/LoginPage';
import Boot from './redux/boot.js';
import PrivateRoute from './services/PrivateRoute/PrivateRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <BootstrapUI>
        <div className="App container-fluid p-0 position-relative">
          {/* header */}
          <div className="row m-0 justify-content-center">
            <Navbar />
            <PrivateRoute forTypeUser={'ALL'}>
              <div className="col-md-2 p-0 pt-5">
                <Sidebar />
              </div>
            </PrivateRoute>
            <NotificationProvider>
              <div className="col-md-10 pt-5 p-0 main-content">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<LoginPage />} />
                  <Route
                    path="/home"
                    index
                    element={
                      <PrivateRoute forTypeUser={'ALL'}>
                        <HomePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/ambientes/registrarAmbiente"
                    element={
                      <PrivateRoute forTypeUser={'ADMINISTRADOR'}>
                        <RegistroAmbientePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/ambientes/listaAmbientes"
                    element={
                      <PrivateRoute forTypeUser={'ALL'}>
                        <ListadoAmbientesPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/ambientes/listaAmbientes/fichaAmbiente/:id_ambiente"
                    element={
                      <PrivateRoute forTypeUser={'ALL'}>
                        <FichaInformacionAmbientePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/materias/listaMaterias"
                    element={
                      <PrivateRoute forTypeUser={'ALL'}>
                        <ListadoMateriasPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/reservas/reservarAmbiente"
                    element={
                      <PrivateRoute forTypeUser={'ALL'}>
                        <RegistroReservaPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/reservas/reservarAmbiente/ambientesDisponibles"
                    element={
                      <PrivateRoute forTypeUser={'ALL'}>
                        <AmbientesDisponiblesPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/reservas/listaReservas"
                    element={
                      <PrivateRoute forTypeUser={'ALL'}>
                        <ListadoReservasPage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </div>
            </NotificationProvider>
          </div>
        </div>
      </BootstrapUI>
    </BrowserRouter>
  );
}

Boot()
  .then(() => App())
  .catch((error) => console.log(error));

export default App;
