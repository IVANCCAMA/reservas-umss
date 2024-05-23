import { useAppSelector } from '../../redux/app/hooks.js';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageNotFound from '../../pages/PageNotFound/PageNotFound.jsx';

const PrivateRoute = ({ children, forTypeUser }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.usuario);

  if (!isLoggedIn) {
    return <Navigate to={'/'} replace />;
  }

  if (isLoggedIn) {
    if (forTypeUser === 'ALL') {
      return children;
    }

    if (forTypeUser === user.tipo_usuario) {
      return children;
    }
  }
  return <PageNotFound />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
  forTypeUser: PropTypes.string,
};

export default PrivateRoute;
