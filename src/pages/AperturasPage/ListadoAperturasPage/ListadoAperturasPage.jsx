import { useEffect, useState } from 'react';
import './ListadoAperturasPage.scss';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';

const ListadoAperturasPage = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  const [pageNumber, setPageNumber] = useState(1);
  const [aperturas, setAperturas] = useState([{}]);

  // logica | api
  const loadAperturas = () => {
    axios
      .get(`${baseURL}/aperturas/tabla-aperturas`)
      .then((response) => {
        setAperturas(
          response.data.map((apt) => {
            let colorEstado = '#E92929';
            if (apt.estado === 'VIGENTE') {
              colorEstado = '#21BF4E';
            }
            if (apt.estado === 'EN CURSO') {
              colorEstado = '#FFCA2C';
            }

            return {
              'Inicio de reserva': apt.inicio_apertura,
              'Fin de reserva': apt.fin_apertura,
              'Periodo de examenes': apt.periodo_reservas,
              Usuario: apt.tipo_usuario,
              Motivo: apt.motivo,
              Estado: (
                <div
                  className="text-center text-white fw-bold px-2 rounded"
                  style={{ backgroundColor: colorEstado }}
                >
                  {apt.estado}
                </div>
              ),
            };
          }),
        );
      })
      .catch((error) => {
        console.error('Error al obtener los ambientes:', error);
      });
  };

  // rederización inicial
  useEffect(() => {
    loadAperturas();
  }, []);

  return (
    <div className="container-fluid listado-aperturas p-md-5">
      <h2 className="text-start">Lista de aperturas</h2>
      <Table rows={aperturas} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.max(Math.floor((aperturas.length - 1) / 10) + 1, 1)}
      />
    </div>
  );
};
export default ListadoAperturasPage;
