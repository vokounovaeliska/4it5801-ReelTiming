import path from 'path';
import PDFDocument from 'pdfkit-table';
import {
  CrewInfoPdf,
  DateRange,
  StatementPdf,
} from './timesheetPdfReportTypes';
import {
  calculateOvertimeAmount,
  formatDate,
  formatPhoneNumber,
  formatStatementTime,
  formatTime,
} from '../utils/timesheetReportUtils';
import { Stream } from 'stream';
import { currencyUtil } from '@shared/currencyUtil';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

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

  // Define table structure
  const table = {
    title: 'Timesheet Report',
    subtitle: 'Details of overtime',
    headers: [
      {
        label: 'Date',
        property: 'date',
        width: 90,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Shift Length',
        property: 'shift_length',
        width: 90,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Time (From - To)',
        property: 'time_range',
        width: 100,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Calculated Overtime',
        property: 'calculated_overtime',
        width: 90,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Claimed Overtime',
        property: 'claimed_overtime',
        width: 95,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Overtime Amount',
        property: 'overtime_amount',
        width: 95,
        align: 'right',
        headerAlign: 'center',
        renderer: (
          value: string | number,
          indexColumn?: number,
          indexRow?: number,
          row?: number,
          rectRow?: Rect,
          rectCell?: Rect,
        ) => {
          const margin = 25; // Define a margin from the right edge
          if (rectCell && typeof value !== 'undefined') {
            const textWidth = doc.widthOfString(String(value));
            const xPosition = rectCell.x + rectCell.width - textWidth - margin;
            doc.font('DejaVuSans');
            doc.text(String(value), xPosition, rectCell.y + 5, {
              align: 'left', // Rendered align is "left" because the position is manually calculated
            });
          }
          return '';
        },
      },
    ],
    rows: [] as string[][],
  };

  // Initialize totals
  let totalOvertime = 0;
  let totalOvertimeAmount = 0;

  // Fill table rows with statement data
  statements.forEach((statement) => {
    const overtimeAmount = calculateOvertimeAmount({
      ...statement,
      rate: crewInfo.rate,
    });
    const formattedFrom = formatStatementTime(new Date(statement.from));
    const formattedTo = formatStatementTime(new Date(statement.to));

    table.rows.push([
      formatDate(new Date(statement.start_date)),
      statement.shift_lenght.toString(),
      `${formattedFrom} - ${formattedTo}`,
      statement.calculated_overtime.toString(),
      statement.claimed_overtime.toString(),
      currencyUtil.formatAmount(overtimeAmount, crewInfo.project.currency, 2),
    ]);

    totalOvertime += statement.claimed_overtime;
    totalOvertimeAmount += overtimeAmount;
  });

  // Render the table
  let pageHeight =
    doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

  // Check if there is enough space for the table
  if (doc.y + table.rows.length * 15 > pageHeight) {
    doc.addPage();
  }

  await doc.table(table, {});

  doc
    .moveDown(1)
    .fontSize(10)
    .font('DejaVuSans-Bold')
    .text(`Total Overtime: `, { align: 'left', continued: true })
    .font('DejaVuSans')
    .text(`${totalOvertime} hours`)
    .font('DejaVuSans-Bold')
    .text('Total Overtime Amount: ', { align: 'left', continued: true })
    .font('DejaVuSans')
    .text(
      `${currencyUtil.formatAmount(
        totalOvertimeAmount,
        crewInfo.project.currency,
        2,
      )}`,
    );

  doc.end();
  return stream;
}
