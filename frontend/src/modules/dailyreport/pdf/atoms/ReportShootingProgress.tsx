import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { DailyReportPreviewInfoQuery } from '@frontend/modules/dailyreport/interfaces/interface';

type ReportShootingProgressProps = {
  data?: DailyReportPreviewInfoQuery;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  itemContainer: {
    textAlign: 'center',
    backgroundColor: '#dd6b20',
  },
  itemTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 6,
    whiteSpace: 'pre-wrap',
    padding: 1,
  },
  itemValue: {
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 6,
    paddingVertical: 3,
    whiteSpace: 'pre-wrap',
  },
});

export const ReportShootingProgress = ({
  data,
}: ReportShootingProgressProps) => {
  const dailyReport = data?.shootingDay?.dailyReport;
  const items =
    dailyReport && dailyReport.length > 0
      ? dailyReport[0].shooting_progress
      : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};
