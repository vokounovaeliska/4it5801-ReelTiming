import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { DailyReportPreviewInfoQuery } from '@frontend/modules/dailyreport/interfaces/interface';
import { formatTime } from '@frontend/modules/timesheets/utils/timeUtils';

import { ReportShootingProgress } from './ReportShootingProgress';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableWrapper: {
    width: '80%',
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    flex: 1,
    paddingVertical: 1,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 6,
    padding: 2,
    paddingHorizontal: 8,
    flex: 1,
    textAlign: 'center',
    overflow: 'hidden',
  },
  wideCellPosition: {
    flex: 3.2,
  },
  wideCell: {
    flex: 2.2,
  },
  shortCell: {
    flex: 1,
  },
  shootingProgressWrapper: {
    width: '20%',
    padding: 5,
  },
  alignRight: {
    textAlign: 'right',
  },
  alignLeft: {
    textAlign: 'left',
  },
});

const ReportCrewStatementsTable = ({
  data,
}: {
  data?: DailyReportPreviewInfoQuery;
}) => {
  const sortedStatements = [...(data?.statementsByProjectIdAndDate || [])].sort(
    (a, b) => {
      const orderA =
        a.projectUser.department?.order_index ?? Number.MAX_SAFE_INTEGER;
      const orderB =
        b.projectUser.department?.order_index ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    },
  );

  return (
    <View style={styles.container}>
      {/* Table */}
      <View style={styles.tableWrapper}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, styles.wideCellPosition]}>
              POSITION
            </Text>
            <Text
              style={[
                styles.tableCellHeader,
                styles.wideCell,
                styles.alignLeft,
              ]}
            >
              NAME
            </Text>
            <Text
              style={[
                styles.tableCellHeader,
                styles.shortCell,
                styles.alignLeft,
              ]}
            >
              CALL
            </Text>
            <Text
              style={[
                styles.tableCellHeader,
                styles.shortCell,
                styles.alignLeft,
              ]}
            >
              WRAP
            </Text>
            <Text style={[styles.tableCellHeader, styles.shortCell]}>OT</Text>
            <Text style={[styles.tableCellHeader, styles.wideCell]}>
              TURN AROUND
            </Text>
            <Text style={[styles.tableCellHeader, styles.wideCell]}>NOTE</Text>
          </View>
          {/* Table Rows */}
          {sortedStatements.map((statement, index) => (
            <View key={index} style={styles.tableRow}>
              <Text
                style={[
                  styles.tableCell,
                  styles.wideCellPosition,
                  styles.alignRight,
                ]}
              >
                {statement.projectUser.position || 'N/A'}
              </Text>
              <Text
                style={[styles.tableCell, styles.wideCell, styles.alignLeft]}
              >
                {statement.projectUser.name} {statement.projectUser.surname}
              </Text>
              <Text style={[styles.tableCell, styles.shortCell]}>
                {formatTime(statement.from) || '-'}
              </Text>
              <Text style={[styles.tableCell, styles.shortCell]}>
                {formatTime(statement.to) || '-'}
              </Text>
              <Text style={[styles.tableCell, styles.shortCell]}>
                {statement.claimed_overtime || '0'}
              </Text>
              <Text style={[styles.tableCell, styles.wideCell]}></Text>
              <Text style={[styles.tableCell, styles.wideCell]}></Text>
            </View>
          ))}
        </View>
      </View>

      {/* Shooting Progress */}
      <View style={styles.shootingProgressWrapper}>
        <ReportShootingProgress data={data} />
      </View>
    </View>
  );
};

export default ReportCrewStatementsTable;
