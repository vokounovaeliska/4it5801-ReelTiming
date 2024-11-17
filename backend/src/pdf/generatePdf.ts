import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit-table';
import { CrewInfoPdf, DateRange, StatementPdf } from './pdfTypes';
import { format } from 'date-fns';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculates the overtime payment amount based on the provided statement.
 * @param statement - The statement object containing overtime and rate details.
 * @returns The overtime payment amount.
 */
function calculateOvertimeAmount(
  statement: StatementPdf & { rate: CrewInfoPdf['rate'] },
): number {
  let overtime = statement.claimed_overtime;
  let totalOvertimeAmount = 0;

  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour1;
    overtime -= 1;
  }
  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour2;
    overtime -= 1;
  }
  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour3;
    overtime -= 1;
  }
  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour4 * overtime;
  }

  return totalOvertimeAmount;
}

/**
 * Formats the given date into a string (HH:mm).
 * @param date - The date object to format.
 * @returns The formatted time string.
 */
function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Formats the given date into a string (DD.MM.YYYY).
 * @param date - The date object to format.
 * @returns The formatted date string.
 */
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
}

function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 9) {
    const formatted = `+420 ${cleaned.slice(0, 3)} ${cleaned.slice(
      3,
      6,
    )} ${cleaned.slice(6, 9)}`;
    return formatted;
  } else if (cleaned.length === 12 && cleaned.startsWith('420')) {
    const formatted = `+420 ${cleaned.slice(3, 6)} ${cleaned.slice(
      6,
      9,
    )} ${cleaned.slice(9, 12)} ${cleaned.slice(12, 13)}`;
    return formatted;
  } else if (cleaned.length === 13 && cleaned.startsWith('+420')) {
    const formatted = cleaned.replace(
      /^\+420(\d{3})(\d{3})(\d{3})$/,
      '+420 $1 $2 $3',
    );
    return formatted;
  }
  // Return the original phone number if it doesn't match expected format
  return phoneNumber;
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Generates a PDF file containing crew information and timesheet for the specified date range.
 * @param dateRange - The date range for the timesheet report.
 * @param crewInfo - The crew information to include in the PDF.
 * @param statements - The list of statements to include in the PDF.
 * @returns The file path of the generated PDF.
 */
export async function generatePdf(
  dateRange: DateRange,
  crewInfo: CrewInfoPdf,
  statements: StatementPdf[],
): Promise<string> {
  const outputDirectory = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const formattedDate =
    format(dateRange.start_date, 'dd-MM-yyyy') +
    '_' +
    format(dateRange.end_date, 'dd-MM-yyyy');
  const sanitizedCrewName =
    `${crewInfo.projectUser.name}_${crewInfo.projectUser.surname}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_]/g, '_');

  const filePath = path.join(
    outputDirectory,
    `${formattedDate}_${sanitizedCrewName}_timesheet_report.pdf`,
  );
  const doc = new PDFDocument({ size: 'A4', margin: 20 });

  const fontPath = path.join(__dirname, 'fonts', 'DejaVuSans.ttf');
  const boldFontPath = path.join(__dirname, 'fonts', 'DejaVuSans-Bold.ttf');
  doc.registerFont('DejaVuSans', fontPath);
  doc.registerFont('DejaVuSans-Bold', boldFontPath);
  doc.font('DejaVuSans');

  doc.pipe(fs.createWriteStream(filePath));

  // Add logo
  const logoWidth = 130;
  doc.image(path.join(__dirname, 'logo.png'), 445, doc.y, {
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
            doc.text(String(value), xPosition, rectCell.y + 5, {
              align: 'left', // Rendered align is "left" because the position is manually calculated
            });
          }
          return ''; // Ensures the default rendering is overridden
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
    const formattedFrom = formatTime(new Date(statement.from));
    const formattedTo = formatTime(new Date(statement.to));

    table.rows.push([
      formatDate(new Date(statement.start_date)),
      statement.shift_lenght.toString(),
      `${formattedFrom} - ${formattedTo}`,
      statement.calculated_overtime.toString(),
      statement.claimed_overtime.toString(),
      formatAmount(overtimeAmount),
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
    .text(`${formatAmount(totalOvertimeAmount)} CZK`);

  doc.end();
  console.log(`PDF generated at: ${filePath}`);
  return filePath;
}
