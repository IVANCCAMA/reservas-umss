import { useEffect, useState } from 'react';
import './ListadoMateriasPage.scss';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks.js';
import Filter from '../../../components/Filter/Filter';

const ListadoMateriasPage = () => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  // estados
  const [pageNumber, setPageNumber] = useState(1);
  const [materias, setMaterias] = useState([{}]);
  const [filteredMaterias, setFilteredMaterias] = useState([]);

  // redux
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.usuario);

  // >>> FUTURO : FILTROS <<<
  // obtener valores de un key
  // const materiasKey = materias.map(mat => mat.Nivel);
  // filtro para obtener solo los valores únicos
  // const keyUnicos = [...new Set(materiasKey)];

  // grupos/tablamaterias/:id_usuario

  const loadMaterias = () => {
    let apiUsuario = '/grupos/tablamaterias/1';
    if (user.tipo_usuario !== 'ADMINISTRADOR') {
      apiUsuario = `/grupos/tablamaterias/${user.id_usuario}`;
    }

    axios
      .get(`${baseURL}${apiUsuario}`)
      .then((response) => {
        /* setMaterias( */
        const mappedMaterias = response.data.map((mat) => {
          return {
            Materia: mat.nombre_materia,
            Nivel: mat.nivel_materia,
            Grupo: mat.nombre_grupo,
            Inscritos: mat.cantidad_est,
            Docentes: mat.docente,
          };
        });
        /* ); */
        setMaterias(mappedMaterias);
        setFilteredMaterias(mappedMaterias);
      })
      .catch((error) => {
        console.error('Error al obtener las materias:', error);
      });
  };

  useEffect(() => {
    loadMaterias();
  }, []);

  const handleFilter = (searchTerm) => {
    const filteredData = materias.filter((mat) => {
      return Object.values(mat).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
    setFilteredMaterias(filteredData);
  };

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Materias registradas</h2>
      <Filter onFilter={handleFilter} />

      {/* Se puede parametrizar la cantidad de filas mostradas por hojas */}
      <Table rows={filteredMaterias} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.max(Math.floor((filteredMaterias.length - 1) / 10) + 1, 1)}
      />
    </div>
  );
};

export default ListadoMateriasPage;
