import React from 'react';
import { Link } from 'react-router-dom';
import patito from '../../assets/Images/patito.png';
import Reloj from '../../components/Reloj/Reloj';

export default function HomePage() {
  return (
    <div className="container-md">
      <div className="row justify-content-center">
        <h1 className="text-center p-md-3 fs-1" style={{ color: '#215f88' }}>
          ¡Bienvenido a Reserbit, nuestra plataforma de reserva de ambientes universitarios!
          <i className="bi bi-check-all"></i>
        </h1>
        <div className="col-md-5">
          <div className="text-center">
            <img className="img-fluid object-fit-cover" src={patito} alt="patito" width={'400px'} />
          </div>
        </div>
        <div className="col-md-7">
          {/* <Reloj /> */}
          <p>
            Simplificamos el proceso de reserva de espacios en tu campus para eventos, reuniones y
            actividades académicas. Con nuestra interfaz intuitiva, puedes encontrar y reservar
            fácilmente aulas, auditorios y laboratorios, ¡todo en un solo lugar!
          </p>
          <p>
            Encuentra y reserva salas de clases, auditorios y más en tu campus en segundos. ¡Haz que
            la gestión de espacios sea más simple que nunca!
          </p>
          <div className="text-center">
            <Link to={'/reservas/reservarAmbiente'} className="btn btn-info">
              Reservar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
