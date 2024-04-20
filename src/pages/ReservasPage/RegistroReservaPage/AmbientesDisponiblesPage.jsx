import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import './ListadoAmbientesPage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { Icon } from '@iconify/react/dist/iconify.js';

const AmbientesDisponibles = () => {
  // estados
  const database = 'https://backendtis-production.up.railway.app/api';
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();

  const confirmSelect = (id_disponible) => {
    // show modal confirm

    // click acept modal confirm
    // register new reserva
    const body = {
      ...formData,
      listaGrupos: formData.listaGrupos.map(group => parseInt(group, 10)),
      id_disponible: id_disponible
    };
    console.log(body);
    axios
      .post(`${database}/reservas/crear/`, body)
      .then((response) => {
        // success
        console.log(response.data);
        // redirect
        navigate('/reservas/listaReservas');
      })
      .catch((error) => {
        console.error('Error al obtener las materias y grupos:', error);
      });
  };

  const [pageNumber, setPageNumber] = useState(1);
  const ambientes = formData.ambienteDisp.map((amb) => {
    return {
      ID: amb.ambiente_id,
      Aula: amb.nombre_ambiente,
      Capacidad: amb.capacidad_ambiente,
      Estado: amb.estado,
      Tipo: amb.tipo_ambiente,
      Periodo: `${amb.hora_inicio?.slice(0, 5)} - ${amb.hora_fin?.slice(0, 5)}`,
      Accion: (
        <button
          type="button"
          className="btn btn-success boton-style w-auto text-center me-md-3 rounded"
          onClick={() => { confirmSelect(amb.id_disponible) }}>
          Seleccionar
        </button>
      ),
    };
  });

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Lista de ambientes disponible</h2>
      <Table rows={ambientes} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <div className="my-3 row row-cols6">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-primary boton-style w-auto text-center me-md-3 rounded"
            onClick={() => { navigate('/reservas/reservarAmbiente'); }}>
            Volver al formulario
          </button>
        </div>
        <div className="col-md-6">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            lastPage={Math.floor(ambientes.length / 10) + 1}
          />
        </div>
      </div>
    </div>
  );
};
export default AmbientesDisponibles;
