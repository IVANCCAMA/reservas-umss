import { useEffect, useState } from 'react';
import './ListadoAmbientesPage.scss';
import axios from 'axios';

const ListadoAmbientesPage = () => {
  // estados
  const [ambientes, setAmbientes] = useState([]);

  // variables
  /*const ambientes = [
{
id: 1,
Aula: 'Laboratorio 1',
Capacidad: 120,
Estado: 'Deshabilitado',
Tipo: 'Laboratorio',
Proyector: 'Sí',
},
{
id: 2,
Aula: '690 B',
Capacidad: 140,
Estado: 'Habilitado',
Tipo: 'Aula',
Proyector: 'Sí',
},
 
]; */

  // logica | api
  const loadAmbientes = () => {
    // Realizar la solicitud a la API
    axios
      .get('http://localhost:4000/api/ambientes')
      .then((response) => {
        // Establecer los datos en el estado
        console.log(response.data);
        setAmbientes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los ambientes:', error);
      });
    //api
  };

  useEffect(() => {
    loadAmbientes();
  }, []);



  return (
    <div className="container listado-ambientes p-5">
      <h2 className='text-start'>Lista de ambientes</h2>

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
                <th scope="row">{index+1}</th>
                <td>{ambiente.id_ambiente}</td>
                <td>{ambiente.nombre_ambiente}</td>
                <td>{ambiente.capacidad}</td>
                <td>{ambiente.disponible?'Habilitado':'Deshabilitado'}</td>
                <td>{ambiente.tipo}</td>
                <td>{ambiente.proyector?'Si':'No'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Botones de paginación */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a className="page-link" href="#">
              Anterior
            </a>
          </li>
          <li className="page-item">
            <a className="page-link active" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Siguiente
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default ListadoAmbientesPage;
