import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AmbientesDisponibles = () => {
  // estados
  const location = useLocation();
  const formData = location.state;
  console.log(formData);
  const [ambientes, setAmbientes] = useState([]);

  // logica | api
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
        <table className="table table-striped border border-1">
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
            {ambientes.map((ambiente, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{ambiente.id_ambiente}</td>
                  <td>{ambiente.nombre_ambiente}</td>
                  <td>{ambiente.capacidad}</td>
                  <td>{ambiente.disponible ? 'Si' : 'No'}</td>
                  <td>{ambiente.tipo}</td>
                  <td>{ambiente.proyector ? 'Si' : 'No'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
export default AmbientesDisponibles;
