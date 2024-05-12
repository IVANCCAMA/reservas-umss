import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from '../../assets/Images/logoReserBit.png';
import { loginRequest } from '../../redux/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import iconoError from '../../assets/Images/iconoError.png';

const LoginPage = () => {
  const [authError, setAuthError] = useState(false);

  const schema = yup.object({
    codsiss: yup.string().required('Este campo es obligatorio'),
    contrasenia_usuario: yup.string().required('Este campo es obligatorio'),
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //hooks
  let navigate = useNavigate();
  //redux
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  // effects
  useEffect(() => {
    if (isLoggedIn) {
      console.log('Logeado, navegando a inicio');
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data) => {
    const user = {
      codsiss: data.codsiss,
      contrasenia_usuario: data.contrasenia_usuario,
    };
    await dispatch(loginRequest(user))
      .unwrap()
      .then((response) => {
        setAuthError(true);
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
        setAuthError(true);
      });
  };

  return (
    <div className="container login">
      {!isLoggedIn && (
        <div
          className={`row justify-content-center align-items-center ${
            authError ? 'py-md-3' : 'py-md-5'
          }`}
        >
          <div className="col-lg-5">
            {authError && (
              <div
                className="alert alert-danger p-2 d-flex align-items-center alert-dismissible fade show"
                role="alert"
              >
                <img
                  className="me-md-2 h-auto"
                  src={iconoError}
                  alt="icono de error"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
                <div className="h-auto">Codigo SIS o contraseña invalido</div>
                <button
                  type="button"
                  className="btn-close h-auto"
                  aria-label="Close"
                  onClick={() => {
                    setAuthError(false);
                  }}
                ></button>
              </div>
            )}
            <div className="text-center pb-md-2">
              <img className="img-fluid object-fit-cover" src={logo} alt="logo" />
            </div>
            <div className="p-md-4 bg-login border border-2 rounded-3">
              <p className="fw-bold text-center fs-4">Inicio de sesión</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-component">
                  <label className="form-label">
                    Código SIS<span className="text-danger ms-1 fw-bold">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="username"
                    placeholder="Escribe tu código sis"
                    {...register('codsiss')}
                  />
                  {errors.codsiss && <span className="text-danger">{errors.codsiss.message}</span>}
                </div>
                <div className="input-component">
                  <label className="form-label">
                    Contraseña<span className="text-danger ms-1 fw-bold">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="current-password"
                    placeholder="Escribe tu contraseña"
                    {...register('contrasenia_usuario')}
                  />
                  {errors.contrasenia_usuario && (
                    <span className="text-danger">{errors.contrasenia_usuario.message}</span>
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
      )}
    </div>
  );
};

export default LoginPage;
