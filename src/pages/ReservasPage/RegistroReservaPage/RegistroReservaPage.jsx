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

  const navigate = useNavigate();
  const location = useLocation();
  const { confirmationModal } = useModal();
  const { loadNotification, errorNotification, successNotification } = useNotification();
  // aux
  const [users, setUsers] = useState([]);
  const [datalistSolicitante, setDatalistSolicitante] = useState([]);
  const [isAdmin, setIsAdmin] = useState(user.tipo_usuario === 'ADMINISTRADOR');
  const [tiposAmbiente, setTiposAmbiente] = useState([]);
  const [addAssociates, setAddAssociates] = useState(false);
  const [associatesIds, setAssociatesIds] = useState([]);
  const addedAssociatesRef = useRef(null);
  const [grupos, setGrupos] = useState([]);
  const addedGroupsRef = useRef(null);
  const [periodos, setPeriodos] = useState([{}]);
  const [allCheckbox, setAllCheckBox] = useState(false);

  const schema = yup.object().shape({
    solicitante: yup
      .string()
      .default(user.tipo_usuario !== 'ADMINISTRADOR' ? user.nombre_usuario : '')
      .required('Ingrese un nombre de un usuario')
      .max(40, 'El nombre debe tener como máximo 40 caracteres'),
    tipo_ambiente: yup.string().default('').required('Seleccione una categoria'),
    asociados: yup
      .array()
      .default([])
      .of(yup.number())
      .max(3, 'Solo puedes agregar a 3 asociados como máximo'),
    listaGrupos: yup
      .array()
      .default([])
      .of(yup.number().positive().integer(), 'error type')
      .min(1, 'Seleccione al menos una materia'),
    cantidad_est: yup
      .number()
      .default(0)
      .typeError('Ingrese el número de estudiantes')
      .max(500, 'el número de estudiantes debe ser menor a 500')
      .min(20, 'El número de estudiantes debe ser mayor a 20')
      .integer('El número de estudiantes debe ser un número entero'),
    fecha_reserva: yup.string().default('').required('Seleccione una fecha valida'),
    motivo: yup.string().default('').max(200, 'El motivo debe tener como máximo 200 caracteres'),
    periodos: yup.array().default([]).of(yup.string()).min(1, 'Seleccione al menos un horario'),
    apertura: yup.object().shape({
      id: yup.number(),
      motivo: yup.string(),
      reservaIni: yup.date(),
      reservaFin: yup.date(),
      docente: yup.bool(),
      auxiliar: yup.bool(),
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
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
    // recuperar tipos de ambientes
    setTiposAmbiente([
      { title: 'Aula común', value: 'aula comun' },
      { title: 'Laboratorio', value: 'laboratorio' },
      { title: 'Auditorio', value: 'auditorio' },
    ]);
    // recuperar apertura
    axios
      .get(`${database}/aperturas/apertura-fecha`)
      .then(({ data }) => {
        const currentDateTime = new Date();
        setValue('apertura', {
          id: data[0].id_apertura,
          motivo: data[0].motivo,
          docente: data[0].docente,
          auxiliar: data[0].auxiliar,
          reservaIni:
            new Date(data[0].reserva_inicio) > currentDateTime
              ? new Date(data[0].reserva_inicio)
              : currentDateTime,
          reservaFin:
            new Date(data[0].reserva_fin) > currentDateTime
              ? new Date(data[0].reserva_fin)
              : currentDateTime,
        });
      })
      .catch((error) => {
        console.error('Error al obtener la apertura vigente:', error);
      });
    // recuperar periodos
    axios
      .get(`${database}/periodos`)
      .then((response) => setPeriodos(response.data))
      .catch((error) => {
        console.error('Error al obtener los periodos:', error);
      });

    setTimeout(() => {
      const formData = location.state;
      if (formData) {
        Object.keys(watch()).forEach((propiedad) => {
          setValue(propiedad, formData[propiedad]);
        });
        setGrupos(formData.setGrupos);
        resetList();
        formData.listaGrupos.forEach((groupId) => {
          addGropsSelected(groupId, formData.setGrupos);
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
            tipo_ambiente: data.tipo_ambiente,
            cantidad_est: data.cantidad_est,
            periodos: data.periodos.map((obj) => ({ id_periodo: parseInt(obj) })),
            fecha_reserva: data.fecha_reserva,
          })
          .then((response) => {
            if (Array.isArray(response.data) && response.data.length === 0) {
              errorNotification({ body: 'Error al enviar, intente de nuevo' });
            } else {
              successNotification({
                body: 'Enviado correctamente',
                afterTimeout: () =>
                  navigate('/reservas/ambientesDisponibles', {
                    state: {
                      ...data,
                      setGrupos: grupos,
                      ambienteDisp: response.data,
                    },
                  }),
              });
            }
          })
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
    return value;
  };
  // resuperar materias y grupos
  const searchGroupsByApplicant = () => {
    const foundUser = users.find((obj) => obj.nombre_usuario === watch('solicitante'));
    if (foundUser?.id_usuario) {
      console.log(foundUser);
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
          } else {
            resetList();
          }
        })
        .catch((error) => {
          resetList();
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
    setValue('cantidad_est', watch('cantidad_est') - group.cantidad_est);
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
      setValue('cantidad_est', watch('cantidad_est') + group.cantidad_est);
    }
    return new String();
  };

  const removeAssociatesSelected = (associate) => {
    const associatesFiltered = watch('asociados')?.filter((obj) => obj !== associate.id_usuario);
    setValue('asociados', associatesFiltered);
    searchGroupsByApplicant();
  };

  const addAssociatesSelected = (newValue) => {
    const associate = users.find((user) => user.id_usuario === parseInt(newValue));
    if (associate && !watch('asociados').includes(associate.id_usuario)) {
      addedAssociatesRef.current?.addAlert(
        alerts[watch('asociados').length % 8],
        associate.nombre_usuario,
        () => removeAssociatesSelected(associate),
      );
      setValue('asociados', [...watch('asociados'), associate.id_usuario]);
    }
    searchGroupsByApplicant();
    return new String();
  };

  const checkedAll = () => {
    setAllCheckBox((prev) => {
      if (prev) {
        setValue('periodos', []);
      } else {
        const isSaturday = new Date(watch('fecha_reserva')).getDay() === 5;
        setValue(
          'periodos',
          periodos
            .filter((periodo) => !isSaturday || periodo.id_periodo < 7)
            .map((periodo) => `${periodo.id_periodo}`),
        );
      }
      return !prev;
    });
  };

  const handlePeriodoChange = () => {
    const isSaturday = new Date(watch('fecha_reserva')).getDay() === 5;
    const periodosId = periodos
      .filter((periodo) => !isSaturday || periodo.id_periodo < 7)
      .map((periodo) => `${periodo.id_periodo}`);
    const _allCheckbox = periodosId.every((id) => watch('periodos').includes(id));
    setAllCheckBox(_allCheckbox);
  };

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-8">
          <Form
            title='Formulario de reserva'
            className='needs-validation'
            onSubmit={handleSubmit(onSubmit)}
            onClickCancel={() => {
              confirmationModal({
                body: (<>
                  <Icon className="iconAlert" icon="charm:circle-cross" style={{ color: '#FF3B20', height: '90px', width: '90px' }} />
                  <div className="pt-md-3">
                    ¿Estás seguro que desea <br /> cancelar el registro de <br /> reserva?
                  </div>
                </>),
                onClickYesTo: '/',
              });
            }}
          >
            <TextInput
              autoComplete='off'
              label='Nombre del solicitante'
              {...register('solicitante')}
              placeholder='Ingrese el nombre del solicitante'
              datalist={datalistSolicitante}
              handleChange={handleSolicitante}
              afterChange={() => {
                searchGroupsByApplicant();
                setAddAssociates(false);
              }}
              error={errors.solicitante?.message}
            />

            <Select
              label={<>Tipo de ambiente <span className="text-danger ms-1">*</span></>}
              {...register('tipo_ambiente')}
              placeholder='Seleccione el tipo de ambiente'
              options={tiposAmbiente}
              error={errors.tipo_ambiente?.message}
            />

            {!isAdmin && (<>
              <CheckboxInput
                label='Agregar asociados'
                checked={addAssociates && watch('solicitante').length > 0}
                disabled={watch('solicitante').length < 1}
                handleChange={() => setAddAssociates(prev => !prev)}
              />

              {addAssociates && (<>
                <Select
                  label='Nombre de asociado'
                  name='asociados'
                  placeholder='Seleccionar un usuario'
                  options={users.filter(user => associatesIds.includes(user.id_usuario)).map(user => ({
                    value: user.id_usuario,
                    title: user.nombre_usuario
                  }))}
                  handleChange={addAssociatesSelected}
                  error={watch('asociados').length < 1 && errors.asociados?.message}
                />

                <div className="input-component" style={{ display: watch('asociados').length > 0 ? 'block' : 'none' }}>
                  <label className="form-label fw-bold">Lista de asociados añadidos</label>
                  <AlertContainer ref={addedAssociatesRef} />
                </div>
              </>)}

              <Select
                label={<>Materias y grupos <span className="text-danger ms-1">*</span></>}
                name='listaGrupos'
                placeholder='Seleccionar materias y grupos'
                options={grupos.filter(group => !watch('listaGrupos')?.includes(group.id_aux_grupo)).map(group => ({
                  value: group.id_aux_grupo,
                  title: `${group.nombre_materia} - ${group.nombre_grupo}`
                }))}
                handleChange={addGropsSelected}
                error={watch('listaGrupos').length < 1 && errors.listaGrupos?.message}
              />

              <div className="input-component" style={{ display: watch('listaGrupos').length > 0 ? 'block' : 'none' }}>
                <label className="form-label fw-bold">Lista de materias y grupos añadidos</label>
                <AlertContainer ref={addedGroupsRef} />
              </div>
            </>)}

            <div className="row row-cols6">
              <div className="col-md-6">
                <NumberInput
                  label='Número de Estudiantes'
                  {...register('cantidad_est')}
                  disabled={!isAdmin}
                  error={watch('cantidad_est') < 20 && errors.cantidad_est?.message}
                />
              </div>
              <div className="col-md-6">
                <DateInput
                  label={<>Fecha de reserva <span className="text-danger ms-1">*</span></>}
                  {...register('fecha_reserva')}
                  minDate={watch('apertura').reservaIni?.toISOString()?.split('T')[0]}
                  maxDate={watch('apertura').reservaFin?.toISOString()?.split('T')[0]}
                  handleChange={(newValue) => {
                    setValue('periodos', []); setAllCheckBox(false);
                    return new Date(newValue)?.getDay() === 6 ? new String() : undefined;
                  }}
                  error={errors.fecha_reserva?.message}
                />
              </div>
            </div>

            <TextTarea
              label='Motivos de reserva'
              {...register('motivo')}
              placeholder='Escriba el motivo de la reserva'
              maxLength={201}
              error={errors.motivo?.message}
            />

            <div className='input-component'>
              <label className="form-label fw-bold">
                Periodos y horarios <span className="text-danger ms-1">*</span>
              </label>

              <Accordion id='periodos' accordionItems={[{
                title: 'Selecione periodo/s',
                body:
                  <div className="w-100">
                    <div className="d-flex justify-content-between pb-2">
                      <label>Periodos</label>
                      <CheckboxInput
                        checked={allCheckbox}
                        label='Selecionar todos'
                        handleChange={checkedAll}
                        disabled={!watch('fecha_reserva')}
                      />
                    </div>

                    <div className='row row-cols4'>
                      {periodos.map((periodo, index) => {
                        const fechaReserva = watch('fecha_reserva');
                        const selectedDay = fechaReserva && new Date(fechaReserva).getDay();
                        if (!fechaReserva || (selectedDay === 5 && periodo.id_periodo > 6)) return;
                        return (
                          <div key={`periodo-${index}`} className='col-md-4 d-flex justify-content-center'>
                            <CheckboxInput
                              label={`${periodo.hora_inicio?.slice(0, 5)} - ${periodo.hora_fin?.slice(0, 5)}`}
                              {...register('periodos')}
                              value={periodo.id_periodo}
                              afterChange={handlePeriodoChange}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
              }]} />
              {watch('periodos').length < 1 && errors.periodos && (<span className="text-danger">{errors.periodos.message}</span>)}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistroReservaPage;
