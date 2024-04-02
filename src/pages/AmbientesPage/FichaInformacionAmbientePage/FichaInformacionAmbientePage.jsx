import { useEffect, useState } from "react";
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
          <h2 className="text-start">Lista de ambientes</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover border border-1">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Aula</th>
                  <th scope="col">Capacidad</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Proyector</th>
                </tr>
              </thead>
              <tbody>
                {console.log(ambientes)}
                {ambientes.map((ambiente, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{ambiente.id_ambiente}</td>
                      <td>{ambiente.nombre_ambiente}</td>
                      <td>{ambiente.capacidad}</td>
                      <td>{ambiente.disponible ? 'Habilitado' : 'Deshabilitado'}</td>
                      <td>{ambiente.tipo}</td>
                      <td>{ambiente.proyector ? 'Si' : 'No'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
        </div>
      );

};
export default FichaInformacionAmbiente;