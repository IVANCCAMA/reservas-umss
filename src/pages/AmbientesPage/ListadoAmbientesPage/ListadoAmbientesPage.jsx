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
              ID: amb.id_ambiente,
              Aula: amb.nombre_ambiente,
              Capacidad: amb.capacidad,
              Estado: amb.disponible ? 'Habilitado' : 'Deshabilitado',
              Tipo: amb.tipo,
              Proyector: amb.proyector ? 'Si' : 'No',
              'Ver más': (
              <div className='boton-style w-75 '>
                <Link
                  to={'/ambientes/listaAmbientes/fichaAmbiente/' + amb.id_ambiente}
                  className="btn border border-0"
                >
                  <div className=''>
                  <Icon 
                    icon="gg:arrow-right-r"  className='boton-icon ms-xl-4 ms-lg-1 ms-md-0 ' />
                  </div>
                  
                </Link>
              </div> 
                
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
          <Table rows={ambientes} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            lastPage={Math.floor(ambientes.length / 10) + 1}
          />
        </div>
  )
};
export default ListadoAmbientesPage;
