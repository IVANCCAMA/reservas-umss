/*import { useEffect, useState } from "react";
//import 'FichaInformacionAmbientePage.scss';
import axios from "axios";

const FichaInformacionAmbiente = () => {
    //estados
    const[ambientes, setAmbientes] = useState([]);

    //logica | api
    const loadAmbientes = () => {
        // Realizar la solicitud a la API
        axios
          .get('http://localhost:4000/api/ambientes')
          .then((response) => {
            // Establecer los datos en el estado
            setAmbientes(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los ambientes:', error);
          });
      };
    
      // rederización inicial
      useEffect(() => {
        loadAmbientes();
      }, []);

      return (
        <div className="container-fluid listado-ambientes p-md-5">
          {console.log(ambientes)}
            return(
              <h2 className="text-start">Nombre de Ambiente</h2>
              <div>

              </div>
            );

          <div className="">
            <div>
              <h3>Tipo de ambiente</h3>

            </div>
              
          </div>
            
        </div>
  
      );

};
export default FichaInformacionAmbiente;*/


// Define the environment data structure

//import { useEffect, useState } from "react";
import './FichaInformacionAmbientePage.scss';
//import axios from "axios";
const environmentData = {
  nombre: "Ambiente Λ",
  tipo: "Laboratorio",
  capacity: 50,
  location: "Departamento de Informática - Sistemas",
  equipment: {
    computers: 50,
    videoProjector: true,
  },
  availability: {
    day: "Lunes",
    slots: [
      { start: "06:45", end: "08:15" },
      { start: "12:45", end: "14:15" },
      { start: "08:15", end: "09:45" },
      { start: "09:45", end: "11:15" },
      { start: "14:15", end: "15:45" },
      { start: "15:45", end: "17:15" },
      { start: "11:15", end: "12:45" },
      { start: "17:15", end: "18:45" },
    ],
  },
};

// Define the EnvironmentInfo component
const EnvironmentInfo = () => {
  const {
    nombre,
    tipo,
    capacity,
    location,
    equipment,
    availability: { day, slots },
  } = environmentData;

  return (
    <div className="ficha-ambientes">
      <h2 className='text-center'>{nombre}</h2>
      <div className='row'>
        <p className='fw-bold col'>Tipo de ambiente</p>
        <p className='col-7'>{tipo}</p>
      </div>
      <div className='row'>
        <p className='fw-bold col'>Capacidad de Estudiantes</p>
        <p className='col-7'>{capacity}</p>
      </div>
      <div className='row'>
        <p className='fw-bold col'>Ubicación</p>
        <p className='col-7'>{location}</p>
      </div>
  
      <div className='border-top border-bottom'>
        <h4 className='py-3'>Equipamiento de Ambiente</h4>
        <div className='row'>
          <p className='fw-bold col'>N° Computadoras</p>
          <p className='col-7'>{equipment.computers}</p>
        </div>
        
        <div className='row'>
            <p className='fw-bold col'>Proyector de video</p>
            <p className='col-7'>{equipment.videoProjector ? "Yes" : "No"}</p>
        </div>
        <div className='row'>
            <p className='fw-bold col'>Disponibilidad de ambiente</p>
            <p className='col-7'>{equipment.videoProjector ? "Yes" : "No"}</p>
        </div>
      </div>
      

      <h4 className='py-3'>Días y horarios disponibles</h4>
      <p>
        Day: <strong>{day}</strong>
      </p>
      <p>
        Slots: {slots.map((slot, index) => (
          <span key={index}>
            {slot.start} - {slot.end}
            {index < slots.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      
    </div>
  );
};


export default EnvironmentInfo;