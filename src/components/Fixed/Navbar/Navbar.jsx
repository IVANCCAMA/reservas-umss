/* import { Link } from "react-router-dom";
 */
import { Link } from 'react-router-dom';
import logo from '../../../assets/Images/logoReserBit.png';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAppSelector } from '../../../redux/app/hooks';

const Navbar = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.usuarios);

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
          <div className="d-flex align-items-center">
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
