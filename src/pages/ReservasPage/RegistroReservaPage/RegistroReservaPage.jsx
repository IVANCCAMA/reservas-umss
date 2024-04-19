import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import horariosJSON from './horarios';
import { useNavigate } from 'react-router-dom';

const RegistroReservaPage = () => {
  const database = 'https://backendtis-production.up.railway.app/api';
  const navigate = useNavigate();
  // json horarios
  const horarios = horariosJSON;
  const user = {
    id_usuario: 2,
    nombre_usuario: 'CARLA SALAZAR SERRUDO',
    contrasenia_usuario: '12345678',
    email_usuario: 'carlaserrudo@gmail.com',
    tipo_usuario: 'DOCENTE',
    codsiss: 202400001,
    disponible: true,
    materia_grupo: [
      {
        id_aux_grupo: 8,
        id_grupo: 1,
        nombre_grupo: 'G1',
        nombre_materia: 'METODOS TECNICAS Y TALLER DE PROGRAMACION',
        cantidad_est: 83,
      },
      {
        id_aux_grupo: 4,
        id_grupo: 2,
        nombre_grupo: 'G4',
        nombre_materia: 'CIRCUITOS ELECTRONICOS',
        cantidad_est: 113,
      },
      {
        id_aux_grupo: 6,
        id_grupo: 3,
        nombre_grupo: 'G4',
        nombre_materia: 'BASE DE DATOS I',
        cantidad_est: 62,
      },
      {
        id_aux_grupo: 10,
        id_grupo: 5,
        nombre_grupo: 'G3',
        nombre_materia: 'FISICA GENERAL',
        cantidad_est: 64,
      },
      {
        id_aux_grupo: 1,
        id_grupo: 7,
        nombre_grupo: 'G4',
        nombre_materia: 'MATEMATICA DISCRETA',
        cantidad_est: 54,
      },
    ],
  };

  // estados
  const [selectedGroups, setSelectedGroups] = useState([]);

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
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      solicitante: user.nombre_usuario,
      id_user: user.id_usuario,
      periodos: [],
      listaGrupos: [],
      cantidad_est: 0,
    },
  });

  // Función para obtener la lista de users
  /* useEffect(() => {
    axios
      .get(`${database}/usuarios`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []); */

  const onSubmit = (data) => {
    console.log('Datos entrada', data);
    const periodosFiltrados = data.periodos.filter((periodo) => periodo.id_periodo);
    const filteredData = {
      ...data,
      periodos: periodosFiltrados,
    };

    console.log('Filtrado de datos', filteredData);
    axios
      .post(`${database}/reservas`, filteredData)
      .then((response) => {
        console.log(response.data);
        navigate('./ambientesDisponibles', {
          state: {
            fecha_reserva: filteredData.fecha,
            motivo: filteredData.motivo,
            listaGrupos: filteredData.listaGrupos,
            id_apertura: 2,
            ambienteDisp: response.data,
          },
        });
      })
      .catch((error) => {
        console.error('Error al obtener las materias y grupos:', error);
      });
  };

  const handleGroupSelection = (event) => {
    const selectedGroupId = event.target.value;

    if (selectedGroupId) {
      const selectedGroup = user.materia_grupo.find(
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
      return updatedGroups;
    });
  };

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-6">
          <h2 className="text-md-center">Formulario de reserva</h2>

          <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre solicitante */}
            <div className="my-3">
              <label className="form-label fw-bold">Nombre del solicitante</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre del solicitante"
                {...register('solicitante')}
              />
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
                {user.materia_grupo.map((grupo, index) => {
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
            <div className="my-3">
              <label className="form-label fw-bold">Lista de materias y grupos añadidos</label>
              {selectedGroups.map((group, index) => (
                <div
                  key={index}
                  className="mb-1 px-3 py-1 alert alert-primary alert-dismissible fade show"
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
            {errors.listaGrupos && (
              <span className="text-danger">Seleccione al menos una materia</span>
            )}
            {/* Cantidad est */}
            <div className="my-3 row row-cols6">
              <div className="col-md-6">
                <label className="form-label fw-bold">Número de Estudiantes</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  {...register('cantidad_est')}
                />
              </div>
              {/* Fecha */}
              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Fecha de reserva <span className="text-danger ms-1">*</span>
                </label>
                <input type="date" className="form-control" {...register('fecha_reserva')} />
                {errors.fecha_reserva && <span className="text-danger">Seleccione una fecha</span>}
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
