import SidebarOption from './SidebarOption.jsx';

const Sidebar = () => {
  const btns = [
    {
      name: 'Ambientes',
      icon: 'mdi:google-classroom',
      subs: [
        { to: '/ambientes/registrarAmbiente', name: 'Registrar ambiente' },
        { to: '/ambientes/listaAmbientes', name: 'Lista de ambientes' },
      ],
      forTypeUser: 'ADMINISTRADOR',
      to: '/ambientes/listaAmbientes',
      isViewProtected: false,
    },
    {
      name: 'Materias',
      icon: 'ph:book',
      subs: [{ to: '/materias/listaMaterias', name: 'Lista de materias' }],
      forTypeUser: 'ADMINISTRADOR',
      to: '/materias/listaMaterias',
      isViewProtected: false,
    },
    {
      name: 'Reservas',
      icon: 'ep:calendar',
      subs: [
        { to: '/reservas/reservarAmbiente', name: 'Reservar ambiente' },
        { to: '/reservas/listaReservas', name: 'Lista de reservas' },
        { to: '/reservas/calendario', name: 'Calendario de reservas' },
      ],
      viewSubs: true,
      forTypeUser: 'ADMINISTRADOR',
      isViewProtected: false,
    },
    {
      name: 'Aperturas',
      icon: 'carbon:gui-management',
      subs: [
        { to: '/aperturas/registrarApertura', name: 'Aperturar sistema' },
        { to: '/aperturas/listaAperturas', name: 'Lista de aperturas' },
      ],
      forTypeUser: 'ADMINISTRADOR',
      isViewProtected: true,
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
              forTypeUser={btn.forTypeUser}
              viewSubs={btn.viewSubs}
              isViewProtected={btn.isViewProtected}
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
