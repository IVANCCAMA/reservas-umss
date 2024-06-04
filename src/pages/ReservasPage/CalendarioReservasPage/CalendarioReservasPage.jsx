import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/app/hooks';
import { Link } from 'react-router-dom';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

const CalendarioPage = () => {
  const user = useAppSelector((state) => state.auth.usuario);
  const baseURL = import.meta.env.VITE_APP_DOMAIN;
  const [reservas, setReservas] = useState([]);
  const [apertura, setApertura] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/reservas/reserva-usuario/${user.id_usuario}`)
      .then(({ data }) => setReservas(data.map(obj => {
        const [dia, mes, anio] = obj.fecha_reserva.split('-');
        return {
          id: new Date(`${anio}-${mes}-${dia}T${obj.hora_inicio}-04:00`).getTime(),
          title: 'RESERVADO',
          start: new Date(`${anio}-${mes}-${dia}T${obj.hora_inicio}-04:00`),
          end: new Date(`${anio}-${mes}-${dia}T${obj.hora_fin}-04:00`),
          obj: obj,
        };
      })))
      .catch(e => console.error('Error al obtener las reservas del ambiente:', e));
      axios
        .get(`${baseURL}/aperturas/apertura-fecha`)
        .then(({ data }) => setApertura(user.tipo_usuario === 'ADMINISTRADOR'
          ? data[0]
          : data.find(obj => obj[user.tipo_usuario.toLowerCase()])))
        .catch(e => console.error('Error al obtener la apertura vigente:', e));
  }, []);

  const messages = {
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    allDay: "Todo el día",
    week: "Semana",
    day: "Día",
    month: "Mes",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    agenda: "Agenda",
    noEventsInRange: "Sin eventos"
  };

  const components = {
    event: ({ event }) => {
      const eventColor = {
        // RESERVAS
        vigente: event.obj.nombre_usuario === user.nombre_usuario ? 'success' : 'danger opacity-75',
        cancelado: event.obj.nombre_usuario === user.nombre_usuario ? 'danger opacity-75' : 'warning opacity-75',
        finalizado: event.obj.nombre_usuario === user.nombre_usuario ? 'secondary opacity-75' : 'warning opacity-75',
        // DISPONIBLE
        disponible: 'primary opacity-75',
        // APERTURAS
        'EN CURSO': 'warning opacity-75',
        'FINALIZADO': 'danger opacity-75',
        'VIGENTE': 'primary opacity-75',

        undefined: 'danger',
      };
      const content = {
        RESERVADO: {
          header: event.obj.estado?.toUpperCase(),
          title: event.obj.nombre_usuario,
          subtitle: `Registrado el ${new Date(event.obj.registro_reserva_sin_formato?.slice(0, 23) + '-04:00')
            .toLocaleString('es-ES', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}.`,
          listGroup: [
            { key: 'Materia/s: ', value: event.obj.nombre_materia },
            { key: 'Motivo: ', value: event.obj.motivo },
            { key: 'Cantidad: ', value: event.obj.cantidad_est },
            { key: 'Ambiente: ', value: event.obj.nombre_ambiente },
          ],
          footer: [
            { to: '/reservas/listaReservas', text: 'Mis reservas' },
          ],
        },
        APERTURA: {
          header: 'APERTURA',
          title: apertura.motivo,
          subtitle: `Apertura para ${apertura.docente ? 'Docentes' : ''}${apertura.docente && apertura.auxiliar ? ' y ' : ''}${apertura.auxiliar ? 'Auxiliares' : ''}.`,
          listGroup: [
            { key: 'Estado: ', value: event.obj.estado },
            {
              key: 'Desde: ',
              value: startUpperCase(new Date(`${apertura.apertura_inicio?.slice(0, 23)}-04:00`).toLocaleString('es-ES', {
                weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })),
            },
            {
              key: 'Hasta: ',
              value: startUpperCase(new Date(`${apertura.apertura_fin?.slice(0, 23)}-04:00`).toLocaleString('es-ES', {
                weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })),
            },
            {
              key: 'Perdiodo de examen: ',
              value: `Del ${new Date(`${apertura.apertura_inicio?.slice(0, 23)}-04:00`).toLocaleString('es-ES', {
                weekday: 'long', month: 'long', day: 'numeric'
              })} al ${new Date(`${apertura.apertura_fin?.slice(0, 23)}-04:00`).toLocaleString('es-ES', {
                weekday: 'long', month: 'long', day: 'numeric'
              })}.`,
            },
          ],
          footer: [
            { to: '/reservas/reservarAmbiente', text: 'Formulario de reserva' },
            { to: '/ambientes/listaAmbientes', text: 'Ver más ambientes' },
          ],
        },
      };

      return (
        <div className="dropdown-center w-100 h-100">
          <button
            className={`btn bg-opacity-25 w-100 h-100 btn-${eventColor[event.obj.estado]}`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {event.obj.estado === 'cancelado' ? 'CANCELADO' : event.title}
          </button>
          <div className="dropdown-menu p-0 position-fixed">
            <div className="card" style={{ maxWidth: '28rem', minWidth: '18rem' }}>
              <div className="card-header text-center">
                {content[event.title].header}
              </div>
              <div className="card-body py-2">
                <h5 className="card-title">{content[event.title].title}</h5>
                <h6 className="card-subtitle text-body-secondary">{content[event.title].subtitle}</h6>
              </div>
              <ul className="text-wrap list-group list-group-flush border">
                {content[event.title].listGroup.map((item, index) => (
                  item.value && (
                    <li key={`footer-${event.id}-${index}`} className="list-group-item d-flex">
                      {item.key} <p className='ms-2 mb-0'>{item.value}</p>
                    </li>
                  )
                ))}
              </ul>
              <div className="card-footer py-2">
                {content[event.title].footer.map((link, index) => (
                  <Link key={`footer-${event.id}-${index}`} to={link.to} className="card-link small" state={link.state}>{link.text}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const startUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="container-fluid listado-ambientes p-md-5 overflow-hidden">
      <h2 className="text-start">Mi calendario de reservas</h2>

      <div className='border border-2  rounded-2' style={{ height: 'calc(100vh - 170px)' }}>
        <Calendar
          step={45}
          events={[...[...reservas.filter((obj, index, self) =>
            index === self.findIndex((t) => t.id === obj.id))], {
              id: apertura.id_apertura,
              title: 'APERTURA',
              start: new Date(apertura.apertura_inicio?.slice(0, 23) + '-04:00'),
              end: new Date(apertura.apertura_fin?.slice(0, 23) + '-04:00'),
              obj: apertura,
            }]}
          localizer={dayjsLocalizer(dayjs)}
          messages={messages}
          length={1}
          views={['agenda', 'day', 'week', 'month']}
          defaultView='week'
          min={new Date(2024, 1, 1, 6, 45)}
          max={new Date(2024, 1, 1, 21, 45)}
          components={components}
          formats={{
            dayFormat: date => startUpperCase(date.toLocaleString('es-ES', { weekday: 'short', day: 'numeric' })),
            weekdayFormat: date => startUpperCase(date.toLocaleString('es-ES', { weekday: 'short' })),
            timeGutterFormat: date => date.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            monthHeaderFormat: date => startUpperCase(date.toLocaleString('es-ES', { month: 'long', year: 'numeric' })),
            dayRangeHeaderFormat: range => {
              const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };
              const formattedDateStart = range.start.toLocaleDateString('es-ES', dateFormat);
              const formattedDateEnd = range.end.toLocaleDateString('es-ES', dateFormat);
              return startUpperCase(formattedDateStart) + ' al ' + startUpperCase(formattedDateEnd);
            },
            dayHeaderFormat: date => {
              const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              const formattedDate = date.toLocaleString('es-ES', dateFormat);
              return startUpperCase(formattedDate);
            },
            agendaHeaderFormat: range => {
              const dateFormat = { year: 'numeric', month: 'long', day: '2-digit' };
              const formattedDateStart = range.start.toLocaleDateString('es-ES', dateFormat);
              const formattedDateEnd = range.end.toLocaleDateString('es-ES', dateFormat);
              return startUpperCase(formattedDateStart) + ' al ' + startUpperCase(formattedDateEnd);
            },
            agendaDateFormat: date => startUpperCase(date.toLocaleString('es-ES', { weekday: 'short', month: 'long', day: 'numeric' })),
            agendaTimeFormat: date => date.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            agendaTimeRangeFormat: range => {
              const dateFormat = { hour: '2-digit', minute: '2-digit' };
              const formattedDateStart = range.start.toLocaleTimeString('es-ES', dateFormat);
              const formattedDateEnd = range.end.toLocaleTimeString('es-ES', dateFormat);
              return startUpperCase(formattedDateStart) + ' - ' + startUpperCase(formattedDateEnd);
            },
            eventTimeRangeFormat: range => {
              const dateFormat = { hour: '2-digit', minute: '2-digit' };
              const formattedDateStart = range.start.toLocaleTimeString('es-ES', dateFormat);
              const formattedDateEnd = range.end.toLocaleTimeString('es-ES', dateFormat);
              return startUpperCase(formattedDateStart) + ' - ' + startUpperCase(formattedDateEnd);
            },
          }}
        />
      </div>
    </div>
  );
};

export default CalendarioPage;
