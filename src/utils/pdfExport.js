import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Mapa de días de la semana
 */
const DIAS_SEMANA = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
};

/**
 * Exportar calendario de una sola carrera a PDF
 * @param {Object} params - Parámetros de exportación
 * @param {Array} params.semestres - Lista de semestres con sus horarios
 * @param {string} params.carrera - Nombre de la carrera
 * @param {string} params.tipoExamen - Tipo de examen (Parcial 1, Ordinario, etc.)
 * @param {string} params.periodo - Período académico
 */
export const exportarCalendarioCarrera = ({ semestres, carrera, tipoExamen, periodo }) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  
  // Configuración inicial
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;

  // Título principal
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`Calendario de Exámenes - ${carrera}`, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${tipoExamen} | ${periodo}`, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 5;
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generado: ${new Date().toLocaleString('es-MX')}`, pageWidth / 2, yPos, { align: 'center' });
  doc.setTextColor(0);

  // Procesar cada semestre
  semestres.forEach((semestre, index) => {
    // Verificar si necesitamos nueva página
    if (yPos > pageHeight - 70) {
      doc.addPage();
      yPos = 20;
    }

    yPos += 15;

    // Título del semestre
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(63, 81, 181); // Primary color
    doc.rect(14, yPos - 5, pageWidth - 28, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(semestre.nombre, pageWidth / 2, yPos + 2, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    yPos += 12;

    // Agrupar eventos por día
    const eventosPorDia = {};
    semestre.eventos.forEach(evento => {
      if (!eventosPorDia[evento.dia]) {
        eventosPorDia[evento.dia] = [];
      }
      eventosPorDia[evento.dia].push(evento);
    });

    // Ordenar eventos por hora dentro de cada día
    Object.keys(eventosPorDia).forEach(dia => {
      eventosPorDia[dia].sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    });

    // Crear datos para la tabla
    const tableData = [];
    Object.keys(eventosPorDia)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach(dia => {
        eventosPorDia[dia].forEach((evento, idx) => {
          tableData.push([
            idx === 0 ? DIAS_SEMANA[parseInt(dia)] : '',
            evento.horaInicio,
            evento.materia,
            evento.aula || 'Por asignar',
          ]);
        });
      });

    // Si no hay eventos
    if (tableData.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('No hay exámenes programados para este semestre', pageWidth / 2, yPos + 5, { align: 'center' });
      doc.setTextColor(0);
      yPos += 10;
    } else {
      // Generar tabla de horarios
      autoTable(doc, {
        startY: yPos,
        head: [['Día', 'Hora', 'Materia', 'Aula']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [63, 81, 181],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10,
        },
        bodyStyles: {
          fontSize: 9,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 30, fontStyle: 'bold' },
          1: { cellWidth: 25 },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 30 },
        },
        margin: { left: 14, right: 14 },
        didDrawPage: (data) => {
          // Actualizar yPos después de dibujar la tabla
          yPos = data.cursor.y;
        },
      });

      // Actualizar yPos después de la tabla
      yPos = doc.lastAutoTable.finalY + 5;
    }
  });

  // Pie de página en todas las páginas
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Descargar el PDF
  const fileName = `Calendario_${carrera.replace(/\s+/g, '_')}_${tipoExamen.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};

/**
 * Exportar calendarios de todas las carreras en un solo PDF
 * @param {Object} params - Parámetros de exportación
 * @param {Array} params.carreras - Lista de carreras con sus semestres
 * @param {string} params.tipoExamen - Tipo de examen
 * @param {string} params.periodo - Período académico
 */
export const exportarTodasLasCarreras = ({ carreras, tipoExamen, periodo }) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;
  let isFirstPage = true;

  // Título principal del documento
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Calendario General de Exámenes', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 8;
  doc.setFontSize(14);
  doc.text('Todas las Carreras', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${tipoExamen} | ${periodo}`, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 5;
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generado: ${new Date().toLocaleString('es-MX')}`, pageWidth / 2, yPos, { align: 'center' });
  doc.setTextColor(0);

  // Procesar cada carrera
  carreras.forEach((carreraData, carreraIndex) => {
    // Nueva página para cada carrera (excepto la primera)
    if (!isFirstPage) {
      doc.addPage();
      yPos = 20;
    }
    isFirstPage = false;

    // Título de la carrera
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(33, 150, 243); // Info color
    doc.rect(14, yPos - 5, pageWidth - 28, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(carreraData.nombre, pageWidth / 2, yPos + 3, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    yPos += 15;

    // Procesar cada semestre de la carrera
    carreraData.semestres.forEach((semestre, semestreIndex) => {
      // Verificar si necesitamos nueva página
      if (yPos > pageHeight - 70) {
        doc.addPage();
        yPos = 20;
      }

      // Título del semestre
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(63, 81, 181);
      doc.rect(14, yPos - 4, pageWidth - 28, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(semestre.nombre, pageWidth / 2, yPos + 1.5, { align: 'center' });
      doc.setTextColor(0, 0, 0);

      yPos += 10;

      // Agrupar eventos por día
      const eventosPorDia = {};
      semestre.eventos.forEach(evento => {
        if (!eventosPorDia[evento.dia]) {
          eventosPorDia[evento.dia] = [];
        }
        eventosPorDia[evento.dia].push(evento);
      });

      // Ordenar eventos
      Object.keys(eventosPorDia).forEach(dia => {
        eventosPorDia[dia].sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
      });

      // Crear datos para la tabla
      const tableData = [];
      Object.keys(eventosPorDia)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .forEach(dia => {
          eventosPorDia[dia].forEach((evento, idx) => {
            tableData.push([
              idx === 0 ? DIAS_SEMANA[parseInt(dia)] : '',
              evento.horaInicio,
              evento.materia,
              evento.aula || 'Por asignar',
            ]);
          });
        });

      // Si no hay eventos
      if (tableData.length === 0) {
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text('No hay exámenes programados', pageWidth / 2, yPos + 3, { align: 'center' });
        doc.setTextColor(0);
        yPos += 8;
      } else {
        // Generar tabla
        autoTable(doc, {
          startY: yPos,
          head: [['Día', 'Hora', 'Materia', 'Aula']],
          body: tableData,
          theme: 'grid',
          headStyles: {
            fillColor: [63, 81, 181],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 9,
          },
          bodyStyles: {
            fontSize: 8,
            cellPadding: 2,
          },
          columnStyles: {
            0: { cellWidth: 28, fontStyle: 'bold' },
            1: { cellWidth: 22 },
            2: { cellWidth: 'auto' },
            3: { cellWidth: 28 },
          },
          margin: { left: 14, right: 14 },
        });

        yPos = doc.lastAutoTable.finalY + 8;
      }
    });
  });

  // Pie de página
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Descargar
  const fileName = `Calendario_General_${tipoExamen.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};
