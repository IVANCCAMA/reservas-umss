import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import horariosJSON from './horarios';
import usersJSON from './users';
import { useNavigate } from 'react-router-dom';
import iconInfo from '../../../assets/Images/alert-information.png';
import iconoError from '../../../assets/Images/iconoError.png';
import iconoExito from '../../../assets/Images/iconoExito.png';
import { useModal } from '../../../components/Bootstrap/ModalContext';

const RegistroReservaPage = () => {
  const database = 'https://backendtis-production.up.railway.app/api';

  const navigate = useNavigate();
  const { confirmationModal } = useModal();
  // json horarios
  const horarios = horariosJSON;
  const users = usersJSON;
  const currentDate = new Date().toISOString().split('T')[0];

  const initvalues = {
    id_usuario: '',
    nombre_usuario: '',
    contrasenia_usuario: '',
    email_usuario: '',
    tipo_usuario: '',
    codsiss: '',
    disponible: true,
    materia_grupo: [],
  };

  // estados
  const [selectedUser, setSelectedUser] = useState(initvalues);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [maxDate, setMaxDate] = useState('');
  const [filteredHorarios, setFilteredHorarios] = useState([]);
  const [selectedAlerts, setSelectedAlerts] = useState({});

  const [sending, setSending] = useState(false); // Estado para la alerta de envío
  const [error, setError] = useState(false); // Estado para la alerta de error
  const [success, setSuccess] = useState(false);

  const alerts = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  // yup validación, atributos de formulario
  const schema = yup.object({
    solicitante: yup.string().required(),
    tipo_ambiente: yup.string().required(),
    listaGrupos: yup.array().min(1, 'Seleccione al menos una materia'),
    cantidad_est: yup.number(),
    fecha_reserva: yup.string().required(),
    motivo: yup.string(),
    periodos: yup
      .array()
      .min(1, 'Seleccione al menos un horario')
      .test('at-least-one-period-selected', 'Seleccione al menos un horario', function (value) {
        if (!value) return false;
        return value.some((periodo) => periodo.id_periodo !== false);
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      solicitante: '',
      tipo_ambiente: '',
      listaGrupos: [],
      cantidad_est: 0,
      fecha_reserva: '',
      motivo: '',
      periodos: [],
    },
  });

  // Función para obtener fecha apertura
  useEffect(() => {
    // recuperar fechas max min
    axios
      .get(`${database}/aperturas/2`)
      .then((response) => {
        setMaxDate(response.data.apertura_fin);
      })
      .catch((error) => {
        console.error('Error al obtener la apertura 2:', error);
      });
  }, []);

  const onSubmit = (data) => {
    const periodosFiltrados = data.periodos.filter((periodo) => periodo.id_periodo);
    const filteredData = {
      ...data,
      periodos: periodosFiltrados,
    };

    console.log(filteredData);

    setSending(true);
    setTimeout(() => {
      axios
        .post(`${database}/reservas`, filteredData)
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length === 0) {
            setError(true);
            setTimeout(() => setError(false), 2000);
          } else {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              navigate('./ambientesDisponibles', {
                state: {
                  fecha_reserva: filteredData.fecha_reserva,
                  motivo: filteredData.motivo,
                  listaGrupos: filteredData.listaGrupos,
                  id_apertura: 2,
                  cantidad_total: filteredData.cantidad_est,
                  ambienteDisp: response.data,
                },
              });
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setTimeout(() => setError(false), 2000);
        })
        .finally(() => {
          setSending(false);
        });
    }, 2000);
  };

  const handleGroupSelection = (event) => {
    const selectedGroupId = event.target.value;
    if (selectedGroupId) {
      const selectedGroup = selectedUser.materia_grupo.find(
        (group) => group.id_aux_grupo === parseInt(selectedGroupId),
      );
      if (selectedGroup) {
        setSelectedGroups((prevSelectedGroups) => {
          const updatedSelectedGroups = [...prevSelectedGroups, selectedGroup];
          const selectedGroupIds = updatedSelectedGroups.map((group) => group.id_aux_grupo);
          setValue('listaGrupos', selectedGroupIds);

          // Calcular la cantidad total de estudiantes
          const totalEstudiantes = updatedSelectedGroups.reduce(
            (total, group) => total + group.cantidad_est,
            0,
          );
          setValue('cantidad_est', totalEstudiantes);

          // Asignar un color de alerta a la materia seleccionada
          setSelectedAlerts((prevSelectedAlerts) => ({
            ...prevSelectedAlerts,
            [selectedGroup.id_aux_grupo]: alerts[Math.floor(Math.random() * alerts.length)],
          }));

          return updatedSelectedGroups;
        });
      }
    }
  };

  const handleGroupRemoval = (groupId) => {
    setSelectedGroups((prevSelectedGroups) => {
      const updatedGroups = prevSelectedGroups.filter(
        (group) => group.id_aux_grupo !== parseInt(groupId),
      );

      const updatedGroupIds = updatedGroups.map((group) => group.id_aux_grupo);
      setValue('listaGrupos', updatedGroupIds);

      const totalEstudiantes = updatedGroups.reduce(
        (total, group) => total + group.cantidad_est,
        0,
      );
      setValue('cantidad_est', totalEstudiantes > 0 ? totalEstudiantes : 0);

      return updatedGroups;
    });
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const selectedDay = selectedDate.getDay();

    if (selectedDay === 6) {
      setValue('fecha_reserva', '');
      setFilteredHorarios([]);
    } else {
      if (selectedDay === 5) {
        // Si el día seleccionado es sábado
        const filteredHorarios = horarios.periodos.filter((periodo) => periodo.id <= 6);
        setFilteredHorarios(filteredHorarios);
      } else {
        setFilteredHorarios(horarios.periodos);
      }
      setValue('fecha_reserva', event.target.value);
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);

  const handleSolicitanteChange = (event) => {
    const nombreSolicitante = event.target.value;
    const user = users.find((user) => user.nombre_usuario === nombreSolicitante);
    if (user) {
      setSelectedUser(user);
      setValue('solicitante', user.nombre_usuario);

      // Verificar si el usuario es administrador
      setIsAdmin(user.tipo_usuario === 'ADMINISTRADOR');

      if (user.tipo_usuario === 'ADMINISTRADOR') {
        // Si el usuario es administrador, permitir la edición del número de estudiantes
        setValue(
          'cantidad_est',
          selectedGroups.reduce((total, group) => total + group.cantidad_est, 0),
        );
      } else {
        // Si no es administrador, deshabilitar la edición del número de estudiantes
        setValue('cantidad_est', 0); // Reinicia el valor del campo
      }
    } else {
      setSelectedUser(initvalues);
      setSelectedGroups([]);
      setValue('listaGrupos', []);
      setValue('cantidad_est', 0);
    }
  };

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-8">
          <h2 className="text-md-center">Formulario de reserva</h2>

          <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre solicitante */}
            <div className="my-3">
              <label className="form-label fw-bold">Nombre del solicitante</label>
              <input
                type="text"
                maxLength={25}
                className="form-control"
                placeholder="Ingrese el nombre del solicitante"
                {...register('solicitante')}
                onChange={handleSolicitanteChange}
              />
              {errors.solicitante && (
                <span className="text-danger">Ingrese un nombre de un usuario</span>
              )}
            </div>

            {/* Tipo ambiente */}
            <div className="my-3">
              <label className="form-label fw-bold">
                Tipo de ambiente <span className="text-danger ms-1">*</span>
              </label>
              <select
                className="form-select"
                placeholder="Seleccione el tipo de ambiente"
                {...register('tipo_ambiente')}
              >
                <option value="">Seleccione el tipo de ambiente</option>
                <option value={'aula comun'}>Aula común</option>
                <option value={'auditorio'}>Auditorio</option>
                <option value={'laboratorio'}>Laboratorio</option>
              </select>
              {errors.tipo_ambiente && (
                <span className="text-danger">Seleccione una categoria</span>
              )}
            </div>

            {/* Seleccion de Materias y grupos */}
            <div className="my-3">
              <label className="form-label fw-bold">
                Materias y grupos <span className="text-danger ms-1">*</span>
              </label>
              <select
                className="form-select"
                placeholder="Seleccionar materias y grupos"
                onChange={handleGroupSelection}
              >
                <option value="">Seleccionar materias y grupos</option>
                {selectedUser.materia_grupo.map((grupo, index) => {
                  const isSelected = selectedGroups.some(
                    (selectedGroup) => selectedGroup.id_aux_grupo === grupo.id_aux_grupo,
                  );
                  if (!isSelected) {
                    return (
                      <option key={index} value={grupo.id_aux_grupo}>
                        {grupo.nombre_materia} - {grupo.nombre_grupo}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>
            {errors.listaGrupos && (
              <span className="text-danger">Seleccione al menos una materia</span>
            )}
            <div className="my-3">
              <label className="form-label fw-bold">Lista de materias y grupos añadidos</label>
              {selectedGroups.map((group, index) => (
                <div
                  key={index}
                  className={`mb-1 px-3 py-1 alert alert-${selectedAlerts[group.id_aux_grupo]
                    } alert-dismissible fade show`}
                >
                  {group.nombre_materia} - {group.nombre_grupo}
                  <button
                    type="button"
                    className="btn-close pe-1 py-2"
                    onClick={() => handleGroupRemoval(group.id_aux_grupo)}
                    aria-label="Close"
                  ></button>
                </div>
              ))}
            </div>
            {/* Cantidad est */}
            <div className="my-3 row row-cols6">
              <div className="col-md-6">
                <label className="form-label fw-bold">Número de Estudiantes</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  max={500}
                  disabled={!isAdmin}
                  {...register('cantidad_est')}
                />
              </div>
              {/* Fecha */}
              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Fecha de reserva <span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  // bug futuro :v
                  min={currentDate}
                  max={maxDate}
                  onChange={handleDateChange}
                />
                {errors.fecha_reserva && (
                  <span className="text-danger">Seleccione una fecha valida</span>
                )}
              </div>
            </div>

            <div className="my-3">
              <label className="form-label fw-bold">Motivos de reserva</label>
              <textarea
                rows={2}
                type="text"
                maxLength={200}
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
                            disabled={!watch('fecha_reserva')}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              filteredHorarios.forEach((_, subIndex) => {
                                const fieldName = `periodos[${subIndex}].id_periodo`;
                                setValue(
                                  fieldName,
                                  checked ? filteredHorarios[subIndex].id : false,
                                );
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2">
                      {filteredHorarios.map((periodo, subIndex) => {
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
              <button type="submit" className="btn btn-success me-md-5" style={{ width: "86px" }}>
                Enviar
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  confirmationModal({
                    content: (
                      <>
                        <div>
                          <img src={iconoError} />
                        </div>
                        <div className="pt-md-3">
                          ¿Estás seguro que desea <br /> cancelar el registro de <br /> ambiente?
                        </div>
                      </>
                    ),
                    onClickYesTo: '/',
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Enviando... */}
        {sending && (
          <div className='position-fixed col-md-10 vh-100 pb-5 d-flex flex-column-reverse'>
            <div className="d-flex justify-content-md-end pb-4 pe-3">
              <div className="alert alert-primary py-1 d-flex align-items-center" role="alert">
                <img src={iconInfo} alt="info" className="iconAlert" />
                <div className="ps-3">Enviando formulario</div>
                <div className="spinner-border spinner-border-sm ms-4" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Error al enviar */}
        {error && (
          <div className='position-fixed col-md-10 vh-100 pb-5 d-flex flex-column-reverse'>
            <div className="d-flex justify-content-md-end pb-4 pe-3">
              <div className="alert alert-danger py-1 d-flex align-items-center" role="alert">
                <img src={iconoError} alt="info" className="iconAlert" />
                <div className="ps-3">Error al enviar, intente de nuevo</div>
              </div>
            </div>
          </div>
        )}
        {/* Enviado correctamente */}
        {success && (
          <div className='position-fixed col-md-10 vh-100 pb-5 d-flex flex-column-reverse'>
            <div className="d-flex justify-content-md-end pb-4 pe-3">
              <div className="alert alert-success py-1 d-flex align-items-center" role="alert">
                <img src={iconoExito} alt="info" className="iconAlert" />
                <div className="ps-3">Enviado correctamente</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroReservaPage;
