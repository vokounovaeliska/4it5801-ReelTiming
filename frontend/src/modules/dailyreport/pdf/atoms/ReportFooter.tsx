import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { DailyReportPreviewInfoQuery } from '@frontend/modules/dailyreport/interfaces/interface';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    paddingTop: 4,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginTop: 30,
    textAlign: 'left',
    marginLeft: 70,
  },
  itemValue: {
    fontWeight: 'bold',
    marginBottom: 5,
    whiteSpace: 'pre-wrap',
  },
  itemTitle: {
    whiteSpace: 'pre-wrap',
    marginBottom: 20,
  },
});

const ReportFooter = ({ data }: { data?: DailyReportPreviewInfoQuery }) => {
  const dailyReport = data?.shootingDay?.dailyReport;
  const footerItems =
    dailyReport && dailyReport.length > 0 ? dailyReport[0].footer : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REPORT APPROVED BY</Text>
      {footerItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemValue}>{item.value}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default ReportFooter;
