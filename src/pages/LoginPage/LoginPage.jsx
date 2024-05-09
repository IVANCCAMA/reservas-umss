import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from '../../assets/Images/logoReserBit.png';
import { decrement, increment } from '../../redux/features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const schema = yup.object({
    codSis: yup.string().required('Este campo es obligatorio'),
    contrasenia: yup.string().required('Este campo es obligatorio'),
  });

  const users = [
    {
      nombre: 'ADMINISTRADOR',
      codSis: '202020',
      contrasenia: '123',
      fotoPerfil:
        'https://lh3.googleusercontent.com/a-/ALV-UjWqoEOqlq_byPOxkF6mJJ5H9tzuRpkszGe5kwnsLwarcXTFcJc=s200-p',
    },
    {
      nombre: 'CARCA SALAZAR CERRUDO',
      codSis: '101010',
      contrasenia: '123',
      fotoPerfil:
        'https://lh3.googleusercontent.com/a-/ALV-UjWqoEOqlq_byPOxkF6mJJ5H9tzuRpkszGe5kwnsLwarcXTFcJc=s200-p',
    },
  ];
  const user = {
    idUser: 25,
    nombre: 'ADMINISTRADOR',
    codSis: '202020',
    contrasenia: '123',
    materias: [
      { idMateria: 1, nombreMateria: 'INTRO PROGRA', grupo: 'G1', cantEst: 50 },
      { idMateria: 1, nombreMateria: 'BASE DATOS', grupo: 'G1', cantEst: 50 },
      { idMateria: 1, nombreMateria: 'INTRO PROGRA', grupo: 'G1', cantEst: 50 },
    ],
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
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // busqueda de usuario
    } catch (error) {
      console.log(error);
    }
  };

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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

      {/* Contador */}
      <div>
        <div>
          <button aria-label="Increment value" onClick={() => dispatch(increment())}>
            Increment
          </button>
          <span>{count}</span>
          <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
