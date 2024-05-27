import { Icon } from '@iconify/react/dist/iconify.js';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import logoPDF from '../../../assets/Images/logoReserBit.png';

const Reporte = ({ label, icon, data, fechaIni = '2024-01-17', fechaFin = '2024-05-27' }) => {
  const filterData = (data, fechaIni, fechaFin) => {
    const startDate = new Date(fechaIni);
    const endDate = new Date(fechaFin);

    return data.filter((item) => {
      const [time, date] = item.registro_reserva.split(' ');
      const itemDate = new Date(date.split('-').reverse().join('-') + 'T' + time);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  function cambiarFormatoFecha(fecha) {
    const partes = fecha.split('-');
    const nuevaFecha = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return nuevaFecha;
  }

  const generarPDFReporte = () => {
    const dataFilter = filterData(data, fechaIni, fechaFin);

    if (dataFilter.length > 0) {
      const imageURL = logoPDF;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [215.9, 279.4],
      });

      doc.addImage(imageURL, 'JPEG', 12, 2, 30, 15);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('REPORTE DE AMBIENTES Y DOCENTES', 13, 34);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(
        `FECHA REPORTE: Del ${cambiarFormatoFecha(fechaIni)} al ${cambiarFormatoFecha(fechaFin)}`,
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
      doc.text('Lista de ambientes más solicitados', 13, 50);

      /* Datos */
      const datos = dataFilter.map((reserv, index) => [
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

      doc.autoTable({
        head: [['#', 'Aula', 'Capacidad', 'Estado', 'Tipo', 'Cantidad de reservas']],
        body: datos.slice(0, 5),
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
      });

      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Lista de docentes que realizaron más reservas', 13, 103);

      doc.autoTable({
        head: [['#', 'Solicitante', 'Tipo', 'Cod. SIS', 'Cantidad de reservas']],
        body: datos.slice(0, 5),
        startY: 105,
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
      });

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
          4: { cellWidth: 'auto' },
          5: { cellWidth: 'auto' },
          6: { cellWidth: 'auto' },
          7: { cellWidth: 'auto' },
          8: { cellWidth: 'auto' },
        },
      });

      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        const currentDateTime = new Date().toLocaleString();
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(
          `Fecha y Hora de descarga: ${currentDateTime} Página, ${i}/${totalPages}`,
          207,
          276,
          null,
          null,
          'right',
        );
      }

      doc.save('Reporte Reservas.pdf');
    }
  };

  return (
    <div>
      <button className="btn btn-primary d-flex" onClick={generarPDFReporte}>
        <Icon icon={icon} width="30" height="30" />
        <div className="my-auto">{label}</div>
      </button>
    </div>
  );
};

export default Reporte;
