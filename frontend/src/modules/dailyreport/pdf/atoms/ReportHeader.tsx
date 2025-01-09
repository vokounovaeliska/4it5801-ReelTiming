import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { DailyReportPreviewInfoQuery } from '@frontend/modules/dailyreport/interfaces/interface';

import { LabelValue } from './LabelValue';

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
    fontFamily: 'DejaVu Sans',
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 10,
  },
  heading: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'DejaVu Sans',
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 3,
  },
});

const ReportHeader = ({ data }: { data?: DailyReportPreviewInfoQuery }) => (
  <>
    <Text style={styles.centerText}>DAILY REPORT</Text>
    <Text style={styles.heading}>
      {data?.project?.name || 'Unknown Project'}
    </Text>
    <View style={styles.flexRow}>
      <LabelValue
        label="Production"
        value={data?.project?.production_company || 'N/A'}
      />
      <LabelValue
        label="Shooting day"
        value={
          data?.shootingDay?.shooting_day_number
            ? `${data?.shootingDay?.shooting_day_number}/${
                data?.project?.shootingDays?.length || 'N/A'
              }`
            : 'N/A'
        }
      />
    </View>
  </>
);

export default ReportHeader;
