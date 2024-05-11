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
import BootstrapUI from './components/Bootstrap';

import LoginPage from './pages/LoginPage/LoginPage';
import Boot from './redux/boot.js';
import PrivateRoute from './services/PrivateRoute/PrivateRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <BootstrapUI>
        <div className="App container-fluid p-0">
          {/* header */}
          <div className="row m-0 justify-content-center">
            <Navbar />
            <PrivateRoute>
              <div className="col-md-2 p-0 pt-5">
                <Sidebar />
              </div>
            </PrivateRoute>
            <div className="col-md-10 pt-md-5 p-0 main-content">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/home"
                  index
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ambientes/registrarAmbiente"
                  element={
                    <PrivateRoute>
                      <RegistroAmbientePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ambientes/listaAmbientes"
                  element={
                    <PrivateRoute>
                      <ListadoAmbientesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ambientes/listaAmbientes/fichaAmbiente/:id_ambiente"
                  element={<FichaInformacionAmbientePage />}
                />
                <Route
                  path="/materias/listaMaterias"
                  element={
                    <PrivateRoute>
                      <ListadoMateriasPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reservas/reservarAmbiente"
                  element={
                    <PrivateRoute>
                      <RegistroReservaPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reservas/reservarAmbiente/ambientesDisponibles"
                  element={
                    <PrivateRoute>
                      <AmbientesDisponiblesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reservas/listaReservas"
                  element={
                    <PrivateRoute>
                      <ListadoReservasPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
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
