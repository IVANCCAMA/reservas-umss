import { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import axios from 'axios';

const notificacionesTest = [
  {
    id_notificacion: 1,
    fecha_notificacion: '12:30 28-05-2024',
    descripcion: 'Ambiente deshabilitado por mantenimiento',
    leido: false,
  },
  {
    id_notificacion: 2,
    fecha_notificacion: '13:45 28-05-2024',
    descripcion: 'Ambiente deshabilitado por actualización',
    leido: false,
  },
  {
    id_notificacion: 3,
    fecha_notificacion: '14:00 28-05-2024',
    descripcion: 'Ambiente deshabilitado por fallo técnico',
    leido: true,
  },
];

const NotificacionesPage = () => {
  // estados
  const [notificaciones, setNotificaciones] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const loadNotificaciones = () => {
    /* Borrar esto */
    setNotificaciones(
      notificacionesTest.map((not) => {
        return {
          'Fecha y hora': not.fecha_notificacion,
          Descripción: not.descripcion,
          Leído: not.leido,
        };
      }),
    );

    /* Cambiar api */
    /* let apiUsuario = '/grupos/tablamaterias/1';
    if (user.tipo_usuario !== 'ADMINISTRADOR') {
      apiUsuario = `/grupos/tablamaterias/${user.id_usuario}`;
    }

    axios
      .get(`${baseURL}${apiUsuario}`)
      .then((response) => {
        setNotificaciones(
          response.data.map((not) => {
            return {
              'Fecha y hora': not.fecha_notificacion,
              Descripción: not.descripcion,
              Leído: not.leido,
            };
          }),
        );
      })
      .catch((error) => {
        console.error('Error al obtener las notificaciones:', error);
      }); */
  };

  useEffect(() => {
    loadNotificaciones();
  }, []);

  return (
    <div className="container p-md-4">
      <h2>Notificaciones</h2>
      <Table rows={notificaciones} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.max(Math.floor((notificaciones.length - 1) / 10) + 1, 1)}
      />
    </div>
  );
};

export default NotificacionesPage;
