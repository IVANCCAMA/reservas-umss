import { Link } from 'react-router-dom';
import Error404 from '../../assets/Images/404Error.png';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="row page">
        <div className="col-md-7">
          <div className="align pt-5">
            <img
              className="img-fluid object-fit-cover"
              src={Error404}
              alt="Page Not Found"
              width={'600px'}
            />
          </div>
        </div>
        <div className="col-md-5 pt-5 align">
          <div className="align-center">
            <h1 className="fw-bold">Oops!</h1>
            <h1 className="fw-bold">Page Not Found :(</h1>
            <div className="pt-5">
              <Link to={'/'} className="btn btn-info btn-lg">
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;
