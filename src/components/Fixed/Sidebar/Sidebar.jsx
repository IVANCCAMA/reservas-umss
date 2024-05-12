import { useAppSelector } from '../../../redux/app/hooks.js';
import SidebarOption from './SidebarOption.jsx';

const Sidebar = () => {
  const isAdmin = useAppSelector((state) => state.auth.usuarios.tipo_usuario) === 'ADMINISTRADOR';

  const btns = [
    {
      name: 'Ambientes',
      icon: 'mdi:google-classroom',
      subs: [
        { to: '/ambientes/registrarAmbiente', name: 'Registrar ambiente' },
        { to: '/ambientes/listaAmbientes', name: 'Lista de ambientes' },
      ],
      showForAdmin: isAdmin,
      to: '/ambientes/listaAmbientes',
    },
    {
      name: 'Materias',
      icon: 'ph:book',
      subs: [{ to: '/materias/listaMaterias', name: 'Lista de materias' }],
      showForAdmin: isAdmin,
      to: '/materias/listaMaterias',
    },
    {
      name: 'Reservas',
      icon: 'ep:calendar',
      subs: [
        { to: '/reservas/reservarAmbiente', name: 'Reservar ambiente' },
        { to: '/reservas/listaReservas', name: 'Lista de reservas' },
      ],
      showForAdmin: true,
    },
  ];

  return (
    <div className="sidebar-container">
      <div className="d-flex flex-column flex-shrink-0 p-2 h-100">
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 w-100">
          {btns.map((btn, index) => (
            <SidebarOption
              key={index}
              index={index}
              option={btn.name}
              icon={btn.icon}
              subOptions={btn.subs}
              to={btn.to}
              showForAdmin={btn.showForAdmin}
            />
          ))}
        </ul>
        <div className="sidebar-footer d-flex align-items-center pb-1">
          <SidebarOption option={'Cerrar sesión'} to={'/logout'} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
