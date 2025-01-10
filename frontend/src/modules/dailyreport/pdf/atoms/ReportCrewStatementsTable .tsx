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
  },
  wideCell: {
    flex: 1.3,
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
    paddingRight: 10,
  },
  alignLeft: {
    paddingLeft: 10,
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
            <Text style={[styles.tableCellHeader, styles.shortCell]}>
              POSITION
            </Text>
            <Text style={[styles.tableCellHeader, styles.wideCell]}>NAME</Text>
            <Text style={[styles.tableCellHeader, styles.shortCell]}>CALL</Text>
            <Text style={[styles.tableCellHeader, styles.shortCell]}>WRAP</Text>
            <Text style={[styles.tableCellHeader, styles.shortCell]}>OT</Text>
            <Text style={[styles.tableCellHeader, styles.shortCell]}>
              TURN AROUND
            </Text>
            <Text style={[styles.tableCellHeader, styles.shortCell]}>NOTE</Text>
          </View>
          {/* Table Rows */}
          {sortedStatements.map((statement, index) => (
            <View key={index} style={styles.tableRow}>
              <Text
                style={[styles.tableCell, styles.shortCell, styles.alignRight]}
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
              <Text style={[styles.tableCell, styles.shortCell]}></Text>
              <Text style={[styles.tableCell, styles.shortCell]}></Text>
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
