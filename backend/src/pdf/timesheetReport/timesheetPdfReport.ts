import path from 'path';
import PDFDocument from 'pdfkit-table';
import {
  CrewInfoPdf,
  DateRange,
  StatementPdf,
} from './timesheetPdfReportTypes';
import {
  formatDate,
  formatPhoneNumber,
  formatTime,
} from '../utils/timesheetReportUtils';
import { Stream } from 'stream';

import { basicTimesheetTable } from './table/basicTimesheetTable';
import { vehicleTimesheetTable } from './table/vehicleTimesheetTable';

/**
 * Generates a PDF file containing crew information and timesheet for the specified date range.
 * @param dateRange - The date range for the timesheet report.
 * @param crewInfo - The crew information to include in the PDF.
 * @param statements - The list of statements to include in the PDF.
 * @returns The file path of the generated PDF.
 */
export async function timesheetPdfReport(
  dateRange: DateRange,
  crewInfo: CrewInfoPdf,
  statements: StatementPdf[],
): Promise<Stream> {
  const doc = new PDFDocument({ size: 'A4', margin: 20 });
  // Prepare a stream to return
  const stream = new Stream.PassThrough();
  doc.pipe(stream);

  const fontPath = path.join(__dirname, '../../assets/fonts/DejaVuSans.ttf');
  const boldFontPath = path.join(
    __dirname,
    '../../assets/fonts/DejaVuSans-Bold.ttf',
  );
  doc.registerFont('DejaVuSans', fontPath);
  doc.registerFont('DejaVuSans-Bold', boldFontPath);
  doc.font('DejaVuSans');

  // Add logo
  const logoWidth = 130;
  doc.image(path.join(__dirname, '../../assets/logo.png'), 445, doc.y, {
    fit: [logoWidth, logoWidth],
  });

  // Add header text
  doc
    .moveDown(1)
    .fontSize(13)

    .font('DejaVuSans-Bold')
    .text(`Project: `, { align: 'left', continued: true })
    .font('DejaVuSans')
    .text(` ${crewInfo.project.name}`)
    .moveDown(0.2)

    .fontSize(10)

    .font('DejaVuSans-Bold')
    .text(`Department: `, { align: 'left', continued: true })
    .font('DejaVuSans')
    .text(` ${crewInfo.department.name}`, { continued: true })

    .fontSize(9)

    .moveDown(1.5)
    .text(
      `Date Range: ${formatDate(new Date(dateRange.start_date))} - ${formatDate(
        new Date(dateRange.end_date),
      )}`,
      { align: 'right' },
    )
    .moveUp(1.5)
    .moveDown(0.2)

    .fontSize(10)

    .font('DejaVuSans-Bold')
    .text(`Name: `, { align: 'left', continued: true })
    .font('DejaVuSans')
    .text(`${crewInfo.projectUser.name} ${crewInfo.projectUser.surname}`, {
      continued: true,
    })
    .fontSize(9)

    .moveDown(1.5)
    .text(
      `Generated on: ${formatDate(new Date())} at ${formatTime(new Date())}`,
      { align: 'right' },
    )
    .moveUp(1.5)
    .moveDown(0.2)

    .fontSize(10)
    .font('DejaVuSans-Bold')
    .text(`Email: `, { align: 'left', continued: true })
    .font('DejaVuSans')
    .text(`${crewInfo.projectUser.email}`)
    .moveDown(0.2)

    .font('DejaVuSans-Bold')
    .text(`Phone: `, { align: 'left', continued: true })
    .font('DejaVuSans')
    .text(`${formatPhoneNumber(crewInfo.projectUser.phone_number)}`)

    .moveDown(1);

  const hasCar = statements.some((statement) => statement.car_name !== null);
  console.log(hasCar);

  if (!hasCar) {
    await basicTimesheetTable({ doc, statements, crewInfo });
  } else {
    await vehicleTimesheetTable({ doc, statements, crewInfo });
  }
  // Only finalize the document once everything is written
  doc.end();

  return stream;
}
