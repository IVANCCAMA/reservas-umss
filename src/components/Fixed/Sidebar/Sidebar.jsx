import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const btns = [
    {
      name: 'Ambientes',
      icon: 'mdi:google-classroom',
      subs: [
        { to: '/ambientes/registrarAmbiente', name: 'Registrar ambiente' },
        { to: '/ambientes/listaAmbientes', name: 'Lista de ambientes' },
      ],
    },
    {
      name: 'Materias',
      icon: 'ph:book',
      subs: [{ to: '/materias/listaMaterias', name: 'Lista de materias' }],
    },
    {
      name: 'Reservas',
      icon: 'ep:calendar',
      subs: [
        { to: '/reservas/reservarAmbiente', name: 'Reservar ambiente' },
        { to: '/reservas/listaReservas', name: 'Lista de reservas' },
      ],
    },
  ];

  return (
    <div className="sidebar-container">
      <div className="flex-shrink-0 sidebar-menu">
        <ul className="nav nav-pills mt-md-4">
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

              <div className="collapse ms-5" id={`${btn.name}-collapse`}>
                <ul className="nav nav-pills flex-column mb-auto btn-toggle-nav list-unstyled">
                  {btn.subs.map((sub, subIndex) => (
                    <li key={`nav-item-${index}-${subIndex}`}>
                      <Link
                        to={sub.to}
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
      </div>
    </div>
  );
};

export default Sidebar;
