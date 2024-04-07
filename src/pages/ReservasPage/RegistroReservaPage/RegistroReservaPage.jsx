import React, { useEffect, useState } from 'react';
import TextInput from '../../../components/Form/TextInput';
import Select from '../../../components/Form/Select';
import Accordion from '../../../components/Form/Accordion';
import CheckboxInput from '../../../components/Form/CheckboxInput';

const RegistroReservaPage = () => {
  const database = 'http://localhost:4000';
  const alerts = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  const [solicitante, setSolicitante] = useState('');
  const [tiposAmbiente, setTiposAmbiente] = useState([]);
  const [tipoAmbiente, setTipoAmbiente] = useState('');

  const [grupos, setGrupos] = useState([]);
  const [listaGrupos, setListaGrupos] = useState([]);

  const [estudiantes, setEstudiantes] = useState(0);
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');

  // resuperar tipos de ambientes
  useEffect(() => { setTiposAmbiente(['Aula común', 'Laboratorio', 'Auditorio']); }, []);

  // json horarios
  const horarios = [
    {
      nombre: 'Lunes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Martes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Miércoles',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Juevez',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Viernes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Sabado',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
  ];

  // resuperar materias y grupos
  const searchGroupsByApplicant = (newValue) => {
    // recuperar de db
    const gruposJSON = [
      {
        id_grupo: 1,
        nombre_grupo: "G1",
        nombre_materia: "Ingles I"
      },
      {
        id_grupo: 2,
        nombre_grupo: "G2",
        nombre_materia: "Ingles I"
      },
      {
        id_grupo: 3,
        nombre_grupo: "G3",
        nombre_materia: "Ingles I"
      },
      {
        id_grupo: 4,
        nombre_grupo: "G1",
        nombre_materia: "Ingles II"
      },
      {
        id_grupo: 5,
        nombre_grupo: "G3",
        nombre_materia: "Ingles II"
      },
      {
        id_grupo: 6,
        nombre_grupo: "G2",
        nombre_materia: "Ingles II"
      },
      {
        id_grupo: 7,
        nombre_grupo: "G3",
        nombre_materia: "Ingles III"
      },
      {
        id_grupo: 8,
        nombre_grupo: "G2",
        nombre_materia: "Ingles III"
      },
      {
        id_grupo: 9,
        nombre_grupo: "G1",
        nombre_materia: "Ingles III"
      }
    ];
    // mapear y dear formato
    setGrupos(gruposJSON.map(({ id_grupo, nombre_grupo, nombre_materia }) => ({
      value: id_grupo,
      title: `${nombre_materia} - ${nombre_grupo} de ${solicitante}`
    })));
  };

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-6">
          <h2 className="text-md-center">Registrar ambientes</h2>

          <form className="needs-validation">
            <TextInput
              required
              name='solicitante'
              label='Nombre del solicitante *'
              value={solicitante}
              onChange={setSolicitante}
              onBlur={searchGroupsByApplicant}
              placeholder='Escriba el nombre del solicitante'
            />

            <Select
              name='tipoAmbiente'
              label='Tipo de ambiente *'
              options={tiposAmbiente}
              onChange={setTipoAmbiente}
              placeholder='Seleccionar el tipo de ambiente'
            />

            <Select
              name='materiaGrupo'
              label='Materias y grupos *'
              options={grupos}
              onChange={setTipoAmbiente}
              placeholder='Seleccionar materias y grupos'
            />

            {/* A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like. */}
            <div className="">
              <label className="form-label">Lista de materias y grupos añadidos</label>
              <div className="mb-0 px-3 py-1 alert alert-primary alert-dismissible fade show" role="alert">
                Materia 1 - Grupo 1
                <button type="button" className="pe-1 py-2 btn-close" data-bs-dismiss="alert" aria-label="Close" />
              </div>
            </div>

            <div className="my-3 row row-cols6">
              <div className="col-md-6">
                <label className="form-label">Número de Estudiantes *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escriba el número de Estudiantes"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha de reserva *</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Cap. maxima"
                />
              </div>
            </div>

            <div className="my-3">
              <label className="form-label">Motivos de reserva</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Escriba el motivo de la reserva"
              />
            </div>

            <div className='my-3'>
              <label className='form-label'>Periodos y horarios *</label>

              <Accordion id='periodos' accordionItems={horarios.map((item, index) => {
                return {
                  title: item.nombre,
                  body:
                    <div className="w-100">
                      <div className="d-flex justify-content-between pb-2">
                        <label>Periodos</label>
                        <CheckboxInput label='Selecionar todos' name={`periodo-${index}-all`} value='' />
                      </div>

                      <div className='row row-cols4'>
                        {item.periodos.map((periodo, subIndex) => {
                          return (
                            <div key={`periodo-${index}-${subIndex}`} className='col-md-4'>
                              <CheckboxInput label={periodo.horario} name={`periodo-${index}-${subIndex}`} value={periodo.id} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                };
              })} />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary me-md-5">
                Registrar
              </button>
              <button type="submit" className="btn btn-primary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroReservaPage;