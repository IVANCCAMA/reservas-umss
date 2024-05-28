import { Icon } from '@iconify/react/dist/iconify.js';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import logoPDF from '../../../assets/Images/logoReserBit.png';
import { useModal } from '../../../components/Bootstrap/ModalContext';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form, { DateInput } from '../../../components/Form';
import axios from 'axios';
import moment from 'moment';

const Reporte = ({ label, icon, data }) => {
  const baseURL = import.meta.env.VITE_APP_DOMAIN;

  const { reportModal } = useModal();

  const schema = yup.object().shape({
    fechaInicio: yup.date().default(''),
    fechaFin: yup.date().default(''),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log('Recibidopoo', data);

    const fechas = {
      fecha_inicio: moment(data.fechaInicio).format('YYYY/MM/DD'),
      fecha_fin: moment(data.fechaFin).format('YYYY/MM/DD'),
    };
    try {
      const responseAmbientes = await axios.post(`${baseURL}/ambientes/reporte-ambientes`, fechas);
      const dataAmbientes = responseAmbientes.data;

      const responseDocentes = await axios.post(`${baseURL}/reservas/reporte-docentes`, fechas);
      const dataDocentes = responseDocentes.data;

      generarPDFReporte(dataAmbientes, dataDocentes, fechas);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const generarReporte = () => {
    reportModal({
      body: (
        <Form className="text-start" onSubmit={handleSubmit(onSubmit)} btnName1={'Generar'}>
          <div className="text-center fw-bold fs-5 pt-0 mt-0">Generar reporte</div>
          <div className="text-start mt-0">Seleccione rango de fechas para generar el reporte</div>
          <DateInput
            minDate={''}
            maxDate={''}
            label={
              <div className="text-start">
                Fecha de inicio <span className="text-danger ms-1">*</span>
              </div>
            }
            {...register('fechaInicio')}
          />
          <DateInput
            minDate={''}
            maxDate={''}
            label={
              <div className="text-start">
                Fecha fin <span className="text-danger ms-1">*</span>
              </div>
            }
            {...register('fechaFin')}
          />
        </Form>
      ),
    });
  };

  const filterData = (data, fechaIni, fechaFin) => {
    const startDate = new Date(fechaIni);
    const endDate = new Date(fechaFin);

    return data.filter((item) => {
      const formartDat = moment(item.fecha_reserva, 'DD-MM-YYYY').format('YYYY/MM/DD');
      const fechaReserv = new Date(formartDat);

      return fechaReserv >= startDate && fechaReserv <= endDate;
    });
  };

  function cambiarFormatoFecha(fecha) {
    const partes = fecha.split('-');
    const nuevaFecha = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return nuevaFecha;
  }

  const generarPDFReporte = (dataAmbientes, dataDocentes, fechas) => {
    const dataFilterReservas = filterData(data, fechas.fecha_inicio, fechas.fecha_fin);

    if (dataFilterReservas.length > 0) {
      // Datos reservas
      const datos = dataFilterReservas.map((reserv, index) => [
        index + 1,
        reserv.registro_reserva,
        reserv.nombre_usuario,
        reserv.fecha_reserva.slice(0, 10),
        `${reserv.hora_inicio.slice(0, 5)} - ${reserv.hora_fin.slice(0, 5)}`,
        reserv.nombre_materia,
        reserv.cantidad_est,
        reserv.nombre_ambiente,
        reserv.min_cap_max,
      ]);
      // Datos ambientes
      const ambientes = dataAmbientes.map((abm, index) => [
        index + 1,
        abm.nombre_ambiente,
        abm.capacidad,
        abm.disponible,
        abm.tipo,
        abm.cantidad_reservas,
      ]);
      // Datos ambientes
      const docentes = dataDocentes.map((doc, index) => [
        index + 1,
        doc.nombre_usuario,
        doc.tipo_usuario,
        doc.codsiss,
        doc.cantidad_reservas,
      ]);

      const imageURL = logoPDF;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [215.9, 279.4],
      });

      // Página vertical
      doc.addImage(imageURL, 'JPEG', 12, 2, 30, 15);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('REPORTE DE AMBIENTES Y DOCENTES', 13, 34);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(
        `FECHA REPORTE: Del ${moment(fechas.fecha_inicio, 'YYYY/MM/DD').format('DD-MM-YYYY')} al ${moment(fechas.fecha_fin, 'YYYY/MM/DD').format('DD-MM-YYYY')}`,
        13,
        39,
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('Reserbit umss', 47, 9);
      doc.setFont('helvetica', 'bold');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Universidad Mayor de San Simón', 139, 9);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('CALLE UMSS NRO. N', 152, 14);
      doc.text('ZONA/BARRIO: UMSS', 150, 19);
      doc.text('COCHABAMBA', 156, 24);

      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Lista de cinco ambientes más solicitados', 13, 50);

      doc.autoTable({
        head: [['#', 'Aula', 'Capacidad', 'Estado', 'Tipo', 'Cantidad de reservas']],
        body: ambientes.slice(0, 5),
        startY: 52,
        headStyles: {
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          fontSize: 9,
          halign: 'center',
        },
        bodyStyles: {
          textColor: [0, 0, 0],
          fontSize: 9,
        },
        margin: { top: 10 },
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 'auto' },
          5: { cellWidth: 'auto' },
        },
      });

      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      /* Cambiar el 140 para ajustar */
      doc.text('Lista de cinco docentes que realizaron más reservas', 13, 140);
      /* Cambiar el 140 para ajustar */
      doc.autoTable({
        head: [['#', 'Solicitante', 'Tipo', 'Cod. SIS', 'Cantidad de reservas']],
        body: docentes.slice(0, 5),
        startY: 142,
        headStyles: {
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          fontSize: 9,
          halign: 'center',
        },
        bodyStyles: {
          textColor: [0, 0, 0],
          fontSize: 9,
        },
        margin: { top: 10 },
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 'auto' },
        },
      });

      // Página horizontal
      doc.addPage('a4', 'landscape');
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Lista de reservas', 13, 13);
      doc.autoTable({
        head: [
          [
            '#',
            'Registro',
            'Solicitante',
            'Fecha',
            'Horario',
            'Materia - Grupo',
            'Cant.',
            'Ambiente',
            'Min-Capacidad-Max',
          ],
        ],
        body: datos,
        startY: 15,
        headStyles: {
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          fontSize: 9,
          halign: 'center',
        },
        bodyStyles: {
          textColor: [0, 0, 0],
          fontSize: 9,
        },
        margin: { top: 10 },
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 30 },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 25 },
          5: { cellWidth: 'auto' },
          6: { cellWidth: 'auto' },
          7: { cellWidth: 'auto' },
          8: { cellWidth: 'auto' },
        },
      });

      // Agregar número de página a cada página
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const currentDateTime = new Date().toLocaleString();
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(
          `Fecha y Hora de descarga: ${currentDateTime} Página ${i}/${totalPages}`,
          pageWidth - 10,
          pageHeight - 10,
          { align: 'right' },
        );
      }

      doc.save('Reporte Reservas.pdf');
    } else {
      alert('No hay datos existentes entre las fechas seleccionadas.');
    }
  };

  return (
    <div>
      <button className="btn btn-primary d-flex" onClick={generarReporte}>
        <Icon icon={icon} width="30" height="30" />
        <div className="my-auto">{label}</div>
      </button>
    </div>
  );
};

export default Reporte;
