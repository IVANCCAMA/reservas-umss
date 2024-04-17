import { useEffect, useState } from 'react';
import './ListadoMateriasPage.scss';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';

const ListadoMateriasPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [materias, setMaterias] = useState([{}]);

  // >>> FUTURO : FILTROS <<<
  // obtener valores de un key
  // const materiasKey = materias.map(mat => mat.Nivel);
  // filtro para obtener solo los valores únicos
  // const keyUnicos = [...new Set(materiasKey)];

  const loadMaterias = () => {
    axios
      .get('http://localhost:4000/api/grupos/tablamaterias')
      .then((response) => {
        setMaterias(
          response.data.map((mat) => {
            return {
              Materia: mat.nombre_materia,
              Nivel: mat.nivel_materia,
              Grupo: mat.nombre_grupo,
              Inscritos: mat.cantidad_est,
              Docentes: mat.docente,
            };
          }),
        );
      })
      .catch((error) => {
        console.error('Error al obtener las materias:', error);
      });
  };

  useEffect(() => {
    loadMaterias();
  }, []);

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Materias registradas</h2>

      {/* Se puede parametrizar la cantidad de filas mostradas por hojas */}
      <Table rows={materias} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        lastPage={Math.floor(materias.length / 10) + 1}
      />
    </div>
  );
};

export default ListadoMateriasPage;
