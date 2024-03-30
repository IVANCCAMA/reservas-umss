import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
/* import { useState } from 'react';
 */
const Sidebar = () => {
  /*  const [showAmbientes, setShowAmbientes] = useState(true); */

  const btns = [
    {
      name: 'Ambientes',
      icon: 'mdi:google-classroom',
      subs: [
        { to: '/registrarAmbiente', name: 'Registrar ambiente' },
        { to: '/listaAbientes', name: 'Lista de ambientes' },
      ],
    },
    {
      name: 'Materias',
      icon: 'ph:book',
      subs: [
        { to: '/subirMaterias', name: 'Subir materias' },
        { to: '/listaMaterias', name: 'Lista de materias' },
      ],
    },
    {
      name: 'Reservas',
      icon: 'ep:calendar',
      subs: [
        { to: '/reservarAmbiente', name: 'Reservar ambiente' },
        { to: '/listaReservas', name: 'Lista de reservas' },
      ],
    },
  ];

  return (
    <div className="sidebar-container h-100">
      <div className="flex-shrink-0 sidebar-menu h-100">
        <ul className="nav nav-pills nav-sticky mt-md-4">
          {btns.map((btn, index) => (
            <li key={`nav-item-${index}`} className="nav-item w-100">
              <button
                className="btn btn-toggle d-inline-flex w-100 d-flex  align-items-center collapsed justify-content-between"
                data-bs-toggle="collapse"
                data-bs-target={`#${btn.name}-collapse`}
                aria-expanded="false"
              >
                <div>
                  <Icon icon={btn.icon} width="45" height="45" style={{ color: '#215f88' }} />
                  <span className="ms-2">{btn.name}</span>
                </div>
                <div>
                  <Icon
                    className="fas fa-angle-down rotate-icon"
                    icon="iconamoon:arrow-down-2"
                    width="35"
                    height="35"
                    style={{ color: '5C5B5B' }}
                  />
                </div>
              </button>

              <div className="collapse sub-menu" id={`${btn.name}-collapse`}>
                <ul className="nav nav-pills flex-column mb-auto btn-toggle-nav list-unstyled">
                  {btn.subs.map((sub, subIndex) => (
                    <li key={`nav-item-${index}-${subIndex}`}>
                      <Link
                        to={sub.url}
                        className="nav-link link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* <li className="sidenav-item">
          <Link
            className="sidenav-link ripple-surface-primary collapsed"
            to="#sidenav-collapse-2-0-0"
            role="button"
            data-mdb-ripple-initialized="true"
            aria-expanded="false"
          >
            <span>Category 1</span>
            <Icon
              className="fas fa-angle-down rotate-icon"
              icon="iconamoon:arrow-down-2"
              width="48"
              height="48"
              style={{ transform: 'rotate(0deg)' }}
            />
          </Link>
          <ul className="sidenav-collapse collapse" itemID="sidenav-collapse-2-0-0">
            <li className="sidenav-item">
              <Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">
                Link 2
              </Link>
            </li>
            <li className="sidenav-item">
              <Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">
                Link 3
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidenav-item">
          <button
            className="sidenav-link ripple-surface"
            to="#sidenav-collapse-2-0-1"
            type="button"
            data-mdb-ripple-initialized="true"
          >
            <span>Category 2</span>
            <Icon
              className="fas fa-angle-down rotate-icon"
              icon="iconamoon:arrow-down-2"
              width="48"
              height="48"
            />
          </button>
          <ul className="sidenav-collapse collapse" itemID="sidenav-collapse-2-0-1">
            <li className="sidenav-item">
              <Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">
                Link 4
              </Link>
            </li>
            <li className="sidenav-item">
              <Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">
                Link 5
              </Link>
            </li>
          </ul>
        </li> */}
      </div>
    </div>
  );
};

export default Sidebar;
