import { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAppSelector } from '../../redux/app/hooks';

const NotificacionesPage = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;

  // user
  const user = useAppSelector((state) => state.auth.usuario);
  // estados
  const [notificaciones, setNotificaciones] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const loadNotificaciones = () => {
    axios
      .get(`${baseURL}/notificaciones/${user.id_usuario}`)
      .then((response) => {
        setNotificaciones(
          response.data.map((not) => {
            const rows = {
              'Fecha y hora': not.registro,
              Descripción: not.descripcion,
            };
            const leido = (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            );
            return {
              ...rows,
              Leído: leido,
            };
          }),
        );
      })
      .catch((error) => {
        console.error('Error al obtener las notificaciones:', error);
      });
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
