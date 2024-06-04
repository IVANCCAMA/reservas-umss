import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModal, AlertContainer, useNotification } from '../../../components/Bootstrap';
import Form, {
  TextInput,
  Select,
  NumberInput,
  DateInput,
  TextTarea,
  Accordion,
  CheckboxInput,
} from '../../../components/Form';
import { Icon } from '@iconify/react';
import { useAppSelector } from '../../../redux/app/hooks';

const RegistroReservaPage = () => {
  const user = useAppSelector((state) => state.auth.usuario);
  const database = 'https://backendtis-production.up.railway.app/api';
  const alerts = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  const location = useLocation();
  const { confirmationModal, successModal, errorModal } = useModal();
  const { loadNotification, errorNotification, successNotification } = useNotification();
  const formData = location.state;
  console.log(formData);
  // aux
  const currentDateTime = new Date();
  const [users, setUsers] = useState(formData?.users || []);
  const [datalistSolicitante, setDatalistSolicitante] = useState(formData?.datalistSolicitante || []);
  const [isAdmin, setIsAdmin] = useState(user.tipo_usuario === 'ADMINISTRADOR');
  const [addAssociates, setAddAssociates] = useState(formData?.addAssociates || false);
  const [associatesIds, setAssociatesIds] = useState(formData?.associatesIds || []);
  const addedAssociatesRef = useRef(null);
  const [grupos, setGrupos] = useState(formData?.grupos || []);
  const addedGroupsRef = useRef(null);

  const schema = yup.object().shape({
    solicitante: yup
      .string()
      .default(formData?.solicitante || user.nombre_usuario)
      .required('Ingrese un nombre de un usuario')
      .max(40, 'El nombre debe tener como máximo 40 caracteres'),
    asociados: yup
      .array()
      .default(formData?.asociados || [])
      .of(yup.number())
      .max(3, 'Solo puedes agregar a 3 asociados como máximo'),
    applicantGroups: yup.array().default(formData?.applicantGroups || []),
    listaGrupos: yup
      .array()
      .default(formData?.listaGrupos || [])
      .of(yup.number().positive().integer(), 'Error type for group\'s value')
      .test('noApplicantGroup', 'Seleccione algún grupo del solicitante', function (value) {
        return value.some(idGroup => this.parent.applicantGroups.includes(idGroup));
      })
      .min(1, 'Seleccione al menos un grupo'),
    cantidad_est: yup
      .number()
      .default(formData?.cantidad_est || 0)
      .typeError('Ingrese el número de estudiantes')
      .max(500, 'el número de estudiantes debe ser menor a 500')
      .min(20, 'El número de estudiantes debe ser mayor a 20')
      .integer('El número de estudiantes debe ser un número entero'),
    fecha_reserva: yup.string().default(formData?.fecha_reserva || '').required('Seleccione una fecha valida'),
    motivo: yup.string().default(formData?.motivo || '').max(200, 'El motivo debe tener como máximo 200 caracteres'),
    periodos: yup.array().default(formData?.periodos || []).of(yup.string()).min(1, 'Seleccione al menos un horario'),
    apertura: yup.object().shape({
      id: yup.number(),
      motivo: yup.string(),
      aperturaIni: yup.date(),
      aperturaFin: yup.date(),
      reservaIni: yup.date(),
      reservaFin: yup.date(),
    }).required('Error: Apertura is undefined'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.describe().default,
  });

  const resetList = () => {
    setIsAdmin(false);
    setValue('listaGrupos', []);
    setValue('cantidad_est', 0);
    addedGroupsRef.current?.removeAllAlerts();
  };

  useEffect(() => {
    // recuperar users para el id del solicitante
    axios
      .get(`${database}/usuarios`)
      .then(({ data }) => {
        setUsers(data);
        searchGroupsByApplicant(data);
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
    // recuperar apertura
    axios
      .get(`${database}/aperturas/apertura-fecha`)
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
        setValue('apertura', _apertura);
        const ini = _apertura?.aperturaIni.getTime();
        const fin = _apertura?.aperturaFin.getTime();
        const hoy = currentDateTime.getTime();
        if (!(ini <= hoy && hoy <= fin)) {
          const dateStringFormat = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
          successModal({
            body: (<>
              {/* <div className="position-absolute"> */}
              <Icon icon="gg:info" width="45" height="45" style={{ color: '#FF6B00' }} />
              {/* </div> */}
              Las reservas están actualmente<br />
              cerradas. El periodo hábil para<br />
              realizar reservas "{_apertura?.motivo}" es del {``}
              {_apertura?.aperturaIni?.toLocaleString('es-ES', dateStringFormat)} {``}
              al {_apertura?.aperturaFin?.toLocaleString('es-ES', dateStringFormat)}.
            </>),
            onClickTo: '/'
          });
        }
      })
      .catch((error) => {
        console.error('Error al obtener la apertura vigente:', error);
      });

    setTimeout(() => {
      if (formData) {
        console.log(formData);
        formData?.asociados?.forEach((associateId) => {
          addAssociatesSelected(associateId, formData.users);
        });
        resetList();
        formData.listaGrupos?.forEach((groupId) => {
          addGropsSelected(groupId);
        });
        Object.keys(watch()).forEach((propiedad) => {
          if (formData[propiedad])
            setValue(propiedad, formData[propiedad]);
        });
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setValue('asociados', []);
    searchGroupsByApplicant();
  }, [addAssociates]);

  useEffect(() => {
    const foundUserId = users.find(
      (obj) => obj.nombre_usuario === watch('solicitante'),
    )?.id_usuario;
    setAssociatesIds([]);
    grupos.forEach(async (group) => {
      await axios
        .get(`${database}/materias/usuarios-materia/${group.id_materia}`)
        .then(({ data }) => {
          data.grupos.forEach((subGroup) => {
            subGroup.aux_grupos.forEach((aux) =>
              setAssociatesIds((prev) =>
                [
                  ...prev.filter((id) => id !== aux.usuario.id_usuario),
                  aux.usuario.id_usuario,
                ].filter((id) => id !== foundUserId),
              ),
            );
          });
        })
        .catch((error) => {
          console.error(
            `Error al obtener información de la materia ${group.nombre_materia}: `,
            error,
          );
        });
    });
  }, [grupos]);

  const onSubmit = (data) => {
    loadNotification({
      body: 'Enviando formulario',
      onTimeout: () => {
        axios
          .post(`${database}/reservas`, {
            tipo_ambiente: formData.ambiente.tipo,
            cantidad_est: formData.ambiente.capacidad,
            periodos: data.periodos.map((obj) => ({ id_periodo: parseInt(obj) })),
            fecha_reserva: data.fecha_reserva,
          })
          .then((response) => confirmationModal({
            body: (
              <>
                <div className="position-absolute">
                  <Icon icon="gg:info" width="45" height="45" style={{ color: '#FF6B00' }} />
                </div>
                <div>
                  Confirmar reserva <br />
                  Aula: {formData.ambiente.nombre_ambiente} <br />
                  Capacidad: {formData.ambiente.capacidad} <br />
                  Tipo: {formData.ambiente.tipo} <br />
                  Fecha: {new Date(`${data.fecha_reserva}T00:00:00.000-04:00`)
                    .toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric', })} <br />
                  Hora: {formData.periodo} <br />
                </div>
              </>
            ),
            onClickYes: () => {
              console.log(response.data);
              const ambienteDisp = response.data.find(obj => obj.ambiente_id == formData.ambiente.id_ambiente);
              if (ambienteDisp) {
                axios
                  .post(`${database}/reservas/crear/`, {
                    id_disponible: ambienteDisp.id_disponible,
                    fecha_reserva: data.fecha_reserva,
                    motivo: data.motivo,
                    listaGrupos: data.listaGrupos,
                    id_apertura: data.apertura.id,
                    cantidad_total: data.cantidad_est,
                  })
                  .then((response) => {
                    console.log(response);
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
                    formData.ambienteDisp = [];
                    console.error('Error al registrar reserva:', error);
                    errorModal({
                      body: (
                        <>
                          <img src={iconoError} />
                          <div className="pt-md-3">
                            Error al registrar.
                            <br />
                            Intente de nuevo
                          </div>
                        </>
                      ),
                    });
                  });
              } else {
                errorModal({
                  body: (
                    <>
                      <img src={iconoError} />
                      <div className="pt-md-3">
                        El ambiente ya se encuentra
                        <br />
                        reservado.
                      </div>
                    </>
                  ),
                  onClickTo: `/ambientes/calendario/${formData.ambiente.id_ambiente}`,
                });
              }
            }
          }))
          .catch((error) => {
            console.error('Error al obtener los ambiente disponibles: ', error);
            errorNotification({ body: 'Error al enviar, intente de nuevo' });
          });
      },
    });
  };

  const handleSolicitante = (newValue) => {
    const value = newValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g, '').toUpperCase();
    const filteredValues = users
      .filter((obj) => obj.nombre_usuario.includes(value))
      .map((filteredObj) => filteredObj.nombre_usuario);
    if (filteredValues.length < 10 && filteredValues.length > 0) {
      setDatalistSolicitante(filteredValues);
    } else {
      setDatalistSolicitante(undefined);
    }
    return new String(value);
  };
  // resuperar materias y grupos
  const searchGroupsByApplicant = (_users = users) => {
    const foundUser = _users.find((obj) => obj.nombre_usuario === watch('solicitante'));
    if (foundUser?.id_usuario) {
      resetList();
      axios
        .get(`${database}/usuarios/${foundUser.id_usuario}/materias-grupos`)
        .then(({ data }) => {
          setValue('applicantGroups', data.materia_grupo.map(obj => (obj.id_aux_grupo)));
        })
        .catch((error) => {
          console.error('Error al obtener las materias y grupos:', error);
        });
      axios
        // .get(`${database}/usuarios/${foundUser.id_usuario}/materias-grupos`)
        .post(`${database}/usuarios/materias-grupos-asociados`, {
          id_solicitantes: [foundUser.id_usuario, ...watch('asociados')],
        })
        .then(({ data }) => {
          setGrupos(data);
          if (foundUser.tipo_usuario === 'ADMINISTRADOR') {
            setIsAdmin(true);
            setValue('listaGrupos', [data[0]?.id_aux_grupo]);
            setValue('cantidad_est', data[0]?.cantidad_est);
            addedGroupsRef.current?.removeAllAlerts();
          }
        })
        .catch((error) => {
          console.error('Error al obtener las materias y grupos:', error);
        });
    } else {
      resetList();
      setGrupos([]);
    }
  };

  const removeGropsSelected = (group) => {
    const groupsFiltered = watch('listaGrupos')?.filter((obj) => obj !== group.id_aux_grupo);
    setValue('listaGrupos', groupsFiltered);
    setValue('cantidad_est', Math.max(watch('cantidad_est') - group.cantidad_est, 0));
  };

  const addGropsSelected = (newValue, _grupos = grupos) => {
    const group = _grupos.find((group) => group.id_aux_grupo === parseInt(newValue));
    if (group && !watch('listaGrupos').includes(group.id_aux_grupo)) {
      addedGroupsRef.current?.addAlert(
        alerts[watch('listaGrupos').length % 8],
        `${group.nombre_materia} - ${group.nombre_grupo}`,
        () => removeGropsSelected(group),
      );
      setValue('listaGrupos', [...watch('listaGrupos'), group.id_aux_grupo]);
      setValue('cantidad_est', parseInt(watch('cantidad_est')) + group.cantidad_est);
    }
    return new String();
  };

  const removeAssociatesSelected = (associate, _users = users) => {
    const associatesFiltered = watch('asociados')?.filter((obj) => obj !== associate.id_usuario);
    setValue('asociados', associatesFiltered);
    searchGroupsByApplicant(_users);
    console.log(associate, _users, associatesFiltered);
  };

  const addAssociatesSelected = (newValue, _users = users) => {
    const associate = _users.find((user) => user.id_usuario === parseInt(newValue));
    console.log(associate, !watch('asociados').includes(associate.id_usuario));
    if (associate && !watch('asociados').includes(associate.id_usuario)) {
      addedAssociatesRef.current?.addAlert(
        alerts[watch('asociados').length % 8],
        associate.nombre_usuario,
        () => removeAssociatesSelected(associate, _users),
      );
      setValue('asociados', [...watch('asociados'), associate.id_usuario]);
    }
    searchGroupsByApplicant();
    return new String();
  };

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-8">
          <Form
            title="Formulario de reserva"
            className="needs-validation"
            onSubmit={handleSubmit(onSubmit)}
            onClickCancel={() => {
              confirmationModal({
                body: (
                  <>
                    <Icon
                      className="iconAlert"
                      icon="charm:circle-cross"
                      style={{ color: '#FF3B20', height: '90px', width: '90px' }}
                    />
                    <div className="pt-md-3">
                      ¿Estás seguro que desea <br /> cancelar el registro de <br /> reserva?
                    </div>
                  </>
                ),
                onClickYesTo: `/ambientes/calendario/${formData.ambiente.id_ambiente}`,
              });
            }}
          >
            {user.tipo_usuario === 'ADMINISTRADOR' && <TextInput
              autoComplete="off"
              label="Nombre del solicitante"
              {...register('solicitante')}
              placeholder="Ingrese el nombre del solicitante"
              datalist={datalistSolicitante}
              handleChange={handleSolicitante}
              afterChange={() => {
                searchGroupsByApplicant();
                setAddAssociates(false);
              }}
              error={errors.solicitante?.message}
            />}

            <div className="row row-cols6">
              <div className="col-md-4">
                <TextInput disabled label='Ambiente' {...register('nombreAmbiente')} />
              </div>

              <div className="col-md-4">
                <TextInput disabled label='Fecha de reserva' {...register('fecha_reserva')} />
              </div>
              <div className="col-md-4">
                <TextInput disabled label='Periodo'{...register('periodo')} />
              </div>
            </div>

            {!isAdmin && (
              <>
                <CheckboxInput
                  label="Agregar asociados"
                  checked={addAssociates && watch('solicitante').length > 0}
                  disabled={watch('solicitante').length < 1}
                  handleChange={() => setAddAssociates((prev) => !prev)}
                />

                {addAssociates && (
                  <>
                    <Select
                      label="Nombre de asociado"
                      name="asociados"
                      placeholder="Seleccionar un asociado"
                      options={users
                        .filter((user) => associatesIds.includes(user.id_usuario)
                          && !watch('asociados').includes(user.id_usuario))
                        .map((user) => ({
                          value: user.id_usuario,
                          title: user.nombre_usuario,
                        }))}
                      handleChange={addAssociatesSelected}
                      error={watch('asociados').length < 1 && errors.asociados?.message}
                    />

                    <div
                      className="input-component"
                      style={{ display: watch('asociados').length > 0 ? 'block' : 'none' }}
                    >
                      <label className="form-label fw-bold">Lista de asociados añadidos</label>
                      <AlertContainer ref={addedAssociatesRef} />
                    </div>
                  </>
                )}

                <Select
                  label={
                    <>
                      Materias y grupos <span className="text-danger ms-1">*</span>
                    </>
                  }
                  name="listaGrupos"
                  placeholder="Seleccionar materias y grupos"
                  options={grupos
                    .filter((group) => !watch('listaGrupos')?.includes(group.id_aux_grupo))
                    .map((group) => ({
                      value: group.id_aux_grupo,
                      title: `${group.nombre_materia} - ${group.nombre_grupo}`,
                    }))}
                  handleChange={addGropsSelected}
                  afterChange={() => { clearErrors('listaGrupos') }}
                  error={errors.listaGrupos?.message}
                />

                <div
                  className="input-component"
                  style={{ display: watch('listaGrupos').length > 0 ? 'block' : 'none' }}
                >
                  <label className="form-label fw-bold">Lista de materias y grupos añadidos</label>
                  <AlertContainer ref={addedGroupsRef} />
                </div>
              </>
            )}

            <div className="row row-cols6">
              <div className="col-md-9">
                <TextTarea
                  label="Motivos de reserva"
                  {...register('motivo')}
                  placeholder="Escriba el motivo de la reserva"
                  maxLength={201}
                  error={errors.motivo?.message}
                />
              </div>
              <div className="col-md-3">
                <NumberInput
                  label="Número de Estudiantes"
                  {...register('cantidad_est')}
                  disabled={user.tipo_usuario !== 'ADMINISTRADOR' || watch('listaGrupos').length < 1}
                  error={watch('cantidad_est') < 20 && errors.cantidad_est?.message}
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistroReservaPage;
