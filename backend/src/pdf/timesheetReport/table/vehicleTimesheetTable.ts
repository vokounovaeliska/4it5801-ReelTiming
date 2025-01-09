import PDFDocument from 'pdfkit-table';

import { CrewInfoPdf, StatementPdf } from '../timesheetPdfReportTypes';
import {
  calculateKilometersOver,
  calculateKilometerSum,
  calculateOvertimeAmount,
  formatDate,
  formatStatementTime,
} from '@backend/pdf/utils/timesheetReportUtils';
import { currencyUtil } from '@shared/currencyUtil';

interface TableConfig {
  doc: PDFDocument;
  statements: StatementPdf[];
  crewInfo: CrewInfoPdf;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function vehicleTimesheetTable({
  doc,
  statements,
  crewInfo,
}: TableConfig): Promise<void> {
  // Define table structure
  const table = {
    title: 'Shifts Report',
    subtitle: 'Details of overtime',
    headers: [
      {
        label: 'Date',
        property: 'date',
        width: 50,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Call - wrap',
        property: 'time_range',
        width: 70,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Shift',
        property: 'shift_length',
        width: 22,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Calc',
        property: 'calculated_overtime',
        width: 23,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Claim',
        property: 'claimed_overtime',
        width: 23,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'OT Amount',
        property: 'overtime_amount',
        width: 65,
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
          const margin = 5; // Define a margin from the right edge
          if (rectCell && typeof value !== 'undefined') {
            const textWidth = doc.widthOfString(String(value));
            const xPosition = rectCell.x + rectCell.width - textWidth - margin;
            doc.text(String(value), xPosition, rectCell.y + 4, {
              align: 'left',
            });
          }
          return '';
        },
      },
      {
        label: 'Vehicle',
        property: 'car_name',
        width: 80,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'KM Total',
        property: 'kilometers',
        width: 40,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'KM Allow',
        property: 'kilometer_allow',
        width: 40,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'KM Over',
        property: 'kilometer_over',
        width: 35,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'per KM',
        property: 'kilometer_rate',
        width: 45,
        align: 'center',
        headerAlign: 'center',
      },
      {
        label: 'Mileage Total',
        property: 'kilometer_sum',
        width: 65,
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
          const margin = value.valueOf() === '-' ? 30 : 5; // Define a margin from the right edge
          if (rectCell && typeof value !== 'undefined') {
            const textWidth = doc.widthOfString(String(value));
            const xPosition = rectCell.x + rectCell.width - textWidth - margin;
            doc.text(String(value), xPosition, rectCell.y + 4, {
              align: 'left',
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
  let totalKilometersOver = 0;
  let totalKilometers = 0;
  let totalKilometersAmount = 0;
  const projectCurrency = crewInfo.project.currency;

  // Fill table rows with statement data
  statements.forEach((statement) => {
    const overtimeAmount = calculateOvertimeAmount({
      ...statement,
      rate: crewInfo.rate,
    });

    const kilometersOver = calculateKilometersOver(statement);
    const kilometersSum = calculateKilometerSum(statement);

    const formattedFrom = formatStatementTime(new Date(statement.from));
    const formattedTo = formatStatementTime(new Date(statement.to));

    table.rows.push([
      formatDate(new Date(statement.start_date)),
      `${formattedFrom} - ${formattedTo}`,
      statement.shift_lenght.toString(),
      statement.calculated_overtime.toString(),
      statement.claimed_overtime.toString(),
      currencyUtil.formatAmount(overtimeAmount ?? 0, projectCurrency),
      statement.car_name ?? '-',
      statement.kilometers?.toString() ?? '-',
      statement.kilometer_allow?.toString() ?? '-',
      kilometersOver?.toString() ?? '-',
      statement.kilometer_rate == null
        ? '-'
        : currencyUtil.formatAmount(
            statement.kilometer_rate,
            projectCurrency,
            2,
          ),
      kilometersSum == null
        ? '-'
        : currencyUtil.formatAmount(kilometersSum, projectCurrency, 2),
    ]);

    totalOvertime += statement.claimed_overtime;
    totalOvertimeAmount += overtimeAmount;
    totalKilometersOver += kilometersOver ?? 0;
    totalKilometers += statement.kilometers ?? 0;
    totalKilometersAmount += kilometersSum ?? 0;
  });

  // Add summary row
  table.rows.push([
    `${statements.length} days`,
    '',
    '',
    '',
    `${totalOvertime.toString()}`,
    currencyUtil.formatAmount(totalOvertimeAmount, projectCurrency),
    '',
    `${totalKilometers.toString()}`,
    '',
    `${totalKilometersOver.toString()}`,
    '',
    currencyUtil.formatAmount(totalKilometersAmount, projectCurrency, 2),
  ]);

  // Render the table
  let pageHeight =
    doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

  // Check if there is enough space for the table
  if (doc.y + table.rows.length * 15 > pageHeight) {
    doc.addPage();
  }
  await doc.table(table, {
    prepareRow: (row, i) => {
      const rowHeight = 15;
      const pageWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;

      if (row[0]?.endsWith('days') && i === 0) {
        doc
          .rect(doc.page.margins.left, doc.y + 12, pageWidth + 3, rowHeight)
          .fill('#F2F2F1');
        doc.fill('#000');
      }

      if (row[0]?.endsWith('days')) {
        doc.font('DejaVuSans-Bold').fontSize(8);
      } else {
        doc.font('DejaVuSans').fontSize(8);
      }

      return doc;
    },
  });

  doc
    .moveDown(0.3)
    .fontSize(10.5)
    .font('DejaVuSans-Bold')
    .text('GRAND TOTAL: ', { align: 'left', continued: true })
    .font('DejaVuSans')
    .fontSize(11)
    .text(
      `${currencyUtil.formatAmount(
        totalOvertimeAmount + totalKilometersAmount,
        projectCurrency,
      )}`,
    );
}
