import { useEffect, useState } from 'react';
// import './ListadoMateriasPage.scss';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';

const ListadoMateriasPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [reservas, setReservas] = useState([{}]);

  // >>> FUTURO : FILTROS <<<
  // obtener valores de un key
  // const materiasKey = reservas.map(mat => mat.Nivel);
  // filtro para obtener solo los valores únicos
  // const keyUnicos = [...new Set(materiasKey)];

  const loadMaterias = () => {
    axios
      .get('https://backendtis-production.up.railway.app/api/reservas/lista_reservas')
      .then((response) => {
        setReservas(
          response.data.map((reserv) => {
            return {
              ID: reserv.id_reserva,
              Solicitante: reserv.nombre_usuario,
              Usuario: reserv.tipo_usuario,
              Fecha: reserv.fecha_reserva.slice(0, 10),
              Horario: `${reserv.hora_inicio.slice(0, 5)} - ${reserv.hora_fin.slice(0, 5)}`,
              Materia: reserv.nombre_materia,
              Grupo: reserv.nombre_grupo,
              Ambiente: reserv.nombre_ambiente,
            };
          }),
        );
      })
      .catch((error) => {
        console.error('Error al obtener las reservas:', error);
      });
  };

  useEffect(() => {
    loadMaterias();
  }, []);

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Lista de reservas</h2>

      {/* Se puede parametrizar la cantidad de filas mostradas por hojas */}
      <Table rows={reservas} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.floor(reservas.length / 10) + 1}
      />
    </div>
  );
};

export default ListadoMateriasPage;
