import React, { useEffect, useState, useRef } from 'react';
import TextInput from '../../../components/Form/TextInput';
import TextTarea from '../../../components/Form/TextTarea';
import Select from '../../../components/Form/Select';
import Accordion from '../../../components/Form/Accordion';
import CheckboxInput from '../../../components/Form/CheckboxInput';
import AlertContainer from '../../../components/Bootstrap/AlertContainer';
import axios from 'axios';

const RegistroReservaPage = () => {
  const database = 'http://localhost:4000/api';
  const tiposAmbiente = [
    { title: 'Aula común', value: 'aula comun' },
    { title: 'Laboratorio', value: 'laboratorio' },
    { title: 'Auditorio', value: 'auditorio' }
  ];
  const alerts = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  // aux
  const [users, setUsers] = useState([]);
  const [datalistSolicitante, setDatalistSolicitante] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const alertRef = useRef(null);
  const gruposRef = useRef(grupos);
  const [allCheckbox, setAllCheckBox] = useState(false);
  // form
  const [solicitante, setSolicitante] = useState('');
  const [tipoAmbiente, setTipoAmbiente] = useState('');
  const [listaGrupos, setListaGrupos] = useState([]);
  const [estudiantes, setEstudiantes] = useState(0);
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  const [periodos, setPeriodos] = useState([]);
  // cargar aux
  useEffect(() => {
    // recuperar users para el id del solicitante
    axios
      .get(`${database}/usuarios`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
    // recuperar fechas max min
    axios
      .get(`${database}/aperturas/2`)
      .then((response) => {
        setMaxDate(response.data.apertura_fin);
        setMinDate(response.data.apertura_inicio);
      })
      .catch((error) => {
        console.error('Error al obtener la apertura 2:', error);
      });
    // recuperar periodos
    axios
      .get(`${database}/periodos`)
      .then((response) => {
        setPeriodos(response.data.map(periodo => {
          return { ...periodo, checked: false };
        }));
      })
      .catch((error) => {
        console.error('Error al obtener los periodos:', error);
      });
  }, []);
  // actualizar num estudiantes
  useEffect(() => {
    gruposRef.current = grupos;
    const sum = grupos.reduce((acc, group) => {
      if (group.hidden) {
        return acc + group.inscritos;
      }
      return acc;
    }, 0);
    setEstudiantes(sum);
  }, [grupos]);
  // update allChecked
  useEffect(() => {
    const uncheck = periodos.find(obj => obj.checked === false);
    setAllCheckBox(!uncheck);
  }, [periodos]);

  const handleSolicitante = (newValue) => {
    const filteredValue = newValue.replace(/[^a-zA-Z ]/g, '');
    setSolicitante(filteredValue.toUpperCase());
    // update datalist solicitantes
    const filteredValues = users
      .filter(obj => obj.nombre_usuario.includes(filteredValue.toUpperCase()))
      .map(filteredObj => filteredObj.nombre_usuario);
    if (filteredValues.length < 5) {
      setDatalistSolicitante(filteredValues);
    } else {
      setDatalistSolicitante([]);
    }
  };
  // resuperar materias y grupos
  const searchGroupsByApplicant = (newValue) => {
    // recuperar de db los grupos del docente
    const foundId = users.find(obj => obj.nombre_usuario === newValue)?.id_usuario;
    if (!foundId) { return }
    axios
      .get(`${database}/usuarios/${foundId}/materias-grupos`)
      .then((response) => {
        // mapear y dar formato
        setGrupos(response.data['materia-grupo'].map(group => ({
          value: String(group.id_grupo),
          title: `${group.nombre_materia} - ${group.nombre_grupo}`,
          inscritos: group.cantidad_est,
          hidden: false
        })));
      })
      .catch((error) => {
        console.error('Error al obtener las materias y grupos:', error);
      });
    // reset form
    setListaGrupos([]);
    alertRef.current.removeAllAlerts();
  };

  const removeGropsSelected = (groupID) => {
    const updatedGrupos = gruposRef.current.map(group => {
      if (group.value === groupID) {
        return { ...group, hidden: false };
      }
      return group;
    });
    setGrupos(updatedGrupos);
    setListaGrupos(currentList => currentList.filter(group => group !== groupID));
  };

  const addGropsSelected = (newValue) => {
    const updatedGrupos = grupos.map((group) => {
      if (group.value === newValue) {
        alertRef.current.addAlert(alerts[listaGrupos.length % 8], group.title, () => removeGropsSelected(newValue));
        return { ...group, hidden: true };
      }
      return group;
    });
    setGrupos(updatedGrupos);
    setListaGrupos(prevGroups => [...prevGroups, newValue]);
  };

  const handleCheckboxChange = (id_periodo) => {
    const updatedPeriodos = periodos.map(periodo =>
      periodo.id_periodo === id_periodo ? { ...periodo, checked: !periodo.checked } : periodo
    );
    setPeriodos(updatedPeriodos);
  };

  const checkedAll = (checked) => {
    const updatedPeriodos = periodos.map(periodo =>
      ({ ...periodo, checked: checked })
    );
    setAllCheckBox(checked);
    setPeriodos(updatedPeriodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ambienteDisp = {
      tipo_ambiente: tipoAmbiente,
      cantidad_est: estudiantes,
      fecha_reserva: fecha,
      periodos: periodos.filter(periodo => periodo.checked).map(periodo => periodo.id_periodo)
    };
    console.log(ambienteDisp);

    axios
      .post(`${database}/reservas`, ambienteDisp)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error al obtener las materias y grupos:', error);
      });
  };

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-6">
          <h2 className="text-md-center">Formulario de reserva</h2>

          <form className="needs-validation" onSubmit={handleSubmit}>
            <TextInput
              required
              name='solicitante'
              label='Nombre del solicitante *'
              value={solicitante}
              datalist={datalistSolicitante}
              onChange={handleSolicitante}
              onBlur={searchGroupsByApplicant}
              placeholder='Escriba el nombre del solicitante'
            />

            <Select
              required
              name='tipoAmbiente'
              label='Tipo de ambiente *'
              options={tiposAmbiente}
              onChange={setTipoAmbiente}
              placeholder='Seleccionar el tipo de ambiente'
            />

            <Select
              required
              name='materiaGrupo'
              label='Materias y grupos *'
              value={'default'}
              options={grupos}
              onChange={addGropsSelected}
              placeholder='Seleccionar materias y grupos'
            />

            <div className="my-3">
              <label className="form-label">Lista de materias y grupos añadidos</label>

              <AlertContainer ref={alertRef} />
            </div>

            <div className="my-3 row row-cols6">
              <div className="col-md-6">
                <label className="form-label">Número de Estudiantes</label>
                <input
                  required
                  disabled
                  value={estudiantes}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha de reserva *</label>
                <input
                  required
                  type="date"
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => { setFecha(e.target.value) }}
                  className="form-control"
                />
              </div>
            </div>

            <TextTarea
              required
              name='motivo'
              label='Motivos de reserva'
              value={motivo}
              onChange={setMotivo}
              placeholder='Escriba el motivo de la reserva'
              maxLength={200}
            />

            <div className='my-3'>
              <label className='form-label'>Periodos y horarios *</label>

              <Accordion id='periodos' accordionItems={[{
                title: 'Selecione periodo/s',
                body:
                  <div className="w-100">
                    <div className="d-flex justify-content-between pb-2">
                      <label>Periodos</label>
                      <CheckboxInput
                        checked={allCheckbox}
                        label='Selecionar todos'
                        onChange={checkedAll} />
                    </div>

                    <div className='row row-cols4'>
                      {periodos.map((periodo, index) => {
                        return (
                          <div key={`periodo-${index}`} className='col-md-4'>
                            <CheckboxInput
                              checked={periodo.checked}
                              label={`${periodo.hora_inicio?.slice(0, 5)} - ${periodo.hora_fin?.slice(0, 5)}`}
                              onChange={() => handleCheckboxChange(periodo.id_periodo)} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
              }]} />
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