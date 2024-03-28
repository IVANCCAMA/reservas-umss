import './ListadoMateriasPage.scss';

const ListadoMateriasPage = () => {
  // estados

  // variables
  const materias = [
    {
      id: 1,
      Materia: 'Matemáticas',
      Nivel: 'Bachillerato',
      Grupo: 'A',
      Inscritos: 30,
      Docentes: ['Juan Pérez', 'María López'],
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: ['Pedro García'],
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: ['Ana Martínez'],
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: ['Luis Hernández', 'Sofía Ramírez'],
    },
  ];

  // logica | api
  

  return (
    <div className="container listado-materias p-5">
      <h2 className="text-start">Materias registradas</h2>
      <table className="table table-striped border border-1">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Materia</th>
            <th scope="col">Nivel</th>
            <th scope="col">Grupo</th>
            <th scope="col">Inscritos</th>
            <th scope="col">Docente</th>
          </tr>
        </thead>
        <tbody>
          {console.log(materias)}
          {materias.map((materia, index) => {
            return (
              <tr key={index}>
                <th scope="row">{materia.id}</th>
                <td>{materia.Materia}</td>
                <td>{materia.Nivel}</td>
                <td>{materia.Grupo}</td>
                <td>{materia.Inscritos}</td>
                <td>
                  {materia.Docentes.map((Docente) => (
                    <div key={Docente}>{Docente}</div>
                  ))}
                </td>
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
export default ListadoMateriasPage;
