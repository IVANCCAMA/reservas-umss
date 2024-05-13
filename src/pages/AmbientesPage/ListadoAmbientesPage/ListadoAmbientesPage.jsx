import { useEffect, useState } from 'react';
import './ListadoAmbientesPage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAppSelector } from '../../../redux/app/hooks';

const ListadoAmbientesPage = () => {
  // redux
  const user = useAppSelector((state) => state.auth.usuarios);

  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  // estados
  const [pageNumber, setPageNumber] = useState(1);
  const [ambientes, setAmbientes] = useState([{}]);

  // logica | api
  const loadAmbientes = () => {
    axios
      .get(`${baseURL}/ambientes`)
      .then((response) => {
        setAmbientes(
          response.data.map((amb) => {
            if (user.tipo_usuario === 'ADMINISTRADOR') {
              return {
                Aula: amb.nombre_ambiente,
                Capacidad: amb.capacidad,
                Disponibilidad: amb.disponible ? 'HABILITADO' : 'DESHABILITADO',
                Tipo: amb.tipo.toUpperCase(),
                Proyector: amb.proyector ? 'SI' : 'NO',
                Editar: (
                  <div className="boton-editar text-center me-md-3 rounded">
                    <Link
                      to={'/ambientes/listaAmbientes/editar/' + amb.id_ambiente}
                      className="btn border border-0"
                    >
                      <div>
                        <Icon icon="fa6-regular:pen-to-square" className="boton-icon" />
                      </div>
                    </Link>
                  </div>
                ),

                'Ver más': (
                  <div className="boton-style text-center me-md-3 rounded">
                    <Link
                      to={'/ambientes/listaAmbientes/fichaAmbiente/' + amb.id_ambiente}
                      className="btn border border-0"
                    >
                      <div>
                        <Icon icon="gg:arrow-right-r" className="boton-icon" />
                      </div>
                    </Link>
                  </div>
                ),
              };
            } else {
              return {
                Aula: amb.nombre_ambiente,
                Capacidad: amb.capacidad,
                Disponibilidad: amb.disponible ? 'HABILITADO' : 'DESHABILITADO',
                Tipo: amb.tipo.toUpperCase(),
                Proyector: amb.proyector ? 'SI' : 'NO',
                'Ver más': (
                  <div className="boton-style text-center me-md-3 rounded">
                    <Link
                      to={'/ambientes/listaAmbientes/fichaAmbiente/' + amb.id_ambiente}
                      className="btn border border-0"
                    >
                      <div>
                        <Icon icon="gg:arrow-right-r" className="boton-icon" />
                      </div>
                    </Link>
                  </div>
                ),
              };
            }
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
        lastPage={Math.max(Math.floor((ambientes.length - 1) / 10) + 1, 1)}
      />
    </div>
  );
};
export default ListadoAmbientesPage;
