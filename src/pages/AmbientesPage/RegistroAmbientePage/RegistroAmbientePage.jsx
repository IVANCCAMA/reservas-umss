import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import horariosJSON from './horarios';
import { useModal } from '../../../components/Bootstrap/ModalContext';
import iconoError from '../../../assets/Images/iconoError.png';
import iconoExito from '../../../assets/Images/iconoExito.png';
import iconoUbicacion from '../../../assets/Images/iconoUbicacion.png';
import { useEffect, useState } from 'react';

const RegistroAmbientePage = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  const { confirmationModal, errorModal, successModal } = useModal();
  const [ambientes, setAmbientes] = useState([]);

  const loadAmbientes = () => {
    axios
      .get(`${baseURL}/ambientes`)
      .then((response) => {
        setAmbientes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los ambientes:', error);
      });
  };
  useEffect(() => {
    loadAmbientes();
  }, []);

  const errorModalBody = (
    <>
      <div>
        <img src={iconoError} />
      </div>
      <div className="pt-md-3">Error al registrar ambiente intente de nuevo</div>
    </>
  );

  // yup validación, atributos de formulario
  const schema = yup.object({
    nombre_ambiente: yup
      .string()
      .trim() // Elimina los espacios en blanco al inicio y al final
      .required('El campo es obligatorio')
      .matches(
        /^[\w]+(?:-[\w]+)*(?: [\w]+(?:-[\w]+)*)*$/,
        'Formato no válido. Solo se permite letras y no se acepta acentos.',
      )
      .test('is-unique', 'El nombre del ambiente ya está en uso', function (value) {
        loadAmbientes();
        return isUniqueName(value.toUpperCase());
      })
      .test('is-valid-format', 'Formato no válido', function (value) {
        // Verifica si hay más de un espacio consecutivo en el valor
        return !/\s{2,}/.test(value);
      }),
    tipo: yup.string().required(),
    capacidad: yup
      .number()
      .integer('La capacidad debe ser un número entero')
      .typeError('El campo es obligatorio, la capacidad debe ser un número entero')
      .required('El campo es obligatorio')
      .min(0, 'La capacidad mínima es 0')
      .max(500, 'La capacidad máxima es 500'),
    computadora: yup
      .number()
      .integer('El número debe ser un número entero')
      .typeError('El campo es obligatorio, el número debe ser un número entero')
      .required('El campo es obligatorio')
      .min(0, 'El número mínimo es 0')
      .max(250, 'El número máximo es 250')
      .test('is-required', 'El campo es obligatorio para laboratorios', function (value) {
        const tipoAmbiente = this.parent.tipo;
        if (tipoAmbiente === 'Laboratorio') {
          return typeof value === 'number';
        }
        return true;
      }),
    ubicacion: yup.string(),
    porcentaje_min: yup
      .number()
      .integer('El número debe ser un número entero')
      .typeError('El campo es obligatorio, el número debe ser un número entero')
      .required('El campo es obligatorio')
      .min(45, 'El número mínimo es 45')
      .max(100, 'El número máximo es 100'),
    porcentaje_max: yup
      .number()
      .integer('El número debe ser un número entero')
      .typeError('El campo es obligatorio, el número debe ser un número entero')
      .required('El campo es obligatorio')
      .min(100, 'El número mínimo es 100')
      .max(150, 'El número máximo es 150'),
    disponible: yup.bool(),
    proyector: yup.bool(),
    dia: yup
      .object()
      .test(
        'at-least-one-period-selected',
        'Seleccione al menos un periodo para un día',
        (value) => {
          return Object.values(value).some((day) =>
            day.periodos.some((periodo) => periodo.id_periodo !== false),
          );
        },
      ),
  });

  const isUniqueName = (inputName) => {
    const trimmedInputName = inputName.trim();

    return !ambientes.some((ambiente) => ambiente.nombre_ambiente.trim() === trimmedInputName);
  };

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      disponible: true,
      proyector: false,
      computadora: 0,
    },
  });

  // json horarios
  const horarios = horariosJSON;

  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // logic api
  const onSubmit = async (data) => {
    try {
      const filteredDia = Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(data.dia).filter(([key, value]) =>
          value.periodos.some((periodo) => periodo.id_periodo !== false),
        ),
      );

      const filteredData = {
        ...data,
        tipo: removeAccents(data.tipo.toLowerCase()),
        computadora: data.computadora === '' ? 0 : data.computadora,
        dia: Object.fromEntries(
          Object.entries(filteredDia).map(([key, value]) => [
            removeAccents(key.toLowerCase()),
            { periodos: value.periodos.filter((periodo) => periodo.id_periodo !== false) },
          ]),
        ),
      };

      const response = await axios.post(`${baseURL}/ambientes/completo`, filteredData);

      if (response.status === 201) {
        successModal({
          body: (
            <>
              <div>
                <img src={iconoExito} />
              </div>
              <div className="pt-md-3">Ambiente registrado con éxito</div>
            </>
          ),
        });

        reset({
          nombre_ambiente: '',
          tipo: '',
          capacidad: '',
          computadora: '',
          ubicacion: '',
          dia: '',
          proyector: false,
        });

        setValue('disponible', true);
        clearErrors();

        // eslint-disable-next-line no-unused-vars
        horarios.forEach((horario, index) => {
          horario.periodos.forEach((_, subIndex) => {
            const fieldName = `dia.${horario.nombre}.periodos[${subIndex}].id_periodo`;
            setValue(fieldName, false);
          });
        });
      } else {
        errorModal({ body: errorModalBody });
      }
    } catch (error) {
      console.log(error);
      errorModal({ body: errorModalBody });
    }
  };

  const tipoAmbiente = watch('tipo');

  return (
    <div className="container registro-ambientes">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-8">
          <h2 className="text-md-center">Registrar ambientes</h2>

          <form className="forms" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="input-component">
              <label className="form-label fw-bold">
                Nombre de ambiente
                <span className="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                maxLength={25}
                className="form-control"
                placeholder="Escriba el nombre del ambiente"
                {...register('nombre_ambiente')}
              />
              {errors.nombre_ambiente && (
                <span className="text-danger">{errors.nombre_ambiente.message}</span>
              )}
            </div>
            <div className="input-component">
              <label className="form-label fw-bold">
                Tipo de ambiente <span className="text-danger ms-1">*</span>
              </label>
              <select
                className="form-select"
                placeholder="Seleccione el tipo de ambiente"
                {...register('tipo')}
              >
                <option value="">Seleccione el tipo de ambiente</option>
                <option>Aula común</option>
                <option>Auditorio</option>
                <option>Laboratorio</option>
              </select>
              {errors.tipo && <span className="text-danger">Seleccione una categoria</span>}
            </div>
            <div className="input-component">
              <label className="form-label fw-bold">
                Ubicación
                <span>
                  {' '}
                  <img
                    src={iconoUbicacion}
                    alt="icono ubicacion"
                    className="pb-2"
                    style={{ width: 'auto', height: '30px' }}
                  />
                </span>
              </label>
              <textarea
                rows={2}
                maxLength={350}
                type="text"
                className="form-control"
                placeholder="Escriba la ubicación del ambiente"
                {...register('ubicacion')}
              />
            </div>
            <div className="row">
              <div className="input-component col-md-6">
                <label className="form-label fw-bold">
                  Capacidad de estudiantes <span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Escriba la capacidad de estudiantes"
                  {...register('capacidad')}
                />
                {errors.capacidad && (
                  <span className="text-danger">{errors.capacidad.message}</span>
                )}
              </div>
              <div className="input-component col-md-3">
                <label className="form-label fw-bold">
                  Min (%)<span className="text-danger ms-1">*</span>
                </label>
                <input
                  defaultValue={85}
                  type="number"
                  className="form-control"
                  placeholder="Cap. maxima"
                  {...register('porcentaje_min')}
                />
                {errors.porcentaje_min && (
                  <span className="text-danger">{errors.porcentaje_min.message}</span>
                )}
              </div>
              <div className="input-component col-md-3">
                <label className="form-label fw-bold">
                  Max (%)<span className="text-danger ms-1">*</span>
                </label>
                <input
                  defaultValue={115}
                  type="number"
                  className="form-control"
                  placeholder="Cap. de minima"
                  {...register('porcentaje_max')}
                />
                {errors.porcentaje_max && (
                  <span className="text-danger">{errors.porcentaje_max.message}</span>
                )}
              </div>
            </div>

            {tipoAmbiente === 'Laboratorio' && (
              <div className="input-component">
                <label className="form-label fw-bold">
                  Nº Computadoras <span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Escriba el número de computadoras"
                  {...register('computadora')}
                />
                {errors.computadora && (
                  <span className="text-danger">{errors.computadora.message}</span>
                )}
              </div>
            )}

            <div className="row">
              <div className="col-md">
                <label className="form-check-label me-md-2 fw-bold" htmlFor={`proyector`}>
                  Proyector de video
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`proyector`}
                  {...register('proyector')}
                />
              </div>
              <div className="col-md">
                <label className="form-check-label me-md-2 fw-bold" htmlFor={`disponible`}>
                  Disponiblidad de ambiente
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`disponible`}
                  {...register('disponible')}
                />
              </div>
            </div>

            {/* Horarios */}
            <div className="input-component">
              <label className="form-label fw-bold">
                Días y horarios disponibles <span className="text-danger ms-1">*</span>
              </label>
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
                    <div className="collapse horarios" id={`collapse${horario.nombre}`}>
                      <div className="card card-body">
                        <div className="d-flex flex-md-row justify-content-between">
                          <p className="ms-3 fw-bolds">Periodos</p>
                          <div className="d-flex text-center">
                            <div>
                              <label className="form-check-label" htmlFor={`selectAll_${index}`}>
                                Todo
                              </label>
                            </div>
                            <div>
                              <input
                                className="form-check-input ms-md-2 me-3"
                                type="checkbox"
                                id={`selectAll_${index}`}
                                {...register(`selectAll`)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  horario.periodos.forEach((_, subIndex) => {
                                    const fieldName = `dia.${horario.nombre}.periodos[${subIndex}].id_periodo`;
                                    setValue(
                                      fieldName,
                                      checked ? horario.periodos[subIndex].id : false,
                                    );
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2">
                          {horario.periodos.map((periodo, subIndex) => {
                            const fieldName = `dia.${horario.nombre}.periodos[${subIndex}].id_periodo`;
                            return (
                              <div className="col d-flex justify-content-around" key={subIndex}>
                                <div>
                                  <label
                                    className="form-check-label me-md-2"
                                    htmlFor={`periodo_${index}_${subIndex}`}
                                  >
                                    {periodo.horario}
                                  </label>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`periodo_${index}_${subIndex}`}
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
                );
              })}
              <div>
                {errors.dia && (
                  <span className="text-danger">Seleccione al menos un periodo para un día</span>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success me-5" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Registrar'}
              </button>

              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  confirmationModal({
                    body: (
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
                disabled={isSubmitting}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroAmbientePage;
