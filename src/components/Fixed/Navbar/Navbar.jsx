/* import { Link } from "react-router-dom";
 */
import { Link } from 'react-router-dom';
import logo from '../../../assets/Images/logoReserBit.png';

const Navbar = () => {
  return (
    <div
      className="d-flex align-items-center"
      style={{
        position: 'fixed',
        width: '100%',
        height: '55px',
        backgroundColor: '#ffffff',
        border: '0.5px solid rgba(140, 134, 134, 0.6)',
        zIndex: 1,
      }}
    >
      <Link to={'/home'}>
        <img
          className="img-fluid object-fit-cover"
          src={logo}
          alt="logo de aplicación"
          style={{ width: '100px' }}
        />
      </Link>
    </div>
  );
};

export default Navbar;
