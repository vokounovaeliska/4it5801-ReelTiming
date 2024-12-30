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
    title: 'Shifts Report',
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
        label: 'Call - wrap',
        property: 'time_range',
        width: 100,
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
      `${formattedFrom} - ${formattedTo}`,
      statement.shift_lenght.toString(),
      statement.calculated_overtime.toString(),
      statement.claimed_overtime.toString(),
      currencyUtil.formatAmount(overtimeAmount ?? 0, projectCurrency),
    ]);

    totalOvertime += statement.claimed_overtime;
    totalOvertimeAmount += overtimeAmount;
  });

  // Add summary row
  table.rows.push([
    `${statements.length} days`,
    '',
    '',
    '',
    `${totalOvertime.toString()} h`,
    currencyUtil.formatAmount(totalOvertimeAmount, projectCurrency),
  ]);

  // Render the table
  let pageHeight =
    doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

  if (doc.y + table.rows.length * 15 > pageHeight) {
    doc.addPage();
  }

  await doc.table(table, {
    prepareRow: (row, i) => {
      const rowHeight = 15;
      const pageWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;

      if (row[0]?.endsWith('days') && i === 0) {
        const moveDocY = row[0]?.endsWith('0 days') ? 3 : 12;

        doc
          .rect(
            doc.page.margins.left,
            doc.y + moveDocY,
            pageWidth + 4,
            rowHeight,
          )
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
    .text(`${currencyUtil.formatAmount(totalOvertimeAmount, projectCurrency)}`);
}
