import PDFDocument from 'pdfkit-table';

import { CrewInfoPdf, StatementPdf } from '../timesheetPdfReportTypes';
import {
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

export async function basicTimesheetTable({
  doc,
  statements,
  crewInfo,
}: TableConfig): Promise<void> {
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
          const margin = 15;
          if (rectCell && typeof value !== 'undefined') {
            const textWidth = doc.widthOfString(String(value));
            const xPosition = rectCell.x + rectCell.width - textWidth - margin;
            doc.text(String(value), xPosition, rectCell.y + 5, {
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
  const projectCurrency = crewInfo.project.currency;

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
      currencyUtil.formatAmount(overtimeAmount ?? 0, projectCurrency, 2),
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

  await doc.table(table, {
    prepareRow: () => doc.font('DejaVuSans').fontSize(8),
  });

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
      `${currencyUtil.formatAmount(totalOvertimeAmount, projectCurrency, 2)}`,
    );
}
