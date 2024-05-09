import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from '../../assets/Images/logoReserBit.png';
import { loginRequest } from '../../redux/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const schema = yup.object({
    codsiss: yup.string().required('Este campo es obligatorio'),
    contrasenia_usuario: yup.string().required('Este campo es obligatorio'),
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

  //hooks
  let navigate = useNavigate();
  //redux
  /* const isLoggedIn = useAppSelector((state) => state.auth.token); */
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  // effects
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      console.log('Logeado, navegando a inicio');
      navigate('/');
    }
    console.log('No logeado');
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    const user = {
      codsiss: data.codsiss,
      contrasenia_usuario: data.contrasenia_usuario,
    };
    console.log(user);
    try {
      dispatch(loginRequest(user));
      console.log('Estado', dispatch(loginRequest(user)));
    } catch (error) {
      console.log('Error en inico de sesion', error);
    }
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
                  {...register('codsiss')}
                />
                {errors.codSis && <span className="text-danger">{errors.codSis.message}</span>}
              </div>
              <div className="input-component">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Escribe tu contraseña"
                  {...register('contrasenia_usuario')}
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
