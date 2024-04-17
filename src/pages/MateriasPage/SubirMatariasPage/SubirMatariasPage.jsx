import './SubirMatariasPage.scss';
import { Icon } from '@iconify/react/dist/iconify.js';

const SubirMatariasPage = () => { 
  

  return (
    <div className="subit-materias container">
      <div>
        <button className='btn'  data-bs-toggle="modal" data-bs-target="#InformacionModal">
          <Icon icon="solar:info-circle-linear" width="1rem" height="1rem" />
          Revisar el formato del archivo
        </button>
      </div>
      <h2>Subir Materias</h2>
      <button>
        Seleccionar archivo
      </button>
      <button>
        Ingrese un archivo con extensión .xls
      </button>

      <button>
        Cargar
      </button> 
    </div>
  );
};

export default SubirMatariasPage;
