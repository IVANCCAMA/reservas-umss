import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FichaInformacionAmbientePage.scss';
import axios from 'axios';

const FichaInformacionAmbientePage = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;

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
      .get(`${baseURL}/disponibles/ambiente/` + id)
      .then((response) => {
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
    <div className="container ficha-ambientes">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-9">
          <h2 className="text-center pb-3">AMBIENTE {ambiente.nombre_ambiente}</h2>
          <div className="row">
            <p className="col">Tipo de ambiente</p>
            <p className="col-6 text-secondary">{ambiente.tipo.toUpperCase()}</p>
          </div>
          <div className="row">
            <p className="col">Capacidad de estudiantes</p>
            <p className="col-6 text-secondary">{ambiente.capacidad}</p>
          </div>
          <div className="row">
            <p className="col">Capacidad máxima</p>
            <p className="col-6 text-secondary">{ambiente.capacidad_max}</p>
          </div>
          <div className="row">
            <p className="col">Capacidad mínima </p>
            <p className="col-6 text-secondary">{ambiente.capacidad_min}</p>
          </div>
          <div className="row">
            <p className="col">Ubicación</p>
            <p className="col-6 text-secondary">{ambiente.ubicacion}</p>
          </div>

          <div className="border-top border-bottom">
            <h4 className="py-3">Equipamiento de ambiente</h4>
            <div className="row">
              <p className="col">N° Computadoras</p>
              <p className="col-6 text-secondary">{ambiente.computadora}</p>
            </div>

            <div className="row">
              <p className="col">Proyector de video</p>
              <p className="col-6 text-secondary">{ambiente.proyector ? 'Sí' : 'No'}</p>
            </div>
            <div className="row">
              <p className="col">Disponibilidad de ambiente</p>
              <p className="col-6 text-secondary">{ambiente.disponible ? 'Sí' : 'No'}</p>
            </div>
            <div className="row">
              <p className="col">Porcentaje mínimo (%)</p>
              <p className="col-6 text-secondary">{ambiente.porcentaje_min}</p>
            </div>
            <div className="row">
              <p className="col">Porcentaje máximo (%)</p>
              <p className="col-6 text-secondary">{ambiente.porcentaje_max}</p>
            </div>
          </div>

          <h4 className="py-3">Días y horarios disponibles</h4>

          {disponibilidadPorDia.map((diaDisponible, index) => {
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
                      {diaDisponible.periodos.map((periodoDia, index) => {
                        return (
                          <div key={index} className="row d-inline-flex px-xxl-4 px-sm-2">
                            <p className="col ms-xxl-3 ms-sm-2">
                              {periodoDia.hora_inicio} - {periodoDia.hora_fin}
                            </p>
                            {/*No se tiene horarios disponibles o no existen*/}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="py-4 d-flex flex-row-reverse">
            <a href="/ambientes/listaAmbientes" className="btn active px-4" id="boton-style">
              Aceptar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaInformacionAmbientePage;
