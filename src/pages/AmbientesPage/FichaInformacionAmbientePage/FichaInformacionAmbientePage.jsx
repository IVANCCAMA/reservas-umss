import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FichaInformacionAmbientePage.scss';
import axios from 'axios';

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
      <h2 className="text-center pb-3">Ambiente {ambiente.nombre_ambiente}</h2>
      <div className="row">
        <p className="fw-bold col">Tipo de ambiente</p>
        <p className="col-6 text-secondary">{ambiente.tipo}</p>
      </div>
      <div className="row">
        <p className="fw-bold col">Capacidad de Estudiantes</p>
        <p className="col-6 text-secondary">{ambiente.capacidad}</p>
      </div>
      <div className="row">
        <p className="fw-bold col">Ubicación</p>
        <p className="col-6 text-secondary">{ambiente.ubicacion}</p>
      </div>

      <div className="border-top border-bottom">
        <h4 className="py-3">Equipamiento de Ambiente</h4>
        <div className="row">
          <p className="fw-bold col">N° Computadoras</p>
          <p className="col-6 text-secondary">{ambiente.computadora}</p>
        </div>

        <div className="row">
          <p className="fw-bold col">Proyector de video</p>
          <p className="col-6 text-secondary">{ambiente.proyector ? 'Sí' : 'No'}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Disponibilidad de ambiente</p>
          <p className="col-6 text-secondary">{ambiente.disponible ? 'Sí' : 'No'}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Porcentaje mínimo</p>
          <p className="col-6 text-secondary">{ambiente.porcentaje_min}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Porcentaje máximo</p>
          <p className="col-6 text-secondary">{ambiente.porcentaje_max}</p>
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
                    { diaDisponible.periodos.map((periodoDia, index) => {
                      return(
                        <div key={index} className='row d-inline-flex px-xxl-4 px-sm-2' >
                          <p className='col ms-xxl-3 ms-sm-2'>
                            {periodoDia.hora_inicio} - {periodoDia.hora_fin}
                          </p>
                            {/*No se tiene horarios disponibles o no existen*/ } 
                        </div>
                      )
                        
                    })}
                    
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className='py-4 d-flex flex-row-reverse'>
          <a href="/ambientes/listaAmbientes" className="btn active px-4" id='boton-style'>Aceptar</a>
        </div>
    </div>
  );
};

export default FichaInformacionAmbientePage;
