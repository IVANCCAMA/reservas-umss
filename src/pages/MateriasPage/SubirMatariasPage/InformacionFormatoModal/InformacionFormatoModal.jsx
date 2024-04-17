import './InformacionFormatoModal.scss';

const InformacionFormatoModal = () => {

    return (
        <div className='modal-dialog modal-dialog-centered' id='informacionModal' tabIndex='-1' aria-labelledby='InformacionModal' aria-hidden='true'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className='modal-header'>
              <h1 className='modal-title fs-5' >El archivo a subir deberá tener el siguiente formato</h1>
            </div>
            <div className="modal-body">
              <p>
                El formato o plantilla del excel que se desea subir deberá tener las siguientes columnas.
              </p>
              <li>materia: Nombre de la materia.</li>
              <li>nivel: Nivel de la materia.</li>
              <li>grupo: Grupo al que está asignada la materia.</li>
              <li>docente: Nombre del docente que imparte la materia.</li>
              <li>n_estudiantes: Número de estudiantes inscritos en la materia</li>
              <table>
                <thead>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                    </tr>
                    <tr>
                        <th>materia</th>
                        <th>nivel</th>
                        <th>grupo</th>
                        <th>docente</th>
                        <th>n_estudiantes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
              </table>
              <p>Importante: cada fila debe tener los datos completos</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
        </div>
        
    );
   
};

export default InformacionFormatoModal;