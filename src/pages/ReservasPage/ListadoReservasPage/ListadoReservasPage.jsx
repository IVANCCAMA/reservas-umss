import { useEffect, useState } from 'react';
// import './ListadoMateriasPage.scss';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { useAppSelector } from '../../../redux/app/hooks';
import Reporte from '../Reporte/Reporte';
import Filter from '../../../components/Filter/Filter';

const ListadoReservasPage = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;

  const [pageNumber, setPageNumber] = useState(1);
  const [reservas, setReservas] = useState([{}]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [data, setData] = useState([{}]);

  //redux
  const user = useAppSelector((state) => state.auth.usuario);

  const loadReservas = () => {
    let apiUsuario = '/lista_reservas';
    if (user.tipo_usuario !== 'ADMINISTRADOR') {
      apiUsuario = `/reserva-usuario/${user.id_usuario}`;
    }

    axios
      .get(`${baseURL}/reservas${apiUsuario}`)
      .then((response) => {
        const mappedReservas = response.data.map((reserv) => {
          let colorEstado = '#E92929';
          if (reserv.estado === 'vigente') {
            colorEstado = '#21BF4E';
          }
          if (reserv.estado === 'cancelado') {
            colorEstado = '#FFCA2C';
          }
          const rows = {
            Registro: reserv.registro_reserva,
            Fecha: reserv.fecha_reserva.slice(0, 10),
            Horario: `${reserv.hora_inicio.slice(0, 5)} - ${reserv.hora_fin.slice(0, 5)}`,
            'Materia - Grupo': reserv.nombre_materia,
            Cantidad: reserv.cantidad_est,
            Ambiente: reserv.nombre_ambiente,
            'Min-Capacidad-Max': reserv.min_cap_max,
            Estado: (
              <div
                className="text-center text-white fw-bold px-2 rounded"
                style={{ backgroundColor: colorEstado }}
              >
                {reserv.estado}
              </div>
            ),
          };
          return user.tipo_usuario !== 'ADMINISTRADOR'
            ? rows
            : { Solicitante: reserv.nombre_usuario, ...rows };
        });

        setData(response.data);
        setReservas(mappedReservas);
        setFilteredReservas(mappedReservas);
      })
      .catch((error) => {
        console.error('Error al obtener las reservas:', error);
      });
  };

  useEffect(() => {
    loadReservas();
  }, []);

  const handleFilter = (searchTerm) => {
    const filteredData = reservas.filter((reserv) => {
      return Object.values(reserv).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
    setFilteredReservas(filteredData);
  };

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <div className="d-flex justify-content-between">
        <h2 className="text-start">Lista de reservas</h2>
        {user.tipo_usuario === 'ADMINISTRADOR' && (
          <Reporte label="Generar reporte" icon="carbon:document" data={data} />
        )}
      </div>

      <Filter onFilter={handleFilter} />
      <Table rows={filteredReservas} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.max(Math.floor((filteredReservas.length - 1) / 10) + 1, 1)}
      />
    </div>
  );
};

export default ListadoReservasPage;
