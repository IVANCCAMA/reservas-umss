import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [showAmbientes, setShowAmbientes] = useState(true);

  const btns = [
    {
      name: "Ambientes",
      icon: "mdi:google-classroom",
      subs: [
        { to: "/registrarAmbiente", name: "Registrar ambiente" },
        { to: "/listaAbientes", name: "Lista de ambientes" }
      ]
    },
    {
      name: "Materias",
      icon: "ph:book",
      subs: [
        { to: "/subirMaterias", name: "Subir materias" },
        { to: "/listaMaterias", name: "Lista de materias" }
      ]
    },
    {
      name: "Reservas",
      icon: "ep:calendar",
      subs: [
        { to: "/reservarAmbiente", name: "Reservar ambiente" },
        { to: "/listaReservas", name: "Lista de reservas" }
      ]
    },
  ];

  return (
    <div className="sidebar-container">
      <div className="d-flex flex-column flex-shrink-0 sidebar-menu">
        <ul className="nav nav-pills flex-column mt-4 p-3 text-start">
          {btns.map((btn, index) => (
            <li key={`nav-item-${index}`} className="nav-item">
              <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed p-4" data-bs-toggle="collapse" data-bs-target={`#${btn.name}-collapse`} aria-expanded="false">
                <Icon icon={btn.icon} width="50" height="50" style={{ color: "#215f88" }} />
                <span className="ms-3 fs-3">{btn.name}</span>
                <Icon className="fas fa-angle-down rotate-icon" icon="iconamoon:arrow-down-2" width="48" height="48" style={{ color: "5C5B5B" }} />
              </button>

              <div className="collapse" id={`${btn.name}-collapse`}>
                <ul className="nav nav-pills flex-column mb-auto btn-toggle-nav list-unstyled fw-normal">
                  {btn.subs.map((sub, subIndex) => (
                    <li key={`nav-item-${index}-${subIndex}`}>
                      <Link to={sub.url} className="nav-link link-body-emphasis d-inline-flex text-decoration-none rounded fs-4 ms-5 ps-5">
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <li className="sidenav-item">
          <Link className="sidenav-link ripple-surface-primary collapsed" to="#sidenav-collapse-2-0-0" role="button" data-mdb-ripple-initialized="true" aria-expanded="false">
            <span>Category 1</span>
            <Icon className="fas fa-angle-down rotate-icon" icon="iconamoon:arrow-down-2" width="48" height="48" style={{ transform: "rotate(0deg)" }} />
          </Link>
          <ul className="sidenav-collapse collapse" itemID="sidenav-collapse-2-0-0">
            <li className="sidenav-item"><Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">Link 2</Link></li>
            <li className="sidenav-item"><Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">Link 3</Link></li>
          </ul>
        </li>
        <li className="sidenav-item">
          <button className="sidenav-link ripple-surface" to="#sidenav-collapse-2-0-1" type="button" data-mdb-ripple-initialized="true">
            <span>Category 2</span>
            <Icon className="fas fa-angle-down rotate-icon" icon="iconamoon:arrow-down-2" width="48" height="48" />
          </button>
          <ul className="sidenav-collapse collapse" itemID="sidenav-collapse-2-0-1">
            <li className="sidenav-item"><Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">Link 4</Link></li>
            <li className="sidenav-item"><Link className="sidenav-link ripple-surface" data-mdb-ripple-initialized="true">Link 5</Link></li>
          </ul>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
