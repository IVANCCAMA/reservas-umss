import axios from 'axios';
import { useModal } from '../../../components/Bootstrap/ModalContext';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/app/hooks';

const CalendarioPage = () => {
  const user = useAppSelector((state) => state.auth.usuario);
  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  const { confirmationModal, errorModal, successModal } = useModal();
  const { id_ambiente } = useParams();
  const [periodos, setPeriodos] = useState([{}]);
  const [disponibilidad, setDisponibilidad] = useState([[]]);
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const currentDateTime = new Date();
  const dateStringFormat = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const headerColor = {
    DOCENTE: 'success',
    AUXILIAR: 'warning',
    ADMINISTRADOR: 'info'
  };
  const [reservas, setReservas] = useState([{}]);

  useEffect(() => {
    axios
      .get(`${baseURL}/periodos`)
      .then(({ data }) => setPeriodos(data))
      .catch((error) => {
        console.error('Error al obtener los periodos:', error);
      });
    axios
      .get(`${baseURL}/disponibles/ambiente/${id_ambiente}`)
      .then(({ data }) => setDisponibilidad(data.disponibilidadPorDia.map(obj => obj.periodos)))
      .catch((error) => {
        console.error('Error al obtener los datos del ambiente:', error);
      });
    axios
      .get(`${baseURL}/reservas/reserva-ambientes/${id_ambiente}`)
      .then(({ data }) => {
        console.log(data);
        setReservas(data.length > 0 ? data : [{}])
      })
      .catch((error) => {
        console.error('Error al obtener los datos del ambiente:', error);
      });
    // recuperar apertura
    axios
      .get(`${baseURL}/aperturas/apertura-fecha`)
      .then(({ data }) => {
        const aux = user.tipo_usuario === 'ADMINISTRADOR' ? data[0]
          : data.find(obj => obj[user.tipo_usuario.toLowerCase()]);
        if (aux === undefined) {
          throw new Error('No existen aperturas vigentes');
        }
        const _apertura = {
          id: aux.id_apertura,
          motivo: aux.motivo,
          aperturaIni: new Date(aux.apertura_inicio),
          aperturaFin: new Date(aux.apertura_fin),
          reservaIni:
            new Date(aux.reserva_inicio).getTime() > currentDateTime.getTime()
              ? new Date(aux.reserva_inicio)
              : currentDateTime,
          reservaFin:
            new Date(aux.reserva_fin).getTime() > currentDateTime.getTime()
              ? new Date(aux.reserva_fin)
              : currentDateTime,
        }
        console.log(_apertura);
      })
      .catch((error) => {
        console.error('Error al obtener la apertura vigente:', error);
      });
    
  }, []);

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Calendario de </h2>

      <div className="table-responsive rounded-bottom-1">
        <table className="table table-bordered border-white">
          <thead>
            <tr>
              <th style={{ width: '0' }} className='border border-top-0 border-start-0 border-black' />
              {dias.map((dia, index) => (
                <th
                  key={`header-${index}`}
                  // scope="col"
                  className='border border-top-0 border-end-0 border-black '
                  style={{ width: '25% !important' }}
                >
                  <h4 className='d-flex justify-content-center mb-0 px-5'>{dia.slice(0, 3)}</h4>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {periodos.map((periodo, index) => (
              <tr key={`row-${index}`} className='border border-bottom-0 border-start-0 border-end-0 border-black' >
                <td
                  key={`periodo-${index}`}
                  className="d-flex justify-content-center translate-middle-y bg-white border-0 me-2 px-1"
                >
                  {periodo.hora_inicio?.slice(0, 5)}
                </td>
                {disponibilidad?.map(obj => obj.filter(obj2 => obj2.id_periodo === periodo.id_periodo)[0])
                  .map((obj, subIndex) => {
                    const date = new Date("08-06-2024").toLocaleString('es-ES', dateStringFormat);
                    return (
                      <td key={`row-${index}-${subIndex}`} className='border-end-0 p-1'>
                        {obj && (
                          <>
                            <button className="btn btn-secondary dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">
                              Reservado
                            </button>

                            <div className="dropdown">
                              <div className="dropdown-menu p-0 border-0">
                                <div className={`card border-${headerColor[reservas[0].tipo_usuario]}`} style={{ minWidth: '18rem' }}>
                                  <h5 class={`card-header text-bg-${headerColor[reservas[0].tipo_usuario]} bg-opacity-75`}>{reservas[0].nombre_usuario}</h5>
                                  <div className="card-body p-2">
                                    <h6 className="card-title small">Registrado el {reservas[0].nombre_usuario.toLowerCase()}</h6>
                                    <ul className="card-text text-body-secondary small p-0">
                                      <li className='dropdown-item py-0 px-2'>{reservas[0].nombre_usuario}</li>
                                      <li className='dropdown-item py-0 px-2'>{reservas[0].nombre_usuario}</li>
                                      <li className='dropdown-item py-0 px-2'>{reservas[0].nombre_usuario}</li>
                                      <li className='dropdown-item py-0 px-2'>{reservas[0].nombre_usuario}</li>
                                    </ul>
                                  </div>
                                  <div class={`card-footer text-body-secondary small`}>
                                    {date.charAt(0).toUpperCase() + date.slice(1).toLowerCase()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                    )
                  })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarioPage;
