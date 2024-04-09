import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //obtiene el parametro de la url
import './FichaInformacionAmbientePage.scss';
import axios from 'axios';

// Cambiar EnvironmentInfo por FichaInformacionAmbientePage
const FichaInformacionAmbientePage = () => {
  const ambienteInitialState = {
    nombre_ambiente: '',
    tipo: '',
    capacidad: '',
    ubicacion: '',
    disponible: false,
    computadora: '',
    proyector: false,
    porcentaje_min: '',
    porcentaje_max: '',
    diponibilidadPorDia: [],
  };


  let { id_ambiente } = useParams();
  const [ambiente, setAmbiente] = useState(ambienteInitialState);
  const [disponibilidadPorDia, setDisponibilidadPorDia] = useState([]);

  const loadAmbiente = (id) => {
    axios
      .get('http://localhost:4000/api/disponibles/ambiente/' + id)
      .then((response) => {
        console.log('id_ambiente', id);
        setAmbiente(response.data);
        setDisponibilidadPorDia(response.data.disponibilidadPorDia); 
      })
      .catch((error) => {
        console.error('Error al obtener los datos del ambiente:', error);
      });
  };

  useEffect(() => {
    loadAmbiente(id_ambiente);
  }, [id_ambiente]);


  return (
    <div className="ficha-ambientes">
      {console.log('ambiente', ambiente)}
      {console.log('dias', disponibilidadPorDia)}
      <h2 className="text-center pb-3">{ambiente.nombre_ambiente}</h2>
      <div className="row">
        <p className="fw-bold col">Tipo de ambiente</p>
        <p className="col-7 text-secondary">{ambiente.tipo}</p>
      </div>
      <div className="row">
        <p className="fw-bold col">Capacidad de Estudiantes</p>
        <p className="col-7 text-secondary">{ambiente.capacidad}</p>
      </div>
      <div className="row">
        <p className="fw-bold col">Ubicación</p>
        <p className="col-7 text-secondary">{ambiente.ubicacion}</p>
      </div>

      <div className="border-top border-bottom">
        <h4 className="py-3">Equipamiento de Ambiente</h4>
        <div className="row">
          <p className="fw-bold col">N° Computadoras</p>
          <p className="col-7 text-secondary">{ambiente.computadora}</p>
        </div>

        <div className="row">
          <p className="fw-bold col">Proyector de video</p>
          <p className="col-7 text-secondary">{ambiente.proyector ? 'Sí' : 'No'}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Disponibilidad de ambiente</p>
          <p className="col-7 text-secondary">{ambiente.disponible ? 'Sí' : 'No'}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Porcentaje mínimo</p>
          <p className="col-7 text-secondary">{ambiente.porcentaje_min}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Porcentaje máximo</p>
          <p className="col-7 text-secondary">{ambiente.porcentaje_max}</p>
        </div>
      </div>

      <h4 className="py-3">Días y horarios disponibles</h4>

      { disponibilidadPorDia.map((diaDisponible, index) => {
          return (
            <div className="accordion" key={index}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseTwo${index}`}
                    aria-expanded="false"
                    aria-controls={`collapseTwo${index}`}
                  >
                    {diaDisponible.dia}
                  </button>
                </h2>
                <div
                  id={`collapseTwo${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`headingTwo${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {/* Mapear horarios accediendo a la propiedad  diaDisponible.periodos*/}
                    { diaDisponible.periodos.map((periodoDia, index) => {
                      return(
                        <div key={index} className='d-inline col-3 ' >
                          <div  className='d-inline col-3 px-4'>
                            {periodoDia.hora_inicio} - {periodoDia.hora_fin}
                            {/*No se tiene horarios disponibkes o no existen */}
                          </div>
                        </div>
                      )
                        
                    })}
                    
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className='py-4 align-items-end'>
          <a href="/ambientes/listaAmbientes" className="btn btn-primary active fw-bold px-4">Aceptar</a>
        </div>
    </div>
  );
};

export default FichaInformacionAmbientePage;
