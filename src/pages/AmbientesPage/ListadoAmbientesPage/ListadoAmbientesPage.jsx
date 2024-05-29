import { useEffect, useState } from 'react';
import './ListadoAmbientesPage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAppSelector } from '../../../redux/app/hooks';
import Filter from '../../../components/Filter/Filter';

const ListadoAmbientesPage = () => {
  // redux
  const user = useAppSelector((state) => state.auth.usuario);

  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  // estados
  const [pageNumber, setPageNumber] = useState(1);
  const [ambientes, setAmbientes] = useState([{}]);
  const [filteredAmbientes, setFilteredAmbientes] = useState([]);

  // logica | api
  const loadAmbientes = () => {
    axios
      .get(`${baseURL}/ambientes`)
      .then((response) => {
        const mappedAmbientes = response.data.map((amb) => {
          const rows = {
            Aula: amb.nombre_ambiente,
            Capacidad: amb.capacidad,
            Tipo: amb.tipo.toUpperCase(),
            Disponibilidad: amb.disponible ? 'HABILITADO' : 'DESHABILITADO',
            Proyector: amb.proyector ? 'SI' : 'NO',
          };

          const editar = (
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
          );

          const verMas = (
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
          );

          return user.tipo_usuario === 'ADMINISTRADOR'
            ? { ...rows, Editar: editar, 'Ver más': verMas }
            : { ...rows, 'Ver más': verMas };
        });

        setAmbientes(mappedAmbientes);
        setFilteredAmbientes(mappedAmbientes);
      })
      .catch((error) => {
        console.error('Error al obtener los ambientes:', error);
      });
  };

  // rederización inicial
  useEffect(() => {
    loadAmbientes();
  }, []);

  const handleFilter = (searchTerm) => {
    const filteredData = ambientes.filter((amb) => {
      return Object.values(amb).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
    setFilteredAmbientes(filteredData);
  };

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Lista de ambientes</h2>
      <Filter onFilter={handleFilter} />
      <Table rows={filteredAmbientes} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.max(Math.floor((filteredAmbientes.length - 1) / 10) + 1, 1)}
      />
    </div>
  );
};

export default ListadoAmbientesPage;
