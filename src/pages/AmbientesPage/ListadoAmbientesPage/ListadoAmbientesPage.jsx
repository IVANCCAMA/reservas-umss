import { useEffect, useState } from 'react';
import './ListadoAmbientesPage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { Icon } from '@iconify/react/dist/iconify.js';

const ListadoAmbientesPage = () => {
  // estados
  const [pageNumber, setPageNumber] = useState(1);
  const [ambientes, setAmbientes] = useState([{}]);

  // logica | api
  const loadAmbientes = () => {
    axios
      .get('http://localhost:4000/api/ambientes')
      .then((response) => {
        setAmbientes(
          response.data.map((amb) => {
            return {
              Id: amb.id_ambiente,
              Aula: amb.nombre_ambiente,
              Capacidad: amb.capacidad,
              Estado: amb.disponible ? 'Habilitado' : 'Deshabilitado',
              Tipo: amb.tipo,
              Proyector: amb.proyector ? 'Si' : 'No',
              'Ver más': (
                <Link
                  to={'/ambientes/listaAmbientes/fichaAmbiente/' + amb.id_ambiente}
                  className="btn btn-primary"
                >
                  <Icon
                    icon="arrow-right-circle"
                    width="50"
                    height="50"
                    style={{ color: '#215f88' }}
                  />
                  Ver
                </Link>
              ),
            };
          }),
        );
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
              <th scope="col">Ver más</th>
            </tr>
          </thead>
          <tbody>
            {console.log(ambientes)}
            {ambientes.map((ambiente, index) => {
              return (
                <tr key={index} >
                  <th scope="row">{index + 1}</th>
                  <td>{ambiente.id_ambiente}</td>
                  <td>{ambiente.nombre_ambiente}</td>
                  <td>{ambiente.capacidad}</td>
                  <td>{ambiente.disponible ? 'Habilitado' : 'Deshabilitado'}</td>
                  <td>{ambiente.tipo}</td>
                  <td>{ambiente.proyector ? 'Si' : 'No'}</td>
                  <td>
                    <Link className='btn btn-primary' to={"/ambientes/listaAmbientes/fichaAmbiente/"+ambiente.id_ambiente} >
                      <Icon icon='arrow-right-circle' width="50" height="50" style={{color: '#215f88'}}/>
                      Ver
                    </Link>
                  </td>
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
      return (
        <div className="container-fluid listado-ambientes p-md-5">
          <h2 className="text-start">Lista de ambientes</h2>
          <Table rows={ambientes} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            lastPage={Math.floor(ambientes.length / 10) + 1}
          />
        </div>
      );
    </div>
  )
};
export default ListadoAmbientesPage;
