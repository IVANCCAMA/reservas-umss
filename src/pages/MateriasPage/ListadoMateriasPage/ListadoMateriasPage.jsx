import './ListadoMateriasPage.scss'

const ListadoMateriasPage = () => {
  // estados

  // variables

  // logica | api

  return (
    <div className="container listado-materias">
      <h2 className="text-start">Materias registradas</h2>
      <table className="table table-striped border border-1">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Materia</th>
            <th scope="col">Nivel</th>
            <th scope="col">Grupo</th>
            <th scope="col">Inscritos</th>
            <th scope="col">Docente</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>001</td>
            <td>Introducción a la programación</td>
            <td>A</td>
            <td>G1</td>
            <td>112</td>
            <td>Vladimir Costas</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>002</td>
            <td>Elementos de programación</td>
            <td>C</td>
            <td>G1</td>
            <td>120</td>
            <td>Leticia Blanco</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>003</td>
            <td>Introducion a la programación</td>
            <td>D</td>
            <td>G2</td>
            <td>89</td>
            <td>Leticia Blanco</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>004</td>
            <td>Cálculo II</td>
            <td>B</td>
            <td>G6A</td>
            <td>58</td>
            <td>Alex Bustillos</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>005</td>
            <td>Taller de Simulación de sistemas</td>
            <td>F</td>
            <td>G1</td>
            <td>25</td>
            <td>Henry Frank</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>006</td>
            <td>Redes avanzadas de computador...</td>
            <td>H</td>
            <td>G2</td>
            <td>196</td>
            <td>Leticia Blanco</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>007</td>
            <td>Introducción a la programación</td>
            <td>B</td>
            <td>G3</td>
            <td>95</td>
            <td>Leticia Blanco</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>008</td>
            <td>Dinámica de sistemas</td>
            <td>D</td>
            <td>G1</td>
            <td>23</td>
            <td>Jorge Orellana</td>
          </tr>
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
export default ListadoMateriasPage;
