import patito from '../../assets/Images/patito.png';

export default function HomePage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>
            Home Page <i className="bi bi-car-front-fill"></i>
          </h1>
          <img src={patito} alt="patito" width={'400px'} />
          <div className="dropdown my-3">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            >
              Botón desplegable
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
