/* import { Link } from "react-router-dom";
 */
import { Link } from 'react-router-dom';
import logo from '../../../assets/Images/logoReserBit.png';
import { Icon } from '@iconify/react/dist/iconify.js';

const Navbar = () => {
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
          <div className="ms-5 contacto">Contacto</div>
          <div className="ms-3 sobreNosotros">Sobre nosotros</div>
        </div>
        <div className="d-flex align-items-center">
          <div className="me-2 nombreUsuario">User name</div>
          <Icon icon="ph:user-circle-light" width="45" height="45" style={{ color: '#215F88' }} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
