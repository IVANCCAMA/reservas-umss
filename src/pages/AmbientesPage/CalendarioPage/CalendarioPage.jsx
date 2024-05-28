import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import horariosJSON from '../RegistroAmbientePage/horarios';
import { useModal } from '../../../components/Bootstrap/ModalContext';
import iconoError from '../../../assets/Images/iconoError.png';
import iconoExito from '../../../assets/Images/iconoExito.png';
import iconoUbicacion from '../../../assets/Images/iconoUbicacion.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CalendarioPage = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  const { confirmationModal, errorModal, successModal } = useModal();
  const { id_ambiente } = useParams();
  const [periodos, setPeriodos] = useState([{}]);
  const [disponibilidad, setDisponibilidad] = useState([[]]);
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    axios
      .get(`${baseURL}/periodos`)
      .then((response) => setPeriodos(response.data))
      .catch((error) => {
        console.error('Error al obtener los periodos:', error);
      });
    axios
      .get(`${baseURL}/disponibles/ambiente/${id_ambiente}`)
      .then(({ data }) => {
        const aux = data.disponibilidadPorDia.map(obj => obj.periodos);
        console.log(aux);
        setDisponibilidad(aux);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del ambiente:', error);
      });
  }, []);

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Calendario de </h2>

      <div className="table-responsive rounded-bottom-1">
        <table className="table table-bordered border-white ">
          <thead>
            <tr>
              <th style={{ width: '0' }} scope="col" className='border border-top-0 border-start-0 border-black' />
              {dias.map((dia, index) => (
                <th key={`header-${index}`} scope="col" className='border border-top-0 border-end-0 border-black' >
                  <h4 className='d-flex justify-content-center'>{dia}</h4>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {periodos.map((periodo, index) => (
              <tr key={`row-${index}`} className='border border-bottom-0 border-start-0 border-end-0 border-black' >
                <td
                  key={`periodo-${index}`}
                  className="d-flex justify-content-center translate-middle-y bg-white border-0 me-2"
                >
                  {periodo.hora_inicio?.slice(0, 5) || 'null'}
                </td>
                {console.log(disponibilidad?.map(obj => obj.filter(obj2 => obj2.id_periodo === periodo.id_periodo)))}
                {disponibilidad?.map((obj, subIndex) => (
                  <td key={`row-${index}-${subIndex}`} className={subIndex === 5 && `border-end-0 border-black`}>
                    {subIndex}, {obj[index]?.periodo}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarioPage;
