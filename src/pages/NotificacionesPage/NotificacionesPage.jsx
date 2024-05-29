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

  const loadNotificaciones = (_baseURL) => {
    axios
      .get(`${_baseURL}/notificaciones/${user.id_usuario}`)
      .then((response) => {
        setNotificaciones(
          response.data.map((not) => {
            console.log(response.data);
            const rows = {
              id_notificacion: not.id_notificacion,
              'Fecha y hora': not.registro,
              Descripción: not.descripcion,
            };
            const leido = (
              <Icon
                className={`rounded-2 ${not.leido ? 'bg-leido' : 'bg-noLeido'}`}
                icon="bx:check-double"
                width="30"
                height="30"
                style={{ color: '#ffffff' }}
              />
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
    loadNotificaciones(baseURL);
  }, [baseURL]);

  const handleClickRow = async (idNotification) => {
    try {
      const response = await axios.put(`${baseURL}/notificaciones/update-leido/${idNotification}`);
      if (response.status === 200) {
        console.log('Notificación actualizada correctamente:', response.data);
        loadNotificaciones(baseURL);
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  return (
    <div className="container notificaciones p-md-4">
      <h2>Notificaciones</h2>
      <Table
        rows={notificaciones}
        firstRow={(pageNumber - 1) * 10}
        lastRow={pageNumber * 10}
        typeTable={'table-hover'}
        trCliclable={true}
        handleClickRow={handleClickRow}
      />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.max(Math.floor((notificaciones.length - 1) / 10) + 1, 1)}
      />
    </div>
  );
};

export default NotificacionesPage;
