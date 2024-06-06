import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { useModal, useNotification } from '../../../components/Bootstrap';
import { Icon } from '@iconify/react';
import iconoError from '../../../assets/Images/iconoError.png';
import Filter from '../../../components/Filter/Filter';

const AmbientesDisponibles = () => {
  const navigate = useNavigate();
  const database = import.meta.env.VITE_APP_DOMAIN;
  const location = useLocation();
  const formData = location.state;
  const { confirmationModal, errorModal, successModal } = useModal();
  const { errorNotification } = useNotification();
  const [ambientesData, setAmbientesData] = useState([]);
  const [filteredAmbientes, setFilteredAmbientes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const queryAmbientesDisp = () => {
    axios
      .post(`${database}/reservas`, {
        tipo_ambiente: formData.tipo_ambiente,
        cantidad_est: formData.cantidad_est,
        periodos: formData.periodos.map((obj) => ({ id_periodo: parseInt(obj) })),
        fecha_reserva: formData.fecha_reserva,
      })
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data) && response.data.length === 0) {
          errorNotification({ body: 'No se encontró ningún ambiente disponible' });
        }
        setAmbientesData(response.data);
        setFilteredAmbientes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los ambiente disponibles: ', error);
        errorNotification({ body: 'Error al enviar, intente de nuevo' });
      });
  };

  useEffect(() => {
    queryAmbientesDisp();
  }, []); // Se asegura de que queryAmbientesDisp se ejecute solo una vez al montar el componente

  const confirmSelect = (amb) => {
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
      onClickYes: () => {
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
              onClickTo: '/reservas/listaReservas',
            });
          })
          .catch((error) => {
            queryAmbientesDisp();
            console.error('Error al registrar reserva:', error);
            errorModal({
              body: (
                <>
                  <img src={iconoError} />
                  <div className="pt-md-3">
                    Error al registrar
                    <br />
                    Intente de nuevo
                  </div>
                </>
              ),
            });
          });
      },
    });
  };

  const handleFilter = (searchTerm) => {
    const filteredData = ambientesData.filter((amb) => {
      return Object.values(amb).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
    setFilteredAmbientes(filteredData);
  };

  const ambientes = filteredAmbientes.map((amb) => {
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
      <h2 className="text-start">Lista de ambientes disponibles</h2>
      <Filter onFilter={handleFilter} />

      <Table rows={ambientes} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <div className="my-3 row row-cols-6">
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
