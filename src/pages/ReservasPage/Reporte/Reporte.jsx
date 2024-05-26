import { Icon } from '@iconify/react/dist/iconify.js';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import logoPDF from '../../../assets/Images/logoReserBit.png';
const Reporte = ({ label, icon, data, fechaIni = '01-05-24', fechaFin = '26-05-24' }) => {
  console.log('Datos en reporte', data);

  const generarPDFReporte = () => {
    if (data.length > 0) {
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
      doc.text(`FECHAS: ${fechaIni} - ${fechaFin}`, 13, 37);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('Reserbit umss', 47, 9);
      doc.setFont('helvetica', 'bold');
      doc.text('NIT', 47, 14);
      doc.setFont('helvetica', 'normal');
      doc.text('5243380015', 57, 14);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Universidad Mayor de San Simón', 139, 9);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('CALLE UMSS NRO. N', 152, 14);
      doc.text('ZONA/BARRIO: UMSS', 150, 19);
      doc.text(' COCHABAMBA', 156, 24);

      const startY = 40;

      const columns = [
        '#',
        'Registro',
        'Solicitante',
        'Fecha',
        'Horario',
        /* 'Materia - Grupo', */
        'Cantidad',
        'Ambiente',
        /* 'Min-Capacidad-Max', */
      ];
      const datos = data.map((reserve, index) => [
        index + 1,
        reserve.Registro,
        reserve.Solicitante,
        reserve.Fecha,
        reserve.Horario,
        /* reserve.Materia - Grupo, */
        reserve.Cantidad,
        reserve.Ambiente,
        /* reserve.Min-Capacidad-Max, */
      ]);

      doc.autoTable({
        head: [columns],
        body: datos,
        startY: startY,
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
      const totalPages = doc.internal.getNumberOfPages();

      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        const currentDateTime = new Date().toLocaleString();
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Fecha y Hora de descarga: ${currentDateTime}`, 110, 276);
        doc.setFontSize(10);
        doc.text(`Página, ${i}/${totalPages}`, 207, 276, { align: 'right' });
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
