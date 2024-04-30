import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from '../../assets/Images/logoReserBit.png';

const LoginPage = () => {
  const schema = yup.object({
    codSis: yup.string().required('Este campo es obligatorio'),
    contrasenia: yup.string().required('Este campo es obligatorio'),
  });

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
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="container login">
      <div className="row justify-content-center align-items-center py-md-5">
        <div className="col-md-5">
          <div className="text-center pb-md-2">
            <img className="img-fluid object-fit-cover" src={logo} alt="logo" />
          </div>
          <div className="p-md-4 bg-login border border-2 rounded-3">
            <p className="fw-bold text-center fs-4">Inicio de sesión</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="input-component">
                <label className="form-label">Código SIS</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escribe tu código sis"
                  {...register('codSis')}
                />
                {errors.codSis && <span className="text-danger">{errors.codSis.message}</span>}
              </div>
              <div className="input-component">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Escribe tu contraseña"
                  {...register('contrasenia')}
                />
                {errors.contrasenia && (
                  <span className="text-danger">{errors.contrasenia.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary pt-md-2 w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Iniciar sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
