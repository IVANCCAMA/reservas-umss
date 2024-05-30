// import './timeline-resources.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useModal } from '../../../components/Bootstrap/ModalContext';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/app/hooks';

const TimelineResource = () => {
  const data = [
    {
      Id: 2,
      Subject: 'Subject',
      Location: 'Location',
      StartTime: new Date(),
      EndTime: new Date(2024, 5, 1),
      CategoryColor: '',
      IsAllDay: false,
      Description: 'Description',
      // RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=8',
      // RecurrenceException:'20180130T043000Z',
      FollowingID: 1,
    },
    {
      Id: '3',
      Subject: 'Subject',
      StartTime: '',
      EndTime: '',
      StartTime: new Date(),
      EndTime: new Date(2024, 5, 15),
      Location: 'Location',
      Description: 'Description',
      IsAllDay: false,
      // RecurrenceID: '',
      // RecurrenceRule: '',
      // RecurrenceException: '',
      // isReadonly: true,
      IsBlock: false,
      Status: 'Completed',
      Priority: 'High',
      a: '#357cd2',
      b: '#5d96db',
      c: '#7fa900',
    },
    {
      Id: 1,
      Subject: '',
      Location: '',
      StartTime: new Date(),
      EndTime: new Date(),
      CategoryColor: '',
      IsAllDay: false,
    }
  ];

  const scheduleObj = useRef(null);

  const onDragStart = (args) => {
    args.navigation.enable = true;
    args.excludeSelectors = 'e-header-cells,e-header-day,e-header-date,e-all-day-cells';
    args.scroll = { enable: false };
  };

  const user = useAppSelector((state) => state.auth.usuario);
  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  const { confirmationModal, errorModal, successModal } = useModal();
  const { id_ambiente } = useParams();
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const currentDateTime = new Date();
  const dateStringFormat = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const headerColor = {
    DOCENTE: 'success',
    AUXILIAR: 'warning',
    ADMINISTRADOR: 'info'
  };
  const [ambiente, setAmbiente] = useState({});
  const [disponibilidad, setDisponibilidad] = useState([[]]);
  const [reservas, setReservas] = useState([{}]);
  const [aperturas, setAperturas] = useState([{}]);

  useEffect(() => {
    axios
      .get(`${baseURL}/disponibles/ambiente/${id_ambiente}`)
      .then(({ data }) => {
        setAmbiente(data);
        setDisponibilidad(data.disponibilidadPorDia.map(obj => obj.periodos))
      })
      .catch(e => console.error('Error al obtener los datos del ambiente:', e));
    axios
      .get(`${baseURL}/reservas/reserva-ambientes/${id_ambiente}`)
      .then(({ data }) => setReservas(data.length > 0 ? data : [{}]))
      .catch(e => console.error('Error al obtener los datos del ambiente:', e));
    axios
      .get(`${baseURL}/aperturas/apertura-fecha`)
      .then(({ data }) => setAperturas((user.tipo_usuario === 'ADMINISTRADOR' ? data[0]
        : data.find(obj => obj[user.tipo_usuario.toLowerCase()]))?.map(obj => ({
          id: obj.id_apertura,
          motivo: obj.motivo,
          aperturaIni: new Date(obj.apertura_inicio),
          aperturaFin: new Date(obj.apertura_fin),
          reservaIni:
            new Date(obj.reserva_inicio).getTime() > currentDateTime.getTime()
              ? new Date(obj.reserva_inicio)
              : currentDateTime,
          reservaFin:
            new Date(obj.reserva_fin).getTime() > currentDateTime.getTime()
              ? new Date(obj.reserva_fin)
              : currentDateTime,
        })) || [{}]))
      .catch(e => console.error('Error al obtener la apertura vigente:', e));
  }, []);

  return (
    <div className="container-fluid listado-ambientes p-md-5">
      <h2 className="text-start">Calendario de {ambiente.nombre_ambiente}</h2>

      <div className='schedule-control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent
            height='calc(100vh - 190px)'
            ref={scheduleObj}
            allowResizing={false}
            eventSettings={{ dataSource: data, }}
            dragStart={(onDragStart)}
            workHours={{ start: '06:00', end: '22:00' }}
            startHour={'06:00'}
            endHour={'22:00'}
            showWeekend={false}
            readonly={true}
            workDays={[1, 2, 3, 4, 5, 6]}
            firstDayOfWeek={1}
            cssClass='test'
          >
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' cssClass='test1' />
              <ViewDirective option='Month' />
              <ViewDirective option='Agenda' />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
    </div >
  );
};
export default TimelineResource;