import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModal, useNotification } from '../../../components/Bootstrap';
import Form, { TextInput, DateInput, CheckboxInput, TimeInput } from '../../../components/Form';
import { Icon } from '@iconify/react';

const RegistroAperturaPage = () => {
  const database = 'https://backendtis-production.up.railway.app/api';

  const { confirmationModal, successModal } = useModal();
  const { loadNotification, errorNotification } = useNotification();

  const schema = yup.object().shape({
    motivo: yup
      .string()
      .default('')
      .required('Ingrese el motivo de la apertura del sistema')
      .max(40, 'El motivo debe tener como máximo 40 caracteres'),
    userType: yup
      .array()
      .default([])
      .of(yup.string())
      .min(1, 'Seleccione al menos un tipo de usuario'),
    fechaInicio: yup
      .date()
      .default('')
      .typeError('Seleccione una fecha válida')
      .min(new Date(), 'Selecciona una fecha a futuro'),
    fechaFin: yup
      .date()
      .default('')
      .typeError('Seleccione una fecha válida')
      .min(yup.ref('fechaInicio'), 'Selecciona una fecha posterior a la fecha de inicio'),
    horaInicio: yup
      .string()
      .default('')
      .required('Seleccione una hora válida')
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Debe tener un formato de hora válido (HH:MM)'),
    horaFin: yup
      .string()
      .default('')
      .required('Seleccione una hora válida')
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Debe tener un formato de hora válido (HH:MM)')
      .test('es-mayor', 'Seleccione una hora posterior a la hora de inicio', function (value) {
        const primerString = this.parent.horaInicio;
        return value > primerString;
      }),
    reservaInicio: yup
      .date()
      .default('')
      .typeError('Seleccione una fecha válida')
      .min(new Date(), 'Selecciona una fecha a futuro'),
    reservaFin: yup
      .date()
      .default('')
      .typeError('Seleccione una fecha válida')
      .min(yup.ref('reservaInicio'), 'Selecciona una fecha posterior a la fecha de inicio'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.describe().default,
  });

  const onSubmit = (data) => {
    console.log(data);

    loadNotification({
      body: 'Enviando formulario',
      onTimeout: () => {
        axios
          .post(`${database}/aperturas`, {
            motivo: data.motivo,
            apertura_inicio: data.fechaInicio.toISOString().split('T')[0],
            apertura_fin: data.fechaFin.toISOString().split('T')[0],
            apertura_hora_inicio: `${data.horaInicio}:00`,
            apertura_hora_fin: `${data.horaFin}:00`,
            reserva_inicio: data.reservaInicio.toISOString().split('T')[0],
            reserva_fin: data.reservaFin.toISOString().split('T')[0],
            esDocente: data.userType.includes('DOCENTE'),
            esAuxiliar: data.userType.includes('AUXILIAR'),
          })
          .then((response) => {
            console.log(response);

            successModal({
              body: (
                <>
                  <Icon
                    icon="fa-regular:check-circle"
                    style={{ color: '#0fa958', height: '90px', width: '90px' }}
                  />
                  <div className="pt-md-3">Apertura registrada con éxito</div>
                </>
              ),
              onClickTo: '/aperturas/listaAperturas',
            });
          })
          .catch((error) => {
            console.error('Error al obtener los ambiente disponibles: ', error);
            errorNotification({ body: 'Error al enviar, intente de nuevo' });
          });
      },
    });
  };

  return (
    <>
      <Form
        title="Apertura del sistema"
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
                  ¿Estás seguro que desea <br /> cancelar el registro de <br /> apertura?
                </div>
              </>
            ),
            onClickYesTo: '/',
          });
        }}
      >
        <TextInput
          autoComplete="off"
          label={
            <>
              Motivo de apertura <span className="text-danger ms-1">*</span>
            </>
          }
          {...register('motivo')}
          placeholder="Escriba el motivo de apertura"
          error={errors.motivo?.message}
          handleChange={(newValue) => newValue.toUpperCase()}
        />

        <div className="input-component d-flex">
          <label className="form-label fw-bold col-md-6 mb-0">
            Tipo de usuario <span className="text-danger ms-1">*</span>
          </label>

          <div className="d-flex col-md-6">
            <div className="col-md-6 d-flex justify-content-center  align-content-center">
              <CheckboxInput label="Docente" value={'DOCENTE'} {...register('userType')} />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <CheckboxInput label="Auxiliar" value={'AUXILIAR'} {...register('userType')} />
            </div>
          </div>
        </div>
        {errors.userType ? <span className="text-danger">{errors.userType.message}</span> : <></>}

        <h5 className="fw-bold">Periodo de apertura del sistema</h5>

        <div className="row row-cols6">
          <div className="col-md-6">
            <DateInput
              label={
                <>
                  Fecha de inicio <span className="text-danger ms-1">*</span>
                </>
              }
              {...register('fechaInicio')}
              error={errors.fechaInicio?.message}
              afterChange={() => {
                clearErrors('fechaFin');
              }}
            />
          </div>
          <div className="col-md-6">
            <DateInput
              label={
                <>
                  Fecha fin <span className="text-danger ms-1">*</span>
                </>
              }
              {...register('fechaFin')}
              error={errors.fechaFin?.message}
            />
          </div>
        </div>

        <div className="row row-cols6">
          <div className="col-md-6">
            <TimeInput
              label={
                <>
                  Hora de inicio <span className="text-danger ms-1">*</span>
                </>
              }
              {...register('horaInicio')}
              error={errors.horaInicio?.message}
              afterChange={() => {
                clearErrors('horaFin');
              }}
            />
          </div>
          <div className="col-md-6">
            <TimeInput
              label={
                <>
                  Hora fin <span className="text-danger ms-1">*</span>
                </>
              }
              {...register('horaFin')}
              error={errors.horaFin?.message}
            />
          </div>
        </div>

        <h5 className="fw-bold">Periodo de reservas</h5>

        <div className="row row-cols6">
          <div className="col-md-6">
            <DateInput
              label={
                <>
                  Fecha de inicio <span className="text-danger ms-1">*</span>
                </>
              }
              {...register('reservaInicio')}
              error={errors.reservaInicio?.message}
              afterChange={() => {
                clearErrors('reservaFin');
              }}
            />
          </div>
          <div className="col-md-6">
            <DateInput
              label={
                <>
                  Fecha fin <span className="text-danger ms-1">*</span>
                </>
              }
              {...register('reservaFin')}
              error={errors.reservaFin?.message}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default RegistroAperturaPage;
