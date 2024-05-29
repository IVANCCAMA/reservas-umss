import { Link } from 'react-router-dom';
import logo from '../../../assets/Images/logoReserBit.png';
import { useAppSelector } from '../../../redux/app/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;

  // data user redux
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.usuario);

  // notificaciones
  const [todosLeidos, setTodosLeidos] = useState(false);

  const loadNotificaciones = (_baseURL) => {
    console.log('realizando peticion');
    axios
      .get(`${_baseURL}/notificaciones/${user.id_usuario}`)
      .then((response) => {
        leidosTodos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las notificaciones:', error);
      });
  };

  const leidosTodos = (_dataNotify) => {
    const someNotLeidos = _dataNotify.some((not) => !not.leido);
    console.log('>>.', someNotLeidos);
    if (someNotLeidos) {
      setTodosLeidos(false);
    } else {
      setTodosLeidos(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadNotificaciones(baseURL);
    }
  }, [baseURL]);

  return (
    <div
      className="d-flex align-items-center header-navbar"
      style={{
        position: 'fixed',
        width: '100%',
        height: '55px',
        backgroundColor: '#ffffff',
        border: '0.5px solid rgba(140, 134, 134, 0.6)',
        zIndex: 1,
      }}
    >
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center">
          <Link to={'/home'} className="me-5">
            <img
              className="img-fluid object-fit-cover"
              src={logo}
              alt="logo de aplicación"
              style={{ width: '100px' }}
            />
          </Link>
          {isLoggedIn && (
            <div className="ms-5 contacto nav-item">
              <Link to={'/contacto'} className="nav-link">
                Contacto
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="ms-3 sobreNosotros nav-item">
              <Link to={'/sobre-nosotros'} className="nav-link">
                Sobre nosotros
              </Link>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="d-flex align-items-center iconNotify">
            <Link to={'/notificaciones'} className="btn bi bi-bell-fill">
              <div className={`${todosLeidos ? '' : 'alertNotify'}`}></div>
            </Link>
            <div className="me-2 nombreUsuario nav-item nav-link">{user.nombre_usuario}</div>
            <img
              src={user.foto_usuario}
              width="45"
              height="45"
              style={{ color: '#215F88' }}
              className="rounded-circle"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
