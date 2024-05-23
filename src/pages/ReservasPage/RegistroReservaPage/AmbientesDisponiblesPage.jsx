import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import './ListadoAmbientesPage.scss';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { useModal } from '../../../components/Bootstrap/ModalContext';
import { Icon } from '@iconify/react';
import iconoError from '../../../assets/Images/iconoError.png';

const AmbientesDisponibles = () => {
  const navigate = useNavigate();
  // estados
  const database = 'https://backendtis-production.up.railway.app/api';
  const location = useLocation();
  const formData = location.state;
  const { confirmationModal, errorModal, successModal } = useModal();

  const confirmSelect = (amb) => {
    // show modal confirm
    confirmationModal({
      body: (
        <>
          <div className="position-absolute">
            <Icon icon="gg:info" width="45" height="45" style={{ color: '#FF6B00' }} />
          </div>
          <div>
            Confirmar reserva <br />
            Aula: {amb.nombre_ambiente} <br />
            Capacidad: {amb.capacidad_ambiente} <br />
            Tipo: {amb.tipo_ambiente} <br />
            Fecha: {amb.fecha} <br />
            Hora: {amb.hora_inicio?.slice(0, 5)} - {amb.hora_fin?.slice(0, 5)} <br />
          </div>
        </>
      ),
      // click acept modal confirm
      onClickYes: () => {
        // register new reserva
        axios
          .post(`${database}/reservas/crear/`, {
            id_disponible: amb.id_disponible,
            fecha_reserva: formData.fecha_reserva,
            motivo: formData.motivo,
            listaGrupos: formData.listaGrupos,
            id_apertura: formData.apertura.id,
            cantidad_total: formData.cantidad_est,
          })
          .then((response) => {
            // success
            successModal({
              body: (
                <>
                  <Icon
                    icon="gg:check-o"
                    style={{ color: '#0fa958', height: '90px', width: '90px' }}
                  />
                  <div className="pt-md-3">
                    Registro de reserva
                    <br />
                    exitoso
                  </div>
                </>
              ),
              // redirect
              onClickTo: '/reservas/listaReservas',
            });
          })
          .catch((error) => {
            console.error('Error al registrar reserva:', error);
            errorModal({
              body: (
                <>
                  <img src={iconoError} />
                  <div className="pt-md-3">
                    Error al registrar
                    <br />
                    Intente de nnuevo
                  </div>
                </>
              ),
            });
          });
      },
    });
  };

  const [pageNumber, setPageNumber] = useState(1);
  const ambientes = formData.ambienteDisp.map((amb) => {
    return {
      Aula: amb.nombre_ambiente,
      Capacidad: amb.capacidad_ambiente,
      Estado: amb.estado,
      Tipo: amb.tipo_ambiente.toUpperCase(),
      Periodo: `${amb.hora_inicio?.slice(0, 5)} - ${amb.hora_fin?.slice(0, 5)}`,
      Fecha: amb.fecha,
      Acción: (
        <button
          type="button"
          className="btn btn-success boton-style w-auto text-center me-md-3 rounded"
          onClick={() => {
            confirmSelect(amb);
          }}
        >
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
            onClick={() => {
              navigate('/reservas/reservarAmbiente', { state: { ...formData } });
            }}
          >
            Volver al formulario
          </button>
        </div>
        <div className="col-md-6">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            lastPage={Math.max(Math.floor((ambientes.length - 1) / 10) + 1, 1)}
          />
        </div>
      </div>
    </div>
  );
};
export default AmbientesDisponibles;
