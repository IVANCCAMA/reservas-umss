import axios from 'axios';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegistroAmbientePage = () => {
  // states
  //const [horarios, setHorarios] = useState([]);
  const [selectedHorarios, setSelectedHorarios] = useState([]);

  // yup validación, atributos de formulario
  const schema = yup.object({
    nombre_ambiente: yup.string().required(),
    tipo: yup.string().required(),
    capacidad: yup.number().required(),
    disponible: yup.boolean().required(),
    computadora: yup.number().required(),
    proyector: yup.boolean().required(),
    ubicacion: yup.string(),
    porcentaje_min: yup.number().required(),
    porcentaje_max: yup.number().required(),
    dia: yup
      .object()
      .shape({
        lunes: yup.object().shape({
          periodos: yup
            .array()
            .of(
              yup.object().shape({
                id_periodo: yup.number().required(),
              }),
            )
            .required(),
        }),
        martes: yup.object().shape({
          periodos: yup
            .array()
            .of(
              yup.object().shape({
                id_periodo: yup.number().required(),
              }),
            )
            .required(),
        }),
        miercoles: yup.object().shape({
          periodos: yup
            .array()
            .of(
              yup.object().shape({
                id_periodo: yup.number().required(),
              }),
            )
            .required(),
        }),
        jueves: yup.object().shape({
          periodos: yup
            .array()
            .of(
              yup.object().shape({
                id_periodo: yup.number().required(),
              }),
            )
            .required(),
        }),
        viernes: yup.object().shape({
          periodos: yup
            .array()
            .of(
              yup.object().shape({
                id_periodo: yup.number().required(),
              }),
            )
            .required(),
        }),
        sabado: yup.object().shape({
          periodos: yup
            .array()
            .of(
              yup.object().shape({
                id_periodo: yup.number().required(),
              }),
            )
            .required(),
        }),
      })
      .required(),
  });
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    /* resolver: yupResolver(schema) */
  });

  // json horarios
  const horarios = [
    {
      nombre: 'Lunes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Martes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Miércoles',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Juevez',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Viernes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Sabado',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
  ];

  // logic
  const onSubmit = (data) => {
    // Envio de data con post
    console.log(data);
    /* axios
      .post('http://localhost:4000/api/ambientes/completo', data)
      .then((response) => {
        // Establecer los datos en el estado
        console.log(response);
        reset({
          nombre_ambiente: '',
          tipo: '',
          capacidad: '',
          disponible: '',
          computadora: '',
          proyector: '',
          ubicacion: '',
          porcentaje_min: '',
          porcentaje_max: '',
          dia: '',
        });
        setSelectedHorarios([]);
        clearErrors();
      })
      .catch((error) => {
        console.error('Error al obtener las materias:', error);
      }); */
  };

  // rederización inicial
  /*  useEffect(() => {
    loadMaterias();
  }, []); */

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-6">
          <h2 className="text-md-center">Registrar ambientes</h2>
          <form className="forms" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <label className="form-label">Nombre de ambiente *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Escriba el nombre del ambiente"
                {...register('nombre_ambiente')}
              />
              {errors.nombre_ambiente && (
                <span className="text-danger">El campo es obligatorio</span>
              )}
            </div>
            <div className="my-3">
              <label className="form-label">Tipo de ambiente *</label>
              <select
                className="form-select"
                placeholder="Seleccione el tipo de ambiente"
                {...register('tipo', { required: 'Seleccione una categoria' })}
              >
                <option value="">Seleccione el tipo de ambiente</option>
                <option>Aula común</option>
                <option>Auditorio</option>
                <option>Laboratorio</option>
              </select>
              {errors.tipo && <span className="text-danger">Seleccione una categoria</span>}
            </div>
            <div className="my-3">
              <label className="form-label">Ubicación</label>
              <textarea
                rows={2}
                type="text"
                className="form-control"
                placeholder="Escriba la ubicación del ambiente"
                {...register('ubicacion')}
              />
              {errors.ubicacion && <span className="text-danger">El campo es obligatorio</span>}
            </div>
            <div className="row">
              <div className="my-3 col-md-6">
                <label className="form-label">Capacidad de estudiantes</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Escriba la capacidad de estudiantes"
                  {...register('capacidad')}
                />
                {errors.capacidad && <span className="text-danger">El campo es obligatorio</span>}
              </div>
              <div className="my-3 col-md-3">
                <label className="form-label">Max (%)*</label>
                <input
                  defaultValue={85}
                  type="number"
                  className="form-control"
                  placeholder="Cap. maxima"
                  {...register('porcentaje_max')}
                />
                {errors.porcentaje_max && (
                  <span className="text-danger">El campo es obligatorio</span>
                )}
              </div>
              <div className="my-3 col-md-3">
                <label className="form-label">Min (%)*</label>
                <input
                  defaultValue={115}
                  type="number"
                  className="form-control"
                  placeholder="Cap. de minima"
                  {...register('porcentaje_min')}
                />
                {errors.porcentaje_min && (
                  <span className="text-danger">El campo es obligatorio</span>
                )}
              </div>
            </div>

            <div className="my-3">
              <p className="fs-4">Equipamiento de ambiente</p>
              <label className="form-label">Nº Computadoras *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Escriba el número de computadoras"
                {...register('computadora')}
              />
              {errors.computadora && <span className="text-danger">El campo es obligatorio</span>}
            </div>

            {/* Horarios */}
            <div className="my-3">
              <label className="form-label fs-4">Días y horarios disponibles</label>
              {horarios.map((horario, index) => {
                return (
                  <div key={index}>
                    <button
                      className="form-select text-start rounded-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${horario.nombre}`}
                      aria-expanded="false"
                      aria-controls={`collapse${horario.nombre}`}
                    >
                      {horario.nombre}
                    </button>
                    <div className="collapse" id={`collapse${horario.nombre}`}>
                      <div className="card card-body">
                        <div className="d-flex flex-md-row justify-content-between">
                          <p>Periodos</p>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`selectAll_${index}`}
                              {...register(`dia.${horario.nombre}.selectAll`)}
                            />
                            <label
                              className="form-check-label me-md-2"
                              htmlFor={`selectAll_${index}`}
                            >
                              Seleccionar todo
                            </label>
                          </div>
                        </div>
                        <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2">
                          {horario.periodos.map((periodo, subIndex) => {
                            return (
                              <div className="col" key={subIndex}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`periodo_${index}_${subIndex}`}
                                    value={periodo.id}
                                    {...register(
                                      `dia.${horario.nombre}.periodos[${subIndex}].id_periodo`,
                                    )}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`periodo_${index}_${subIndex}`}
                                  >
                                    {periodo.horario}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary me-md-5">Registrar</button>
              <Link to={'/'} className="btn btn-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroAmbientePage;