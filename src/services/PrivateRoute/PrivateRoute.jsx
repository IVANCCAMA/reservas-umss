import { useAppSelector } from '../../redux/app/hooks.js';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  if (!isLoggedIn) {
    return <Navigate to={'/'} replace />;
  }
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
