import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //obtiene el parametro de la url
import './FichaInformacionAmbientePage.scss';
import axios from 'axios';

const EnvironmentInfo = () => {
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
        setAmbiente(response.data.ambiente);
        setDisponibilidadPorDia(response.data.disponibilidadPorDia);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del ambiente:', error);
      });
  };

  useEffect(() => {
    loadAmbiente(id_ambiente);
  }, [id_ambiente]);

  //if (!ambiente) {
  //return <div>Cargando...</div>;
  //}

  /* const ambiente = {
    nombre:"nombre ambiente",
    tipo: "laboratorio",
    capacity: 50,
    location: "Laboratorio INF-SIS",
    computers: 50,
    videoProjector: "Sí",
    disponibilidad: "Sí"
    
  }  */

  return (
    <div className="ficha-ambientes">
      {console.log('ambiente', ambiente)}
      {console.log('dias', disponibilidadPorDia)}
      <h2 className="text-center">{ambiente.nombre_ambiente}</h2>
      <div className="row">
        <p className="fw-bold col">Tipo de ambiente</p>
        <p className="col-7">{ambiente.tipo}</p>
      </div>
      <div className="row">
        <p className="fw-bold col">Capacidad de Estudiantes</p>
        <p className="col-7">{ambiente.capacidad}</p>
      </div>
      <div className="row">
        <p className="fw-bold col">Ubicación</p>
        <p className="col-7">{ambiente.ubicacion}</p>
      </div>

      <div className="border-top border-bottom">
        <h4 className="py-3">Equipamiento de Ambiente</h4>
        <div className="row">
          <p className="fw-bold col">N° Computadoras</p>
          <p className="col-7">{ambiente.computadora}</p>
        </div>

        <div className="row">
          <p className="fw-bold col">Proyector de video</p>
          <p className="col-7">{ambiente.proyector ? 'Sí' : 'No'}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Disponibilidad de ambiente</p>
          <p className="col-7">{ambiente.disponible ? 'Sí' : 'No'}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Min</p>
          <p className="col-7">{ambiente.porcentaje_min}</p>
        </div>
        <div className="row">
          <p className="fw-bold col">Max</p>
          <p className="col-7">{ambiente.porcentaje_max}</p>
        </div>
      </div>

      <h4 className="py-3">Días y horarios disponibles</h4>
      {/* /const dias = [`Lunes`, `Martes`, `Miércoles`, `Jueves`, `Viernes`, `Sábado`]; */}

      {/* {disponibilidadPorDia && disponibilidadPorDia.map((dia, index) => {
        return (
          <div className="accordion" key={index}>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  {dia.lunes}
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis delectus sunt
                    saepe itaque expedita, libero at inventore voluptate totam, modi, facilis autem
                    reiciendis officia quae nam odit dolor quas tenetur?
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default EnvironmentInfo;
