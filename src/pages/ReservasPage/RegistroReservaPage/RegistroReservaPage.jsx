import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import horariosJSON from './horarios';
import AlertContainer from '../../../components/Bootstrap/AlertContainer';
const RegistroReservaPage = () => {
  const database = 'https://backendtis-production.up.railway.app/api';

  // json horarios
  const horarios = horariosJSON;

  // estados
  const [users, setUsers] = useState([]);
  const [grupos, setGrupos] = useState([]);

  // yup validación, atributos de formulario
  const schema = yup.object({
    solicitante: yup.string().required(),
    tipoAmbiente: yup.string().required(),
    listaGrupos: yup.string().required(),
    estudiantes: yup.number(),
    fecha: yup.string().required(),
    motivo: yup.string(),
    // Validación de los periodos seleccionados
    periodos: yup
      .array()
      .min(1, 'Seleccione al menos un horario')
      .test('at-least-one-period-selected', 'Seleccione al menos un horario', function (value) {
        if (!value) return false; // Si no hay ningún periodo seleccionado, falla la validación
        return value.some((periodo) => periodo.id_periodo !== false);
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      solicitante: 'CARLA SALAZAR SERRUDO',
      periodos: [],
    },
  });

  // Estado para almacenar la lista completa de docentes
  const [docentes, setDocentes] = useState([]);
  // Estado para almacenar el texto de búsqueda
  const [busqueda, setBusqueda] = useState('');
  // Estado para almacenar las opciones filtradas del select
  const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);

  // Función para obtener la lista de docentes
  useEffect(() => {
    axios
      .get(`${database}/usuarios`)
      .then((response) => {
        setDocentes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  // Función para manejar cambios en el input de búsqueda
  const handleBusquedaChange = (event) => {
    const textoBusqueda = event.target.value;
    setBusqueda(textoBusqueda);

    // Filtrar las opciones de acuerdo al texto de búsqueda
    const opcionesFiltradas = docentes.filter((docente) =>
      docente.nombre_usuario.toLowerCase().includes(textoBusqueda.toLowerCase()),
    );
    setOpcionesFiltradas(opcionesFiltradas);
  };

  const onSubmit = (data) => {
    console.log('Datos entrada', data);
    /* axios
      .post(`${database}/reservas`, {
        tipo_ambiente: formData.tipoAmbiente,
        cantidad_est: formData.estudiantes,
        fecha_reserva: formData.fecha,
        periodos: formData.periodos.filter((periodo) => periodo.checked),
      })
      .then((response) => {
        navigate('./ambientesDisponibles', {
          state: {
            fecha_reserva: formData.fecha,
            motivo: formData.motivo,
            listaGrupos: formData.listaGrupos,
            id_apertura: 2,
            ambienteDisp: response.data,
          },
        });
      })
      .catch((error) => {
        console.error('Error al obtener las materias y grupos:', error);
      }); */
  };

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-6">
          <h2 className="text-md-center">Formulario de reserva</h2>

          <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            {/* Select para seleccionar el docente */}
            <div className="my-3">
              <label className="form-label fw-bold">Nombre del solicitante</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre del docente"
                value={busqueda}
                onChange={handleBusquedaChange}
              />
              <select className="form-select" {...register('solicitante')}>
                {opcionesFiltradas.map((docente) => (
                  <option key={docente.id_usuario} value={docente.id_usuario}>
                    {docente.nombre_usuario}
                  </option>
                ))}
              </select>
              {errors.solicitante && <span className="text-danger">El campo es obligatorio</span>}
            </div>

            {/* Tipo ambiente */}
            <div className="my-3">
              <label className="form-label fw-bold">
                Tipo de ambiente <span className="text-danger ms-1">*</span>
              </label>
              <select
                className="form-select"
                placeholder="Seleccione el tipo de ambiente"
                {...register('tipoAmbiente')}
              >
                <option value="">Seleccione el tipo de ambiente</option>
                <option value={'aula comun'}>Aula común</option>
                <option value={'auditorio'}>Auditorio</option>
                <option value={'laboratorio'}>Laboratorio</option>
              </select>
              {errors.tipoAmbiente && <span className="text-danger">Seleccione una categoria</span>}
            </div>

            {/* Materias y grupos */}
            <div className="my-3">
              <label className="form-label fw-bold">
                Materias y grupos <span className="text-danger ms-1">*</span>
              </label>
              <select
                className="form-select"
                placeholder="Seleccionar materias y grupos"
                {...register('listaGrupos')}
              >
                <option value="">Seleccionar materias y grupos</option>
                {grupos.map((grupo, index) => (
                  <option key={index} value={grupo.id}>
                    {grupo.nombre} - {grupo.descripcion}
                  </option>
                ))}
              </select>
            </div>
            {errors.listaGrupos && (
              <span className="text-danger">Seleccione al menos una materia</span>
            )}

            <div className="my-3">
              <label className="form-label fw-bold">Lista de materias y grupos añadidos</label>
              <AlertContainer />
            </div>

            <div className="my-3 row row-cols6">
              <div className="col-md-6">
                <label className="form-label fw-bold">Número de Estudiantes</label>
                <input disabled type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Fecha de reserva <span className="text-danger ms-1">*</span>
                </label>
                <input type="date" className="form-control" {...register('fecha')} />
                {errors.fecha && <span className="text-danger">Seleccione una fecha</span>}
              </div>
            </div>

            <div className="my-3">
              <label className="form-label fw-bold">Motivos de reserva</label>
              <textarea
                rows={2}
                type="text"
                className="form-control"
                placeholder="Escriba el motivo de la reserva"
                {...register('motivo')}
              />
            </div>

            {/* Horarios */}
            <div className="my-3">
              <label className="form-label fw-bold">
                Periodos y horarios <span className="text-danger ms-1">*</span>
              </label>
              <div>
                <button
                  className="form-select text-start rounded-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse`}
                  aria-expanded="false"
                  aria-controls={`collapse`}
                >
                  Seleccione periodo/s
                </button>
                <div className="collapse horarios" id={`collapse`}>
                  <div className="card card-body">
                    <div className="d-flex flex-md-row justify-content-between">
                      <p className="ms-3 fw-bold">Periodos</p>
                      <div className="d-flex text-center">
                        <div>
                          <label className="form-check-label" htmlFor={`selectAll`}>
                            Todo
                          </label>
                        </div>
                        <div>
                          <input
                            className="form-check-input ms-md-2 me-3"
                            type="checkbox"
                            id={`selectAll`}
                            {...register(`selectAll`)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              horarios.periodos.forEach((_, subIndex) => {
                                const fieldName = `periodos[${subIndex}].id_periodo`;
                                setValue(
                                  fieldName,
                                  checked ? horarios.periodos[subIndex].id : false,
                                );
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2">
                      {horarios.periodos.map((periodo, subIndex) => {
                        const fieldName = `periodos[${subIndex}].id_periodo`;
                        return (
                          <div className="col d-flex justify-content-around" key={subIndex}>
                            <div>
                              <label
                                className="form-check-label me-md-2"
                                htmlFor={`periodo_${subIndex}`}
                              >
                                {periodo.horario}
                              </label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`periodo_${subIndex}`}
                                value={periodo.id}
                                {...register(fieldName)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {errors.periodos && (
                <span className="text-danger">Seleccione al menos un horario</span>
              )}
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success me-md-5">
                Enviar
              </button>
              <button type="submit" className="btn btn-danger">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroReservaPage;
